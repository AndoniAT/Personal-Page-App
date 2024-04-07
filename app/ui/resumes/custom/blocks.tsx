import { FormEvent, useEffect, useState } from "react";
import { BlockClient, ElementBlockClient } from "../resumesStyles/interfaces";
import clsx from "clsx";
import { AcceptFussion, ChooseTypeFusion, ErrorModal, TextElementType } from "./modals";
import { FusionElementsBlock, Positions } from "@/app/lib/definitions";

const STEPS = {
  NONE: 0,
  ASK_FUSION: 1,
  ASK_ELEM_TYPE: 2,
  SET_ELEM_VALUE: 3
} as {
  NONE:number,
  ASK_FUSION:number,
  ASK_ELEM_TYPE:number,
  SET_ELEM_VALUE:number
}

/**
 * Construct customed blocks to show in the  page
 * @param blocks 
 * @returns 
 */
export function BuildBlocks( { blocks }:Readonly<{ blocks:BlockClient[] }> ) {
    return (<>
      {
        blocks.map( ( block:BlockClient ) => <Block key={block.block_id} block={block} /> )
      }
    </>)
  }
  
  /**
   * 
   * @param blockElements
   * @param totLines
   * @param totCols
   * @param handlerFusion
   */
function buildElementsForBlock( blockElements:ElementBlockClient[], totLines:number, totCols:number, handlerFusion:Function, fusionBlocks:FusionElementsBlock ) {

    let elementsList:any = [];
    elementsList.length = totLines * totCols;

    // Set blocks in their position in array
    blockElements.forEach( b => {
      let linefrom = b.linefrom;
      let colfrom = b.colfrom;
  
      let elementSet = false;
  
      // - 1 because of the index in array
      for(let line = linefrom; line <= b.lineto; line++ ) {
        for(let col = colfrom; col <= b.colto; col++ ) {
          let idxLine = line - 1;
          let idxCol = col-1;
          let setInLine = ( totCols * idxLine );
          let setPosition = setInLine + idxCol;
  
          if( !elementSet ) {
            // If the element has not been set, save it in its first position
            let spanRow = b.lineto - b.linefrom + 1;
            let spanCol = b.colto - b.colfrom + 1;
            elementsList[ setPosition ] = <div style={{
              gridRow: `span ${spanRow} / span ${spanRow}`,
              gridColumn: `span ${spanCol} / span ${spanCol}`
            }} className={`${b.defclassname} ${b.customclassname}`}/>,
  
            elementSet = true;
          } else {
            // If the element has already been set, mark this case as ocuped
            elementsList[ setPosition ] = 1;
          }
        }
      }
    } );
  
    // Set edtiable elements with 1 col and 1 row in no ocuped positions
    for (let index = 0; index < elementsList.length; index++) {
      if( elementsList[index] == undefined ) {
        let positionTable = index + 1;
        let line = Math.ceil(positionTable/totLines);
        let col = positionTable - ( totCols * ( line - 1 ) );
        elementsList[index] = <EmptyElement position={ { line:line, col:col, indexArr: index } } handler={handlerFusion} fusionBlocks={fusionBlocks}/>
      }
      
    }
    
    /// Filter ocuped positions by one
    elementsList = elementsList.filter( ( e:any ) => e != 1 );
    return elementsList;
}

export function Block({
  block
}: Readonly<{
  block:BlockClient
}>){
  const [fusionElements, setFusionElements] = useState<FusionElementsBlock>({from:null, to:null})
  const [typeSelected, setTypeSelected] = useState<string>('')
  const [step, setStep] = useState<number>(STEPS.NONE);
  const [error, setError] = useState<string>('');

  let totLines = block.numlines;
  let totCols = block.numcols;

  let elements = block.elements ?? [];

  let finishProcess = () => {
    let newFussion = { from:null,  to:null } as FusionElementsBlock;
    setFusionElements( newFussion );
    setStep( STEPS.NONE );
  }

  let handlerFusion = ( element:Positions ) => {
    let newFussion = { from:null, to:null } as FusionElementsBlock;

    if( !fusionElements.from ) {
      newFussion = {
        from: {
          line: element.line,
          col: element.col,
          indexArr: element.indexArr
        },
        to: fusionElements.to
      }
    } else if( fusionElements.from.col == element.col && fusionElements.from.line == element.line ) {
      // Doing nothing (null values)
    } else {
      newFussion = {
        from: fusionElements.from,
        to: {
          line: element.line,
          col: element.col,
          indexArr: element.indexArr
        }
      }
    }
    setFusionElements( newFussion );

    if( newFussion.from && newFussion.to  ) {
      setStep( STEPS.ASK_FUSION );
    }
  }

  let acceptFusion = () => {
    setStep( STEPS.ASK_ELEM_TYPE );
  };

  let chooseElementType = ( type:string ) => {
    switch( type ) {
      case 'text':
        setTypeSelected('text');
        setStep( STEPS.SET_ELEM_VALUE );
        break;
      case 'media':
        setTypeSelected('media');
        setStep( STEPS.SET_ELEM_VALUE );
        break;
      case 'linkvideo': 
        setTypeSelected('linkvideo');
        setStep( STEPS.SET_ELEM_VALUE );
        break;
      case 'html':
        setTypeSelected('html');
        setStep( STEPS.SET_ELEM_VALUE );
        break;
      default:
        finishProcess();
        break;
    }
  }

  let blockElements = buildElementsForBlock( elements, totLines, totCols, handlerFusion, fusionElements )
  async function SubmitCreateTextElementBlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
     
    const formData = new FormData( event.currentTarget )
    if( block.actions?.addElement ) {
      formData.set( 'fusionBlocks', JSON.stringify( fusionElements ) );
      try {
        await block.actions.addElement( 'text', formData );
        finishProcess();
      } catch( e:any ) {
        console.log('Error :', e?.message);
        setError( e?.message );
        finishProcess();
      }
    }
  }

  return ( 
    <>
      <div key={`blk1`} className={clsx({
      "w-full min-h-80 h-fit grid": true,
      [`grid-rows-${totLines}`]: true,
      [`grid-cols-${totCols} pb-2`]: true
    })
    }
    >
      {
        blockElements
      }
  
    </div>
    {
      ( step == STEPS.ASK_FUSION ) ?
        <AcceptFussion acceptFusion={acceptFusion} cancelFusion={finishProcess}/>
      : <></>
    }
    {
      ( step == STEPS.ASK_ELEM_TYPE ) ? 
      <ChooseTypeFusion chooseElementType={chooseElementType}/>
      :
      <></>
    }
    {
      ( step == STEPS.SET_ELEM_VALUE && typeSelected == 'text' ) ?
    <TextElementType handler={SubmitCreateTextElementBlock} cancel={finishProcess}></TextElementType>
      : 
    <></>
    }
    {
      ( error.length > 0 ) ?
      <ErrorModal message={error} accept={() => { setError('') } }/>
      :
      <></>
    }
    </>
  )
} 

export function EmptyElement({
  handler,
  position,
  fusionBlocks
}: {
  position:Positions,
  handler:Function,
  fusionBlocks:FusionElementsBlock
}) {

  const [color, setColor] = useState<string>('bg-slate-200');

  useEffect(() => {
    if( fusionBlocks.from && position.indexArr == fusionBlocks.from?.indexArr ||
      fusionBlocks.to && position.indexArr == fusionBlocks.to?.indexArr
    ) {
      setColor('bg-slate-500')
    } else {
      setColor('bg-slate-200')
    }
  }, [ color, fusionBlocks, position ])
  


  return  ( 
    <div className={`col-span-1 h-full ${color} border-solid border-2 rounded border-slate-700 hover:scale-105`}
        onClick={() => {
          handler(position);
        }}
        />
  
   );
}
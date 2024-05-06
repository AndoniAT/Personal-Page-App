'use client'
import { FormEvent, useEffect, useState } from "react";
import { BlockClient, BlocksScreenClient, ElementBlockClient } from "../../interfaces";
import clsx from "clsx";
import { AcceptFussion, ChooseTypeFusion, ErrorModal, HtmlElementType, MediaElementType, RefElementType, TextElementType, VideoElementType } from "./modals";
import { FusionElementsBlock, Media, Positions } from "@/app/lib/definitions";
import { LoadScreen } from "@/app/ui/components/loading-modal";
import { getHTMLCss, getImageCss, getTextCss, getVideoCss } from "../../sharedFunctions";
import { ImageElement } from "@/app/ui/components/image-element";
import { TextElement } from "@/app/ui/components/text-element";
import { MyTooltip } from "@/app/ui/components/tooltip";
import MinusButton from "@/app/ui/components/minus-button";
import { ButtonPlus } from "./components";

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

export const TYPES_TO_CHOOSE = {
  text: 'text',
  image: 'media',
  video: 'linkvideo',
  html: 'html',
  ref: 'ref'
}

/**
 * Construct customed blocks to show in page
 * @param blocks 
 * @returns 
 */
export function BuildBlocksEditMode( { blocks }:Readonly<{ blocks:BlockClient[] }> ) {
  const [allBlocks, setAllBlocks] = useState<BlockClient[]>([])
 const [ loadingBlock, setLoadingBlock ] = useState<string>( '' );

  useEffect(() => {
    setAllBlocks( blocks );
  }, [ blocks ]);

    return allBlocks.map( ( block_:BlockClient ) => {
      
      let actionRow = ( action:string ) => {
            let formData = new FormData();
            formData.set('action', action);
            setLoadingBlock( block_.block_id );
            fetch(`/api/blocks/${block_.block_id}` ,
              {
                method: 'PUT',
                body: formData
              }
            ).then( async res => {
              let { block } = await res.json();

              let newBlocks = allBlocks.map( b => ( b.block_id == block.block_id ) ? block : b );

              setAllBlocks( newBlocks );
              setLoadingBlock( '' );
            })
            .catch( err => {
              console.log(err);
              setLoadingBlock( '' );
            });
      }
          
      let removeRow = () => actionRow( 'remove_row' );
      let addRow = () => actionRow( 'add_row' );

      return ( 
            <div key={'block_'+block_.block_id}>
              {
                ( loadingBlock == block_.block_id ) ?
                <LoadScreen/>
                :
                <>
                  <div key={`blockContainer${block_.block_id}`}>
                    <Block key={block_.block_id} block={block_} /> 
                    <MyTooltip content={'Remove a row'}>
                        <MinusButton key={`trash_${block_.block_id}`} removeElement={removeRow} cancel={() => {}}></MinusButton>
                    </MyTooltip>
                  </div>

                  <div className='grid grid-cols-12 grid-rows-1 h-fit'>
                    <div className='col-start-6 col-span-2 text-center flex justify-center'>
                      <MyTooltip content='Add a new row'>
                        <ButtonPlus handler={addRow}/>
                      </MyTooltip>
                    </div>
                  </div>
                </>
              }
            </div>
        )
      })
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
    blockElements.forEach( element => {
      let linefrom = element.linefrom;
      let colfrom = element.colfrom;
  
      let elementSet = false;

      // - 1 because of the index in array
      for(let line = linefrom; line <= element.lineto; line++ ) {
        for(let col = colfrom; col <= element.colto; col++ ) {
          let idxLine = line - 1;
          let idxCol = col - 1;
          let setInLine = ( totCols * idxLine );
          let setPosition = setInLine + idxCol;
  
          if( !elementSet ) {
            // If the element has not been set, save it in its first position
            elementsList[ setPosition ] = <CustomElement key={element.element_id} element={element}></CustomElement>;
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
        //let line = Math.ceil(positionTable/totLines);
        let line = Math.ceil(positionTable / totCols );
        let col = positionTable - ( totCols * ( line - 1 ) );
        elementsList[index] = <EmptyElement key={index} position={ { line:line, col:col, indexArr: index } } handler={handlerFusion} fusionBlocks={fusionBlocks}/>
      }
      
    }
    
    /// Filter ocuped positions by one
    elementsList = elementsList.filter( ( e:any ) => e != 1 );
    return elementsList;
}

function Block({
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

  let acceptFusion = () => setStep( STEPS.ASK_ELEM_TYPE )

  let chooseElementType = ( type:string ) => {
    switch( type ) {
      case TYPES_TO_CHOOSE.text:
      case TYPES_TO_CHOOSE.image:
      case TYPES_TO_CHOOSE.video: 
      case TYPES_TO_CHOOSE.html:
      case TYPES_TO_CHOOSE.ref:
        setTypeSelected(type);
        setStep( STEPS.SET_ELEM_VALUE );
        break;
      default:
        finishProcess();
        break;
    }
  }

  let blockElements = buildElementsForBlock( elements, totLines, totCols, handlerFusion, fusionElements );

  async function SubmitCreateElementBlock(type:string, event?: FormEvent<HTMLFormElement>, formData?:FormData ) {
    event?.preventDefault()
     
    formData = formData && !event ? formData : new FormData( event?.currentTarget )

    if( block.actions?.addElement ) {
      formData.set( 'fusionBlocks', JSON.stringify( fusionElements ) );
      try {
        await block.actions.addElement( type, formData );
        finishProcess();
      } catch( e:any ) {
        console.log('Error :', e?.message);
        setError( e?.message );
        finishProcess();
      }
    }
  }

  /*grid-rows-50*/
/*  */
  return ( 
    <>
      <div key={`blk1`} className={`
      w-full 
      h-fit grid overflow-hidden
      grid-cols-${block.numcols}
      min-h-20
      md:min-h-40
      lg:min-h-60
      xl:min-h-80
      `}>
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
    { /* Step 3 => Create the type showing the modal to insert content */}
    {
      step == STEPS.SET_ELEM_VALUE ? 
      <>
        {
            ( typeSelected == TYPES_TO_CHOOSE.text ) ?
            <TextElementType handler={SubmitCreateElementBlock} cancel={finishProcess} element={null}></TextElementType>
              : 
            ( typeSelected == TYPES_TO_CHOOSE.image ) ?
            <MediaElementType handler={SubmitCreateElementBlock} cancel={finishProcess} element={null}></MediaElementType>
            :
            ( typeSelected == TYPES_TO_CHOOSE.html ) ?
            <HtmlElementType handler={SubmitCreateElementBlock} cancel={finishProcess} element={null}></HtmlElementType>
            :
            ( typeSelected == TYPES_TO_CHOOSE.video ) ?
            <VideoElementType handler={SubmitCreateElementBlock} cancel={finishProcess} element={null}></VideoElementType>
            :
            ( typeSelected == TYPES_TO_CHOOSE.ref ) ?
            <RefElementType handler={SubmitCreateElementBlock} cancel={finishProcess} element={null}></RefElementType>
            :
            <></>
        }
      </>
      :<></>
    }
    

    { /* Error modal handler */}
    {
      ( error.length > 0 ) ?
      <ErrorModal message={error} accept={() => { setError('') } }/>
      :
      <></>
    }
    </>
  )
} 

function EmptyElement({
  handler,
  position,
  fusionBlocks
}: Readonly<{
  position:Positions,
  handler:Function,
  fusionBlocks:FusionElementsBlock
}>) {

  const [color, setColor] = useState<string>('bg-slate-200');

  useEffect(() => {
    let isSelectedBlock = ( fusionBlocks.from && position.indexArr == fusionBlocks.from?.indexArr ||
      fusionBlocks.to && position.indexArr == fusionBlocks.to?.indexArr
    );
    let col = ( isSelectedBlock ) ? 'bg-slate-500' : 'bg-slate-200';
    setColor(col)
  }, [ fusionBlocks, position ])

  let textTooltip = 'Fusion blocks : \n';
  textTooltip += ( !fusionBlocks.from && !fusionBlocks.to ) ? 'Click to set the starting corner' : '';
  textTooltip += ( fusionBlocks.from && !fusionBlocks.to ) ? 'Click to set the final corner' : '';
  textTooltip = ( fusionBlocks.from && position.indexArr == fusionBlocks.from.indexArr && !fusionBlocks.to ) ? 'Remove starting corner' : textTooltip;

  return  ( 
    <div className="h-fit col-span-1">
      <MyTooltip content={textTooltip} className='flex' offset={5} crossOffset={50}>
        <div className={`min-h-8 ${color} border-solid border-2 rounded border-slate-700 hover:scale-105 w-full cursor-pointer`}
          /*style={{ width: '80px', height: '80px' }}*/
            onClick={() => {
              handler(position);
            }}
            >
              {
                  
              <p>{`l:${position.line} c: ${position.col}`}</p>
            }
            </div>
      </MyTooltip>
    </div>
  
   );
}

function CustomElement({
  element,
}:Readonly<{
  element:ElementBlockClient,
}>) {
  element.customclassname = element.customclassname + "            ";
  //if( element.customclassname == null || element.customclassname == '') alert('nooo');
  switch(element.type) {
    case TYPES_TO_CHOOSE.text:
      return <ElementTextGrid element={element}></ElementTextGrid>
    case TYPES_TO_CHOOSE.image:
      return <ElementImageGrid element={element}></ElementImageGrid>
    case TYPES_TO_CHOOSE.html:
      return <ElementHtmlGrid element={element}></ElementHtmlGrid>
    case TYPES_TO_CHOOSE.video:
      return <ElementVideoGrid element={element}></ElementVideoGrid>
  }
}

function ElementTextGrid({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let [editElement, setEditElement] = useState<boolean>(false);

  let css = getTextCss( element );

  let submitEditTextElementBlock = async function (event: FormEvent<HTMLFormElement>) {
    submitEditElementBlock( event, element );
  }

  //let customClass = element.customclassname ?? '';
  return (
    <>
      <div 
        style={css.gridCss} 
        className={`
          min-h-8 h-fit
          rounded hover:border-slate-700
          hover:scale-105 cursor-pointer hover:border-solid`
        }
        onClick={() => { setEditElement(true)}}
      >
        <TextElement className={element.defclassname} content={element.content} css={css}/>
      </div>
          {
            editElement ? 
              <TextElementType handler={submitEditTextElementBlock} cancel={() => { setEditElement(false) }} element={element}></TextElementType>
            : <></>
          }
    </>
  )
}

function ElementImageGrid({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let [editElement, setEditElement] = useState<boolean>(false);
  
  const css = getImageCss( element );

  let submitEditImageElementBlock = async function (event: FormEvent<HTMLFormElement>) {
    submitEditElementBlock( event, element );
  }

  return (
    <>
        <div style={css.gridCss}
            className={`
              element.defclassname,
              min-h-10
              hover:scale-105 cursor-pointer hover:border-solid border-2 rounded hover:border-slate-700
              `}
            onClick={() => setEditElement(true) }
            >
              <ImageElement css={css} image={element.content}/>
        </div>
      {
        editElement ? 
        <MediaElementType handler={submitEditImageElementBlock} cancel={() => { setEditElement(false) }} element={element}></MediaElementType>
        : <></>
      }
    </>
  )
}

function ElementHtmlGrid({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let [editElement, setEditElement] = useState<boolean>(false);

  let css = getHTMLCss( element );

  let submitEditHTMLElementBlock = async function (event: FormEvent<HTMLFormElement>) {
    submitEditElementBlock( event, element );
  }

  //let customClass = element.customclassname ?? '';

  return (
    <>
      <div style={css.gridCss} 
        className={`
          min-h-full border-2 rounded hover:border-slate-700 h-fit
          hover:scale-105 cursor-pointer hover:border-solid 
        `}
        onClick={() => { setEditElement(true)}}
      >
        {
          <div style={css.htmlCss}
              className={element.defclassname}
              dangerouslySetInnerHTML={createHTMLGrid( element.content )} 
          />
          
        }
        
      </div>
          {
            editElement ? 
              <HtmlElementType handler={submitEditHTMLElementBlock} cancel={() => { setEditElement(false) }} element={element}></HtmlElementType>
            : <></>
          }
    </>
  )
}

function ElementVideoGrid({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let [editElement, setEditElement] = useState<boolean>(false);

  let css = getVideoCss( element );

  let submitEditHTMLElementBlock = async function (event: FormEvent<HTMLFormElement>) {
    submitEditElementBlock( event, element );
  }

  //let customClass = element.customclassname ?? '';

  return (
    <>
      <div style={css.gridCss} 
        className={`
          min-h-full border-2 rounded hover:border-slate-700 h-fit
          hover:scale-105 cursor-pointer hover:border-solid
          `}
      onClick={() => { setEditElement(true)}}
      >
        {
          <div style={css.videoCss}
              className={clsx({ [element.defclassname]:true})}
              dangerouslySetInnerHTML={createHTMLGrid( element.content )} 
          />
          
        }
        
      </div>
          {
            editElement ? 
              <VideoElementType handler={submitEditHTMLElementBlock} cancel={() => { setEditElement(false) }} element={element}></VideoElementType>
            : <></>
          }
    </>
  )
}

function createHTMLGrid( str:string ) {
  return {__html: str };
}

async function submitEditElementBlock( event: FormEvent<HTMLFormElement>, element:ElementBlockClient ) {
  event.preventDefault()
   
  const formData = new FormData( event.currentTarget )
  if( element.actions?.updateElement ) {
    try {
      await element.actions.updateElement( formData );
    } catch ( err ) {
      console.log('Error', err);
    }
  }
}

export function TabsResponsive({
  blocks
}: Readonly<{
  blocks: BlocksScreenClient
}>) {
    const [ active, setActive ] = useState<string>('');

    let blocks_phone = blocks.phone as BlockClient[];
    let blocks_md = blocks.md as BlockClient[];
    let blocks_lg = blocks.lg as BlockClient[];
    let blocks_xl = blocks.xl as BlockClient[];
    let blocks_2xl = blocks._2xl as BlockClient[];

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-3">
        <li className="me-2"
          onClick={() => setActive('2xl')}
        >
          <div className={clsx({
              ['hidden cursor-not-allowed text-gray-400']:true,
              ['inline-block p-4 bg-gray-100 rounded-t-lg active']:true,
              ['dark:bg-gray-800 dark:text-blue-500']:true,
              ['2xl:cursor-pointer 2xl:block']:true,
              ['2xl:text-blue-600']: active == '' || active == '2xl',
              ['text-gray-400']: active != '2xl'
          }
          )}>2xl</div>
        </li>
        <li className="me-2"
        onClick={() => setActive('xl')}
        >
          <div className={clsx({
              ['hidden cursor-not-allowed text-gray-400']:true,
              ['inline-block p-4 rounded-t-lg hover:bg-gray-50']:true,
              ['dark:hover:bg-gray-800 dark:hover:text-gray-300']:true,
              ['xl:cursor-pointer xl:block']:true,
              ['xl:text-blue-600 2xl:text-gray-400']: active == '' || active == '2xl',
              ['xl:text-blue-600']: active == 'xl'
              })
            }>Xl</div>
        </li>

        <li className="me-2"
        onClick={() => setActive('lg')}
        >
          <div className={clsx({
              ['hidden cursor-not-allowed text-gray-400']:true,
              ['inline-block p-4 rounded-t-lg hover:bg-gray-50']:true,
              ['dark:hover:bg-gray-800 dark:hover:text-gray-300']:true,
              ['lg:cursor-pointer lg:block']:true,
              ['lg:text-blue-600 xl:text-gray-400']: active == '' || active == 'xl' || active == '2xl',
              ['lg:text-blue-600']: active == 'lg'
              }
              )}>Large</div>
        </li>
        <li className="me-2"
        onClick={() => setActive('md')}
        >
          <div className={clsx({
              ['hidden cursor-not-allowed text-gray-400']:true,
              ['inline-block p-4 rounded-t-lg hover:bg-gray-50 ']:true,
              ['dark:hover:bg-gray-800 dark:hover:text-gray-300']:true,
              ['md:cursor-pointer md:block']:true,
              ['md:text-blue-600 lg:text-gray-400']: active == '' || active == 'lg' || active == 'xl' || active == '2xl',
              ['md:text-blue-600']: active == 'md'
              }
              )}>Medium</div>
        </li>
        <li className="me-2"
        onClick={() => setActive('phone')}
        >
          <div className={clsx({
              ['cursor-not-allowed']:true,
              ['inline-block p-4 rounded-t-lg hover:bg-gray-50 ']:true,
              ['dark:hover:bg-gray-800 dark:hover:text-gray-300']:true,
              ['cursor-pointer']:true,
              ['text-blue-600 md:text-gray-400']: active == '' || active == 'md' || active == 'lg' || active == 'xl' || active == '2xl',
              ['text-blue-600']: active == 'phone'
              }
              )}>Phone</div>
        </li>
      </ul>

      <div className="default flex justify-center">
        <div className={clsx({
          ['hidden w-full']:true,
          ['2xl:grid']:active == '' || active == '2xl'
        })
        }
        >
            <BuildBlocksEditMode blocks={blocks_2xl}/>
        </div>
        <div className={clsx({
            ['hidden 2xl:p-2 2xl:border 2xl:border-2 2xl:border-gray-400 w-full']:true,
            ['xl:grid 2xl:hidden']: active == '' || active == '2xl',
            ['xl:grid 2xl:w-10/12']: active == 'xl',
            /*['2xl:hidden']: active != 'xl'*/
          })
          }>
          <BuildBlocksEditMode blocks={blocks_xl}/>
        </div>
        <div className={clsx({
            ['hidden xl:p-2 xl:border xl:border-2 xl:border-gray-400 w-full']:true,
            ['lg:grid xl:hidden']: active == '' || active == 'xl' || active == '2xl',
            ['lg:grid 2xl:w-8/12 xl:w-10/12']: active == 'lg',
            /*['xl:hidden']: active != 'lg',*/
          })
        }>
            <BuildBlocksEditMode blocks={blocks_lg}/>
        </div>
        <div className={clsx({
          ['hidden lg:p-2 lg:border lg:border-2 lg:border-gray-400 w-full']:true,
          ['md:grid lg:hidden']: active == '' || active == 'lg' || active == 'xl' || active == '2xl',
          ['md:grid 2xl:w-6/12 xl:w-8/12 lg:w-10/12']: active == 'md',
          /*['lg:hidden']: active != 'md',*/
        })}>
          <BuildBlocksEditMode blocks={blocks_md}/>
        </div>
        <div className={clsx({
            ['p-2 border md:border-2 md:border-gray-400 w-full']:true,
            ['grid md:hidden']: active == '' || active == 'md' || active == 'lg' || active == 'xl' || active == '2xl',
            ['grid 2xl:w-4/12 xl:w-6/12 lg:w-8/12 md:w-8/12']: active == 'phone',
            /*['md:hidden']: active != 'phone',*/
          })
        }>
          <BuildBlocksEditMode blocks={blocks_phone}/>
        </div>
      </div>
    </>
  )
}
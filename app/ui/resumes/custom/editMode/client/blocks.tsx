'use client'
import { FormEvent, useEffect, useState } from "react";
import { BlockClient, ElementBlockClient } from "../../interfaces";
import clsx from "clsx";
import { AcceptFussion, ChooseTypeFusion, ErrorModal, HtmlElementType, MediaElementType, TextElementType, VideoElementType } from "./modals";
import { FusionElementsBlock, Media, Positions } from "@/app/lib/definitions";
import Image from "next/image";
import TrashButton from "@/app/ui/components/trash-button";
import { LoadScreen } from "@/app/ui/components/loading-modal";
import { getHTMLCss, getImageCss, getTextCss, getVideoCss } from "../../sharedFunctions";
import { ImageElement } from "@/app/ui/components/image-element";
import { TextElement } from "@/app/ui/components/text-element";

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
  html: 'html'
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

    return allBlocks.map( ( block:BlockClient ) => {

          let deleteBlock = () => {
            setLoadingBlock( block.block_id );
            fetch(`/api/blocks/${block.block_id}` ,
              {
                method: 'DELETE'
              }
            ).then( () => {
              let newBlocks = allBlocks.filter( b => b.block_id != block.block_id );
              setAllBlocks( newBlocks );
              setLoadingBlock( '' );
            })
            .catch( err => {
              console.log(err);
              setLoadingBlock( '' );
            });
          }

          return ( 
            <>
              {
                ( loadingBlock == block.block_id ) ?
                <LoadScreen/>
                :
                <div key={`blockContainer${block.block_id}`}>
                  <Block key={block.block_id} block={block} /> 
                  <TrashButton key={`trash_${block.block_id}`} deleteElement={deleteBlock} cancel={() => {}}></TrashButton>
                </div>
              }
            </>
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
          let idxCol = col-1;
          let setInLine = ( totCols * idxLine );
          let setPosition = setInLine + idxCol;
  
          if( !elementSet ) {
            // If the element has not been set, save it in its first position
            elementsList[ setPosition ] = <CustomElement key={element.element_id} element={element}></CustomElement>,
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
        setTypeSelected(type);
        setStep( STEPS.SET_ELEM_VALUE );
        break;
      default:
        finishProcess();
        break;
    }
  }

  let blockElements = buildElementsForBlock( elements, totLines, totCols, handlerFusion, fusionElements );

  async function SubmitCreateElementBlock(event: FormEvent<HTMLFormElement>, type:string) {
    event.preventDefault()
     
    const formData = new FormData( event.currentTarget )
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

  return ( 
    <>
      <div key={`blk1`} className={clsx({
      ['w-full min-h-80 h-fit grid overflow-hidden']: true,
      /*[`grid-rows-[repeat(${totLines}, auto)]`]: true,*/
      [`grid-rows-${totLines}`]: true,
      [`grid-cols-${totCols}`]: true
      /*['pb-2']:true*/
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
}: {
  position:Positions,
  handler:Function,
  fusionBlocks:FusionElementsBlock
}) {

  const [color, setColor] = useState<string>('bg-slate-200');

  useEffect(() => {
    let isSelectedBlock = ( fusionBlocks.from && position.indexArr == fusionBlocks.from?.indexArr ||
      fusionBlocks.to && position.indexArr == fusionBlocks.to?.indexArr
    );
    let col = ( isSelectedBlock ) ? 'bg-slate-500' : 'bg-slate-200';
    setColor(col)
  }, [ fusionBlocks, position ])

  return  ( 
    <div className="h-fit col-span-1">
      <div className={clsx({
        ['min-h-8']:true,
        [color]:true,
        ['border-solid border-2 rounded border-slate-700 hover:scale-105']:true
      })
      }
          onClick={() => {
            handler(position);
          }}
          />
    </div>
  
   );
}

function CustomElement({
  element,
}:{
  element:ElementBlockClient,
}) {
  element.customclassname = element.customclassname + "            ";
  if( element.customclassname == null || element.customclassname == '') alert('nooo');
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
  let [image, setImage] = useState<string>('');
  
  const css = getImageCss( element );

  useEffect(() => {
    fetch(`/api/medias/${element.media_id}`)
    .then( res => res.json() 
    )
    .then( res => {
      let media = res.media as Media
      console.log('check media', media);
      setImage(media.url);
    })
    .catch( err => {

    });
  }, [ image, element.media_id ] );

  let submitEditImageElementBlock = async function (event: FormEvent<HTMLFormElement>) {
    submitEditElementBlock( event, element );
  }

  //let customClass = element.customclassname ?? '';

  return (
    <>
        <div style={css.gridCss}
            className={`
              element.defclassname,
              min-h-10
              hover:scale-105 cursor-pointer hover:border-solid border-2 rounded hover:border-slate-700
              `}
            onClick={() => { setEditElement(true)}}
            >
              <ImageElement css={css} image={image}/>
        </div>
      {
        editElement ? 
        <MediaElementType handler={submitEditImageElementBlock} cancel={() => { setEditElement(false) }} element={element} imageUrl={image}></MediaElementType>
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
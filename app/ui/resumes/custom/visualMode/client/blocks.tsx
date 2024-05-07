'use client'
import { BlockClient, BlocksScreenClient, ElementBlockClient } from "../../interfaces";
import clsx from "clsx";
import { TYPES_TO_CHOOSE } from "../../editMode/client/blocks";
import { getHTMLCss, getImageCss, getTextCss, getVideoCss } from "../../sharedFunctions";
import { ImageElement } from "@/app/ui/components/image-element";
import { TextElement } from "@/app/ui/components/text-element";

export function VisualResponsive({
  blocks
}: Readonly<{
  blocks: BlocksScreenClient
}>) {
  return (
    <div className="default flex justify-center">
    <div className={clsx({
      ['hidden w-full']:true,
      ['2xl:grid']:true
    })
    }
    >
        <BuildBlocks blocks={blocks._2xl as BlockClient[]}/>
    </div>
    <div className={clsx({
        ['hidden 2xl:p-2 w-full']:true,
        ['xl:grid 2xl:hidden']:true
      })
      }>
      <BuildBlocks blocks={blocks.xl as BlockClient[]}/>
    </div>
    <div className={clsx({
        ['hidden xl:p-2 w-full']:true,
        ['lg:grid xl:hidden']:true
      })
    }>
        <BuildBlocks blocks={blocks.lg as BlockClient[]}/>
    </div>
    <div className={clsx({
      ['hidden lg:p-2 w-full']:true,
      ['md:grid lg:hidden']: true
    })}>
      <BuildBlocks blocks={blocks.md as BlockClient[]}/>
    </div>
    <div className={clsx({
        ['p-2 w-full']:true,
        ['grid md:hidden']: true
      })
    }>
      <BuildBlocks blocks={blocks.phone as BlockClient[]}/>
    </div>
  </div>
  )
}

/**
 * Construct customed blocks to show in page
 * @param blocks 
 * @returns 
 */
export function BuildBlocks( { 
  blocks 
}:Readonly<{ 
  blocks:BlockClient[] 
}> ) {
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
   */
function buildElementsForBlock( blockElements:ElementBlockClient[], totLines:number, totCols:number ) {

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
        //let line = Math.ceil(positionTable/totLines);
        let line = Math.ceil(positionTable / totCols );
        let col = positionTable - ( totCols * ( line - 1 ) );
        elementsList[index] = <EmptyElement key={index}/>
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

  let totLines = block.numlines;
  let totCols = block.numcols;

  let elements = block.elements ?? [];

  let blockElements = buildElementsForBlock( elements, totLines, totCols );

  return ( 
    <div key={`blk1`} className={`
      w-full min-h-80 h-fit grid overflow-hidden
      grid-cols-${block.numcols}`
      }
      >
      {
        blockElements
      }
    </div>
  )
} 

function EmptyElement() {

  return  ( 
    <div className="h-fit col-span-1">
      <div className="min-h-8"/>
    </div>
   );
}

function CustomElement({
  element
}:Readonly<{
  element:ElementBlockClient
}>) {
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
  element:ElementBlockClient
}>) {

  let css = getTextCss( element );

  return (
    <div style={css.gridCss} className={clsx({
      ['min-h-8 h-fit']:true,
      ['cursor-pointer']: element.link
    })
    }
    onClick={() => { openLink( element.link ) }}
    >
      <TextElement className={element.defclassname} content={element.content} css={css}/>
    </div>
  )
}

function ElementImageGrid({
  element
}:Readonly<{
  element:ElementBlockClient
}>) {

  const css = getImageCss( element );

  //let customClass = element.customclassname ?? '';
  return (
    <div style={css.gridCss}
     className={clsx({
      [element.defclassname]:true,
      ['min-h-10']:true,
      ['cursor-pointer']: element.link
    })}
    onClick={() => { openLink( element.link ) }}
    >
      <ImageElement css={css} image={element.content} className="hover:scale-105"/>
    </div>
  )
}

function ElementHtmlGrid({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let css = getHTMLCss( element );

  // let customClass = element.customclassname ?? '';
  return (
    <div style={css.gridCss}>
      <div style={css.htmlCss} 
        className={clsx({ [element.defclassname]:true})}
        dangerouslySetInnerHTML={createHTML( element.content )} />
    </div>
  )
}

function ElementVideoGrid({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let css = getVideoCss( element );

  //let customClass = element.customclassname ?? '';

  return (
    <div style={css.gridCss}>
      <div style={css.videoCss} 
        className={clsx({ [element.defclassname]:true})}
        dangerouslySetInnerHTML={createHTML( element.content )} />
    </div>
  )
}

function createHTML( str:string ) {
  return {__html: str };
}

function openLink( link:string|null ) {
  if( link ) {
    window.open( link );
  }
}
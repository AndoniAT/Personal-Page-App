import { FormEvent, useEffect, useState } from "react";
import { BlockClient, ElementBlockClient } from "../../resumesStyles/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { TYPES_TO_CHOOSE } from "../editMode/blocks";
import { Media } from "@/app/lib/definitions";

/**
 * Construct customed blocks to show in page
 * @param blocks 
 * @returns 
 */
export function BuildBlocksVisualMode( { blocks }:Readonly<{ blocks:BlockClient[] }> ) {console.log('check blocks', blocks);
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
        elementsList[index] = <EmptyElement key={index}/>
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

  let totLines = block.numlines;
  let totCols = block.numcols;

  let elements = block.elements ?? [];

  let blockElements = buildElementsForBlock( elements, totLines, totCols );

  return ( 
    <>
      <div key={`blk1`} className={clsx({
      ['w-full min-h-80 h-fit grid']: true,
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
    </>
  )
} 

export function EmptyElement() {

  return  ( 
    <div className="h-fit col-span-1">
      <div className={clsx({
        ['min-h-8']:true,
        /*['bg-slate-200']:true,
        ['border-solid border-2 rounded border-slate-700 hover:scale-105']:true*/
      })}/>
    </div>
   );
}

export function CustomElement({
  element
}:{
  element:ElementBlockClient
}) {
  switch(element.type) {
    case TYPES_TO_CHOOSE.text:
      return <ElementText element={element}></ElementText>
    case TYPES_TO_CHOOSE.image:
      return <ElementImage element={element}></ElementImage>
    case TYPES_TO_CHOOSE.html:
      return <ElementHtml element={element}></ElementHtml>
    case TYPES_TO_CHOOSE.video:
      return <ElementVideo element={element}></ElementVideo>
  }
}

export function ElementText({
  element
}:{
  element:ElementBlockClient
}) {

  let spanRow = element.lineto - element.linefrom + 1;
  let spanCol = element.colto - element.colfrom + 1;
  let myCss = element.css && typeof element.css == 'string' ? JSON.parse( element.css ) : {};
  let gridCss = {
    ...{
      gridRow: `span ${spanRow} / span ${spanRow}`,
      gridColumn: `span ${spanCol} / span ${spanCol}`,
      width: '100%',
      height: '100%'
    }
  }  

  myCss = {
    ...myCss
  }

  //let customClass = element.customclassname ?? '';

  return (
    <div style={gridCss} className={clsx({
      ['min-h-8 h-fit']:true
    })}>
      <div
        className={clsx({ [element.defclassname]:true
          //['hover:scale-105 cursor-pointer border-solid border-2 rounded border-slate-700']:true ,
        })}
        style={myCss}
      >
        {element.content}
      </div>
    </div>
  )
}

export function ElementImage({
  element
}:{
  element:ElementBlockClient
}) {
  let [image, setImage] = useState<string>('');

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

  let spanRow = element.lineto - element.linefrom + 1;
  let spanCol = element.colto - element.colfrom + 1;
  let myCss = element.css && typeof element.css == 'string' ? JSON.parse( element.css ) : {};
  let gridCss = {
    ...{
      gridRow: `span ${spanRow} / span ${spanRow}`,
      gridColumn: `span ${spanCol} / span ${spanCol}`,
      position: 'relative'
    }
  } as React.CSSProperties;

  myCss = {
    ...{
      'width': '100%',
      'height': '100%'
    },
    ...myCss,
  } as React.CSSProperties;

  let customClass = element.customclassname ?? '';

  return (
    <div style={gridCss}
     className={clsx({
      [element.defclassname]:true,
      ['min-h-10']:true
    })}
    >
      {
        image ? 
        <Image
            style={myCss}
            className={clsx({
              //[customClass]: (!!element.customclassname)
            })}
            src={image}
            layout='fill'
            objectFit='cover'
            alt="ImageBlock"
        />
        : 
        <></>
      }
    </div>
  )
}

export function ElementHtml({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let spanRow = element.lineto - element.linefrom + 1;
  let spanCol = element.colto - element.colfrom + 1;
  let myCss = element.css && typeof element.css == 'string' ? JSON.parse( element.css ) : {};
  let gridCss = {
    ...{
      gridRow: `span ${spanRow} / span ${spanRow}`,
      gridColumn: `span ${spanCol} / span ${spanCol}`,
      width: '100%',
      height: '100%'
    }
  }  

  myCss = {
    ...myCss,
    width: '100%',
    height: '100%'
  }

  let customClass = element.customclassname ?? '';
  return (
    <>
      <div style={gridCss}>
        <div style={myCss} 
        className={clsx({ [element.defclassname]:true})}
        dangerouslySetInnerHTML={createHTML( element.content )} />
      </div>
    </>
  )
}

export function ElementVideo({
  element
}:Readonly<{
  element:ElementBlockClient,
}>) {
  let spanRow = element.lineto - element.linefrom + 1;
  let spanCol = element.colto - element.colfrom + 1;
  let myCss = element.css && typeof element.css == 'string' ? JSON.parse( element.css ) : {};
  let gridCss = {
    ...{
      gridRow: `span ${spanRow} / span ${spanRow}`,
      gridColumn: `span ${spanCol} / span ${spanCol}`,
      width: '100%',
      height: '100%'
    }
  }  

  myCss = {
    ...myCss,
    width: '100%',
    height: '100%'
  }

  let customClass = element.customclassname ?? '';
  return (
    <>
      <div style={gridCss}>
        <div style={myCss} 
        className={clsx({ [element.defclassname]:true})}
        dangerouslySetInnerHTML={createHTML( element.content )} />
      </div>
    </>
  )
}

function createHTML( str:string ) {
  return {__html: str };
}
import { useState } from "react";
import { BlockClient, ElementBlockClient } from "../resumesStyles/interfaces";
import clsx from "clsx";

/**
 * Construct customed blocks to show in the  page
 * @param blocks 
 * @returns 
 */
export function BuildBlocks( { blocks }:{ blocks:BlockClient[] } ) {
    const [handlerElement, setHandlerElement] = useState<{x:number, y:number}|{}>({});
    const [handlerSelection, setHandlerSelection] = useState<{from:{x:number, y:number}, to:{x:number, y:number}}|{}>({});
  
    let blocksElements =  blocks.map( ( block:BlockClient ) => {
      let totLines = block.numlines;
      let totCols = block.numcols;

      let elements = block.elements ?? [];

      let blockElements = buildElementsForBlock( elements, totLines, totCols );
      
      return ( 
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
      )
    } );
  
    return (<>
      {
        blocksElements
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
    console.log('check block elements', blockElements);
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
        elementsList[index] = <EmptyElement/>
      }
      
    }
    
    /// Filter ocuped positions by one
    elementsList = elementsList.filter( ( e:any ) => e != 1 );
    return elementsList;
  }

export function EmptyElement() {

  const [color, setColor] = useState<string>('bg-slate-500');

  return  ( 
    <>
        <div className={`col-span-1 h-full ${color} border-solid border-2 rounded border-slate-700 hover:scale-105`}
        />
    </>
   );
}
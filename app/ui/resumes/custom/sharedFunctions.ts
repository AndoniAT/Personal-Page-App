import { ElementBlockClient } from "./interfaces";

export function getImageCss( element:ElementBlockClient ) {
    let spanRow = element.lineto - element.linefrom + 1;
    let spanCol = element.colto - element.colfrom + 1;
    let myCss = element.css && typeof element.css == 'string' ? JSON.parse( element.css ) : {};
  
    // == Grid CSS ==
    const gridCss = {
      gridRow: `span ${spanRow} / span ${spanRow}`,
      gridColumn: `span ${spanCol} / span ${spanCol}`,
      position: 'relative'
    } as React.CSSProperties;
  
    if( myCss.height ) {
      gridCss.height = myCss.height;
      delete myCss.height;
    }
  
    // == Container CSS ==
    let containerCss = {
      'width': '100%',
      'height': '100%'
    } as React.CSSProperties;
  
    if( myCss.justifyContent ) containerCss.justifyContent = myCss.justifyContent
    if( myCss.alignItems ) containerCss.alignItems = myCss.alignItems
    if( myCss.backgroundColor ) containerCss.backgroundColor = myCss.backgroundColor
    delete myCss.justifyContent;
    delete myCss.alignItems;
    delete myCss.backgroundColor;
  
    // == Image Css ==
    if( myCss.heightContent ) { // Custom height for content
      myCss.height = myCss.heightContent;
      delete myCss.heightContent;
    }
  
    if( myCss.widthContent ) {
      myCss.width = myCss.widthContent;
      delete myCss.widthContent;
    }
  
    const imageCss = {
      ...{
        'width': '100%',
        'height': '100%',
        'objectFit': 'cover',
        'overflow': 'hidden'
      },
      ...myCss,
    };
  
    return {
      gridCss: gridCss,
      imageCss: imageCss,
      containerCss: containerCss
    }
}

export function getTextCss( element:ElementBlockClient ) {
  
  let spanRow = element.lineto - element.linefrom + 1;
  let spanCol = element.colto - element.colfrom + 1;
  let myCss = element.css && typeof element.css == 'string' ? JSON.parse( element.css ) : {};
  
  let gridCss = {
    gridRow: `span ${spanRow} / span ${spanRow}`,
    gridColumn: `span ${spanCol} / span ${spanCol}`,
    width: '100%',
    height: '100%'
  }  

  myCss = {
    ...myCss
  }

  return {
    gridCss: gridCss,
    textCss: myCss
  }
}

export function getHTMLCss( element:ElementBlockClient ) {
  
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

  
  return {
    gridCss: gridCss,
    htmlCss: myCss
  }
}

export function getVideoCss( element:ElementBlockClient ) {
  
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

  return {
    gridCss: gridCss,
    videoCss: myCss
  }
}
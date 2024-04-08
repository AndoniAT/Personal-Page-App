import { FaceFrownIcon, HandRaisedIcon, ArrowsPointingOutIcon, Bars3Icon, Bars3BottomLeftIcon, Bars3BottomRightIcon,
    BarsArrowDownIcon, BarsArrowUpIcon, Bars2Icon, ArrowDownLeftIcon,
    ArrowUpLeftIcon,
    ArrowUpRightIcon,
    ArrowDownRightIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    ArrowDownIcon,
 } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { ElementBlockClient } from '../../resumesStyles/interfaces';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDebouncedCallback }from 'use-debounce';
import { inputValueNumberClass } from '@/app/ui/cssComponents/styles';

export function AcceptFussion({
        acceptFusion,
        cancelFusion
    }:{
        acceptFusion:Function,
        cancelFusion:Function
    }) {

    return (
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
                <div className="relative p-4 w-full max-w-2xl max-h-full" style={{margin:'0 auto'}}>
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Fusion Blocks
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal"
                            onClick={() => {
                                cancelFusion();
                            }}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Would you like to fusion these blocks?
                            </p>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                                acceptFusion();
                            }}>
                                Yes
                            </button>
                            <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => {
                                cancelFusion();
                            }}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export function ChooseTypeFusion({
    chooseElementType
}: {
    chooseElementType:Function
}) {
    return (
        <div id="crypto-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Choose a type of element
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal"
                        onClick={() => {
                            chooseElementType('');
                        }}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <ul className="my-4 space-y-3">
                            <li onClick={() => { chooseElementType('text')}} >
                                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <svg width={"50px"} height={"50px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 7L3 7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M10 12H3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M8 17H3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M11.3161 16.6922C11.1461 17.07 11.3145 17.514 11.6922 17.6839C12.07 17.8539 12.514 17.6855 12.6839 17.3078L11.3161 16.6922ZM16.5 7L17.1839 6.69223C17.0628 6.42309 16.7951 6.25 16.5 6.25C16.2049 6.25 15.9372 6.42309 15.8161 6.69223L16.5 7ZM20.3161 17.3078C20.486 17.6855 20.93 17.8539 21.3078 17.6839C21.6855 17.514 21.8539 17.07 21.6839 16.6922L20.3161 17.3078ZM19.3636 13.3636L20.0476 13.0559L19.3636 13.3636ZM13.6364 12.6136C13.2222 12.6136 12.8864 12.9494 12.8864 13.3636C12.8864 13.7779 13.2222 14.1136 13.6364 14.1136V12.6136ZM12.6839 17.3078L17.1839 7.30777L15.8161 6.69223L11.3161 16.6922L12.6839 17.3078ZM21.6839 16.6922L20.0476 13.0559L18.6797 13.6714L20.3161 17.3078L21.6839 16.6922ZM20.0476 13.0559L17.1839 6.69223L15.8161 7.30777L18.6797 13.6714L20.0476 13.0559ZM19.3636 12.6136H13.6364V14.1136H19.3636V12.6136Z" fill="#ffffff"></path> </g></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Text</span>
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                                </a>
                            </li>
                            <li onClick={() => { chooseElementType('image')}} >
                                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 512 512" xmlSpace="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path className="st0" d="M421.828,106.063H90.172v299.859h331.656V106.063z M309.844,160.781c19.125,0,34.656,15.5,34.656,34.641 s-15.531,34.641-34.656,34.641c-19.156,0-34.656-15.5-34.656-34.641S290.688,160.781,309.844,160.781z M399.813,364.688 c-2.328,4.406-6.906,7.156-11.875,7.156H129.469c-4.906,0-9.406-2.656-11.766-6.938c-2.344-4.281-2.172-9.5,0.453-13.656 l75.469-118.594c4.813-7.594,13.125-12.25,22.094-12.406c9-0.188,17.453,4.156,22.563,11.563l44.281,64.094l15.906-25.031 c4.828-7.594,13.125-12.234,22.094-12.406c9-0.172,17.438,4.156,22.563,11.547l55.828,80.828 C401.797,354.938,402.109,360.25,399.813,364.688z"></path> <path className="st0" d="M0,17.844v23.859v452.453h512v-46.828V17.844H0z M464.297,446.438H47.703V65.563h416.594V446.438z"></path> </g> </g></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Image</span>
                                </a>
                            </li>
                            <li onClick={() => { chooseElementType('link')}} >
                                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <svg width="50px" height="50px" viewBox="0 -7 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Youtube-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-200.000000, -368.000000)" fill="#CE1312"> <path d="M219.044,391.269916 L219.0425,377.687742 L232.0115,384.502244 L219.044,391.269916 Z M247.52,375.334163 C247.52,375.334163 247.0505,372.003199 245.612,370.536366 C243.7865,368.610299 241.7405,368.601235 240.803,368.489448 C234.086,368 224.0105,368 224.0105,368 L223.9895,368 C223.9895,368 213.914,368 207.197,368.489448 C206.258,368.601235 204.2135,368.610299 202.3865,370.536366 C200.948,372.003199 200.48,375.334163 200.48,375.334163 C200.48,375.334163 200,379.246723 200,383.157773 L200,386.82561 C200,390.73817 200.48,394.64922 200.48,394.64922 C200.48,394.64922 200.948,397.980184 202.3865,399.447016 C204.2135,401.373084 206.612,401.312658 207.68,401.513574 C211.52,401.885191 224,402 224,402 C224,402 234.086,401.984894 240.803,401.495446 C241.7405,401.382148 243.7865,401.373084 245.612,399.447016 C247.0505,397.980184 247.52,394.64922 247.52,394.64922 C247.52,394.64922 248,390.73817 248,386.82561 L248,383.157773 C248,379.246723 247.52,375.334163 247.52,375.334163 L247.52,375.334163 Z" id="Youtube"> </path> </g> </g> </g></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Link Video</span>
                                </a>
                            </li>
                            <li onClick={() => { chooseElementType('html')}} >
                                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="-52.5 0 361 361" preserveAspectRatio="xMinYMin meet"><path d="M255.555 70.766l-23.241 260.36-104.47 28.962-104.182-28.922L.445 70.766h255.11z" fill="#E44D26"/><path d="M128 337.95l84.417-23.403 19.86-222.49H128V337.95z" fill="#F16529"/><path d="M82.82 155.932H128v-31.937H47.917l.764 8.568 7.85 88.01H128v-31.937H85.739l-2.919-32.704zM90.018 236.542h-32.06l4.474 50.146 65.421 18.16.147-.04V271.58l-.14.037-35.568-9.604-2.274-25.471z" fill="#EBEBEB"/><path d="M24.18 0h16.23v16.035h14.847V0h16.231v48.558h-16.23v-16.26H40.411v16.26h-16.23V0zM92.83 16.103H78.544V0h44.814v16.103h-14.295v32.455h-16.23V16.103h-.001zM130.47 0h16.923l10.41 17.062L168.203 0h16.93v48.558h-16.164V24.49l-11.166 17.265h-.28L146.35 24.49v24.068h-15.88V0zM193.21 0h16.235v32.508h22.824v16.05h-39.06V0z"/><path d="M127.89 220.573h39.327l-3.708 41.42-35.62 9.614v33.226l65.473-18.145.48-5.396 7.506-84.08.779-8.576H127.89v31.937zM127.89 155.854v.078h77.143l.64-7.178 1.456-16.191.763-8.568H127.89v31.86z" fill="#FFF"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">HTML Content</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function TextElementType({
    handler,
    cancel,
    element,
}:Readonly<{
    handler:Function,
    cancel:Function,
    element:ElementBlockClient|null
}>) {
    let [tailwindClass, setTailwindClass] = useState<string|null>(null);
    let [transparent, setTransparent] = useState<boolean>(true);

    const isEdit = !!element;

    /* Colors refs */ 
    const colorBgInputRef = useRef<HTMLInputElement>(null);
    const colorTextInputRef = useRef<HTMLInputElement>(null);
    const colorBorderInputRef = useRef<HTMLInputElement>(null);
    
    let myCss = ( isEdit && element.css && typeof element.css == 'string' ) ? JSON.parse( element.css ) : {};
    
    let size = ( isEdit && myCss.fontSize ) ? parseFloat( myCss.fontSize.split('rem')[0] ) : 1.0;
    // Pading
    let paddingLeft = ( isEdit && myCss.paddingLeft ) ? parseFloat( myCss.paddingLeft.split('rem')[0] ) : 0.0;
    let paddingTop = ( isEdit && myCss.paddingTop ) ? parseFloat( myCss.paddingTop.split('rem')[0] ) : 0.0;
    let paddingRight = ( isEdit && myCss.paddingRight ) ? parseFloat( myCss.paddingRight.split('rem')[0] ) : 0.0;
    let paddingBottom = ( isEdit && myCss.paddingBottom ) ? parseFloat( myCss.paddingBottom.split('rem')[0] ) : 0.0;
    
    // Border
    let borderTopLeftRadius = ( isEdit && myCss.borderTopLeftRadius ) ? parseFloat( myCss.borderTopLeftRadius.split('rem')[0] ) : 0.0;
    let borderBottomLeftRadius = ( isEdit && myCss.borderBottomLeftRadius ) ? parseFloat( myCss.borderBottomLeftRadius.split('rem')[0] ) : 0.0;
    let borderTopRightRadius = ( isEdit && myCss.borderTopRightRadius ) ? parseFloat( myCss.borderTopRightRadius.split('rem')[0] ) : 0.0;
    let borderBottomRightRadius = ( isEdit && myCss.borderBottomRightRadius ) ? parseFloat( myCss.borderBottomRightRadius.split('rem')[0] ) : 0.0;

    let borderWidth = ( isEdit && myCss.borderWidth ) ? parseFloat( myCss.borderWidth.split('rem')[0] ) : 0.0;

    let backgroundColor = ( isEdit && myCss.backgroundColor && typeof myCss.backgroundColor == 'string' ) ? myCss.backgroundColor : '0';
    let textColor = ( isEdit && myCss.color && typeof myCss.color == 'string' ) ? myCss.color : '0';
    let borderColor = ( isEdit && myCss.borderColor && typeof myCss.borderColor == 'string' ) ? myCss.borderColor : '0';

    let content = ( isEdit && element.content ) ? element.content : '';
    let transparentElement = ( isEdit && !myCss.backgroundColor || typeof myCss.backgroundColor == 'string' && myCss.backgroundColor == '');
    
    /* HANDLERS */ 

    const handlerText = useDebouncedCallback(
        (value) => {
          
            if ( isEdit ) {
                let f = new FormData();
                let target = 'content';
                f.set( target, value );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }

        },
        200
    );

    const handlerSize = useDebouncedCallback(
        (value) => {
            if( isEdit ) {
                let f = new FormData();
                let target = 'fontSize';
                f.set( target, value );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    const handlerPadding = useDebouncedCallback(
        (direction, value) => {
            if( isEdit ) {
                let f = new FormData();
                let target = 'padding'+direction;
                f.set( target, value );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    const handlerBorder = useDebouncedCallback(
        (attr, value) => {
            if( isEdit ) {
                let f = new FormData();
                let target = 'border'+attr;
                f.set( target, value );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    /*let tailwindClassElement = ( isEdit && element.customclassname ) ? element.customclassname : '';

    useEffect(() => {
        if( tailwindClass == null ) {
            setTailwindClass(tailwindClassElement);
        }
    }, [tailwindClass, tailwindClassElement])*/

    
    /* Colors Handlers */ 

    const handleColorBgClick = () => {
        if (colorBgInputRef.current) {
            colorBgInputRef.current.click();
        }
    };
    
    const handleColorTextClick = () => {
        if (colorTextInputRef.current) colorTextInputRef.current.click();
    };
    
    const handleColorBorderClick = () => {
        if (colorBorderInputRef.current) {
            colorBorderInputRef.current.click();
        }
    };
    const handleColorBgChange = useDebouncedCallback(
        () => {
            if( isEdit && colorBgInputRef?.current ) {
                let newColor = colorBgInputRef.current.value;
                let f = new FormData();
                let target = 'backgroundColor';
                f.set( target, newColor );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    const handleColorTextChange = useDebouncedCallback(
        () => {
            if( isEdit && colorTextInputRef?.current ) {
                let newColor = colorTextInputRef.current.value;
                let f = new FormData();
                let target = 'textColor';
                f.set( target, newColor );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    const handleColorBorderChange = useDebouncedCallback(
        () => {
            if( isEdit && colorBorderInputRef?.current ) {
                let newColor = colorBorderInputRef.current.value;
                let f = new FormData();
                let target = 'borderColor';
                f.set( target, newColor );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );
    /* ===============  */

    const handleJustify = useDebouncedCallback(
        ( value ) => {
            if( isEdit  ) {
                let f = new FormData();
                let target = 'justifyContent';
                f.set( target, value );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    const handleAlign = useDebouncedCallback(
        ( value ) => {
            if( isEdit  ) {
                let f = new FormData();
                let target = 'alignItems';
                f.set( target, value );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    const handleTransparency = useDebouncedCallback(
        ( transp ) => {
            console.log('set transp', transp);
            if( isEdit ) {
                let newColor = '';
                
                if( !transp && colorBgInputRef?.current) {
                    newColor = colorBgInputRef.current.value;
                }

                let f = new FormData();
                let target = 'backgroundColor';
                f.set( target, newColor );
                f.set( 'target', target );
                element.actions?.updateElement( f );
            }
        },
        200
    );

    useEffect(() => {
        setTransparent( transparentElement );
    }, [ transparentElement ] )

    return (
        <motion.div
        drag
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        whileTap={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.2)" }}
        dragConstraints={{
            top: -350,
            left: -200,
            right: 300,
            bottom: 150,
        }}
        tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Text Element
                            </h3>
                            <HandRaisedIcon className="ml-6 w-6 text-gray-400" ></HandRaisedIcon>
                            <ArrowsPointingOutIcon className="w-6 text-gray-400" ></ArrowsPointingOutIcon>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal"
                            onClick={() => { cancel()}}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={( event ) => {
                            handler( event );
                            }}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {
                                    ( isEdit ) ? 
                                        <div className="col-span-1 sm:col-span-1">
                                            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                                            <input type="number" name="size" id="size" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                                            defaultValue={size ? size :0}
                                            onChange={ ( e ) => {
                                                handlerSize( e.target.value );
                                            }}
                                            />
                                        </div>
                                    :<></>
                                }
                                {

                                /* Tailwind function desactivated because of problems of dinamic classes generation
                                <div className="col-span-2">
                                    <label htmlFor="tailwind" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customize your own style with Tailwind</label>
                                    <input type="text" name="tailwind" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    defaultValue={tailwindClass ? tailwindClass : ''}
                                    onChange={ ( e ) => {
                                        //debounced( e.target.value );

                                        if( isEdit && element != null ) {

                                            let f = new FormData();
                                            let target = 'customclassname';
                                            f.set( target, e.target.value );
                                            f.set( 'target', target );
                                            element.actions?.updateElement( f );
                                            //alert('edit');
                                        }
                                    }}
                                    />
                                    <div>
                                        <span className='text-white text-sm'> You don&apos;t know Tailwind? </span>
                                        <Link
                                        href="https://tailwindcss.com/docs"
                                        className="mt-4 text-sm text-blue transition-colors text-blue-500"
                                        target="_blank"
                                    >
                                        Discover here
                                    </Link>
                                    </div>
                                </div>
                                */
                                }

                                {
                                    ( isEdit ) ? 
                                        <div className='col-span-3'>
                                            { /* Background */ }
                                            <div className='w-full flex'>
                                                <span>Background</span>
                                                <div
                                                    style={{ backgroundColor: backgroundColor }} 
                                                    className='h-5 w-5 border border-gray-600 self-center rounded-full ml-2' onClick={handleColorBgClick}></div>
                                                <input 
                                                ref={colorBgInputRef}
                                                type="color"
                                                id='colorBg'
                                                name="colorBg"
                                                onChange={handleColorBgChange}
                                                defaultValue={backgroundColor}
                                                className='w-5 -ml-5 invisible'
                                                />
                                            </div>
                                            <div className="flex items-center mb-4">
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Transparent</label>
                                                    <input 
                                                    type="checkbox" 
                                                    value="" 
                                                    checked={transparent}
                                                    onChange={() => {
                                                        let newTransp = !transparent;
                                                        setTransparent(newTransp);
                                                        handleTransparency(newTransp);
                                                    }}
                                                    className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            </div>
                                        </div>
                                    :<></>
                                }

                                <div className="col-span-2">
                                    <label htmlFor="txt-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text</label>
                                    <textarea name="content" id="txt-content" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your text here"
                                    defaultValue={content}
                                    onChange={ ( e ) => {
                                        handlerText( e.target.value );
                                    }
                                }
                                    >
                                    </textarea>

                                    {
                                        ( isEdit ) ? 
                                            <>
                                                { /* TEXT COLOR */}
                                                <div className='grid grid-cols-1 mt-5'>
                                                    <div className='w-full flex m-2'>
                                                        <span>Color Text</span>
                                                        <div
                                                            style={{ backgroundColor: textColor }} 
                                                            className='h-5 w-5 border border-gray-600 self-center rounded-full ml-2' onClick={handleColorTextClick}></div>
                                                        <input 
                                                        ref={colorTextInputRef}
                                                        type="color"
                                                        id='colorText'
                                                        name="colorText"
                                                        onChange={handleColorTextChange}
                                                        defaultValue={textColor}
                                                        className='w-5 -ml-5 invisible'
                                                        />
                                                    </div>
                                                </div>
                                                
                                                { /* ALIGN TEXT*/}
                                                <div className='mt-5'>
                                                    <span>Align text</span>
                                                    
                                                    <div className='mt-5 ml-10'>
                                                        { /* JUSTIFY CONTENT */}
                                                        <div className='grid grid-rows-1 grid-cols-5 mt-5'>
                                                            <div className='flex justify-center flex-col text-center'>
                                                                <Bars3BottomLeftIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                                                                onClick={() => {
                                                                    handleJustify('left');
                                                                }}
                                                                ></Bars3BottomLeftIcon>
                                                                <span>Left</span>
                                                            </div>
                                                            <div className='flex justify-center flex-col text-center'>
                                                                <Bars3Icon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                                                                onClick={() => {
                                                                    handleJustify('center');
                                                                }}
                                                                ></Bars3Icon>
                                                                <span>Center</span>
                                                            </div>
                                                            <div className='flex justify-center flex-col text-center'>
                                                                <Bars3BottomRightIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                                                                onClick={() => {
                                                                    handleJustify('right');
                                                                }}
                                                                ></Bars3BottomRightIcon>
                                                                <span>Right</span>
                                                            </div>
                                                        </div>
                                                        { /* ALIGN ITEMS*/}
                                                        <div className='grid grid-rows-1 grid-cols-5 mt-5'>
                                                        <div className='flex justify-center flex-col text-center'>
                                                                <BarsArrowDownIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                                                                onClick={() => {
                                                                    handleAlign('flex-end');
                                                                }}
                                                                ></BarsArrowDownIcon>
                                                                <span>End</span>
                                                            </div>
                                                            <div className='flex justify-center flex-col text-center'>
                                                                    <Bars2Icon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                                                                    onClick={() => {
                                                                        handleAlign('center');
                                                                    }}
                                                                    ></Bars2Icon>
                                                                    <span>Center</span>
                                                            </div>
                                                            <div className='flex justify-center flex-col text-center'>
                                                                    <BarsArrowUpIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                                                                    onClick={() => {
                                                                        handleAlign('flex-start');
                                                                    }}
                                                                    ></BarsArrowUpIcon>
                                                                    <span>Top</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                { /* Padding */}
                                                <div className='mt-5'>
                                                    <span>Padding</span>
                                                    <div className='mt-5 ml-10'>
                                                        <div className='grid grid-cols-4 grid-row-1 m-2 gap-1'>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="paddingleft" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                                                                defaultValue={paddingLeft}
                                                                onChange={ ( e ) => {
                                                                    handlerPadding( 'Left', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowLeftIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="paddingTop" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                                                                defaultValue={paddingTop}
                                                                onChange={ ( e ) => {
                                                                    handlerPadding( 'Top', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowUpIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="paddingRight" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                                                                defaultValue={paddingRight}
                                                                onChange={ ( e ) => {
                                                                    handlerPadding( 'Right', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowRightIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="paddingBottom" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                                                                defaultValue={paddingBottom}
                                                                onChange={ ( e ) => {
                                                                    handlerPadding( 'Bottom', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowDownIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                { /* Border */}
                                                <div className='mt-5'>
                                                    <span>Border</span>
                                                    <div className='mt-5 ml-10'>
                                                        <span>Radius</span>
                                                        <div className='grid grid-cols-4 grid-row-1 m-2 gap-1'>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="borderTopLeft" className={inputValueNumberClass} required min={0.1} step={0.1}
                                                                defaultValue={borderTopLeftRadius}
                                                                onChange={ ( e ) => {
                                                                    handlerBorder( 'TopLeftRadius', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowUpLeftIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="borderBottomLeft" className={inputValueNumberClass} required min={0.1} step={0.1}
                                                                defaultValue={borderBottomLeftRadius}
                                                                onChange={ ( e ) => {
                                                                    handlerBorder( 'BottomLeftRadius', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowDownLeftIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="borderTopRight" className={inputValueNumberClass} required min={0.1} step={0.1}
                                                                defaultValue={borderTopRightRadius}
                                                                onChange={ ( e ) => {
                                                                    handlerBorder( 'TopRightRadius', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowUpRightIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <input type="number" name="borderRightBottom" className={inputValueNumberClass} required min={0.1} step={0.1}
                                                                defaultValue={borderBottomRightRadius}
                                                                onChange={ ( e ) => {
                                                                    handlerBorder( 'BottomRightRadius', e.target.value );
                                                                }}
                                                                />
                                                                <div className='w-12 text-center flex mt-3 justify-center'>
                                                                    <ArrowDownRightIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='mt-5 ml-10'>
                                                        <span>Stroke</span>
                                                        <div className="flex flex-col">
                                                            <input type="number" name="borderWidth" className={inputValueNumberClass} required min={0.1} step={0.1}
                                                            defaultValue={borderWidth}
                                                            onChange={ ( e ) => {
                                                                handlerBorder( 'Width', e.target.value );
                                                            }}
                                                            />
                                                        </div>
                                                        
                                                    </div>
                                                    <div className='mt-5 ml-10'>
                                                        <div className='col-span-3'>
                                                        <div className='w-full flex'>
                                                            <span>Color</span>
                                                            <div
                                                                style={{ backgroundColor: borderColor }} 
                                                                className='h-5 w-5 border border-gray-600 self-center rounded-full ml-2' onClick={handleColorBorderClick}></div>
                                                            <input 
                                                            ref={colorBorderInputRef}
                                                            type="color"
                                                            id='colorBorder'
                                                            name="colorBg"
                                                            onChange={handleColorBorderChange}
                                                            defaultValue={borderColor}
                                                            className='w-5 -ml-5 invisible'
                                                            />
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </>

                                        :<></>
                                    }
                                </div>
                            </div>
                            {
                                (!isEdit) ?
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Accept
                                    </button>
                                :
                                <></>
                            }
                        </form>
                    </div>
            </div>
        </motion.div>
    )
}

export function ErrorModal({
    message,
    accept
}: Readonly<{
    message:string,
    accept:Function
}>) {
    return ( 
        <div id="progress-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="progress-modal"></button>
                    <div className="p-4 md:p-5">
                        <FaceFrownIcon className="w-10 text-gray-400" />
                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Oups ! There was an error</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">{ message }</p>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                            <button data-modal-hide="progress-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => { accept() }}
                            >Ok</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>

    )
}
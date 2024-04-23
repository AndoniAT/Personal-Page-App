'use client'
import { FaceFrownIcon, HandRaisedIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { ElementBlockClient } from '../../interfaces';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback }from 'use-debounce';
import { TYPES_TO_CHOOSE } from './blocks';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import clsx from 'clsx';
import { BorderButtons, ColorButton, ColorButtons, DirectionButtons, DirectionMarginButtons, PositionTextButtons } from './customButtons';
import { InputValueButton } from '@/app/ui/components/value-input';
import TrashButton from '@/app/ui/components/trash-button';
import { LoadScreen } from '@/app/ui/components/loading-modal';
import { CustomModal } from '@/app/ui/components/modalForm';

const waitTime = 700;

export function AcceptFussion({
        acceptFusion,
        cancelFusion
    }:Readonly<{
        acceptFusion:Function,
        cancelFusion:Function
    }>) {

    return (
        <MyStaticModal id="accept-fusion-modal" title={'Fusion Blocks'} close={cancelFusion}>
            <div className="p-4 md:p-5 space-y-4">
                            <p className={`
                                text-base leading-relaxed 
                                text-gray-900 
                                dark:text-gray-400`
                                }>
                                Would you like to fusion these blocks?
                            </p>
            </div>
            <FooterModal>
                <YesButton accept={acceptFusion}/>
                <NoButton refuse={cancelFusion}/>
            </FooterModal>
        </MyStaticModal>
    )
}

export function ChooseTypeFusion({
    chooseElementType
}: Readonly<{
    chooseElementType:Function
}>) {
    return (
        <MyStaticModal id='choose-type-fusion' 
            title='Choose a type of element' close={() => chooseElementType( '' )} 
            maxWidth='max-w-md'>
            
            <div className="p-4 md:p-5">
                <ul className="my-4 space-y-3">
                            <li onClick={() => { chooseElementType(TYPES_TO_CHOOSE.text)}} >

                                <div className={`
                                    flex items-center p-3 text-base font-bold cursor-pointer 
                                    border border-2 border-slate-500
                                    hover:shadow

                                    bg-gray-50 text-gray-900 rounded-lg group  
                                    dark:bg-gray-600 dark:text-white
                                    
                                    hover:bg-gray-200
                                    dark:hover:bg-gray-500
                                    `
                                    }>
                                <svg width={"50px"} height={"50px"} viewBox="0 0 24 24" fill="none" 
                                    className={`
                                    stroke-slate-600
                                    dark:stroke-white
                                    `}>
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path className='stroke-slate-600 dark:stroke-white' d="M13 7L3 7" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path className='stroke-slate-600 dark:stroke-white' d="M10 12H3" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path className='stroke-slate-600 dark:stroke-white' d="M8 17H3" strokeWidth="1.5" strokeLinecap="round"></path>
                                            <path className='stroke-slate-600 fill-slate-600 dark:stroke-white dark:fill-white' d="M11.3161 16.6922C11.1461 17.07 11.3145 17.514 11.6922 17.6839C12.07 17.8539 12.514 17.6855 12.6839 17.3078L11.3161 16.6922ZM16.5 7L17.1839 6.69223C17.0628 6.42309 16.7951 6.25 16.5 6.25C16.2049 6.25 15.9372 6.42309 15.8161 6.69223L16.5 7ZM20.3161 17.3078C20.486 17.6855 20.93 17.8539 21.3078 17.6839C21.6855 17.514 21.8539 17.07 21.6839 16.6922L20.3161 17.3078ZM19.3636 13.3636L20.0476 13.0559L19.3636 13.3636ZM13.6364 12.6136C13.2222 12.6136 12.8864 12.9494 12.8864 13.3636C12.8864 13.7779 13.2222 14.1136 13.6364 14.1136V12.6136ZM12.6839 17.3078L17.1839 7.30777L15.8161 6.69223L11.3161 16.6922L12.6839 17.3078ZM21.6839 16.6922L20.0476 13.0559L18.6797 13.6714L20.3161 17.3078L21.6839 16.6922ZM20.0476 13.0559L17.1839 6.69223L15.8161 7.30777L18.6797 13.6714L20.0476 13.0559ZM19.3636 12.6136H13.6364V14.1136H19.3636V12.6136Z"></path>
                                        </g>
                                </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Text</span>
                                </div>
                            </li>
                            <li onClick={() => { chooseElementType(TYPES_TO_CHOOSE.image)}} >
                                <div className={`
                                    flex items-center p-3 text-base font-bold cursor-pointer 
                                    border border-2 border-slate-500
                                    hover:shadow

                                    bg-gray-50 text-gray-900 rounded-lg group  
                                    dark:bg-gray-600 dark:text-white
                                    
                                    hover:bg-gray-200
                                    dark:hover:bg-gray-500
                                    `
                                    }>
                                    <svg className='stroke-slate-600 dark:stroke-white fill-slate-600 dark:fill-white' version="1.1" id="_x32_" width="50px" height="50px" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <style type="text/css"/>
                                            <g>
                                                <path className="st0" d="M421.828,106.063H90.172v299.859h331.656V106.063z M309.844,160.781c19.125,0,34.656,15.5,34.656,34.641 s-15.531,34.641-34.656,34.641c-19.156,0-34.656-15.5-34.656-34.641S290.688,160.781,309.844,160.781z M399.813,364.688 c-2.328,4.406-6.906,7.156-11.875,7.156H129.469c-4.906,0-9.406-2.656-11.766-6.938c-2.344-4.281-2.172-9.5,0.453-13.656 l75.469-118.594c4.813-7.594,13.125-12.25,22.094-12.406c9-0.188,17.453,4.156,22.563,11.563l44.281,64.094l15.906-25.031 c4.828-7.594,13.125-12.234,22.094-12.406c9-0.172,17.438,4.156,22.563,11.547l55.828,80.828 C401.797,354.938,402.109,360.25,399.813,364.688z"/>
                                                <path className="st0" d="M0,17.844v23.859v452.453h512v-46.828V17.844H0z M464.297,446.438H47.703V65.563h416.594V446.438z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Image</span>
                                </div>
                            </li>
                            <li onClick={() => { chooseElementType(TYPES_TO_CHOOSE.video)}} >
                                <div className={`
                                    flex items-center p-3 text-base font-bold cursor-pointer
                                    border border-2 border-slate-500
                                    hover:shadow

                                    bg-gray-50 text-gray-900 rounded-lg group  
                                    dark:bg-gray-600 dark:text-white
                                    
                                    hover:bg-gray-200
                                    dark:hover:bg-gray-500
                                    `
                                    }>
                                <svg width="50px" height="50px" viewBox="0 -7 48 48" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Youtube-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-200.000000, -368.000000)" fill="#CE1312"> <path d="M219.044,391.269916 L219.0425,377.687742 L232.0115,384.502244 L219.044,391.269916 Z M247.52,375.334163 C247.52,375.334163 247.0505,372.003199 245.612,370.536366 C243.7865,368.610299 241.7405,368.601235 240.803,368.489448 C234.086,368 224.0105,368 224.0105,368 L223.9895,368 C223.9895,368 213.914,368 207.197,368.489448 C206.258,368.601235 204.2135,368.610299 202.3865,370.536366 C200.948,372.003199 200.48,375.334163 200.48,375.334163 C200.48,375.334163 200,379.246723 200,383.157773 L200,386.82561 C200,390.73817 200.48,394.64922 200.48,394.64922 C200.48,394.64922 200.948,397.980184 202.3865,399.447016 C204.2135,401.373084 206.612,401.312658 207.68,401.513574 C211.52,401.885191 224,402 224,402 C224,402 234.086,401.984894 240.803,401.495446 C241.7405,401.382148 243.7865,401.373084 245.612,399.447016 C247.0505,397.980184 247.52,394.64922 247.52,394.64922 C247.52,394.64922 248,390.73817 248,386.82561 L248,383.157773 C248,379.246723 247.52,375.334163 247.52,375.334163 L247.52,375.334163 Z" id="Youtube"> </path> </g> </g> </g></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Link Video</span>
                                </div>
                            </li>
                            <li onClick={() => { chooseElementType(TYPES_TO_CHOOSE.html)}} >
                                <div className={`
                                    flex items-center p-3 text-base font-bold cursor-pointer 
                                    border border-2 border-slate-500
                                    hover:shadow

                                    bg-gray-50 text-gray-900 rounded-lg group  
                                    dark:bg-gray-600 dark:text-white
                                    
                                    hover:bg-gray-200
                                    dark:hover:bg-gray-500
                                    `
                                    }>
                                <svg width="50px" height="50px" viewBox="-52.5 0 361 361" preserveAspectRatio="xMinYMin meet"><path d="M255.555 70.766l-23.241 260.36-104.47 28.962-104.182-28.922L.445 70.766h255.11z" fill="#E44D26"/><path d="M128 337.95l84.417-23.403 19.86-222.49H128V337.95z" fill="#F16529"/><path d="M82.82 155.932H128v-31.937H47.917l.764 8.568 7.85 88.01H128v-31.937H85.739l-2.919-32.704zM90.018 236.542h-32.06l4.474 50.146 65.421 18.16.147-.04V271.58l-.14.037-35.568-9.604-2.274-25.471z" fill="#EBEBEB"/><path d="M24.18 0h16.23v16.035h14.847V0h16.231v48.558h-16.23v-16.26H40.411v16.26h-16.23V0zM92.83 16.103H78.544V0h44.814v16.103h-14.295v32.455h-16.23V16.103h-.001zM130.47 0h16.923l10.41 17.062L168.203 0h16.93v48.558h-16.164V24.49l-11.166 17.265h-.28L146.35 24.49v24.068h-15.88V0zM193.21 0h16.235v32.508h22.824v16.05h-39.06V0z"/><path d="M127.89 220.573h39.327l-3.708 41.42-35.62 9.614v33.226l65.473-18.145.48-5.396 7.506-84.08.779-8.576H127.89v31.937zM127.89 155.854v.078h77.143l.64-7.178 1.456-16.191.763-8.568H127.89v31.86z" fill="#FFF"/></svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">HTML Content</span>
                                </div>
                            </li>
                </ul>
            </div>
        </MyStaticModal>
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

    const isEdit = !!element;

    // Colors refs    
    let myCss = ( isEdit && element.css && typeof element.css == 'string' ) ? JSON.parse( element.css ) : {};
    
    // Size Text
    let size = ( isEdit && myCss.fontSize ) ? parseFloat( myCss.fontSize.split('rem')[0] ) : 1.0;
    
    // Pading
    const DefaultsPadding = getPaddingsFromCss( myCss, isEdit );
    
    // Border
    const DefaultsBorder = getBordersFromCss( myCss, isEdit );

    let backgroundColor = ( isEdit && myCss.backgroundColor && typeof myCss.backgroundColor == 'string' ) ? myCss.backgroundColor : '';
    let textColor = ( isEdit && myCss.color && typeof myCss.color == 'string' ) ? myCss.color : '';

    let content = ( isEdit && element.content ) ? element.content : '';
    
    // HANDLERS
    const handlerText = useDebouncedCallback( (value) => sendFormDataForElement( 'content', value, element), waitTime );
    const handlerSize = useDebouncedCallback( (value) => sendFormDataForElement( 'fontSize', value, element), waitTime );
    const handlerPadding = useDebouncedCallback( (direction, value) => sendFormDataForElement( 'padding'+direction, value, element), waitTime );
    const handlerBorder = useDebouncedCallback( (attr, value) => sendFormDataForElement( 'border'+attr, value, element), waitTime );
    const handleJustify = useDebouncedCallback( ( value ) => sendFormDataForElement( 'justifyContent', value, element), waitTime );
    const handleAlign = useDebouncedCallback( ( value ) => sendFormDataForElement( 'alignItems', value, element), waitTime );
    //const handleTransparency = useDebouncedCallback( ( newcolor ) => sendFormDataForElement( 'backgroundColor', newcolor, element ), 200 );


    // Colors Handlers 
    const handleColorBgChange = useDebouncedCallback( ( value ) => ( isEdit ) ? sendFormDataForElement( 'backgroundColor', value, element) : '', 0 );
    const handleColorTextChange = useDebouncedCallback( ( value ) => ( isEdit ) ? sendFormDataForElement( 'color', value, element) : '', waitTime );
    const handleColorBorderChange = useDebouncedCallback( ( value ) => ( isEdit ) ? sendFormDataForElement( 'borderColor', value, element) : '', waitTime );
    // =============== 

    return (
        <MyDragModal title='Text Element' close={cancel} maxWidth='max-w-lg'>
            <MyForm 
                handlerSubmit={( event: any ) => handler( event, TYPES_TO_CHOOSE.text ) }
                showSubmitButton={!isEdit}
                >
                 {
                    ( isEdit ) ? 
                        <div className="col-span-1 sm:col-span-1 flex flex-row space-x-2">
                            <label htmlFor="size" className="block h-fit self-center text-sm font-medium text-gray-900 dark:text-white">Size</label>
                            <input type="number" name="size" id="size" 
                                className="inputNumberValue" required 
                                min={0.1} step={0.1}
                                defaultValue={size}
                                onChange={ ( e ) => handlerSize( e.target.value ) }
                            />
                        </div>
                        :<></>
                }
                {
                    ( isEdit ) ? 
                        <div className='col-span-3'>
                            { /* Background */ }
                            <ColorButtons 
                                title='Background'
                                defaultColor={backgroundColor}
                                handleColorBgChange={handleColorBgChange}
                                showAlpha={true}
                                showTransparency={true}
                                
                            />
                        </div>
                        :<></>
                }
                <div className="col-span-2">
                    <label htmlFor="txt-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Text
                    </label>
                    <textarea name="content" id="txt-content" rows={4} 
                        className="block p-2.5 w-full 
                        border border-2 border-slate-500
                        bg-gray-50 rounded-lg border border-gray-300
                        text-sm text-slate-900
                        
                        dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:placeholder-gray-400 
                        
                        focus:ring-blue-500 focus:border-blue-500 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        
                        placeholder="Write your text here"
                        defaultValue={content}
                        onChange={ ( e ) => handlerText( e.target.value ) }
                    >
                    </textarea>
                    {
                        ( isEdit ) ? 
                            <>
                                { /* TEXT COLOR */}
                                <div className='grid grid-cols-1 mt-5'>
                                    <div className='w-full flex m-2'>
                                        <ColorButtons
                                        title='Color Text'
                                        defaultColor={textColor}
                                        handleColorBgChange={handleColorTextChange}
                                        showAlpha={false}
                                        showTransparency={false}
                                        />
                                    </div>
                                </div>            
                                { /* ALIGN TEXT*/}
                                <div className='mt-5'>
                                    <PositionTextButtons handlerAlign={handleAlign} handlerJustify={handleJustify}/>
                                </div>
                                { /* Padding */}
                                <div className='mt-5'>
                                    <DirectionButtons handlerValue={handlerPadding} defaults={DefaultsPadding} title={'Padding'}></DirectionButtons>
                                </div>
                                { /* Border */}
                                <div className='mt-5'>
                                        <BorderButtons defaults={DefaultsBorder} handleColorBorderChange={handleColorBorderChange} handlerBorder={handlerBorder}/>
                                </div>
                                { /* DELETE */}
                                {
                                    (element.actions?.deleteElement) ?
                                    <div className='mt-5'>
                                        <TrashButton cancel={cancel} deleteElement={element.actions.deleteElement}></TrashButton>
                                    </div>
                                    : <></>
                                }
                                </>
                                :<></>
                    }
                </div>
            </MyForm>
        </MyDragModal>
    )
}

export function MediaElementType({
    handler,
    cancel,
    element,
    imageUrl
}:Readonly<{
    handler:Function,
    cancel:Function,
    element:ElementBlockClient|null,
    imageUrl?:string|null
}>) {
    const isEdit = !!element;
    const [image, setImage] = useState<string>('');
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const params = useParams()
    const username = params.username as string;

    let myCss = ( isEdit && element.css && typeof element.css == 'string' ) ? JSON.parse( element.css ) : {};

    // Bg
    let backgroundColor = ( isEdit && myCss.backgroundColor && typeof myCss.backgroundColor == 'string' ) ? myCss.backgroundColor : '';

    // Pading
    let DefaultsPadding = getPaddingsFromCss( myCss, isEdit );

    // Margin
    let { left, top } = getMarginsFromCss( myCss, isEdit );
    let DefaultsMargin = { left: left, top: top }

    // Border
    const DefaultsBorder = getBordersFromCss( myCss, isEdit );

    const defaultHeight = ( isEdit && myCss.height ) ? parseFloat( myCss.height.split('rem')[0] ) : 8;
    const defaultHeightImage = ( isEdit && myCss.heightContent ) ? parseFloat( myCss.heightContent.split('%')[0] ) : 100;
    const defaultWidthImage = ( isEdit && myCss.widthContent ) ? parseFloat( myCss.widthContent.split('%')[0] ) : 100;

    const handlerBorder = useDebouncedCallback( (attr, value) => sendFormDataForElement( 'border'+attr, value, element), waitTime );
    
    /* HANDLERS */
    const handlerPadding = useDebouncedCallback( (direction, value) => sendFormDataForElement( 'padding'+direction, value, element) , 200 );
    const handlerJustify = useDebouncedCallback( ( value ) => sendFormDataForElement( 'justifyContent', value, element), waitTime );
    const handlerAlign = useDebouncedCallback( ( value ) => sendFormDataForElement( 'alignItems', value, element), waitTime );
    
    // Colors
    const handleColorBgChange = useDebouncedCallback( ( value ) => ( isEdit ) ? sendFormDataForElement( 'backgroundColor', value, element) : '', 0 );
    const handleColorBorderChange = useDebouncedCallback( ( value ) => ( isEdit ) ? sendFormDataForElement( 'borderColor', value, element) : '', waitTime );

    const handlerMargin = useDebouncedCallback( (direction, value) => {
        if( direction == 'Bottom' ) {
            direction = 'Top';
            value *=-1; 
        } else if( direction == 'Right') {
            direction = 'Left';
            value *=-1; 
        }

        sendFormDataForElement( 'margin'+direction, value, element), 200 
    } );

    const handlerHeight = useDebouncedCallback( (value) => { sendFormDataForElement( 'height', value, element) }, waitTime );
    const handlerHeightImage = useDebouncedCallback( (value) => sendFormDataForElement( 'heightContent', value, element), waitTime );
    const handlerWidthImage = useDebouncedCallback( (value) => sendFormDataForElement( 'widthContent', value, element), waitTime );

    const handleImageChange = async () => {
        if ( imageInputRef?.current?.files && imageInputRef.current.files.length > 0 ) {
          let file = imageInputRef.current.files[0];
          let reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result as string);
            setLoading(false);
          }

          setLoading(true);
          reader.readAsDataURL(file);
        }
    };
    
    const handleImageClick = () => {
        if (imageInputRef.current && !isEdit && !loading ) {
            imageInputRef.current.click();
        }
    };

    useEffect(() => {
        if( imageUrl ) {
            setImage( imageUrl )
        }
    }, [imageUrl])

    return (
        <MyDragModal className={clsx({
            ['loading']: loading,
        })}
        id='customImageModal'
        close={cancel}
        maxWidth='max-w-lg'
        title='Image Element'
        >
            <MyForm
                handlerSubmit={async( event:any ) => {
                    setLoading(true);
                    await handler( event, TYPES_TO_CHOOSE.image );
                    setLoading(false);
                }}
                showSubmitButton={(!isEdit && !loading)}
            >
                    { /* Image Container */}
                    {
                        (image) ?
                            <div className='col-span-2 border border-2 border-slate-500 p-3 rounded-xl'>
                                <div className={clsx({
                                    ["image-found overflow-hidden"]:true,
                                    ["image-new"]: !isEdit
                                })
                                } style={{position:"relative"}}
                                    onClick={handleImageClick}
                                >
                                    <Image
                                        src={image}
                                        layout='fill'
                                        alt="Imageelement"
                                        className={"bg-cover bg-center Imageelement"}
                                    />
                                </div>
                            </div>
                        : 
                            <>
                                <div className='col-span-2 border border-2 border-slate-500 p-3 rounded-xl'>
                                    <div className={clsx({
                                        ["no-image"]: true,
                                        ["hover:scale-105"]: !loading
                                        })
                                        }
                                        onClick={handleImageClick}
                                    >
                                    </div>
                                </div>
                            </>
                    }
                    <input
                        ref={imageInputRef}
                        type="file"
                        id="imageElement"
                        name="image"
                        required
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    {
                        ( isEdit ) ? 
                        <>
                            <div className="w-full col-span-2">
                                { /* Padding */}
                                {
                                                    
                                    <div className='mt-5'>
                                        <DirectionButtons handlerValue={handlerPadding} defaults={DefaultsPadding} title={'Padding'}></DirectionButtons>
                                    </div>
                                }
                            </div>

                            <div className="w-full col-span-2">
                                { /* Margin */}
                                {                
                                    <div className='mt-5'>
                                        <DirectionMarginButtons handlerValue={handlerMargin} defaults={DefaultsMargin} title={'Margin'}/>
                                    </div>
                                }
                            </div>
                            { /* BACKGROUND */}
                            <div className='mt-5 col-span-2'>
                                <ColorButtons
                                title='Background'
                                defaultColor={backgroundColor}
                                handleColorBgChange={handleColorBgChange}
                                showAlpha={true}
                                showTransparency={true}
                                />
                            </div>

                            { /* ALIGN TEXT*/}
                            <div className='mt-5 col-span-2'>
                                <PositionTextButtons handlerAlign={handlerAlign} handlerJustify={handlerJustify}/>
                            </div>

                            { /* Border */}
                            <div className='mt-5 col-span-2'>
                                <BorderButtons defaults={DefaultsBorder} handleColorBorderChange={handleColorBorderChange} handlerBorder={handlerBorder}/>
                            </div>

                            <div className='mt-5 col-span-2 flex flex-row space-x-4'>
                                <InputValueButton title='Height Image (%)' min={10} defaultVal={defaultHeightImage} handlerValueChange={handlerHeightImage} step={1}/>
                                <InputValueButton title='Width Image (%)' min={10} defaultVal={defaultWidthImage} handlerValueChange={handlerWidthImage} step={1}/>
                            </div>

                            <div className='mt-5 col-span-2 flex flex-row space-x-4'>
                                <InputValueButton title='Height Container' min={8} defaultVal={defaultHeight} handlerValueChange={handlerHeight} step={1}/>
                            </div>

                            { /* DELETE */}
                            {
                                (element.actions?.deleteElement) ?
                                <div className='mt-5 col-span-2'>
                                    <TrashButton cancel={cancel} deleteElement={element.actions.deleteElement}></TrashButton>
                                </div>
                                : <></>

                            }
                        </>
                            : <></>
                    }
            </MyForm>
        </MyDragModal>
    )
}

export function HtmlElementType({
    handler,
    cancel,
    element,
}:Readonly<{
    handler:Function,
    cancel:Function,
    element:ElementBlockClient|null
}>) {
    const contentExample = `<div
    style="background-color: crimson;
    height:100%;
    text-align:center;
    display:flex;
    justify-content:center;
    align-items: center;
    opacity: 0.7;
    ">
    Hello Word
    </div>`;

    const isEdit = !!element;
    let content = ( isEdit && element.content ) ? element.content : contentExample;
    const [loading, setLoading] = useState<boolean>(false);
    /* HANDLERS */ 
    const handlerText = useDebouncedCallback( async (value) => {
        setLoading(true);
        setTimeout(async () => {
            await sendFormDataForElement( 'content', value, element) 
            setLoading(false);
        }, 500)
    }, 1000);

    return (
        <>
        <MyDragModal className={clsx({
            ['loading']: loading,
        })}
        close={cancel}
        title='HTML Element'
        id='customHTMLModal'
        maxWidth='max-w-xl'
        >
            <MyForm 
                handlerSubmit={ async ( event:any ) => {
                    setLoading(true);
                    await handler( event, TYPES_TO_CHOOSE.html );
                    setLoading(false);
                }}
                showSubmitButton={(!isEdit && !loading)}

            >
                <div className="col-span-2">
                    <label htmlFor="txt-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HTML content</label>
                    <p className='text-xs'>Explore this tool by adding your own HTML and creating your own style with CSS.</p><br/>
                    <textarea name="content" rows={20} disabled={loading}
                        className={clsx({
                            ["cursor-wait"]: loading,
                            ["block p-2.5 w-full text-md font-bold	 text-gray-900 rounded-lg border"]:true,
                            ["bg-slate-700"]:true,
                            ["bg-gray-50 border-gray-300 placeholder-gray-400 text-cyan-500"]:true,
                            ["dark:bg-slate-300"]:true,
                            ["dark:border-gray-500 dark:placeholder-gray-400 dark:text-sky-950"]:true,
    
                            ["focus:ring-blue-500 focus:border-blue-500"]:true,
                            ["dark:focus:ring-blue-500 dark:focus:border-blue-500"]:true
                            
                        })}
                        placeholder="Write your HTML here"
                        defaultValue={content}
                        onChange={(e) => {
                            handlerText( e.currentTarget.value );
                        }}
                    />
                </div>
                
                { /* DELETE */}
                {

                    ( isEdit && element.actions?.deleteElement) ?
                    <div className='mt-5'>
                        <TrashButton cancel={cancel} deleteElement={element.actions.deleteElement}></TrashButton>
                    </div>
                    : <></>

                }
            </MyForm>
        </MyDragModal>
        </>
    )
}

export function VideoElementType({
    handler,
    cancel,
    element,
}:Readonly<{
    handler:Function,
    cancel:Function,
    element:ElementBlockClient|null
}>) {
    const [loading, setLoading] = useState<boolean>(false);

    const isEdit = !!element;
    let content = ( isEdit && element.content ) ? element.content : '';
    
    /* HANDLERS */ 
    const handlerText = useDebouncedCallback( (value) => sendFormDataForElement( 'content', value, element), waitTime );

    return (
        <MyDragModal className={clsx({
            ['loading']: loading,
        })}
        close={cancel}
        title='Video Element'
        id='customYTodal'
        maxWidth='max-w-xl'
        >
            <MyForm
                handlerSubmit={async( event:any ) => {
                    setLoading(true);
                    await handler( event, TYPES_TO_CHOOSE.video );
                    setLoading(false);
                }}
                showSubmitButton={(!isEdit && !loading)}
            >
                <div className="col-span-2">
                        <label htmlFor="txt-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Youtube Content
                        </label>
                        <p className='text-xs'>Copy paste your iframe.</p><br/>
                    <textarea name="content" rows={20} 
                        className={clsx({
                            ["cursor-wait"]: loading,
                            ["block p-2.5 w-full text-md font-bold	 text-gray-900 rounded-lg border"]:true,
                            ["bg-slate-700"]:true,
                            ["bg-gray-50 border-gray-300 placeholder-gray-400 text-cyan-500"]:true,
                            ["dark:bg-slate-300"]:true,
                            ["dark:border-gray-500 dark:placeholder-gray-400 dark:text-sky-950"]:true,
    
                            ["focus:ring-blue-500 focus:border-blue-500"]:true,
                            ["dark:focus:ring-blue-500 dark:focus:border-blue-500"]:true
                            
                        })}
                        placeholder="Write your <iframe/> here"
                        defaultValue={content}
                        onChange={ ( e ) => {
                            handlerText( e.target.value );
                            }
                        }
                    >
                    </textarea>
                </div>

                { /* DELETE */}
                {
                    ( isEdit && element.actions?.deleteElement) ?
                    <div className='mt-5'>
                        <TrashButton cancel={cancel} deleteElement={element.actions.deleteElement}></TrashButton>
                    </div>
                    : <></>

                }
            </MyForm>
        </MyDragModal>
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

export function UpdateSectionModal({
        cancel,
        customRevalidateTag,
        section
    }:Readonly<{
        cancel:Function,
        customRevalidateTag:Function,
        section:{section_id:string, name:string}
    }>) {
        const [ loading, setLoading ] = useState<boolean>(false);

        let { username } = useParams();

        const handler = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData( event.currentTarget )
            formData.set('username', username.toString());

            try {
                let section_updated = await fetch(`/api/sections/${section.section_id}`, {
                    method: 'PUT',
                    body: formData
                });
                console.log('updated', section_updated);
                cancel();
                customRevalidateTag('edit');
                setLoading(false);
            } catch( err ) {
                console.log('Error', err);
            }
        }
        
        return (
            <>
                {
                    (loading) ?
                    <LoadScreen/>:

                    <CustomModal
                cancel={cancel}
                handler={() => {}}
                title='Update Section'
                >
                    <form className="p-4 md:p-5" onSubmit={( event ) => {
                                    handler( event );
                                }}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="txt-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                    </label>
                                <input  type='text' name="name" 
                                defaultValue={section.name}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="My Section">
                                </input>
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Accept
                        </button>
                    </form>
                    </CustomModal>
                }
            </>
        )
}

/**
 * 
 * @param attr 
 * @param element 
 */
function sendFormDataForElement( attr:string, value:any, element:ElementBlockClient|null ) {
    if( element ) {
        let f = new FormData();
        let target = attr;
        f.set( target, value );
        f.set( 'target', target );
        element.actions?.updateElement( f );
    }
}

function getPaddingsFromCss( myCss:any, isEdit:boolean ) {
    return {
        left : ( isEdit && myCss.paddingLeft ) ? parseFloat( myCss.paddingLeft.split('rem')[0] ) : 0.0,
        top : ( isEdit && myCss.paddingTop ) ? parseFloat( myCss.paddingTop.split('rem')[0] ) : 0.0,
        right : ( isEdit && myCss.paddingRight ) ? parseFloat( myCss.paddingRight.split('rem')[0] ) : 0.0,
        bottom : ( isEdit && myCss.paddingBottom ) ? parseFloat( myCss.paddingBottom.split('rem')[0] ) : 0.0
    }
}

function getMarginsFromCss( myCss:any, isEdit:boolean ) {
    return {
        left : ( isEdit && myCss.marginLeft ) ? parseFloat( myCss.marginLeft.split('rem')[0] ) : 0.0,
        top : ( isEdit && myCss.marginTop ) ? parseFloat( myCss.marginTop.split('rem')[0] ) : 0.0,
        right : ( isEdit && myCss.marginRight ) ? parseFloat( myCss.marginRight.split('rem')[0] ) : 0.0,
        bottom : ( isEdit && myCss.marginBottom ) ? parseFloat( myCss.marginBottom.split('rem')[0] ) : 0.0
    }
}

function getBordersFromCss( myCss:any, isEdit:boolean ) {
    return {
        borderTopLeftRadius : ( isEdit && myCss.borderTopLeftRadius ) ? parseFloat( myCss.borderTopLeftRadius.split('rem')[0] ) : 0.0,
        borderBottomLeftRadius : ( isEdit && myCss.borderBottomLeftRadius ) ? parseFloat( myCss.borderBottomLeftRadius.split('rem')[0] ) : 0.0,
        borderTopRightRadius : ( isEdit && myCss.borderTopRightRadius ) ? parseFloat( myCss.borderTopRightRadius.split('rem')[0] ) : 0.0,
        borderBottomRightRadius : ( isEdit && myCss.borderBottomRightRadius ) ? parseFloat( myCss.borderBottomRightRadius.split('rem')[0] ) : 0.0,
        borderWidth : ( isEdit && myCss.borderWidth ) ? parseFloat( myCss.borderWidth.split('rem')[0] ) : 0.0,
        borderColor : ( isEdit && myCss.borderColor && typeof myCss.borderColor == 'string' ) ? myCss.borderColor : '0'
    }
}

function CloseButton({
    handler
}: Readonly<{
    handler:Function
}>) {
    return (
        <button type="button" data-modal-toggle="crud-modal" onClick={() => { handler()}}
            className={`
            bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
            text-gray-900 hover:bg-gray-200 hover:text-gray-900
            dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white
            `}>
            <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
        </button>
        
    )
}

interface MyModalProps extends React.AllHTMLAttributes<HTMLAllCollection> {
    maxWidth?:string;
    children: React.ReactNode;
    close:Function,
    title:string,
    drag?:boolean
}
  
export function MyStaticModal({ 
    children, className, maxWidth, title, 
    close, drag, ...rest 
}: Readonly<MyModalProps>) {
    let maxW = maxWidth ?? 'max-w-2xl';
    return (
        <div id={rest.id} tabIndex={-1} aria-hidden="true" 
            className={clsx({
                ['overflow-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex']:true,
                ['cursor-grab']: drag
            })
            }>
            <div className={`relative p-4 w-full ${maxW} max-h-full`} style={{margin:'0 auto'}}>
                <div className={`
                    relative rounded-lg shadow border-2
                    bg-slate-300 border-slate-500
                    dark:bg-gray-700 ${className}`
                }
                    style={{ maxHeight:'90vh'}}>
                        <HeaderModal title={title} cancel={close} drag={drag} />
                        { children }
                </div>
            </div>
        </div>
    )
}

function HeaderModal({
    title,
    drag,
    cancel
}: Readonly<{
    title:string,
    drag?:boolean,
    cancel:Function
}>) {
    return (
        <div className={`
            flex items-center justify-between p-4 md:p-5 border-b rounded-t 
            border-slate-500
            dark:border-gray-600`}>
            <h3 className={`
                text-xl font-semibold 
                text-gray-900 
                dark:text-white
            `}>
                {title}
            </h3>
            {
                (drag) ?
                <>
                    <HandRaisedIcon className={`
                                ml-6 w-6 
                                text-gray-900
                                dark:text-gray-400`
                            }/>
                            <ArrowsPointingOutIcon className={`
                                w-6 
                                text-gray-900
                                dark:text-gray-400
                    `}/>
                </>
                :
                <></>
            }
            <CloseButton handler={cancel}/>
        </div>
    )
}

interface MyFooterProps extends React.AllHTMLAttributes<HTMLAllCollection> {
    children: React.ReactNode;
}

export function FooterModal({ children, className, ...rest }: Readonly<MyFooterProps>) {
    return (
        <div className={`
            flex items-center p-4 md:p-5 border-t rounded-b
            border-slate-500
            dark:border-gray-600`}>
            {children}
        </div>
    )
}

export function YesButton({
    accept
}:Readonly<{
    accept:Function
}>) {
    return (
        <button data-modal-hide="default-modal" type="button" 
        className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center
        text-white focus:ring-4 focus:outline-none   
        
        bg-blue-700
        dark:bg-blue-600 
        
        hover:bg-blue-800
        dark:hover:bg-blue-700 
        
        focus:ring-blue-300 
        dark:focus:ring-blue-800
        
        `}
            onClick={() => accept() }>
                Yes
        </button>
    )
}

export function NoButton({
    refuse
}:Readonly<{
    refuse:Function
}>) {
    return (
        <button onClick={() => refuse() } data-modal-hide="default-modal" type="button" 
        className={`py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none 
        rounded-lg border
        focus:z-10 focus:ring-4
        
        bg-white         text-gray-900      border-gray-200 
        dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
        
        hover:text-blue-700   hover:bg-gray-100
        dark:hover:text-white dark:hover:bg-gray-700

        focus:ring-gray-100 
        dark:focus:ring-gray-700 
        `}
            >
                No
        </button>
    )
}
  
export function MyDragModal({ children, className, title, close, maxWidth, ...rest }: Readonly<MyModalProps>) {
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
        id={rest.id}
        >
            <MyStaticModal close={close} title={title} maxWidth={maxWidth} drag={true} className={className}>
                { children }
            </MyStaticModal>
        </motion.div>
    )
}

interface MyFormProps extends React.AllHTMLAttributes<HTMLAllCollection> {
    children: React.ReactNode;
    handlerSubmit:Function;
    showSubmitButton:boolean;
}

export function MyForm({ children, className, handlerSubmit, showSubmitButton, ...rest }: Readonly<MyFormProps>) {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <form className={clsx({
        ["p-4 md:p-5"]:true,
        ['loading']: loading,
        })
        }
            onSubmit={async( event ) => {
            setLoading(true);
            await handlerSubmit( event );
            setLoading(false);
        }}>
            <div className="overflow-y-auto flex flex-col"
                style={{maxHeight:'70vh'}}
            >   
                <div className="grid gap-4 mb-4 grid-cols-2">
                    {children}
                </div>
                <div>
                    {
                        (showSubmitButton && !loading) ?
                        
                        <button type="submit" 
                        className={`
                            text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            `}>
                                Accept
                        </button>
                        :
                        <></>
                    }

                </div>
            </div>
        </form>

    )
}
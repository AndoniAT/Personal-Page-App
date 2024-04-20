'use client'
import { ArrowDownIcon, ArrowDownLeftIcon, ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowUpLeftIcon, ArrowUpRightIcon, Bars2Icon, Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon, BarsArrowDownIcon, BarsArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { inputValueNumberClass } from '@/app/ui/cssComponents/styles';
import { useEffect, useRef, useState } from "react";
import { LoadScreen } from "@/app/ui/components/loading-modal";
import { InputValueButton } from "@/app/ui/components/value-input";
import identityServer4 from "next-auth/providers/identity-server4";

interface DefaultsValuesDirection  {
    left:number,
    top:number,
    right:number,
    bottom:number
}

interface DefaultsValuesMarginDirection  {
    left:number,
    top:number
}

interface DefaultsBorder {
    borderTopLeftRadius:number,
    borderBottomLeftRadius:number,
    borderTopRightRadius:number,
    borderBottomRightRadius:number,
    borderWidth:number,
    borderColor:string
}

export function DirectionButtons({
    handlerValue,
    defaults,
    title
}:
Readonly<{
    handlerValue:Function
    defaults:DefaultsValuesDirection,
    title:string
}>) {
    return (
        <>
            <span>{title}</span>
            <div className='mt-5 ml-10'>
                <div className='grid grid-cols-4 grid-row-1 m-2 gap-1'>
                    <div className="flex flex-col">
                        <input type="number" name="paddingleft" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                        defaultValue={defaults.left}
                        onChange={ ( e ) => {
                            handlerValue( 'Left', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowLeftIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingTop" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                        defaultValue={defaults.top}
                                                                onChange={ ( e ) => {
                            handlerValue( 'Top', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowUpIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingRight" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                        defaultValue={defaults.right}
                        onChange={ ( e ) => {
                            handlerValue( 'Right', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowRightIcon className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                                                                </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingBottom" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={0.1} step={0.1}
                        defaultValue={defaults.bottom}
                        onChange={ ( e ) => {
                            handlerValue( 'Bottom', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowDownIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function DirectionMarginButtons({
    handlerValue,
    defaults,
    title
}:
Readonly<{
    handlerValue:Function
    defaults:DefaultsValuesMarginDirection,
    title:string
}>) {

    return (
        <>
            <span>{title}</span>
            <div className='mt-5 ml-10'>
                <div className='grid grid-cols-4 grid-row-1 m-2 gap-1'>
                    <div className="flex flex-col">
                        <input type="number" name="paddingleft" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required step={0.1}
                        defaultValue={defaults.left}
                        onChange={ ( e ) => {
                            handlerValue( 'Left', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowLeftIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                            <ArrowRightIcon className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingTop" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required step={0.1}
                        defaultValue={defaults.top}
                                                                onChange={ ( e ) => {
                            handlerValue( 'Top', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowUpIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                            <ArrowDownIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function BorderButtons({
    handlerBorder,
    defaults,
    handleColorBorderChange
}:Readonly<{
    handlerBorder:Function,
    defaults:DefaultsBorder,
    handleColorBorderChange:Function
}>
) {
    const colorBorderInputRef = useRef<HTMLInputElement>(null);
    const handleColorBorderClick = () => (colorBorderInputRef.current) ? colorBorderInputRef.current.click() : '';

    return (
        <>
            <span>Border</span>
                <div className='mt-5 ml-10'>
                    <span>Radius</span>
                    <div className='grid grid-cols-4 grid-row-1 m-2 gap-1'>
                        <div className="flex flex-col">
                            <input type="number" name="borderTopLeft" className={inputValueNumberClass} required min={0.1} step={0.1}
                            defaultValue={defaults.borderTopLeftRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'TopLeftRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowUpLeftIcon className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input type="number" name="borderBottomLeft" className={inputValueNumberClass} required min={0.1} step={0.1}
                            defaultValue={defaults.borderBottomLeftRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'BottomLeftRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowDownLeftIcon className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input type="number" name="borderTopRight" className={inputValueNumberClass} required min={0.1} step={0.1}
                            defaultValue={defaults.borderTopRightRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'TopRightRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowUpRightIcon className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input type="number" name="borderRightBottom" className={inputValueNumberClass} required min={0.1} step={0.1}
                            defaultValue={defaults.borderBottomRightRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'BottomRightRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowDownRightIcon className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-5 ml-10'>
                    <span>Stroke</span>
                    <div className="flex flex-col">
                        <input type="number" name="borderWidth" className={inputValueNumberClass} required min={0.1} step={0.1}
                        defaultValue={defaults.borderWidth}
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
                            style={{ backgroundColor: defaults.borderColor }} 
                            className='h-5 w-5 border border-gray-600 self-center rounded-full ml-2' onClick={handleColorBorderClick}></div>
                        <input 
                        ref={colorBorderInputRef}
                        type="color"
                        id='colorBorder'
                        name="colorBg"
                        onChange={() => handleColorBorderChange(colorBorderInputRef) }
                        defaultValue={defaults.borderColor}
                        className='w-5 -ml-5 invisible'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export function JustifyButtons({
    handler
}: Readonly<{
    handler:Function
}>){
    const [ loading, setLoading ] = useState<boolean>(false);

    const callHandler =async( position:string ) => {
        setLoading( true );
        await handler(position);
        setTimeout(() => {
            setLoading( false );
        }, 200)
    }
    return (
        <>
            {
                ( loading ) ? 
                <LoadScreen/>
                :
                <>
                    <div className='flex justify-center flex-col text-center'>
                        <Bars3BottomLeftIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                            onClick={() => {
                                callHandler('left');
                            }}
                        ></Bars3BottomLeftIcon>
                        <span>Left</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <Bars3Icon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                            onClick={() => {
                                callHandler('center');
                            }}
                        />
                        <span>Center</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <Bars3BottomRightIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                            onClick={() => {
                                callHandler('right');
                            }}
                        />
                    <span>Right</span>
                    </div>
                </>
            }
        </>
    )
}

export function AlignButtons({
    handler
}:Readonly<{
    handler:Function
}>) {
    const [ loading, setLoading ] = useState<boolean>(false);

    const callHandler =async( position:string ) => {
        setLoading( true );
        await handler(position);
        setTimeout(() => {
            setLoading( false );
        }, 200)
    }
    return (
        <>
            {
                (loading) ?
                <LoadScreen/>
                :
                <>
                    <div className='flex justify-center flex-col text-center'>
                        <BarsArrowDownIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                            onClick={() => {
                                callHandler('flex-end');
                            }}
                        />
                        <span>End</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <Bars2Icon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                            onClick={() => {
                                callHandler('center');
                            }}
                        />
                        <span>Center</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <BarsArrowUpIcon  className="self-center w-5 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer"
                            onClick={() => {
                                callHandler('flex-start');
                            }}
                        />
                        <span>Top</span>
                    </div>
                </>
            }
        </>
    )
}

export function PositionTextButtons({
    handlerJustify,
    handlerAlign
}: Readonly<{
    handlerJustify:Function,
    handlerAlign:Function
}>) {
    return (
        <>
            <span>Align text</span>
                                                    
            <div className='mt-5 ml-10'>
                { /* JUSTIFY CONTENT */}
                <div className='grid grid-rows-1 grid-cols-5 mt-5'>
                    <JustifyButtons handler={handlerJustify} />
                </div>
                { /* ALIGN ITEMS*/}
                <div className='grid grid-rows-1 grid-cols-5 mt-5'>
                    <AlignButtons handler={handlerAlign}/>
                </div>
            </div>
        </>
    )
}

export function BackgroundColorButton({
    backgroundColor,
    handleTransparency,
    handleColorBgChange,
    transparentElement
}:Readonly<{
    backgroundColor:string,
    handleTransparency:Function,
    handleColorBgChange:Function,
    transparentElement:boolean
}>) {
    let [transparent, setTransparent] = useState<boolean>(true);
    let [alpha, setAlpha] = useState<number>(-1);

    backgroundColor = colorStringToRGBAString( backgroundColor );

    let rgba = colorStringToObjectRGBA( backgroundColor );
    console.log('my alpha', rgba.a);
    const colorBgInputRef = useRef<HTMLInputElement>(null);
    const handleColorBgClick = () => (colorBgInputRef.current) ? colorBgInputRef.current.click() : '';
    
    const handleTransparencyCall = ( transp:boolean ) => {
        let noTransparent = ( !transp && colorBgInputRef?.current);
        if( noTransparent ) {
            changeBgColor();
        } else {
            handleColorBgChange( '' );
        }
    }

    if( alpha == -1 ) {
        setAlpha( rgba.a );
    }

    useEffect(() => {
        setTransparent( transparentElement );
    }, [ transparentElement ] )

    let changeBgColor = () => {
        if( colorBgInputRef?.current ) {
            let value = colorBgInputRef.current.value;
            let obj = colorStringToObjectRGBA(value);
            obj.a = alpha;
            let newRGBA = rgbaToString( obj );
            handleColorBgChange( newRGBA );
        }
    }

    let updateAlpha = async( newAlpha:number ) => {
        setAlpha(newAlpha);
        changeBgColor();
    }

    return (
    <div className='w-full flex space-x-1 align-center' style={{justifyContent: 'space-between'}}>
        <div className="flex">
                <span>Background</span>
                <div
                    style={{ backgroundColor: backgroundColor }} 
                    className='ml-3 h-5 w-5 border border-gray-600 self-center rounded-full ' onClick={handleColorBgClick}>
                </div>
                <input 
                    ref={colorBgInputRef}
                    type="color"                                                    
                    id='colorBg'
                    name="colorBg"
                    onChange={changeBgColor}
                    defaultValue={backgroundColor}
                    className='w-5 -ml-5 invisible'
                />
        </div>
        <div className="flex">
            <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Transparent</label>
                    <input 
                        type="checkbox" 
                        value="" 
                        checked={transparent}
                        onChange={() => {
                        let newTransp = !transparent;
                        setTransparent(newTransp);
                        handleTransparencyCall(newTransp);
                    }}
                    className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </div>
        </div>
        <div className="flex">
            <InputValueButton
                defaultVal={alpha}
                handlerValueChange={updateAlpha}
                min={0}
                step={0.1}
                title='Opacity'
                />
        </div>
    </div>
    )
}

/**
 * Transforms a color string in a rgba object
 * @param colorString a rgba or hexa color
 * @returns 
 */
export function colorStringToObjectRGBA( colorString:string ) {
    if( !colorString ) colorString = `rgba(0, 0, 0, 0)`;

    if( colorString.includes('#')) {
        let rgba = hexToRgba( colorString );
        colorString = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    }
    console.log('checcking', colorString);
    let string = colorString.split('(')[ 1 ].split(')')[ 0 ];
    const rgbaValues = string.split(',');
    let rgba = { r:0, g:0, b:0, a:0};
    const r = rgbaValues[0] ? parseInt(rgbaValues[0].trim()) : rgba.r;
    const g = rgbaValues[1] ? parseInt(rgbaValues[1].trim()) :rgba.g;
    const b = rgbaValues[2] ? parseInt(rgbaValues[2].trim()) : rgba.b;
    const a = rgbaValues[3] ? parseFloat(rgbaValues[3].trim()) : rgba.a;
    return { r, g, b, a };
}

export function hexToRgba( hex:string ) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const a = 1;
    return { r, g, b, a};
}
  
export function rgbaToString( rgb:{r:number, g:number, b:number, a:number} ) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
}

export function colorStringToRGBAString( color:string ) {
    let objectRGBA = colorStringToObjectRGBA( color );
    return rgbaToString( objectRGBA );
}
'use client'
import { ArrowDownIcon, ArrowDownLeftIcon, ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowUpLeftIcon, ArrowUpRightIcon, Bars2Icon, Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon, BarsArrowDownIcon, BarsArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { LoadScreen } from "@/app/ui/components/loading-modal";
import { InputValueButton } from "@/app/ui/components/value-input";
import identityServer4 from "next-auth/providers/identity-server4";
import { RGBA } from "../../interfaces";
import clsx from "clsx";

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
                        <input type="number" name="paddingleft" required 
                        min={0.1} step={0.1}
                        className="inputNumberValue"
                        defaultValue={defaults.left}
                        onChange={ ( e ) => {
                            handlerValue( 'Left', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowLeftIcon  
                            className='arrowsIcons'/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingTop" required min={0.1} step={0.1}
                            defaultValue={defaults.top}
                            className='inputNumberValue'
                            onChange={ ( e ) => {
                                handlerValue( 'Top', e.target.value );
                            }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowUpIcon  className="arrowsIcons"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingRight" required 
                            min={0.1} step={0.1}
                            className="inputNumberValue" 
                            defaultValue={defaults.right}
                            onChange={ ( e ) => {
                                handlerValue( 'Right', e.target.value );
                            }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowRightIcon className="arrowsIcons"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingBottom" 
                            defaultValue={defaults.bottom}
                            required min={0.1} step={0.1}
                            className="inputNumberValue"
                            onChange={ ( e ) => {
                                handlerValue( 'Bottom', e.target.value );
                            }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center'>
                            <ArrowDownIcon  className="arrowsIcons"/>
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
                        <input type="number" name="paddingleft" 
                        required step={0.1}
                        className="inputNumberValue"
                        defaultValue={defaults.left}
                        onChange={ ( e ) => {
                            handlerValue( 'Left', e.target.value );
                        }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center space-x-2'>
                            <ArrowLeftIcon  className="arrowsIcons"/>
                            <ArrowRightIcon className="arrowsIcons"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" name="paddingTop" required step={0.1}
                            className="inputNumberValue" 
                            defaultValue={defaults.top}
                            onChange={ ( e ) => {
                                handlerValue( 'Top', e.target.value );
                            }}
                        />
                        <div className='w-12 text-center flex mt-3 justify-center space-x-2'>
                            <ArrowUpIcon  className="arrowsIcons"/>
                            <ArrowDownIcon  className="arrowsIcons"/>
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
    return (
        <>
            <span>Border</span>
                <div className='mt-5 ml-10'>
                    <span>Radius</span>
                    <div className='grid grid-cols-4 grid-row-1 m-2 gap-1'>
                        <div className="flex flex-col">
                            <input type="number" name="borderTopLeft" 
                            className={'inputNumberValue'} required min={0.1} step={0.1}
                            defaultValue={defaults.borderTopLeftRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'TopLeftRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowUpLeftIcon className="arrowsIcons"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input type="number" name="borderBottomLeft" 
                            className='inputNumberValue' required min={0.1} step={0.1}
                            defaultValue={defaults.borderBottomLeftRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'BottomLeftRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowDownLeftIcon className="arrowsIcons"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input type="number" name="borderTopRight" className='inputNumberValue' required min={0.1} step={0.1}
                            defaultValue={defaults.borderTopRightRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'TopRightRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowUpRightIcon className="arrowsIcons"/>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <input type="number" name="borderRightBottom" className='inputNumberValue' required min={0.1} step={0.1}
                            defaultValue={defaults.borderBottomRightRadius}
                            onChange={ ( e ) => {
                                handlerBorder( 'BottomRightRadius', e.target.value );
                            }}
                            />
                            <div className='w-12 text-center flex mt-3 justify-center'>
                                <ArrowDownRightIcon className="arrowsIcons"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-5 ml-10'>
                    <span>Stroke</span>
                    <div className="flex flex-col">
                        <input type="number" name="borderWidth" className='inputNumberValue' required min={0.1} step={0.1}
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
                        <ColorButtons
                            title="Color"
                            defaultColor={defaults.borderColor}
                            handleColorBgChange={handleColorBorderChange}
                            showAlpha={true}
                            showTransparency={true}
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
                        <Bars3BottomLeftIcon  className="arrowsIcons"
                            onClick={() => {
                                callHandler('left');
                            }}
                        ></Bars3BottomLeftIcon>
                        <span>Left</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <Bars3Icon  className="arrowsIcons"
                            onClick={() => {
                                callHandler('center');
                            }}
                        />
                        <span>Center</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <Bars3BottomRightIcon  className="arrowsIcons"
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
                        <BarsArrowDownIcon  className="arrowsIcons"
                            onClick={() => {
                                callHandler('flex-end');
                            }}
                        />
                        <span>End</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <Bars2Icon  className="arrowsIcons"
                            onClick={() => {
                                callHandler('center');
                            }}
                        />
                        <span>Center</span>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <BarsArrowUpIcon  className="arrowsIcons"
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

interface ColorsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    defaultColor:string,
    handleColorBgChange:Function,
    showTransparency:boolean,
    showAlpha:boolean,
    vertical?:boolean,
    title:string
  }

export function ColorButtons(
    { 
    defaultColor,
    handleColorBgChange,
    showTransparency,
    showAlpha,
    title,
    className,
    vertical,
    ...rest 
    }
:Readonly<ColorsProps>) {
    defaultColor = colorStringToRGBAString( defaultColor );
    let rgba_calc = colorStringToObjectRGBA( defaultColor );

    if( !showAlpha ) {
        rgba_calc.a = 1;
    }

    let [rgba, setRgba ] = useState<RGBA>(rgba_calc);
    
    const handleTransparencyCall = () => {
        let isTransparent = ( rgba.a <= 0 );
        let newTransparency = isTransparent ? 1 : 0;
        let newRGBAObj = {
            ...rgba,
            a: newTransparency
        };
        setRgba( newRGBAObj );
    }

    let handlerBgColor = ( rgba_:RGBA ) => {
        let newRGBAObj = {
            ...rgba_,
            a: rgba.a
        };
        setRgba( newRGBAObj );
    }

    let updateAlpha = async( newAlpha:number ) => {
        let newRGBAObj = {
            ...rgba,
            a: newAlpha
        };
        setRgba( newRGBAObj )
    }

    useEffect(() => {
        let newRGBA = rgbaToString( rgba );
        handleColorBgChange( newRGBA );
    }, [rgba]);

    return (
        <div className={clsx({
            ['w-full flex space-x-1 align-center']:!vertical,
            ['grid grid-cols-2 gap-4']:vertical,
            [className ? className : '']:true
        })}
        style={{justifyContent: 'space-between'}}
            >
                <div className={clsx({
                    ["flex"]:true,
                    /*["col-span-1"]:vertical,*/
                })}>
                        <ColorButton
                        colorDefault={defaultColor}
                        title={title}
                        handleColorChange={handlerBgColor}
                        />
                </div>

                { showTransparency ?
                <div className={clsx({
                    ["flex"]:true,
                    /*["col-span-1"]:vertical,*/
                })}>
                    <div className="flex items-center">
                            <span>
                                Transparent
                            </span>
                            <input
                                type="checkbox" 
                                value="" 
                                checked={rgba.a <= 0 }
                                onChange={() => {
                                handleTransparencyCall();
                            }}
                            className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
                : <></>
            }
            {
                showAlpha ?
                <div className={clsx({
                    ["flex"]:true,
                    /*["col-span-1"]:vertical,*/
                })}>
                    <InputValueButton
                        defaultVal={rgba.a}
                        handlerValueChange={updateAlpha}
                        min={0}
                        max={1}
                        step={0.1}
                        title='Opacity'
                        />
                </div>
                :<></>
            }
        </div>
    )
}

export function ColorButton({
    title,
    colorDefault,
    handleColorChange
}:Readonly<{
    title:string,
    colorDefault:string,
    handleColorChange:Function
}>) {
    const colorInputRef = useRef<HTMLInputElement>(null);
    const handleColorClick = () => (colorInputRef.current) ? colorInputRef.current.click() : '';

    let changeBgColor = () => {
        if( colorInputRef?.current ) {
            let value = colorInputRef.current.value;
            let obj = colorStringToObjectRGBA(value);
            handleColorChange( obj );
        }
    }
    console.log('value', colorDefault)
    console.log('value HEXA ', rgbaToHex(colorDefault))
    return (
        <>
            <span>{title}</span>
                <div
                    style={{ backgroundColor: colorDefault }} 
                    className='colorCercleButton' 
                    onClick={handleColorClick}>
                </div>
                <input 
                    ref={colorInputRef}
                    type="color"
                    name="colorBg"
                    onChange={() => changeBgColor() }
                    defaultValue={rgbaToHex(colorDefault)}
                    className='w-5 -ml-5 invisible'
                />
        </>
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
    } else if( !colorString.startsWith( 'rgba(' ) && !colorString.endsWith(')') ) {
        colorString = `rgba(0, 0, 0, 0)`;
    } else {
        let string = colorString.split('rgba(').slice(-1)[0];
        string = string.split( ')' )[ 0 ];
        let values =  string.split(',');
        let r = !isNaN(parseFloat(values[ 0 ])) ? values[ 0 ] : 0;
        let g = !isNaN(parseFloat(values[ 1 ])) ? values[ 1 ] : 0;
        let b = !isNaN(parseFloat(values[ 2 ])) ? values[ 2 ] : 0;
        let a = !isNaN(parseFloat(values[ 3 ])) ? values[ 3 ] : 0;
        colorString = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

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

export function rgbaToHex( rgba:string ) {
    // Vérifier si la chaîne commence par "rgba"
    if (!rgba.startsWith("rgba")) return '#000000';
    
    // Extraire les valeurs de rouge, vert, bleu et alpha
    const rgbaValues = rgba.substring(5, rgba.length-1).split(",");
    const red = parseInt(rgbaValues[0]);
    const green = parseInt(rgbaValues[1]);
    const blue = parseInt(rgbaValues[2]);
    const alpha = parseFloat(rgbaValues[3]);

    // Convertir les valeurs de RGB en hexadécimal
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // Retourner le code hexadécimal
    return `#${redHex}${greenHex}${blueHex}`;
}

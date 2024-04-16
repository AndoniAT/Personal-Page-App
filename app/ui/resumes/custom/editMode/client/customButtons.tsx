'use client'
import { ArrowDownIcon, ArrowDownLeftIcon, ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowUpLeftIcon, ArrowUpRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { inputValueNumberClass } from '@/app/ui/cssComponents/styles';
import { useRef } from "react";

interface DefaultsValuesDirection  {
    left:number,
    top:number,
    right:number,
    bottom:number
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

export function InputValueButton({
    handlerValueChange,
    defaultVal,
    min,
    step,
    title
} :
Readonly<{
    handlerValueChange:Function,
    defaultVal:number,
    min:number,
    step:number,
    title:string,
}>) {
    return (
        <>
            <span>{title}</span>
            <div className='mt-5 ml-10'>
                <div className='grid grid-cols-4 grid-row-1 m-2 gap-1'>
                    <div className="flex flex-col">
                        <input type="number" name="value" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={min} step={step}
                        defaultValue={defaultVal}
                        onChange={ ( e ) => {
                            handlerValueChange( e.target.value );
                            }
                        }
                        />
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
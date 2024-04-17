'use client'

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { LoadScreen } from "./loading-modal";

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
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ value, setValue ] = useState<number>(defaultVal);
    let handler = useDebouncedCallback( async(value) => {
        setLoading(true);
        await handlerValueChange( value )
        setValue( value );
        setLoading( false );
    }, 300 );
    return (
        <>
        {
            loading ?
            <LoadScreen/>
            :
            <>
                <span>{title}</span>
                <div>
                    <div className='grid grid-cols-4 grid-row-1 gap-1'>
                        <div className="flex flex-col">
                            <input type="number" name="value" className="w-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required min={min} step={step}
                            defaultValue={value}
                            onChange={ ( e ) => {
                                handler( e.target.value );
                                }
                            }
                            />
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}
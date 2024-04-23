'use client'

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { LoadScreen } from "./loading-modal";

export function InputValueButton({
    handlerValueChange,
    defaultVal,
    min,
    max,
    step,
    title
} :
Readonly<{
    handlerValueChange:Function,
    defaultVal:number,
    min:number,
    max?:number
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

    useEffect(() => {
        setValue( defaultVal );
    }, [ defaultVal ])

    return (
        <>
        {
            loading ?
            <LoadScreen/>
            :
            <>
                <span className="mr-3 dark:text-white">{title}</span>
                <div>
                    <div className='grid grid-cols-1 grid-row-1 gap-1'>
                        <div className="flex flex-col">
                            <input type="number" name="value" required min={min} step={step} max={max}
                            className="inputNumberValue"
                            value={value}
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
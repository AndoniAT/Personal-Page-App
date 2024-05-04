'use client'
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Spin({
    refreshFn,
    infinity
} : Readonly<{
    refreshFn:Function,
    infinity:boolean
}>)  {
    const [ loading, setLoading ] = useState<boolean>( false );

    let refresh = async () => {
        setLoading( true );
        await refreshFn();
        setLoading( false );
    };

    useEffect(() => {
        refresh();
    }, [])

    return (
        <div className={clsx({
            ["mt-3 cursor-pointer w-fit"]:true,
            ['animate-spin']: loading || infinity
          })} onClick={refresh}>
            <ArrowPathIcon className='w-5 stroke-slate-700 dark:stroke-white'/> 
          </div>
    )
}
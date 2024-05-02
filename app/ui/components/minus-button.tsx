'use client'

import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AskConfirmation } from "./confirmation-modal";
import clsx from "clsx";

export default function MinusButton({
    removeElement,
    cancel,
    confirmation
}: Readonly<{
    removeElement:Function,
    cancel:Function,
    confirmation? : {
        title:string,
        question:string
    }
}>) {
    const [loading, setLoading] = useState<boolean>(false);

    const [ showConfirmation, setShowConfirmation ] = useState<boolean>(false);

    let cancelTrash = () => {
        setShowConfirmation(false);
        cancel();
    }

    let acceptTrash = async () => {
        setLoading(true);
        await removeElement();
        cancelTrash();
        setLoading(false);
    }

    return (
        <>
            <div className={clsx({
                ['w-12 text-center flex mt-3 justify-center p-2']:true,
                ['loading']: loading,
                })}>
                    {
                        (!loading) ?
                        <MinusCircleIcon  className="border border-red-100 bg-red-500 self-center w-9 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer hover:bg-red-300"
                            onClick={async () => {
                                if( confirmation ) {
                                    setShowConfirmation(true);
                                } else {
                                    acceptTrash();
                                }
                            }}/>
                            :
                            <></>
                    }
            </div>
            { showConfirmation && confirmation ? 
                <AskConfirmation cancel={cancelTrash} accept={acceptTrash} question={confirmation.question} title={confirmation.title}/>
            : <></>}
        </>
    )
}
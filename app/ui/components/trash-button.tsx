'use client'

import { TrashIcon } from "@heroicons/react/24/outline";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AskConfirmation } from "./confirmation-modal";
import clsx from "clsx";

interface TrashButtonProps extends React.AllHTMLAttributes<HTMLAllCollection> {
    deleteElement:Function,
    cancel:Function,
    little?:boolean,
    confirmation? : {
        title:string,
        question:string
    }
}

export default function TrashButton({
    deleteElement,
    little,
    cancel,
    confirmation
}: Readonly<TrashButtonProps>) {
    const [loading, setLoading] = useState<boolean>(false);

    const [ showConfirmation, setShowConfirmation ] = useState<boolean>(false);

    let cancelTrash = () => {
        setShowConfirmation(false);
        cancel();
    }

    let acceptTrash = async () => {
        setLoading(true);
        await deleteElement();
        cancelTrash();
        setLoading(false);
    }

    return (
        <>
            <div className={clsx({
                ['w-12 text-center flex mt-3 justify-center']:true,
                ['loading']: loading,
                ['p-2 mt-3']: !little,
                ['p-0 mt-1']: little,
                })}>
                    {
                        (!loading) ?
                        <TrashIcon  className={clsx({
                        ['border border-red-100 bg-red-500 self-center']: true,
                        ['text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer hover:bg-red-300']:true,
                        [ 'w-9' ]: !little,
                        [ 'w-5' ]: little
                    })}
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
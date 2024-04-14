'use client'

import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Askonfirmation } from "./confirmation-modal";

export default function TrashButton({
    deleteElement,
    cancel,
    confirmation
}: Readonly<{
    deleteElement:Function,
    cancel:Function,
    confirmation? : {
        title:string,
        question:string
    }
}>) {
    const [ showConfirmation, setShowConfirmation ] = useState<boolean>(false);

    let cancelTrash = () => {
        setShowConfirmation(false);
        cancel();
    }

    let acceptTrash = async () => {
        await deleteElement();
        cancelTrash();
    }

    return (
        <>
            <div className='w-12 text-center flex mt-3 justify-center p-2'>
                <TrashIcon  className="border border-red-100 bg-red-500 self-center w-9 text-zinc-50 rounded border border-gray-600 hover:scale-110 cursor-pointer hover:bg-red-300"
                    onClick={async () => {
                        if( confirmation ) {
                            setShowConfirmation(true);
                        } else {
                            acceptTrash();
                        }
                    }}/>
            </div>
            { showConfirmation && confirmation ? 
                <Askonfirmation cancel={cancelTrash} accept={acceptTrash} question={confirmation.question} title={confirmation.title}/>
            : <></>}
        </>
    )
}
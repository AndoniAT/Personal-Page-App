'use client'

import clsx from "clsx";
import { useState } from "react";
import { FooterModal, MyStaticModal, NoButton, YesButton } from "../resumes/custom/editMode/client/modals";

export function AskConfirmation({
    accept,
    cancel,
    title,
    question
}:{
    accept:Function,
    cancel:Function,
    title:string,
    question:string
}) {
    const [loading, setLoading] = useState<boolean>(false);
return (
    <>
    <MyStaticModal
    id="confirmation-modal"
    close={cancel}
    title={title}
    maxWidth="max-w-2xl"
    className={clsx({
        ['loading']: loading,
        })
        }
    >
        <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            { question }
                        </p>
        </div>
        <FooterModal>
            {
                (!loading) ?
                <>
                    <YesButton accept={async () => {
                                if( !loading ) {
                                    setLoading(true);
                                    await accept();
                                    setLoading(false);
                                }
                            }}/>
                    <NoButton refuse={cancel}/>
                </>
                : <></>
            }
        </FooterModal>
    </MyStaticModal>
    </>
)
}
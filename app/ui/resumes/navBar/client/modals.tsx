'use client'
import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { MyDragModal, MyForm } from '../../custom/editMode/client/modals';
import clsx from 'clsx';

export function CreateSectionModal({
        cancel,
        customRevalidateTag
    }:Readonly<{
        cancel:Function,
        customRevalidateTag:Function
    }>) {
        let { username } = useParams();
        const [loading, setLoading] = useState<boolean>(false);
        const handler = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData( event.currentTarget )
            formData.set('username', username.toString());

            try {
                let section = await fetch('/api/sections', {
                    method: 'POST',
                    body: formData
                });
                cancel();
                customRevalidateTag('edit');
            } catch( err ) {
                console.log('Error', err);
            }
        }

        return (
            <>
            <MyDragModal 
            id='createSectionModal'
            close={cancel}
            title='Section'
            maxWidth='max-w-md'
            className={clsx({
                ["p-4 md:p-5"]:true,
                ['loading']: loading,
                })
                }
            >
                <MyForm
                    handlerSubmit={async ( event:any ) => {
                        setLoading(true)
                        await handler( event );
                        setLoading( false );
                    }}
                    showSubmitButton={true}
                >
                    <div className="col-span-2">
                        <label htmlFor="txt-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create your own section</label>
                        <input  type='text' name="name" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="My Section"
                        >
                        </input>
                    </div>
                </MyForm>
            </MyDragModal>
            </>
        )
}
'use client'
import { ArrowsPointingOutIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { revalidatePath } from 'next/cache';
import { useParams } from 'next/navigation';
import { FormEvent } from 'react';

export function CreateSectionModal({
        cancel,
        customRevalidateTag
    }:Readonly<{
        cancel:Function,
        customRevalidateTag:Function
    }>) {
        let { username } = useParams();

        const contentExample = `<div
        style="background-color: crimson;
        height:100%;
        text-align:center;
        display:flex;
        justify-content:center;
        align-items: center;
        opacity: 0.7;
        ">
        Hello Word
        </div>`;

        const handler = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData( event.currentTarget )
            formData.set('username', username.toString());

            try {
                let section = await fetch('/api/sections', {
                    method: 'POST',
                    body: formData
                });
                console.log('created', section);
                cancel();
                customRevalidateTag('edit');
                //revalidatePath(`/resumes/${username}/edit`, 'layout');
            } catch( err ) {
                console.log('Error', err);
            }
        }

        return (
            <motion.div
            drag
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            whileTap={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.2)" }}
            dragConstraints={{
                top: -350,
                left: -200,
                right: 300,
                bottom: 150,
            }}
            tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Section
                                </h3>
                                <HandRaisedIcon className="ml-6 w-6 text-gray-400" ></HandRaisedIcon>
                                <ArrowsPointingOutIcon className="w-6 text-gray-400" ></ArrowsPointingOutIcon>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal"
                                onClick={() => { cancel()}}>
                                    <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5" onSubmit={( event ) => {
                                handler( event );
                            }}>
                                <div className="grid gap-4 mb-4 grid-cols-2">

                                    <div className="col-span-2">
                                        <label htmlFor="txt-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create your own section</label>
                                        <input  type='text' name="name" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="My Section"
                                        >
                                        </input>
                                    </div>
                                </div>
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Accept
                                </button>
                            </form>
                        </div>
                </div>
            </motion.div>
        )
}
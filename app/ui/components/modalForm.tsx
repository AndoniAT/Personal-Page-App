import { ArrowsPointingOutIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ModalForm extends React.AllHTMLAttributes<HTMLAllCollection> {
  children: React.ReactNode;
  handler:Function;
  cancel:Function;
  title:string;
}

export function CustomModal({ 
    title,
    cancel,
    children,
    className,
     ...rest
}: Readonly<ModalForm>
) {

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
                                    {title}
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
                            {children}
                        </div>
                </div>
    </motion.div>

  )
}
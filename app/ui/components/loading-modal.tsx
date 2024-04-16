import clsx from "clsx"

export function LoadScreen() {
    return ( 
        <div id="load-modal" tabIndex={-1} aria-hidden="true" 
        className={clsx({
            ["overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"]:true,
            ["loading "]:true,
            ["h-screen w-screen"]:true
        })
        }>
            <div className="relative p-4 w-full h-full w-full">
                <div className="relative bg-transparent rounded-lg shadow dark:bg-transparent h-full">
                </div>
            </div> 
        </div>

    )
}
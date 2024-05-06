import { lusitana } from '@/app/ui/fonts';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

let createArr = ( cols:number ) => {
    let arr:any = [];
    arr.length = cols * 12;
    arr.fill(0);
    return arr;
}

export function Content1() {

    return (
        <div className={`myGridMainPage`}>
            { createArr( 4 ).map( (i:number) => <div key={i} className="box box-phone"></div> ) }
            { createArr( 6 ).map( (i:number) => <div key={i} className="box box-md"></div> ) }
            { createArr( 8 ).map( (i:number) => <div key={i} className="box box-lg"></div> ) }
            { createArr( 10 ).map( (i:number) => <div key={i} className="box box-xl"></div> ) }
            { createArr( 12 ).map( (i:number) => <div key={i} className="box box-2xl"></div> ) }
        </div>
    )
}

export function Content2() {
    return (
        <div className="myGridMainPage">
            <Head/>
            { createArr( 4 ).map( (i:number) => <div key={i} className="box box-phone"></div> ) }
            { createArr( 6 ).map( (i:number) => <div key={i} className="box box-md"></div> ) }
            { createArr( 8 ).map( (i:number) => <div key={i} className="box box-lg"></div> ) }
            { createArr( 10 ).map( (i:number) => <div key={i} className="box box-xl"></div> ) }
            { createArr( 12 ).map( (i:number) => <div key={i} className="box box-2xl"></div> ) }
      </div>
    )
}

export function Content3() {
    return (
        <div className="myGridMainPage">
            
            <Head/>

            <div className="box-section 
            p-10
            row-span-4 
            col-span-4 
            md:col-span-6
            lg:col-span-8
            xl:col-span-10
            2xl:col-span-12
            "
            style={{ backgroundColor: 'rgba(158, 158, 158, 0.3)' }}>
                <div className={`${lusitana.className} text-black text-2xl dark:text-white`}>
                    Welcome to Resumes page ! <br/><br/> Create your own personal website
                    with this grid system 
                    <p>
                        Share Text, Images, Videos and more !
                    </p>
                    <div className='w-full flex justify-center space-x-5 mt-5'>

                        <svg className={`
                        h-fit p-3
                        bg-slate-600 dark:bg-slate-200 rounded-xl
                        stroke-slate-200 dark:stroke-slate-600 
                        hover:scale-105 cursor-pointer 
                        w-24 h-24 lg:w-28 lg:h-28`} 
                        viewBox="0 0 24 24" >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> 
                                        <path d="M13 7L3 7"strokeWidth="1.5" strokeLinecap="round"
                                        className={`stroke-slate-200 dark:stroke-slate-600`}></path> 
                                        <path d="M10 12H3" strokeWidth="1.5" strokeLinecap="round"
                                        className={`stroke-slate-200 dark:stroke-slate-600`}></path> 
                                        <path d="M8 17H3" strokeWidth="1.5" strokeLinecap="round"
                                        className={`stroke-slate-200 dark:stroke-slate-600`}></path> 
                                        <path d="M11.3161 16.6922C11.1461 17.07 11.3145 17.514 11.6922 17.6839C12.07 17.8539 12.514 17.6855 12.6839 17.3078L11.3161 16.6922ZM16.5 7L17.1839 6.69223C17.0628 6.42309 16.7951 6.25 16.5 6.25C16.2049 6.25 15.9372 6.42309 15.8161 6.69223L16.5 7ZM20.3161 17.3078C20.486 17.6855 20.93 17.8539 21.3078 17.6839C21.6855 17.514 21.8539 17.07 21.6839 16.6922L20.3161 17.3078ZM19.3636 13.3636L20.0476 13.0559L19.3636 13.3636ZM13.6364 12.6136C13.2222 12.6136 12.8864 12.9494 12.8864 13.3636C12.8864 13.7779 13.2222 14.1136 13.6364 14.1136V12.6136ZM12.6839 17.3078L17.1839 7.30777L15.8161 6.69223L11.3161 16.6922L12.6839 17.3078ZM21.6839 16.6922L20.0476 13.0559L18.6797 13.6714L20.3161 17.3078L21.6839 16.6922ZM20.0476 13.0559L17.1839 6.69223L15.8161 7.30777L18.6797 13.6714L20.0476 13.0559ZM19.3636 12.6136H13.6364V14.1136H19.3636V12.6136Z" 
                                        className={`fill-slate-200 dark:fill-slate-600`}></path> 
                                    </g>
                        </svg>
                        
                        <svg  className={`
                            h-fit p-3
                            bg-slate-600 dark:bg-slate-200 rounded-xl
                            hover:scale-105 cursor-pointer
                            w-24 h-24 lg:w-28 lg:h-28
                            fill-slate-200 dark:fill-slate-600
                            stroke-slate-200 dark:stroke-slate-600
                            `}
                            version="1.1" id="_x32_" 
                            viewBox="0 0 512 512" 
                            xmlSpace="preserve"
                            >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                                <style type="text/css"></style> 
                                <g> 
                                    <path className="st0" d="M421.828,106.063H90.172v299.859h331.656V106.063z M309.844,160.781c19.125,0,34.656,15.5,34.656,34.641 s-15.531,34.641-34.656,34.641c-19.156,0-34.656-15.5-34.656-34.641S290.688,160.781,309.844,160.781z M399.813,364.688 c-2.328,4.406-6.906,7.156-11.875,7.156H129.469c-4.906,0-9.406-2.656-11.766-6.938c-2.344-4.281-2.172-9.5,0.453-13.656 l75.469-118.594c4.813-7.594,13.125-12.25,22.094-12.406c9-0.188,17.453,4.156,22.563,11.563l44.281,64.094l15.906-25.031 c4.828-7.594,13.125-12.234,22.094-12.406c9-0.172,17.438,4.156,22.563,11.547l55.828,80.828 C401.797,354.938,402.109,360.25,399.813,364.688z"></path> 
                                    <path className="st0" d="M0,17.844v23.859v452.453h512v-46.828V17.844H0z M464.297,446.438H47.703V65.563h416.594V446.438z"></path> 
                                </g>
                            </g>
                        </svg>
                        
                        <div className={`
                            h-fit p-3
                            bg-slate-600 dark:bg-slate-200 rounded-xl
                            w-24 h-24 lg:w-28 lg:h-28
                            `}>
                            <img
                                    className={`hover:scale-105 cursor-pointer`}
                                        style={{
                                        objectFit: 'cover',
                                        }}
                                    src={'/images/social_media/youtube.png'}
                                    alt="Youtube"
                                />

                        </div>
                        
                        <svg className={`
                            h-fit p-3
                            bg-slate-600 dark:bg-slate-200 rounded-xl
                            hover:scale-105 cursor-pointer
                            w-24 h-24 lg:w-28 lg:h-28
                            `}
                            viewBox="-52.5 0 361 361" 
                            preserveAspectRatio="xMinYMin meet">
                            <path d="M255.555 70.766l-23.241 260.36-104.47 28.962-104.182-28.922L.445 70.766h255.11z" fill="#E44D26"/>
                            <path d="M128 337.95l84.417-23.403 19.86-222.49H128V337.95z" fill="#F16529"/>
                            <path d="M82.82 155.932H128v-31.937H47.917l.764 8.568 7.85 88.01H128v-31.937H85.739l-2.919-32.704zM90.018 236.542h-32.06l4.474 50.146 65.421 18.16.147-.04V271.58l-.14.037-35.568-9.604-2.274-25.471z" fill="#EBEBEB"/>
                            <path d="M24.18 0h16.23v16.035h14.847V0h16.231v48.558h-16.23v-16.26H40.411v16.26h-16.23V0zM92.83 16.103H78.544V0h44.814v16.103h-14.295v32.455h-16.23V16.103h-.001zM130.47 0h16.923l10.41 17.062L168.203 0h16.93v48.558h-16.164V24.49l-11.166 17.265h-.28L146.35 24.49v24.068h-15.88V0zM193.21 0h16.235v32.508h22.824v16.05h-39.06V0z"/>
                            <path d="M127.89 220.573h39.327l-3.708 41.42-35.62 9.614v33.226l65.473-18.145.48-5.396 7.506-84.08.779-8.576H127.89v31.937zM127.89 155.854v.078h77.143l.64-7.178 1.456-16.191.763-8.568H127.89v31.86z" fill="#FFF"/>
                        </svg>
                    </div>
                </div>
            </div>
            {
                <div className={ `h-10
                        w-full
                        h-48
                        md:h-96
                        rounded-2xl overflow-hidden hover:scale-105 cursor-pointer
                        h-9
                        col-span-4
                        md:col-span-6
                        lg:col-span-4
                        xl:col-span-5
                        2xl:col-span-6
    
                        m-5 
                        lg:m-0
                        dark:border dark:border-px dark:border-white
                `}>
                    <div className="box-section 
                        
                    ">
                            <img
                                            style={{
                                            objectFit: 'cover', height: '100%', width: '100%'
                                            }}
                                        src={'/images/eiffel_tower.JPG'}
                                        alt="ImageBlock"
                                    />
                </div>
                
                </div>
                
            }
            {
                
                <div className="box-section 
                col-span-4
                md:col-span-6
                lg:col-span-4
                xl:col-span-5
                2xl:col-span-6
                row-span-5 
                
                "
                style={{backgroundColor:'transparent'}}>
                    <div className='grid grid-cols-3 w-full rounded-2xl p-5 md:h-96'
                    style={{ backgroundColor: 'rgba(158, 158, 158, 0.3)' }}>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300'/>
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300' />
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300'/>
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300'/>
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300' />
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300'/>
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300'/>
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300' />
                        </div>
                        <div className='flex justify-center hover:bg-blue-400 rounded-xl cursor-pointer'>
                            <UserCircleIcon className='w-24 text-blue-300'/>
                        </div>

                        <div className={`flex justify-center col-span-3 text-black dark:text-white ${lusitana.className} text-2xl text-center`}>
                            <p>Rest connected with other people</p>
                        </div>
                    </div>

                </div>
            }
            {
                <div className="box-section 
                row-span-5
                
                col-span-4
                md:col-span-6
                lg:col-span-8
                xl:col-span-10
                2xl:col-span-12
                "
                style={{backgroundColor: 'transparent'}}>
                    <div className='rounded-2xl overflow-hidden hover:scale-105 cursor-pointer'>
                    <img
                                        style={{
                                        objectFit: 'cover', height: '100%', width: '100%'
                                        }}
                                    src={'/images/example_profile.png'}
                                    alt="ImageBlock"
                                />
                    </div>
                    <div className='w-full flex justify-center mt-5'>
                        <div className='w-fit flex items-center rounded-xl p-3 cursor-pointer bg-sky-600 hover:bg-sky-400' style={{height:'50px'}}>
                            <Link href={'/createAccount'}>
                                Create your account to start your page !
                            </Link>

                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

function Head() {
    return (
        <div className={`box-header 
                col-span-4
                md:col-span-6
                lg:col-span-8
                xl:col-span-10
                2xl:col-span-12 
                row-span-3 
                h-full 
                dark:box-header-dark
                flex justify-center
                p-3
            `}>
            <div className={`h-full w-2/3 flex align-center justify-center items-center
            `}>
                <div className='flex flex-col text-black  dark:text-white'>
                    <p className={`text-2xl md:text-6xl lg:text-8xl ${lusitana.className}`}>Resumes</p>
                    <p className='w-fit self-end'>Created by : Andoni ALONSO TORT</p>
                    <p className='w-fit self-end'>2024</p>
                </div>
                
            </div>
        </div>
    )
}
"use client"
import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { ArrowDownCircleIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, ArrowUpCircleIcon, ClipboardDocumentCheckIcon, EyeIcon, HomeIcon, 
  PencilSquareIcon, PhotoIcon, PlusCircleIcon, Squares2X2Icon,
  ArrowPathIcon, ArrowUpOnSquareIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CreateSectionModal } from "./modals";
import { Media } from "@/app/lib/definitions";
import Image from "next/image";
import TrashButton from "@/app/ui/components/trash-button";
import emitter, { listenerGallery, listenerNavBar } from "@/app/ui/emiter";
import AcmeLogo from "@/app/ui/components/acme-logo";
import { ColorButtons } from "../../custom/editMode/client/customButtons";
import Spin from "@/app/ui/components/spin";
import { UserClient } from "../../custom/interfaces";
import { Button } from "@/app/ui/components/button";

interface LinkParam {
    name: string,
    href: string,
    icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
    current: boolean
}

interface MySideNavProps extends React.AllHTMLAttributes<HTMLAllCollection> {
  children: React.ReactNode;
}

interface MyEditSideNavProps extends React.AllHTMLAttributes<HTMLAllCollection> {
  children: React.ReactNode, 
  currentSection: SectionsNavBar,
  customRevalidateTag: Function,
  updateBg: Function,
  showHeader: boolean,
  updateShowHeader: Function
}

export function MySideNav({ children, className, ...rest }: Readonly<MySideNavProps>) {
  const [ show, setShow ] = useState<boolean>(true);

  const changeShow = () => {
    let newShow = !show;
    emitter.emit('side_nav', newShow ? 'open' : 'close');
    setShow(newShow);
  }

  // Gallery listener
  useEffect(() => {
    return listenerGallery( ( showGallery:boolean ) => {
      if( showGallery ) {
        setShow( true );
      } else {
        // If the gallery closes, reopen the menu
        if ( show ) {
          setShow(false);
          setTimeout(() => {
            setShow(true);
          }, 600);
        }
      }
    } );
  }, []);


  return (
      <div
      className={clsx({
          [ " flex-none bg-slate-300 dark:bg-gray-700" ]: true,
          [ 'transition-all duration-500 ease-out'] : true,
          [' w-full md:w-60 lg:w-72 2xl:w-80']: show,
          [ 'h-5 md:h-full md:w-5']: !show,
        })
        }>
        
        <div className="md:hidden relative w-full flex items-center justify-center font-bold	block md:hidden">
            {
              show ?
              <ArrowUpCircleIcon className={`
                  w-7 h-7 absolute right-0 cursor-pointer hover:scale-125
                  stroke-slate-200 bg-slate-500
                  rounded-full
                  `
                  
                }
              style={{top: '40px', right:'25px'}}
              onClick={changeShow}
              />
              :
              <ArrowDownCircleIcon className={`
                  w-7 h-7 absolute right-0 cursor-pointer hover:scale-125
                  stroke-slate-200 bg-slate-500
                  rounded-full
                  `
                  
                }
              style={{top: '10px', right:'25px'}}
              onClick={changeShow}
              />

            }
        </div>

        <div className="relative w-full flex items-center justify-center font-bold	hidden md:block">
            {
              show ?
              <ArrowLeftCircleIcon className={`
                  w-7 h-7 absolute right-0 cursor-pointer hover:scale-125
                  stroke-slate-200 bg-slate-500
                  rounded-full
                  z-40
                  `
                  
                }
              style={{top: '50vh', right:'-13'}}
              onClick={changeShow}
              />
              :
              <ArrowRightCircleIcon className={`
                  w-7 h-7 absolute right-0 cursor-pointer hover:scale-125
                  stroke-slate-200 bg-slate-500
                  rounded-full
                  z-50
                  `
                  
                }
              style={{top: '50vh', right:'-13'}}
              onClick={changeShow}
              />

            }
        </div>

        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            {
              ( show ) ?
                <>
                <Link  href="/" className={`
                      mb-2 flex h-20 items-end justify-start rounded-md  p-4 md:h-30
                      bg-slate-800
                      dark:bg-slate-200
                      `} >
                      <div className={`w-32 md:w-60
                        text-white 
                        dark:text-zinc-800	
                        `}>
                        <AcmeLogo />
                      </div>
                  </Link>
                  <div className={`
                  grow justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 flex
                  flex-col overflow-hidden
                  md:overflow-y-auto
                  `
                  }
                  style={{ maxHeight: '90vh', overflowY:'auto'}}>
                    {children}
                  </div>
                </>
                :<></>
            }
        </div>
          
      </div>
  )
}

export function MyEditSideNav({ 
  children, 
  currentSection,
  customRevalidateTag,
  updateBg,
  showHeader,
  updateShowHeader,
  className, ...rest 
}: Readonly<MyEditSideNavProps>) 
{
  let [ openInNavBar, setOpenInNavBar ] = useState<string>('menu');

  let { username } = useParams();
  let link = ( currentSection?.ishome ) ? `/resumes/${username}` : `/resumes/${username}/${currentSection?.section_id}`

  let css = currentSection?.css ? JSON.parse( currentSection.css ) : {};
  let background = css.backgroundColor;

  return (
    <>
    {
      <div style={{display: 'inline-flex', justifyContent: 'space-between'}}>
        <div className={clsx({
          [ 'transition-all duration-500 ease-out'] : true,
          [ 'w-full -ml-0']: openInNavBar == 'menu',
          [ '-ml-[200%]' ] : openInNavBar != 'menu'
        })}>
            <Link href={link}>
              <div className='flex content-center gap-2 cursor-pointer'>
                <EyeIcon className='w-5 stroke-slate-700 dark:stroke-white'/> 
                <span className={`
                  inline-block align-middle h-fit content-center place-self-center m-l-10
                  text-black
                  dark:text-white
                  `}>
                  Visual mode
                </span>
              </div>
            </Link>
            <div className="mt-5" onClick={() => setOpenInNavBar( 'Gallery' )} >
              <div className='flex content-center gap-2 cursor-pointer'>
                <PhotoIcon className='w-5 stroke-slate-700 dark:stroke-white'/> 
                <span className={`
                  inline-block align-middle h-fit content-center place-self-center m-l-10
                  text-black
                  dark:text-white
                  `}>
                  Open Gallery
                </span>
              </div>
            </div>
            <div className=' w-full mt-5 pt-1 border-t border-t-gray-300 '>
              <div className="flex flex-col">
                {
                  <div className='w-full grid grid-cols-1 col-span-2 h-fit mb-2'>
                    
                    <ColorButtons
                    title='Background'
                    defaultColor={background}
                    handleColorBgChange={updateBg}
                    showAlpha={true}
                    showTransparency={true}
                    vertical={true}
                    />
                  </div>
                }

                {
                <div className='w-full grid grid-cols-2 col-span-2 h-fit content-center mt-3'>
                  <CreateButtonNewSection customRevalidateTag={customRevalidateTag}  label={'New Section'}/>
                </div>
                }

                {
                  
                  ( currentSection?.ishome ) ? 
                    <div className='w-full grid grid-cols-2 col-span-2 h-fit content-center mt-3'>
                    <RadioButton label={'Show Home Header'} default_value={showHeader} update={updateShowHeader}/>
                    </div>
                  :<></>
                }

              </div>
            </div>
        </div>
        {
          ( openInNavBar != 'menu') ? 
          <>
            <Gallery close={() => setOpenInNavBar( 'menu' ) }/>
          </>
          :
          <></>

        }
      </div>
    }
    </>
  )
}

export function Gallery({
  close,
  pick
}: Readonly<{
  close?:Function,
  pick?:Function
}>) {
  let { username } = useParams();
  let [ medias, setMedias ] = useState<Media[]>([]);
  let [ loading, setLoading ] = useState<boolean>(true);
  const addImageInputRef = useRef<HTMLInputElement>(null);
  let [ show, setShow ] = useState<boolean>(true);
  
  const addImage = async () => {
    let inputRef = addImageInputRef;

    if( inputRef?.current?.files ) {
      const formData = new FormData();
     formData.append('image', inputRef.current.files[0]);
     setLoading(true);

     try {
       let res = await fetch(`/api/users/${username}/medias`, {
           method: 'POST',
           body: formData
       } );
       let { url } = await res.json();
       refreshMedias();
     } catch( err ) {
       console.log('Error', err);
       setLoading(false);
     }
    }
  }

  const deleteImage = async ( id:string ) => {
    setLoading(true);
    try {
      await fetch(`/api/users/${username}/medias/${id}`, {
          method: 'DELETE'
      } );
      refreshMedias();
    } catch( err ) {
      console.log('Error', err);
      setLoading(false);
    }
  };

  const handleAddImageClick = () => {
    if ( addImageInputRef.current && !loading ) {
      addImageInputRef.current.click();
    }
  };

  let refreshMedias = async () => {
    setLoading( true );
    let { medias } = await (await fetch(`/api/users/${username}/medias`)).json();
    setMedias( medias );
    setLoading( false );
  }

  useEffect(() => {
    if( medias.length == 0 && loading ) {
      refreshMedias();
    }
  })

  // Nav bar listener
  useEffect(() => {
    return listenerNavBar( ( newShow:boolean ) => {
      setShow( newShow );
      if( !newShow && close ) {
        close();
        emitter.emit('gallery', 'close' );
      }
    } );
  }, []);

  useEffect(() => {
    if( show ) {
      emitter.emit('gallery', 'open' );
    }
  }, [ show ] );

  return (
    <>
      {
        (show) ? 
        <div id='gallery-images' className={clsx({
          [ 'transition-all duration-500 ease-out'] : true,
          [ 'fixed bottom-[50%] md:bottom-[7%] left-0 w-[20%]']: true,
          [ 'block -mt-[70%]']: true,
          [ 'w-full md:w-60 lg:w-72 2xl:w-80' ]: true,
          ['min-h-[50%] max-h-[50%] md:min-h-[93%] md:max-h-[93%]']:true,
          ['overflow-y-auto']:true,
          ["h-full p-1"]:true,
          ["bg-slate-300 dark:bg-gray-700"]:true,
          ['z-30']:true
          /*[ '-ml-[200%] hidden' ] : openInNavBar == 'menu'*/
        })}
        >
    
          <div className={clsx({
            
          })}>
            {
              (close) ?
              <div className="mt-5" onClick={()=> close() } >
                    <div className='flex content-center gap-2 cursor-pointer'>
                      <PhotoIcon className='w-5 stroke-slate-700 dark:stroke-white'/> 
                      <span className={`
                        inline-block align-middle h-fit content-center place-self-center m-l-10
                        text-black
                        dark:text-white
                        `}>
                        Return to menu
                      </span>
                    </div>
              </div>
              :
              <></>
            }
                <Spin refreshFn={refreshMedias} infinity={false}/>

                <div className="addImageToGallery flex justify-center"
                onClick={handleAddImageClick}>
                  <div className={
                        `h-10 w-10 rounded-xl p-1 bg-gray-300 border border-slate-900 cursor-pointer m-2
                        flex
                        justify-center
                        bg-gray-700
                        dark:bg-slate-300
                        hover:scale-105
                        `
                      }>
                        {
                          (!loading) ? 
                          <ArrowUpOnSquareIcon className='w-5 stroke-slate-300 dark:stroke-slate-700'/> 
                          :
                          <div className={clsx({
                            ['animate-spin']:true
                          })}>
                            <ArrowPathIcon className='w-full stroke-slate-200 dark:stroke-slate-700 dark:stroke-white'/> 
                          </div>
    
                        }
                    </div>
                    <input
                          ref={addImageInputRef}
                          type="file"
                          id="addImageGalleryInput"
                          name="addImageGalleryInput"
                          required
                          onChange={addImage}
                          style={{ display: 'none' }}
                        />
                </div>
    
                <div className={`sectionGallery flex flex-wrap justify-center`}>
                  {
                    ( medias.length> 0 ) ?
                    medias.map( media => {
    
                    return (
                      <div className={
                        `h-fit w-fit rounded-xl p-1 bg-gray-300 border border-slate-900 m-2
                        bg-gray-700
                        dark:bg-slate-300
                        `
                      }>
                        <div className={'image-container rounded-xl overflow-hidden hover:scale-105 h-24 w-24 cursor-pointer'}
                        style={{height: '6rem', width:'6rem'}}
                        onClick={() => { 
                          if( pick ) pick( media.url )
                        }}
                        >
                          <Image
                            src={media.url}
                                  layout='fill'
                                  alt="img"
                                  className={'h-20 w-20'}
                                />
                        </div>
                        <div className="w-full h-fit flex justify-center">
                            <TrashButton cancel={() => {}} 
                                    deleteElement={() => deleteImage( media.media_id ) }
                                    little={true}
                                    confirmation={{
                                      title: 'Delete image',
                                      question: 'Are you sure you want to delete this image?'
                            }}></TrashButton>
                        </div>
                      </div>
                      )
                    })
                    : 
                    ( loading ) ?
                    <>
                      Loading...
                    </>
                    :
                    ( medias.length == 0 ) ?
                    <> No images in your gallery </>
                    :
                    <></>
                  }
                </div>
          </div>
        </div>
        :
        <></>
      }
    </>
  )
}

/**
 * Links on the top of the nav bar to go to Home app page
 * or Resumes page
 * @returns 
 */
export function MainLinks() {
  let path = usePathname();
    const mainLinksObj = [
        { name: 'Home', href: '/', icon: HomeIcon, current:(path == '/') },
        /*{ name: 'Resumes', href: '/resumes', icon: ClipboardDocumentCheckIcon, current:(path == '/resumes') }*/
      ];
    return mainLinksObj.map( link => makeLink( link ) );
}

/**
 * @param home : Section home
 * @returns {Link}
 */
export function CreateHomeLink( {
  home,
  current
}:{
  home:SectionsNavBar,
  current:boolean
} ) {
    let { username } = useParams();
    const homeObj = { name: home.name, href: `/resumes/${username}/`, icon: HomeIcon, current:current }
    let homeLink = makeLink( homeObj );
    return homeLink;
}
  
/**
 * 
 * @param sections : Collection of other sections for user
 * @returns {Link[]}
 */
export function CreateSectionsLink( {
  sections,
  currentSection
}:{
  sections?:SectionsNavBar[],
  currentSection:SectionsNavBar
}) {
    //const pathname = usePathname();
    let { username } = useParams();

    let sectionsObj:LinkParam[] = [];

    if( sections ) {
      sectionsObj = sections.map( s => {
        let current = ( s.section_id == currentSection.section_id );
        return { name: s.name, href: `/resumes/${username}/${s.section_id}`, icon: Squares2X2Icon, current:current }
      } );
    }
    const sectionsLinks = ( sectionsObj.length > 0 ) ? sectionsObj.map( section => makeLink( section ) ) : [];
    return sectionsLinks;
}

/**
 * Get the username in path
 * @returns {string}
 */
export function GetUsernameSection() {
  let { username } = useParams();
  return username;
}

export function RadioButton({
  label,
  default_value,
  update
}: Readonly<{
  label:string,
  update:Function,
  default_value:boolean
}>) {
  let [ showHeader, setShowHeader ] = useState<boolean>(default_value);
  let [ click, setClick ] = useState<boolean>( false );

  let handler = async () => {
    setClick(true);
    await update( !showHeader );
    setShowHeader( !showHeader );
    setClick(false);
  }

  return (
    <>
      <div className="dark:text-white">
        <span>{label}</span>
      </div>
        <div className='text-center flex justify-left pl-3'>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"/>
            <div 
            onClick={handler}
            className={clsx({
                            ["rounded-full peer"]:true,
                            ["relative w-11 h-5 peer-focus:outline-none"]:true,
                            ["peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400"]:true,
                            ["peer-checked:after:border-white after:content-['']"]:true,
                            ["dark:border-gray-600"]:true,
                            ["bg-blue-300"]:true,

                            ["dark:bg-slate-200 bg-gray-700"]:!showHeader,
                            ["peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"]:!showHeader && click,
                            ["after:absolute after:top-[2px] after:start-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all after:bg-slate-300 after:dark:bg-gray-700"]:!showHeader,
                            
                            ["peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full"]:showHeader && click,
                            ["after:absolute after:top-[2px] after:start after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all after:bg-slate-300 after:dark:bg-gray-700"]:showHeader,

                          })}
            ></div>
          </label>
        </div>
    </>
  )
}

export function CreateButtonNewSection({
  label,
  customRevalidateTag
}:Readonly<{
  label:string,
  customRevalidateTag:Function
}>) {
  const [ showCreateSection, setShowCreateSection] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <div className="dark:text-white">
          <span>{label}</span>
        </div>
        <div className='text-center justify-left content-center pl-3'>
          <PlusCircleIcon onClick={() => { setShowCreateSection(true)}}  
          className={`
          h-6 cursor-pointer hover:scale-105 rounded-full
          border border-2 border-zinc-800
          
          text-gray-400 bg-gray-700 
          dark:text-zinc-800	dark:bg-slate-300
          `}>

          </PlusCircleIcon>
        </div>
      </div>
      {
        showCreateSection ?
        <CreateSectionModal customRevalidateTag={customRevalidateTag} cancel={() => {setShowCreateSection(false)}}></CreateSectionModal>
        :
        <></>
      }
    </>
  )
}

/**
 * Create the link for the button to edit profile
 * @returns {Link}
 */
export function EditUserPencilLink() {
  let { username } = useParams();
  return (
    <Link
        key={'edit profile'}
        href={`/${username}/editprofile/`}
    >
      <PencilSquareIcon className="w-6 ml-3"/>
  </Link>
  )
}

export function FollowButton({
  user_session
} : {
  user_session?:string
}) {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ following, setFollowing ] = useState<boolean>(false);
  let { username } = useParams();

  useEffect(() => {
    if( user_session ){
      fetch(`/api/users/${user_session}/follows/${username}`)
      .then( res => res.json() )
      .then( res => {
        let { follows } = res;
        setFollowing( follows );
      })
    }
  }, [ user_session ])

  let followHandle = async () => {
    if( user_session && username ) {
      setLoading( true );

      const formData = new FormData();
      formData.append('username_session', user_session);
      formData.append('follow', username as string);
      let meth = following ? 'DELETE': 'POST';
      
      try {
        let { follows } = await (await fetch(`/api/users/${user_session}/follows/${username}`, {
                  method: meth
                } )
              ).json();
        setFollowing( follows );
        setLoading( false );
      } catch( e ) {
        console.log('Error', e );
        setLoading( false );
      }
    }

  }

  return (
    <>
    {
      ( !following ) ?
        ( loading ) ?
        <Button className='h-fit ml-3 py-px'>
          <Spin infinity={true} refreshFn={() => {}}></Spin>
        </Button>
        :
        <Button className='h-fit ml-3 py-px'
        onClick={followHandle}>
          Follow
        </Button>
      :
      ( loading ) ? 
      <Button className='h-fit ml-3 py-px bg-gray-500 hover:bg-gray-200 hover:text-black'>
          <Spin infinity={true} refreshFn={() => {}}></Spin>
      </Button>
      :
      <Button className='h-fit ml-3 py-px bg-gray-500 hover:bg-gray-200 hover:text-black'
      onClick={followHandle}>
          Unfollow
      </Button>
    }


    </>
  )
}

export function FollowTabs(){
  const [ active, setActive ] = useState<string>('follow');
  const [ following, setFollowing ] = useState<{username:string, url_profile:string|null}[]>([]);
  const [ followers, setFollowers ] = useState<{username:string, url_profile:string|null}[]>([]);

  const { username } = useParams();

  useEffect(() => {
    fetch(`/api/users/${username}/follows`)
    .then( res => res.json() )
    .then( res => {
      let { follows } = res;
      setFollowing( follows );
    })

    fetch(`/api/users/${username}/followed`)
    .then( res => res.json() )
    .then( res => {
      let { followed } = res;
      setFollowers( followed );
    })

  }, [ username ] );

  let followList = ( active == 'follow' ) ? following : followers;

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-3 mt-3">

        <li className="me-2"
          onClick={() => setActive('follow')}
        >
          <div className={clsx({
              ['inline-block p-2 rounded-t-lg active']:true,
              ['cursor-pointer block']:true,
              ['text-blue-600 dark:text-blue-500 bg-gray-100 dark:bg-gray-800']: active == 'follow',
              ['text-gray-400']: active != 'follow'
          }
          )}>Follow</div>
        </li>

        <li className="me-2"
        onClick={() => setActive('followedBy')}
        >
          <div className={clsx({
              ['inline-block p-2 rounded-t-lg active']:true,
              ['cursor-pointer block']:true,
              ['text-blue-600 dark:text-blue-500 bg-gray-100 dark:bg-gray-800']: active == 'followedBy',
              ['text-gray-400']: active != 'followedBy'
              })
            }>Followers</div>
        </li>

      </ul>

      <div className="default flex justify-center px-3 h-full max-h-[50%]">
            <div className="w-full max-h-[100%] overflow-y-auto overflow-x-hidden">
              {
                followList.map( f => {
                  return (
                    <Link 
                    href={`/resumes/${f.username}`}
                    className="bg-slate-400 w-full p-2 rounded-xl flex cursor-pointer hover:scale-105 items-center mb-3">
                      <div className="photo">
                        { f.url_profile ?
                        <Image
                        src={f.url_profile}
                        width={50}
                        height={50}
                        alt="Profile"
                        className={'flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-full text-green-700'}
                        />
                        :
                        <div className="h-10 w-10 bg-slate-700 rounded-full">

                        </div>
                        }
                      </div>
                      <div className="name ml-3">
                        {f.username}
                      </div>
                    </Link>
                  )
                })
              }
            </div>
      </div>
    </>
  )
}

/**
 * Create the link with the information in element
 * @param link
 * @returns {Link} Element to put in the nav bar
 */
function makeLink( link:LinkParam ) {
    const LinkIcon = link.icon;
    const current = link.current ? 'bg-sky-300' : 'bg-sky-100'
    return (
      <Link
        key={link.name}
        href={link.href}
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium',
          `${current} text-blue-600`,
          'hover:bg-sky-100 hover:text-blue-600',
          'md:flex-none md:justify-start md:p-2 md:px-3',
          'border-solid border-2 border-slate-400',
          'transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 '
        )}
      >
        <LinkIcon className="w-6" />
            <p className="block">{link.name}</p>
      </Link>
    );
  
}
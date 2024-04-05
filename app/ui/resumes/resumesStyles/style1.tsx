'use client'
import { UserClient, SectionsClient, Block } from './interfaces'
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation'
import Image from 'next/image';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const styles = {
  hero: {
    withProfilePhoto: 'col-span-12 xl:col-span-9 max-h-48 min-h-48 2xl:min-h-64',
    withoutProfilePhoto: 'col-span-12 min-h-28 max-h-28 2xl:min-h-64',
    gral: 'rounded-l-xl w-full',

    imageContainer: 'image-container p-1 bg-gray-300 rounded-xl',
    image: 'image rounded-xl',
    noImage: 'image-container p-1 bg-gray-300 rounded-xl'
  },
  profilePhoto: {
    principalContainer: 'hidden col-span-3 pl-10 pr-10 pt-5 pb-5 rounded-r-xl xl:block',
    imageContainer: 'm-auto flex w-full items-center gap-4 rounded-full bg-slate-50 p-1 bg-opacity-50 h-fit profilePhotoContainer justify-center',
    image: 'flex h-max min-h-36 max-h-36 2xl:min-h-52 2xl:max-h-52 w-max shrink-0 grow-0 items-center justify-center rounded-full text-green-700'

  },
  edit: {
    hover: 'hover:opacity-25 ease-in duration-300 cursor-pointer ',
  },
  status: {
    loading: 'hover:cursor-progress'
  }
};

/**
 * Style 1 for home page
 * @returns 
 */
export function Style1Wrapper(
  {
    data
  }: Readonly<{
    data: {
      user: UserClient,
      section: SectionsClient
    }
  }>) {

  const user = data.user;
  const home = data.section;
  const hero = home.medias.find(m => m.ishero);
  const [photoProfile, setPhotoProfile] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user.photo_profile && !photoProfile) {
      setPhotoProfile(user.photo_profile.url);
    }
  }, [photoProfile, user.photo_profile]);

  return (
    <div style={{ backgroundColor: home.backgroundcolor }} className={clsx({
      ['w-full h-screen']: true
    })} id='resumePageStyle1'>
      <div>
        <div className="w-full bg-gray-200 bg-opacity-50 h-fit p-5">
          <div className="grid grid-cols-1 gap-4 h-full">
            <div className="grid grid-cols-12 h-full">
              { /* Hero */}
              <div className={clsx({
                [styles.hero.gral]: true,
                [styles.hero.withProfilePhoto]: !!photoProfile,
                [styles.hero.withoutProfilePhoto]: !photoProfile
              })}>
                {
                  (hero?.url) ?
                    <div className={styles.hero.imageContainer}>
                      <Image
                        src={hero.url}
                        layout='fill'
                        alt="Hero"
                        className={styles.hero.image}
                      />
                    </div>

                    : <div className={styles.hero.noImage}></div>
                }
              </div>


              { /* Profile photo */}
              {
                photoProfile ?
                  <div className={styles.profilePhoto.principalContainer}>
                    <div className="flex h-full w-full">
                      <div className={styles.profilePhoto.imageContainer}>
                        <Image
                          src={photoProfile}
                          width={500}
                          height={500}
                          alt="Profile"
                          className={styles.profilePhoto.image}
                        />
                      </div>
                    </div>
                  </div>
                  :
                  <></>
              }
            </div>
          </div>
        </div>
        {/* dangerouslySetInnerHTML={{ __html: '<div class="checkingMyBg">Hello</div>' }}> */}
      </div>
    </div>
  );
}

export function Style1EditView(
  {
    data
  }: Readonly<{
    data: {
      user: UserClient,
      section: SectionsClient
    }
  }>) {

  const paramsUrl = useParams<{ username: string }>()
  const heroInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [photoProfile, setPhotoProfile] = useState<string>('');
  const [heroPhoto, setHeroPhoto] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [blockPrepared, setblockPrepared] = useState<any[]>([]);

  const user = data.user;
  const home = data.section;
  const hero = home.medias.find(m => m.ishero);

  const handleHeroClick = () => {
    if (heroInputRef.current) {
      heroInputRef.current.click();
    }
  };

  const handleProfileClick = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const handleHeroChange = async () => {
    if (hero?.update && heroInputRef?.current?.files && heroInputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append('image', heroInputRef.current.files[0]);
      setLoading(true);
      let url = await hero?.update(paramsUrl.username, formData)
      setHeroPhoto(url);
      setLoading(false);
    }
  };

  const handleProfileChange = async () => {
    if (user?.photo_profile?.update && profileInputRef?.current?.files && profileInputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append('image', profileInputRef.current.files[0]);
      setLoading(true);
      let url = await user.photo_profile?.update(paramsUrl.username, formData);
      setPhotoProfile(url);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.photo_profile?.url && !photoProfile) {
      setPhotoProfile(user.photo_profile.url);
    }
  }, [photoProfile, user.photo_profile]);

  useEffect(() => {
    if (hero && !heroPhoto && hero.url) {
      setHeroPhoto(hero.url);
    }
  }, [heroPhoto, hero]);

  let block = {
    id: 1,
    numLines: 12,
    numCols: 12,
    defClassName: 'w-full min-h-80 h-fit grid grid-rows-12 grid-cols-12',
    customClassName: '',
    elements: [
      {
        id:3,
        lineFrom: 1,
        lineTo:1,
        colFrom:6,
        colTo:11,
        defClassName: 'h-full hover:scale-102',
        customClassName: 'bg-slate-200 border-solid border-2 border-sky-500'
      },
      {
        id:4,
        lineFrom: 2,
        lineTo:2,
        colFrom:2,
        colTo:11,
        defClassName: 'h-full hover:scale-102',
        customClassName: 'bg-slate-200 border-solid border-2 border-sky-500'
      },
      {
        id:5,
        lineFrom: 1,
        lineTo:12,
        colFrom:1,
        colTo:1,
        defClassName: 'h-full hover:scale-102',
        customClassName: 'bg-slate-200 border-solid border-2 border-sky-500 bg-red-200'
      }
    ]
  } as Block;

  let blocks = [block];
  /*let blockPrepared = buildBlocks(blocks);*/
  
  
  useEffect( () => {
    let blockPrepared_ = buildBlocksPage( blocks );
    setTimeout( () => {
      setblockPrepared( blockPrepared_ );
    }, 1000);
  }, []);

  return (
    <div style={{ backgroundColor: home.backgroundcolor }}
      className={clsx({
        ['w-full h-screen']: true,
        [styles.status.loading]: loading
      })} id='resumePageStyle1'>
      <div>
        <div className="w-full bg-gray-200 bg-opacity-50 h-fit p-5">
          <div className="grid grid-cols-1 gap-4 h-full">
            <div className="grid grid-cols-12 h-full">
              { /* Hero */}
              <div className={clsx({
                [styles.edit.hover]: !loading,
                [styles.hero.gral]: true,
                [styles.hero.withProfilePhoto]: true
              })}
                onClick={handleHeroClick}>
                {
                  (heroPhoto) ?
                    <div className={styles.hero.imageContainer}>
                      <Image
                        src={heroPhoto}
                        layout='fill'
                        alt="Hero"
                        className={styles.hero.image}
                      />
                    </div>

                    : <div className={styles.hero.imageContainer}>
                    </div>
                }
                <input
                  ref={heroInputRef}
                  type="file"
                  id="imageHero"
                  name="imageHero"
                  required
                  onChange={handleHeroChange}
                  style={{ display: 'none' }}
                />
              </div>
              { /* Profile photo */}
              {
                (photoProfile) ?
                  <div className={styles.profilePhoto.principalContainer}>
                    <div className={clsx({
                      ['cursor-pointer flex h-full w-full']: true,
                      [styles.edit.hover]: true,
                      [styles.status.loading]: loading
                    })}
                      onClick={handleProfileClick}>
                      <div className={styles.profilePhoto.imageContainer}>
                        <Image
                          src={photoProfile}
                          width={500}
                          height={500}
                          alt="Profile"
                          className={styles.profilePhoto.image}
                        />
                      </div>
                    </div>
                  </div>
                  :
                  <div className="col-span-3 rounded-r-xl cursor-pointer">
                    <div className='h-full p-1 w-full flex justify-center  items-center	'>
                      <div className={clsx({
                        [styles.edit.hover]: !loading,
                        ['bg-gray-300 rounded-full size-4/6']: true,

                      })} onClick={handleProfileClick}>
                      </div>
                    </div>
                  </div>
              }
              {
                <input
                  ref={profileInputRef}
                  type="file"
                  id="imageProfile"
                  name="imageProfile"
                  required
                  onChange={handleProfileChange}
                  style={{ display: 'none' }}
                />
              }
            </div>
          </div>
        </div>
            <div className='p-5'>
              {
                  blockPrepared
              }
            </div>
        {
        }
        {
        }
      </div>
      <div className='grid grid-cols-12 grid-rows-1 h-20'>
        <div className='col-start-6 col-span-2 text-center flex justify-center'>
          <PlusCircleIcon className='h-20 cursor-pointer hover:scale-105 bg-blue-300 rounded-full border bg-slate-700 mt-5'></PlusCircleIcon>
        </div>
      </div>
    </div>
  );
}

function getOcupedCases(elements: any[]) {
  let ocupedCases: any[] = [];
  elements.forEach(el => {
    let ys: number[] = [];

    let fromLine = el.lineFrom;
    let toLine = el.lineTo;

    for (let i = fromLine; i <= toLine; i++) {
      ys.push(i);
    }

    let xs: number[] = [];

    let fromCol = el.colFrom;
    let toCol = el.colTo;

    for (let i = fromCol; i <= toCol; i++) {
      xs.push(i);
    }

    // Cases
    ys.forEach(y => {
      xs.forEach(x => {
        ocupedCases.push({
          y: y,
          x: x
        })
      })
    });

  });
  return ocupedCases;
}


/**
 * Construct customed blocks to show in the  page
 * @param blocks 
 * @returns 
 */
function buildBlocksPage( blocks:Block[] ) {
  return blocks.map( ( block:Block ) => {
    let totLines = block.numLines;
    let totCols = block.numCols;

    let elementsList:any = [];
    elementsList.length = totLines * totCols;

    let blockElements = block.elements;

    // Set blocks in their position in array
    blockElements.forEach( b => {
      let lineFrom = b.lineFrom;
      let colFrom = b.colFrom;

      let elementSet = false;

      // - 1 because of the index in array
      for(let line = lineFrom; line <= b.lineTo; line++ ) {
        for(let col = colFrom; col <= b.colTo; col++ ) {
          let idxLine = line - 1;
          let idxCol = col-1;
          let setInLine = ( totCols * idxLine );
          let setPosition = setInLine + idxCol;

          if( !elementSet ) {
            // If the element has not been set, save it in its first position
            let spanRow = b.lineTo - b.lineFrom + 1;
            let spanCol = b.colTo - b.colFrom + 1;
            elementsList[ setPosition ] = <div style={{
              gridRow: `span ${spanRow} / span ${spanRow}`,
              gridColumn: `span ${spanCol} / span ${spanCol}`
            }} className={`${b.defClassName} ${b.customClassName}`}/>,

            elementSet = true;
          } else {
            // If the element has already been set, mark this case as ocuped
            elementsList[ setPosition ] = 1;
          }
        }
      }
    } );

    // Set edtiable elements with 1 col and 1 row in no ocuped positions
    for (let index = 0; index < elementsList.length; index++) {
      if( elementsList[index] == undefined ) {
        elementsList[index] = <div className="col-span-1 h-full bg-slate-200 border-solid border-2 rounded border-slate-700 hover:scale-105"/>
      }
      
    }
    
    /// Filter ocuped positions by one
    elementsList = elementsList.filter( ( e:any ) => e != 1 );
    
    return ( 
        <div key={`blk1`} className={clsx({
        "w-full min-h-80 h-fit grid": true,
        [`grid-rows-${totLines}`]: true,
        [`grid-cols-${totCols}`]: true
      })
      }
      >
        {
          elementsList
        }

      </div>
    )
  } );
}
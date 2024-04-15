'use client'
import { UserClient, SectionsClient, BlockClient } from './interfaces'
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation'
import Image from 'next/image';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { BuildBlocksEditMode } from '../custom/editMode/blocks';
import { BuildBlocksVisualMode } from '../custom/visualMode/blocks';

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
  let blocks = home.blocks as BlockClient[];

  useEffect(() => {
    if (user.photo_profile && !photoProfile) {
      setPhotoProfile(user.photo_profile.url);
    }
  }, [photoProfile, user.photo_profile]);

  return (
    <div style={{ backgroundColor: home.backgroundcolor }} className={clsx({
      ['w-full min-h-screen']: true,
      ['h-fit pb-10']: true,
    })} id='resumePageStyle1'>
      <div>
        {
          ( user.showheader ) ?
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
          : <></>
        }
        <div className='p-5'>
          { <BuildBlocksVisualMode blocks={blocks}></BuildBlocksVisualMode> }
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

  const user = data.user;
  const home = data.section;
  const hero = home.medias.find(m => m.ishero);
  let blocks = home.blocks as BlockClient[];

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

  let handlerCreateBlock = async () => {
    home?.actions?.addBlock();
  }

  return (
    <div style={{ backgroundColor: home.backgroundcolor }}
      className={clsx({
        ['w-full min-h-screen']: true,
        [styles.status.loading]: loading,
        /*['min-h-screen']: true,*/
        ['h-fit pb-10']: true,
      })} id='resumePageStyle1'>
      <div>
        { ( user.showheader ) ?
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

                      : <div className={styles.hero.imageContainer + ' border border-slate-950'}>
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
                          ['bg-gray-300 rounded-full size-4/6  border border-slate-950']: true,

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
          : <></>
        }
            <div className='p-5'>
              {
                  <BuildBlocksEditMode blocks={blocks}/>
              }
            </div>
      </div>
      <div className='grid grid-cols-12 grid-rows-1 h-20'>
        <div className='col-start-6 col-span-2 text-center flex justify-center'>
          <PlusCircleIcon onClick={handlerCreateBlock} className='h-20 cursor-pointer hover:scale-105 bg-blue-300 rounded-full border bg-slate-700 mt-5'></PlusCircleIcon>
        </div>
      </div>
    </div>
  );
}
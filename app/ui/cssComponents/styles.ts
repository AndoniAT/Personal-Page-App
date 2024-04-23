export const showHeaderStyles = {
    custom:  {
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
      }
}

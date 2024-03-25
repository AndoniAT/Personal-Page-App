// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function MenuResumeUserSkeleton() {
    return (
        <div className={`${shimmer} relative mb-4 min-h-screen overflow-hidden rounded-md bg-gray-100 w-full`}>

            <div className="w-full bg-gray-200 p-1 h-80">
                <div className="grid grid-cols-1 gap-4 h-full">
                    <div className="grid grid-cols-12 h-full">
                        <div className="col-span-9 p-5 rounded-l-xl">
                            <div className="h-full bg-gray-300 rounded-xl">

                            </div>
                        </div>
                        
                        <div className="col-span-3 p-10 rounded-r-xl">
                            <div className="bg-gray-300 rounded-full h-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-200 p-1 h-96 mt-3 p-5 rounded-xl">
                <div className="grid grid-cols-2 bg-gray-300 h-full">
                    <div className="grid grid-rows-7 p-10">
                            <div className="w-1/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-3/4 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-2/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/4 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-2/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-2 p-10 gap-4">
                        <div className="bg-gray-400 h-full rounded-xl"></div>
                        <div className="bg-gray-400 h-full rounded-xl"></div>
                        <div className="bg-gray-400 h-full rounded-xl"></div>
                        <div className="bg-gray-400 h-full rounded-xl"></div>
                        <div className="bg-gray-400 h-full rounded-xl"></div>
                        <div className="bg-gray-400 h-full rounded-xl"></div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-200 p-1 h-96 mt-3 p-5 rounded-xl">
                <div className="grid grid-cols-2 bg-gray-300 h-full">
                    <div className="grid grid-rows-7 p-10">
                            <div className="w-1/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-3/4 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-2/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/4 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-2/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                    </div>
                    <div className="grid grid-rows-7 p-10">
                            <div className="w-1/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-3/4 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-2/2 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/4 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-1/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                            <div className="w-2/3 bg-gray-400 rounded-l-full rounded-r-full h-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export  function HeroSkeleton() {
    return (
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    );
}

/*

export  function HeroSkeleton() {
    return (
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    );
}*/
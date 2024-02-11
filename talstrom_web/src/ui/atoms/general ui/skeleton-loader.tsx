const SkeletonLoader = () => (
    <div className="pt-10 lg:pt-14">
      <div className="animate-pulse container mx-auto bg-white rounded-lg shadow">
        <div className="h-20 w-full bg-gradient-to-r from-green-300 to-teal-300 rounded-t-lg"></div>
        <div className="flex flex-col items-center px-4 absolute top-20 lg:top-24 container mx-auto">
          <div className="rounded-full bg-gray-300 h-24 w-24"></div>
          
          <div className="my-4 text-center w-full">
            <div className="bg-gray-300 h-6 w-3/4 rounded mx-auto"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded mx-auto mt-2"></div>
          </div>
          
          <div className="text-md font-semibold text-center text-primary-text w-full mt-4">
            <div className="bg-gray-300 h-4 w-1/2 rounded mx-auto"></div>
          </div>
          <div className="flex flex-wrap items-center mt-2 justify-center w-full">
            <div className="bg-gray-300 h-8 w-8 rounded m-2"></div>
            <div className="bg-gray-300 h-8 w-8 rounded m-2"></div>
            <div className="bg-gray-300 h-8 w-8 rounded m-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
export default SkeletonLoader;
  
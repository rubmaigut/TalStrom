import { useUser } from "@/context/UserContext";
import ProfileNavLinks from "@/ui/customer/nav-links";
import NavLinks from "@/ui/developer/nav-links";

const SkeletonLoader = ( ) => {
    const { userContextG } = useUser()

    const userRole = userContextG.role

    return(
    <div className="w-full mt-4 container mx-auto">
      <div className="animate-pulse bg-white rounded-lg shadow">
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-100 py-1 lg:py-0">
            {userRole === "developer" ? (
                <NavLinks onLinkClick={() => "" } />
            ): (
                <ProfileNavLinks onLinkClick={() => "" }/>
            )}
        </header>
        <div className="bg-gradient-to-r from-green-300 to-teal-300 h-20 w-full flex justify-center items-center relative"></div>
        <div className="w-full flex flex-col items-center px-4 absolute top-20 lg:top-24 container mx-auto">
                {/* Picture skeleton */}
          <div className="rounded-full bg-gray-300 h-24 w-24"></div>
                {/* Name and description section skeleton */}
          <div className="my-4 text-center w-full">
            <div className="bg-gray-300 h-6 w-3/4 rounded mx-auto"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded mx-auto mt-2"></div>
          </div>
                {/*Technology stack*/}
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
    )
    };
  
export default SkeletonLoader;
  
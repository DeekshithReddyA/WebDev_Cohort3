import { useEffect, useState } from "react"
import { Room } from "../ui/Room"
import { Sidebar } from "../ui/Sidebar"

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

// Home.tsx
export const Home = () => {
    const [loading , setLoading] = useState(true);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        // Set initial state based on screen size
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    return (
        <div className="flex relative">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <div className={`flex-1 transition-all duration-300 
                ${isDesktop 
                    ? "ml-[320px]" 
                    : sidebarOpen 
                        ? "ml-0" 
                        : "ml-[70px]"
                }`}>
                <Room />
            </div>
        </div>
    )
}
// export const Home = () => {
//     const isDesktop = useMediaQuery("(min-width: 768px)");

  
//   useEffect(() => {
//     if (isDesktop == false) {
//       setSidebarOpen(false)
//     } else {
//       setSidebarOpen(true)
//     }
//   }, [isDesktop])
//     const [sidebarOpen , setSidebarOpen] = useState<boolean>(true);
//     return (
//         <div className="flex">
//             <div className="">
//                 <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
//             </div>
//             <div className="flex-1">
//                 <Room />
//             </div>
//         </div>
//     )
// }
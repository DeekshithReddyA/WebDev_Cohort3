import { useEffect, useRef, useState } from "react"
import { Room } from "../ui/Room"
import { Sidebar } from "../ui/Sidebar"
import { CreateRoomModal } from "../ui/CreateRoomModal";
import { JoinRoomModal } from "../ui/JoinRoomModal";
import {  useUserData } from "../hooks/useRooms";
import { Landing } from "../ui/Landing";
import { Loading } from "../ui/Loading";
import { WS_URL } from "../../Config";

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


export const Home = () => {
    const [loading , setLoading] = useState(true);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [createRoomModelOpen , setCreateRoomModalOpen ] = useState<boolean>(false);
    const [joinRoomModalOpen, setJoinRoomModalOpen] = useState<boolean>(false);
    const [selectedRoom , setSelectedRoom ] = useState<any>(null);
    const {refresh ,userData , messages }:{
      refresh: any,
      userData: any,
      messages: any
    } = useUserData();
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectAttempts = useRef(0);
    
    
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setSelectedRoom(null); // Change room state to null when Escape is pressed
        }
      };
      
      document.addEventListener("keydown", handleKeyDown);
      
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    useEffect(() =>{
      if(userData && messages){;
        
        setLoading(false);
      }
    } ,[userData , messages]);



    const setupWebSocket = () => {
        const ws = new WebSocket("ws://localhost:10000");
        
        ws.onopen = () => {
            console.log("Connected to websocket");
            reconnectAttempts.current = 0;
            ws.send(JSON.stringify({
                type: "join",
                payload: { token: localStorage.getItem('token') }
            }));
        };

        ws.onclose = (e) => {
            console.log(`WebSocket closed: ${e.reason}`);
            const timeout = Math.min(5000, (2 ** reconnectAttempts.current) * 1000);
            setTimeout(() => {
                reconnectAttempts.current++;
                setupWebSocket();
            }, timeout);
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            ws.close();
        };

        socketRef.current = ws;
    };
        useEffect(() => {
        setupWebSocket();
        return () => {
            socketRef.current?.close();
        };
    }, []);
    

    useEffect(() => {
        // Set initial state based on screen size
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    return (
      <>{
        loading ? <Loading />
        :
        <div className="flex relative">
            <Sidebar refresh={refresh} userData={userData} setSelectedRoom={setSelectedRoom} setJoinRoomModalOpen={setJoinRoomModalOpen} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setCreateRoomModalOpen={setCreateRoomModalOpen}/>
            <div className={`flex-1 transition-all duration-300 
                ${isDesktop 
                  ? "ml-[320px]" 
                  : sidebarOpen 
                  ? "ml-0" 
                  : "ml-[70px]"
                  }`}>
                {selectedRoom ? <Room key={selectedRoom._id} socket={socketRef.current ? socketRef.current : new WebSocket(WS_URL)} userData={userData} messages={messages} room={selectedRoom}/> : <Landing />}
            </div>
            <CreateRoomModal refresh={refresh} setCreateRoomModalOpen={setCreateRoomModalOpen} createRoomModalOpen={createRoomModelOpen}/>
            <JoinRoomModal refresh={refresh} joinRoomModalOpen={joinRoomModalOpen} setJoinRoomModalOpen={setJoinRoomModalOpen} />
        </div>
                }
      </>
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
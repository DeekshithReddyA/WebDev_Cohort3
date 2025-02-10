import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [socket , setSocket] = useState<WebSocket>();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    setSocket(ws);

    // ws.onerror = () =>{

    // }

    // ws.close = () =>{

    // }

    // ws.onclose = () => {

    // }

    // ws.onopen = () => {

    // }

    ws.onmessage = (event) => {
      alert(event.data);
    }
  },[]);

  const sendMessage = () => {
    if(!socket) return;

    const message = inputRef.current.value;

    socket.send(message);
  }

  return (
    <>
    <div>
      <input ref={inputRef} type='text' placeholder='Message...'></input>
      <button onClick={sendMessage}>Send</button>
    </div>
    </>
  )
}

export default App

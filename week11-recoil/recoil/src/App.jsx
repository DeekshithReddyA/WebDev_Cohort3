// import './App.css'
// import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
// import { counterAtom } from './store/atoms/counter'

// // using useState re-renders every component which has been sent as props. 
// // using contextAPI , prop drilling is avoided but re-render problem still exists
// // Re-rendering is solved using recoil

// function App() {

//   return (
//     <RecoilRoot >
//     <Counter />
//     </RecoilRoot>
//   )
// }

// function Counter() {
//   // const [count , setCount] = useState(0);
//   const setCount = useSetRecoilState(counterAtom);
//   return (
//     <div>
//       <CurrentCount />
//       <Increase setCount={setCount}/>
//       <Decrease setCount={setCount}/>
//     </div>
//   )
// }

// function CurrentCount() {
//   const count = useRecoilValue(counterAtom);
//   return(
//     <div>
//       {count}
//     </div>
//   )
// }

// function Decrease({setCount}) {
//   // const setCount = useSetRecoilState(counterAtom);
//   function decrease(){
//     setCount(count => count - 1);
//   }
//   return (
//     <div>
//       <button onClick={decrease}>Decrease</button>
//     </div>
//   )
// }

// function Increase({setCount}){
//   // const setCount = useSetRecoilState(counterAtom);
//   function increase() {
//     setCount(count => count + 1);
//   }
//   return(
//     <div>
//       <button onClick={increase}>Increase</button>
//     </div>
//   )
// }

// export default App;


import React from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom, evenSelector } from './store/atoms/counter'

function App() {
  return (
      <RecoilRoot>
        <Counter />
        <Buttons />
        <IsEven />
      </RecoilRoot>
  )
}

function Counter() {
  const count = useRecoilValue(counterAtom);
  return (
    <div>
        <p>
      {count}
        </p>
    </div>
  )
}

function Buttons(){
  const setCount = useSetRecoilState(counterAtom);
  
  function increase() {
    setCount(c => c + 2);
  }

  function decrease() {
    setCount(c => c - 1);
  }

  return(
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

function IsEven() {
  const even = useRecoilValue(evenSelector);
  return (
    <div>
      {even ? "Even" : "Odd"}
    </div>
  )
}

export default App;
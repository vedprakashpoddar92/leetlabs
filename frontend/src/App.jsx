import { useState, useRef } from 'react'
import './App.css'

function App() {

  const [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);

  const startCounter = () => {
    console.log(intervalRef.current, 'intervalRef');
    if(intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setCounter(prev => prev + 1);
    },1000)
  }

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  

  const name = ["ved", "prakash", "poddar", "harsh", "raj"];
  //const sortedName = name.sort();
  //console.log(sortedName);

  // find 2nd largest number in an array without using sort
  const numbar = [2,5,7,8,9,8];

  let largest = numbar[0];
  let secondLargest = numbar[0];
  for (let i = 0; i < numbar.length; i++) {
    if (numbar[i] > largest) {
      secondLargest = largest;
      largest = numbar[i];
    } else if (numbar[i] > secondLargest) {
      secondLargest = numbar[i];
    }
  }
  console.log(secondLargest);

  // find largest string in an array
  const largestString = name.reduce((a, b) => a.length > b.length ? a : b);
  console.log(largestString);
  return (
    <>
      <h1>Counter App</h1>
      <h2>{counter > 0 && <span>Count Value: {counter}</span>}</h2>
      <div className=' flex flex-row gap-5 justify-center items-center'>
        <button type="button" onClick={startCounter} className=' p-2 bg-slate-400'>Start</button>
        <button type="button" onClick={stopCounter} className='p-2 bg-slate-400'>Stop</button>
      </div>
    </>
  )
}

export default App

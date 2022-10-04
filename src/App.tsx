import { useState } from 'react'
import pancakesSvg from './assets/pancakes.svg'
import './App.css'

const AUNT_PRICE = 10

function App() {
  const [count, setCount] = useState(0)
  const [aunts, setAunts] = useState(0)

  const buyAunt = () => {
    if (count >= AUNT_PRICE) {
      setCount(value => value - AUNT_PRICE)
      setAunts(value => value + 1)
    }
  }

  return (
    <div>
      <button onClick={() => setCount(count => count + 1)}>
        <img src={pancakesSvg} alt='Pancakes' />
      </button>
      count is {count}
      <button disabled={AUNT_PRICE > count} onClick={buyAunt}>
        <p>Aunt Barbara: {aunts}</p>
        <p>{AUNT_PRICE}</p>
      </button>
    </div>
  )
}

export default App

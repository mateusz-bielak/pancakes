import { useCallback, useEffect, useState } from 'react';
import pancakesSvg from './assets/pancakes.svg';
import './App.css';

const AUNT_PRICE = 10;

function App() {
  const [count, setCount] = useState(0);
  const [aunts, setAunts] = useState(0);

  const buyAunt = () => {
    if (count >= AUNT_PRICE) {
      setCount(value => value - AUNT_PRICE);
      setAunts(value => value + 1);
    }
  };

  const passiveIncome = useCallback(() => setCount(value => value + 0.1 * aunts), [aunts]);

  useEffect(() => {
    const interval = setInterval(passiveIncome, 100);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  return (
    <div>
      <button onClick={() => setCount(count => count + 1)}>
        <img src={pancakesSvg} alt='Pancakes' />
      </button>
      {Math.round(count)}
      <button disabled={AUNT_PRICE > count} onClick={buyAunt}>
        <p>Aunt Barbara: {aunts}</p>
        <p>{AUNT_PRICE}</p>
      </button>
    </div>
  );
}

export default App;

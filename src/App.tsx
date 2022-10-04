import { useCallback, useEffect, useState } from 'react';
import pancakesSVG from './assets/pancakes.svg';
import './App.css';

const PAN_PRICE = 10;

function App() {
  const [count, setCount] = useState(0);
  const [pans, setPans] = useState(0);

  const buyPan = () => {
    if (count >= PAN_PRICE) {
      setCount(value => value - PAN_PRICE);
      setPans(value => value + 1);
    }
  };

  const passiveIncome = useCallback(() => setCount(value => value + 0.1 * pans), [pans]);

  useEffect(() => {
    const interval = setInterval(passiveIncome, 100);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  return (
    <>
      <div className='counter-wrapper'>
        {Math.round(count)} PANCAKES
        <button className='pancakes' onClick={() => setCount(count => count + 1)}>
          <img src={pancakesSVG} alt='Pancakes' />
        </button>
      </div>
      <button className='maker' disabled={PAN_PRICE > count} onClick={buyPan}>
        <div className='maker-details'>
          <p className='maker-name'>Pan</p>
          <p className='maker-price'>
            <img src={pancakesSVG} alt='Pancakes' />{' '}
            <span className='maker-price'>{PAN_PRICE}</span>
          </p>
        </div>
        {pans}
      </button>
    </>
  );
}

export default App;

import { useCallback, useEffect, useState } from 'react';
import pancakesSVG from './assets/pancakes.svg';

const PAN_PRICE = 10;

const names = ['Pan', 'Kitchen', 'Factory'];

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
    <div className='m-4'>
      <h1 className='text-4xl text-fuchsia-900'>Make Some Pancakes</h1>
      <div className='container mx-auto mt-24'>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col items-center gap-8'>
            <span className='text-2xl'>{Math.round(count)} PANCAKES</span>
            <button className='pancakes' onClick={() => setCount(count => count + 1)}>
              <img src={pancakesSVG} alt='Pancakes' />
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            {names.map(name => (
              <button
                key={name}
                className='flex max-w-sm items-center justify-between space-x-4 rounded-xl bg-white p-6 shadow-lg'
                onClick={buyPan}
              >
                <div className='flex flex-col'>
                  <p className='text-xl font-medium text-slate-900'>{name}</p>
                  <div className='flex space-x-1'>
                    <img className='h-5' src={pancakesSVG} alt={`${name} Logo`} />
                    <span className='text-sm text-slate-500'>{PAN_PRICE}</span>
                  </div>
                  <p className='text-sm font-medium text-slate-500'></p>
                </div>
                <p className='text-3xl text-slate-500'>{pans}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useCallback, useEffect, useState } from 'react';
import pancakesSVG from './assets/pancakes.svg';

type Maker = {
  name: string;
  price: number;
  income: number;
  amount: number;
};

function App() {
  const [count, setCount] = useState(0);

  const [income, setIncome] = useState(0);
  const panState = useState<Maker>({ name: 'Pan', price: 10, income: 0.1, amount: 0 });
  const kitchenState = useState<Maker>({ name: 'Cook', price: 100, income: 1, amount: 0 });
  const factoryState = useState<Maker>({ name: 'Restaurant', price: 300, income: 3, amount: 0 });
  const rocketState = useState<Maker>({ name: "Hell's Kitchen", price: 500, income: 5, amount: 0 });

  const makers = [panState, kitchenState, factoryState, rocketState];

  const buyMaker = (maker: Maker, setMaker: React.Dispatch<React.SetStateAction<Maker>>) => () => {
    if (count >= maker.price) {
      setCount(value => value - maker.price);
      setMaker(({ amount, price, ...rest }) => ({
        amount: amount + 1,
        price: Math.round(price * 1.15),
        ...rest,
      }));
      setIncome(value => value + maker.income);
    }
  };

  const passiveIncome = useCallback(() => setCount(value => value + 0.1 * income), [income]);

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
            <span className='text-2xl'>{Math.floor(count)} PANCAKES</span>
            <button className='pancakes' onClick={() => setCount(count => count + 1)}>
              <img src={pancakesSVG} alt='Pancakes' />
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            {makers.map(([maker, setMaker]) => (
              <button
                key={maker.name}
                className='flex max-w-sm items-center justify-between space-x-4 rounded-xl bg-white p-6 shadow-lg'
                onClick={buyMaker(maker, setMaker)}
              >
                <div className='flex flex-col'>
                  <p className='text-xl font-medium text-slate-900'>{maker.name}</p>
                  <div className='flex space-x-1'>
                    <img className='h-5' src={pancakesSVG} alt={`${maker.name} Logo`} />
                    <span className='text-sm text-slate-500'>{maker.price}</span>
                  </div>
                  <p className='text-sm font-medium text-slate-500'></p>
                </div>
                <p className='text-3xl text-slate-500'>{maker.amount}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

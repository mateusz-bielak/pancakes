import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Maker } from './components/Maker';
import { PancakeButton } from './components/PancakeButton';

type Maker = {
  name: string;
  price: number;
  income: number;
  amount: number;
};

export const App = () => {
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
      <Header />
      <div className='container mx-auto mt-24 grid grid-cols-2 '>
        <PancakeButton count={count} setCount={setCount} />
        <Maker.ListWrapper>
          {makers.map(([maker, setMaker]) => (
            <Maker.Card
              key={maker.name}
              amount={maker.amount}
              name={maker.name}
              onClick={buyMaker(maker, setMaker)}
              price={maker.price}
            />
          ))}
        </Maker.ListWrapper>
      </div>
    </div>
  );
};

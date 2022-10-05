import { useEffect } from 'react';
import create from 'zustand';
import { Header } from './components/Header';
import { MakersList } from './components/MakersList';
import { PancakeButton } from './components/PancakeButton';

export const makerKeys = ['pan', 'cook', 'restaurant', 'hellsKitchen'] as const;

type Maker = {
  name: string;
  price: number;
  income: number;
  amount: number;
};

type Store = {
  pancakes: number;
  income: number;
  pan: Maker;
  cook: Maker;
  restaurant: Maker;
  hellsKitchen: Maker;
  setPancakes: () => void;
  passiveIncome: () => void;
  updateMaker: (key: typeof makerKeys[number]) => () => void;
};

export const usePancakesStore = create<Store>((set, get) => ({
  pancakes: 0,
  income: 0,

  pan: { name: 'Pan', price: 10, income: 0.1, amount: 0 },
  cook: { name: 'Cook', price: 100, income: 1, amount: 0 },
  restaurant: { name: 'Restaurant', price: 300, income: 3, amount: 0 },
  hellsKitchen: { name: "Hell's Kitchen", price: 500, income: 5, amount: 0 },

  setPancakes: () => set(state => ({ pancakes: state.pancakes + 1 })),
  passiveIncome: () => set(state => ({ pancakes: state.pancakes + state.income / 10 })),

  updateMaker: (key: typeof makerKeys[number]) => () => {
    if (get()[key].price > get().pancakes) {
      return;
    }
    set(state => ({
      pancakes: state.pancakes - state[key].price,
      income: state.income + state[key].income,
      [key]: {
        ...state[key],
        amount: state[key].amount + 1,
        price: Math.ceil(state[key].price * 1.15),
      },
    }));
  },
}));

export const App = () => {
  const passiveIncome = usePancakesStore(state => state.passiveIncome);

  useEffect(() => {
    setInterval(passiveIncome, 100);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-200 to-purple-50 p-6'>
      <div className='sm:flex sm:h-full sm:items-center sm:justify-center'>
        <div className='sm:rounded-3xl sm:bg-slate-50 sm:p-6 sm:shadow-2xl'>
          <div className='grid gap-10 sm:grid-cols-2 sm:gap-10'>
            <div className='flex flex-col gap-10'>
              <Header />
              <PancakeButton />
            </div>
            <MakersList />
          </div>
        </div>
      </div>
    </div>
  );
};

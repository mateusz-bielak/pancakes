import create from 'zustand';

export const makerKeys = ['pan', 'cook', 'restaurant', 'hellsKitchen'] as const;

type Maker = {
  name: string;
  price: number;
  income: number;
  amount: number;
};

type Store = Record<typeof makerKeys[number], Maker> & {
  pancakes: number;
  income: number;
  setIncome: (value: number) => void;
  setPancakes: (value: number) => void;
  passiveIncomeInMilliseconds: () => void;
  updateMaker: (key: typeof makerKeys[number]) => void;
};

export const usePancakesStore = create<Store>(set => ({
  pancakes: 0,
  income: 0,

  pan: { name: 'Pan', price: 10, income: 0.1, amount: 0 },
  cook: { name: 'Cook', price: 100, income: 1, amount: 0 },
  restaurant: { name: 'Restaurant', price: 300, income: 3, amount: 0 },
  hellsKitchen: { name: "Hell's Kitchen", price: 500, income: 5, amount: 0 },

  setIncome: value => set(state => ({ income: state.income + value })),
  setPancakes: value => set(state => ({ pancakes: state.pancakes + value })),

  passiveIncomeInMilliseconds: () =>
    set(state => ({ pancakes: state.pancakes + state.income / 10 })),

  updateMaker: (key: typeof makerKeys[number]) => {
    set(state => ({
      [key]: {
        ...state[key],
        amount: state[key].amount + 1,
        price: Math.ceil(state[key].price * 1.15),
      },
    }));
  },
}));

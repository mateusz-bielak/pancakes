import create from 'zustand';

export const makerKeys = ['pan', 'cook', 'restaurant', 'hellsKitchen'] as const;

export type Maker = {
  name: string;
  price: number;
  income: number;
  amount: number;
};

type Store = Record<typeof makerKeys[number], Maker> & {
  pancakes: number;
  income: number;
  getMakersData: () => [typeof makerKeys[number], Maker][];
  getPancakesData: () => { pancakes: number; income: number };
  addIncome: (value: number) => void;
  addPancakes: (value: number) => void;
  passiveIncomeInMilliseconds: () => void;
  setMaker: (key: typeof makerKeys[number], data: Maker) => void;
  updateMaker: (key: typeof makerKeys[number]) => void;
};

export const usePancakesStore = create<Store>((set, get) => ({
  pancakes: 0,
  income: 0,

  addIncome: value => set(state => ({ income: Math.round((state.income + value) * 10) / 10 })),
  addPancakes: value => set(state => ({ pancakes: state.pancakes + value })),
  getPancakesData: () => ({ pancakes: get().pancakes, income: get().income }),

  pan: { name: 'Pan', price: 10, income: 0.1, amount: 0 },
  cook: { name: 'Cook', price: 100, income: 1, amount: 0 },
  restaurant: { name: 'Restaurant', price: 300, income: 3, amount: 0 },
  hellsKitchen: { name: "Hell's Kitchen", price: 500, income: 5, amount: 0 },

  getMakersData: () => [
    ['pan', get().pan],
    ['cook', get().cook],
    ['restaurant', get().restaurant],
    ['hellsKitchen', get().hellsKitchen],
  ],

  passiveIncomeInMilliseconds: () =>
    set(state => ({ pancakes: Math.round((state.pancakes + state.income / 10) * 100) / 100 })),

  setMaker: (key, data) => set(() => ({ [key]: data })),

  updateMaker: (key: typeof makerKeys[number]) =>
    set(state => ({
      [key]: {
        ...state[key],
        amount: state[key].amount + 1,
        price: Math.ceil(state[key].price * 1.15),
      },
    })),
}));

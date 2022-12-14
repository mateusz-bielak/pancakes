import pancakesSVG from '../assets/pancakes.svg';
import { makerKeys, usePancakesStore } from '../modules/store';

export const MakersList = () => (
  <div className='flex flex-col gap-4'>
    {makerKeys.map(makerKey => (
      <Card key={makerKey} id={makerKey} />
    ))}
  </div>
);

type CardProps = {
  id: typeof makerKeys[number];
};

const Card = ({ id }: CardProps) => {
  const pancakes = usePancakesStore(state => state.pancakes);
  const { amount, income, name, price } = usePancakesStore(state => state[id]);
  const addIncome = usePancakesStore(state => state.addIncome);
  const addPancakes = usePancakesStore(state => state.addPancakes);
  const updateMaker = usePancakesStore(state => state.updateMaker);

  const onClick = () => {
    addIncome(income);
    addPancakes(-price);
    updateMaker(id);
  };

  return (
    <button
      className='flex items-center justify-between space-x-4 rounded-xl bg-slate-50 p-6 shadow-lg sm:bg-sky-200'
      disabled={price > pancakes}
      onClick={onClick}
    >
      <div className='flex flex-col'>
        <p className='text-xl font-medium text-slate-800'>{name}</p>
        <div className='flex space-x-1'>
          <img className='h-5' src={pancakesSVG} alt={`${name} Logo`} />
          <span className='text-sm text-slate-600'>{price}</span>
        </div>
      </div>
      <p className='text-3xl text-slate-500'>{amount}</p>
    </button>
  );
};

import { makerKeys, usePancakesStore } from '../App';
import pancakesSVG from '../assets/pancakes.svg';

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
  const { amount, name, price } = usePancakesStore(state => state[id]);
  const updateMaker = usePancakesStore(state => state.updateMaker);

  return (
    <button
      className='flex items-center justify-between space-x-4 rounded-xl bg-slate-50 p-6 shadow-lg sm:bg-sky-200'
      onClick={updateMaker(id)}
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

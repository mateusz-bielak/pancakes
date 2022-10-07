import pancakesSVG from '../assets/pancakes.svg';
import { usePancakesStore } from '../modules/store';

export const PancakeButton = () => {
  const addPancakes = usePancakesStore(state => state.addPancakes);

  return (
    <div className='flex flex-col items-center gap-4'>
      <PancakeCounter />
      <button className='pancakes' onClick={() => addPancakes(1)}>
        <img src={pancakesSVG} alt='Pancakes' />
      </button>
    </div>
  );
};

const PancakeCounter = () => {
  const pancakes = usePancakesStore(state => state.pancakes);
  const income = usePancakesStore(state => state.income);
  return (
    <div className='flex flex-col items-center'>
      <span className='text-2xl text-slate-800'>{Math.floor(pancakes)} PANCAKES</span>
      <span className='text-sm font-medium text-slate-800'>{income} per second</span>
    </div>
  );
};

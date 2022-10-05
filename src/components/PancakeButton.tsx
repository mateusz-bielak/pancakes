import { usePancakesStore } from '../App';
import pancakesSVG from '../assets/pancakes.svg';

export const PancakeButton = () => {
  const setPancakes = usePancakesStore(state => state.setPancakes);

  return (
    <div className='mt-10 flex flex-col items-center gap-4'>
      <PancakeCounter />
      <button className='pancakes' onClick={() => setPancakes()}>
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
      <span className='text-2xl'>{Math.floor(pancakes)} PANCAKES</span>
      <span className='text-sm'>{Math.round(income * 10) / 10} per second</span>
    </div>
  );
};

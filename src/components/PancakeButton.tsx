import pancakesSVG from '../assets/pancakes.svg';

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const PancakeButton = ({ count, setCount }: Props) => (
  <div className='flex flex-col items-center gap-8'>
    <span className='text-2xl'>{Math.floor(count)} PANCAKES</span>
    <button className='pancakes' onClick={() => setCount(value => value + 1)}>
      <img src={pancakesSVG} alt='Pancakes' />
    </button>
  </div>
);

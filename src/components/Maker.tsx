import { ReactNode } from 'react';
import pancakesSVG from '../assets/pancakes.svg';

type CardProps = {
  amount: number;
  name: string;
  onClick: () => void;
  price: number;
};

const Card = ({ amount, name, onClick, price }: CardProps) => (
  <button
    className='flex max-w-sm items-center justify-between space-x-4 rounded-xl bg-white p-6 shadow-lg'
    onClick={onClick}
  >
    <div className='flex flex-col'>
      <p className='text-xl font-medium text-slate-900'>{name}</p>
      <div className='flex space-x-1'>
        <img className='h-5' src={pancakesSVG} alt={`${name} Logo`} />
        <span className='text-sm text-slate-500'>{price}</span>
      </div>
      <p className='text-sm font-medium text-slate-500'></p>
    </div>
    <p className='text-3xl text-slate-500'>{amount}</p>
  </button>
);

type ListWrapperProps = {
  children: ReactNode;
};

const ListWrapper = ({ children }: ListWrapperProps) => (
  <div className='flex flex-col gap-4'>{children}</div>
);

export const Maker = { Card, ListWrapper };

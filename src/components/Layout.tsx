import { Header } from './Header';
import { MakersList } from './MakersList';
import { PancakeButton } from './PancakeButton';

export const Layout = () => (
  <div className='min-h-screen items-center justify-center bg-gradient-to-b from-purple-200 to-purple-50 p-6 sm:flex'>
    <div className='h-full sm:flex sm:items-center sm:justify-center'>
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

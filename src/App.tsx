import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { usePancakesStore } from './modules/store';

export const App = () => {
  const passiveIncome = usePancakesStore(state => state.passiveIncomeInMilliseconds);

  useEffect(() => {
    const interval = setInterval(passiveIncome, 100);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Layout />;
};

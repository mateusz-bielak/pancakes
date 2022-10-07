import { useCallback, useEffect } from 'react';
import setupIndexedDB, { useIndexedDBStore } from 'use-indexeddb';
import { IndexedDBConfig } from 'use-indexeddb/dist/interfaces';
import { Maker, makerKeys, usePancakesStore } from './store';

const PANCAKES_STORE = 'pancakes';
const AMOUNT_KEY = 'amount';
const INCOME_KEY = 'income';

let indexedDBIsCreated = false;

const config: IndexedDBConfig = {
  databaseName: 'database',
  version: 1,
  stores: [{ name: PANCAKES_STORE, id: {}, indices: [] }],
};

const usePancakesLoader = () => {
  const { getByID } = useIndexedDBStore<number>(PANCAKES_STORE);
  const addPancakes = usePancakesStore(state => state.addPancakes);
  const addIncome = usePancakesStore(state => state.addIncome);

  return async () => {
    addPancakes(await getByID(AMOUNT_KEY));
    addIncome(await getByID(INCOME_KEY));
  };
};

const useMakersLoader = () => {
  const { getByID } = useIndexedDBStore<Maker>(PANCAKES_STORE);
  const setMaker = usePancakesStore(state => state.setMaker);

  return () => {
    makerKeys.forEach(async key => setMaker(key, await getByID(key)));
  };
};

export const usePancakesUpdater = () => {
  const getPancakesData = usePancakesStore(state => state.getPancakesData);
  const getMakersData = usePancakesStore(state => state.getMakersData);
  const { update } = useIndexedDBStore(PANCAKES_STORE);

  const updateIndexedDB = useCallback(() => {
    const { pancakes, income } = getPancakesData();
    update(pancakes, AMOUNT_KEY);
    update(income, INCOME_KEY);
    getMakersData().forEach(([key, maker]) => update(maker, key));
  }, [getPancakesData, getMakersData, update]);

  useEffect(() => {
    const interval = setInterval(updateIndexedDB, 1000);
    return () => clearInterval(interval);
  }, [updateIndexedDB]);
};

export const useSetupIndexedDB = async () => {
  const makersData = usePancakesStore(state => state.getMakersData());
  const { add, getAll } = useIndexedDBStore(PANCAKES_STORE);
  const loadPancakes = usePancakesLoader();
  const loadMakers = useMakersLoader();

  if (indexedDBIsCreated) return;
  indexedDBIsCreated = true;

  await setupIndexedDB(config);

  const addIndices = () => {
    add(0, AMOUNT_KEY);
    add(0, INCOME_KEY);
    makersData.forEach(([key, maker]) => add(maker, key));
  };

  const hasData = (await getAll()).length > 0;
  !hasData && addIndices();

  loadPancakes();
  loadMakers();
};

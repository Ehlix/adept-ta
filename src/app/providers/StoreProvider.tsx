import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { mainStore } from '../store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => (
  <Provider store={mainStore}>{children}</Provider>
);

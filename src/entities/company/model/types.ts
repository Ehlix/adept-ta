import { Reducer } from '@reduxjs/toolkit';

export interface Company {
  id: string;
  name: string;
  address: string;
  isSelected: boolean;
}

export interface CompanyState {
  companies: Company[];
}

export type CompanySliceStore = ReturnType<
  Reducer<{
    companies: CompanyState;
  }>
>;

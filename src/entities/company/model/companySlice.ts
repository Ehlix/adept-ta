import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company, CompanyState } from './types';


const initialState: CompanyState = {
  companies: [],
};

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
    },
    toggleSelect(state, action: PayloadAction<string>) {
      const company = state.companies.find((c) => c.id === action.payload);
      if (company) company.isSelected = !company.isSelected;
    },
    toggleSelectAll(state) {
      const allSelected = state.companies.every((c) => c.isSelected);
      const partiallySelected = state.companies.some((c) => c.isSelected);
      const shouldSelectAll = !allSelected || !partiallySelected;

      state.companies.forEach((c) => {
        c.isSelected = shouldSelectAll;
      });
    },
    updateCompany(
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Company;
        value: Company[keyof Company];
      }>
    ) {
      const company = state.companies.find((c) => c.id === action.payload.id);

      if (company) {
        const field = action.payload.field;
        (company[field] as typeof action.payload.value) = action.payload.value;
      }
    },
    addCompany(state, action: PayloadAction<Company>) {
      state.companies.unshift(action.payload);
    },
    removeSelected(state) {
      state.companies = state.companies.filter((c) => !c.isSelected);
    },
  },
});

export const {
  setCompanies,
  toggleSelect,
  toggleSelectAll,
  updateCompany,
  addCompany,
  removeSelected,
} = companySlice.actions;

export default companySlice.reducer;

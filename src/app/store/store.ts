import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {companyReducer} from '@/entities/company/model';

const mainReducer = combineReducers({
  companies: companyReducer,
});

export const mainStore = configureStore({
  reducer: mainReducer,
});

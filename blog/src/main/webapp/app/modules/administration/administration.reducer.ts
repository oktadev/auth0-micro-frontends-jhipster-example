import axios from 'axios';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { AppThunk } from 'app/config/store';

const initialState = {
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

export type AdministrationState = Readonly<typeof initialState>;

// Actions

export const AdministrationSlice = createSlice({
  name: 'administration',
  initialState: initialState as AdministrationState,
  reducers: {},
  extraReducers(builder) {},
});

// Reducer
export default AdministrationSlice.reducer;

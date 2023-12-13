import { createSlice } from '@reduxjs/toolkit';

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

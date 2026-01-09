import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  property: null,
  loading: false,
  error: null,
};

const propertyDetailsSlice = createSlice({
  name: "propertyDetails",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProperty: (state, action) => {
      state.property = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearProperty: (state) => {
      state.property = null;
      state.error = null;
    },
  },
});

export const { setLoading, setProperty, setError, clearProperty } = propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accommodations: [],
  loading: false,
  error: null,
};

const accommodationSlice = createSlice({
  name: "accommodation",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAccommodations: (state, action) => {
      state.accommodations = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setAccommodations, setError } = accommodationSlice.actions;
export default accommodationSlice.reducer;


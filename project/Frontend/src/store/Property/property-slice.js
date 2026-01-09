import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  loading: false,
  error: null,
  filters: {
    city: "",
    minPrice: "",
    maxPrice: "",
    propertyType: [],
    roomType: "",
    amenities: [],
    guests: "",
    dateIn: "",
    dateOut: "",
  },
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setProperties, setFilters, clearFilters, setError } = propertySlice.actions;
export default propertySlice.reducer;


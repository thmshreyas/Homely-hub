import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  bookingDetails: {
    propertyId: null,
    fromDate: null,
    toDate: null,
    guests: 1,
    nights: 0,
    price: 0,
    totalAmount: 0,
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = { ...state.bookingDetails, ...action.payload };
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = initialState.bookingDetails;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setBookings, setCurrentBooking, setBookingDetails, clearBookingDetails, setError } = bookingSlice.actions;
export default bookingSlice.reducer;


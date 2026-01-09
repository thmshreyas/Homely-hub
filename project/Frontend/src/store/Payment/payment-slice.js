import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null,
  loading: false,
  error: null,
  paymentStatus: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearPayment: (state) => {
      state.orderId = null;
      state.paymentStatus = null;
      state.error = null;
    },
  },
});

export const { setLoading, setOrderId, setPaymentStatus, setError, clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;


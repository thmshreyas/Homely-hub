import { axiosInstance } from "../../utils/axios.js";
import { setLoading, setOrderId, setPaymentStatus, setError } from "./payment-slice.js";
import toast from "react-hot-toast";

export const createOrder = (bookingData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post("/rent/user/booking/create-order", bookingData);
    dispatch(setOrderId(response.data.orderId));
    return { success: true, orderId: response.data.orderId, data: response.data };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create order";
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyPayment = (paymentData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post("/rent/user/booking/verify-payment", {
      ...paymentData,
      forceStatus: "success", // Simulating successful payment
    });
    dispatch(setPaymentStatus("success"));
    toast.success("Payment successful! Booking confirmed.");
    return { success: true, booking: response.data.booking };
  } catch (error) {
    const message = error.response?.data?.message || "Payment verification failed";
    dispatch(setPaymentStatus("failed"));
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};


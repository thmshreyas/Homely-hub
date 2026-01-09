import { axiosInstance } from "../../utils/axios.js";
import { setLoading, setBookings, setCurrentBooking, setError } from "./booking-slice.js";
import toast from "react-hot-toast";

export const fetchUserBookings = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get("/rent/user/booking");
    dispatch(setBookings(response.data.data.bookings || []));
    return { success: true, bookings: response.data.data.bookings };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch bookings";
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get(`/rent/user/booking/${bookingId}`);
    dispatch(setCurrentBooking(response.data.data.bookings));
    return { success: true, booking: response.data.data.bookings };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch booking details";
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};


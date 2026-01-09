import { axiosInstance } from "../../utils/axios.js";
import { setLoading, setAccommodations, setError } from "./Accomodation-slice.js";
import toast from "react-hot-toast";

export const fetchUserAccommodations = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get("/rent/user/myAccommodation");
    dispatch(setAccommodations(response.data.data || []));
    return { success: true, accommodations: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch accommodations";
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const createAccommodation = (accommodationData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.post("/rent/user/newAccommodation", accommodationData);
    toast.success("Accommodation created successfully!");
    return { success: true, accommodation: response.data.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create accommodation";
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};


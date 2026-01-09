import { axiosInstance } from "../../utils/axios.js";
import { setLoading, setProperty, setError } from "./propertyDetails-slice.js";
import toast from "react-hot-toast";

export const fetchPropertyDetails = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get(`/rent/listing/${id}`);
    dispatch(setProperty(response.data.data));
    return { success: true, property: response.data.data };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch property details";
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};


import { axiosInstance } from "../../utils/axios.js";
import { setLoading, setProperties, setError } from "./property-slice.js";
import toast from "react-hot-toast";

export const fetchProperties = (filters = {}) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((value) => queryParams.append(key, value));
        } else {
          queryParams.append(key, filters[key]);
        }
      }
    });

    const response = await axiosInstance.get(`/rent/listing/?${queryParams.toString()}`);
    const properties = response.data.data || [];
    dispatch(setProperties(properties));
    return { success: true, properties };
  } catch (error) {
    const message = error.response?.data?.error || "Failed to fetch properties";
    dispatch(setError(message));
    toast.error(message);
    return { success: false, error: message };
  } finally {
    dispatch(setLoading(false));
  }
};


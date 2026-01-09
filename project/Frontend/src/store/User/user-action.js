import { axiosInstance } from "../../utils/axios.js";
import { loginStart, loginSuccess, loginFailure, logout, updateUser } from "./user-slice.js";
import toast from "react-hot-toast";

export const signup = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post("/rent/user/signup", userData);
    dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
    toast.success("Account created successfully!");
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    dispatch(loginFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post("/rent/user/login", credentials);
    dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
    toast.success("Logged in successfully!");
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    dispatch(loginFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axiosInstance.get("/rent/user/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    dispatch(logout());
    toast.success("Logged out successfully!");
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch("/rent/user/updateMe", userData);
    dispatch(updateUser(response.data.data.user));
    toast.success("Profile updated successfully!");
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || "Update failed";
    toast.error(message);
    return { success: false, error: message };
  }
};

export const updatePassword = (passwordData) => async (dispatch) => {
  try {
    await axiosInstance.patch("/rent/user/updateMyPassword", passwordData);
    toast.success("Password updated successfully!");
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || "Password update failed";
    toast.error(message);
    return { success: false, error: message };
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/rent/user/me");
    dispatch(loginSuccess({ user: response.data.user, token: localStorage.getItem("token") }));
  } catch (error) {
    dispatch(logout());
  }
};


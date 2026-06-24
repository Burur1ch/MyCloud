import axios from "axios";
import { setUser } from "../reducers/userReducer";

const API_URL = import.meta.env.VITE_API_URL;

export const registration = (email, password) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API_URL}/api/auth/registration`, { email, password });
      // auto-login right after successful registration
      const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(loginRes.data.user));
      localStorage.setItem("token", loginRes.data.token);
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      localStorage.removeItem("token");
    }
  };
};

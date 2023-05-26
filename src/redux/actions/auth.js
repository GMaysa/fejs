import axios from "axios";
import { setIsloggedin, setToken, setUser } from "../reducers/auth";
import { toast } from "react-toastify";

export const login = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://km4-challenge-5-api.up.railway.app/api/v1/auth/login
        `,
      data,
      { "Content-Type": "application/json" }
    );

    const { token } = response?.data.data;
    dispatch(setToken(token));
    dispatch(setIsloggedin(true));
    navigate("/");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err?.response?.data?.message);
      return;
    }
    toast.error(err?.message);
  }
};

export const getProfile = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    const response = await axios.get(
      `https://km4-challenge-5-api.up.railway.app/api/v1/auth/me`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { data } = response?.data;
    console.log(data)
    dispatch(setUser(data));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err?.response?.data?.message);
      return;
    }
    toast.error(err?.message);
  }
};

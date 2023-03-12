import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";

const { toast } = createStandaloneToast();

const initialState = {
  loading: false, // ** Pending
  data: null, // ** Success => fulfilled
  error: null, // ** Error => rejected
};

export const userLogin = createAsyncThunk("login/userLogin", async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const { data } = await axiosInstance.post(`/api/auth/local`, user);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const loginSlice = createSlice({
  initialState,
  name: "login",
  extraReducers: {
    [userLogin.pending]: state => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      const date = new Date();
      const IN_DAYS = 5;
      const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
      date.setTime(date.getTime() + EXPIRES_IN_DAYS);
      const options = { path: "/", expires: date };
      CookieService.set("jwt", action.payload.jwt, options);
      toast({
        title: "Logged in successfully",
        status: "success",
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/";
      }, 2000);
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
      toast({
        title: action.payload.response.data.error.message,
        description: "Make sure you have the correct Email or Password",
        status: "error",
        isClosable: true,
      });
    },
  },
});

export const selectLogin = ({ login }) => login;
export default loginSlice.reducer;

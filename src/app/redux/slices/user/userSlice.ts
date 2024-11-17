import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Define the types for user data
interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Define the shape of the slice state
interface UserState {
  user: Record<string, any>;
  token: string;
  loading: boolean;
  error: string;
  userId?: string;
}

// Define types for the responses
interface UserRegisterResponse {
  id: string;
}

interface UserLoginResponse {
  token: string;
}

// Initial state with defined types
const initialState: UserState = {
  user: {},
  token: "",
  loading: false,
  error: "",
};

export interface LoginResponse {
  data: {
    user: any; // Replace 'any' with the actual type if known
    token: string;
  };
}

// Async thunk for user registration
export const userRegister = createAsyncThunk<
  UserRegisterResponse,
  { data: UserData }
>("user/register", async ({ data }) => {
  try {
    console.log("data", data);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_LIVE_URL}/api/user/signup`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    );

    if (res.data?.success === true) {
      toast.success("User Registered Successfully");
      // generatePDF(data); // Assuming this function exists
      return { id: res.data.message.id };
    } else {
      if (res.data.message) {
        toast.error(res.data.message);
        return { id: "" };
      } else {
        toast.error("Something went wrong");
        return { id: "" };
      }
    }
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
});

// Async thunk for user login
export const userLogin = createAsyncThunk<LoginResponse, LoginData>(
  "user/login",
  async (data) => {
    try {
      console.log("dataa", data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_LIVE_URL}/api/user/login`,
        {
          email: data?.email,
          password: data?.password,
        },
      );
      console.log("response create aynctunk", res);
      // Cookies.set("JWT", res?.data?.token);
      return res?.data;
      // if (res.data?.success === true) {
      //   toast.success(res.data?.message);
      //   return { token: res?.data?.token };
      // } else {
      //   toast.error(res?.data?.message);
      //   return { token: "" };
      // }
    } catch (err) {
      toast.error("Something went wrong");
      console.log("error", err);
      throw err;
    }
  },
);

// Slice definition with types
export const userInfo = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
    },
    userIdSet: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    test: (state, action: PayloadAction<string>) => {
      console.log("testinggggg");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        console.log("payload", payload);

        state.loading = false;
        if (payload && payload.id) {
          state.userId = payload.id;
        }
        state.error = "";
      })
      .addCase(userRegister.rejected, (state) => {
        state.loading = false;
        state.error = "Registration failed";
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        console.log("payload in extra reducer", payload);
        state.loading = false;
        state.user = payload.data.user;
        state.token = payload.data.token;
        state.error = "";
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
      });
  },
});

export const { logout, userIdSet, test } = userInfo.actions;
export default userInfo.reducer;

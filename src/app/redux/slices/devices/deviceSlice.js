import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDevice = createAsyncThunk("get/city", async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_SECOND}/getDevices?id=${userId}`
    );
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
});

export const getTimeZone = createAsyncThunk("get/city", async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_SECOND}/timezones?id=${userId}`
    );
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
});

export const deviceData = createSlice({
  name: "device",
  initialState: {
    loading: false,
    deviceResponse: [],
    timeZoneResponse: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDevice.pending, (state, { payload }) => {
      state.loading = true;
      state.deviceResponse = [];
    }),
      builder.addCase(getDevice.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.deviceResponse = payload;
      }),
      builder.addCase(getDevice.rejected, (state, { payload }) => {
        state.loading = false;
        state.deviceResponse = [];
      }),
      builder.addCase(getTimeZone.pending, (state, { payload }) => {
        state.loading = true;
        state.timeZoneResponse = [];
      }),
      builder.addCase(getTimeZone.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.timeZoneResponse = payload;
      }),
      builder.addCase(getTimeZone.rejected, (state, { payload }) => {
        state.loading = false;
        state.timeZoneResponse = [];
      });
  },
});

export default deviceData.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// http://tagard.in:8001/run_script?id=228&devices=BC5729009FE9:MAC002+INCUBATOR&startTime=8%2F3%2F2024,+6:52:00+pm&endTime=14%2F3%2F2024,+6:52:00+pm&interval=60&aggregation=max&temp=pdfTemp&tz=UTC%2B04:00

export const getPdf = createAsyncThunk("get/pdf", async (data) => {
    const {userId, selectDevice,   startDates,
        endDates,selectInterval,selectAggregation,temp, selectTimeZone} = data
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_SECOND}/run_script?id=${userId}&devices=${selectDevice}&startTime=${startDates}&endTime=${endDates}&interval=${selectInterval}&aggregation=${selectAggregation}&temp=${temp}&tz=${selectTimeZone}`
    );
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
});



export const pdfData = createSlice({
  name: "device",
  initialState: {
    loading: false,
    pdfResponse: [],
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPdf.pending, (state, { payload }) => {
      state.loading = true;
      state.pdfResponse = [];
    }),
      builder.addCase(getPdf.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.pdfResponse = payload;
      }),
      builder.addCase(getPdf.rejected, (state, { payload }) => {
        state.loading = false;
        state.pdfResponse = [];
      })
      
  }
});

export default pdfData.reducer;

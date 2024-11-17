import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCity = createAsyncThunk("get/city", async (setCity) => {
  try {
    const { data } = await axios.get(`/api/context/city`);
    const cityresponse = data?.message?.cities?.map((city) => {
      return {
        value: city?.id,
        label: city?.name,
      };
    });
    setCity(cityresponse);

    return data?.message?.cities;
  } catch (error) {
    return error;
  }
});

export const getState = createAsyncThunk("get/state", async (setState) => {
  try {
    const { data } = await axios.get(`/api/context/state`);
    const stateresponse = data?.message?.states?.map((state) => {
      return {
        value: state?.id,
        label: state?.name,
      };
    });
    setState(stateresponse);
    return data?.message?.states;
  } catch (error) {
    return error;
  }
});
export const getCountries = createAsyncThunk(
  "get/country",
  async (setCountry) => {
    try {
      const { data } = await axios.get(`/api/context/countries`);
      const countryResponse = data?.message?.countries?.map((country) => {
        return {
          value: country?.id,
          label: country?.name,
        };
      });
      setCountry(countryResponse);
      return data?.message?.countries;
    } catch (error) {
      return error;
    }
  }
);

export const countriesData = createSlice({
  name: "country",
  initialState: {
    loading: false,
    stateResponse: [],
    countryResponse: [],
    cityResponse: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCity.pending, (state, { payload }) => {
      state.loading = true;
      state.cityResponse = [];
    }),
      builder.addCase(getCity.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cityResponse = payload;
      }),
      builder.addCase(getCity.rejected, (state, { payload }) => {
        state.loading = false;
        state.cityResponse = [];
      }),
      builder.addCase(getState.pending, (state, { payload }) => {
        state.loading = true;
        state.stateResponse = [];
      }),
      builder.addCase(getState.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.stateResponse = payload;
      }),
      builder.addCase(getState.rejected, (state, { payload }) => {
        state.loading = false;
        state.stateResponse = [];
      });
    builder.addCase(getCountries.pending, (state, { payload }) => {
      state.loading = true;
      state.countryResponse = [];
    }),
      builder.addCase(getCountries.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.countryResponse = payload;
      }),
      builder.addCase(getCountries.rejected, (state, { payload }) => {
        state.loading = false;
        state.countryResponse = [];
      });
  },
});

export default countriesData.reducer;

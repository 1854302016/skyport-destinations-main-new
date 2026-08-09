import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // signupData: null,
  traceId: sessionStorage.getItem("traceId")
    ? sessionStorage.getItem("traceId")
    : null,
  loading: false,
  search: [],
  errors: null,
};

const flightSlice = createSlice({
  name: "flight",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setTraceId(state, value) {
      state.traceId = value.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    resetFlightSearch: (state) => {
      state.search = [];
      state.traceId = null;
      state.errors = null;
    },
  },
});

export const {
  setLoading,
  setSearch,
  setTraceId,
  setErrors,
  resetFlightSearch,
  setLastSearchParams,
} = flightSlice.actions;
export default flightSlice.reducer;

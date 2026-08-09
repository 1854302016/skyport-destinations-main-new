import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hotelSearch: [],     // all hotels (page 1 + next pages)
  total: 0,            // total hotels count
  page: 1,             // current page
  per_page: 50,        // results per page
  errors: null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {

    setLoading(state, action) {
      state.loading = action.payload;
    },

    // Set first page results
    setHotelSearch(state, action) {
      state.hotelSearch = action.payload.hotels || [];
      state.total = action.payload.total || 0;
      state.page = action.payload.page || 1;
      state.per_page = action.payload.per_page || 10;
    },

    // Append next-page results
    appendHotelSearch(state, action) {
      state.hotelSearch = [...state.hotelSearch, ...action.payload.hotels];
      state.page = action.payload.page;  // increase page number
    },

    setErrors(state, action) {
      state.errors = action.payload;
    },

    resetHotelSearch(state) {
      state.hotelSearch = [];
      state.total = 0;
      state.page = 1;
    },
  },
});

export const {
  setLoading,
  setHotelSearch,
  appendHotelSearch,
  setErrors,
  resetHotelSearch
} = hotelSlice.actions;

export default hotelSlice.reducer;

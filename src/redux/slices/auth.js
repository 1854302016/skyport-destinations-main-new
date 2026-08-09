import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletData: localStorage.getItem("walletData")
    ? ({
        Id: 91,
        Username: "AGN091",
        "Company Name": "Trip Navigate",
        "First Name": "Guruansh Singh",
        Email: "guruansh@holidaychacha.com",
        Phone: "9739504090",
        Wallet: "7200000",
        "Credit Limit": "0",
      })
    : ({
        Id: 91,
        Username: "AGN091",
        "Company Name": "Trip Navigate",
        "First Name": "Guruansh Singh",
        Email: "guruansh@holidaychacha.com",
        Phone: "9739504090",
        Wallet: "7200000",
        "Credit Limit": "0",
      }),
  loading: false,
  token: sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : null,
  sessionId: sessionStorage.getItem("sessionId")
    ? sessionStorage.getItem("sessionId")
    : null,
  errors: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setSessionId(state, value) {
      state.sessionId = value.payload;
    },
    setWalletData(state, value) {
      state.walletData = value.payload;
    },
    setErrors(state, value) {
      state.errors = value.payload;
    },
  },
});
export const { setLoading, setToken, setSessionId, setWalletData, setErrors } =
  authSlice.actions;
export default authSlice.reducer;

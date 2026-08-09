import { apiConnector } from "../apiconnector";
import {
  setToken,
  setSessionId,
  setLoading,
  setWalletData,
} from "../../slices/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://admin.skyportdestinations.com/api/multiauthenticate";
const URL1 = "https://admin.skyportdestinations.com/api/wallet-balance";

export function login(id, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", URL, { id, password });
      navigate("/dashboard");

      console.log("LOGIN API RESPONSE............", response);

      // if (!response.data.success) {
      //   throw new Error(response.data.message);
      // }

      dispatch(
        setToken(response.data.tbo && response.data.tbo.Response.TokenId)
      );
      dispatch(setSessionId(response.data.partocrs.Response.SessionId));

      response.data.tbo &&
        localStorage.setItem("token", response.data.tbo.Response.TokenId);
      localStorage.setItem(
        "sessionId",
        response.data.partocrs.Response.SessionId
      );
      toast.success("Logged in Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } catch (error) {
      navigate("/");
      console.log("LOGIN API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}

export function Wallentbalance(Id, Pw) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", URL1, { Id, Pw });

      console.log("WALLET API RESPONSE............", response.data.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setWalletData(response.data.data));

      localStorage.setItem("walletData", JSON.stringify(response.data.data));

      // navigate("/dashboard");
    } catch (error) {
      console.log("WALLET API ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}

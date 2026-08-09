import axios from "axios";
import {
  setHotelSearch,
  setLoading,
  setErrors,
  resetHotelSearch,
  appendHotelSearch,
} from "../../slices/hotelSlice";

import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";

const URL = `${BASE_URL}Hotel/Search`;

export function hotelSearch(searchData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(resetHotelSearch());

    try {
      let allHotels = [];
      let page = 1;
      let batchKey = null;
      let per_page = 200;
      let total = 0;

      while (true) {
        const payload = { ...searchData, page, per_page, batchKey };

        const response = await axios.post(URL, payload, {
          headers: { "Content-Type": "application/json" },
          timeout: 0,
        });

        if (!response || response.data.success === false) {
          toast.error(response?.data?.message || "Something went wrong!");
          navigate("/");
          break;
        }

        const data = response.data.data;
        batchKey = data.batchKey;
        total = data.total || 0;
        per_page = data.per_page || per_page;

        allHotels = [...allHotels, ...data.hotels];

        // First page: replace hotels & hide loader
        if (page === 1) {
          dispatch(
            setHotelSearch({
              hotels: allHotels,
              total,
              page: data.page,
              per_page,
            })
          );
          dispatch(setLoading(false)); // hide loader after first batch
        } else {
          // Subsequent pages: append hotels without showing loader
          dispatch(
            appendHotelSearch({
              hotels: data.hotels,
              page: data.page,
            })
          );
        }

         if (allHotels.length >= total) break;
         
         
          if (page >= Math.ceil(total / per_page)) break;

       page++;
      }

      // Save final batchKey
      if (batchKey) localStorage.setItem("batchKey", batchKey);

    } catch (error) {
      console.error("HotelSearch API ERROR", error);
      toast.error(error.message || "Something went wrong!");
      dispatch(setErrors(error.message));
      dispatch(setLoading(false));
      navigate("/hotel");
    }
  };
}

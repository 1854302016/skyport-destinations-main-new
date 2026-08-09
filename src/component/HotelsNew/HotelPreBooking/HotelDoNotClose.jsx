import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./HotelDoNotClose.css";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config";

const HotelDoNotClose = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [params] = useSearchParams();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", blockBack);
    return () => window.removeEventListener("popstate", blockBack);
  }, []);

  // ⚠️ WARN ON TAB CLOSE / REFRESH
  useEffect(() => {
    const warnUser = (e) => {
      e.preventDefault();
      e.returnValue =
        "Booking in progress. Closing this page may result in payment issues.";
    };
    window.addEventListener("beforeunload", warnUser);
    return () => window.removeEventListener("beforeunload", warnUser);
  }, []);

  useEffect(() => {
  let isMounted = true;

  const pollBooking = async () => {
    try {
        const order_id = params.get("order_id");
        const status = params.get("status");
        const transaction_id = params.get("transaction_id");
        const total = params.get("total");
        const hash = params.get("hash");
        const data = params.get("data");
		const res = await axios.post(`${BASE_URL}Hotel/PreFinishBooking`, {
		  bookingId: bookingId,
		  status: status,
		  hash: hash,
		  data: data,
		  transaction_id: transaction_id,
		  total: total,
		});
		const bookingResponse = res.data;
		 if (!bookingResponse.success) {
			throw new Error(bookingResponse.message);
		  }
     
		
	
   // const UniqueID = res.data.data.UniqueID;

			//  if (!isMounted) return;
		 /*  sessionStorage.setItem(
				"uniqueIdentifier",
				bookingResponse.data.Data.UniqueID
				 ); */
                 
                 localStorage.setItem(
                "BookingID",
                res.data.data.BookingId
              );
			//  const srdvIdx = 'EwebM';
              navigate(`/HotelFinishBooking?bookingId=${res.data.data.BookingId}`);
				//navigate(`/flight-ticket/${encodeURIComponent(srdvIdx)}`);
				return;
      
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        html: `
        <ol style="text-align: left; padding-left: 1.2rem; list-style: disc; font-size: 14px;">
          <li>We're sorry, your booking could not be completed.</li>
          <li>If any amount was deducted, it will be refunded within <strong>5–7 business days</strong>.</li>
          <li>Contact support at <strong><a href="tel:+91 92112 52356">+91 92112 52356</a></strong></li>
        </ol>
        ${err}
      `,
      });
      navigate("/");
    }
  };

  // First call immediately
  pollBooking();

  // Poll every 4 seconds
  //const interval = setInterval(pollBooking, 4000);

  return () => {
    //isMounted = false;
    //clearInterval(interval);
  };
}, [bookingId, navigate]);

  return (
    <div className="do-not-close-container">
      <div className="card">
        <h1> Booking Your Hotel</h1>
        <p className="subtitle">
          Please do <strong>NOT</strong> close or refresh this page
        </p>

       
        <div className="loader"></div>

        <div className="warning-box">
          ⚠️ Closing this page may cause <strong>payment loss</strong> or
          <strong> incomplete booking</strong>.
        </div>
      </div>
    </div>
  );
};

const ProgressStep = ({ active, text }) => (
  <div className={`step ${active ? "active" : ""}`}>
    <span className="dot" />
    <span>{text}</span>
  </div>
);

export default HotelDoNotClose;

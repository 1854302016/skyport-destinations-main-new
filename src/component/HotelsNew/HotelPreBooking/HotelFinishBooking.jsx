import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HotelFinalBooking.css";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import HotelReviewPageMobile from "./HotelReviewPageMobile";
import { BASE_URL } from "../../../config";

const HotelFinishBooking = () => {
const navigate = useNavigate();
  const location = useLocation();

  // Get bookingId from query string
  const query = new URLSearchParams(location.search);
  const bookingId = query.get("bookingId");

useEffect(() => {
    // Ask before closing tab
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Disable back button
    window.history.pushState(null, "", window.location.href);
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    
    window.addEventListener("popstate", preventBack);

    // Run booking request
    const submitBooking = async () => {
      try {
       const response = await axios.post(`${BASE_URL}Hotel/FinishBooking`, {
          booking_id: bookingId,
        });

        // Remove protections after success
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", preventBack);

       if (response.data.success) {
          navigate(`/hotelvoucher?bookingId=${response.data.booking_id}`);
        } else {
         navigate(`/hotelerror?msg=${encodeURIComponent(response.data.message)}`);
        }
      } catch (err) {
           window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", preventBack);
         navigate(`/hotelerror?msg=Server error, please try again`);
      }
    };

    submitBooking();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", preventBack);
    };
  }, []);
  
  return (
    <div className="hotelLoaderContainer">
      <div className="hotelLoaderAnimation">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ '--i': i + 1 }} />
        ))}
        <div className="hotelLoaderIcon"></div>
      </div>
      <div className="hotelLoaderText">
        Please do not close browser while Processing.
      </div>
    </div>
  );
};

export default HotelFinishBooking;

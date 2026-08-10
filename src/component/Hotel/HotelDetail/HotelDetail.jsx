import React, { useState, useEffect, useRef } from "react";
import "./HotelDetail.css";
import HotelListing from "./HotelListing";
import ScrollNavWrapper from "./ScrollNavWrapper";
import { Col, Container, Row } from "react-bootstrap";
import HotelSidebar from "./HotelSidebar";
import HotelDescription from "./HotelDescription";
import { useParams } from "react-router-dom";
import axios from "axios";

const HotelDetail = () => {
  const containerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      setIsSticky(containerTop <= 190); // Adjusted threshold for sticky state
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { id } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.post(
          "https://admin.trustedfare.com/api/hotelTJ/detail_search",
          {
            id: id,
          }
        );
        console.log("response hotel detail", response.data);
        setHotelDetails(response.data.data);
      } catch (error) {
        console.error("There was an error fetching the hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  console.log("hotel Detail", hotelDetails);

  return (
    <>
      <div id="wrapper" className="hoteldetail">
        {hotelDetails && (
          <div className="content">
            <HotelListing hotelDetails={hotelDetails.hotel} />
            <section
              className="grey-blue-bg small-padding scroll-nav-container containerformp"
              id="sec2"
            >
              <ScrollNavWrapper
                isSticky={isSticky}
                hotelDetails={hotelDetails.hotel}
              />
              <Container ref={containerRef}>
                <Row>
                  <Col md={12} lg={8}>
                    <HotelDescription
                      isSticky={isSticky}
                      hotelDetails={hotelDetails.hotel}
                      id={hotelDetails.id}
                    />
                  </Col>
                  <Col md={12} lg={4}>
                    <HotelSidebar hotelDetails={hotelDetails} />
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        )}
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </>
  );
};

export default HotelDetail;

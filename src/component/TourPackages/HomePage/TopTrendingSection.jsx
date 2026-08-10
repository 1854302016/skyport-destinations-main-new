import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import TrendingSkeleton from "./TrendingSkeleton";

const TopTrendingSection = () => {
  const swiperRef = useRef(null);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          "https://admin.trustedfare.com/api/HolidayPackages/destinations"
        );

        if (
          response.data &&
          response.data.success === true &&
          Array.isArray(response.data.data)
        ) {
          setDestinations(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching trending packages:", error);
      }
    };
    fetchTrending();
  }, []);

  return (
    <>
      {destinations && destinations.length > 0 ? (
        <div>
          <Container>
            <h2 className="custom_heading ft-700 mt-20">
              <span className="text-b text-center">Top </span>Trending
              Destinations
            </h2>
            <div className="text trending-tour-textbb text-center">
              Explore the hottest travel spots around the globe and experience
              the best of holidays.
            </div>

            <Row className="jckpt_box_prnt" style={{ position: "relative" }}>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                breakpoints={{
                  "@0.00": { slidesPerView: 2, spaceBetween: 10 },
                  "@0.75": { slidesPerView: 3, spaceBetween: 20 },
                  "@1.00": { slidesPerView: 4, spaceBetween: 40 },
                  "@1.50": { slidesPerView: 5, spaceBetween: 20 },
                }}
                // modules={[Autoplay, Navigation]}
                // autoplay
                loop
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                className="mySwiper"
                style={{ paddingBottom: "40px" }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {destinations.map((destination, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      className="jckpt_box text-center"
                      to={`/tour/${destination.slug}`}
                    >
                      <div className="img_box hoverEff">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          loading="lazy"
                        />
                      </div>
                      <span className="f-20 mt-15 ft-600">
                        {destination.name}
                      </span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                className="custom-next"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FaChevronRight />
              </div>
              <div
                className="custom-prev"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FaChevronLeft />
              </div>
            </Row>
          </Container>
        </div>
      ) : (
        <TrendingSkeleton />
      )}
    </>
  );
};

export default TopTrendingSection;

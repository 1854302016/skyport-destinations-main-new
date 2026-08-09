import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoPersonCircleOutline } from "react-icons/io5";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./css/PopularTourSection.css";

const PopularTourSection = () => {
  const swiperRef = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataFetch = async () => {
      const datas = await axios.get(
        `https://admin.skyportdestinations.com/api/HolidayPackages/trending_packages`
      );
      if (datas) {
        setData(datas.data.data);
      }
    };
    dataFetch();
  }, []);
  console.log("DATA", data);
  return (
    <div className="tour-category-sections">
      <div className="trip-category-section overflow-hidden pt-120">
        <img
          decoding="async"
          src="./Images/tour/banner-hq.jpg"
          className="trip-bg"
          alt="heading-image"
        />

        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <div className="section-title4 sibling2">
                <span>Featured Tour</span>
                <h2>Most Popular Tours</h2>
                <img
                  decoding="async"
                  src="https://astrip-wp.b-cdn.net/wp-content/themes/astrip/assets/images/icons/section-title-white.svg"
                  className="img-fluid"
                  alt="heading-ribbon-img"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={{ position: "relative" }}>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                // pagination={{
                //   clickable: true,
                // }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                // navigation={true}
                // navigation={{
                //   nextEl: ".custom-next2",
                //   prevEl: ".custom-prev2",
                // }}
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false,
                // }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {data.map((item) => (
                  <SwiperSlide>
                    <Link
                      to={`/tour/${item.destination}/${item.slug}`}
                      className="trip-category-single"
                    >
                      <div className="trip-image">
                        <img
                          loading="lazy"
                          decoding="async"
                          width={425}
                          height={345}
                          src={item.image}
                          className="img-fluid wp-post-image"
                          alt=""
                          style={{ height: "218px" }}
                        />
                        <span className="blog-date">
                          {item.no_of_nights} nights
                        </span>
                      </div>
                      <div className="trip-content">
                        <h4>
                          <Link to={`/tour/${item.destination}/${item.slug}`}>
                            {item.name.length > 25
                              ? item.name.slice(0, 25) + "..."
                              : item.name}
                          </Link>
                        </h4>
                        <div className="trip-text">
                          <div className="inclusionsBox">
                            <span>
                              <img
                                src="https://tripoholidays.in/public/images/hotel-icon.png"
                                alt="Hotel"
                              />
                              Hotel
                            </span>
                            <span>
                              <img
                                src="https://tripoholidays.in/public/images/binoculars-icon.png"
                                alt="SightSeeing"
                              />
                              Sightseeing
                            </span>
                            <span>
                              <img
                                src="https://tripoholidays.in/public/images/sedan-icon.png"
                                alt="Transfers"
                              />
                              Transfers
                            </span>
                            <span>
                              <img
                                src="https://tripoholidays.in/public/images/dinner-icon.png"
                                alt="Meals"
                              />
                              Meals
                            </span>
                          </div>
                        </div>
                        <div className="trip-bottom">
                          <ul className="trip-meta-list">
                            <li style={{ fontWeight: "500" }}>
                              {/* <IoPersonCircleOutline className="bx bx-user-circle" /> */}
                              Starting From:
                            </li>
                            <li style={{ color: "#efbf04", fontWeight: "700" }}>
                              ₹{item.offer_price}
                              {/* <IoIosTimer className="bx bx-time-five" />{item.no_of_nights} Nights  */}
                            </li>
                          </ul>
                          <div className="tourBtn2">
                            <Link
                              to={`/tour/${item.destination}/${item.slug}`}
                              className=""
                            >
                              Explorer Now
                              <FaChevronRight />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className="custom-next2"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FaChevronRight />
              </div>
              <div
                className="custom-prev2"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FaChevronLeft />
              </div>
              {/* <div className="swiper trip-category-slider swiper-initialized swiper-horizontal">
              <div className="swiper-wrapper">
              
                <div className="swiper-slide" role="group" aria-label="1 / 5">
                 
                </div>
               
              </div>
              <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
            </div> */}
            </Col>
          </Row>
          {/* <Row>
          <Col className="d-flex align-items-center justify-content-center mt-60">
            <div className="swiper-pagination sibling-4 d-flex align-items-center justify-content-center mt-60 swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
              <span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabIndex={0} role="button" aria-label="Go to slide 1" />
              <span className="swiper-pagination-bullet" tabIndex={0} role="button" aria-label="Go to slide 2" />
              <span className="swiper-pagination-bullet" tabIndex={0} role="button" aria-label="Go to slide 3" />
              <span className="swiper-pagination-bullet" tabIndex={0} role="button" aria-label="Go to slide 4" />
              <span className="swiper-pagination-bullet" tabIndex={0} role="button" aria-label="Go to slide 5" />
            </div>
          </Col>
        </Row> */}
        </Container>
      </div>
    </div>
  );
};

export default PopularTourSection;

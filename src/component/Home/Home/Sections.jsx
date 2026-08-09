import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Sections.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { MdKeyboardArrowRight } from "react-icons/md";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import axios from "axios";
const Sections = () => {
  const swiperRef = useRef(null);

  const data = [
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-01.jpg",
      name: "Turkey",
      review: "422",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-02.jpg",
      name: "Thailand",
      review: "400",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-03.jpg",
      name: "Australia",
      review: "500",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-04.jpg",
      name: "Brazil",
      review: "422",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-05.jpg",
      name: "Canada",
      review: "370",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-03.jpg",
      name: "Australia",
      review: "500",
    },
  ];

  const [destinations, setIndianDestinations] = useState([]);

  useEffect(() => {
    const fetchIndianDest = async () => {
      try {
        const response = await axios.get(
          "https://admin.skyportdestinations.com/api/HolidayPackages/IndianDestinations"
        );

        if (
          response.data &&
          response.data.success === true &&
          Array.isArray(response.data.data)
        ) {
          setIndianDestinations(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching popular Indian Destinations:", error);
      }
    };
    fetchIndianDest();
  }, []);

  return (
    <section className="section destination-section">
      {destinations && destinations.length > 0 && (
        <div
          className="container"
          style={{ position: "relative", zIndex: "10000" }}
        >
          <div className="row justify-content-center">
            <div
              className="col-xl-6 col-lg-10 text-center wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div className="section-header text-center">
                <h2 className="mb-2 sections_h_fives">
                  Uncover{" "}
                  {/* <span className="text-decoration-underline " style={{color:'#CF3425'}}> */}
                  India's Top
                  {/* </span>{" "} */}
                  Travel Spots{" "}
                </h2>
                <p className="sub-title">
                  SkyPort DestinationsMarketplace is a platform designed to
                  connect fans with exclusive experiences related to a specific
                  tour
                </p>
              </div>
            </div>
          </div>
          <Swiper
            // slidesPerView={1}
            slidesPerView={"auto"}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            // modules={[Autoplay]}
            autoplay
            loop
            className="mySwiper"
            style={{ paddingBottom: "20px" }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {destinations &&
              destinations.map((destination, index) => (
                <SwiperSlide style={{ width: 306, marginRight: 24 }}>
                  <Link
                    className="destination-item mb-4 wow fadeInUp"
                    data-wow-delay="0.2s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "fadeInUp",
                    }}
                    to={`/tour/${destination.slug}`}
                  >
                    <img src={destination.image} alt="img" />
                    <div className="destination-info text-center">
                      <div className="destination-content">
                        <h5 className="mb-1 text-white section_item_package">
                          {destination.name}
                        </h5>
                        {/* <div className="d-flex align-items-center justify-content-center section_direction_package">
          <div className="rating d-flex align-items-center me-2">
          <FaStar color='#FFCA18' className='section_direction_package_icons'/>
          <FaStar color='#FFCA18' className='section_direction_package_icons'/>
          <FaStar color='#FFCA18' className='section_direction_package_icons'/>
          <FaStar color='#FFCA18' className='section_direction_package_icons'/>
          <FaStar color='#FFCA18' className='section_direction_package_icons'/>
          </div>
          <p className="fs-14 text-white">{item.review} Reviews</p>
        </div> */}
                      </div>
                      {/* <div className="destination-overlay bg-white mt-2">
        <div className="d-flex">
          <div className="col border-end">
            <div className="count-info text-center">
              <span className="d-block mb-1 text-indigo">
                <i className="isax isax-airplane" />
              </span>
              <h6 className="fs-13 fw-medium">21 Flights</h6>
            </div>
          </div>
          <div className="col border-end">
            <div className="count-info text-center">
              <span className="d-block mb-1 text-cyan">
                <i className="isax isax-buildings" />
              </span>
              <h6 className="fs-13 fw-medium">15 Hotels</h6>
            </div>
          </div>
          <div className="col">
            <div className="count-info text-center">
              <span className="d-block mb-1 text-success">
                <i className="isax isax-ship" />
              </span>
              <h6 className="fs-13 fw-medium">06 Cruises</h6>
            </div>
          </div>
        </div>
      </div> */}
                    </div>
                    <a className="overlay-circle-link">
                      <i className="isax isax-arrow-right-1" />
                    </a>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            className="custom-next3"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaChevronRight />
          </div>
          <div
            className="custom-prev3"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaChevronLeft />
          </div>
          {/* <div
          className="text-center view-all wow fadeInUp sectionss_mobile_res_all"
          style={{ visibility: "visible", animationName: "fadeInUp" }}
        >
          <a className="btn btn-dark d-inline-flex align-items-center">
            View All Locations
            <MdKeyboardArrowRight
              className="isax isax-arrow-right-3 ms-2"
              size={22}
            />
          </a>
        </div> */}
        </div>
      )}
    </section>
  );
};

export default Sections;

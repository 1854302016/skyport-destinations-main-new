import React, { useRef, useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/HolidayThemesSection.css";

const HolidayThemesSection = () => {
  const swiperRef = useRef(null);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get(
          "https://admin.trustedfare.com/api/HolidayPackages/HolidayThemes"
        );
        if (response.data.success) {
          setThemes(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch holiday themes", error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <>
      {themes.length > 0 && (
        <div className="container-fluid m-0 p-0 mainEcplore">
          <div className="row">
            <div className="col-12 mx-auto d-block">
              <div className="hldy_thm mt-10">
                <div className="containernew">
                  <h2 className="custom_heading ft-700">
                    <span className="text-b">Explore</span> Holidays By Theme
                  </h2>

                  <div className="mt-30">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={10}
                      pagination={{ clickable: true }}
                      breakpoints={{
                        "@0.00": { slidesPerView: 2, spaceBetween: 20 },
                        "@0.75": { slidesPerView: 3, spaceBetween: 20 },
                        "@1.00": { slidesPerView: 4, spaceBetween: 40 },
                        "@1.50": { slidesPerView: 8, spaceBetween: 20 },
                      }}
                      modules={[Navigation, Autoplay]}
                      autoplay
                      loop
                      navigation={{
                        nextEl: ".custom-new-next",
                        prevEl: ".custom-new-prev",
                      }}
                      className="mySwiper"
                      style={{ paddingBottom: "40px" }}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                    >
                      {themes.map((theme, index) => (
                        <SwiperSlide key={index}>
                          <Link
                            to={`/tour/${theme.slug}`}
                            target="_self"
                            className="hldy_thm_box"
                          >
                            <div className="img_box">
                              <img src={theme.image} alt={theme.name} />
                            </div>
                            <div className="cnt mt-10">
                              <div className="f-20 ft-600">{theme.name}</div>
                              <span className="text-b">Explore Now</span>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div
                      className="custom-new-next"
                      onClick={() => swiperRef.current?.slideNext()}
                    >
                      <FaChevronRight />
                    </div>
                    <div
                      className="custom-new-prev"
                      onClick={() => swiperRef.current?.slidePrev()}
                    >
                      <FaChevronLeft />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HolidayThemesSection;

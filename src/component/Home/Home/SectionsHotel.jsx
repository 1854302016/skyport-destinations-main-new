import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Sections.css";
import "swiper/css";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";

const SectionsHotel = () => {
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    {
      label: "All",
      icon: "https://img.icons8.com/?size=100&id=45075&format=png&color=000000",
    },
    {
      label: "City",
      icon: "https://img.icons8.com/?size=100&id=hFxOoQSMxi28&format=png&color=000000",
    },
    {
      label: "Beach",
      icon: "https://img.icons8.com/?size=100&id=31799&format=png&color=000000",
    },
    {
      label: "Outdoor",
      icon: "https://img.icons8.com/?size=100&id=920&format=png&color=000000",
    },
    {
      label: "Relax",
      icon: "https://img.icons8.com/?size=100&id=74521&format=png&color=000000",
    },
    {
      label: "Romance",
      icon: "https://img.icons8.com/?size=100&id=24907&format=png&color=000000",
    },
  ];

  const data = [
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-01.jpg",
      name: "Turkey",
      review: "422",
      category: "Relax",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-01.jpg",
      name: "Turkey",
      review: "422",
      category: "Romance",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-02.jpg",
      name: "Thailand",
      review: "400",
      category: "Beach",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-03.jpg",
      name: "Australia",
      review: "500",
      category: "Outdoor",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-04.jpg",
      name: "Brazil",
      review: "422",
      category: "Food",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-05.jpg",
      name: "Canada",
      review: "370",
      category: "City",
    },
    {
      img: "https://dreamstour.dreamstechnologies.com/html/assets/img/destination/destination-03.jpg",
      name: "Australia",
      review: "500",
      category: "Outdoor",
    },
  ];

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter((item) => item.category === activeTab);

  return (
    <section className="section destination-section_HOTEl_TG">
      <div
        className="container"
        style={{ position: "relative", zIndex: "10000" }}
      >
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-10 text-center">
            <div className="section-header section-header_hotelss text-center">
              <h2 className="mb-2 sections_h_fives">
                Quick and easy trip planner
              </h2>
              <p className="sub-title">
                Pick a vibe and explore the top destinations
              </p>
            </div>
          </div>
        </div>

        <div className="tabs mb-4 text-center d-flex justify-content-center flex-wrap gap-3">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`tab-button d-flex flex-row gap-2 align-items-center px-3 py-2 ${
                activeTab === cat.label ? "active-tab" : ""
              }`}
              onClick={() => setActiveTab(cat.label)}
            >
              <img
                src={cat.icon}
                alt={`${cat.label} icon`}
                style={{ width: "25px", height: "25px" }}
              />
              <span>{cat.label}</span>
            </div>
          ))}
        </div>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 10 },
            576: { slidesPerView: 2.2, spaceBetween: 15 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1200: { slidesPerView: 6, spaceBetween: 24 },
          }}
          autoplay
          loop
          modules={[Autoplay]}
          className="mySwiper"
          style={{ paddingBottom: "20px" }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {filteredData.map((item, index) => (
            <SwiperSlide key={index} style={{ width: 306, marginRight: 24 }}>
              <div className="destination-item mb-4">
                <img src={item.img} alt={item.name} />
                <div className="destination-info text-center">
                  <div className="destination-content">
                    <h5 className="mb-1 text-white section_item_package">
                      {item.name}
                    </h5>
                  </div>
                </div>
                <a className="overlay-circle-link" href="#">
                  <i className="isax isax-arrow-right-1" />
                </a>
              </div>
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
      </div>
    </section>
  );
};

export default SectionsHotel;

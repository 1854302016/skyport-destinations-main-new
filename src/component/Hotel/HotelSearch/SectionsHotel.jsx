import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import './SectionsHotel.css';

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
              {/* <p className="sub-title">
                Pick a vibe and explore the top destinations
              </p> */}
            </div>
          </div>
        </div>

        <div className="modern_tabs_container mb-5">
          {categories.map((cat) => (
            <motion.button
              key={cat.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`modern_tab_btn ${activeTab === cat.label ? "active" : ""}`}
              onClick={() => setActiveTab(cat.label)}
            >
              <div className="tab_icon_circle">
                <img src={cat.icon} alt={cat.label} />
              </div>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1.2 },
                576: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.5 },
                1200: { slidesPerView: 4.5 },
              }}
              autoplay={{ delay: 3500 }}
              loop
              modules={[Autoplay]}
              className="modern_swiper"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {filteredData.map((item, index) => (
                <SwiperSlide key={index}>
                  <motion.div 
                    className="modern_dest_card"
                    whileHover={{ y: -10 }}
                  >
                    <div className="dest_image_box">
                      <img src={item.img} alt={item.name} />
                      <div className="dest_overlay">
                        <div className="dest_meta">
                          <span className="dest_category">{item.category}</span>
                          <h4 className="dest_name">{item.name}</h4>
                          <div className="dest_reviews">
                            <i className="fa-solid fa-star me-1" style={{color: '#f2bc06'}}></i>
                            <span>{item.review} Reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

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

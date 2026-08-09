import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Gallery.css"; // We'll use a dedicated clean CSS for this

const date = new Date();
date.setDate(date.getDate() + 2);

// Format as YYYY-MM-DD
const formattedDate = date.toISOString().split('T')[0];

const Gallery = () => {
  const images = [
    {
      img: "https://images.pexels.com/photos/33669490/pexels-photo-33669490.jpeg",
      title: "Dubai",
      slug: `https://skyportdestinations.com/flightList/dest_DXB*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      img: "https://images.pexels.com/photos/5720170/pexels-photo-5720170.jpeg",
      title: "Japan",
      slug: `https://skyportdestinations.com/flightList/dest_HND*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      img: "https://images.pexels.com/photos/26470917/pexels-photo-26470917.jpeg",
      title: "Paris",
      slug: `https://skyportdestinations.com/flightList/dest_CDG*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      img: "https://images.pexels.com/photos/33619996/pexels-photo-33619996.jpeg",
      title: "New York",
      slug: `https://skyportdestinations.com/flightList/dest_JFK*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      img: "https://images.pexels.com/photos/33622091/pexels-photo-33622091.jpeg",
      title: "Cape Town",
      slug: `https://skyportdestinations.com/flightList/dest_CPT*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
     {
      img: "https://images.pexels.com/photos/36983267/pexels-photo-36983267.jpeg",
      title: "Sydney",
      slug: `https://skyportdestinations.com/flightList/dest_SYD*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      img: "https://images.pexels.com/photos/29986796/pexels-photo-29986796.jpeg",
      title: "Greece",
      slug: `https://skyportdestinations.com/flightList/dest_ATH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      img: "https://images.pexels.com/photos/36370031/pexels-photo-36370031.jpeg",
      title: "Italy",
      slug: `https://skyportdestinations.com/flightList/dest_FCO*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
    },
  ];

  const swiperRef = useRef(null);

  return (
    <div className="sky-gallery-wrap">
      <div className="container">
        <div className="gallery-title-box text-center">
          <h2 className="gallery-main-title">
            Trips <span className="text-highlight">Of A</span> Lifetime
          </h2>
          <div className="title-sep"></div>
        </div>

        <div className="gallery-slider-outer">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="gallery-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="gallery-slide-item">
                <Link to={`${image.slug}`} className="gallery-link">
                  <div className="gallery-img-container">
                    <img src={image.img} alt={image.title} />
                    <div className="gallery-overlay">
                      <h3 className="gallery-dest-name">{image.title}</h3>
                      <span className="gallery-explore-btn">Explore Now</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="gallery-nav-btn prev" onClick={() => swiperRef.current?.slidePrev()}>
            <FaChevronLeft />
          </button>
          <button className="gallery-nav-btn next" onClick={() => swiperRef.current?.slideNext()}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

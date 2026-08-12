import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaPlaneDeparture,
  FaCompass,
  FaStar,
  FaFire,
} from "react-icons/fa6";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Gallery.css";

const date = new Date();
date.setDate(date.getDate() + 2);
const formattedDate = date.toISOString().split("T")[0];

const images = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/33669490/pexels-photo-33669490.jpeg",
    title: "Dubai",
    code: "DXB",
    country: "United Arab Emirates",
    rating: "4.9",
    price: "78,500",
    flightTime: "3h 45m Direct",
    slug: `https://trustedfare.com/flightList/dest_DXB*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/5720170/pexels-photo-5720170.jpeg",
    title: "Tokyo",
    code: "HND",
    country: "Japan",
    rating: "5.0",
    price: "95,400",
    flightTime: "9h 30m Direct",
    slug: `https://trustedfare.com/flightList/dest_HND*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/26470917/pexels-photo-26470917.jpeg",
    title: "Paris",
    code: "CDG",
    country: "France",
    rating: "4.8",
    price: "82,600",
    flightTime: "5h 45m Direct",
    slug: `https://trustedfare.com/flightList/dest_CDG*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/33619996/pexels-photo-33619996.jpeg",
    title: "New York",
    code: "JFK",
    country: "United States",
    rating: "4.9",
    price: "89,900",
    flightTime: "8h 15m Direct",
    slug: `https://trustedfare.com/flightList/dest_JFK*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/33622091/pexels-photo-33622091.jpeg",
    title: "Cape Town",
    code: "CPT",
    country: "South Africa",
    rating: "4.7",
    price: "86,200",
    flightTime: "10h 20m Direct",
    slug: `https://trustedfare.com/flightList/dest_CPT*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/36983267/pexels-photo-36983267.jpeg",
    title: "Sydney",
    code: "SYD",
    country: "Australia",
    rating: "4.9",
    price: "98,000",
    flightTime: "12h 10m Direct",
    slug: `https://trustedfare.com/flightList/dest_SYD*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/29986796/pexels-photo-29986796.jpeg",
    title: "Athens",
    code: "ATH",
    country: "Greece",
    rating: "4.8",
    price: "69,500",
    flightTime: "3h 10m Direct",
    slug: `https://trustedfare.com/flightList/dest_ATH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    id: 8,
    img: "https://images.pexels.com/photos/36370031/pexels-photo-36370031.jpeg",
    title: "Rome",
    code: "FCO",
    country: "Italy",
    rating: "4.9",
    price: "74,800",
    flightTime: "4h 20m Direct",
    slug: `https://trustedfare.com/flightList/dest_FCO*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
  },
];

const Gallery = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="sky-gallery-wrap">
      <div className="container">
        {/* Header Title Box */}
        <div className="gallery-title-box text-center">
          <div className="gallery-top-badge">
            <FaFire className="gallery-fire-icon" />
            <span>WORLD EXPEDITION SELECTION</span>
          </div>
          <h2 className="gallery-main-title">
            Trips <span className="gradient-text">Of A Lifetime</span>
          </h2>
          <p className="gallery-subtitle">
            Handpicked bucket-list experiences around the globe with luxury flight fares
          </p>
        </div>

        {/* 3D Coverflow Stage */}
        <div className="gallery-slider-outer">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 140,
              modifier: 1.8,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="gallery-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
          >
            {images.map((item, idx) => (
              <SwiperSlide key={item.id} className="gallery-slide-item">
                <Link to={`${item.slug}`} className="gallery-link">
                  <div className="gallery-card-3d">
                    {/* Background Image Container */}
                    <div className="gallery-img-container">
                      <img src={item.img} alt={item.title} loading="eager" />
                      <div className="gallery-img-scrim" />
                    </div>

                    {/* HUD Route Badge Top Left */}
                    <div className="gallery-hud-tag">
                      <FaPlaneDeparture className="me-1 text-cyan" />
                      <span>GEO &rarr; {item.code}</span>
                    </div>

                    {/* Rating Badge Top Right */}
                    <div className="gallery-rating-tag">
                      <FaStar className="star-icon" />
                      <span>{item.rating}</span>
                    </div>

                    {/* Bottom Info Overlay Panel */}
                    <div className="gallery-overlay-hud">
                      <div className="gallery-dest-tagline">
                        <FaCompass className="me-1 text-cyan" />
                        <span>{item.country}</span>
                      </div>

                      <div className="gallery-title-price-row">
                        <h3 className="gallery-dest-name">{item.title}</h3>
                        <div className="gallery-price-pill">
                          <span className="price-label">FROM</span>
                          <span className="price-val">${item.price}/-</span>
                        </div>
                      </div>

                      <div className="gallery-action-row">
                        <span className="gallery-explore-btn">
                          <span>Explore Fares</span>
                          <FaArrowRight className="ms-2 btn-arrow" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <button
            className="gallery-nav-btn prev"
            onClick={() => swiperRef.current?.slidePrev()}
            title="Previous Destination"
            aria-label="Previous Destination"
          >
            <FaChevronLeft />
          </button>
          <button
            className="gallery-nav-btn next"
            onClick={() => swiperRef.current?.slideNext()}
            title="Next Destination"
            aria-label="Next Destination"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

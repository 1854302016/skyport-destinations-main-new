import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaHotel,
  FaUtensils,
  FaCar,
  FaBinoculars,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "./css/ModernTourStyle.css";

const MotionLink = motion(Link);

const BestsellingPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `https://admin.trustedfare.com/api/HolidayPackages/trending_packages`,
        );
        if (response.data) {
          setPackages(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const sliderSettings = {
    modules: [Navigation, Autoplay],
    spaceBetween: 24,
    slidesPerView: 3,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".custom-swiper-next",
      prevEl: ".custom-swiper-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  };

  if (loading) {
    return (
      <div className="bestselling-section">
        <Container>
          <div className="section-header">
            <h2>Discover Our Bestselling Packages</h2>
          </div>
          <div className="package-grid-skeleton">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="package-card-skeleton"></div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bestselling-section">
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <h2>Discover Our Bestselling Packages</h2>
            <p className="section-subtitle">
              Handpicked holidays for your perfect getaway
            </p>
          </div>
          <div className="header-actions">
            <div className="slider-nav-buttons">
              <button
                className="slider-nav-btn custom-swiper-prev"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FaChevronLeft />
              </button>
              <button
                className="slider-nav-btn custom-swiper-next"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="packages-slider-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Swiper
            {...sliderSettings}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="packages-swiper"
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/tour/${pkg.destination}/${pkg.slug}`}
                    className="package-card"
                  >
                    <div className="package-card-image">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Tour+Package";
                        }}
                      />
                      <div className="card-badges">
                        {pkg.no_of_nights && (
                          <span className="package-badge night-badge">
                            {pkg.no_of_nights}N /{" "}
                            {parseInt(pkg.no_of_nights) + 1}D
                          </span>
                        )}
                        <span className="package-badge offer-badge">
                          Best Seller
                        </span>
                      </div>
                    </div>

                    <div className="package-card-content">
                      <div className="package-location">
                        <FaMapMarkerAlt />
                        <span>{pkg.destination || "United Arab Emirates"}</span>
                      </div>

                      <h3 className="package-title">{pkg.name}</h3>

                      <div className="package-rating">
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <span className="rating-text">4.8 (120 Reviews)</span>
                      </div>

                      <div className="package-features">
                        <div className="feature-item" title="Hotel">
                          <FaHotel />
                          <span>Hotel</span>
                        </div>
                        <div className="feature-item" title="Meals">
                          <FaUtensils />
                          <span>Meals</span>
                        </div>
                        <div className="feature-item" title="Transfer">
                          <FaCar />
                          <span>Transfer</span>
                        </div>
                        <div className="feature-item" title="Sightseeing">
                          <FaBinoculars />
                          <span>Sightseeing</span>
                        </div>
                      </div>

                      <div className="package-footer">
                        <div className="package-price-info">
                          <span className="start-text">Starting from</span>
                          <div className="price-wrapper">
                            <span className="currency">₹</span>
                            <span className="amount">
                              {pkg.offer_price?.toLocaleString("en-IN") ||
                                pkg.price?.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                        <button className="book-btn">View Details</button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </div>
  );
};

export default BestsellingPackages;

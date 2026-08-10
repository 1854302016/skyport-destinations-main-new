import React, { useEffect, useRef, useState } from "react";
import "./Offer.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const OfferSection = ({ defaultTab = "All" }) => {
  const swiperRef = useRef(null);
  const [offers, setOffers] = useState([]);
 
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          "https://admin.trustedfare.com/api/AllOffers"
        );
        if (res.data.success && res.data.data) {
          setOffers(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchOffers();
  }, []);


  return (
    <div className="GI_OFFERS_B2C_IN_V2 TG_OFFERS_B2C_IN_V2">
      <div className="sc-1bhhs5y-25 ddXIaO">
        <div className="sc-1umf7nv-105 igBafX">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="sc-1umf7nv-106 jwmxBc"
          >
            <div className="sc-1umf7nv-107 bIEKkd">
              <h2 className="sc-jXbUNg dRpmLD">Offers For You</h2>
            </div>
            <div className="sc-1umf7nv-108 dqZfcT">
              <div className="sc-1umf7nv-109 iKvWs">
                <Link className="sc-imWYAI bHoRkw" to="/offers">
                  View All
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div
        className="custom-prev3"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaChevronLeft />
      </div>
      <div
        className="custom-next3"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaChevronRight />
      </div>

      <Swiper
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000 }}
        loop
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="mySwiper"
        style={{ paddingBottom: "20px" }}
      >
        {offers.map((item, index) => (
          <SwiperSlide key={index} style={{ width: 306, marginRight: 24 }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="sc-1bhhs5y-1 hHlOgt"
            >
              <div className="sc-1bhhs5y-2 jWnEia">
                <div className="sc-1bhhs5y-3 ewsLKf">
                  <img
                    alt="offer img"
                    src={item.image}
                    loading="eager"
                    className="sc-1bhhs5y-4 fxtiol"
                  />
                </div>
                <div className="sc-1bhhs5y-5 cPvMEt">
                  <p className="sc-1bhhs5y-6 eQulyt">{item.offer_type}</p>
                  <p className="sc-1bhhs5y-8 hSlkMg">{item.name}</p>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferSection;

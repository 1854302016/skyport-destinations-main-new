import React, { useRef, useState } from 'react';


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const OfferSectionHotel = () => {
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState('All');

  const data = [
    {
      img: "https://gos3.ibcdn.com/img-1744910506.jpg",
      name: "Ready for some DealPanti?",
      cat: "Bus, Hotels, Cabs, Flights",
    },
    {
      img: "https://gos3.ibcdn.com/akasa3-1741776722.jpg",
      name: "New: Akasa Air Flights from select destinations.",
      cat: "Flights",
    },
    {
      img: "https://promos.makemytrip.com/appfest/2x//heck-in-116x116-07052025@2x.jpg?im=Resize=(134,134)",
      name: "50% off on holiday packages!",
      cat: "Holidays",
    },
    {
      img: "https://gos3.ibcdn.com/hsbc-bank-1741849094.jpg",
      name: "Flat ₹200 off on cabs.",
      cat: "Cabs",
    },
    {
      img: "https://gos3.ibcdn.com/bus-offer.jpg",
      name: "Bus rides starting at ₹99!",
      cat: "Bus",
    },
    {
      img: "https://gos3.ibcdn.com/hotel-deal.jpg",
      name: "Up to 70% off on hotels!",
      cat: "Hotels",
    },
  ];

  const categories = ['All', 'Flights', 'Hotels', 'Holidays', 'Cabs', 'Bus'];

  // Filtered data based on selected tab
  const filteredData = activeTab === 'All'
    ? data
    : data.filter((item) => item.cat.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="GI_OFFERS_B2C_IN_V2 TG_OFFERS_B2C_IN_V2 hotelsearchmobile">
      <div className="sc-1bhhs5y-25 ddXIaO">
        <div className="sc-1umf7nv-105 igBafX">
          <div className="sc-1umf7nv-106 jwmxBc">
            <div className="sc-1umf7nv-107 bIEKkd">
              <h2 className="sc-jXbUNg dRpmLD">Offers For You</h2>
            </div>
            <div className="sc-1umf7nv-108 dqZfcT">
              <div className="sc-1umf7nv-109 iKvWs">
                <Link className="sc-imWYAI bHoRkw" to='/offers'>View All</Link>
              </div>
            </div>
          </div>

          {/* <ul className="sc-1umf7nv-111 kFlkOL">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`sc-1umf7nv-112 eqzCTD ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="custom-prev3" onClick={() => swiperRef.current?.slidePrev()}>
        <FaChevronLeft />
      </div>
      <div className="custom-next3" onClick={() => swiperRef.current?.slideNext()}>
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
        {filteredData.map((item, index) => (
          <SwiperSlide key={index} style={{ width: 306, marginRight: 24 }}>
            <div className="sc-1bhhs5y-1 hHlOgt">
              <div className="sc-1bhhs5y-2 jWnEia">
                <div className="sc-1bhhs5y-3 ewsLKf">
                  <img
                    alt="offer img"
                    src={item.img}
                    loading="eager"
                    className="sc-1bhhs5y-4 fxtiol"
                  />
                </div>
                <div className="sc-1bhhs5y-5 cPvMEt">
                  <p className="sc-1bhhs5y-6 eQulyt">{item.cat}</p>
                  <p className="sc-1bhhs5y-8 hSlkMg">{item.name}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferSectionHotel;

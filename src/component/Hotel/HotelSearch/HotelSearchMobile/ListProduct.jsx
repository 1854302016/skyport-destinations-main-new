import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "./ListProduct.css";

const productItems = [
  { key: "flight", label: "Flight", icon: "/Images/Icons/flightss.png", link: "/" },
  { key: "hotel", label: "Hotel", icon: "/Images/Icons/hotelss.png", link: "/hotel" },
  { key: "tour", label: "Tours", icon: "/Images/Icons/holidayss.png", link: "/tour" },
  // { key: "cabs", label: "Cabs", icon: "/Images/Icons/cabss.png", link: "/cabs" },
  // { key: "buses", label: "Buses", icon: "/Images/Icons/busess.png", link: "/buses" },
  // { key: "visa", label: "Visa", icon: "/Images/Icons/visass.png", link: "/visa" },
  // { key: "insurance", label: "Insurance", icon: "/Images/Icons/insurancess.png", link: "/insurance" },
  // { key: "forex", label: "Forex", icon: "/Images/Icons/forexss.png", link: "/forex" },
];

const ListProduct = ({ active }) => {
  const swiperRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const checkNavButtons = () => {
    if (swiperRef.current) {
      setShowPrev(!swiperRef.current.isBeginning);
      setShowNext(!swiperRef.current.isEnd);
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      checkNavButtons();
      swiper.on("slideChange", checkNavButtons);
      swiper.on("resize", checkNavButtons);
    }
    return () => {
      if (swiper) {
        swiper.off("slideChange", checkNavButtons);
        swiper.off("resize", checkNavButtons);
      }
    };
  }, []);

  const handleSlideNext = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      const newIndex = Math.min(swiper.activeIndex + 3, swiper.slides.length - 1);
      swiper.slideTo(newIndex, 300); // Smooth transition for buttons
    }
  };

  const handleSlidePrev = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      const newIndex = Math.max(swiper.activeIndex - 3, 0);
      swiper.slideTo(newIndex, 300);
    }
  };

  return (
    <div className="hotelsearchmobile">
      <section
        className="list-product-wrapper"
        id="mainhotelhedermob"
        style={{ position: "relative" }}
      >
        <Swiper
          speed={400} 
          slidesPerView={3}
          spaceBetween={0}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            checkNavButtons();
          }}
          breakpoints={{
            320: { slidesPerView: 3 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
          }}
          className="product-swiper"
        >
          {productItems.map((item) => (
            <SwiperSlide key={item.key}>
              <div className={`product-card ${active === item.key ? "active-product" : ""}`}>
                <Link to={item.link}>
                  <div className="icon-container">
                    <img src={item.icon} alt={item.label} className="svg-icon" />
                  </div>
                  <span className="product-label">{item.label}</span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="nav-controls">
          {showPrev && (
            <button className="nav-btn prev" onClick={handleSlidePrev}>
              <FaChevronLeft />
            </button>
          )}
          {showNext && (
            <button className="nav-btn next" onClick={handleSlideNext}>
              <FaChevronRight />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default ListProduct;

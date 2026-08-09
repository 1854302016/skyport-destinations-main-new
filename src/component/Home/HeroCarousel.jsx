import React from "react";
// import { Carousel } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
// import './HeroCarousel.css'; // Custom CSS for styling if needed

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      //   navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <img
          className="d-block w-100 rounded"
          src="https://www.vimaansafar.com/img/VIMS-Independence-Day.jpg?vt"
          alt="First slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="d-block w-100 rounded"
          src="https://www.vimaansafar.com/img/VIM-Rakshabandhan.jpg?"
          alt="Second slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="d-block w-100 rounded"
          src="https://www.vimaansafar.com/img/VIM-UPI.jpg"
          alt="Third slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="d-block w-100 rounded"
          src="https://www.vimaansafar.com/img/International-Flight.jpg"
          alt="Fourth slide"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;

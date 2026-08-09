import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.min.css';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./FeaturedCategories.css";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    imgSrc:
      "https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg",
    icon: "fa-plane-circle-check",
    title: "Flight",
    url: "flight",
  },
  {
    id: 2,
    imgSrc:
      "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: "fa-hotel",
    title: "Hotels",
    url: "hotels",
  },
  {
    id: 3,
    imgSrc:
      "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: "fa-umbrella-beach",
    title: "Tours",
    url: "tours",
  },
  {
    id: 4,
    imgSrc:
      "https://images.pexels.com/photos/3608967/pexels-photo-3608967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: "fa-bus",
    title: "Buses",
    url: "buses",
  },
  {
    id: 5,
    imgSrc:
      "https://images.pexels.com/photos/5648417/pexels-photo-5648417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: "fa-car",
    title: "Cabs",
    url: "cabs",
  },
  {
    id: 6,
    imgSrc:
      "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: "fa-building-columns",
    title: "Bank Offers",
    url: "bank-offers",
  },
];

const FeaturedCategories = () => {
  const swiperRef = useRef(null);

  return (
    <section className="featured">
      <Container style={{ position: "relative" }}>
        <div className="tittle">
          <h3>featured categories</h3>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          autoplay
          loop
          // navigation={true}
          className="mySwiper"
          style={{ paddingBottom: "40px" }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link to={category.url} className="cate-in">
                <div className="cate">
                  <img
                    src={category.imgSrc}
                    alt={category.title}
                    style={{
                      width: "264px",
                      height: "264px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <div className="cate-over">
                    <i className={`fa ${category.icon}`}></i>
                    <div className="after-over animated flipInY">
                      <p>25 coupon inside</p>
                      <a href="#.">BOOK NOW</a>
                    </div>
                  </div>
                  <div className="cate-tittle">{category.title}</div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="custom-next4"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaChevronRight />
        </div>
        <div
          className="custom-prev4"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaChevronLeft />
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCategories;

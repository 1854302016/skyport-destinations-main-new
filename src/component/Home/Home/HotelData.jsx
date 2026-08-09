import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const HotelData = () => {
const data = [
  {
    img: "https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)",
    name: "Stays in & Around Delhi for a Weekend Getaway",
  },
  {
    img: "https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)",
    name: "Stays in & Around Mumbai for a Weekend Getaway",
  },
  {
    img: "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_beach44_p_540_417.jpg?im=Resize=(400,462)",
    name: "Beach Destinations",
  },
  {
    img: "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg?im=Resize=(400,462)",
    name: "Weekend Getaways",
  },
  {
    img: "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_hill_stations11_p_540_417.jpg?im=Resize=(400,462)",
    name: "Hill Stations",
  },
  {
    img: "https://hblimg.mmtcdn.com/content/hubble/img/Australia/mmt/destination/m_Australia_destination_6_l_361_641.jpg?im=Resize=(400,462)",
    name: "Adventure Destinations",
  },
  {
    img: "https://hblimg.mmtcdn.com//content/hubble/img/amritsar/mmt/destination/m_Amritsar_activity_heritage_l_684_1026.jpg?im=Resize=(400,462)",
    name: "Heritage Destinations",
  },
  {
    img: "https://hblimg.mmtcdn.com/content/hubble/img/collections/m_pilgrimage44_p_540_417.jpg?im=Resize=(400,462)",
    name: "Pilgrimage Destinations",
  },
  {
    img: "https://hblimg.mmtcdn.com//content/hubble/img/alleppey/mmt/destination/m_destination-alleppey-landscape_l_400_640.jpg?im=Resize=(400,462)",
    name: "Relaxation Destinations",
  },
];


  const swiperRef = useRef(null);

  return (
    <section className="pt-60 holiday_package_main_home">
      <Container style={{ position: "relative" }}>
        <h2 className=" mb-4 holiday-pack-h2">
          <strong>
            Hidden Gems of India: Explore the Untold Stories and Secret Wonders
          </strong>
        </h2>
        {/* <p className="holidays-pack-para mb-4">
          Hidden Gems of India: Explore the Untold Stories and Secret Wonders
        </p> */}
        <Swiper
          slidesPerView={"auto"}
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
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          autoplay
          loop
          className="mySwiper"
          style={{ paddingBottom: "20px" }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide style={{ width: "301px" }} key={index}>
             
                <div>
                  <div
                    data-test="tripIdeaWrapper_list"
                    className="hpClcn__slider--item"
                    tabIndex={-1}
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <a
                      data-cy="TripIdea#_287"
                      data-test="tripIdeaWrapper_list_0"
                    >
                      <div className="hpClcn__slider--itemImg">
                        <div className="hpClcn__slider--itemDesc">
                         
                          <p className="latoBold font16 lineHeight22 whiteText">
                           {item.name}
                          </p>
                        </div>
                        <img
                          src={item.img}
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
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
      </Container>
    </section>
  );
};

export default HotelData;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Col } from "react-bootstrap";
import "./RecentBookings.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const RecentBookings = () => {
  const flightBookings = [
    { id: 1, from: "DEL", to: "BOM", date: "2024-08-08" },
    { id: 2, from: "BLR", to: "HYD", date: "2024-08-07" },
    { id: 3, from: "DEL", to: "BOM", date: "2024-08-08" },
    { id: 4, from: "BLR", to: "HYD", date: "2024-08-07" },
    { id: 5, from: "DEL", to: "BOM", date: "2024-08-08" },
    { id: 6, from: "BLR", to: "HYD", date: "2024-08-07" },
    { id: 7, from: "DEL", to: "BOM", date: "2024-08-08" },
    { id: 8, from: "BLR", to: "HYD", date: "2024-08-07" },
  ];

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  const tomorrowDate = getTomorrowDate();

  return (
    <div className="recent-bookings-container">
      <div className="flight-bookings">
        <h5 className="text-center">Recent Flight Searches</h5>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={3}
          loop
          autoplay={{ delay: 3000 }}
        >
          {flightBookings.map((item, index) => (
            <SwiperSlide key={item.id}>
              <Col>
                <Link className="_city_bx" to={`/flightList/dest_${item.to}*org_${item.from}*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`}>
                  {/* <div className="_img">
                  <img src={item.img} alt="Top Route" />
                </div> */}
                  <div className="_igtxt">
                    <div className="_c_nm" style={{ fontSize: "15px" }}>
                      <span
                        className="top-cities-countryyy"
                        style={{ marginRight: "5px" }}
                      >
                        {item.from}
                      </span>
                      <span>
                        <img
                          src="/Images/direct-flight.png"
                          alt="Flight"
                          style={{ width: "32px", height: "32px" }}
                        />
                      </span>
                      <span
                        className="top-cities-countryy"
                        style={{ marginLeft: "5px" }}
                      >
                        {item.to}
                      </span>
                    </div>
                    <div className="_count">{item.date}</div>
                  </div>
                </Link>
              </Col>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentBookings;

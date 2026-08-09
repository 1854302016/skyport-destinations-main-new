import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Col } from "react-bootstrap";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const RecentHotelBookings = () => {

  const hotelBookings = [
    {
      id: 1,
      name: "Hotel Taj",
      city: "Mumbai",
      checkIn: "2024-08-08",
      checkOut: "2024-08-10",
    },
    {
      id: 2,
      name: "The Oberoi",
      city: "Delhi",
      checkIn: "2024-08-07",
      checkOut: "2024-08-09",
    },
    {
      id: 3,
      name: "Le Meridien",
      city: "Bangalore",
      checkIn: "2024-08-10",
      checkOut: "2024-08-12",
    },
    {
      id: 4,
      name: "The Leela Palace",
      city: "Chennai",
      checkIn: "2024-08-15",
      checkOut: "2024-08-18",
    },
    {
      id: 5,
      name: "Hyatt Regency",
      city: "Kolkata",
      checkIn: "2024-08-20",
      checkOut: "2024-08-22",
    },
    {
      id: 6,
      name: "JW Marriott",
      city: "Pune",
      checkIn: "2024-08-25",
      checkOut: "2024-08-27",
    },
  ];
  
  return (
    <div className="recent-bookings-container">
      

      <div className="hotel-bookings">
        <h5 className="text-center">Recent Hotel Searches</h5>
        <Swiper
          modules={[Autoplay, Pagination]}
          direction={'vertical'}
          spaceBetween={5}
          slidesPerView={2}
          style={{height:'135px'}}
          loop
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {hotelBookings.map((item) => (
           
            <SwiperSlide key={item.id}>
              <Col>
                <Link className="_city_bx" to=""
                // {`/flightList/dest_${item.to}*org_${item.from}*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`}
                style={{justifyContent:"center", textAlign:"center", marginBottom:"5px"}}
                >
                  <div className="_igtxt">
                  <div className="_count">{item.name}, {item.city}</div>
                    <div className="_c_nm" style={{ fontSize: "15px" }}>
                      <span
                        className="top-cities-countryyy"
                        style={{ marginRight: "5px" }}
                      >
                        {item.checkIn}
                      </span>
                      <span style={{marginInline:"10px"}}>
                        {/* <img
                          src="/Images/direct-flight.png"
                          alt="Flight"
                          style={{ width: "32px", height: "32px" }}
                        /> */}
                        <FaArrowRightArrowLeft size={15}/>
                      </span>
                      <span
                        className="top-cities-countryy"
                        style={{ marginLeft: "5px" }}
                      >
                        {item.checkOut}
                      </span>
                    </div>
                    
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

export default RecentHotelBookings;

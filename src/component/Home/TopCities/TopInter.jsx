import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./TopCity.css";
import Left from "./wing.png";
import Right from "./wing2.png";
import { Link } from "react-router-dom";

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const tomorrowDate = getTomorrowDate();

  const international = [
    {
      origin: "Dubai",
      img: "https://images.ixigo.com/image/upload/international-flights/0961c7b42f2ca80db9f21f3cc92ead20-mjvxq.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_DXB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_DXB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_DXB*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Chennai",
          link: `/flightList/dest_DXB*org_MAA*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Bangkok",
      img: "https://images.ixigo.com/image/upload/international-flights/4908135a0884d82aba928cc61ea10829-zxfmm.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_BKK*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_BKK*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_BKK*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Kolkata",
          link: `/flightList/dest_BKK*org_CCU*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Singapore",
      img: "https://images.ixigo.com/image/upload/international-flights/85a1ec7f8c85db1c8574e407bb5893dc-cgjoa.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_SIN*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_SIN*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_SIN*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Chennai",
          link: `/flightList/dest_SIN*org_MAA*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "London",
      img: "https://images.ixigo.com/image/upload/international-flights/6b26dab0b2ddaefe4a1854e4d0c0aa2b-ymcjd.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_LON*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_LON*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_LON*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Hyderabad",
          link: `/flightList/dest_LON*org_HYD*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Melbourne",
      img: "https://images.ixigo.com/image/upload/international-flights/01c0f855ac7608f63e6aa1bce4389d5a-wvnvc.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_MLB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_MLB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_MLB*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Amritsar",
          link: `/flightList/dest_MLB*org_ATQ*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Kathmandu",
      img: "https://images.ixigo.com/image/upload/international-flights/3ad8f80d0c76536dfc29851458881c26-hsphw.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_KTM*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_KTM*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_KTM*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Kolkata",
          link: `/flightList/dest_KTM*org_CCU*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
  ];
// const data = [
//   {
//     img: "https://www.easemytrip.com/images/desk-img/mumbai-img.png",
//     desti: "Delhi",
//     ori: "Mumbai",
//     overall: "DEL-BOM",
//     url: `/flightList/dest_BOM*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/bangalore-img.png",
//     desti: "Delhi",
//     ori: "Banglore",
//     overall: "DEL-BLR",
//     url: `/flightList/dest_BLR*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/dubai-img.png",
//     desti: "Delhi",
//     ori: "Dubai",
//     overall: "DEL-DXB",
//     url: `/flightList/dest_DXB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/ahmedabad-img.png",
//     desti: "Delhi",
//     ori: "Ahmedabad",
//     overall: "DEL-AMD",
//     url: `/flightList/dest_AMD*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/jaipur-img.png",
//     desti: "Mumbai",
//     ori: "Jaipur",
//     overall: "BOM-JAI",
//     url: `/flightList/dest_JAI*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/lucknow-img.png",
//     desti: "Delhi",
//     ori: "Lucknow",
//     overall: "DEL-LKO",
//     url: `/flightList/dest_LKO*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/chennai-img.png",
//     desti: "Mumbai",
//     ori: "Chennai",
//     overall: "BOM-MAA",
//     url: `/flightList/dest_MAA*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/dubai-img.png",
//     desti: "Mumbai",
//     ori: "Dubai",
//     overall: "BOM-DXB",
//     url: `/flightList/dest_DXB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/kolkata-img.png",
//     desti: "Delhi",
//     ori: "Kolkata",
//     overall: "DEL-CCU",
//     url: `/flightList/dest_CCU*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
//   },
// ];
const TopInter = () => {
  return (
    <div className="top-cities-container">
      <Container>
        <div className="_toprflcont">
          <div className="_hdrtxt">
           
            <div className="top_cities_flight_serach">
              Top International Flight Routes
            </div>
          
          </div>
        </div>
        <Row style={{ padding: "10px" }}>
          {international.map((item, index) => (
            <Col md={4}>
              <div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-3 top_cities_mainnn_cont">
                <div
                  style={{
                    width: "50px",
                    height: "60px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.img}
                    alt="Mumbai Flights"
                    title="Mumbai Flights"
                    width={50}
                    height={60}
                    className="object-cover top_cities_images_all"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="fw-bold mb-1" style={{ color: "#404040" }}>
                    {item.origin} Flights
                  </p>
                  <div className="d-flex align-items-start gap-1 flex-wrap flex-column">
                    <p className="text-muted mb-0">To:</p>
                    <div className="d-flex flex-wrap gap-2 top_citites_fontt">
                      {item.data.map((datas, i) => (
                        <>
                          <Link
                            to={datas.link}
                            className="text-[#053355] text-decoration-none"
                          >
                            {datas.destination}
                          </Link>
                          {i !== item.data.length - 1 && (
                            <span className="text-[#053355]">•</span>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* <Link className="_city_bx" to={item.url}>
                <div className="_img">
                  <img src={item.img} alt="Top Route" />
                </div>
                <div className="_igtxt">
                  <div className="_c_nm">
                    <span className="top-cities-countryyy">{item.desti}</span>
                    <span>
                      <img
                        src="/Images/direct-flight.png"
                        alt="Flight"
                        style={{ width: "32px", height: "32px" }}
                      />
                    </span>
                    <span className="top-cities-countryy">{item.ori}</span>
                  </div>
                  <div className="_count">{item.overall}</div>
                </div>
              </Link> */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TopInter;

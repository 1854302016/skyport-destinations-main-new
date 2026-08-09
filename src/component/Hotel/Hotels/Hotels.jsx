import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import HotelsListData from "./HotelsListData";
import FilterComp from "./FilterComp";
import "./Hotels.css";
import { FaAngleRight, FaSpinner, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotelList = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [hotelList, setHotelList] = useState();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get("from");
    const nationality = params.get("nationality");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const roomsParam = params.get("rooms");

    const roomsArray = roomsParam ? JSON.parse(roomsParam) : [];

    setRooms(roomsArray);

    const searchDataa = {
      searchQuery: {
        checkinDate: startDate,
        checkoutDate: endDate,
        roomInfo: roomsArray.map((room) => ({
          numberOfAdults: room.adults,
          numberOfChild: room.children,
          childAge: room.childrenAges.map((age) => parseInt(age)), // Ensure childAges is parsed as an array
        })),
        searchCriteria: {
          city: from,
          nationality: nationality,
          currency: "INR",
        },
        searchPreferences: {
          ratings: [1, 2, 3, 4, 5],
        },
      },
      sync: true,
    };

    console.log("searchquery", searchDataa);
    axios
      .post(
        "https://admin.skyportdestinations.com/api/hotelTJ/search_list",
        searchDataa
      )
      .then((response) => {
        console.log(response.data);
        // Handle response data
        setHotelList(response.data.data.searchResult);
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  }, [location.search]);

  console.log("HotelList", hotelList);

  return (
    <div>
      {hotelList && (
        <Container className="listingbx">
          <Row className="rightlist flexdrop">
            <Col>
              <h2 className="hotelcountinfo">
                {/* New Delhi and NCR&nbsp;&nbsp;:&nbsp;&nbsp; */}
                <span style={{}} className="properti_f">
                  {hotelList.size} Hotels available
                </span>
                <div className="searchtoolbar">
                  <span className="searchtext">
                    Our best prices have now loaded
                  </span>
                  <div
                    className="searchloader"
                    // style={{ display: "none" }}
                  >
                    <FaSpinner />
                  </div>
                </div>
              </h2>
            </Col>
            <Col>
              <div className="ratingdrop" style={{ float: "right" }}>
                <select className="lidr_pc" fdprocessedid="xayn33">
                  <option>Rating</option>
                  <option>Price&nbsp;&nbsp;:&nbsp;&nbsp;low to high</option>
                  <option>Price&nbsp;&nbsp;:&nbsp;&nbsp;high to low</option>
                  <option>Distance</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row id="myProgress">
            <div className="myBar" style={{ width: "100%" }} />
          </Row>
          <Row className="largebox_listing" id="ajaxContent">
            {hotelList.his.map((hotel) => (
              <div
                className="refendable11onword"
                id={`code_${hotel.id}`}
                key={hotel.id}
              >
                <div className="hotelcode" id={hotel.id}>
                  <div className="hotelnamesearch" hotelname={hotel.name}>
                    <div
                      className="roomtypes"
                      // roomtype={hotel.roomType}
                    >
                      <div className="price1" price="null" data-price="null">
                        <div className="mealplans" mealplan="room-only">
                          <div
                            className="facilities"
                            // facilities={hotel.facilities.join(";")}
                            style={{ display: "block" }}
                          >
                            <div className="lglist">
                              <div className="list_hotel_img">
                                <div className="lgzoomimg">
                                  <Link
                                    // to="javascript:;"
                                    hid={hotel.id}
                                    sid="vlybtof6uqploztqrvh3hafviq"
                                    className="openhotelinfomodal"
                                  >
                                    <img
                                      style={{ width: "100%", height: 197 }}
                                      src={hotel.img[0].url}
                                      className="img-res"
                                      alt={hotel.name}
                                    />
                                  </Link>
                                </div>
                              </div>
                              <div className="list_hotel_txt">
                                <div className="listing_hd_hotel">
                                  <h2>
                                    <Link
                                      to="#"
                                      hid={hotel.id}
                                      sid="vlybtof6uqploztqrvh3hafviq"
                                      className="openhotelinfomodal"
                                    >
                                      <span>{hotel.name}</span>
                                    </Link>
                                    <div className="startbx smallstar">
                                      {/* <span>&nbsp;-&nbsp;</span> */}
                                      {Array.from(
                                        { length: hotel.rt },
                                        (_, index) => (
                                          <FaStar
                                            key={index}
                                            className="star_icon"
                                          />
                                        )
                                      )}
                                    </div>
                                  </h2>
                                  <ul className="listbt_sml">
                                    <li>
                                      <Link
                                        to="#"
                                        lat="28.65427704"
                                        long="77.36183794"
                                      >
                                        {hotel.ad.adr}
                                        <br />
                                        {hotel.ad.adr2}
                                        <br />
                                        {hotel.ad.city.name},{" "}
                                        {hotel.ad.country.name}
                                      </Link>
                                    </li>
                                  </ul>
                                  <ul className="iconsml">
                                    {/* {hotel.pops[0].fc.map((facility, index) => ( */}
                                    <li>
                                      {/* <span style={{ display: "none" }}>
                                          <img
                                            src="https://tripoholidays.com/public/images/Pool.png"
                                            className="img-res"
                                            alt={facility}
                                          />
                                        </span> */}
                                      <span>{hotel.ops[0].ris[0].rc}</span>
                                    </li>
                                    {/* ))} */}
                                  </ul>
                                  <ul className="iconsml">
                                    {hotel.pops[0].fc.map((facility, index) => (
                                      <li key={index}>
                                        <span style={{ display: "none" }}>
                                          <img
                                            src="https://tripoholidays.com/public/images/Pool.png"
                                            className="img-res"
                                            alt={facility}
                                          />
                                        </span>
                                        <span>{facility}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="pribtns">
                                <div className="priceshow">
                                  <h3 className="price_value">
                                    ₹{hotel.ops[0].ris[0].tp}{" "}
                                    <span>Total Cost</span>
                                  </h3>
                                </div>
                                <div className="hotslc">
                                  <Button
                                    href={`/hotel-detail/${hotel.id}`}
                                    hid={hotel.id}
                                    sid="vlybtof6uqploztqrvh3hafviq"
                                    className="btn-grad ftbtn_src openrooms"
                                  >
                                    Show Rooms
                                    <FaAngleRight
                                      className="ml5"
                                      aria-hidden="true"
                                    />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="hotwlroomdata"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

const Hotels = () => {
  return (
    <div className="container_pd list_hotel">
      <section className="list_fliter">
        <Row>
          <Col lg={3} md={3} sm={12}>
            <FilterComp />
          </Col>
          <Col lg={9} md={9} sm={12}>
            <HotelList />
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Hotels;

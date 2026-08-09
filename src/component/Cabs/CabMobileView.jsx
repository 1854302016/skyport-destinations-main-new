import React from "react";
// import ListProduct from "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct";
// import TopHeader from "../../Hotel/HotelSearch/HotelSearchMobile/TopHeader";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { FaWallet } from "react-icons/fa";
// import { BiSolidOffer } from "react-icons/bi";
// import Slider from "react-slick";
// import Reuse from "../../data/Reuse";
// import { data, settings } from "../BookingSearch/FlightBooking";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
// import FlightSearchForm from "./FlightSearchForm";
// import WhyUs from "../../Home/Home/WhyUs";
// import TopCities from "../../Home/TopCities/TopCities";
// import SectionOne from "../../TourPackages/TourBanner/SectionOne";
// import SliderCode from "../../Home/Home/SliderCode";
// import International from "../../TourPackages/TourBanner/International";
// import HolidayPackages from "../../Home/Home/HolidayPackage";
// import "../../Hotel/HotelSearch/HotelSearchMobile/AppDownloadBanner.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/AutoSuggest.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/DatePickerComponent.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/OffersAndDeals.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/PopularDestinations.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/RoomSelectionComponent.css";
// import Sections from "../../Home/Home/Sections";
// import Advantage from "../../Home/Home/Advantage";
// import OfferSection from "./OfferSection";
// import HotelMobile from "./HotelMobile";
// import AboutHome from "../../Home/Home/AboutHome";
// import TopCities from "./TopCities";
import CabListProducts from "./CabListProducts";
import CabMobileForm from "./CabMobileForm";
import ListProduct from "../Hotel/HotelSearch/HotelSearchMobile/ListProduct";
import FlightSearchForm from "../Flight/FlightSearchMobile/FlightSearchForm";

// import "../../Hotel/HotelSearch/HotelSearchMobile/SearchForm.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/TopHeader.css";

const CabMobileView = () => {
  return (
    <div id="hotelSearch" className="hotelsearchmobile">
      {/* <TopHeader heading="Flight Search" showNationality={true} /> */}
      <ListProduct active="flight" />
      <FlightSearchForm />
      {/* <Container>
        <Row>
          <Col md={12} className="resp-mt-20">
            <Card
              className="dashboardbox dashboxcolor2"
              style={{ marginBottom: "5px" }}
            >
              <Card.Body style={{ padding: "0px" }}>
                <h2 className="boxheading boxheadcolor2">
                  My Wallet
                  <FaWallet style={{ float: "right", fontSize: "18px" }} />
                </h2>
                <div className="dashinnerbox">
                  <ul className="creditlist">
                    <li>
                      <label>Profile Credit Limit:</label> USD 0.00
                    </li>
                    <li>
                      <label>Wallet Balance:</label> USD 0.00
                    </li>
                  </ul>
                </div>
              </Card.Body>
              <Card.Footer
                className="text-muted"
                style={{ paddingInline: "5px" }}
              >
                <Card.Text
                  style={{
                    color: "white",
                    fontSize: "14px",
                    textWrap: "wrap",
                    overflow: "ellipsis",
                  }}
                >
                  Available Credit Limit:{" "}
                  <span className="float-right">USD 0.00</span>
                </Card.Text>
              </Card.Footer>
            </Card>
          </Col>

          <Col>
            <div
              style={{
                display: "flex",
                marginBottom: "5px",
                marginTop: "15px",
              }}
            >
              <BiSolidOffer size={22} style={{ color: "#f73030" }} />
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {" "}
                More Offer
              </div>
            </div>
            <Slider {...settings} className="mb-3">
              {data.map((item, id) => (
                <Reuse key={id} url={item.img} />
              ))}
            </Slider>
          </Col>

          <Col>
            <FlightDeal />
          </Col>
        </Row>
      </Container> */}
      {/* <div>&nbsp;</div>
      <TopCities />
      <OfferSection />
      <Sections />
      <HotelMobile />
      <SliderCode />
      <Advantage />
      <AboutHome /> */}
      {/* <WhyUs/> */}
      {/* <International/> */}
      {/* <TopCities/> */}

      {/* <SectionOne/> */}
      {/* <SliderCode/> */}
      {/* <International/> */}
      {/* <HolidayPackages/> */}
    </div>
  );
};

export default CabMobileView;

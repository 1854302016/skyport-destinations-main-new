import React from "react";
import { Helmet } from "react-helmet";
// import TopHeader from "./TopHeader";
import { Container } from "react-bootstrap";
// import WhyUs from "../../../Home/Home/WhyUs";
// import SliderCode from "../../../Home/Home/SliderCode";
// import HolidayPackages from "../../../Home/Home/HolidayPackage";
import OfferSectionHotel from "../../Hotel/HotelSearch/HotelSearchMobile/OfferSectionHotel";
import ListProduct from "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct";
import SearchFormMobile from "../../Hotel/HotelSearch/HotelSearchMobile/SearchFormMobile";
import HotelsContainer from "../../Hotel/HotelSearch/HotelComponent";
import Advantage from "../../Home/Home/Advantage";
import HotelChains from "../HotelDesktopView/HotelChains";
import SectionsHotel from "../../Hotel/HotelSearch/SectionsHotel";
// import AppDownloadBanner from "./AppDownloadBanner";
// import LastCards from "./LastCards";
// import PopularDestinations from "./PopularDestinations";
// import OffersAndDeals from "./OffersAndDeals";
// import AutoSuggest from './AutoSuggest'
// import DatePickerComponent from './DatePickerComponent'
// import RoomSelectionComponent from './RoomSelectionComponent'
// import Slider from "react-slick";
// import Reuse from "../../data/Reuse";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { FaWallet } from "react-icons/fa";
// import { BiSolidOffer } from "react-icons/bi";
// import { data, settings } from "../HotelSearchData";
// import Reuse from "../../../data/Reuse";

const HotelSearchMobile = () => {
  const bookusdata = [
    {
      img: "/Images/Icons/esy-flights.svg",
      head: "Easy Booking",
      desc: " Book Flights Easily and Grab Exciting Offers!",
    },
    {
      img: "/Images/Icons/down-arrows.svg",
      head: "Lowest Price",
      desc: "Guaranteed Low Rates on Hotels, Holiday Packages, and Flights",
    },
    {
      img: "/Images/Icons/return-boxs.svg",
      head: "Instant Refund",
      desc: "Get Quick and Easy Refunds on All Your Travel Bookings!",
    },
    {
      img: "/Images/Icons/24-hoursa.svg",
      head: "24/7 Support",
      desc: "24/7 Support for All Your Travel Queries — We're Here to Help!",
    },
    {
      img: "/Images/Icons/hot-sales.svg",
      head: "Exciting Deals",
      desc: "Unlock Exciting Deals on Flights, Hotels, Buses, Car Rentals, and Tours!",
    },
  ];
  return (
    <div id="hotelSearch" className="">
      <Helmet>
        <title>
          Hotel Booking | Luxury & Budget Hotels Worldwide - SkyPort
          Destinations
        </title>
        <meta
          name="description"
          content="Book luxury, budget, and business hotels worldwide with SkyPort Destinations. Compare hotel prices, explore top destinations, and enjoy secure online hotel booking with exclusive deals."
        />
        <meta
          name="keywords"
          content="hotel booking, cheap hotels, luxury hotels, budget hotels, online hotel booking, hotel deals, worldwide hotels, business hotels, family hotels, SkyPort Destinations hotels"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SkyPort Destinations" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Hotel Booking Worldwide | SkyPort Destinations"
        />
        <meta
          property="og:description"
          content="Find and book the best hotels worldwide with SkyPort Destinations. Compare prices and enjoy hassle-free hotel reservations online."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://trustedfare.com/hotel"
        />
        <meta
          property="og:image"
          content="https://trustedfare.com/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hotel Booking Worldwide | SkyPort Destinations"
        />
        <meta
          name="twitter:description"
          content="Book hotels online with exclusive deals and secure reservations at SkyPort Destinations."
        />
        <link rel="canonical" href="https://trustedfare.com/hotel" />
      </Helmet>
      {/* <TopHeader heading="Hotel Search" showNationality={false} /> */}
      <ListProduct active="hotel" />
      <SearchFormMobile />
      {/* <OfferSection /> */}
      <OfferSectionHotel />
      <HotelsContainer />
      {/* <SectionsHotel/>  */}
      <Container>
        {/* <WhyUs/> */}
        <Advantage />
        <HotelChains />
        {/* <SliderCode/> */}
        {/* <HolidayPackages/> */}
      </Container>
    </div>
  );
};

export default HotelSearchMobile;

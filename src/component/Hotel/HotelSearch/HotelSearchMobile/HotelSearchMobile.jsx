import React from "react";
// import TopHeader from "./TopHeader";
import ListProduct from "./ListProduct";
import SearchForm from "./SearchForm";
import SearchFormMobile from "./SearchFormMobile";
import HotelsContainer from "../HotelComponent";
import { Container } from "react-bootstrap";
import WhyUs from "../../../Home/Home/WhyUs";
import SliderCode from "../../../Home/Home/SliderCode";
import HolidayPackages from "../../../Home/Home/HolidayPackage";
import OfferSectionHotel from "./OfferSectionHotel";
import Advantage from "../../../Home/Home/Advantage";
import HotelChains from "../HotelChains";
import SectionsHotel from "../SectionsHotel";
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
  const bookusdata=[
    {img:"/Images/Icons/esy-flights.svg",
        head:"Easy Booking",
        desc:" Book Flights Easily and Grab Exciting Offers!",
    },
    {img:"/Images/Icons/down-arrows.svg",
        head:"Lowest Price",
        desc:"Guaranteed Low Rates on Hotels, Holiday Packages, and Flights",
    },
     {img:"/Images/Icons/return-boxs.svg",
        head:"Instant Refund",
        desc:"Get Quick and Easy Refunds on All Your Travel Bookings!",
    },
     {img:"/Images/Icons/24-hoursa.svg",
        head:"24/7 Support",
        desc:"24/7 Support for All Your Travel Queries — We're Here to Help!",
    },
     {img:"/Images/Icons/hot-sales.svg",
        head:"Exciting Deals",
        desc:"Unlock Exciting Deals on Flights, Hotels, Buses, Car Rentals, and Tours!",
    },
]
  return (
    <div id="hotelSearch" className="">
      {/* <TopHeader heading="Hotel Search" showNationality={false} /> */}
      <ListProduct active="hotel" />
      <SearchFormMobile />
      {/* <OfferSection /> */}
      <OfferSectionHotel/>
      <HotelsContainer/>
      <SectionsHotel/> 
      <Container>
        {/* <WhyUs/> */}
        <Advantage />
        <HotelChains/>
        {/* <SliderCode/> */}
        {/* <HolidayPackages/> */}
      </Container>
    </div>
  );
};

export default HotelSearchMobile;

import React from "react";
import { motion } from "framer-motion";
import FlightSearchForm from "./FlightSearchForm";
import SliderCode from "../../Home/Home/SliderCode";
import "../../Hotel/HotelSearch/HotelSearchMobile/AppDownloadBanner.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/AutoSuggest.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/DatePickerComponent.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/OffersAndDeals.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/PopularDestinations.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/RoomSelectionComponent.css";
import Sections from "../../Home/Home/Sections";
import Advantage from "../../Home/Home/Advantage";
import OfferSection from "./OfferSection";
import HotelMobile from "./HotelMobile";
import AboutHome from "../../Home/Home/AboutHome";
import TopCities from "./TopCities";
import MobileApp from "./MobileApp";
import Deals from "./Deals";
import Gallery from "../BookingSearch/Gallery";
import PopularDestinationMobile from "./PopularDestinationMobile";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const FlightSearchMobile = () => {
  return (
    <motion.div 
      id="hotelSearch" 
      className="hotelsearchmobile"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div variants={itemVariants}>
        <FlightSearchForm />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TopCities />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OfferSection />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PopularDestinationMobile />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Gallery />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Advantage />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AboutHome />
      </motion.div>
    </motion.div>
  );
};

export default FlightSearchMobile;

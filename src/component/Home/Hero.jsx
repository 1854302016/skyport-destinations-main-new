import React from "react";
import { motion } from "framer-motion";
import PopularDestinations from "./PopularDestinations";
import BookingForm from "../Flight/BookingSearch/BookingForm";
import Deals from "../Flight/FlightSearchMobile/Deals";
import OffersSlider from "./OffersSlider";
import WhyBook from "./WhyBook";
import Cheaper from "./Cheaper";
import Gallery from "../Flight/BookingSearch/Gallery";
import './HomeHeroRefined.css';
import '../Flight/BookingSearch/Gallery.css'; 
import TopCities from './TopCities/TopCities'

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

const Hero = () => {
  return (
    <motion.div 
      className="hero-main-wrapper"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* 1. Main Booking Entry */}
      <motion.div variants={itemVariants}>
        <BookingForm />
      </motion.div>
      
      {/* 2. Top Promotional Offers */}
      <motion.div variants={itemVariants}>
        <OffersSlider />
      </motion.div>
      
      {/* 3. Flash Daily Deals */}
      {/* <motion.div variants={itemVariants}>
        <Deals />
      </motion.div> */}
      
      {/* 4. Categorized Flight Offers */}
      {/* <motion.div variants={itemVariants}>
        <Cheaper />
      </motion.div> */}
       <motion.div variants={itemVariants}>
        <TopCities />
      </motion.div>
      {/* 5. Luxury Destination Showcase */}
      <motion.div variants={itemVariants}>
        <PopularDestinations />
      </motion.div>
      
      {/* 6. Visual Inspiration Gallery */}
      <motion.div variants={itemVariants}>
        <Gallery />
      </motion.div>
      
      {/* 7. Trust Pillars */}
      <motion.div variants={itemVariants}>
        <WhyBook />
      </motion.div>
    </motion.div>
  );
};

export default Hero;


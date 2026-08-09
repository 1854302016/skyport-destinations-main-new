import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import "./HotelChain.css";

function HotelChains() {
  const hotelLogos = [
    { src: "/Images/Images/hotel1.png", name: "Luxury Inn" },
    { src: "/Images/Images/hotel2.webp", name: "Grand Plaza" },
    { src: "/Images/Images/hotel3.webp", name: "Royal Stay" },
    { src: "/Images/Images/hotel4.webp", name: "Heritage Home" },
    { src: "/Images/Images/hotel5.webp", name: "Coastal Resort" },
    { src: "/Images/Images/hotel6.webp", name: "Skyline Hotel" },
    { src: "/Images/Images/hotel7.png", name: "Oasis Suites" },
    { src: "/Images/Images/hotel8.png", name: "Metro Lodge" },
    { src: "/Images/Images/hotel9.png", name: "Serene Villas" },
    { src: "/Images/Images/hotel10.webp", name: "Park View" },
    { src: "/Images/Images/hotel11.webp", name: "Urban Nest" },
    { src: "/Images/Images/hotel15.webp", name: "Elite Manor" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className="hotel_chains_premium_section">
      <Container>
        <div className="chains_header_wrapper mb-5 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="premium_badge"
          >
            <FiCheckCircle className="me-2 text-warning" /> TRUSTED BY MILLIONS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chains_main_title"
          >
            Our Elite Hotel Partners
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            className="title_divider"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="chains_sub_para"
          >
            Experience unparalleled hospitality with our handpicked selection of top-tier hotel chains across the globe.
          </motion.p>
        </div>

        <motion.div 
          className="chains_grid_layout"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {hotelLogos.map((hotel, idx) => (
            <motion.div 
              key={idx} 
              className="premium_logo_card"
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(5, 51, 85, 0.15)",
                borderColor: "#053355"
              }}
            >
              <div className="logo_inner">
                <img src={hotel.src} alt={hotel.name} />
              </div>
              <div className="card_hover_indicator"></div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}

export default HotelChains;

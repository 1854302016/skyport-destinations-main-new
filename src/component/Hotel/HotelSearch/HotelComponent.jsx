import React from "react";
import { Card, Button,Container } from "react-bootstrap";
import "./HotelComponent.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const HotelCard = ({ imageUrl, altText, destination, links, index }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="ecpl_rbx_premium"
    >
      <div className="mgdestn_wrapper">
        <img src={imageUrl} alt={altText} className="hotel_dest_img" />
        <div className="dest_overlay_gradient"></div>
        <div className="dest_badge">Popular</div>
      </div>
      <div className="hotel_card_content">
        <h5 className="destination_name">{destination}</h5>
        <div className="hotel_link_row">
          {links.map((link, idx) => (
            <span key={idx} className="hotel_type_tag">
              {link.replace(/,/g, '')}
            </span>
          ))}
        </div>
        <div className="hotel_card_footer">
          <Link to="/hotel" className="explore_link">
            Explore <FiExternalLink className="ms-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const HotelsContainer = () => {
  const hotels = [
    {
      imageUrl: "https://images.pexels.com/photos/12577788/pexels-photo-12577788.jpeg",
      altText: "Georgetown",
      destination: "Georgetown, Guyana",
      links: ["Hotels", "Budget Hotels", "3 Star Hotels", "4 Star Hotels", "5 Star Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/16402465/pexels-photo-16402465.jpeg",
      altText: "New Amsterdam",
      destination: "New Amsterdam, Guyana",
      links: ["Hotels", "Budget Hotels", "Resorts", "3 Star Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/30036675/pexels-photo-30036675.jpeg",
      altText: "Linden",
      destination: "Linden, Guyana",
      links: ["Hotels", "Guest Houses", "Budget Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/8377468/pexels-photo-8377468.jpeg",
      altText: "Bartica",
      destination: "Bartica, Guyana",
      links: ["Hotels", "Eco Lodges", "Budget Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/27706749/pexels-photo-27706749.jpeg",
      altText: "Lethem",
      destination: "Lethem, Guyana",
      links: ["Hotels", "Guest Houses", "Budget Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/17291231/pexels-photo-17291231.jpeg",
      altText: "Paramaribo",
      destination: "Paramaribo, Suriname",
      links: ["Hotels", "Budget Hotels", "3 Star Hotels", "4 Star Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/11878838/pexels-photo-11878838.jpeg",
      altText: "Port of Spain",
      destination: "Port of Spain, Trinidad",
      links: ["Hotels", "Business Hotels", "3 Star Hotels", "4 Star Hotels", "5 Star Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/16212946/pexels-photo-16212946.jpeg",
      altText: "Bridgetown",
      destination: "Bridgetown, Barbados",
      links: ["Hotels", "Beach Resorts", "4 Star Hotels", "5 Star Hotels"],
    },
    {
      imageUrl: "https://images.pexels.com/photos/29495141/pexels-photo-29495141.jpeg",
      altText: "Miami",
      destination: "Miami, USA",
      links: ["Hotels", "Luxury Hotels", "3 Star Hotels", "4 Star Hotels", "5 Star Hotels"],
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  return (
    <div className="hotels_section_modern">
      <Container className="innerWrapLarge">
        <div className="section_header_modern text-center mb-5">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="modern_title"
          >
            Book Hotels at Popular Destinations
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="title_accent"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="modern_subtitle mt-2"
          >
            Discover curated stays in the world's most beautiful locations
          </motion.p>
        </div>
        
        <motion.div 
          className="modern_hotel_grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {hotels.map((hotel, index) => (
            <motion.div key={index} variants={cardVariants}>
              <HotelCard {...hotel} index={index} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="view_all_container mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/hotellist" className="modern_view_more">
            View All Destinations
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default HotelsContainer;

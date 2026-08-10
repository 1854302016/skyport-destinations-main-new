import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./css/ModernTourStyle.css";

const MotionLink = motion(Link);

const TopDestinationsCircular = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "https://admin.trustedfare.com/api/HolidayPackages/destinations",
        );
        if (response.data && response.data.success) {
          setDestinations(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="top-destinations-section">
      <Container>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Explore Our Top Destinations</h2>
          <Link className="view-all-btn">View All →</Link>
        </motion.div>

        <div className="destinations-scroll">
          {destinations.slice(0, 12).map((destination, index) => (
            <MotionLink
              key={index}
              to={`/tour/${destination.slug}`}
              className="destination-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="destination-circle">
                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=" + destination.name;
                  }}
                />
              </div>
              <div className="destination-name">{destination.name}</div>
              <div className="destination-count">
                {Math.floor(Math.random() * 50) + 10} Tours
              </div>
            </MotionLink>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TopDestinationsCircular;

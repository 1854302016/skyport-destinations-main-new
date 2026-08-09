import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import "./css/GuyanaMosaic.css";

const PopularInternationalSection = () => {
  // Curated high-quality images for a "Stylish" feel
  const destinations = [
    {
      name: "Barbados",
      duration: "4 Nights / 5 Days",
      image:
        "https://media.gettyimages.com/id/183412550/photo/bathsheba-barbados.jpg?s=612x612&w=gi&k=20&c=cIw__spAqZiQ4Zj7SgWyUHIFTFbHwE7Ryew4Dez9CGc=",
      slug: "barbados",
    },
    {
      name: "Suriname",
      duration: "3 Nights / 4 Days",
      image:
        "https://media.istockphoto.com/id/1094420712/photo/amazon-rainforest-sunset-ecuador.jpg?s=612x612&w=0&k=20&c=ZP_dLneRx-9IE2okBmNjPNrRcSb1JYVNZBa_hKwLdC4=",
      slug: "suriname",
    },
    {
      name: "Trinidad",
      duration: "4 Nights / 5 Days",
      image:
        "https://media.istockphoto.com/id/465302010/photo/port-of-spain-in-trinidad-and-tobago.jpg?s=612x612&w=0&k=20&c=sJIG5-W2lTs16HIQs33pISePHqjH9HsqdBeKOj6uA5o=",
      slug: "trinidad",
    },
    {
      name: "Brazil",
      duration: "5 Nights / 6 Days",
      image:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1000",
      slug: "brazil",
    },
    {
      name: "Jamaica",
      duration: "3 Nights / 4 Days",
      image:
        "https://images.unsplash.com/photo-1523544261025-3159599b1fc3?w=1000",
      slug: "jamaica",
    },
    {
      name: "St. Lucia",
      duration: "5 Nights / 6 Days",
      image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1000",
      slug: "st-lucia",
    },
  ];

  return (
    <section className="guyana-mosaic-section">
      <Container>
        <motion.div
          className="guyana-mosaic-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Popular International Destinations</h2>
          <p>Exclusive regional getaways curated for the modern traveler.</p>
        </motion.div>

        <div className="guyana-mosaic-grid">
          {/* Column 1: Barbados on top, Suriname & Trinidad on bottom */}
          <motion.div
            className="col-left-top"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to={`/tour/${destinations[0].slug}`} className="guyana-card">
              <div className="img-box">
                <img src={destinations[0].image} alt={destinations[0].name} />
              </div>
              <div className="card-overlay"></div>
              <div className="card-info">
                <span className="dest-name">{destinations[0].name}</span>
                {/* <span className="duration"><FaClock size={12}/> {destinations[0].duration}</span> */}
              </div>
            </Link>
          </motion.div>
          <motion.div
            className="col-left-bottom"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to={`/tour/${destinations[1].slug}`} className="guyana-card">
              <div className="img-box">
                <img src={destinations[1].image} alt={destinations[1].name} />
              </div>
              <div className="card-overlay"></div>
              <div className="card-info">
                <span className="dest-name">{destinations[1].name}</span>
                {/* <span className="duration"><FaClock size={12}/> {destinations[1].duration}</span> */}
              </div>
            </Link>
            <Link to={`/tour/${destinations[2].slug}`} className="guyana-card">
              <div className="img-box">
                <img src={destinations[2].image} alt={destinations[2].name} />
              </div>
              <div className="card-overlay"></div>
              <div className="card-info">
                <span className="dest-name">{destinations[2].name}</span>
                {/* <span className="duration"><FaClock size={12}/> {destinations[2].duration}</span> */}
              </div>
            </Link>
          </motion.div>

          {/* Column 2: Tall Hero (Brazil) */}
          <motion.div
            className="col-middle-tall"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to={`/tour/${destinations[3].slug}`} className="guyana-card">
              <div className="img-box">
                <img src={destinations[3].image} alt={destinations[3].name} />
              </div>
              <div className="card-overlay"></div>
              <div className="card-info">
                <span className="dest-name" style={{ fontSize: "36px" }}>
                  {destinations[3].name}
                </span>
                {/* <span className="duration"><FaClock size={14}/> {destinations[3].duration}</span> */}
              </div>
            </Link>
          </motion.div>

          {/* Column 3: Jamaica top, St. Lucia bottom */}
          <motion.div
            className="col-right-top"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to={`/tour/${destinations[4].slug}`} className="guyana-card">
              <div className="img-box">
                <img src={destinations[4].image} alt={destinations[4].name} />
              </div>
              <div className="card-overlay"></div>
              <div className="card-info">
                <span className="dest-name">{destinations[4].name}</span>
                {/* <span className="duration"><FaClock size={12}/> {destinations[4].duration}</span> */}
              </div>
            </Link>
          </motion.div>
          <motion.div
            className="col-right-bottom"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to={`/tour/${destinations[5].slug}`} className="guyana-card">
              <div className="img-box">
                <img src={destinations[5].image} alt={destinations[5].name} />
              </div>
              <div className="card-overlay"></div>
              <div className="card-info">
                <span className="dest-name">{destinations[5].name}</span>
                {/* <span className="duration"><FaClock size={12}/> {destinations[5].duration}</span> */}
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mosaic-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/tour/international" className="mosaic-btn">
            Explore Full Destinations
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default PopularInternationalSection;

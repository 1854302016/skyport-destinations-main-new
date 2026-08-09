import React from "react";
import { Container } from "react-bootstrap";
import { FaShieldAlt, FaHeadset, FaMoneyBillWave, FaGlobe } from "react-icons/fa";
import "./css/ModernTourStyle.css";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "100% Trusted",
      description: "Verified and trusted travel experiences with secure booking"
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your travel needs"
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Best Price",
      description: "Competitive pricing with exclusive deals and offers"
    },
    {
      icon: <FaGlobe />,
      title: "1000+ Destinations",
      description: "Explore amazing destinations across the globe"
    }
  ];

  return (
    <div className="why-choose-section">
      <Container>
        <h2>Why Choose SkyPort Destinations</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-box">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default WhyChooseUs;

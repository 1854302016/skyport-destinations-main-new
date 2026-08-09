import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./css/ExpandingCards.css";

const MotionLink = motion(Link);

const DiverseExperiences = () => {
  const experiences = [
    {
      title: "Honeymoon",
      subtitle:
        "Create unforgettable memories with your loved one in the most romantic destinations around the world.",
      price: "₹16,359",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      link: "/tour/honeymoon",
      badge: "ROMANTIC",
    },
    {
      title: "Family",
      subtitle:
        "Bound moments and joyful laughter with our specially curated family vacation packages.",
      price: "₹25,999",
      image:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
      link: "/tour/family",
      badge: "FAMILY FUN",
    },
    {
      title: "Adventure",
      subtitle:
        "Push your limits and conquer the wild with thrill-seeking adventures across the globe.",
      price: "₹12,499",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      link: "/tour/adventure",
      badge: "THRILL",
    },
    {
      title: "Beaches",
      subtitle:
        "Relax on pristine white sands and dive into crystal clear turquoise waters.",
      price: "₹18,500",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      link: "/tour/beaches",
      badge: "TROPICAL",
    },
    {
      title: "Luxury",
      subtitle:
        "Experience the pinnacle of elegance and comfort with our premium curated experiences.",
      price: "₹45,999",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      link: "/tour/ladies-special",
      badge: "PREMIUM",
    },
  ];

  return (
    <div className="experiences-section" style={{ padding: "60px 0" }}>
      <Container>
        <motion.div
          className="section-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{ fontSize: "32px", fontWeight: "800", color: "#2b2d42" }}
            className="diverse_experience"
          >
            Enjoy the Diverse Experiences
          </h2>
          <Link
            className="view-all-btn"
            style={{
              background: "#e63946",
              color: "#fff",
              padding: "10px 25px",
              borderRadius: "30px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View All →
          </Link>
        </motion.div>

        <motion.div
          className="expanding-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {experiences.map((exp, index) => (
            <MotionLink
              key={index}
              to={exp.link}
              className="expanding-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={exp.image} alt={exp.title} loading="lazy" />
              <div className="expanding-card-vertical-title">{exp.title}</div>
              <div className="expanding-badge">{exp.badge}</div>
              <div className="expanding-card-overlay"></div>
              <div className="expanding-card-content">
                <h3 className="expanding-card-title">{exp.title}</h3>
                <p className="expanding-card-subtitle">{exp.subtitle}</p>
                <div className="expanding-card-price">
                  STARTS FROM {exp.price}
                </div>
                <div className="expanding-explore-btn">EXPLORE NOW &rarr;</div>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </Container>
    </div>
  );
};

export default DiverseExperiences;

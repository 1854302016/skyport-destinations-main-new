import React from 'react'
import './Home.css'
import { Container } from 'react-bootstrap'
import { motion } from "framer-motion";

const AboutHome = () => {
  return (
    <section className="_emtabout corp-hidden">
      <Container>
        <div className="_ininety">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="_Genttl"
          >
            <span>
              Search Flights
            </span>
          </motion.div>
          {[
            "SkyPort Destinations is one of the fastest-growing online travel platforms in Guyana, and a trusted name among modern-day travelers. We specialize in providing hassle-free flight booking services with competitive pricing and reliable support.",
            "We know that organizing a trip can be time-consuming and stressful, so SkyPort Destinations is designed to simplify your air travel from start to finish. Our intuitive platform offers a wide range of flight options tailored to your preferences—whether you’re flying for a family holiday, an adventurous solo trip, or a business visit.",
            "At SkyPort Destinations, transparency and customer satisfaction are at the heart of what we do. There are no hidden charges—our pricing is upfront and competitive. With SkyPort Destinations, you can rest assured that you’re getting the best airfare deals available.",
            "If you're searching for a reliable, affordable, and hassle-free way to book your next flight, choose SkyPort Destinations. Let us make your journey smooth, simple, and unforgettable."
          ].map((text, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="_abt_txt"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default AboutHome;
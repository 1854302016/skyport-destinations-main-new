import React from 'react'
import './Advantage.css'
import { motion } from "framer-motion";

const Advantage = () => {
  return (
    <section className="section benefit-section bg-light-300">
      <div className="container">
        <div className="row justify-content-center">
          <motion.div
            className="col-lg-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header text-center">
              <h2 className="mb-2 sections_h_fives">
                Our{" "}
                <span
                  className="text-decoration-underline"
                  style={{ color: "#CF3425" }}
                >
                  Benefits
                </span>{" "}
                &amp; Key Advantages
              </h2>
              <p className="sub-title">
                SkyPort, a tour operator specializing in dream destinations,
                offers a variety of benefits for travelers.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="row g-4">
          {[
            {
              icon: "/Images/Icons/esy-flights.svg",
              title: "Easy Booking",
              desc: 'Book Flights Easily and Grab Exciting Offers!"',
              color: "text-secondary"
            },
            {
              icon: "/Images/Icons/down-arrows.svg",
              title: "Lowest Price",
              desc: "Guaranteed Low Rates on Hotels, Holiday Packages, and Flights!",
              color: "text-orange"
            },
            {
              icon: "/Images/Icons/return-boxs.svg",
              title: "Instant Refund",
              desc: "Get Quick and Easy Refunds on All Your Travel Bookings!",
              color: "text-purple"
            },
            {
              icon: "/Images/Icons/24-hoursa.svg",
              title: "24/7 Support",
              desc: "24/7 Support for All Your Travel Queries — We're Here to Help!",
              color: "text-teal"
            }
          ].map((item, index) => (
            <div className="col-6 col-lg-3 d-flex" key={index}>
              <motion.div
                className="card benefit-card mb-0 flex-fill"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="card-body text-center">
                  <div className="benefit-icon mb-2  text-gray-9 mx-auto">
                    <img
                      src={item.icon}
                      className="isax isax-lock-1"
                      style={{ height: "32px" }}
                      color="#fff"
                      alt={item.title}
                    />
                  </div>
                  <h5 className="mb-2">{item.title}</h5>
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    {item.desc}
                  </p>
                  <span className={`icon-view ${item.color}`}>
                    <i className="isax isax-lock-1" />
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Advantage;
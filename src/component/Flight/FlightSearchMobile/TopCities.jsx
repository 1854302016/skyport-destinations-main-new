import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./TopCities.css";

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const tomorrowDate = getTomorrowDate();

const internationalDeals = [
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/0961c7b42f2ca80db9f21f3cc92ead20-mjvxq.webp",
    destinations: ["Dubai", "Paris", "Vancouver", "London"],
  },
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/4908135a0884d82aba928cc61ea10829-zxfmm.webp",
    destinations: ["Rome", "Abu Dhabi", "Cape Town", "Seoul"],
  },
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/85a1ec7f8c85db1c8574e407bb5893dc-cgjoa.webp",
    destinations: ["Honolulu", "Frankfurt", "Santorini", "Delhi"],
  },
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/6b26dab0b2ddaefe4a1854e4d0c0aa2b-ymcjd.webp",
    destinations: ["Miami", "Montreal", "Istanbul", "Kuala Lumpur"],
  },
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/01c0f855ac7608f63e6aa1bce4389d5a-wvnvc.webp",
    destinations: ["Singapore", "Shanghai", "Madrid", "Amsterdam"],
  },
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/3ad8f80d0c76536dfc29851458881c26-hsphw.webp",
    destinations: ["Los Angeles", "Frankfurt", "Doha", "Auckland"],
  },
];

const FlightRow = ({ img, origin, destinations, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2"
    >
      <div style={{ width: "50px", height: "60px", position: "relative" }}>
        <Image
          src={img}
          alt={`${origin} Flights`}
          width={50}
          height={60}
          className="object-cover"
        />
      </div>

      <div className="px-3 py-2">
        <p className="fw-bold mb-1" style={{ color: "#404040" }}>
          {origin} Flights
        </p>

        <div className="d-flex align-items-start gap-1 flex-wrap">
          <p className="text-muted mb-0">To:</p>

          {destinations.map((dest, i) => (
            <div key={i} className="d-flex flex-wrap gap-2">
              <Link
                to={`/flightList/org_GEO*dest_${dest.substring(0, 3).toUpperCase()}*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`}
                className="text-[#053355] text-decoration-none top_citires_forntt"
              >
                {dest}
              </Link>

              {i !== destinations.length - 1 && (
                <span className="text-[#053355]">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TopCities = () => {
  const [activeTab, setActiveTab] = useState("international");

  return (
    <div className="GI_OFFERS_B2C_IN_V2 TG__topCities">
      <div className="sc-1umf7nv-105 igBafX">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sc-1umf7nv-107 bIEKkd"
        >
          <h2 color="#222222" className="sc-jXbUNg dRpmLD">
            Popular Flight Routes
          </h2>

          <ul className="sc-1umf7nv-111 kFlkOL" style={{ marginBottom: "15px" }}>
            <li
              className={`sc-1umf7nv-112 eqzCTD ${activeTab === "international" ? "active" : ""}`}
              onClick={() => setActiveTab("international")}
            >
              International Flights
            </li>
          </ul>
        </motion.div>

        {internationalDeals.map((item, index) => (
          <FlightRow
            key={index}
            index={index}
            img={item.img}
            origin={item.origin}
            destinations={item.destinations}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCities;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuotePopup from "./QuotePopup";
import ListsSkelton from "./ListsSkelton";
import { FaStar, FaRegClock, FaUsers, FaRegHeart } from "react-icons/fa";
import { HiOutlineMap } from "react-icons/hi";
import { motion } from "framer-motion";

const SingleList = ({ data, isModifySearch }) => {
  const [show, setShow] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const handleShow = (id) => {
    setSelectedPackageId(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedPackageId(null);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="tour-list-wrapper">
      {data.length !== 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="tour-grid"
        >
          {data.map((item) => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="tour-card-premium" 
              key={item.id}
            >
              <button className="wishlist-btn">
                <FaRegHeart />
              </button>

              <Link to={`${item.slug}`} className="card-img-box overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={item.image || "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg"}
                  alt={item.image_alt || item.name}
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="img-overlay-elegant"></div>
              </Link>

              <div className="card-body-premium">
               

                <Link to={`${item.slug}`} className="text-decoration-none">
                  <h3 className="card-title-premium">{item.name}</h3>
                </Link>

                <div className="card-info-row">
                  <div className="info-item">
                    <FaRegClock />
                    <span>{item.no_of_days} Days</span>
                  </div>
                  <div className="info-item">
                    <FaUsers />
                    <span>0 - 15 Passengers</span>
                  </div>
                </div>

                <div className="card-divider-premium"></div>

                <div className="card-footer-premium">
                  <div className="price-wrap-premium">
                    <span className="price-from">Price from</span>
                    <div className="price-value-premium">
                      ${item.offer_price} <span className="per-person">/person</span>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#053355", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                    className="map-btn-icon"
                    onClick={() => handleShow(item.id)}
                    title="Get Quotes"
                  >
                    <HiOutlineMap />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : isModifySearch ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="no-data-message text-center py-5 text-muted"
        >
          <img 
            src="https://images.emtcontent.com/holiday-img/home-img/no-package.svg" 
            alt="No Data" 
            style={{ width: "120px", marginBottom: "20px", opacity: 0.5 }}
          />
          <h4>No Packages Found</h4>
          <p>Try adjusting your filters or departure city.</p>
        </motion.div>
      ) : (
        <div className="tour-grid">
          <ListsSkelton />
          <ListsSkelton />
          <ListsSkelton />
        </div>
      )}
      <QuotePopup show={show} handleClose={handleClose} packageId={selectedPackageId} />
    </div>
  );
};

export default SingleList;
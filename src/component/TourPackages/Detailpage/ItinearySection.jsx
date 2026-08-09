import React, { useState } from "react";
import { FaUtensils, FaCheckCircle } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./css/ItinearySection.css";

const ItinearySection = ({ data }) => {
    const [activeTab, setActiveTab] = useState(null);

    const toggleTab = (id) => {
        setActiveTab(activeTab === id ? null : id);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="itinerary-modern-container"
        >
            <motion.h2 variants={itemVariants} className="section-title">Tour Itinerary</motion.h2>
            <div className="itinerary-timeline">
                {data.packagedetail.package_itinerary.map((item, index) => (
                    <motion.div 
                        variants={itemVariants}
                        className={`timeline-item ${activeTab === item.id ? 'active' : ''}`} 
                        key={item.id}
                    >
                        <div className="timeline-day-marker">
                            <motion.span 
                                whileHover={{ scale: 1.2 }}
                                className="day-number"
                            >
                                {index + 1}
                            </motion.span>
                            <div className="timeline-line"></div>
                        </div>
                        <div className="timeline-content-card">
                            <div className="card-header-toggle" onClick={() => toggleTab(item.id)}>
                                <div className="header-text">
                                    <span className="day-label">Day {index + 1}</span>
                                    <h3 className="itinerary-item-title">{item.title}</h3>
                                </div>
                                <span className="toggle-icon">
                                    {activeTab === item.id ? <FiMinusCircle /> : <FiPlusCircle />}
                                </span>
                            </div>
                            
                            <AnimatePresence>
                                {activeTab === item.id && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="card-body-content overflow-hidden"
                                    >
                                        <div className="itinerary-details" dangerouslySetInnerHTML={{ __html: item.details }}></div>
                                        {item.foodtype && (
                                            <div className="itinerary-meals mt-3">
                                                <FaUtensils /> <span>Included Meals: {item.foodtype.replace(/,/g, ', ')}</span>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="itinerary-footer-sections mt-5">
                <motion.div variants={itemVariants} className="footer-block inclusions-block mb-4">
                    <h3 className="sub-section-title">Inclusions</h3>
                    <ul className="modern-list">
                        {data.packagedetail.package_inclusions.map((item, i) => (
                            item && <li key={i}><FaCheckCircle className="icon-check" /> <span dangerouslySetInnerHTML={{ __html: item }}></span></li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div variants={itemVariants} className="footer-block exclusions-block">
                    <h3 className="sub-section-title">Exclusions</h3>
                    <ul className="modern-list exclusion-list">
                        {data.packagedetail.package_exclusions.map((item, i) => (
                            item && <li key={i}><span className="icon-cross">×</span> <span dangerouslySetInnerHTML={{ __html: item }}></span></li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ItinearySection;

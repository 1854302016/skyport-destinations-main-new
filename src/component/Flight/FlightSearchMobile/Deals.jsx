import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { IoLocationSharp, IoTimeOutline, IoFlash } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import './Deals.css'

const Deals = () => {
    const swiperRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const tomorrow = new Date();
            tomorrow.setHours(24, 0, 0, 0);
            const diff = tomorrow - now;

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${hours.toString().padStart(2, "0")}h : ${minutes.toString().padStart(2, "0")}m : ${seconds.toString().padStart(2, "0")}s`);
        };
        updateTimer();
        const timerId = setInterval(updateTimer, 1000);
        return () => clearInterval(timerId);
    }, []);

    const deals = [
        { route: "Mumbai → Dubai", dates: "12 Feb - 18 Feb", price: "24,500", airline: "Indigo", logo: "6E.gif" },
        { route: "Delhi → London", dates: "15 Mar - 22 Mar", price: "58,200", airline: "Air India", logo: "AI.gif" },
        { route: "Bangalore → Singapore", dates: "05 Apr - 10 Apr", price: "18,900", airline: "Singapore Air", logo: "SQ.gif" },
        { route: "Chennai → Colombo", dates: "20 Feb - 25 Feb", price: "12,400", airline: "SriLankan", logo: "UL.gif" },
        { route: "Mumbai → New York", dates: "10 May - 25 May", price: "88,000", airline: "Emirates", logo: "EK.gif" },
    ];

    return (
        <section className="deals-refined-section">
            <Container>
                <div className="deals-header-refined">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="title-area"
                    >
                        <h2>Daily <span className="flash-text"><IoFlash style={{ marginBottom: '4px' }} /> Flash Deals</span></h2>
                        <div className="location-info">
                            <IoLocationSharp size={14} /> Best Fares from Mumbai hub
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="timer-pill-box"
                    >
                        <span className="timer-label">Hurry! Ends In</span>
                        <div className="timer-value">
                            <IoTimeOutline size={18} /> {timeLeft}
                        </div>
                    </motion.div>
                </div>

                <div style={{ position: "relative" }}>
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        slidesPerView={2}
                        spaceBetween={10}
                        autoplay={{ delay: 4500 }}
                        loop={true}
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 3, spaceBetween: 15 },
                            1024: { slidesPerView: 5, spaceBetween: 20 }
                        }}
                        onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    >
                        {deals.map((deal, index) => (
                            <SwiperSlide key={index}>
                                <motion.div 
                                    whileHover={{ y: -10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="flight-deal-card"
                                >
                                    <div className="deal-info-top">
                                        <h3 className="deal-title">{deal.route}</h3>
                                        <span className="deal-dates">{deal.dates}</span>
                                    </div>
                                    
                                    <div className="deal-divider"></div>

                                    <div className="deal-price-section">
                                        <span className="price-label">Starts from</span>
                                        <span className="price-value">${deal.price}</span>
                                    </div>
                                    
                                    <div className="airline-info">
                                        <img 
                                            src={`/Images/AirlineLogo/${deal.logo}`} 
                                            alt={deal.airline} 
                                            className="airline-logo deal_images_logo"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/32?text=✈️"} 
                                        />
                                        <span className="airline-name">{deal.airline}</span>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </section>
    );
};

export default Deals;


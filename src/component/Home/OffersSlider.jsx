import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Container } from "react-bootstrap";
import { FaArrowRight, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./HomeHeroRefined.css";

const OffersSlider = () => {
    const slides = [
        { 
            img: "https://www.goindigo.in/content/dam/s6web/in/en/assets/target/kotak-banners/Kotak-Banners-Homepage-Web-3x.jpg",
            title: "Kotak Bank Special",
            desc: "Flat 12% OFF on domestic flights",
            code: "KOTAK12",
            category: "Bank Offer"
        },
        { 
            img: "https://images.ixigo.com/image/upload/Bob/6bc067af18738201bb50d438d9c0a8aa-lemwd.png",
            title: "BOB Credit Cards",
            desc: "Get up to ₹2500 instant discount",
            code: "BOBFLY",
            category: "Credit Card"
        },
        { 
            img: "https://www.goindigo.in/content/dam/s6web/in/en/assets/target/d2c/3x_V1---WEB---tile-2.jpg",
            title: "Early Bird Deal",
            desc: "Book 30 days in advance & save",
            code: "EARLYBIRD",
            category: "Advance Booking"
        },
        { 
            img: "https://images.ixigo.com/image/upload/offers_and_deals/edef9344f0455dcf862ff444857b679e-pfxin.webp",
            title: "Global Gateways",
            desc: "Explore Europe with 15% discount",
            code: "GLOBE15",
            category: "International"
        },
        { 
            img: "http://www.goindigo.in/content/dam/s6web/in/en/assets/D2C/target/Desktop_bluchip.jpg",
            title: "Business Class Plus",
            desc: "Extra baggage & lounge access",
            code: "PREMIUM",
            category: "Luxury"
        },
    ];

    return (
        <section className="offers-refined-section">
            <Container>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="offers-header"
                >
                    <div className="title-area">
                        <h2>Exclusive <span>Offers & Deals</span></h2>
                        <p className="subtitle">Curated discounts for your next adventure</p>
                    </div>
                    <motion.a 
                        href="/offers" 
                        className="view-all-premium"
                        whileHover={{ x: 5 }}
                    >
                        View All Offers <FaArrowRight fontSize="13" />
                    </motion.a>
                </motion.div>

                <div className="offers-slider-container position-relative">
                    <Swiper
                        modules={[Navigation, Autoplay, Pagination, EffectCoverflow]}
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation={{
                            prevEl: '.offers-prev',
                            nextEl: '.offers-next',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 }
                        }}
                        className="offers-swiper-main"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <motion.div 
                                    className="offer-card-glass"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -12 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="offer-image-wrap">
                                        <img src={slide.img} alt={slide.title} />
                                        <div className="offer-category-badge">{slide.category}</div>
                                    </div>
                                    <div className="offer-content-pax">
                                        <div className="offer-meta">
                                            <h3>{slide.title}</h3>
                                            <p>{slide.desc}</p>
                                        </div>
                                        <div className="offer-footer-pax">
                                            <div className="promo-code-pill">
                                                <FaTag className="tag-icon" /> <span>{slide.code}</span>
                                            </div>
                                            <button className="book-btn-mini">Grab Now</button>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Custom Navigation Arrows */}
                    <button className="offers-nav-btn offers-prev"><FaChevronLeft /></button>
                    <button className="offers-nav-btn offers-next"><FaChevronRight /></button>
                </div>
            </Container>
        </section>
    );
};

export default OffersSlider;


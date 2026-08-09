import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./HomeHeroRefined.css";

const date = new Date();
date.setDate(date.getDate() + 2);

// Format as YYYY-MM-DD
const formattedDate = date.toISOString().split('T')[0];


const destinationsData = [
    {
        id: 1,
        name: "Dubai",
        slug: `https://skyportdestinations.com/flightList/dest_DXB*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/8612083/pexels-photo-8612083.jpeg",
        description: "Explore vast landscapes, iconic architecture, and rich cultural heritage across Dubai historic cities.",
        price: "78,500",
        tagline: "Discover the vast beauty of"
    },
    {
        id: 2,
        name: "Germany",
        slug: `https://skyportdestinations.com/flightList/dest_FRA*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/31542272/pexels-photo-31542272.jpeg",
        description: "Experience Germany’s blend of modern cities, medieval towns, and world-renowned culture.",
        price: "72,300",
        tagline: "Experience innovation in"
    },
    {
        id: 3,
        name: "Finland",
        slug: `https://skyportdestinations.com/flightList/dest_RVN*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/31539348/pexels-photo-31539348.jpeg",
        description: "Discover serene lakes, northern lights, and the peaceful charm of Finland’s Nordic lifestyle.",
        price: "81,900",
        tagline: "Embrace nature in"
    },
    {
        id: 4,
        name: "Denmark",
        slug: `https://skyportdestinations.com/flightList/dest_CPH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/17492661/pexels-photo-17492661.jpeg",
        description: "Visit Denmark for its scenic coastlines, cycling culture, and timeless Scandinavian design.",
        price: "76,400",
        tagline: "Feel the charm of"
    },
    {
        id: 5,
        name: "Georgia",
        slug: `https://skyportdestinations.com/flightList/dest_TBS*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/33133738/pexels-photo-33133738.jpeg",
        description: "Explore mountains, ancient churches, and vibrant traditions in the crossroads of Europe and Asia.",
        price: "64,800",
        tagline: "Uncover traditions in"
    },
    {
        id: 6,
        name: "Greece",
        slug: `https://skyportdestinations.com/flightList/dest_ATH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/29986796/pexels-photo-29986796.jpeg",
        description: "Travel through ancient history, stunning islands, and Mediterranean beauty in Greece.",
        price: "69,500",
        tagline: "Step into history in"
    },
    {
        id: 7,
        name: "Austria",
        slug: `https://skyportdestinations.com/flightList/dest_VIE*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/20807992/pexels-photo-20807992.jpeg",
        description: "Enjoy alpine landscapes, classical music heritage, and elegant cities across Austria.",
        price: "74,200",
        tagline: "Feel the elegance of"
    },
    {
        id: 8,
        name: "Europe",
        slug: `https://skyportdestinations.com/flightList/dest_LHR*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/34431003/pexels-photo-34431003.jpeg",
        description: "Explore the diverse cultures, iconic landmarks, and unforgettable journeys across Europe.",
        price: "85,000",
        tagline: "Explore the wonders of"
    },
    {
        id: 9,
        name: "Azerbaijan",
        slug: `https://skyportdestinations.com/flightList/dest_GYD*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/33516982/pexels-photo-33516982.jpeg",
        description: "Discover the Land of Fire with its modern skyline, ancient history, and unique cultural blend.",
        price: "58,700",
        tagline: "Experience the fusion in"
    },
    {
        id: 10,
        name: "France",
        slug: `https://skyportdestinations.com/flightList/dest_CDG*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/32734935/pexels-photo-32734935.jpeg",
        description: "Visit France for its world-famous cuisine, art, fashion, and timeless romantic charm.",
        price: "82,600",
        tagline: "Indulge in elegance in"
    },
    {
        id: 11,
        name: "Japan",
        slug: `https://skyportdestinations.com/flightList/dest_HND*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        category: "International",
        img: "https://images.pexels.com/photos/36495795/pexels-photo-36495795.jpeg",
        description: "Explore Japan’s perfect blend of tradition and technology, from temples to futuristic cities.",
        price: "95,400",
        tagline: "Step into the future in"
    }
];

const PopularDestinations = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("ALL DESTINATIONS");
    const [activeId, setActiveId] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const activeDest = destinationsData.find(d => d.id === activeId) || destinationsData[0];
    
    // The grid should show destinations excluding the active one
    const filteredQuickList = (activeCategory === "ALL DESTINATIONS" 
        ? destinationsData 
        : destinationsData.filter(d => d.category.toUpperCase() === activeCategory.toUpperCase()))
        .filter(d => d.id !== activeId).slice(0, 4);

    // Autoplay Logic
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                const currentFiltered = activeCategory === "ALL DESTINATIONS" 
                    ? destinationsData 
                    : destinationsData.filter(d => d.category.toUpperCase() === activeCategory.toUpperCase());
                
                if (currentFiltered.length > 1) {
                    const currentIndex = currentFiltered.findIndex(d => d.id === activeId);
                    const nextIndex = (currentIndex + 1) % currentFiltered.length;
                    setActiveId(currentFiltered[nextIndex].id);
                }
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [activeId, isAutoPlaying, activeCategory]);

    const handleNavigate = (slug) => {
        navigate(`${slug}`);
    };

    return (
        <section className="pop-dest-section-v2" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
            <Container>
                {/* Header Area */}
                <div className="v2-header">
                    <div className="title-area">
                        <h2 className="v2-title">Popular <span>Destinations</span></h2>
                        <p className="subtitle">Curated world-class destinations with exceptional fares and luxury stays</p>
                    </div>
                    <div className="v2-tabs-wrap">
                        {["ALL DESTINATIONS", "INTERNATIONAL"/* , "DOMESTIC" */].map((tab) => (
                            <button 
                                key={tab}
                                className={`v2-tab ${activeCategory === tab ? "is-active" : ""}`}
                                onClick={() => {
                                    setActiveCategory(tab);
                                    const firstInCat = tab === "ALL DESTINATIONS" ? destinationsData[0] : destinationsData.find(d => d.category.toUpperCase() === tab);
                                    if(firstInCat) setActiveId(firstInCat.id);
                                }}
                            >
                                {tab}
                                {activeCategory === tab && <div className="v2-indicator" />}
                            </button>
                        ))}
                        <Link to="/tour" className="v2-view-all">View All</Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="v2-showcase">
                    <div className="v2-left-hero" style={{ cursor: "pointer" }} onClick={() => handleNavigate(activeDest.slug)}>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeDest.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="v2-hero-card"
                            >
                                <img src={activeDest.img} alt={activeDest.name} />
                                <div className="v2-hero-overlay">
                                    <h3>{activeDest.name}</h3>
                                    <p>Starting ${activeDest.price}/-</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="v2-right-content">
                        <div className="v2-description-wrap">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDest.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="v2-text-box"
                                >
                                    <span className="v2-script">{activeDest.tagline}</span>
                                    <h1 className="v2-city-name">{activeDest.name} ,</h1>
                                    <p className="v2-para">{activeDest.description}</p>
                                    <button className="v2-cta" onClick={() => handleNavigate(activeDest.slug)}>View Details</button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <motion.div 
                            className="v2-grid-row"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {filteredQuickList.map((dest) => (
                                <motion.div 
                                    key={dest.id} 
                                    className="v2-mini-card"
                                    onClick={() => handleNavigate(dest.slug)}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.9 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="v2-mini-img-box">
                                        <img src={dest.img} alt={dest.name} />
                                        <div className="v2-mini-label">
                                            <h4>{dest.name}</h4>
                                            <span>Starting at ${dest.price}/-</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="v2-controls">
                            <button 
                                className="v2-nav-btn prev" 
                                title="Previous Destination"
                                aria-label="Previous Destination"
                                onClick={() => {
                                    const currentFiltered = activeCategory === "ALL DESTINATIONS" ? destinationsData : destinationsData.filter(d => d.category.toUpperCase() === activeCategory.toUpperCase());
                                    const currentIndex = currentFiltered.findIndex(d => d.id === activeId);
                                    const prevIndex = (currentIndex - 1 + currentFiltered.length) % currentFiltered.length;
                                    setActiveId(currentFiltered[prevIndex].id);
                                }}
                            >
                                <FaChevronLeft />
                            </button>
                            <button 
                                className="v2-nav-btn next" 
                                title="Next Destination"
                                aria-label="Next Destination"
                                onClick={() => {
                                    const currentFiltered = activeCategory === "ALL DESTINATIONS" ? destinationsData : destinationsData.filter(d => d.category.toUpperCase() === activeCategory.toUpperCase());
                                    const currentIndex = currentFiltered.findIndex(d => d.id === activeId);
                                    const nextIndex = (currentIndex + 1) % currentFiltered.length;
                                    setActiveId(currentFiltered[nextIndex].id);
                                }}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};


export default PopularDestinations;

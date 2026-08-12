import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "./PopularDestinationMobile.css";

const date = new Date();
date.setDate(date.getDate() + 2);

// Format as YYYY-MM-DD
const formattedDate = date.toISOString().split('T')[0];

const destinationsData = [
    {
        id: 1,
        name: "Dubai",
        slug: `https://trustedfare.com/flightList/dest_DXB*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        img: "https://images.pexels.com/photos/8612083/pexels-photo-8612083.jpeg",
        price: "78,500",
        tagline: "Vast Landscapes"
    },
    {
        id: 2,
        name: "Germany",
        slug: `https://trustedfare.com/flightList/dest_FRA*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        img: "https://images.pexels.com/photos/31542272/pexels-photo-31542272.jpeg",
        price: "72,300",
        tagline: "Modern Heritage"
    },
    {
        id: 3,
        name: "Finland",
        slug: `https://trustedfare.com/flightList/dest_RVN*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        img: "https://images.pexels.com/photos/31539348/pexels-photo-31539348.jpeg",
        price: "81,900",
        tagline: "Northern Lights"
    },
    {
        id: 4,
        name: "Denmark",
        slug: `https://trustedfare.com/flightList/dest_CPH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        img: "https://images.pexels.com/photos/17492661/pexels-photo-17492661.jpeg",
        price: "76,400",
        tagline: "Coastal Charm"
    },
    {
        id: 5,
        name: "Greece",
        slug: `https://trustedfare.com/flightList/dest_ATH*org_GEO*dep_${formattedDate}*arr_${formattedDate}*px_1-0-0*jt_1*cbn_2`,
        img: "https://images.pexels.com/photos/29986796/pexels-photo-29986796.jpeg",
        price: "69,500",
        tagline: "Ancient Beauty"
    }
];

const PopularDestinationMobile = () => {
    const navigate = useNavigate();

    const handleNavigate = (slug) => {
        navigate(`${slug}`);
    };

    return (
        <div className="pop-dest-mobile-wrap">
            <div className="section-header-mobile">
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="pop-dest-title-mb"
                >
                    Popular <span>Destinations</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="pop-dest-subtitle-mb"
                >
                    Discover the world's most sought-after places
                </motion.p>
            </div>

            <div className="swiper-container-mobile">
                <Swiper
                    grabCursor={true}
                    effect={"creative"}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ["-120%", 0, -500],
                        },
                        next: {
                            shadow: true,
                            translate: ["120%", 0, -500],
                        },
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, EffectCreative]}
                    className="pop-swiper-mb"
                >
                    {destinationsData.map((dest) => (
                        <SwiperSlide key={dest.id} className="pop-slide-mb" onClick={() => handleNavigate(dest.slug)}>
                            <div className="pop-card-mb">
                                <div className="pop-img-wrap-mb">
                                    <img src={dest.img} alt={dest.name} />
                                    <div className="pop-overlay-mb">
                                        <div className="pop-info-mb">
                                            <span className="pop-tag-mb">{dest.tagline}</span>
                                            <h3 className="pop-city-mb">{dest.name}</h3>
                                            <div className="pop-price-box-mb">
                                                <span className="pop-price-label-mb">Starting at</span>
                                                <span className="pop-price-value-mb">${dest.price}</span>
                                            </div>
                                        </div>
                                        <div className="pop-btn-mb">
                                            Explore
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default PopularDestinationMobile;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShieldAlt, FaPercent, FaHeadset, FaPlaneDeparture } from 'react-icons/fa';
import "./HomeHeroRefined.css";

const WhyBook = () => {
    const reasons = [
        {
            icon: <FaShieldAlt size={26} />,
            title: "Assured Protection",
            desc: "Instant & secure bookings with comprehensive cancellation coverage."
        },
        {
            icon: <FaPlaneDeparture size={26} />,
            title: "Best Fare Guarantee",
            desc: "Unbeatable airline prices and exclusive negotiated route deals."
        },
        {
            icon: <FaPercent size={26} />,
            title: "Exclusive Deals",
            desc: "Access member rates, special promo coupons, and seasonal discounts."
        },
        {
            icon: <FaHeadset size={26} />,
            title: "24/7 Concierge Support",
            desc: "Dedicated international travel experts available whenever you need us."
        }
    ];

    return (
        <section className="why-book-refined">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="gallery-main-title">
                        Why Book With <span className="text-highlight">Trusted Fare</span>
                    </h2>
                    <div className="title-sep-modern"></div>
                    <p className="subtitle">Your trusted partner for seamless journeys and premium fares worldwide</p>
                </div>

                <Row>
                    {reasons.map((item, index) => (
                        <Col lg={3} md={6} key={index} className="mb-4">
                            <div className="why-pillar-card">
                                <div className="why-pillar-icon">
                                    {item.icon}
                                </div>
                                <h3 className="why-pillar-title">
                                    {item.title}
                                </h3>
                                <p className="why-pillar-desc">
                                    {item.desc}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default WhyBook;

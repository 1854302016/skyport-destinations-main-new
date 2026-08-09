import React, { useRef, useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineSafety } from "react-icons/ai";
import { TbCalendarCancel } from "react-icons/tb";
import { BsCash } from "react-icons/bs";
import { GrCertificate } from "react-icons/gr";
import { Ri24HoursFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Testimonial from "../Uttarakhand/Testimonial";
import QueryForm from "../Uttarakhand/QueryForm";
import LadakhPackages from "./LadakhPackages";
import Reuse from "../Uttarakhand/Reuse";

const safetyFeatures = [
  {
    icon: <AiOutlineSafety className="safe-icon" />,
    label: "Safe Travel",
  },
  {
    icon: <TbCalendarCancel className="safe-icon" />,
    label: "Flexible Cancellation",
  },
  {
    icon: <BsCash className="safe-icon" />,
    label: "Easy EMI",
  },
  {
    icon: <GrCertificate className="safe-icon" />,
    label: "Certified Professionals",
  },
  {
    icon: <Ri24HoursFill className="safe-icon" />,
    label: "24/7 Support",
  },
];

const Ladakh = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const destinationRef = useRef(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const destination = destinationRef.current.value.trim();

    if (
      !name ||
      !/^\d{10}$/.test(phone) ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      !destination
    ) {
      setError("Please fill all fields correctly");
      return;
    }
    setError("");
    console.log({ name, phone, email, destination });
  };
  const reflink = useRef(null);
  const handleContinueClick = () => {
    setTimeout(() => {
      reflink.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };
  return (
    <div className="uttarakhand-MainPage">
      <div className="uttarakhand-SubMainPage">
        <div className="uttarakhand-Header">
          <div>
            <img
              className="uttarakhand-Logo"
              src="/Images/Images/tripgoo.png"
              alt=""
            />
          </div>
          <div>
            <button className="uttarakhand-RequestCB-btn">
              <LuPhoneCall />
              <Link
                to="tel:+919211252356"
                style={{ paddingLeft: "8px", color: "#fff" }}
              >
                +91-9211252356
              </Link>
            </button>
          </div>
        </div>
        <Reuse head="Ladakh" img="/Images/Images/ladakhbg.jpg" />
        <LadakhPackages handleContinueClick={handleContinueClick} />

        {/* Key Inclusions of Uttarakhand Package */}
        <div className="uttarakhand-KeyInclusions-Main">
          <div className="uttarakhand-KeyInclusions">
            <div className="uttarakhand-KeyInclusionsImage">
              <img src="/Images/Images/bg2.jpg" alt="" />
            </div>
            <div className="uttarakhand-KeyInclusionsContent">
              <h5>Key Inclusions of Ladakh Package</h5>
              <p>
                Embark on a Ladakh journey with convenient round-trip transfers,
                comfortable hotel stays in serene hill stations and scenic
                valleys, guided sightseeing tours, nature walks, temple visits,
                and adventure activities. Enjoy hassle-free travel and
                comprehensive travel insurance for peace of mind.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "50px" }}>
          <Row>
            {safetyFeatures.map((item, index) => (
              <Col key={index} className="uttarakhand-Safe_TravelWrapper">
                <div className="uttarakhand-Safe_Travel">{item.icon}</div>
                <div className="uttarakhand-Safe_TravelText">{item.label}</div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="Uttarakhand-AboutBharat">
          <div className="Uttarakhand-About">About Holiday TripGo</div>
          <p>
            Founded by a seasoned team with 10+ years of experience, TripGo
            Booking specializes in crafting unforgettable Ladakh adventures. We
            offer carefully curated travel packages that blend comfort, culture,
            and breathtaking Himalayan landscapes. From rugged mountain passes
            to serene monasteries, our Ladakh itineraries are designed to give
            Indian travelers a seamless, safe, and soulful journey—supported by
            expert guidance and personalized service.
          </p>
        </div>
      </div>
      <QueryForm reflink={reflink} />
      <div>
        <Testimonial />
      </div>
      <div className="footer_copywrite_tg">
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div className="css-11ze7cv">
                <div className="css-u4p24i" style={{ marginBottom: "10px" }}>
                  <Link
                    to="https://instagram.com/tripgo_online?igshid=YmMyMTA2M2Y="
                    target="_blank"
                  >
                    <img
                      alt="instagram"
                      loading="lazy"
                      src="/Images/Icons/instagram.png"
                      className="footer_socials_imagess"
                      style={{ color: "transparent", marginRight: 8 }}
                    />
                  </Link>
                  <Link
                    to="https://www.facebook.com/TravelTGO/"
                    target="_blank"
                  >
                    <img
                      alt="Facebook"
                      loading="lazy"
                      src="/Images/Icons/fb.png"
                      className="footer_socials_imagess"
                      style={{ color: "transparent", marginRight: 8 }}
                    />
                  </Link>
                  <Link to="https://twitter.com/tripgoonline" target="_blank">
                    <img
                      alt="twitter"
                      loading="lazy"
                      src="/Images/Icons/twitter.png"
                      className="footer_socials_imagess"
                      style={{ color: "transparent", marginRight: 8 }}
                    />
                  </Link>
                </div>
                <h2 className="css-1p4by0y">
                  © Copyrights SkyPort Destinations| All rights reserved
                </h2>
              </div>
            </div>

            <div className=" css-j7qwjs">
              <div className="mb-3 css-11ze7cv">
                <h2 style={{ textAlign: "end" }} className="css-1p4by0y">
                  Security &amp; Payments
                </h2>
                <div className="MuiStack-root css-u4p24i">
                  <img
                    alt="Ico Secured Sites"
                    className="footer_security_imagess"
                    loading="lazy"
                    src="https://www.yatra.com/react-home/images/securityPayments/icoSecuredSites.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="Veri sign secured"
                    loading="lazy"
                    className="footer_security_imagess"
                    src="https://www.yatra.com/react-home/images/securityPayments/veriSignSecured.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="Net Banking"
                    loading="lazy"
                    className="footer_security_imagess"
                    src="https://www.yatra.com/react-home/images/securityPayments/netBanking.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="Easy Emi option"
                    loading="lazy"
                    className="footer_security_imagess"
                    src="https://www.yatra.com/react-home/images/securityPayments/emiOption.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="Visa Card"
                    loading="lazy"
                    className="footer_security_imagess"
                    src=" https://www.yatra.com/react-home/images/securityPayments/visa.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="Master Card"
                    loading="lazy"
                    className="footer_security_imagess"
                    src="https://www.yatra.com/react-home/images/securityPayments/masterCard.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="Rupay Card"
                    loading="lazy"
                    className="footer_security_imagess"
                    src="https://www.yatra.com/react-home/images/securityPayments/rupay.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="Diners Club"
                    loading="lazy"
                    className="footer_security_imagess"
                    src="https://www.yatra.com/react-home/images/securityPayments/dinersClub.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                  <img
                    alt="American Express"
                    loading="lazy"
                    className="footer_security_imagess"
                    src="https://www.yatra.com/react-home/images/securityPayments/americanExpress.svg"
                    style={{ color: "transparent", marginRight: 16 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Ladakh;

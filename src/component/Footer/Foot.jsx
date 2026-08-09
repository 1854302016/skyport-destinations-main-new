import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Foot.css";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import SignUp from "../Navbar/SignUp";

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const tomorrowDate = getTomorrowDate();

const Foot = () => {
  const domestic = [
    {
      ori: "Delhi",
      desti: "Goa",
      link: `/flightList/dest_GOI*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Mumbai",
      desti: "Delhi",
      link: `/flightList/dest_DEL*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Kolkata",
      link: `/flightList/dest_CCU*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Pune",
      desti: "Delhi",
      link: `/flightList/dest_DEL*org_PNQ*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Bangalore",
      desti: "Delhi",
      link: `/flightList/dest_DEL*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Mumbai",
      desti: "Bangalore",
      link: `/flightList/dest_BLR*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Chennai",
      desti: "Delhi",
      link: `/flightList/dest_DEL*org_MAA*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Kolkata",
      desti: "Delhi",
      link: `/flightList/dest_DEL*org_CCU*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Mumbai",
      link: `/flightList/dest_BOM*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Bangalore",
      link: `/flightList/dest_BLR*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Mumbai",
      desti: "Goa",
      link: `/flightList/dest_GOI*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
  ];
  const international = [
    {
      ori: "Delhi",
      desti: "Singapore",
      link: `/flightList/dest_SIN*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Bangkok",
      link: `/flightList/dest_BKK*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Mumbai",
      desti: "Dubai",
      link: `/flightList/dest_DXB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Dubai",
      link: `/flightList/dest_DXB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "London",
      link: `/flightList/dest_LHR*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Toronto",
      link: `/flightList/dest_YYZ*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "New York",
      link: `/flightList/dest_JFK*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Bangalore",
      desti: "Singapore",
      link: `/flightList/dest_SIN*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Paris",
      link: `/flightList/dest_CDG*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Mumbai",
      desti: "Paris",
      link: `/flightList/dest_CDG*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
    {
      ori: "Delhi",
      desti: "Hong Kong",
      link: `/flightList/dest_HKG*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
    },
  ];

  const hotels = [
    { city: "Goa", link: "/hotels/hotels-in-goa" },
    { city: "Mumbai", link: "/hotels/hotels-in-mumbai" },
    { city: "Bangalore", link: "/hotels/hotels-in-bangalore" },
    { city: "Chennai", link: "/hotels/hotels-in-chennai" },
    { city: "Nainital", link: "/hotels/hotels-in-nainital" },
    { city: "Jaipur", link: "/hotels/hotels-in-jaipur" },
    { city: "Manali", link: "/hotels/hotels-in-manali" },
    { city: "Shimla", link: "/hotels/hotels-in-shimla" },
    { city: "Pune", link: "/hotels/hotels-in-pune" },
    { city: "Hyderabad", link: "/hotels/hotels-in-hyderabad" },
    { city: "Mahabaleshwar", link: "/hotels/hotels-in-mahabaleshwar" },
    { city: "Ooty", link: "/hotels/hotels-in-ooty" },
    { city: "Kolkata", link: "/hotels/hotels-in-kolkata" },
    { city: "Matheran", link: "/hotels/hotels-in-matheran" },
    { city: "Shirdi", link: "/hotels/hotels-in-shirdi" },
    { city: "Agra", link: "/hotels/hotels-in-agra" },
    { city: "Mysore", link: "/hotels/hotels-in-mysore" },
    { city: "Munnar", link: "/hotels/hotels-in-munnar" },
    { city: "Delhi", link: "/hotels/hotels-in-new-delhi" },
    { city: "Kodaikanal", link: "/hotels/hotels-in-kodaikanal" },
  ];

  const internationalHolidayPackages = [
    { title: "Dubai " },
    { title: "Malaysia " },
    { title: "Singapore" },
    { title: "Thailand " },
    { title: "Bali" },
    { title: "Srilanka " },
    { title: "Europe " },
    { title: "Mauritius" },
    { title: "Maldives" },
  ];
  const holidayPackages = [
    { title: "Kashmir Holiday" },
    { title: "Leh Ladakh" },
    { title: "Goa Holidays" },
    { title: "Andaman Holidays" },
    { title: "Kerala " },
    { title: "Himachal" },
  ];
  const footerLinks = [
    { title: "About Us", link: "/about-us" },
    { title: "Privacy Policy", link: "" },
    { title: "Terms & Conditions", link: "" },
    { title: "Contact Us", link: "/contact" },
    { title: "Offers", link: "/offers" },
  ];

  const nav = [
    { title: "Book Flight", link: "/" },
    { title: "Hotel Booking", link: "/hotel" },
    { title: "Tour Packages", link: "/tour" },
    { title: "Bus", link: "/buses" },

    { title: "Cabs", link: "/cabs" },
    { title: "Insurance", link: "/insurance" },
    { title: "Forex", link: "/forex" },
    { title: "Visa", link: "/visa" },
  ];

  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    // logout();
  };
  // const { isAuthenticated, logout } = useAuth();

  const [openIndex, setOpenIndex] = useState(null); // Only one active index

  const toggleSection = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index)); // Close if same, open new
  };
  const sections = [
    // {
    //   title: "Our Products",
    //   links: nav.map((link) => ({
    //     text: link.title,
    //     href: link.link || "#",
    //   })),
    // },
    {
      title: "SPD Info",
      links: footerLinks.map((link) => ({
        text: link.title,
        href: link.link || "#",
      })),
    },
    {
      title: "Popular Flight Routes",
      links: domestic.map((item) => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
    }
    // {
    //   title: "Popular International Flight Routes",
    //   links: international.map((item) => ({
    //     text: `${item.ori} to ${item.desti} Flights`,
    //     href: item.link,
    //   })),
    // },
    // {
    //   title: "Popular Hotels",
    //   links: hotels.map((hotel) => ({
    //     text: `${hotel.city} Hotels`,
    //     href: hotel.link,
    //   })),
    // },
    // {
    //   title: "Popular Domestic Tour Package",
    //   links: holidayPackages.map((pkg) => ({
    //     text: `${pkg.title} Tour Packages`,
    //     href: "#",
    //   })),
    // },
    // {
    //   title: "Popular International Tour Package",
    //   links: internationalHolidayPackages.map((pkg) => ({
    //     text: `${pkg.title} Tour Packages`,
    //     href: "#",
    //   })),
    // },
  ];
  const location = useLocation();

  return (
    <>
      <div className="TG_new_FOOT">
        <Container>
          <div className="sc-jXbUNg brqNKE py-6 pb-4 w-100p">
            <p
              color="#1A1A1A"
              cursor="auto"
              textDecoration="none"
              fontSize="13px"
              fontStyle="none"
              fontWeight={500}
              className="sc-gEvEer hrapha"
            >
              More Links
            </p>
            <div className="sc-jXbUNg ekQgDI w-100p flex-wrap">
              {footerLinks.map((item, i) => (
                <Link
                  className="sc-1019823e-0 jTiBfs fs-12 lh-16 fw-500 maxContent c-neutral-700 link--hover"
                  to={item.link}
                >
                  {item.title} &nbsp;
                  {i !== footerLinks.length - 1 && (
                    <span className="text-[#053355]">|</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="sc-jXbUNg brqNKE py-6 pb-4 w-100p">
            <p
              color="#1A1A1A"
              cursor="auto"
              textDecoration="none"
              fontSize="13px"
              fontStyle="none"
              fontWeight={500}
              className="sc-gEvEer hrapha"
            >
              Popular Flight Routes
            </p>
            <div className="sc-jXbUNg ekQgDI w-100p flex-wrap">
              {domestic.map((item, i) => (
                <Link
                  title={item.ori}
                  to={item.link}
                  className="sc-1019823e-0 jTiBfs fs-12 lh-16 fw-500 maxContent c-neutral-700 link--hover"
                >
                  {item.ori} {item.desti} flights{" "}
                  {i !== domestic.length - 1 && (
                    <span className="text-[#053355]">|</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          {/* <div className="sc-jXbUNg brqNKE py-6 pb-4  w-100p">
            <p
              color="#1A1A1A"
              cursor="auto"
              textDecoration="none"
              fontSize="13px"
              fontStyle="none"
              fontWeight={500}
              className="sc-gEvEer hrapha"
            >
              Popular International Flight Routes
            </p>
            <div className="sc-jXbUNg ekQgDI w-100p flex-wrap">
              {international.map((item, i) => (
                <Link
                  title={item.ori}
                  to={item.link}
                  className="sc-1019823e-0 jTiBfs fs-12 lh-16 fw-500 maxContent c-neutral-700 link--hover"
                >
                  {item.ori} {item.desti} flights{" "}
                  {i !== international.length - 1 && (
                    <span className="text-[#053355]">|</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="sc-jXbUNg brqNKE py-6 pb-4  w-100p">
            <p
              color="#1A1A1A"
              cursor="auto"
              textDecoration="none"
              fontSize="12px"
              fontStyle="none"
              fontWeight={500}
              className="sc-gEvEer hrapha"
            >
              Popular hotels
            </p>
            <div className="sc-jXbUNg ekQgDI w-100p flex-wrap">
              {hotels.map((item, i) => (
                <Link className="sc-1019823e-0 jTiBfs fs-12 lh-16 fw-500 maxContent c-neutral-700 link--hover">
                  {item.city} hotels{" "}
                  {i !== hotels.length - 1 && (
                    <span className="text-[#053355]">|</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="sc-jXbUNg brqNKE py-6 pb-4  w-100p">
            <p
              color="#1A1A1A"
              cursor="auto"
              textDecoration="none"
              fontSize="12px"
              fontStyle="none"
              fontWeight={500}
              className="sc-gEvEer hrapha"
            >
              Popular Domestic Tour Package
            </p>
            <div className="sc-jXbUNg ekQgDI w-100p flex-wrap">
              {holidayPackages.map((item, i) => (
                <Link className="sc-1019823e-0 jTiBfs fs-12 lh-16 fw-500 maxContent c-neutral-700 link--hover">
                  {item.title} tour packages{" "}
                  {i !== holidayPackages.length - 1 && (
                    <span className="text-[#053355]">|</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="sc-jXbUNg brqNKE py-6 pb-4  w-100p">
            <p
              color="#1A1A1A"
              cursor="auto"
              textDecoration="none"
              fontSize="12px"
              fontStyle="none"
              fontWeight={500}
              className="sc-gEvEer hrapha"
            >
              Popular International Tour Package
            </p>
            <div className="sc-jXbUNg ekQgDI w-100p flex-wrap">
              {internationalHolidayPackages.map((item, i) => (
                <Link
                  title={item.ori}
                  className="sc-1019823e-0 jTiBfs fs-12 lh-16 fw-500 maxContent c-neutral-700 link--hover"
                >
                  {item.title} tour packages{" "}
                  {i !== internationalHolidayPackages.length - 1 && (
                    <span className="text-[#053355]">|</span>
                  )}
                </Link>
              ))}
            </div>
          </div> */}
        </Container>
      </div>

      <footer className="app-hide footer_phone_tgg">
        <div className="centered clearfix">
          <div className="footer-navigation">
            {sections.map((section, index) => (
              <div className="footer-links-holder" key={index}>
                <h3
                  onClick={() => toggleSection(index)}
                  style={{ cursor: "pointer" }}
                >
                  {section.title}
                  <span style={{ float: "right" }}>
                    {openIndex === index ? "−" : "+"}
                  </span>
                </h3>
                <ul
                  className={`footer-links ${
                    openIndex === index ? "open" : ""
                  }`}
                >
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.href} rel="noopener noreferrer">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>

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
                    // to="https://instagram.com/SkyPort Destinations_online?igshid=YmMyMTA2M2Y="
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
                    // to="https://www.facebook.com/TravelTGO/"
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
                  <Link  target="_blank">
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
                  © Copyrights SkyPort Destinations | All rights reserved
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

      {/* 
      <div
        className="bottom-footer bottom-footer_TG"
        style={{ padding: "10px" }}
      >
        <div className="container">
          <div
            className="firstrow"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
          
            <div
              className="socialmedia"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <h2 className="TG_new_Inner_foot">Follow us</h2>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <li>
                  <Link target="_blank" rel="noopener">
                    <FaFacebook className="ak-facebook" />
                  </Link>
                </li>
                <li>
                  <Link target="_blank" rel="noopener">
                    <AiFillTwitterCircle className="ak-twitter" />
                  </Link>
                </li>
                <li>
                  <Link target="_blank" rel="noopener">
                    <GrInstagram className="ak-instagram" />
                  </Link>
                </li>
              </ul>
            </div>

         
            <div
              className="rightsection"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div className="squareouter">
              
                <div
                  className="row-one"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="imgouter"
                    style={{
                      textAlign: "center",
                      margin: "auto",
                      marginTop: "5px",
                    }}
                  >
                    <h6>We Accept</h6>
                  </div>
                  <ul
                    className="card-links"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <li>
                      <Link>
                        <img
                          src="https://dreamstour.dreamstechnologies.com/html/assets/img/icons/card-01.svg"
                          alt="img"
                          style={{ width: "50px" }}
                        />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <img
                          src="https://dreamstour.dreamstechnologies.com/html/assets/img/icons/card-02.svg"
                          alt="img"
                          style={{ width: "50px" }}
                        />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <img
                          src="https://dreamstour.dreamstechnologies.com/html/assets/img/icons/card-03.svg"
                          alt="img"
                          style={{ width: "50px" }}
                        />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <img
                          src="https://dreamstour.dreamstechnologies.com/html/assets/img/icons/card-04.svg"
                          alt="img"
                          style={{ width: "50px" }}
                        />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <img
                          src="https://dreamstour.dreamstechnologies.com/html/assets/img/icons/card-05.svg"
                          alt="img"
                          style={{ width: "50px" }}
                        />
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <img
                          src="https://dreamstour.dreamstechnologies.com/html/assets/img/icons/card-06.svg"
                          alt="img"
                          style={{ width: "50px" }}
                        />
                      </Link>
                    </li>
                  </ul>
                
                </div>

               
              </div>

            </div>
          </div>

          <div
            className="footer_copy_write_TGG"
            style={{ marginTop: "10px", fontSize: "13px" }}
          >
            © Copyrights SkyPort Destinations | All rights reserved
           
          </div>
        </div>
      </div> */}

      {location.pathname === "/" && (
        <section className="stickybottom">
          <div className="stkyflx">
            <Link to="/" className="stiky clrstky">
              <div
                className="_HomeStky"
                style={{ background: "url('/Images/home.png')" }}
              />
              <div className=""> Home </div>
            </Link>
            <Link to="/bookings/flight" className="stiky">
              <div
                className="_BookingsStky"
                style={{ background: "url('/Images/booking.png')" }}
              />
              <div> Bookings</div>
            </Link>
            <Link to="/offers" className="stiky eohid">
              {/* <div className="_notif">100+</div> */}
              <div
                className="_OffersStky"
                style={{ background: "url('/Images/offer.png')" }}
              />
              <div>Offers</div>
            </Link>
            <Link className="stiky">
              <div
                className="_WalletStky"
                style={{ background: "url('/Images/wallet.png')" }}
              />
              <div> Wallet</div>
            </Link>
            <Link
              // onClick={() => {
              //   isAuthenticated ? handleLogout() : handleShow();
              //   setExpanded(false);
              // }}
               to="/bookings/flight"
              className="stiky"
            >
              <div
                className="_MoreStky"
                style={{ background: "url('/Images/user.png')" }}
              />
              <div> Profile</div>
            </Link>
          </div>
          <SignUp
            show={show}
            setShow={setShow}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        </section>
      )}
    </>
  );
};

export default Foot;

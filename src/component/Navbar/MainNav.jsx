import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Lelo from "./logo-lelotrip.png";
import "./MainNav.css";
import { FaEnvelope, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { MdLogout, MdWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

import ProtectedLink from "../ProtectedLink";
import { useAuth } from "../../context/AuthContext";
import { CountriesArray } from "./Countries";
const MainNav = () => {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "in",
    name: "India",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
  };

  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="main-nav">
      <Navbar
        bg="white"
        expand="lg"
        className="p-0"
        collapseOnSelect
        expanded={expanded}
        style={{ border: "none" }}
      >
        <Container>
          <Navbar.Toggle
            aria-controls="navbarCollapse"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          >
            <HiOutlineMenuAlt2 size={24} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="navbarCollapse"
            style={{
              order: expanded && "4",
              paddingBottom: expanded && "10px",
            }}
          >
            <Nav className="me-auto py-4 py-lg-0">
              <Nav.Link
                as={Link}
                to="/"
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/flight.png"
                  width={40}
                  alt="Flights Icon"
                />
                Flights
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/hotel"
                className="d-flex align-items-center hvr-underline-reveal"
                onClick={() => setExpanded(false)}
              >
                <img
                  src="/Images/Icons/hotel.png"
                  width={40}
                  alt="Hotel Icon"
                />
                Hotels
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/tour"
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/holidays.png"
                  width={40}
                  alt="Holidays Icon"
                />
                Holidays
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/buses"
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img src="/Images/Icons/buss.png" width={40} alt="Bus Icon" />
                Buses
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cabs"
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/wheels.png"
                  width={40}
                  alt="Cabs Icon"
                />
                Cabs
              </Nav.Link>

              {/* <Nav.Link
                as={Link}
                to="/offers"
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/forex.png"
                  width={40}
                  alt="Insurance Icon"
                />
                Offers
              </Nav.Link> */}
              {/* <Nav.Link
                to=""
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/support.png"
                  width={40}
                  alt="Forex Icon"
                  style={{ height: "35.8px" }}
                />
                Support
              </Nav.Link> */}
              <Nav.Link
                as={Link}
                to="/bookings/flight"
                // handleShow={handleShow}
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/bookingss.png"
                  width={40}
                  alt="Umrah Icon"
                  style={{ height: "32.8px" }}
                />
                My Bookings
              </Nav.Link>
              <Nav className="ml-auto support_link">
                <NavDropdown
                  title={
                    <span>
                      <img
                        src="/Images/Icons/support.png"
                        width="40"
                        alt="More"
                      />
                      Support
                    </span>
                  }
                  id="navbarDropdown"
                  className="no-border support_link"
                  style={{ padding: "0px" }}
                >
                  <NavDropdown.Item>
                    <div className="cus_icon">
                      <FaUserCircle className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">Account Manager</span>
                      <span className="sub_txt">
                        +91 92112 52356 <br />
                        support@tripgoonline.com
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <div className="cus_icon">
                      <IoMdGlobe className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">Customer Support</span>
                      <span className="sub_txt">
                        support@tripgoonline.com
                        <br /> +91 92112 52356
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <div className="cus_icon whatsapp_icon">
                      <MdWhatsapp className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title" style={{ marginTop: "6px" }}>
                        +91 92112 52356
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setExpanded(false)}>
                    <div className="cus_icon">
                      <FaEnvelope className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">For Booking</span>
                      <span className="sub_txt">
                        <Link
                          className="mail_link"
                          to="mailto:support@TripGo.com"
                        >
                          support@tripgoonline.com
                        </Link>
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setExpanded(false)}>
                    <div className="cus_icon">
                      <FaEnvelope className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">For Refund</span>
                      <span className="sub_txt">
                        <Link
                          className="mail_link"
                          to="mailto:support@TripGo.com"
                        >
                          support@tripgoonline.com
                        </Link>
                      </span>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* <NavDropdown
                title={<img src="" width={40} alt="More Icon" />}
                id="navbarDropdown"
              >
                <NavDropdown.Item to="" target="_blank">
                  <img
                    src="/Images/Icons/study-abroad.png"
                    width={20}
                    className="me-2"
                    alt="Study Abroad Icon"
                  />
                  Alhind Study Abroad
                </NavDropdown.Item>
                <NavDropdown.Item to="" target="_blank">
                  <img
                    src="/Images/Icons/academy.png"
                    width={20}
                    className="me-2"
                    alt="Academy Icon"
                  />
                  Alhind Academy
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <div
              className="flex flex-middle px-1"
              style={{ marginLeft: "12px" }}
            >
              <div className="d-flex c-pointer">
                <button
                  onClick={() => {
                    isAuthenticated ? handleLogout() : handleShow();
                    setExpanded(false);
                  }}
                  style={{ width: "max-content", display: expanded && "none" }}
                  className="hero-navbar-btnn h-10 br-6 bg-secondary-500 hover:bg-secondary-600 text-white border-transparent cursor-pointer py-1 px-3 font-weight-bold text-uppercase border-solid text-500 border-1 rounded-4 line-height-solid box-border"
                >
                  {isAuthenticated ? "Logout" : "Log in / Sign up"}
                </button>
              </div>
            </div>
          </Navbar.Collapse>
          <Navbar.Brand as={Link} to="/">
            <img
              className="logo-main me-2"
              src="/Images/tripgoo.png"
              alt="Logo"
            />
          </Navbar.Brand>

          <div
            className="flex flex-middle px-1 singupbtn"
            style={{ marginLeft: "12px" }}
          >
            <div
              className="sharenation"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "7px",
              }}
            >
              <div
                className="_langview b2cpanel dropdown-header"
                onClick={toggleDropdown}
              >
                <span id="spnFlgImgHead">
                  <img
                    src={`https://flagcdn.com/w20/${selectedCountry.code}.png`}
                    alt=""
                  />
                </span>
                <span id="spnCC">{selectedCountry.name}</span>
                <i className={`_arrwdnlang ${isOpen ? "open" : ""}`}></i>
                {isOpen && (
                  <div className="dropdown-options">
                    {CountriesArray.map((country, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <img
                          src={`https://flagcdn.com/w20/${country.code}.png`}
                          alt=""
                        />
                        <span>{country.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* <div className="d-flex c-pointer">
              <button
                onClick={() => {
                  isAuthenticated ? handleLogout() : handleShow();
                  setExpanded(false);
                }}
                style={{ width: "max-content" }}
                className="hero-navbar-btnn h-10 br-6 bg-secondary-500 hover:bg-secondary-600 text-white border-transparent cursor-pointer py-1 px-3 font-weight-bold text-uppercase border-solid text-500 border-1 rounded-4 line-height-solid box-border"
              >
                {isAuthenticated ? <MdLogout /> : <FaUserAlt />}
              </button>
            </div> */}
          </div>
        </Container>
      </Navbar>

      <SignUp
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default MainNav;

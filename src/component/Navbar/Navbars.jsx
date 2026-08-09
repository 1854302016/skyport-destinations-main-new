import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Lelo from "./logo-lelotrip.png";
import "./Navbars.css";
import {
  FaCrown,
  FaEnvelope,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaRegUser,
  FaUserAlt,
  FaUserCircle,
  FaPlane,
  FaChevronDown,
} from "react-icons/fa";
import { IoMdGlobe, IoMdLogIn, IoMdNotificationsOutline } from "react-icons/io";
import {
  MdChatBubbleOutline,
  MdEmail,
  MdLogout,
  MdWhatsapp,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import ProtectedLink from "../ProtectedLink";
import { useAuth } from "../../context/AuthContext";
import { CountriesArray } from "./Countries";
import { FaPhoneVolume, FaRegCircleUser, FaXTwitter } from "react-icons/fa6";
import { IoPersonCircleOutline, IoTicketOutline } from "react-icons/io5";
import { AiFillTikTok, AiOutlineUser } from "react-icons/ai";
import { RiMenu2Line, RiWallet3Line } from "react-icons/ri";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../redux/slices/login";
import SideBar from "./SideBar";
// import { useAuth } from "../../context/AuthContext";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};
const Navbars = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  useEffect(() => {
    const emaill = localStorage.getItem("email");
    setEmail(emaill);
    const names = localStorage.getItem("names");
    setNames(names);
  }, [isAuth]);
  const handleAuthClick = () => {
    if (isAuth) {
      dispatch(loggedOut());
    } else {
      setAuthMode("login");
      handleShow();
      setExpanded(false);
      setShowSideNav(false);
    }
  };

  const [otpSent, setOtpSent] = useState(false);
  const handleClose = () => {
    setShow(false);
    // setOtpSent(false)
  };
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setExpanded(false);
  };
  const [expanded, setExpanded] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For dropdown
  const [selectedCountry, setSelectedCountry] = useState({
    code: "gy",
    name: "Guyana",
  });

  const width = useWindowWidth();

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleToggle = () => {
    const isPhone = width <= 998;
    if (isPhone) {
      setShowSideNav(true); // Show custom side nav
      setExpanded(false); // Make sure collapse nav stays closed
    } else {
      setExpanded(expanded ? false : "expanded"); // Toggle Bootstrap collapse on desktop
      setShowSideNav(false); // Just in case it's open, hide it
    }
  };

  const [showHelpDropdown, setShowHelpDropdown] = useState(false);

  const toggleHelpDropdown = () => {
    setShowHelpDropdown((prev) => !prev);
  };
  const [showMore, setShowMore] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const [showSupport, setShowSupport] = useState(false);
  const handleMyAccount = () => {
    navigate("/bookings/flight");
    setShowSideNav(false);
  };
  const handleSupport = () => {
    navigate("/contact");
    setShowSideNav(false);
  };
  const handleLoginClick = () => {
    setAuthMode("login");
    handleShow();
    setExpanded(false);
    setShowSideNav(false);
  };
  const handleRegisterClick = () => {
    setAuthMode("register");
    handleShow();
    setExpanded(false);
    setShowSideNav(false);
  };
  const handleLoginFunc = () => {
    setAuthMode("login");
    setShowSideNav(false);
    setShow(true);
  };

  const location = useLocation();
  // const isHome = location.pathname === "/";
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/hotel" ||
    location.pathname === "/tour";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  // const handleAccountClick = () => {
  //   setIsSidebarOpen(true);

  //   // For WebView communication (optional)
  //   if (window.ReactNativeWebView) {
  //     window.ReactNativeWebView.postMessage("openSidebar");
  //   }
  // };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };
  const handleAccountClick = () => {
    setIsSidebarOpen(true);
    setIsClosing(false);
  };

  const handleCloseSidebar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 300); // Must match the CSS transition time
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="main-nav">
      <div
        id="opct3"
        className="_opcMenu"
        style={{ display: showSideNav ? "block" : "none" }}
      ></div>
      <Navbar
        expand="lg"
        collapseOnSelect
        expanded={expanded}
        className={`main-navbar-header p-0 ${isHome ? "navbar-home_sky" : "navbar-other_sky"}`}
      >
        <Container className="navbar-container-inner">
          {/* Left: Hamburger Icon (Leftmost) and Logo (Right next to it) */}
          <div className="navbar-left-group">
            <div
              className="topnav_menuIcon ripple"
              onClick={handleAccountClick}
              title="Open Navigation Menu"
            >
              <RiMenu2Line size={20} className="desk-icon-menu" />
            </div>

            <Navbar.Brand as={Link} to="/" className="navbar-brand-clean">
              <img className="logo-main" src="/Images/logo.svg" alt="Trusted Fare Logo" />
            </Navbar.Brand>
          </div>

          {/* Right: In-Person Booking & My Account chip buttons (No Country Select) */}
          <div className="navbar-right-group">
            <Link to="/in-person-booking" className="btn-inperson" type="button">
              <span className="icon_blue">
                <IoPersonCircleOutline size={19} />
              </span>
              <span className="text">In-Person Booking</span>
            </Link>

            <button className="btn-signin" type="button">
              <span className="icon_blue">
                <IoPersonCircleOutline size={19} />
              </span>
              <span className="text">
                {isAuth ? (names ? `Hi, ${names}` : "My Account") : "My Account"}
              </span>

              <div className="option-list">
                <ul className="first-menu">
                  <li onClick={handleAuthClick}>
                    <Link className="item-link" to="#">
                      <div className="left-sec">
                        {isAuth ? <MdLogout /> : <IoMdLogIn />}
                        {isAuth ? "Logout" : "Login"}
                      </div>
                    </Link>
                  </li>
                  {!isAuth && (
                    <li onClick={handleRegisterClick}>
                      <Link className="item-link" to="#">
                        <div className="left-sec">
                          <IoMdLogIn />
                          Register
                        </div>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Left-Side Drawer */}
      {isSidebarOpen && (
        <>
          <div className="sidebar-backdrop" onClick={handleCloseSidebar}></div>
          <div
            className={`sidebar option-list left-sidebar ${isClosing ? "close" : "open"}`}
            ref={sidebarRef}
          >
            <button
              className="close-btn"
              onClick={handleCloseSidebar}
              aria-label="Close Navigation"
            >
              ×
            </button>
            <SideBar
              setIsSidebarOpen={setIsSidebarOpen}
              onLoginClick={handleLoginClick}
              isAuth={isAuth}
              names={names}
            />
          </div>
        </>
      )}
       <SignUp
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        otpSent={otpSent}
        setOtpSent={setOtpSent}
        mode={authMode}
        setMode={setAuthMode}
      />
    </div>
  );
};

export default Navbars;

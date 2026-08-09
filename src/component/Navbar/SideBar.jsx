import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
const SideBar = ({ setIsSidebarOpen, onLoginClick, isAuth, names }) => {
  const [active, setActive] = useState(true);
  return (
    <div
      className="hdrMenu pos-f scrollbarChrome scrollbarChrome_sharp hdrMenu-open"
      data-v-52664df0=""
    >
      <div className="hdrMenu_user" data-v-52664df0="">
        <div className="row no-gutters" data-v-52664df0="">
          <div className="col-3" data-v-52664df0="">
            <i className="mob-icon-avtar ml0 ml-sm-3" data-v-52664df0="" />
          </div>{" "}
          <div className="col-9" data-v-52664df0="">
            <div
              className="fnt-16 fnt-md-18 font-bold clr-3c"
              data-v-52664df0=""
            >
              {isAuth ? names : "Hello Guest!"}
            </div>{" "}
            <div className="fnt-11 fnt-md-14 clr-8f" data-v-52664df0="">
              {!isAuth && (
                <Link
                  data-v-52664df0=""
                  style={{ color: "#f2bc06", cursor: "pointer" }}
                  onClick={() => {
                    onLoginClick();
                    setIsSidebarOpen(false);
                  }}
                >
                  Login/Signup
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
      <div data-v-52664df0="">
        <ul data-v-52664df0="">
          <li className="hdrMenu_list gtm_sidenav" data-v-52664df0="">
            <Link
              className="hdrMenu_link ripple gtm_sidenav"
              data-v-52664df0=""
              onClick={()=>setIsSidebarOpen(false)}
            >
              <span
                className="d-inline-block hdrMenu_icon text-center"
                data-v-52664df0=""
              >
                <i className="menu-icon-home" data-v-52664df0="" />
              </span>
              Home
            </Link>
          </li>{" "}
          <li
            className={`hdrMenu_list services ${active ? "open" : ""}`}
            onClick={() => setActive(!active)}
          >
            <Link className="hdrMenu_link ripple" data-v-52664df0="">
              <span
                className="d-inline-block hdrMenu_icon text-center"
                data-v-52664df0=""
              >
                <i className="menu-icon-services" data-v-52664df0="" />
              </span>
              Services
              <span className={`float-right transition-transform ${active ? "rotate-180" : ""}`} data-v-52664df0="">
                <FaChevronDown size={14} />
              </span>
            </Link>{" "}
            {active === true && (
              <ul className="pdd_R0" data-v-52664df0="">
                <li
                  className="hdrMenu_list gtm_sidenav"
                  style={{ borderTop: "var(--border-f0)" }}
                  data-v-52664df0=""
                  onClick={()=>setIsSidebarOpen(false)}
                >
                  <Link
                    to="/"
                    className="hdrMenu_link ripple gtm_sidenav"
                    data-v-52664df0=""
                  >
                    <span
                      className="d-inline-block hdrMenu_icon text-center"
                      data-v-52664df0=""
                    >
                      <i className="menu-icon-flight" data-v-52664df0="" />
                    </span>
                    Flights
                  </Link>
                </li>{" "}
                <li className="hdrMenu_list gtm_sidenav" data-v-52664df0="" onClick={()=>setIsSidebarOpen(false)}>
                  <Link
                    to="/hotel"
                    className="hdrMenu_link ripple gtm_sidenav"
                    data-v-52664df0=""
                  >
                    <span
                      className="d-inline-block hdrMenu_icon text-center"
                      data-v-52664df0=""
                    >
                      <i className="menu-icon-hotel" data-v-52664df0="" />
                    </span>
                    Hotels
                  </Link>
                </li>{" "}
                <li className="hdrMenu_list gtm_sidenav" data-v-52664df0="" onClick={()=>setIsSidebarOpen(false)}>
                  <Link
                    to="/tour"
                    className="hdrMenu_link ripple gtm_sidenav"
                    data-v-52664df0=""
                  >
                    <span
                      className="d-inline-block hdrMenu_icon text-center"
                      data-v-52664df0=""
                    >
                      <i className="menu-icon-package" data-v-52664df0="" />
                    </span>
                    Tour Packages
                  </Link>
                </li>{" "}
              </ul>
            )}
          </li>{" "}
          <li className="hdrMenu_list gtm_sidenav" data-v-52664df0=""  onClick={()=>setIsSidebarOpen(false)}>
            <Link
              className="hdrMenu_link ripple gtm_sidenav"
              to="/dash"
              
            >
              <span
                className="d-inline-block hdrMenu_icon text-center"
                data-v-52664df0=""
              >
                <i className="menu-icon-bookings" data-v-52664df0="" />
              </span>
              My Bookings
            </Link>
          </li>{" "}
          <li className="hdrMenu_list gtm_sidenav" data-v-52664df0="">
            <Link
              className="hdrMenu_link ripple gtm_sidenav"
              data-v-52664df0=""
            >
              <span
                className="d-inline-block hdrMenu_icon text-center"
                data-v-52664df0=""
              >
                <i className="menu-icon-offers" data-v-52664df0="" />
              </span>
              Offers / Promo Codes
            </Link>
          </li>{" "}
          {isAuth && (
            <li 
              className="hdrMenu_list gtm_sidenav" 
              data-v-52664df0=""
              onClick={() => {
                onLoginClick(); // This will trigger logout if isAuth is true based on current handleAuthClick logic
                setIsSidebarOpen(false);
              }}
            >
              <Link className="hdrMenu_link ripple gtm_sidenav" style={{ color: '#aa0000' }}>
                <span className="d-inline-block hdrMenu_icon text-center">
                  <MdLogout size={20} />
                </span>
                Logout
              </Link>
            </li>
          )}
          {/* <li className="hdrMenu_list gtm_sidenav" data-v-52664df0="">
          <Link
            href="https://t.me/dpauls"
            target="_blank"
            title="Telegram"
            className="hdrMenu_link ripple gtm_sidenav"
            data-v-52664df0=""
          >
            <div
              className="d-inline-block hdrMenu_icon text-center"
              data-v-52664df0=""
            >
              <img
                src="/_nuxt/img/telegram.e9722f2.png"
                alt=""
                style={{ height: 24 }}
                data-v-52664df0=""
              />
            </div>{" "}
            <span data-v-52664df0="">
              Connect with us <span data-v-52664df0="">on Telegram</span>
            </span>
          </Link>
        </li> */}
        </ul>{" "}
        {/* <div className="hdrMenu_quickLink" data-v-52664df0="">
        <p className="hdrMenu_quickLink-title" data-v-52664df0="">
          Quick Links
        </p>
      </div>{" "}
      <div data-v-52664df0="">
        <ul data-v-52664df0="">
          <li className="gtm_sidenav" data-v-52664df0="">
            <Link
            
              className="hdrMenu_link ripple gtm_sidenav"
              data-v-52664df0=""
            >
              {" "}
              Send Enquiry{" "}
            </Link>
          </li>{" "}
          <li className="gtm_sidenav" data-v-52664df0="">
            <Link
            
              className="hdrMenu_link ripple gtm_sidenav"
              data-v-52664df0=""
            >
              {" "}
              Contact us{" "}
            </Link>
          </li>{" "}
          <li className="gtm_sidenav" data-v-52664df0="">
            <Link
            
              className="hdrMenu_link ripple gtm_sidenav"
              data-v-52664df0=""
            >
              {" "}
              About us{" "}
            </Link>
          </li>{" "}
         
    
          <li className="gtm_sidenav" data-v-52664df0="">
            <Link
            
              className="hdrMenu_link ripple gtm_sidenav"
              data-v-52664df0=""
            >
              {" "}
              Terms &amp; Conditions{" "}
            </Link>
          </li>
        </ul>
      </div> */}
      </div>
    </div>
  );
};

export default SideBar;

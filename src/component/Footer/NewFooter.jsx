import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NewFooter.css";
import { IoHeartSharp } from "react-icons/io5";

// Get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const tomorrowDate = getTomorrowDate();

// Static footer links
const footerLinks = [
  { title: "About Us", link: "/about-us" },
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Terms & Conditions", link: "/terms-conditions" },
  { title: "Contact Us", link: "/contact" },
  { title: "Offers", link: "/offers" },
];

// Domestic routes (Top Flight Routes from Georgetown)
const domestic = [
  {
    ori: "Georgetown",
    desti: "Port of Spain",
    link: `/flightList/dest_POS*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Bridgetown",
    link: `/flightList/dest_BGI*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Nassau",
    link: `/flightList/dest_NAS*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "St. John’s",
    link: `/flightList/dest_ANU*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Providenciales",
    link: `/flightList/dest_PLS*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Willemstad",
    link: `/flightList/dest_CUR*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Punta Cana",
    link: `/flightList/dest_PUJ*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Panama City",
    link: `/flightList/dest_PTY*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Oranjestad",
    link: `/flightList/dest_AUA*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "São Paulo",
    link: `/flightList/dest_GRU*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "New York",
    link: `/flightList/dest_JFK*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Toronto",
    link: `/flightList/dest_YYZ*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
];

// International routes – Trip of a Lifetime
const international = [
  {
    ori: "Georgetown",
    desti: "Dubai",
    link: `/flightList/dest_DXB*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Mumbai",
    link: `/flightList/dest_BOM*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Paris",
    link: `/flightList/dest_CDG*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "London",
    link: `/flightList/dest_LHR*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Rome",
    link: `/flightList/dest_FCO*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Tokyo",
    link: `/flightList/dest_HND*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Cape Town",
    link: `/flightList/dest_CPT*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Bora Bora",
    link: `/flightList/dest_BOB*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Beijing",
    link: `/flightList/dest_PEK*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Santorini",
    link: `/flightList/dest_JTR*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
  {
    ori: "Georgetown",
    desti: "Sydney",
    link: `/flightList/dest_SYD*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
  },
];

// Menu structure
const menuData = [
  {
    label: "About",
    heading: "About",
    links: footerLinks.map((item) => ({ text: item.title, href: item.link })),
  },
  {
    label: "Top Flight Routes",
    heading: "Top Flight Routes",
    columns: [
      domestic.slice(0, 6).map((item) => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
      domestic.slice(6).map((item) => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
    ],
  },
  {
    label: "International Flight",
    heading: "International Flight",
    columns: [
      international.slice(0, 6).map((item) => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
      international.slice(6).map((item) => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
    ],
  },
];

const socialIcons = [
  {
    icon: "fab fa-facebook-f",
    label: "Facebook",
    link: "https://www.facebook.com/share/16vgLnkcFf/",
  },
  { icon: "fab fa-tiktok", label: "Tiktok", link: "https://www.tiktok.com/@skyport.destinati?_t=ZM-8z8JgE4VfSH&_r=1" },
  {
    icon: "fab fa-instagram",
    label: "Instagram",
    link: "https://www.instagram.com/skyport.destinations",
  },
];

const NewFooter = () => {
  const [selected, setSelected] = useState(0);
  const mainMenu = menuData[selected];

  function renderLinksRight(section) {
    return (
      <div className="footer-twopane-right">
        {section.heading && (
          <div className="footer-twopane-title">{section.heading}</div>
        )}
        {section.columns ? (
          <div
            className={`footer-twopane-columns columns-${section.columns.length}`}
          >
            {section.columns.map((col, colIdx) => (
              <ul className="footer-twopane-list" key={colIdx}>
                {col.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.href}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : (
          <ul className="footer-twopane-list single-col">
            {section.links?.map((item, idx) => (
              <li key={idx}>
                <Link to={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div style={{ background: "#053355" }}>
      <footer className="footer-main twopane">
        {/* Heading Row */}
        <div className="footer-twopane-content" style={{ minHeight: "0px" }}>
          <div className="footer-heading-row">
            <div className="footer-heading-left">Easy Access</div>
            <div className="footer-heading-right">
              Connect with Us
              <div className="footer-social-inline">
                {socialIcons.map((icon, idx) => (
                  <a key={idx} href={icon.link} target="_blank" rel="noopener noreferrer" aria-label={icon.label}>
                    <i className={icon.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-twopane-content">
          <div className="footer-twopane-left">
            {menuData.map((menu, idx) => (
              <div
                key={menu.label}
                className={`footer-twopane-menu-item${
                  selected === idx ? " active" : ""
                }`}
                onClick={() => setSelected(idx)}
                tabIndex={0}
                role="button"
                aria-label={menu.label}
              >
                {menu.label}
              </div>
            ))}
          </div>
          {renderLinksRight(mainMenu)}
        </div>
        {/* <div className="footer-twopane-content fpaystrip" style={{minHeight:"0px"}}>
      <img src="https://c.fareportal.com/vd/coa/travel/r6/images/footer-logo-desktop.webp" width="1135" height="51" alt="partners logos" className="footer-logo-desktop"/>
      </div>

      <div className="footer-copyright">
        © 2024 SkyPort Destinations | All rights reserved
      </div> */}
      </footer>
      <div className="footer_bottom">
        <div className="container">
          <div className="row">
            <p>
              YOUR FRIEND / TRUSTED FARE, with its Head Office located at
              GROUND FLOOR, Shop No 32, Bus Stand, Goniana Mandi Bathinda, Punjab, India - 151201
              and Canada Office at Unit 201-7743 128 street West newton, surrey Bc V3w1L4.
              For any inquiries, you can reach us at +91-9646747171 / +1-778-240-4599 or email us at
              explore@skyportdestinations.com.
            </p>
            <p>
              All users agree to SKYPORT DESTINATIONS's{" "}
              <a href="/terms-conditions">Terms &amp; Conditions</a> and &nbsp;
              {/* <a href="/user-agreement">User Agreement</a> and{" "} */}
              <a href="/privacy-policy">Privacy Policy</a>
            </p>
             <p style={{ paddingBottom: 6 }}>
              Design & Developed By{" "}
              <a href="https://www.eweblink.net/" target="_blank"> Eweblink Technology</a>
              {/* <a href="/user-agreement">User Agreement</a> and{" "} */}
              
            </p>
            {/* <p>
              All users are subject to our{" "}
              <a href="#">Cancellation &amp; Refund Policies</a>. Read our{" "}
              <a href="#">Cookie Policy</a> for details.
            </p> */}
            <div className="footer_bottom_icon">
              <div
                className="footer-twopane-content fpaystrip"
                style={{ minHeight: "0px" }}
              >
                <img
                  src="https://c.fareportal.com/vd/coa/travel/r6/images/footer-logo-desktop.webp"
                  width="1135"
                  height="51"
                  alt="partners logos"
                  className="footer-logo-desktop"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;

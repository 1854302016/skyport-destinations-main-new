import React from "react";
import { Link } from "react-router-dom";
import "./NewFooter.css";

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

// Domestic routes (Top Flight Routes from Georgetown) — trimmed to a short list for the footer
const domestic = [
  { ori: "Georgetown", desti: "Port of Spain", code: "POS" },
  { ori: "Georgetown", desti: "Bridgetown", code: "BGI" },
  { ori: "Georgetown", desti: "Nassau", code: "NAS" },
  { ori: "Georgetown", desti: "Providenciales", code: "PLS" },
  { ori: "Georgetown", desti: "New York", code: "JFK" },
  { ori: "Georgetown", desti: "Toronto", code: "YYZ" },
].map((item) => ({
  ...item,
  link: `/flightList/dest_${item.code}*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
}));

// International routes – Trip of a Lifetime — trimmed to a short list for the footer
const international = [
  { ori: "Georgetown", desti: "Dubai", code: "DXB" },
  { ori: "Georgetown", desti: "Mumbai", code: "BOM" },
  { ori: "Georgetown", desti: "Paris", code: "CDG" },
  { ori: "Georgetown", desti: "London", code: "LHR" },
  { ori: "Georgetown", desti: "Tokyo", code: "HND" },
  { ori: "Georgetown", desti: "Sydney", code: "SYD" },
].map((item) => ({
  ...item,
  link: `/flightList/dest_${item.code}*org_GEO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
}));

const socialIcons = [
  {
    icon: "fab fa-facebook-f",
    label: "Facebook",
    link: "https://www.facebook.com/share/16vgLnkcFf/",
  },
  {
    icon: "fab fa-tiktok",
    label: "Tiktok",
    link: "https://www.tiktok.com/@skyport.destinati?_t=ZM-8z8JgE4VfSH&_r=1",
  },
  {
    icon: "fab fa-instagram",
    label: "Instagram",
    link: "https://www.instagram.com/skyport.destinations",
  },
];

const FooterColumn = ({ title, children }) => (
  <div className="ftr-col">
    <h4 className="ftr-col__title">{title}</h4>
    {children}
  </div>
);

const NewFooter = () => {
  return (
    <footer className="ftr">
      <div className="ftr-skyline" aria-hidden="true" />

      <div className="ftr-top">
        <div className="ftr-container ftr-grid">
          <div className="ftr-col ftr-brand">
            <div className="ftr-brand__name">Trusted Fare</div>
            <p className="ftr-brand__tag">Trusted journeys, better fares.</p>
            <div className="ftr-social">
              {socialIcons.map((icon, idx) => (
                <a
                  key={idx}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                >
                  <i className={icon.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="About">
            <ul className="ftr-list">
              {footerLinks.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Top Flight Routes">
            <ul className="ftr-list">
              {domestic.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link}>
                    {item.ori} to {item.desti}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="International Flights">
            <ul className="ftr-list">
              {international.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link}>
                    {item.ori} to {item.desti}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="ftr-bottom">
        <div className="ftr-container ftr-bottom__inner">
          <p className="ftr-legal">
            YOUR FRIEND / TRUSTED FARE, Head Office: GROUND FLOOR, Shop No 32, Bus
            Stand, Goniana Mandi Bathinda, Punjab, India - 151201 &middot; Canada
            Office: Unit 201-7743 128 street West newton, Surrey, BC V3W1L4
            &middot; +91-9646747171 / +1-778-240-4599 &middot;{" "}
            <a href="mailto:info@trustedfare.com">info@trustedfare.com</a>
          </p>
          <p className="ftr-legal">
            All users agree to SKYPORT DESTINATIONS's{" "}
            <Link to="/terms-conditions">Terms &amp; Conditions</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link> &middot; Design &amp;
            Developed by{" "}
            <a href="https://www.eweblink.net/" target="_blank" rel="noopener noreferrer">
              Eweblink Technology
            </a>
          </p>
          <img
            src="https://c.fareportal.com/vd/coa/travel/r6/images/footer-logo-desktop.webp"
            width="1135"
            height="51"
            alt="partners logos"
            className="ftr-payments"
          />
          <p className="ftr-copyright">
            &copy; {new Date().getFullYear()} Trusted Fare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;

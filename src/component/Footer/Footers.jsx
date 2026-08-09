import React, { useState } from "react";
import "./Footers.css"; // See styles below

const Footers = () => {
  const sections = [
    {
      title: "OUR PRODUCTS",
      links: [
        { text: "Book Flights", href: "https://www.easemytrip.com/flights.html" },
        { text: "Hotel Booking", href: "https://www.easemytrip.com/hotels/" },
        { text: "Trains", href: "https://www.easemytrip.com/railways/" },
        { text: "Bus", href: "https://www.easemytrip.com/bus/" },
        { text: "Cabs", href: "https://www.easemytrip.com/cabs/" },
        { text: "Domestic Flights", href: "https://www.easemytrip.com/flights/domestic-flight/" },
        { text: "International Flights", href: "https://www.easemytrip.com/flights/international-flight/" },
        { text: "Holiday Packages", href: "https://www.easemytrip.com/holidays/" },
        { text: "Visa", href: "https://www.easemytrip.com/visa.html" },
        { text: "Franchise", href: "https://www.easemytrip.com/franchise/" },
        { text: "Mice", href: "https://www.easemytrip.com/mice/index.html" },
        { text: "PNR Status", href: "https://www.easemytrip.com/railways/pnr-status/" },
        { text: "Lowest Airfare Calendar", href: "https://www.easemytrip.com/flights/airfare-calendar/" },
        { text: "Mobile App", href: "https://www.easemytrip.com/mobile-app.html" },
      ],
    },
    {
      title: "OUR COMPANY",
      links: [
        { text: "About Us", href: "https://www.easemytrip.com/about-us.html" },
        { text: "Achievements", href: "https://www.easemytrip.com/achievements/index.html" },
        { text: "Contact Us", href: "https://www.easemytrip.com/contact-us.html" },
        { text: "Career", href: "https://www.easemytrip.com/career.html" },
        { text: "User Agreement", href: "https://www.easemytrip.com/user-agreement.html" },
        { text: "Terms & Conditions", href: "https://www.easemytrip.com/terms.html" },
        { text: "Privacy Policy", href: "https://www.easemytrip.com/privacy-policy.html" },
      ],
    },
  ];

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <footer className="app-hide footer_phone_tgg">
      <div className="centered clearfix">
        <div className="footer-navigation">
          {sections.map((section, index) => (
            <div className="footer-links-holder" key={index}>
              <h3 onClick={() => toggleSection(index)} style={{ cursor: "pointer" }}>
                {section.title}
                <span style={{ float: "right" }}>{openSections[index] ? "−" : "+"}</span>
              </h3>
              <ul className={`footer-links ${openSections[index] ? "open" : ""}`}>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} rel="noopener noreferrer">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footers;

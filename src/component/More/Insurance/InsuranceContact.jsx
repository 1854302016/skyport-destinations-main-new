import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhoneAlt, faPercentage, faHeadset, faHotel } from '@fortawesome/free-solid-svg-icons';
import { FaPhone, FaPercentage, FaHotel } from "react-icons/fa";
import { ImHeadphones } from "react-icons/im";
import "./InsuranceContact.css";
import { Form, Link } from "react-router-dom";
function InsuranceContact() {
  return (
    <>
      <section className="contact-area-page section-padding insurance_container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-item contact_items">
                <div className="box1" />
                <div className="box2" />
                <div className="contact-item-icon contact-bg">
                  <svg
                    className="icon-size"
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 49 50"
                    fill="none"
                  >
                    <path
                      d="M18.9062 23V35C18.9062 36.6875 17.5938 38 15.9062 38H12.9062C9.625 38 6.90625 35.2812 6.90625 32V26C6.90625 22.7188 9.53125 20 12.9062 20H15.9062C17.5 20 18.9062 21.4062 18.9062 23ZM15.9062 35V23H12.9062C11.2188 23 9.90625 24.4062 9.90625 26V32C9.90625 33.6875 11.2188 35 12.9062 35H15.9062ZM36.9062 38V38.0938H34C32.3125 38.0938 31 36.7812 31 35.0938V23.0938C31 21.5 32.3125 20.0938 34 20.0938H36.9062C40.1875 20.0938 42.9062 22.7188 42.9062 26V32C42.9062 35.2812 40.1875 38 36.9062 38ZM33.9062 23L33.8125 35H36.8125C38.4062 35 39.8125 33.6875 39.8125 32V26C39.8125 24.4062 38.4062 23 36.8125 23H33.9062ZM27.25 2.1875C39.625 3.3125 49 14.1875 48.8125 26.6562V42.5938C48.8125 46.7188 45.4375 50 41.3125 50H23.4062C20.6875 50 18.5312 47.5625 19 44.6562C19.4688 42.5 21.4375 41 23.5938 41H29.0312C30.8125 41 32.5938 41.9375 33.4375 43.5312C34.0938 44.75 34.0938 45.9688 33.625 47H41.5C43.9375 47 46 44.9375 46 42.5V26.6562C46 15.6875 37.8438 6.125 26.875 5.09375C14.3125 3.96875 4.28125 14.0938 4 26V27.5938C3.90625 28.3438 3.25 29 2.5 29C1.65625 29 0.90625 28.3438 0.90625 27.5L1 26.0938C1.375 12.3125 12.8125 0.78125 27.25 2.1875ZM29.4062 47C30.25 47 30.9062 46.3438 30.9062 45.5C30.9062 44.75 30.1562 44 29.4062 44H23.4062C22.5625 44 21.9062 44.75 21.9062 45.5C21.9062 46.3438 22.5625 47 23.4062 47H29.4062Z"
                      fill="#d32f2f"
                    />
                  </svg>
                </div>
                <div className="contact-item-content contact-bg ">
                  <p className="contact-us contact-us-text">CALL US 24*7</p>
                  <h6>
                    <Link to="tel:+919211252356" className="contact-us-text">
                      +91 92112 52356
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="contact-item contact_items">
                <div className="box1" />
                <div className="box2" />
                <div className="contact-item-icon contact-bg">
                  <svg
                    className="icon-size"
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M46.5 18C47.25 18 48 18.75 48 19.5V43.5938C48 46.0312 45.9375 48 43.5 48H4.5C1.96875 48 0 46.0312 0 43.5V19.5C0 18.75 0.65625 18 1.5 18C2.25 18 3 18.75 3 19.5V43.5C3 44.3438 3.65625 45 4.5 45H43.5C44.25 45 45 44.3438 45 43.5V19.5C45 18.75 45.6562 18 46.5 18ZM6 25.9688C6 25.875 6 25.7812 6 25.6875C6 25.5938 6 25.5938 6 25.5V4.5C6 2.0625 7.96875 0 10.5 0H37.5C39.9375 0 42 2.0625 42 4.5V25.5C42 25.5938 41.9062 25.5938 41.9062 25.5938C41.9062 25.6875 41.9062 25.7812 41.9062 25.875C41.8125 25.9688 41.8125 26.0625 41.8125 26.1562C41.7188 26.25 41.7188 26.25 41.625 26.3438C41.5312 26.4375 41.5312 26.5312 41.4375 26.625C41.3438 26.625 41.3438 26.625 41.3438 26.625L28.875 35.8125C27.4688 36.9375 25.7812 37.5 24 37.5C22.125 37.5 20.4375 36.9375 19.0312 35.9062L6.5625 26.7188C6.5625 26.7188 6.5625 26.7188 6.46875 26.7188C6.375 26.625 6.375 26.5312 6.28125 26.4375C6.1875 26.3438 6.1875 26.3438 6.09375 26.25C6.09375 26.1562 6.09375 26.0625 6 25.9688ZM9 4.5V24.75L20.8125 33.4688C22.6875 34.875 25.2188 34.875 27.0938 33.4688L39 24.75V4.5C39 3.75 38.25 3 37.5 3H10.5C9.65625 3 9 3.75 9 4.5ZM33 22.5C33 23.3438 32.25 24 31.5 23.9062H16.5C15.6562 23.9062 15 23.25 15 22.5C15 21.6562 15.6562 21 16.5 21H31.5C32.25 21 33 21.6562 33 22.5ZM16.5 15C15.6562 15 15 14.3438 15 13.5C15 12.8438 15.6562 12.0938 16.5 12.0938H31.5C32.25 12.0938 33 12.75 33 13.5C33 14.25 32.25 15 31.5 15H16.5Z"
                      fill="#d32f2f"
                    />
                  </svg>
                </div>
                <div className="contact-item-content contact-bg">
                  <p className="contact-us">MAKE A QUOTE</p>
                  <h6>
                    <Link
                      to="mailto:support@tripgoonline.com"
                      className="contact-us-text"
                    >
                      support@tripgoonline.com
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="contact-item contact_items">
                <div className="box1" />
                <div className="box2" />
                <div className="contact-item-icon contact-bg">
                  <svg
                    className="icon-size"
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 54 49"
                    fill="none"
                  >
                    <path
                      d="M24.75 10.5C24.75 9.28125 25.6875 8.25 27 8.25C28.2188 8.25 29.25 9.28125 29.25 10.5C29.25 11.8125 28.2188 12.75 27 12.75C25.6875 12.75 24.75 11.8125 24.75 10.5ZM25.5938 29.25C22.5938 25.5 15.75 16.4062 15.75 11.25C15.75 5.0625 20.7188 0 27 0C33.1875 0 38.25 5.0625 38.25 11.25C38.25 16.4062 31.3125 25.5 28.3125 29.25C27.6562 30.1875 26.25 30.1875 25.5938 29.25ZM34.3125 14.5312C34.9688 13.0312 35.25 12 35.25 11.25C35.25 6.75 31.5 3 27 3C22.4062 3 18.75 6.75 18.75 11.25C18.75 12 18.9375 13.0312 19.5938 14.5312C20.1562 16.0312 21.0938 17.625 22.0312 19.2188C23.625 21.8438 25.5 24.375 27 26.25C28.4062 24.375 30.2812 21.8438 31.875 19.2188C32.8125 17.625 33.75 16.0312 34.3125 14.5312ZM37.9688 20.9062C37.9688 21 37.875 21 37.7812 21C38.5312 19.6875 39.2812 18.2812 39.8438 16.9688L50.9062 12.5625C52.3125 12 54 13.0312 54 14.625V40.0312C54 40.9688 53.4375 41.8125 52.5 42.0938L37.9688 47.9062C37.6875 48.0938 37.4062 48.0938 37.0312 48L16.5 42.0938L3 47.5312C1.59375 48.0938 0 47.0625 0 45.4688V20.0625C0 19.125 0.46875 18.2812 1.40625 18L12.9375 13.3125C13.125 14.3438 13.4062 15.2812 13.7812 16.2188L3 20.5312V44.3438L15 39.5625V28.5C15 27.75 15.6562 27 16.5 27C17.25 27 18 27.75 18 28.5V39.375L36 44.5312V28.5C36 27.75 36.6562 27 37.5 27C38.25 27 39 27.75 39 28.5V44.3438L51 39.5625V15.75L37.9688 20.9062Z"
                      fill="#d32f2f"
                    />
                  </svg>
                </div>
                <div className="contact-item-content contact-bg">
                  <p className="contact-us">WORK STATION</p>
                  <h6 className="contact-us-address">
                    1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram -
                    122004
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InsuranceContact;

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./css/EnquiryPopup.css";

const EnquiryPopup = ({ destination }) => {
  const location = useLocation();

  // console.log("Destination",destination);

  const isTourPage = location.pathname === "/tour";

  const [showModal, setShowModal] = useState(false);

  const queryModal = () => setShowModal(true);
  const querycloseModal = () => setShowModal(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [quickFormData, setQuickFormData] = useState({
    destination: (destination && destination) || "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleQuickInputChange = (e) => {
    const { name, value } = e.target;
    setQuickFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickSubmit = async () => {
    const { name, email, phone, destination, message } = quickFormData;

    if (!destination) {
      Swal.fire("Missing Field", "Please enter your destination.", "warning");
      return;
    }
    if (!name) {
      Swal.fire("Missing Field", "Please enter your name.", "warning");
      return;
    }
    if (!email) {
      Swal.fire("Missing Field", "Please enter your email.", "warning");
      return;
    }
    if (!phone.trim()) {
      Swal.fire("Missing Field", "Please enter your phone number.", "warning");
      return;
    }

    const phonePattern = /^\+?[0-9\s\-]{10,20}$/;
    if (!phonePattern.test(phone.trim())) {
      Swal.fire(
        "Invalid Phone",
        "Please enter a valid phone number (e.g., +91 9310147852).",
        "warning"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "https://admin.skyportdestinations.com/api/HolidayPackages/quick_enquiry",
        {
          name,
          email,
          phone,
          destination,
          message,
        }
      );

      if (res.data.success === true) {
        Swal.fire("Success", res.data.message, "success");
        setQuickFormData({
          name: "",
          email: "",
          phone: "",
          destination: (destination && destination) || "",
          message: "",
        });
        querycloseModal();
      } else {
        Swal.fire("Error", res.data.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit query. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // mobile modal
  const [showMobileModal, setShowMobileModal] = useState(false);

  const queryMobileModal = () => setShowMobileModal(!showMobileModal);
  const querycloseMobileModal = () => setShowMobileModal(false);

  return (
    <>
      <div className="whatsapp-button">
        <a
          href="https://api.whatsapp.com/send?phone=7618608"
          className="wa-widget-send-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            className="wa-messenger-svg-whatsapp wh-svg-icon"
          >
            <path
              d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
              fillRule="evenodd"
            />
          </svg>
        </a>
      </div>
      {/* Dekstop Modal Start */}
      <div className="DekstopModal">
        <div className="modal_btn fancy" id="CBtn" onClick={queryModal}>
          <img src="https://www.freeiconspng.com/thumbs/live-chat-icon/live-chat-icon-0.png" />
          <span>Enquire Now</span>
        </div>
      </div>
      {showModal && (
        <div className="custom-modal-overlay">
          {/* <div className="custom-modal-content"> */}
          <div id="myModal_er" className="modal_er">
            <div className="modal-content-er pd15n">
              <div style={{ position: "relative" }}>
                <div className="ppflex">
                  <p className="ppttl">Want to Go For A Memorable Holiday?</p>
                  <span className="close_er" onClick={querycloseModal}>
                    ×
                  </span>
                </div>

                <div
                  id="loaderqr"
                  className="container_loader"
                  style={{ display: "none" }}
                >
                  <div className="main-lodeact">
                    <div className="loader" />
                  </div>
                </div>

                <form id="contact">
                  <fieldset className="mflex jsb">
                    <div className="inp_n wd48p">
                      <input
                        placeholder="Destination"
                        type="text"
                        className="txt-inp"
                        name="destination"
                        value={quickFormData.destination}
                        onChange={handleQuickInputChange}
                        required
                      />
                    </div>
                  </fieldset>

                  <fieldset className="mflex jsb">
                    <div className="inp_n wd48p">
                      <input
                        placeholder="Your Name"
                        type="text"
                        className="txt-inp"
                        name="name"
                        value={quickFormData.name}
                        onChange={handleQuickInputChange}
                        required
                      />
                    </div>
                  </fieldset>

                  <fieldset className="jsb">
                    <div className="inp_n wd48p">
                      <input
                        placeholder="Your E-mail ID"
                        className="txt-inp1"
                        type="email"
                        name="email"
                        value={quickFormData.email}
                        onChange={handleQuickInputChange}
                        required
                      />
                    </div>

                    <div className="inp_n wd48p mflex jsb">
                      {/* <select style={{ width: 70, marginRight: 10 }}>
                                            <option value={+91}>+91</option>
                                            <option value={+91}>+91</option>
                                        </select> */}
                      <input
                        placeholder="Mobile No."
                        className="txt-inp"
                        type="text"
                        name="phone"
                        value={quickFormData.phone}
                        onChange={handleQuickInputChange}
                        required
                      />
                    </div>
                  </fieldset>

                  <fieldset className="mflex jsb">
                    <div className="inp_n wd100p">
                      <textarea
                        placeholder="Your Message"
                        className="txt-inp"
                        name="message"
                        value={quickFormData.message}
                        onChange={handleQuickInputChange}
                        style={{ minHeight: "80px" }}
                        required
                      />
                    </div>
                  </fieldset>

                  <fieldset>
                    <button
                      type="button"
                      className="sub_qu"
                      onClick={handleQuickSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="spinner"></span>
                      ) : (
                        "Enquire Now"
                      )}
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Dekstop Modal End */}
      {/* Dekstop Modal Start */}
      <div className="MobileModal">
        <div
          className={`modal_btn fancy ${showMobileModal ? "d-none" : ""}`}
          id="CBtn"
          onClick={queryMobileModal}
        >
          <img src="https://www.freeiconspng.com/thumbs/live-chat-icon/live-chat-icon-0.png" />
          <span>Enquire Now</span>
        </div>
        <div
          className={`modal_btn fancy ${
            showMobileModal ? "newgrad" : "d-none"
          }`}
          id="CBtn"
          onClick={queryMobileModal}
        >
          <div className="newimg">
            <img src="https://jsak.mmtcdn.com/holidays/rn/images/6fba72c0_ic_close_fab.webp" />
          </div>
        </div>
      </div>
      {showMobileModal && (
        <div className="BoxDetailAbove">
          <div className="BoxDetail">
            <a className="inbox brd" onClick={queryModal}>
              <div className="img">
                <img src="https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/phonixImages/Get%20a%20quote%20large.png" />
              </div>
              <div classname="detailContent">
                <h4
                  style={{
                    fontSize: "14px",
                    marginBottom: "3px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  Get a quote
                </h4>
                <p
                  style={{
                    fontSize: "10px",
                    marginBottom: "0px",
                    fontWeight: 400,
                    color: "#555454",
                  }}
                >
                  Customise your holiday to your liking
                </p>
              </div>
              <div className="arrow">
                <img src="https://jsak.mmtcdn.com/holidays/rn/images/e24c9778_RightArrow.webp" />
              </div>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=919211252356&text=I+need+Europe+tours+packages&type=phone_number&app_absent=0"
              className="inbox brd"
            >
              <div className="img">
                <img src="https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/phonixImages/Get%20a%20quote%20large.png" />
              </div>
              <div classname="detailContent">
                <h4
                  style={{
                    fontSize: "14px",
                    marginBottom: "3px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  Chat with Whatsapp
                </h4>
                <p
                  style={{
                    fontSize: "10px",
                    marginBottom: "0px",
                    fontWeight: 400,
                    color: "#555454",
                  }}
                >
                  Customise your holiday to your liking
                </p>
              </div>
              <div className="arrow">
                <img src="https://jsak.mmtcdn.com/holidays/rn/images/e24c9778_RightArrow.webp" />
              </div>
            </a>
            <a href="tel:+919211252356" className="inbox">
              <div className="img">
                <img src="https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/phonixImages/Get%20a%20quote%20large.png" />
              </div>
              <div classname="detailContent">
                <h4
                  style={{
                    fontSize: "14px",
                    marginBottom: "3px",
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  Call Us
                </h4>
                <p
                  style={{
                    fontSize: "10px",
                    marginBottom: "0px",
                    fontWeight: 400,
                    color: "#555454",
                  }}
                >
                  Our experts are just a call away
                </p>
              </div>
              <div className="arrow">
                <img src="https://jsak.mmtcdn.com/holidays/rn/images/e24c9778_RightArrow.webp" />
              </div>
            </a>
          </div>
        </div>
      )}
      {/* Mobile Modal End */}
    </>
  );
};

export default EnquiryPopup;

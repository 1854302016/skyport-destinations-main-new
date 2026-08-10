import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./css/EnquiryIcons.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const EnquiryIcons = ({ destination }) => {
  const location = useLocation();
  // console.log("Destination",destination);

  const isTourPage = location.pathname === "/";

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
        "https://admin.trustedfare.com/api/HolidayPackages/quick_enquiry",
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

  return (
    <>
      <div>
        {/* whatsapp icons */}
        <div className="conct-bar ">
          <div className="hld-cont ">
            <div className="d-flex cncrd">
              <a
                id="whatsup-dv"
                href="https://api.whatsapp.com/send/?phone=919211252356&text=I+need+Europe+tours+packages&type=phone_number&app_absent=0"
                className="whst"
              >
                <img
                  src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/whatsappp.svg"
                  width={25}
                />
                WhatsApp Chat
              </a>
              <div className="qrybx" id="myBt" onClick={queryModal}>
                <img
                  src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/query.svg"
                  width={30}
                />
                Submit Query
              </div>
            </div>
          </div>
        </div>
        {/* whatsapp icons */}
        {/* enquiry popup */}
        {/* enquiry popup */}
        {showModal && (
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
                        value={(destination && destination) || ""}
                        onChange={handleQuickInputChange}
                        readOnly
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
        )}

        {/* enquiry popup */}
      </div>
    </>
  );
};

export default EnquiryIcons;

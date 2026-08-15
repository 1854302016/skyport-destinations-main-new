import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { countryCodeNum } from "../../../CountryCodeNum";

const BDSend = ({ walletData, onDataChange }) => {
  const [formData, setFormData] = useState({
    countryCode: "+91",
    isoCode: "IN",
    mobile: "",
    email: "",
    gstChecked: false,
    companyName: "",
    registrationNo: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCountryChange = (e) => {
    const dialCode = e.target.value;
    const selectedCountry = countryCodeNum.find(c => c.dial_code === dialCode);
    setFormData(prev => ({
      ...prev,
      countryCode: dialCode,
      isoCode: selectedCountry ? selectedCountry.code : "GY"
    }));
  };

  // Notify parent on every change
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  return (
    <div className="componentContainer componentContainerAnother componentContainerAnother_BD_Send bdSendCard">
      <Row>
        <Col sm={2}></Col>
        <Col sm={10}>
          <div className="bdSendHeader" id="contactDetails">
            <p className="bdSendTitle">Booking details will be sent to</p>
            <span className="bdSendSubtitle">
              We'll use these details to confirm your booking
            </span>
          </div>

          <div className="bdSendFieldsRow">
            <div className="bdSendField bdSendPhoneField">
              <FaPhoneAlt className="bdSendFieldIcon" />
              <select
                name="countryCode"
                id="countryCode"
                className="bdSendCountrySelect"
                value={formData.countryCode}
                onChange={handleCountryChange}
              >
                {countryCodeNum.map((item, index) => (
                  <option key={index} value={item.dial_code}>
                    {item.code} ({item.dial_code})
                  </option>
                ))}
              </select>
              <span className="bdSendDivider" />
              <input
                className="bdSendInput"
                type="text"
                placeholder="Contact No"
                value={formData.mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  handleInputChange("mobile", val);
                }}
              />
            </div>

            <div className="bdSendField">
              <FaEnvelope className="bdSendFieldIcon" />
              <input
                className="bdSendInput"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="padding20" id="gstDetails">
            {formData.gstChecked && (
              <div className="appendTop15">
                <div className="adultItemRow">
                  <div
                    className="adultItem"
                    style={{ width: "30%", marginRight: "20px" }}
                  >
                    <div className="relative">
                      <label style={{ fontSize: "14px" }}>Company Name</label>
                      <input
                        autoComplete="none"
                        placeholder="Company Name"
                        className="tvlrInput"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="adultItem" style={{ width: "30%" }}>
                    <div className="relative">
                      <label style={{ fontSize: "14px" }}>GST No</label>
                      <input
                        autoComplete="none"
                        placeholder="Gst No"
                        className="tvlrInput"
                        type="text"
                        value={formData.registrationNo}
                        onChange={(e) =>
                          handleInputChange("registrationNo", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BDSend;

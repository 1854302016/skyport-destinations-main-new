import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { countryCodeNum } from "../../../CountryCodeNum";

const BDSend = ({ walletData, onDataChange }) => {
  const [formData, setFormData] = useState({
    countryCode: "+592",
    isoCode: "GY",
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
    <div className="componentContainer componentContainerAnother componentContainerAnother_BD_Send">
      <Row>
        <Col sm={2}></Col>
        <Col sm={10}>
          <div className="bookingDetailsForm" id="contactDetails">
            <p className="fontSize14 boldFont appendBottom15">
              Booking details will be sent to
            </p>
          </div>
          <Row className="adultItemRow">
            <Col sm={2} xs={4}>
              <div className="adultItem" id="Country Code">
                <div className="selectItem relative">
                  <div className="dropdown__control css-yk16xz-control">
                    <div className="dropdown__single-value css-1uccc91-singleValue">
                      <select
                        name="countryCode"
                        id="countryCode"
                        value={formData.countryCode}
                        onChange={handleCountryChange}
                        style={{
                          border: "none",
                          padding: "0px",
                          height: "20px",
                          fontSize: "14px",
                          width: "155px",
                          background: "transparent"
                        }}
                      >
                        {countryCodeNum.map((item, index) => (
                          <option key={index} value={item.dial_code}>
                            {item.name} ({item.dial_code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={5} xs={8}>
              <div className="adultItem flightBookingFirstName1">
                <div className="relative">
                  <input
                    className="tvlrInput"
                    type="text"
                    placeholder="Contact No"
                    value={formData.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      handleInputChange("mobile", val);
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col sm={5} xs={12}>
              <div className="adultItem flightBookingFirstName1">
                <div className="relative">
                  <input
                    className="tvlrInput"
                    type="text"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>
            </Col>

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
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default BDSend;

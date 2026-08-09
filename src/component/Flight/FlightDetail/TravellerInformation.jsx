import React, { useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import SignUp from "../../Navbar/SignUp";
// import { useAuth } from "../../../context/AuthContext";
import { TextField, Container, Button } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { countriesParto } from "../../../Countries";
import { useSelector } from "react-redux";
const TravellerInformation = ({
  srdvIdx,
  flight,
  handleInputChange,
  handleInputChange1,
  handleInputChange2,
  handleExpiryDateChange,
  handleExpiryDateChange1,
  handleExpiryDateChange2,
  handleDOBChange,
  handleDOBChange1,
  handleDOBChange2,
  formData,
  childData,
  infant,
}) => {
  // console.log("flighttraveller deatails", flight);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const expiryDateRef = useRef(null);
  const dobRef = useRef(null);
  const handleLogout = () => {
    // logout();
  };
  // const { isAuthenticated, logout } = useAuth();
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const [expanded, setExpanded] = useState(false);
  console.log(
    " flight?.FareBreakdown?.[0]?.PassengerCount",
    flight?.FareBreakdown?.[0]?.PassengerCount,
  );
  return (
    <div>
      {srdvIdx === "undefined" && (
        <div className="traveller_info">
          <h4>Traveller Information</h4>
          <div className="travellerLoginSection appendBottom10">
            <div className="makeFlex perfectCenter">
              <div className="appendRight10">
                <span
                  data-test="component-icon"
                  className="loginUserImg bgProperties"
                  style={{
                    backgroundImage:
                      'url("https://imgak.goibibo.com/flights-gi-assets/dt/common/icons/rt_t8.png")',
                  }}
                />
              </div>
              <p data-test="component-text" className="fontSize14">
                Log in to view your{" "}
                <b>saved traveller list, unlock amazing deals</b> &amp; much
                more!
              </p>
            </div>

            <div>
              <button
                data-cy=""
                type="button"
                className="loginBtn"
                onClick={() => {
                  isAuth ? handleLogout() : handleShow();
                  setExpanded(false);
                }}
              >
                {isAuth ? (
                  <div>{localStorage.getItem("names")}</div>
                ) : (
                  "LOGIN NOW"
                )}
              </button>
            </div>
          </div>
          <div
            className="alert-wrapper makeFlex appendBottom12 appendTop12 travellerSectionAlert appendBottom10"
            style={{
              backgroundColor: "rgb(255, 237, 209)",
              marginBottom: "10px",
            }}
          >
            <div className="makeFlex flexOne column">
              <p className="darkText fontSize12 fnt-600">
                <span
                  className="alert-text"
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#595959",
                  }}
                >
                  <b>Important: </b> Please ensure that the names of the
                  passengers on the travel documents are the same as on their
                  government-issued identity proof.
                  <br />
                </span>
              </p>
            </div>
          </div>
          {flight && (
            <Row>
              <React.Fragment>
                {[
                  ...Array(flight?.FareBreakdown?.[0]?.PassengerCount || 1),
                ].map((_, index) => (
                  <React.Fragment key={index}>
                    <Col sm={12} className="passport_field">
                      <Row>
                        <Col sm={2} className="form_field_col2">
                          <div className="contact_label cus_label">
                            <Form.Label>Adults {index + 1}</Form.Label>
                          </div>
                        </Col>
                        <Col sm={10} className="form_field_col10">
                          <div className="form_field form_select_field">
                            <div className="cus_field_input cus_select_title">
                              <Form.Control
                                as="select"
                                name={`title${index}`}
                                className="title form-control commoninputreset title_fname"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              >
                                <option>Title</option>
                                <option value="Mr">Mr.</option>
                                <option value="Ms">Ms.</option>
                                <option value="Mrs">Mrs.</option>
                              </Form.Control>
                            </div>
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`firstName${index}`}
                                placeholder="First Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="form_field">
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`lastName${index}`}
                                placeholder="Last Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              />
                            </div>
                          </div>
                          <div className="form_field">
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                as="select"
                                name={`nationality${index}`}
                                className="form-control commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                value={formData[index]?.nationalityCode || "IN"}
                              >
                                <option value="">Select Nationality</option>
                                {countriesParto.map((country) => (
                                  <option
                                    key={country.Code}
                                    value={country.Code}
                                  >
                                    {country.Name}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          </div>
                          <div className="date_field dob_TGG_Travel">
                            <div className="cus_field_input">
                              {/* <Form.Label>DOB</Form.Label> */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label={
                                    flight.IsLCC === false
                                      ? "Date of Birth"
                                      : "Date of Birth (optional)"
                                  }
                                  name={`date${index}`} // Dynamically set the name
                                  value={
                                    formData[index]?.date
                                      ? dayjs(formData[index]?.date)
                                      : null // Convert string to dayjs object
                                  }
                                  onChange={(newValue) => {
                                    const formattedValue =
                                      newValue && dayjs(newValue).isValid()
                                        ? newValue.format("YYYY-MM-DD")
                                        : "";

                                    const syntheticEvent = {
                                      target: {
                                        name: `date${index}`,
                                        value: formattedValue,
                                      },
                                    };
                                    handleInputChange(index, syntheticEvent);
                                  }}
                                  // onChange={(newValue) => {
                                  //   // Create a synthetic event to match handleDOBChange's expected input
                                  //   const syntheticEvent = {
                                  //     target: {
                                  //       name: `date${index}`,
                                  //       value:
                                  //         newValue?.format("YYYY-MM-DD") || "",
                                  //     },
                                  //   };
                                  //   handleInputChange(index, syntheticEvent);
                                  // }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      fullWidth
                                      label={
                                        flight.IsLCC === false
                                          ? "Date of Birth"
                                          : "Date of Birth (optional)"
                                      }
                                      autoComplete="off"
                                      style={{ height: "auto" }}
                                      className="commoninputreset form-control datepicker-infant-time-start hasDatepicker"
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {flight.IsPassportRequiredAtTicket === true && (
                        <Row>
                          <Col sm={2} className="form_field_col2">
                            <div className="contact_label cus_label">
                              <Form.Label>Passport Detail</Form.Label>
                            </div>
                          </Col>

                          <Col
                            sm={10}
                            className="form_field_col10 passport_TG_mandatory_div"
                          >
                            <Row className="align-items-center">
                              {/* Passport No */}
                              <Col sm={4}>
                                <div className="form_field">
                                  <div className="cus_field_input cus_name_field">
                                    <Form.Control
                                      type="text"
                                      name={`passport${index}`}
                                      placeholder="Passport No."
                                      className="form-control firstname commoninputreset"
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                              </Col>

                              {/* Issue Date */}
                              <Col sm={4}>
                                <div className="date_field dob_TGG_Travel">
                                  <div className="cus_field_input">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Issue Date"
                                        name={`issuedate${index}`}
                                        value={
                                          formData[index]?.issuedate
                                            ? dayjs(formData[index]?.issuedate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `issuedate${index}`,
                                              value:
                                                newValue?.format(
                                                  "YYYY-MM-DD",
                                                ) || "",
                                            },
                                          };
                                          handleInputChange(
                                            index,
                                            syntheticEvent,
                                          );
                                          if (expiryDateRef.current) {
                                            expiryDateRef.current.focus();
                                          }
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            className="commoninputreset"
                                            inputProps={{
                                              ...params.inputProps,
                                              max: new Date()
                                                .toISOString()
                                                .split("T")[0],
                                            }}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              </Col>

                              {/* Expiry Date */}
                              <Col sm={4}>
                                <div className="date_field dob_TGG_Travel">
                                  <div className="cus_field_input">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Expiry Date"
                                        name={`expirydate${index}`}
                                        value={
                                          formData[index]?.expirydate
                                            ? dayjs(formData[index]?.expirydate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `expirydate${index}`,
                                              value:
                                                newValue?.format(
                                                  "YYYY-MM-DD",
                                                ) || "",
                                            },
                                          };
                                          handleInputChange(
                                            index,
                                            syntheticEvent,
                                          );
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            placeholder="Expiry Date"
                                            autoComplete="off"
                                            style={{ height: "auto" }}
                                            inputProps={{
                                              ...params.inputProps,
                                              min: new Date()
                                                .toISOString()
                                                .split("T")[0],
                                            }}
                                            className="commoninputreset form-control datepicker-infant-time-start hasDatepicker"
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      )}
                      {/* )} */}
                    </Col>
                  </React.Fragment>
                ))}
              </React.Fragment>

              {flight.FareBreakdown[1] && (
                <React.Fragment>
                  {[...Array(flight.FareBreakdown[1].PassengerCount)].map(
                    (_, index) => (
                      <React.Fragment key={index}>
                        <Col sm={12} className="passport_field">
                          <Row>
                            <Col sm={2} className="form_field_col2">
                              <div className="contact_label cus_label">
                                <Form.Label>Child {index + 1}</Form.Label>
                              </div>
                            </Col>
                            <Col sm={10} className="form_field_col10">
                              <div className="form_field form_select_field">
                                <div className="cus_field_input cus_select_title">
                                  <Form.Control
                                    as="select"
                                    name={`title${index}`}
                                    className="title form-control commoninputreset title_fname"
                                    onChange={(e) =>
                                      handleInputChange1(index, e)
                                    }
                                    autoComplete="off"
                                  >
                                    <option>Title</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Miss">Ms.</option>
                                    <option value="Miss">Mrs.</option>
                                  </Form.Control>
                                </div>
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    type="text"
                                    name={`firstName${index}`}
                                    placeholder="First Name"
                                    className="form-control firstname commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange1(index, e)
                                    }
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                              <div className="form_field">
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    type="text"
                                    name={`lastName${index}`}
                                    placeholder="Last Name"
                                    className="form-control firstname commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange1(index, e)
                                    }
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                              <div className="form_field">
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    as="select"
                                    name={`nationality${index}`}
                                    className="form-control commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange1(index, e)
                                    }
                                    value={
                                      childData[index]?.nationalityCode || "IN"
                                    }
                                  >
                                    <option value="">Select Nationality</option>
                                    {countriesParto.map((country) => (
                                      <option
                                        key={country.Code}
                                        value={country.Code}
                                      >
                                        {country.Name}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </div>
                              </div>
                              <div className="date_field dob_TGG_Travel">
                                <div className="cus_field_input">
                                  {/* <Form.Label>DOB</Form.Label> */}
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Date of Birth"
                                      name={`date${index}`}
                                      value={
                                        childData &&
                                        childData[index] &&
                                        childData[index].date
                                          ? dayjs(childData[index].date)
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        const syntheticEvent = {
                                          target: {
                                            name: `date${index}`,
                                            value: newValue
                                              ? newValue.format("YYYY-MM-DD")
                                              : "",
                                          },
                                        };
                                        handleInputChange1(
                                          index,
                                          syntheticEvent,
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          className="commoninputreset"
                                          inputProps={{
                                            ...params.inputProps,
                                            max: new Date()
                                              .toISOString()
                                              .split("T")[0], // Optional: Set max to today's date
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          {/* {(flight.PricedItinerary.IsPassportIssueDateMandatory ||
                          flight.PricedItinerary.IsPassportMandatory ||
                          flight.PricedItinerary.IsPassportNameWithSpace) && ( */}
                          {flight.IsPassportRequiredAtTicket === true && (
                            <Row>
                              <Col sm={2} className="form_field_col2">
                                <div className="contact_label cus_label">
                                  <Form.Label>Passport Detail</Form.Label>
                                </div>
                              </Col>
                              <Col sm={10} className="form_field_col10 ">
                                {/* <div className="form_field form_select_field">
                            <div className="cus_field_input cus_select_title">
                              <Form.Control
                                as="select"
                                name={`title${index}`}
                                className="title form-control commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              >
                                <option>Title</option>
                                <option value="Mr">Mr.</option>
                                <option value="Ms">Ms.</option>
                                <option value="Mrs">Mrs.</option>
                              </Form.Control>
                            </div>
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`firstName${index}`}
                                placeholder="First Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              />
                            </div>
                          </div> */}
                                <div className="form_field">
                                  <div className="cus_field_input cus_name_field">
                                    <Form.Control
                                      type="text"
                                      name={`passport${index}`}
                                      placeholder="Passport No."
                                      className="form-control firstname commoninputreset"
                                      onChange={(e) =>
                                        handleInputChange1(index, e)
                                      }
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>

                                <div
                                  className="date_field"
                                  style={{ marginRight: "15px" }}
                                >
                                  <div className="cus_field_input">
                                    {/* <Form.Label>Issue Date</Form.Label> */}
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Issue Date"
                                        name={`issuedate${index}`}
                                        value={
                                          childData[index]?.issuedate
                                            ? dayjs(childData[index]?.issuedate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `issuedate${index}`,
                                              value: newValue
                                                ? newValue.format("YYYY-MM-DD")
                                                : "",
                                            },
                                          };
                                          handleInputChange1(
                                            index,
                                            syntheticEvent,
                                          );
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            className="commoninputreset"
                                            inputProps={{
                                              ...params.inputProps,
                                              max: new Date()
                                                .toISOString()
                                                .split("T")[0], // Set max to today's date
                                            }}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>

                                <div
                                  className="date_field"
                                  style={{ marginRight: "15px" }}
                                >
                                  <div className="cus_field_input">
                                    {/* <Form.Label>Expiry Date</Form.Label> */}
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Expiry Date"
                                        name={`expirydate${index}`}
                                        value={
                                          childData &&
                                          childData[index] &&
                                          childData[index].expirydate
                                            ? dayjs(childData[index].expirydate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `expirydate${index}`,
                                              value: newValue
                                                ? newValue.format("YYYY-MM-DD")
                                                : "",
                                            },
                                          };
                                          handleInputChange1(
                                            index,
                                            syntheticEvent,
                                          );
                                        }}
                                        minDate={dayjs()} // Set the min date to today
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            className="commoninputreset"
                                            inputProps={{
                                              ...params.inputProps,
                                              max: new Date()
                                                .toISOString()
                                                .split("T")[0], // Set max to today's date
                                            }}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          )}
                          {/* )} */}
                        </Col>
                      </React.Fragment>
                    ),
                  )}
                </React.Fragment>
              )}

              {flight.FareBreakdown[2] && (
                <React.Fragment>
                  {[...Array(flight.FareBreakdown[2].PassengerCount)].map(
                    (_, index) => (
                      <React.Fragment key={index}>
                        <Col sm={12} className="passport_field">
                          <Row>
                            <Col sm={2} className="form_field_col2">
                              <div className="contact_label cus_label">
                                <Form.Label>Infant {index + 1}</Form.Label>
                              </div>
                            </Col>
                            <Col sm={10} className="form_field_col10">
                              <div className="form_field form_select_field">
                                <div className="cus_field_input cus_select_title">
                                  <Form.Control
                                    as="select"
                                    name={`title${index}`}
                                    className="title form-control commoninputreset title_fname"
                                    onChange={(e) =>
                                      handleInputChange2(index, e)
                                    }
                                    autoComplete="off"
                                  >
                                    <option>Title</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Miss">Ms.</option>
                                    <option value="Miss">Mrs.</option>
                                  </Form.Control>
                                </div>
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    type="text"
                                    name={`firstName${index}`}
                                    placeholder="First Name"
                                    className="form-control firstname commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange2(index, e)
                                    }
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                              <div className="form_field">
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    type="text"
                                    name={`lastName${index}`}
                                    placeholder="Last Name"
                                    className="form-control firstname commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange2(index, e)
                                    }
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                              <div className="form_field">
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    as="select"
                                    name={`nationality${index}`}
                                    className="form-control commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange2(index, e)
                                    }
                                    value={
                                      infant[index]?.nationalityCode || "IN"
                                    }
                                  >
                                    <option value="">Select Nationality</option>
                                    {countriesParto.map((country) => (
                                      <option
                                        key={country.Code}
                                        value={country.Code}
                                      >
                                        {country.Name}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </div>
                              </div>
                              <div className="date_field dob_TGG_Travel">
                                <div className="cus_field_input">
                                  {/* <Form.Label>DOB</Form.Label> */}
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Date of Birth"
                                      name={`date${index}`}
                                      value={
                                        infant &&
                                        infant[index] &&
                                        infant[index].date
                                          ? dayjs(infant[index].date)
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        const syntheticEvent = {
                                          target: {
                                            name: `date${index}`,
                                            value: newValue
                                              ? newValue.format("YYYY-MM-DD")
                                              : "",
                                          },
                                        };
                                        handleInputChange2(
                                          index,
                                          syntheticEvent,
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          className="commoninputreset"
                                          inputProps={{
                                            ...params.inputProps,
                                            max: new Date()
                                              .toISOString()
                                              .split("T")[0], // Optional: Set max to today's date
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          {/* {(flight.PricedItinerary.IsPassportIssueDateMandatory ||
                          flight.PricedItinerary.IsPassportMandatory ||
                          flight.PricedItinerary.IsPassportNameWithSpace) && ( */}
                          {flight.IsPassportRequiredAtTicket === true && (
                            <Row>
                              <Col sm={2} className="form_field_col2">
                                <div className="contact_label cus_label">
                                  <Form.Label>Passport Detail</Form.Label>
                                </div>
                              </Col>
                              <Col sm={10} className="form_field_col10 ">
                                {/* <div className="form_field form_select_field">
                            <div className="cus_field_input cus_select_title">
                              <Form.Control
                                as="select"
                                name={`title${index}`}
                                className="title form-control commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              >
                                <option>Title</option>
                                <option value="Mr">Mr.</option>
                                <option value="Ms">Ms.</option>
                                <option value="Mrs">Mrs.</option>
                              </Form.Control>
                            </div>
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`firstName${index}`}
                                placeholder="First Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              />
                            </div>
                          </div> */}
                                <div className="form_field">
                                  <div className="cus_field_input cus_name_field">
                                    <Form.Control
                                      type="text"
                                      name={`passport${index}`}
                                      placeholder="Passport No."
                                      className="form-control firstname commoninputreset"
                                      onChange={(e) =>
                                        handleInputChange2(index, e)
                                      }
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>

                                <div
                                  className="date_field"
                                  style={{ marginRight: "15px" }}
                                >
                                  <div className="cus_field_input">
                                    {/* <Form.Label>Issue Date</Form.Label> */}
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Issue Date"
                                        name={`issuedate${index}`}
                                        value={
                                          infant &&
                                          infant[index] &&
                                          infant[index].issuedate
                                            ? dayjs(infant[index].issuedate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `issuedate${index}`,
                                              value: newValue
                                                ? newValue.format("YYYY-MM-DD")
                                                : "",
                                            },
                                          };
                                          handleInputChange2(
                                            index,
                                            syntheticEvent,
                                          );
                                        }}
                                        maxDate={dayjs()} // Set max to today's date
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            className="commoninputreset"
                                            inputProps={{
                                              ...params.inputProps,
                                              max: new Date()
                                                .toISOString()
                                                .split("T")[0], // Set max to today's date
                                            }}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>

                                <div
                                  className="date_field"
                                  style={{ marginRight: "15px" }}
                                >
                                  <div className="cus_field_input">
                                    {/* <Form.Label>Expiry Date</Form.Label> */}
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Expiry Date"
                                        name={`expirydate${index}`}
                                        value={
                                          infant &&
                                          infant[index] &&
                                          infant[index].expirydate
                                            ? dayjs(infant[index].expirydate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `expirydate${index}`,
                                              value: newValue
                                                ? newValue.format("YYYY-MM-DD")
                                                : "",
                                            },
                                          };
                                          handleInputChange2(
                                            index,
                                            syntheticEvent,
                                          );
                                        }}
                                        minDate={dayjs()} // Set min date to today
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            className="commoninputreset"
                                            inputProps={{
                                              ...params.inputProps,
                                              max: new Date()
                                                .toISOString()
                                                .split("T")[0], // Optional: Set max to today's date
                                            }}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          )}
                          {/* )} */}
                        </Col>
                      </React.Fragment>
                    ),
                  )}
                </React.Fragment>
              )}
            </Row>
          )}
          {/* <div
            className="alert-wrapper makeFlex appendBottom12 appendTop12 travellerSectionAlert"
            style={{ backgroundColor: "rgb(255, 237, 209)" }}
          >
            <div className="makeFlex flexOne column">
              <p className="darkText fontSize12 boldFont">
                <span className="alert-text">
                  <b>Important: </b>Please ensure that the names of the
                  passengers on the travel documents are the same as on their
                  government-issued identity proof.
                  <br />
                </span>
              </p>
            </div>
          </div> */}
        </div>
      )}

      {srdvIdx === "EwebM" && (
        <div className="traveller_info">
          <h4>Traveller Information</h4>
          <div className="travellerLoginSection appendBottom10">
            <div className="makeFlex perfectCenter">
              <div className="appendRight10">
                <span
                  data-test="component-icon"
                  className="loginUserImg bgProperties"
                  style={{
                    backgroundImage:
                      'url("https://imgak.goibibo.com/flights-gi-assets/dt/common/icons/rt_t8.png")',
                  }}
                />
              </div>
              <p data-test="component-text" className="fontSize14">
                Log in to view your{" "}
                <b>saved traveller list, unlock amazing deals</b> &amp; much
                more!
              </p>
            </div>

            <div>
              <button
                data-cy=""
                type="button"
                className="loginBtn"
                onClick={() => {
                  isAuth ? handleLogout() : handleShow();
                  setExpanded(false);
                }}
              >
                {isAuth ? (
                  <div>{localStorage.getItem("names")}</div>
                ) : (
                  "LOGIN NOW"
                )}
              </button>
            </div>
          </div>
          <div
            className="alert-wrapper makeFlex appendBottom12 appendTop12 travellerSectionAlert appendBottom10"
            style={{
              backgroundColor: "rgb(255, 237, 209)",
              marginBottom: "10px",
            }}
          >
            <div className="makeFlex flexOne column">
              <p className="darkText fontSize12 fnt-600">
                <span
                  className="alert-text"
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#595959",
                  }}
                >
                  <b>Important: </b> Please ensure that the names of the
                  passengers on the travel documents are the same as on their
                  government-issued identity proof.
                  <br />
                </span>
              </p>
            </div>
          </div>
          {flight && (
            <Row>
              <React.Fragment>
                {[
                  ...Array(
                    flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
                      .PTC_FareBreakdowns[0].PassengerTypeQuantity.Quantity ||
                      1,
                  ),
                ].map((_, index) => (
                  <React.Fragment key={index}>
                    <Col sm={12} className="passport_field">
                      <Row>
                        <Col sm={2} className="form_field_col2">
                          <div className="contact_label cus_label">
                            <Form.Label>Adults {index + 1}</Form.Label>
                          </div>
                        </Col>
                        <Col sm={10} className="form_field_col10">
                          <div className="form_field form_select_field">
                            <div className="cus_field_input cus_select_title">
                              <Form.Control
                                as="select"
                                name={`title${index}`}
                                className="title form-control commoninputreset title_fname"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              >
                                <option>Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                              </Form.Control>
                            </div>
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`firstName${index}`}
                                placeholder="First Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                                maxLength={
                                  flight?.PricedItineraries?.[0]
                                    ?.PaxNameCharacterLimit
                                    ? Math.floor(
                                        flight.PricedItineraries[0]
                                          .PaxNameCharacterLimit,
                                      )
                                    : 30
                                }
                              />
                            </div>
                          </div>
                          <div className="form_field">
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`lastName${index}`}
                                placeholder="Last Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                                maxLength={
                                  flight?.PricedItineraries?.[0]
                                    ?.PaxNameCharacterLimit
                                    ? Math.floor(
                                        flight.PricedItineraries[0]
                                          .PaxNameCharacterLimit,
                                      )
                                    : 30
                                }
                              />
                            </div>
                          </div>
                          <div className="form_field">
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                as="select"
                                name={`nationality${index}`}
                                className="form-control commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                value={formData[index]?.nationalityCode || "IN"}
                              >
                                <option value="">Select Nationality</option>
                                {countriesParto.map((country) => (
                                  <option
                                    key={country.Code}
                                    value={country.Code}
                                  >
                                    {country.Name}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          </div>
                          <div className="date_field dob_TGG_Travel">
                            <div className="cus_field_input">
                              {/* <Form.Label>DOB</Form.Label> */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Date of Birth"
                                  // {
                                  //   flight.IsLCC === false
                                  //     ? "Date of Birth"
                                  //     : "Date of Birth (optional)"
                                  // }
                                  name={`date${index}`} // Dynamically set the name
                                  value={
                                    formData[index]?.date
                                      ? dayjs(formData[index]?.date)
                                      : null // Convert string to dayjs object
                                  }
                                  onChange={(newValue) => {
                                    const formattedValue =
                                      newValue && dayjs(newValue).isValid()
                                        ? newValue.format("YYYY-MM-DD")
                                        : "";

                                    const syntheticEvent = {
                                      target: {
                                        name: `date${index}`,
                                        value: formattedValue,
                                      },
                                    };
                                    handleInputChange(index, syntheticEvent);
                                  }}
                                  // onChange={(newValue) => {
                                  //   // Create a synthetic event to match handleDOBChange's expected input
                                  //   const syntheticEvent = {
                                  //     target: {
                                  //       name: `date${index}`,
                                  //       value:
                                  //         newValue?.format("YYYY-MM-DD") || "",
                                  //     },
                                  //   };
                                  //   handleInputChange(index, syntheticEvent);
                                  // }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      fullWidth
                                      label="Date of Birth"
                                      // {
                                      //   flight.IsLCC === false
                                      //     ? "Date of Birth"
                                      //     : "Date of Birth (optional)"
                                      // }
                                      autoComplete="off"
                                      style={{ height: "auto" }}
                                      className="commoninputreset form-control datepicker-infant-time-start hasDatepicker"
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {flight.PricedItineraries[0].IsPassportMandatory ===
                        true && (
                        <Row>
                          <Col sm={2} className="form_field_col2">
                            <div className="contact_label cus_label">
                              <Form.Label>Passport Detail</Form.Label>
                            </div>
                          </Col>

                          <Col
                            sm={10}
                            className="form_field_col10 passport_TG_mandatory_div"
                          >
                            <Row className="align-items-center">
                              {/* Passport No */}
                              <Col sm={4}>
                                <div className="form_field">
                                  <div className="cus_field_input cus_name_field">
                                    <Form.Control
                                      type="text"
                                      name={`passport${index}`}
                                      placeholder="Passport No."
                                      className="form-control firstname commoninputreset"
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                              </Col>

                              {/* Issue Date */}
                              <Col sm={4}>
                                <div className="date_field dob_TGG_Travel">
                                  <div className="cus_field_input">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Issue Date"
                                        name={`issuedate${index}`}
                                        value={
                                          formData[index]?.issuedate
                                            ? dayjs(formData[index]?.issuedate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `issuedate${index}`,
                                              value:
                                                newValue?.format(
                                                  "YYYY-MM-DD",
                                                ) || "",
                                            },
                                          };
                                          handleInputChange(
                                            index,
                                            syntheticEvent,
                                          );
                                          if (expiryDateRef.current) {
                                            expiryDateRef.current.focus();
                                          }
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            className="commoninputreset"
                                            inputProps={{
                                              ...params.inputProps,
                                              max: new Date()
                                                .toISOString()
                                                .split("T")[0],
                                            }}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              </Col>

                              {/* Expiry Date */}
                              <Col sm={4}>
                                <div className="date_field dob_TGG_Travel">
                                  <div className="cus_field_input">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Expiry Date"
                                        name={`expirydate${index}`}
                                        value={
                                          formData[index]?.expirydate
                                            ? dayjs(formData[index]?.expirydate)
                                            : null
                                        }
                                        onChange={(newValue) => {
                                          const syntheticEvent = {
                                            target: {
                                              name: `expirydate${index}`,
                                              value:
                                                newValue?.format(
                                                  "YYYY-MM-DD",
                                                ) || "",
                                            },
                                          };
                                          handleInputChange(
                                            index,
                                            syntheticEvent,
                                          );
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            placeholder="Expiry Date"
                                            autoComplete="off"
                                            style={{ height: "auto" }}
                                            inputProps={{
                                              ...params.inputProps,
                                              min: new Date()
                                                .toISOString()
                                                .split("T")[0],
                                            }}
                                            className="commoninputreset form-control datepicker-infant-time-start hasDatepicker"
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      )}
                      {/* )} */}
                    </Col>
                  </React.Fragment>
                ))}
              </React.Fragment>

              {flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
                .PTC_FareBreakdowns[1] && (
                <React.Fragment>
                  {[
                    ...Array(
                      flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
                        .PTC_FareBreakdowns[1].PassengerTypeQuantity.Quantity,
                    ),
                  ].map((_, index) => (
                    <React.Fragment key={index}>
                      <Col sm={12} className="passport_field">
                        <Row>
                          <Col sm={2} className="form_field_col2">
                            <div className="contact_label cus_label">
                              <Form.Label>Child {index + 1}</Form.Label>
                            </div>
                          </Col>
                          <Col sm={10} className="form_field_col10">
                            <div className="form_field form_select_field">
                              <div className="cus_field_input cus_select_title">
                                <Form.Control
                                  as="select"
                                  name={`title${index}`}
                                  className="title form-control commoninputreset title_fname"
                                  onChange={(e) => handleInputChange1(index, e)}
                                  autoComplete="off"
                                >
                                  <option>Title</option>
                                  <option value="Mstr">Mstr</option>
                                  <option value="Miss">Miss</option>
                                </Form.Control>
                              </div>
                              <div className="cus_field_input cus_name_field">
                                <Form.Control
                                  type="text"
                                  name={`firstName${index}`}
                                  placeholder="First Name"
                                  className="form-control firstname commoninputreset"
                                  onChange={(e) => handleInputChange1(index, e)}
                                  autoComplete="off"
                                  maxLength={
                                    flight?.PricedItineraries?.[0]
                                      ?.PaxNameCharacterLimit
                                      ? Math.floor(
                                          flight.PricedItineraries[0]
                                            .PaxNameCharacterLimit,
                                        )
                                      : 30
                                  }
                                />
                              </div>
                            </div>
                            <div className="form_field">
                              <div className="cus_field_input cus_name_field">
                                <Form.Control
                                  type="text"
                                  name={`lastName${index}`}
                                  placeholder="Last Name"
                                  className="form-control firstname commoninputreset"
                                  onChange={(e) => handleInputChange1(index, e)}
                                  autoComplete="off"
                                  maxLength={
                                    flight?.PricedItineraries?.[0]
                                      ?.PaxNameCharacterLimit
                                      ? Math.floor(
                                          flight.PricedItineraries[0]
                                            .PaxNameCharacterLimit,
                                        )
                                      : 30
                                  }
                                />
                              </div>
                            </div>
                            <div className="form_field">
                              <div className="cus_field_input cus_name_field">
                                <Form.Control
                                  as="select"
                                  name={`nationality${index}`}
                                  className="form-control commoninputreset"
                                  onChange={(e) => handleInputChange1(index, e)}
                                  value={
                                    childData[index]?.nationalityCode || "IN"
                                  }
                                >
                                  <option value="">Select Nationality</option>
                                  {countriesParto.map((country) => (
                                    <option
                                      key={country.Code}
                                      value={country.Code}
                                    >
                                      {country.Name}
                                    </option>
                                  ))}
                                </Form.Control>
                              </div>
                            </div>
                            <div className="date_field dob_TGG_Travel">
                              <div className="cus_field_input">
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    label="Date of Birth"
                                    name={`date${index}`}
                                    value={
                                      childData &&
                                      childData[index] &&
                                      childData[index].date
                                        ? dayjs(childData[index].date)
                                        : null
                                    }
                                    onChange={(newValue) => {
                                      const syntheticEvent = {
                                        target: {
                                          name: `date${index}`,
                                          value: newValue
                                            ? newValue.format("YYYY-MM-DD")
                                            : "",
                                        },
                                      };
                                      handleInputChange1(index, syntheticEvent);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        fullWidth
                                        className="commoninputreset"
                                        inputProps={{
                                          ...params.inputProps,
                                          max: new Date()
                                            .toISOString()
                                            .split("T")[0], // Optional: Set max to today's date
                                        }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {/* {(flight.PricedItinerary.IsPassportIssueDateMandatory ||
                          flight.PricedItinerary.IsPassportMandatory ||
                          flight.PricedItinerary.IsPassportNameWithSpace) && ( */}
                        {flight.PricedItineraries[0].IsPassportMandatory ===
                          true && (
                          <Row>
                            <Col sm={2} className="form_field_col2">
                              <div className="contact_label cus_label">
                                <Form.Label>Passport Detail</Form.Label>
                              </div>
                            </Col>
                            <Col sm={10} className="form_field_col10 ">
                              {/* <div className="form_field form_select_field">
                            <div className="cus_field_input cus_select_title">
                              <Form.Control
                                as="select"
                                name={`title${index}`}
                                className="title form-control commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              >
                                <option>Title</option>
                                <option value="Mr">Mr.</option>
                                <option value="Ms">Ms.</option>
                                <option value="Mrs">Mrs.</option>
                              </Form.Control>
                            </div>
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`firstName${index}`}
                                placeholder="First Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              />
                            </div>
                          </div> */}
                              <div className="form_field">
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    type="text"
                                    name={`passport${index}`}
                                    placeholder="Passport No."
                                    className="form-control firstname commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange1(index, e)
                                    }
                                    autoComplete="off"
                                  />
                                </div>
                              </div>

                              <div
                                className="date_field"
                                style={{ marginRight: "15px" }}
                              >
                                <div className="cus_field_input">
                                  {/* <Form.Label>Issue Date</Form.Label> */}
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Issue Date"
                                      name={`issuedate${index}`}
                                      value={
                                        childData[index]?.issuedate
                                          ? dayjs(childData[index]?.issuedate)
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        const syntheticEvent = {
                                          target: {
                                            name: `issuedate${index}`,
                                            value: newValue
                                              ? newValue.format("YYYY-MM-DD")
                                              : "",
                                          },
                                        };
                                        handleInputChange1(
                                          index,
                                          syntheticEvent,
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          className="commoninputreset"
                                          inputProps={{
                                            ...params.inputProps,
                                            max: new Date()
                                              .toISOString()
                                              .split("T")[0], // Set max to today's date
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>

                              <div
                                className="date_field"
                                style={{ marginRight: "15px" }}
                              >
                                <div className="cus_field_input">
                                  {/* <Form.Label>Expiry Date</Form.Label> */}
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Expiry Date"
                                      name={`expirydate${index}`}
                                      value={
                                        childData &&
                                        childData[index] &&
                                        childData[index].expirydate
                                          ? dayjs(childData[index].expirydate)
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        const syntheticEvent = {
                                          target: {
                                            name: `expirydate${index}`,
                                            value: newValue
                                              ? newValue.format("YYYY-MM-DD")
                                              : "",
                                          },
                                        };
                                        handleInputChange1(
                                          index,
                                          syntheticEvent,
                                        );
                                      }}
                                      minDate={dayjs()} // Set the min date to today
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          className="commoninputreset"
                                          inputProps={{
                                            ...params.inputProps,
                                            max: new Date()
                                              .toISOString()
                                              .split("T")[0], // Set max to today's date
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        )}
                      </Col>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}

              {flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
                .PTC_FareBreakdowns[2] && (
                <React.Fragment>
                  {[
                    ...Array(
                      flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
                        .PTC_FareBreakdowns[2].PassengerTypeQuantity.Quantity,
                    ),
                  ].map((_, index) => (
                    <React.Fragment key={index}>
                      <Col sm={12} className="passport_field">
                        <Row>
                          <Col sm={2} className="form_field_col2">
                            <div className="contact_label cus_label">
                              <Form.Label>Infant {index + 1}</Form.Label>
                            </div>
                          </Col>
                          <Col sm={10} className="form_field_col10">
                            <div className="form_field form_select_field">
                              <div className="cus_field_input cus_select_title">
                                <Form.Control
                                  as="select"
                                  name={`title${index}`}
                                  className="title form-control commoninputreset title_fname"
                                  onChange={(e) => handleInputChange2(index, e)}
                                  autoComplete="off"
                                >
                                  <option>Title</option>
                                  <option value="Mstr">Mstr</option>
                                  <option value="Miss">Miss</option>
                                </Form.Control>
                              </div>
                              <div className="cus_field_input cus_name_field">
                                <Form.Control
                                  type="text"
                                  name={`firstName${index}`}
                                  placeholder="First Name"
                                  className="form-control firstname commoninputreset"
                                  onChange={(e) => handleInputChange2(index, e)}
                                  autoComplete="off"
                                  maxLength={
                                    flight?.PricedItineraries?.[0]
                                      ?.PaxNameCharacterLimit
                                      ? Math.floor(
                                          flight.PricedItineraries[0]
                                            .PaxNameCharacterLimit,
                                        )
                                      : 30
                                  }
                                />
                              </div>
                            </div>
                            <div className="form_field">
                              <div className="cus_field_input cus_name_field">
                                <Form.Control
                                  type="text"
                                  name={`lastName${index}`}
                                  placeholder="Last Name"
                                  className="form-control firstname commoninputreset"
                                  onChange={(e) => handleInputChange2(index, e)}
                                  autoComplete="off"
                                  maxLength={
                                    flight?.PricedItineraries?.[0]
                                      ?.PaxNameCharacterLimit
                                      ? Math.floor(
                                          flight.PricedItineraries[0]
                                            .PaxNameCharacterLimit,
                                        )
                                      : 30
                                  }
                                />
                              </div>
                            </div>
                            <div className="form_field">
                              <div className="cus_field_input cus_name_field">
                                <Form.Control
                                  as="select"
                                  name={`nationality${index}`}
                                  className="form-control commoninputreset"
                                  onChange={(e) => handleInputChange2(index, e)}
                                  value={infant[index]?.nationalityCode || "IN"}
                                >
                                  <option value="">Select Nationality</option>
                                  {countriesParto.map((country) => (
                                    <option
                                      key={country.Code}
                                      value={country.Code}
                                    >
                                      {country.Name}
                                    </option>
                                  ))}
                                </Form.Control>
                              </div>
                            </div>
                            <div className="date_field dob_TGG_Travel">
                              <div className="cus_field_input">
                                {/* <Form.Label>DOB</Form.Label> */}
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    label="Date of Birth"
                                    name={`date${index}`}
                                    value={
                                      infant &&
                                      infant[index] &&
                                      infant[index].date
                                        ? dayjs(infant[index].date)
                                        : null
                                    }
                                    onChange={(newValue) => {
                                      const syntheticEvent = {
                                        target: {
                                          name: `date${index}`,
                                          value: newValue
                                            ? newValue.format("YYYY-MM-DD")
                                            : "",
                                        },
                                      };
                                      handleInputChange2(index, syntheticEvent);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        fullWidth
                                        className="commoninputreset"
                                        inputProps={{
                                          ...params.inputProps,
                                          max: new Date()
                                            .toISOString()
                                            .split("T")[0], // Optional: Set max to today's date
                                        }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {/* {(flight.PricedItinerary.IsPassportIssueDateMandatory ||
                          flight.PricedItinerary.IsPassportMandatory ||
                          flight.PricedItinerary.IsPassportNameWithSpace) && ( */}
                        {flight.PricedItineraries[0].IsPassportMandatory ===
                          true && (
                          <Row>
                            <Col sm={2} className="form_field_col2">
                              <div className="contact_label cus_label">
                                <Form.Label>Passport Detail</Form.Label>
                              </div>
                            </Col>
                            <Col sm={10} className="form_field_col10 ">
                              {/* <div className="form_field form_select_field">
                            <div className="cus_field_input cus_select_title">
                              <Form.Control
                                as="select"
                                name={`title${index}`}
                                className="title form-control commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              >
                                <option>Title</option>
                                <option value="Mr">Mr.</option>
                                <option value="Ms">Ms.</option>
                                <option value="Mrs">Mrs.</option>
                              </Form.Control>
                            </div>
                            <div className="cus_field_input cus_name_field">
                              <Form.Control
                                type="text"
                                name={`firstName${index}`}
                                placeholder="First Name"
                                className="form-control firstname commoninputreset"
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                              />
                            </div>
                          </div> */}
                              <div className="form_field">
                                <div className="cus_field_input cus_name_field">
                                  <Form.Control
                                    type="text"
                                    name={`passport${index}`}
                                    placeholder="Passport No."
                                    className="form-control firstname commoninputreset"
                                    onChange={(e) =>
                                      handleInputChange2(index, e)
                                    }
                                    autoComplete="off"
                                  />
                                </div>
                              </div>

                              <div
                                className="date_field"
                                style={{ marginRight: "15px" }}
                              >
                                <div className="cus_field_input">
                                  {/* <Form.Label>Issue Date</Form.Label> */}
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Issue Date"
                                      name={`issuedate${index}`}
                                      value={
                                        infant &&
                                        infant[index] &&
                                        infant[index].issuedate
                                          ? dayjs(infant[index].issuedate)
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        const syntheticEvent = {
                                          target: {
                                            name: `issuedate${index}`,
                                            value: newValue
                                              ? newValue.format("YYYY-MM-DD")
                                              : "",
                                          },
                                        };
                                        handleInputChange2(
                                          index,
                                          syntheticEvent,
                                        );
                                      }}
                                      maxDate={dayjs()} // Set max to today's date
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          className="commoninputreset"
                                          inputProps={{
                                            ...params.inputProps,
                                            max: new Date()
                                              .toISOString()
                                              .split("T")[0], // Set max to today's date
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>

                              <div
                                className="date_field"
                                style={{ marginRight: "15px" }}
                              >
                                <div className="cus_field_input">
                                  {/* <Form.Label>Expiry Date</Form.Label> */}
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      label="Expiry Date"
                                      name={`expirydate${index}`}
                                      value={
                                        infant &&
                                        infant[index] &&
                                        infant[index].expirydate
                                          ? dayjs(infant[index].expirydate)
                                          : null
                                      }
                                      onChange={(newValue) => {
                                        const syntheticEvent = {
                                          target: {
                                            name: `expirydate${index}`,
                                            value: newValue
                                              ? newValue.format("YYYY-MM-DD")
                                              : "",
                                          },
                                        };
                                        handleInputChange2(
                                          index,
                                          syntheticEvent,
                                        );
                                      }}
                                      minDate={dayjs()} // Set min date to today
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          className="commoninputreset"
                                          inputProps={{
                                            ...params.inputProps,
                                            max: new Date()
                                              .toISOString()
                                              .split("T")[0], // Optional: Set max to today's date
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        )}
                        {/* )} */}
                      </Col>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </Row>
          )}
          {/* <div
            className="alert-wrapper makeFlex appendBottom12 appendTop12 travellerSectionAlert"
            style={{ backgroundColor: "rgb(255, 237, 209)" }}
          >
            <div className="makeFlex flexOne column">
              <p className="darkText fontSize12 boldFont">
                <span className="alert-text">
                  <b>Important: </b>Please ensure that the names of the
                  passengers on the travel documents are the same as on their
                  government-issued identity proof.
                  <br />
                </span>
              </p>
            </div>
          </div> */}
        </div>
      )}

      <SignUp
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default TravellerInformation;

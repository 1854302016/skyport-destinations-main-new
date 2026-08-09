import React, { useState } from "react";
import "./TravellerInfoMobile.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { TextField, Container, Button } from "@mui/material";
import { Col, Form, Row } from "react-bootstrap";
import { countriesParto } from "../../../Countries";
const TravellerInfoPhone = ({
  isOpen,
  onClose,
  type,
  currentForm,
  setCurrentForm,
  onSave,
  flight,
}) => {
  if (!isOpen) return null;

  return (
    <div className="Traveller_info_mobile_TG">
      <div id="add-trv" style={{ display: "block" }}>
        <div className="top_pnl">
          <div className="inner_block">
            <div className="lft_pnl">
              <a className="back_arrow" onClick={onClose} />
              <span className="title ng-binding">{type}</span>
            </div>
          </div>
        </div>
        <div className="inner_block">
          <div className="ad_title">
            <div className="treveller-content" style={{ display: "block" }}>
              <p className="bg-infoalert ng-scope">
                Name should be same as in Goverment ID proof
              </p>

              <span
                style={{ color: "red !important", fontSize: "11px !important" }}
                className="msgAlert"
              />
              <div className="radio-toolbar" id="TitleAdult">
                {["Mr", "Ms", "Mrs"].map((title) => (
                  <div key={title} style={{ display: "inline-block" }}>
                    <input
                      type="radio"
                      id={`rdo-${title}`}
                      name="title"
                      value={title}
                      checked={currentForm.title === title}
                      onChange={(e) =>
                        setCurrentForm({
                          ...currentForm,
                          title: e.target.value,
                        })
                      }
                    />
                    <label htmlFor={`rdo-${title}`}>{title}</label>
                  </div>
                ))}
              </div>

              <span
                id="spntitleAdult0"
                style={{ color: "red !important", fontSize: "11px !important" }}
                className="msgAlert"
              />

              <span
                id="spntitleChild0"
                style={{ color: "red !important", fontSize: "11px !important" }}
                className="msgAlert"
              />
              <div className="field-container12">
                <input
                  type="text"
                  required
                  placeholder="First Name & Middle Name"
                  value={currentForm.firstName}
                  onChange={(e) =>
                    setCurrentForm({
                      ...currentForm,
                      firstName: e.target.value,
                    })
                  }
                  className="field2 ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"
                  autoComplete="off"
                />
                <label className="floating-label_1">
                  (First Name &amp; Middle name, if any)
                </label>
                <span
                  id="spnFNAdult0"
                  style={{
                    color: "red !important",
                    fontSize: "11px !important",
                  }}
                  className="msgAlert"
                />
              </div>
              <div className="field-container12">
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  value={currentForm.lastName}
                  onChange={(e) =>
                    setCurrentForm({ ...currentForm, lastName: e.target.value })
                  }
                  className="field2 ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"
                  autoComplete="off"
                />
                <label className="floating-label_1">Last Name</label>
                <span
                  id="spnLNAdult0"
                  style={{
                    color: "red !important",
                    fontSize: "11px !important",
                  }}
                  className="msgAlert"
                />
              </div>

              <div className="date_field dob_TGG_Travel">
                <div className="cus_field_input">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      style={{ marginTop: "20px" }}
                      label="Date of Birth"
                      value={currentForm.date ? dayjs(currentForm.date) : null}
                      onChange={(newValue) =>
                        setCurrentForm({
                          ...currentForm,
                          date: newValue ? newValue.format("YYYY-MM-DD") : "",
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder={
                            flight.IsLCC
                              ? "Date of Birth (optional)"
                              : "Date of Birth"
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

              {flight.IsPassportRequiredAtBook === true && (
                <>
                  <div
                    className="field-container12"
                    style={{ marginBottom: "20px" }}
                  >
                    <input
                      type="text"
                      required
                      placeholder="Passport No."
                      value={currentForm.passportNo}
                      onChange={(e) =>
                        setCurrentForm({
                          ...currentForm,
                          passportNo: e.target.value,
                        })
                      }
                      className="field2 ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"
                      autoComplete="off"
                    />
                    <label className="floating-label_1">Passport Detail</label>
                    <span
                      id="spnLNAdult0"
                      style={{
                        color: "red !important",
                        fontSize: "11px !important",
                      }}
                      className="msgAlert"
                    />
                  </div>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Issue Date"
                      value={
                        currentForm.issuedate
                          ? dayjs(currentForm.issuedate)
                          : null
                      }
                      onChange={(newValue) =>
                        setCurrentForm({
                          ...currentForm,
                          issuedate: newValue?.format("YYYY-MM-DD") || "",
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          className="commoninputreset"
                          inputProps={{
                            ...params.inputProps,
                            max: new Date().toISOString().split("T")[0],
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Expiry Date"
                      value={
                        currentForm.expirydate
                          ? dayjs(currentForm.expirydate)
                          : null
                      }
                      onChange={(newValue) =>
                        setCurrentForm({
                          ...currentForm,
                          expirydate: newValue?.format("YYYY-MM-DD") || "",
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Expiry Date"
                          autoComplete="off"
                          inputProps={{
                            ...params.inputProps,
                            min: new Date().toISOString().split("T")[0],
                          }}
                          className="commoninputreset form-control datepicker-infant-time-start"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </>
              )}
            </div>
          </div>
          <div id="Addncill" className="MancillFNPaxanc"></div>
        </div>

        <div className="wd94p" onClick={onSave}>
          <button className="save-trv-btn" type="button">
            SAVE TRAVELER
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravellerInfoPhone;

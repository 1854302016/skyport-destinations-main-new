import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux/slices/login";
import { FaPhoneVolume, FaEnvelope } from "react-icons/fa6";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { countryCodeNum } from "../../CountryCodeNum";

const SignUp = ({ show, handleClose, otpSent, setOtpSent, mode, setMode }) => {
  const [method, setMethod] = useState("email"); // 'phone' or 'email'
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0); // OTP validity
  const [resendCooldown, setResendCooldown] = useState(0); // Cooldown
  const [error, setError] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [countryCode, setCountryCode] = useState("+592");

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
  };

  const dispatch = useDispatch();
  const sendOTP = async () => {
    setLoadingOtp(true);

    try {
        const payload =
            method === "phone"
                ? {
                      LoginType: "phone",
                      CountryCode: countryCode.replace("+", ""),
                      PhoneNumber: phone,
                  }
                : {
                      LoginType: "email",
                      Email: email,
                  };

        const response = await axios.post(
            "https://admin.trustedfare.com/api/User/LoginOTP",
            payload
        );

        if (response.data.success) {
            setOtpSent(true);
            setResendCooldown(60);
            setOtp("");
            setError("");
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
    }

    setLoadingOtp(false);
};

  const validateOTP = async () => {
  try {
    const payload =
      method === "phone"
        ? {
            LoginType: "phone",
            CountryCode: countryCode.replace("+", ""),
            PhoneNumber: phone,
            OTP: otp,
          }
        : {
            LoginType: "email",
            Email: email,
            OTP: otp,
          };

    const response = await axios.post(
      "https://admin.trustedfare.com/api/User/ValidateOTP",
      payload
    );

    if (response.data.success) {
      toast.success("OTP validated successfully!");

      localStorage.setItem(
        "isAuthenticated",
        response.data.data.token
      );

      localStorage.setItem(
        "UserId",
        response.data.data.Id
      );

      localStorage.setItem(
        "names",
        `${response.data.data.FirstName} ${response.data.data.LastName}`
      );

      localStorage.setItem(
        "email",
        response.data.data.Email
      );

      localStorage.setItem(
        "phone",
        response.data.data.Phone
      );

      dispatch(loggedIn(response.data.data.token));

      setOtpSent(false);
      setResendCooldown(0);
      setOtp("");
      setError("");

      handleClose();
    } else {
      setError(response.data.message || "Invalid OTP. Please try again.");
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("OTP validation error:", error);
    setError("Error validating OTP.");
    toast.error("Error validating OTP.");
  }
};
  const registerUser = async () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoadingOtp(true);

      const response = await axios.post(
        "https://admin.trustedfare.com/api/User/Register",
        {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          PhoneNumber: phone,
          CountryCode: countryCode.replace("+", ""),
          Password: password,
          DateOfBirth: dateOfBirth,
        },
      );

      if (response.data.success) {
        toast.success("Account created successfully!");

        // OPTIONAL: auto send OTP after register
        sendOTP();

        // OR directly login:
        // localStorage.setItem("isAuthenticated", response.data.data.token);

        setMode("login"); // switch to login after register
      } else {
        toast.error(response.data.message);
      }

      setLoadingOtp(false);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
      setLoadingOtp(false);
    }
  };

  // Timer for OTP validity
  useEffect(() => {
    let otpInterval;
    if (otpSent && otpTimer > 0) {
      otpInterval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(otpInterval);
            setOtpSent(false); // Hide OTP field
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(otpInterval);
  }, [otpSent, otpTimer, setOtpSent]);

  // Cooldown timer for resend
  useEffect(() => {
    let cooldownInterval;
    if (resendCooldown > 0) {
      cooldownInterval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(cooldownInterval);
  }, [resendCooldown]);

  const formatTime = (time) => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="p-fixed l-0 r-0 b-0 t-0 flex flex-center flex-middle z-70 signup_modal"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1000000000 }}
      size="lg"
    >
      <Modal.Body>
        <div
          className="p-fixed l-0 r-0 b-0 t-0 flex flex-center flex-middle z-70"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: "10000" }}
        >
          <div className="p-relative">
            <div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <div
                  className="o-hidden flex-column brLogin-4 slick-dots slider_part"
                  style={{ width: "450px", height: "600px" }}
                >
                  <Swiper
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img
                        src="https://images.travelxp.com/deals/dealflighthome/hdfcflyyy.png?tr=w-1920"
                        alt=""
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div
                  className="bg-white o-hidden d-flex flex-column brLoginNew-4 signup_form"
                  style={{ width: "450px", height: "600px" }}
                >
                  <div
                    className="px-8 d-flex flex-1 flex-column"
                    style={{ overflowY: "auto" }}
                  >
                    <div className="pt-6 pb-2 flex flex-top flex-between">
                      <div className="flex flex-column">
                        <h4 className="fw-600">
                          {mode === "login" ? "Login" : "Create Account"}
                        </h4>
                      </div>
                      <div
                        className="px-1 flex flex-middle nmx-1 pb-1"
                        style={{ borderRadius: "14px" }}
                        onClick={handleClose}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="c-pointer c-neutral-900"
                        >
                          <path
                            d="M18 6L12 12M12 12L6 18M12 12L6 6M12 12L18 18"
                            stroke="#1A1A1A"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="auth-mode-container mb-4">
                      <div className={`auth-mode-switch ${mode}`}>
                        <button
                          className={mode === "login" ? "active" : ""}
                          onClick={() => {
                            setMode("login");
                            setOtpSent(false);
                          }}
                        >
                          Login
                        </button>
                        <button
                          className={mode === "register" ? "active" : ""}
                          onClick={() => {
                            setMode("register");
                            setOtpSent(false);
                          }}
                        >
                          Register
                        </button>
                        <div className="auth-mode-bg"></div>
                      </div>
                    </div>

                    {mode === "login" && (
                      <div className="auth-method-container mb-4">
                        <p className="auth-method-label">
                          Choose verification method
                        </p>
                        <div className="auth-method-chips">
                        { /* <div
                            className={`auth-method-chip ${
                              method === "phone" ? "active" : ""
                            }`}
                            onClick={() => setMethod("phone")}
                          >
                            <FaPhoneVolume size={14} />
                            <span>Phone Number</span>
                    </div> */ }
                          <div
                            className={`auth-method-chip ${
                              method === "email" ? "active" : ""
                            }`}
                            onClick={() => setMethod("email")}
                          >
                            <FaEnvelope size={14} />
                            <span>Email Address</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-1 flex-between flex-column">
                      <div>
                        {mode === "register" ? (
                          <>
                            <Row className="mb-2">
                              <Col>
                                <Form.Control
                                  size="sm"
                                  placeholder="First Name"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className="fs-3 h-9 bc-neutral-100 focus:bc-secondary-500"
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  size="sm"
                                  placeholder="Last Name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  className="fs-3 h-9 bc-neutral-100 focus:bc-secondary-500"
                                />
                              </Col>
                            </Row>
                            <Row className="mb-2">
                              <Col>
                                <Form.Control
                                  size="sm"
                                  placeholder="Email Address"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="fs-3 h-9 bc-neutral-100 focus:bc-secondary-500"
                                />
                              </Col>
                            </Row>
                            <Row className="mb-2 w-100 sign_up-datapicket">
                              <Col className="w-100">
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    label="Date of Birth"
                                    value={
                                      dateOfBirth ? dayjs(dateOfBirth) : null
                                    }
                                    onChange={(newValue) =>
                                      setDateOfBirth(
                                        newValue
                                          ? newValue.format("YYYY-MM-DD")
                                          : "",
                                      )
                                    }
                                    className="w-100"
                                    slotProps={{
                                      popper: {
                                        sx: {
                                          zIndex: 1000000005,
                                        },
                                      },
                                      textField: {
                                        size: "small",
                                        fullWidth: true,
                                        className:
                                          "w-100 fs-3 bc-neutral-100 focus:bc-secondary-500",
                                        sx: {
                                          "& .MuiInputBase-root": {
                                            height: "36px",
                                            fontSize: "12px",
                                          },
                                          "& .MuiInputLabel-root": {
                                            fontSize: "12px",
                                            top: "-4px",
                                          },
                                        },
                                      },
                                    }}
                                  />
                                </LocalizationProvider>
                              </Col>
                            </Row>
                            <Row className="mb-2">
                              <Col xs={4}>
                                <div className="p-relative">
                                  <select
                                    value={countryCode}
                                    onChange={handleCountryChange}
                                    className="flex flex-middle flex-between t-all fs-2 focus:bc-secondary-500 bg-transparent bc-neutral-100 c-pointer pr-2 pl-3 pt-2 pb-2 ba br-4 h-8 h-9 p-0 px-2 fs-3 country_code"
                                    style={{
                                      minHeight: "36px",
                                      width: "100%",
                                      fontSize: "12px",
                                      border: "1px solid #eee",
                                    }}
                                  >
                                    {countryCodeNum.map((item, index) => (
                                      <option
                                        key={index}
                                        value={item.dial_code}
                                      >
                                        {item.dial_code}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Col>
                              <Col xs={8}>
                                <Form.Control
                                  size="sm"
                                  placeholder="Phone Number"
                                  value={phone}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                    setPhone(val);
                                  }}
                                  className="fs-3 h-9 bc-neutral-100 focus:bc-secondary-500"
                                />
                              </Col>
                            </Row>
                            <Row className="mb-2">
                              <Col>
                                <Form.Control
                                  size="sm"
                                  type="password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="fs-3 h-9 bc-neutral-100 focus:bc-secondary-500"
                                />
                              </Col>
                            </Row>
                            <Row className="mb-2">
                              <Col>
                                <Form.Control
                                  size="sm"
                                  type="password"
                                  placeholder="Confirm Password"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  className="fs-3 h-9 bc-neutral-100 focus:bc-secondary-500"
                                />
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <Row>
                            {method === "phone" ? (
                              <>
                                <Col xs={4}>
                                  <div className="p-relative">
                                    <select
                                      value={countryCode}
                                      onChange={handleCountryChange}
                                      className="flex flex-middle flex-between t-all fs-2 focus:bc-secondary-500 bg-transparent bc-neutral-100 c-pointer pr-2 pl-3 pt-2 pb-2 ba br-4 h-8 h-9 p-0 px-2 fs-3 country_code"
                                      style={{
                                        minHeight: "44px",
                                        width: "100%",
                                        border: "1px solid #eee",
                                      }}
                                    >
                                      {countryCodeNum.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item.dial_code}
                                        >
                                          {item.dial_code}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </Col>
                                <Col xs={8}>
                                  <div className="p-relative">
                                    <Form.Control
                                      className="field bw-1 bs-solid w-100p p-2 box-border br-4 fs-2 c-neutral-900 h-9 fs-3 bc-neutral-100 c-neutral-900 focus:bc-secondary-500"
                                      value={phone}
                                      onChange={(e) => {
                                        const val = e.target.value.replace(
                                          /\D/g,
                                          "",
                                        );
                                        setPhone(val);
                                      }}
                                      placeholder="Enter mobile number"
                                      style={{ minHeight: "44px" }}
                                    />
                                  </div>
                                </Col>
                              </>
                            ) : (
                              <Col xs={12}>
                                <div className="p-relative">
                                  <Form.Control
                                    className="field bw-1 bs-solid w-100p p-2 box-border br-4 fs-2 c-neutral-900 h-9 fs-3 bc-neutral-100 c-neutral-900 focus:bc-secondary-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    style={{ minHeight: "44px" }}
                                  />
                                </div>
                              </Col>
                            )}
                          </Row>
                        )}
                        {!otpSent ? (
                          <>
                            <div
                              className="m-0 mt-0 mb-0 ml-0 mr-0 mx-0 my-0 mt-6 margin-modalbooking"
                              style={{ height: "1px", width: "1px" }}
                            ></div>
                            <Button
                              onClick={
                                mode === "register" ? registerUser : sendOTP
                              }
                              disabled={method === "phone" ? !phone : !email}
                              className="get_otp_signUp h-10 hover:bg-secondary-600 c-white bc-transparent c-pointer w-100p py-2 px-4 h-9 fs-4 fw-600 t-all button bs-solid tp-color td-500 bw-1 br-4 lh-solid box-border"
                              style={{
                                height: "48px",
                                marginTop: "10px",
                                background: "#efbf04",
                              }}
                            >
                              {loadingOtp ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span className="fs-3 fw-600">
                                  {mode === "register"
                                    ? "Create Account"
                                    : method === "phone"
                                      ? "Get Verification OTP"
                                      : "Get Verification OTP"}
                                </span>
                              )}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Form.Control
                              className="mt-3"
                              type="text"
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                            {error && (
                              <div
                                className="text-danger mt-1"
                                style={{ fontSize: "14px" }}
                              >
                                {error}
                              </div>
                            )}
                            <div className="text-center mt-2">
                              <Button
                                variant="link"
                                onClick={sendOTP}
                                disabled={resendCooldown > 0}
                                style={{ fontSize: "12px" }}
                                className="resend_otp_font"
                              >
                                Resend OTP{" "}
                                {resendCooldown > 0 && `(${resendCooldown}s)`}
                              </Button>
                            </div>

                            <Button
                              variant="success"
                              className="w-100 mt-3"
                              onClick={validateOTP}
                              disabled={!otp}
                              style={{
                                height: "48px",
                                backgroundColor: "#00ab53",
                                border: "none",
                              }}
                            >
                              Verify & Continue
                            </Button>
                          </>
                        )}

                        <div
                          className="mt-3 fs-12 fw-400 c-neutral-grey ta-center"
                          style={{ marginTop: "20px" }}
                        >
                          You can now{" "}
                          {mode === "login" ? "login" : "create your account"}{" "}
                          via {method} & access premium features.
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="pos-r">
                          <div className="bc-grey-10 d-block bb bc-grey-10 flex-1"></div>
                        </div>
                        <div className="mt-5 d-flex flex-column flex-middle">
                          <span>
                            <span className="fs-2 c-grey-70">
                              By continuing, you agree to SkyPort
                              DestinationsOnline
                            </span>
                            <Link
                              style={{ textDecoration: "underline" }}
                              className="fs-2 fw-500 c-blue c-pointer"
                              to="/privacy-policy"
                              onClick={handleClose}
                            >
                              {" "}
                              privacy policy
                            </Link>
                            <span className="fs-2 c-grey-70">
                              {" "}
                              &{" "}
                              <Link
                                style={{ textDecoration: "underline" }}
                                className="fs-2 fw-500 c-blue c-pointer"
                                to="/terms-conditions"
                                onClick={handleClose}
                              >
                                {/* <span className="fs-2 fw-500 c-blue c-pointer"> */}
                                terms of use.
                                {/* </span> */}
                              </Link>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* </div> */}
    </Modal>
  );
};

export default SignUp;

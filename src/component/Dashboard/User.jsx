import React, { useEffect, useRef, useState } from "react";
import "./User.css";
import { SiTicktick } from "react-icons/si";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { MdFlightTakeoff, MdOutlineStar } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp, IoMdContacts } from "react-icons/io";
import { TbBounceRightFilled } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import {
  Card,
  Form,
  Row,
  Col,
  Breadcrumb,
  Button,
  Table,
  Accordion,
  Modal,
  Dropdown,
  DropdownButton,
  Collapse,
} from "react-bootstrap";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Bookings from "./Bookings";

export const formatTime = (arrTime) => {
  const date = new Date(arrTime);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[date.getDay()];
  const dateNum = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${dateNum} ${month} ${year}`;
};

const User = () => {
  const location =useLocation()
  const cabinMapping = {
    1: "All",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business",
    6: "First Class",
  };
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActive(location.state.activeTab);
    }
  }, [location.state]);

  const [openCard, setOpenCard] = useState("basic");

  const toggleCard = (cardName) => {
    setOpenCard(openCard === cardName ? null : cardName);
  };
  const [openPass, setOpenPass] = useState("security");

  const toggleCards = (cardName) => {
    setOpenPass(openCard === cardName ? null : cardName);
  };
  
  const UserId = localStorage.getItem("UserId");
  const [formData, setFormData] = useState({});

  const [profileImg, setProfileImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [bookingStore, setBookingStore] = useState("");

  const hasFetched = useRef(false); // 👈 This makes sure it runs only once
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cabs, setCabs] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const requestData = {
      CountryCode: "91",
      PhoneNumber: "9310167293",
    };

    const fetchBookingData = async () => {
      try {
        const responseBooking = await axios.post(
          "https://admin.skyportdestinations.com/api/details",
          requestData
        );

        const data = responseBooking.data.data || {};
        setFlights(data.Flights || []);
        setHotels(data.Hotels || []);
        setCabs(data.Cabs || []);
        setBuses(data.Buses || []);
      } catch (error) {
        console.error("API call failed:", error.message || error);
      } finally {
        setLoadingBookings(false); // ✅ Set loading to false
      }
    };

    fetchBookingData();
  }, []);

  // useEffect(() => {
  //     if (hasFetched.current) return; // Run only once
  //     hasFetched.current = true;

  //     const requestData = {
  //       CountryCode: "91",
  //       PhoneNumber: "9310167293",
  //     };

  //     const fetchBookingData = async () => {
  //       try {
  //         const responseBooking = await axios.post(
  //           "https://admin.skyportdestinations.com/api/details",
  //           requestData
  //         );

  //         const data = responseBooking.data.data || {};

  //         console.log("responseBooking", data);

  //         // Store separately
  //         setFlights(data.Flights || []);
  //         setHotels(data.Hotels || []);
  //         setCabs(data.Cabs || []);
  //         setBuses(data.Buses || []);
  //       } catch (error) {
  //         console.error("API call failed:", error.message || error);
  //       }
  //     };

  //     fetchBookingData();
  //   }, []);

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://admin.skyportdestinations.com/api/User/Detail",
  //         {
  //           CountryCode: "91",
  //           PhoneNumber: UserId,
  //         }
  //       );

  //       if (response.data && response.data.data) {
  //         const user = response.data.data;
  //         setFormData(user);
  //         setPreviewUrl(user.ProfileImg || "");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //       toast.error("Failed to fetch user details");
  //     }
  //   };

  //   fetchUserDetails();
  // }, [UserId, location.pathname]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "https://admin.skyportdestinations.com/api/User/Detail",
          {
            CountryCode: "91",
            PhoneNumber: UserId,
          }
        );

        if (response.data && response.data.data) {
          const user = response.data.data;
          setFormData(user);
          setPreviewUrl(user.ProfileImg || "");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("Failed to fetch user details");
      } finally {
        setLoadingUser(false); // ✅ Set loading to false after attempt
      }
    };

    fetchUserDetails();
  }, [UserId, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (value !== null && value !== undefined) {
      //     submitData.append(key, value);
      //   }
      // });
      if (formData.Title) submitData.append("Title", formData.Title);
      if (formData.FirstName)
        submitData.append("FirstName", formData.FirstName);
      if (formData.LastName) submitData.append("LastName", formData.LastName);
      if (formData.Email) submitData.append("Email", formData.Email);
      if (formData.Phone) submitData.append("PhoneNumber", formData.Phone);
      if (formData.Gender) submitData.append("Gender", formData.Gender);
      if (formData.DOB) submitData.append("DOB", formData.DOB);
      if (formData.Country) submitData.append("Country", formData.Country);
      if (formData.State) submitData.append("State", formData.State);
      if (formData.City) submitData.append("City", formData.City);
      if (formData.Zip) submitData.append("Zip", formData.Zip);
      if (formData.Address) submitData.append("Address", formData.Address);

      // Handle image file separately
      if (profileImg) {
        submitData.append("profile_img", profileImg);
      }

      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/User/EditProfile",
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("red", response.data);
      if (response && response.data.success == true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Something went wrong while updating profile.");
    }
  };

  // Change Password
  const [showPasswords, setShowPasswords] = useState({
    OldPassword: false,
    NewPassword: false,
    NewConfirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [passwordData, setPasswordData] = useState({
    Email: "",
    OldPassword: "",
    NewPassword: "",
    NewConfirmPassword: "",
  });
  console.log("FORmadta email", formData.Email);
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { OldPassword, NewPassword, NewConfirmPassword } = passwordData;

    if (!OldPassword || !NewPassword || !NewConfirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (NewPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!/[a-z]/.test(NewPassword)) {
      toast.error("Password must include at least one lowercase letter");
      return;
    }

    if (!/[A-Z]/.test(NewPassword)) {
      toast.error("Password must include at least one uppercase letter");
      return;
    }

    if (!/[\d\s\W]/.test(NewPassword)) {
      toast.error(
        "Password must include at least one number, symbol, or whitespace character"
      );
      return;
    }

    if (NewPassword !== NewConfirmPassword) {
      toast.error("New Password and Confirm Password must match");
      return;
    }

    const requestData = {
      Email: formData.Email,
      OldPassword: OldPassword,
      NewPassword: NewPassword,
      NewConfirmPassword: NewConfirmPassword,
    };
    try {
      console.log("passwordData", passwordData);

      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/User/ChangePassword",
        requestData
      );
      const data = response.data;

      if (data && data.success == true) {
        toast.success(data.message);
        setPasswordData({
          ...passwordData,
          OldPassword: "",
          NewPassword: "",
          NewConfirmPassword: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loadingUser || loadingBookings) {
    return (
      <div
        className="loading-text"
        style={{ textAlign: "center", padding: "50px 0px" }}
      >
        <span className="letter">L</span>
        <span className="letter">o</span>
        <span className="letter">a</span>
        <span className="letter">d</span>
        <span className="letter">i</span>
        <span className="letter">n</span>
        <span className="letter">g</span>
        <span className="letter">.</span>
        <span className="letter">.</span>
        <span className="letter">.</span>
      </div>
    );
  }

  return (
    <div className="section-space--sm pt-0 position-relative z-1 my_account_mains">
      {/* <span className="w-100 h-30 position-absolute start-0 end-0 top-0 z-n1 bg-neutral-900" /> */}
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5 col-lg-4 col-xl-3 my_account_col_one">
            <div className="p-6 rounded-4 bg-neutral-0 box-shadow my_account_col_shadow">
              <div className="w-30 h-30 border border-primary-100 rounded-circle bg-neutral-0 p-6 d-grid place-content-center position-relative mx-auto mb-6">
                <img
                  src={
                    previewUrl ||
                    formData.ProfileImg ||
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                  }
                  alt="profile"
                  style={{ maxWidth: "unset" }}
                  className="w-24 h-24 object-fit-cover rounded-circle"
                />
                <div className="w-8 h-8 d-grid place-content-center rounded-circle border border-2 border-neutral bg-primary-300 position-absolute end-0 bottom-0">
                  <span className="material-symbols-outlined mat-icon clr-neutral-0">
                    <SiTicktick />
                  </span>
                </div>
              </div>

              <div className="text-center mb-10">
                <h4 className="clr-neutral-500">
                  {formData.FirstName || "SkyPort"} {formData.LastName || ""}
                </h4>
                <p className="mb-0 clr-neutral-500">
                  {formData.Email || "info@example.com"}
                </p>
              </div>

              <div className="mb-10">
                <span className="d-block clr-neutral-400 fs-12 mb-4">
                  {" "}
                  Account{" "}
                </span>
                <ul className="list gap-3 sidebar_profile_main">
                  <li onClick={() => setActive(1)}>
                    <a className="link d-flex align-items-center gap-2 clr-neutral-500 :clr-primary-300">
                      <span className="material-symbols-outlined mat-icon fs-20">
                        {" "}
                        <IoPersonCircleOutline />
                      </span>
                      <span className="d-block fw-medium"> Personal info </span>
                    </a>
                  </li>
                  <li onClick={() => setActive(3)}>
                    <a className="link d-flex align-items-center gap-2 clr-neutral-500 :clr-primary-300">
                      <span className="material-symbols-outlined mat-icon fs-20">
                        {" "}
                        <IoPersonCircleOutline />
                      </span>
                      <span className="d-block fw-medium"> Security </span>
                    </a>
                  </li>
                  <li onClick={() => setActive(2)}>
                    <a className="link d-flex align-items-center gap-2 clr-neutral-500 :clr-primary-300 ">
                      <span className="material-symbols-outlined mat-icon fs-20">
                        {" "}
                        <HiOutlineBookOpen />
                      </span>
                      <span className="d-block fw-medium"> My Bookings </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8 col-xl-9 my_account_col_two">
            {active === 1 && (
              <>
                <Card className="mb-3 collapse_profile_container">
                  <Card.Header
                    onClick={() => toggleCard("basic")}
                    aria-controls="collapse-content"
                    aria-expanded={openCard === "basic"}
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      borderBottom: "none",
                    }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ padding: "10px" }}
                    >
                      <span style={{ fontSize: "27px", fontWeight: "600" }}>
                        Basic Info
                      </span>

                      {openCard === "basic" ? (
                        <IoIosArrowUp size={25} />
                      ) : (
                        <IoIosArrowDown size={25} />
                      )}
                    </div>
                  </Card.Header>

                  <Collapse in={openCard === "basic"}>
                    <div id="basic-collapse">
                      <Card.Body>
                        <div className="avatar-upload mx-auto ms-md-0 mb-6">
                          <div className="avatar-upload__edit">
                            <input
                              type="file"
                              id="imageUpload"
                              accept=".png, .jpg, .jpeg"
                              className="avatar-upload__input"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setProfileImg(file);
                                  setPreviewUrl(URL.createObjectURL(file)); // Show preview instantly
                                }
                              }}
                            />
                            <label
                              htmlFor="imageUpload"
                              className="avatar-upload__label"
                            >
                              <SiTicktick />
                            </label>
                          </div>

                          <div className="avatar-upload__preview">
                            <div
                              id="imagePreview"
                              className="avatar-upload__img"
                              style={{
                                backgroundImage: `url("${
                                  previewUrl ||
                                  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                                }")`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <form
                          className="row g-4 form_profile_basis"
                          onSubmit={handleSubmit}
                        >
                          {/* Title */}
                          <div className="col-lg-2">
                            <label
                              htmlFor="title"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              Title:
                            </label>
                            <select
                              id="title"
                              name="Title"
                              value={formData.Title || "Mr."}
                              onChange={handleChange}
                              className="form-select py-3 px-6 rounded-4"
                            >
                              {/* <option value="">Select</option> */}
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Ms.">Ms.</option>
                            </select>
                          </div>

                          {/* First Name */}
                          <div className="col-lg-5">
                            <label
                              htmlFor="first-name"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              First Name:
                            </label>
                            <input
                              type="text"
                              id="first-name"
                              name="FirstName"
                              value={formData.FirstName || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter first name"
                            />
                          </div>

                          {/* Last Name */}
                          <div className="col-lg-5">
                            <label
                              htmlFor="last-name"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              Last Name:
                            </label>
                            <input
                              type="text"
                              id="last-name"
                              name="LastName"
                              value={formData.LastName || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter last name"
                            />
                          </div>
                          {/* Gender */}
                          <div className="col-lg-12">
                            <label className="d-block mb-2 fw-medium clr-neutral-500">
                              Gender:
                            </label>
                            <ul className="list list-row flex-wrap align-items-center gap-6">
                              {["Male", "Female"].map((gender) => (
                                <li key={gender}>
                                  <div className="d-flex align-items-center gap-2">
                                    <input
                                      className="custom-radio custom-radio--primary-300"
                                      type="radio"
                                      name="Gender"
                                      id={`gender-${gender}`}
                                      value={gender}
                                      checked={formData.Gender === gender}
                                      onChange={handleChange}
                                    />
                                    <label
                                      className="d-inline-block fw-medium cursor-pointer clr-neutral-500"
                                      htmlFor={`gender-${gender}`}
                                    >
                                      {gender}
                                    </label>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Email */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="user-email"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              Email:
                              {/* {formData.EmailVerifyStatus === 1 ? (
                                <span className="badge bg-success text-white ms-2">
                                  Verified
                                </span>
                              ) : (
                                <span className="badge bg-danger text-white ms-2">
                                  Unverified
                                </span>
                              )} */}
                            </label>
                            <input
                              type="email"
                              id="user-email"
                              name="Email"
                              value={formData.Email || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter email"
                            />
                          </div>

                          {/* Phone Number */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="user-phone"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              Phone:
                              {/* {formData.MobileVerifyStatus === 1 ? (
                                <span className="badge bg-success text-white ms-2">
                                  Verified
                                </span>
                              ) : (
                                <span className="badge bg-danger text-white ms-2">
                                  Unverified
                                </span>
                              )} */}
                            </label>
                            <input
                              type="text"
                              id="user-phone"
                              name="Phone"
                              value={formData.Phone || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter phone"
                            />
                          </div>

                          {/* Date of Birth */}
                          <div className="col-lg-6">
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              style={{ width: "100%" }}
                            >
                              <DatePicker
                                label="Date of Birth"
                                id="dob"
                                name="DOB"
                                style={{ width: "100%" }}
                                value={
                                  formData.DOB ? dayjs(formData.DOB) : null
                                }
                                onChange={(newValue) => {
                                  const syntheticEvent = {
                                    target: {
                                      name: "DOB",
                                      value: newValue
                                        ? newValue.format("YYYY-MM-DD")
                                        : "",
                                    },
                                  };
                                  handleChange(syntheticEvent);
                                }}
                                maxDate={dayjs()} // Optional: restrict to past dates only
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    className="commoninputreset form-control py-3 px-6 rounded-4"
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

                          {/* State */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="state"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              State:
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="State"
                              value={formData.State || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter state"
                            />
                          </div>

                          {/* City */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="city"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              City:
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="City"
                              value={formData.City || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter city"
                            />
                          </div>

                          <div className="col-lg-6">
                            <label
                              htmlFor="zip"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              Zip Code:
                            </label>
                            <input
                              type="text"
                              id="zip"
                              name="Zip"
                              value={formData.Zip || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter zip"
                            />
                          </div>
                          {/* Country */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="country"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              Country:
                            </label>
                            <input
                              type="text"
                              id="country"
                              name="Country"
                              value={formData.Country || ""}
                              onChange={handleChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter country"
                            />
                          </div>

                          <div className="col-12">
                            <label
                              htmlFor="address"
                              className="d-block mb-2 fw-medium clr-neutral-500"
                            >
                              Address:
                            </label>
                            <textarea
                              id="address"
                              name="Address"
                              style={{ height: "75px" }}
                              value={formData.Address || ""}
                              onChange={handleChange}
                              className="form-control px-6 rounded-4"
                              placeholder="Enter address"
                              rows={6}
                            />
                          </div>

                          {/* Save Button */}
                          <div className="col-12">
                            <div className="d-flex align-items-center gap-6 flex-wrap inner_profile_btn">
                              <button
                                type="submit"
                                className="save-changes_tg_booking link d-inline-block py-3 px-6 rounded-pill bg-primary-300 clr-neutral-0 fw-semibold"
                              >
                                Save Changes
                              </button>
                              <a
                                href="#"
                                className="btn btn-outline-primary py-3 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </form>
                      </Card.Body>
                    </div>
                  </Collapse>
                </Card>

                <Card className="mb-3 collapse_profile_container">
                  <Card.Header
                    onClick={() => toggleCard("delete")}
                    aria-controls="collapse-content"
                    aria-expanded={openCard === "delete"}
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      borderBottom: "none",
                    }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ padding: "10px" }}
                    >
                      <span style={{ fontSize: "27px", fontWeight: "600" }}>
                        Delete Your Account
                      </span>

                      {openCard === "delete" ? (
                        <IoIosArrowUp size={25} />
                      ) : (
                        <IoIosArrowDown size={25} />
                      )}
                    </div>
                  </Card.Header>

                  <Collapse in={openCard === "delete"}>
                    <div id="delete-collapse">
                      <Card.Body>
                        <p className="clr-neutral-500 mb-4">
                          {" "}
                          When you delete your account, you lose access to Front
                          account services, and we permanently delete your
                          personal data. You can cancel the deletion for 14
                          days.{" "}
                        </p>
                        <div className="d-flex align-items-center gap-3 mb-8 form_profile_basis profile_deletee_upr ">
                          <input
                            className="custom-checkbox custom-checkbox--rounded flex-shrink-0"
                            type="checkbox"
                            id="delete-account"
                          />
                          <label
                            className="clr-neutral-500"
                            htmlFor="delete-account"
                          >
                            {" "}
                            Confirm that I want to delete my account.{" "}
                          </label>
                        </div>

                        <a className="link d-inline-block py-3 px-6 rounded-pill bg-tertiary-300 clr-neutral-700 fw-semibold profile_deletee">
                          {" "}
                          Delete{" "}
                        </a>
                      </Card.Body>
                    </div>
                  </Collapse>
                </Card>
              </>
            )}
            {active === 2 && (
              <Bookings
                flights={flights}
                hotels={hotels}
                buses={buses}
                cabs={cabs}
              />
              // <ul className="list gap-6 my_account_col_shadow">
              //   <li>
              //     <div className="p-6 p-xl-10 rounded-4 bg-neutral-0 shadow-3">
              //       <h3 className="mb-0 flex-grow-1"> My Bookings </h3>
              //       <div className="hr-line my-6" />
              //       <div className="row g-4">
              //         <div className="col-12">
              //           <div
              //             className="list-group border border-neutral-40 rounded-4 booking-tab"
              //             role="tablist"
              //           >
              //             <a
              //               className="link booking-tab__btn active"
              //               data-bs-toggle="list"
              //               href="#canceled"
              //               aria-selected="false"
              //               role="tab"
              //               tabIndex={-1}
              //             >
              //               <span className="material-symbols-outlined mat-icon fs-20">
              //                 {" "}
              //                 <TbBounceRightFilled />
              //               </span>
              //               <span className="d-inline-block">
              //                 {" "}
              //                 Completed Booking{" "}
              //               </span>
              //             </a>
              //             <a
              //               className="link booking-tab__btn"
              //               data-bs-toggle="list"
              //               href="#completed"
              //               aria-selected="false"
              //               role="tab"
              //               tabIndex={-1}
              //             >
              //               <span className="material-symbols-outlined mat-icon fs-20">
              //                 {" "}
              //                 <RxCross2 />
              //               </span>
              //               <span className="d-inline-block">
              //                 {" "}
              //                 Canceled Booking{" "}
              //               </span>
              //             </a>
              //           </div>
              //         </div>
              //         <div className="col-12">
              //           <div className="tab-content">
              //             <div
              //               className="tab-pane fade active show"
              //               id="upcoming"
              //               role="tabpanel"
              //             >
              //               <h5 className="mb-4 fw-medium">
              //                 {" "}
              //                 Complete booking{" "}
              //               </h5>
              //               {flights &&
              //                 flights.map((item) => (
              //                   <ul
              //                     className="list gap-4"
              //                     style={{ marginBottom: "10px" }}
              //                   >
              //                     <li>
              //                       <div className="border border-neutral-40 p-4 p-sm-6 p-xl-8 rounded-4">
              //                         <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between">
              //                           <div className="d-flex align-items-center gap-4 flex-wrap">
              //                             <div className="d-grid place-content-center w-12 h-12 box-shadow rounded-circle flex-shrink-0">
              //                               <div className="d-grid place-content-center w-10 h-10 bg-primary-50 clr-primary-300 rounded-circle">
              //                                 <span className="material-symbols-outlined mat-icon">
              //                                   {" "}
              //                                   <MdFlightTakeoff />
              //                                 </span>
              //                               </div>
              //                             </div>
              //                             <div className="flex-grow-1">
              //                               <h5 className="fw-medium mb-1">
              //                                 {" "}
              //                                 {item.depart} To {item.arrival}{" "}
              //                               </h5>
              //                               <ul className="listttt list-row align-items-center flex-wrap list-divider-half-xs">
              //                                 <li>
              //                                   <span className="d-inline-block fs-14">
              //                                     <span className="d-inline-block clr-neutral-500">
              //                                       {" "}
              //                                       Booking ID : &nbsp;
              //                                     </span>
              //                                     <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                       {" "}
              //                                       {item.RefId}
              //                                     </span>
              //                                   </span>
              //                                 </li>
              //                                 <li>
              //                                   <span className="d-inline-block fs-14">
              //                                     <span className="d-inline-block clr-neutral-500">
              //                                       {" "}
              //                                       Travel Class :{" "}
              //                                     </span>
              //                                     <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                       {" "}
              //                                       {item.farequoteib_log &&
              //                                         cabinMapping[
              //                                           item.farequoteib_log
              //                                             .Results
              //                                             .Segments[0][0]
              //                                             .CabinClass
              //                                         ]}
              //                                     </span>
              //                                   </span>
              //                                 </li>
              //                               </ul>
              //                             </div>
              //                           </div>
              //                           <Link
              //                             to={`/bookings/flightdetail/${item.id}`}
              //                             className="btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0"
              //                           >
              //                             View Detail
              //                           </Link>
              //                           <a className="btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0">
              //                             {" "}
              //                             Download Ticket{" "}
              //                           </a>
              //                         </div>
              //                         <div className="hr-dashed my-6" />
              //                         <div className="row g-4">
              //                           <div className="col-lg-6 col-xl-4">
              //                             <p className="clr-neutral-500">
              //                               {" "}
              //                               Departure time{" "}
              //                             </p>
              //                             <h5 className="mb-0 fw-medium">
              //                               {" "}
              //                               {item.farequoteib_log &&
              //                                 formatTime(
              //                                   item.farequoteib_log.Results
              //                                     .Segments[0][0].Origin.DepTime
              //                                 )}
              //                             </h5>
              //                           </div>
              //                           <div className="col-lg-6 col-xl-4">
              //                             <p className="clr-neutral-500">
              //                               {" "}
              //                               Arrival time{" "}
              //                             </p>
              //                             <h5 className="mb-0 fw-medium">
              //                               {" "}
              //                               {item.farequoteib_log &&
              //                                 formatTime(
              //                                   item.farequoteib_log.Results
              //                                     .Segments[0][
              //                                     item.farequoteib_log.Results
              //                                       .Segments[0].length - 1
              //                                   ].Destination.ArrTime
              //                                 )}
              //                             </h5>
              //                           </div>
              //                           <div className="col-lg-6 col-xl-4">
              //                             <p className="clr-neutral-500">
              //                               {" "}
              //                               Booked by{" "}
              //                             </p>
              //                             <h5 className="mb-0 fw-medium">
              //                               {" "}
              //                               Guy Hawkins{" "}
              //                             </h5>
              //                           </div>
              //                         </div>
              //                       </div>
              //                     </li>
              //                     {/* <li>
              //                       <div className="border border-neutral-40 p-4 p-sm-6 p-xl-8 rounded-4">
              //                         <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between">
              //                           <div className="d-flex align-items-center gap-4 flex-wrap">
              //                             <div className="d-grid place-content-center w-12 h-12 box-shadow rounded-circle flex-shrink-0">
              //                               <div className="d-grid place-content-center w-10 h-10 bg-primary-50 clr-primary-300 rounded-circle">
              //                                 <span className="material-symbols-outlined mat-icon">
              //                                   {" "}
              //                                   <MdFlightTakeoff />
              //                                 </span>
              //                               </div>
              //                             </div>
              //                             <div className="flex-grow-1">
              //                               <h5 className="fw-medium mb-1">
              //                                 {" "}
              //                                 New York To London{" "}
              //                               </h5>
              //                               <ul className="listttt list-row align-items-center flex-wrap list-divider-half-xs">
              //                                 <li>
              //                                   <span className="d-inline-block fs-14">
              //                                     <span className="d-inline-block clr-neutral-500">
              //                                       {" "}
              //                                       Booking ID :{" "}
              //                                     </span>
              //                                     <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                       {" "}
              //                                       AHA12548{" "}
              //                                     </span>
              //                                   </span>
              //                                 </li>
              //                                 <li>
              //                                   <span className="d-inline-block fs-14">
              //                                     <span className="d-inline-block clr-neutral-500">
              //                                       {" "}
              //                                       Travel Class :{" "}
              //                                     </span>
              //                                     <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                       {" "}
              //                                       Bussiness{" "}
              //                                     </span>
              //                                   </span>
              //                                 </li>
              //                               </ul>
              //                             </div>
              //                           </div>
              //                           <a
              //                             href="#"
              //                             className="btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0"
              //                           >
              //                             {" "}
              //                             Download Ticket{" "}
              //                           </a>
              //                         </div>
              //                         <div className="hr-dashed my-6" />
              //                         <div className="row g-4">
              //                           <div className="col-lg-6 col-xl-4">
              //                             <p className="clr-neutral-500">
              //                               {" "}
              //                               Departure time{" "}
              //                             </p>
              //                             <h5 className="mb-0 fw-medium">
              //                               {" "}
              //                               Tue 09 Jan 12:00 AM{" "}
              //                             </h5>
              //                           </div>
              //                           <div className="col-lg-6 col-xl-4">
              //                             <p className="clr-neutral-500">
              //                               {" "}
              //                               Arrival time{" "}
              //                             </p>
              //                             <h5 className="mb-0 fw-medium">
              //                               {" "}
              //                               Tue 06 Aug 4:00 PM{" "}
              //                             </h5>
              //                           </div>
              //                           <div className="col-lg-6 col-xl-4">
              //                             <p className="clr-neutral-500">
              //                               {" "}
              //                               Booked by{" "}
              //                             </p>
              //                             <h5 className="mb-0 fw-medium">
              //                               {" "}
              //                               Guy Hawkins{" "}
              //                             </h5>
              //                           </div>
              //                         </div>
              //                       </div>
              //                     </li> */}
              //                   </ul>
              //                 ))}
              //             </div>
              //             <div
              //               className="tab-pane fade"
              //               id="canceled"
              //               role="tabpanel"
              //             >
              //               <h5 className="mb-4 fw-medium">
              //                 {" "}
              //                 Canceled booking{" "}
              //               </h5>
              //               <ul className="list gap-4">
              //                 <li>
              //                   <div className="border border-neutral-40 p-4 p-sm-6 p-xl-8 rounded-4">
              //                     <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between">
              //                       <div className="d-flex align-items-center gap-4 flex-wrap">
              //                         <div className="d-grid place-content-center w-12 h-12 box-shadow rounded-circle flex-shrink-0">
              //                           <div className="d-grid place-content-center w-10 h-10 bg-primary-50 clr-primary-300 rounded-circle">
              //                             <span className="material-symbols-outlined mat-icon">
              //                               {" "}
              //                               flight_takeoff{" "}
              //                             </span>
              //                           </div>
              //                         </div>
              //                         <div className="flex-grow-1">
              //                           <h5 className="fw-medium mb-1">
              //                             {" "}
              //                             New York To London{" "}
              //                           </h5>
              //                           <ul className="list list-row align-items-center flex-wrap list-divider-half-xs">
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Booking ID :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   AHA12548{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Travel Class :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   Bussiness{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                           </ul>
              //                         </div>
              //                       </div>
              //                       <a
              //                         href="#"
              //                         className="btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0"
              //                       >
              //                         {" "}
              //                         Download Ticket{" "}
              //                       </a>
              //                     </div>
              //                     <div className="hr-dashed my-6" />
              //                     <div className="row g-4">
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Departure time{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Tue 09 Jan 12:00 AM{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Arrival time{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Tue 06 Aug 4:00 PM{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Booked by{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Guy Hawkins{" "}
              //                         </h5>
              //                       </div>
              //                     </div>
              //                   </div>
              //                 </li>
              //                 <li>
              //                   <div className="border border-neutral-40 p-4 p-sm-6 p-xl-8 rounded-4">
              //                     <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between">
              //                       <div className="d-flex align-items-center gap-4 flex-wrap">
              //                         <div className="d-grid place-content-center w-12 h-12 box-shadow rounded-circle flex-shrink-0">
              //                           <div className="d-grid place-content-center w-10 h-10 bg-primary-50 clr-primary-300 rounded-circle">
              //                             <span className="material-symbols-outlined mat-icon">
              //                               {" "}
              //                               minor_crash{" "}
              //                             </span>
              //                           </div>
              //                         </div>
              //                         <div className="flex-grow-1">
              //                           <h5 className="fw-medium mb-1">
              //                             {" "}
              //                             Mumbai To Chennai{" "}
              //                           </h5>
              //                           <ul className="list list-row align-items-center flex-wrap list-divider-half-xs">
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Booking ID :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   AHA12548{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Model :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   Camry{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                           </ul>
              //                         </div>
              //                       </div>
              //                       <a
              //                         href="#"
              //                         className="btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0"
              //                       >
              //                         {" "}
              //                         Download Ticket{" "}
              //                       </a>
              //                     </div>
              //                     <div className="hr-dashed my-6" />
              //                     <div className="row g-4">
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Pickup address{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           3890 Poplar Dr.{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Drop address{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           3605 Parker Rd.{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Booked by{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Peter Parker{" "}
              //                         </h5>
              //                       </div>
              //                     </div>
              //                   </div>
              //                 </li>
              //               </ul>
              //             </div>
              //             <div
              //               className="tab-pane fade"
              //               id="completed"
              //               role="tabpanel"
              //             >
              //               <h5 className="mb-4 fw-medium">
              //                 {" "}
              //                 Completed booking (4){" "}
              //               </h5>
              //               <ul className="list gap-4">
              //                 <li>
              //                   <div className="border border-neutral-40 p-4 p-sm-6 p-xl-8 rounded-4">
              //                     <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between">
              //                       <div className="d-flex align-items-center gap-4 flex-wrap">
              //                         <div className="d-grid place-content-center w-12 h-12 box-shadow rounded-circle flex-shrink-0">
              //                           <div className="d-grid place-content-center w-10 h-10 bg-primary-50 clr-primary-300 rounded-circle">
              //                             <span className="material-symbols-outlined mat-icon">
              //                               {" "}
              //                               flight_takeoff{" "}
              //                             </span>
              //                           </div>
              //                         </div>
              //                         <div className="flex-grow-1">
              //                           <h5 className="fw-medium mb-1">
              //                             {" "}
              //                             New York To London{" "}
              //                           </h5>
              //                           <ul className="list list-row align-items-center flex-wrap list-divider-half-xs">
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Booking ID :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   AHA12548{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Travel Class :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   Bussiness{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                           </ul>
              //                         </div>
              //                       </div>
              //                       <a
              //                         href="#"
              //                         className="btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0"
              //                       >
              //                         {" "}
              //                         Download Ticket{" "}
              //                       </a>
              //                     </div>
              //                     <div className="hr-dashed my-6" />
              //                     <div className="row g-4">
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Departure time{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Tue 09 Jan 12:00 AM{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Arrival time{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Tue 06 Aug 4:00 PM{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Booked by{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Guy Hawkins{" "}
              //                         </h5>
              //                       </div>
              //                     </div>
              //                   </div>
              //                 </li>
              //                 <li>
              //                   <div className="border border-neutral-40 p-4 p-sm-6 p-xl-8 rounded-4">
              //                     <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between">
              //                       <div className="d-flex align-items-center gap-4 flex-wrap">
              //                         <div className="d-grid place-content-center w-12 h-12 box-shadow rounded-circle flex-shrink-0">
              //                           <div className="d-grid place-content-center w-10 h-10 bg-primary-50 clr-primary-300 rounded-circle">
              //                             <span className="material-symbols-outlined mat-icon">
              //                               {" "}
              //                               minor_crash{" "}
              //                             </span>
              //                           </div>
              //                         </div>
              //                         <div className="flex-grow-1">
              //                           <h5 className="fw-medium mb-1">
              //                             {" "}
              //                             Mumbai To Chennai{" "}
              //                           </h5>
              //                           <ul className="list list-row align-items-center flex-wrap list-divider-half-xs">
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Booking ID :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   AHA12548{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                             <li>
              //                               <span className="d-inline-block fs-14">
              //                                 <span className="d-inline-block clr-neutral-500">
              //                                   {" "}
              //                                   Model :{" "}
              //                                 </span>
              //                                 <span className="d-inline-block clr-neutral-700 fw-medium">
              //                                   {" "}
              //                                   Camry{" "}
              //                                 </span>
              //                               </span>
              //                             </li>
              //                           </ul>
              //                         </div>
              //                       </div>
              //                       <a
              //                         href="#"
              //                         className="btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0"
              //                       >
              //                         {" "}
              //                         Download Ticket{" "}
              //                       </a>
              //                     </div>
              //                     <div className="hr-dashed my-6" />
              //                     <div className="row g-4">
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Pickup address{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           3890 Poplar Dr.{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Drop address{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           3605 Parker Rd.{" "}
              //                         </h5>
              //                       </div>
              //                       <div className="col-lg-6 col-xl-4">
              //                         <p className="clr-neutral-500">
              //                           {" "}
              //                           Booked by{" "}
              //                         </p>
              //                         <h5 className="mb-0 fw-medium">
              //                           {" "}
              //                           Peter Parker{" "}
              //                         </h5>
              //                       </div>
              //                     </div>
              //                   </div>
              //                 </li>
              //               </ul>
              //             </div>
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //   </li>
              // </ul>
            )}
            {active === 3 && (
              <Card className="mb-3 collapse_profile_container">
                <Card.Header
                  onClick={() => toggleCard("security")}
                  aria-controls="collapse-content"
                  aria-expanded={openPass === "security"}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    borderBottom: "none",
                  }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ padding: "10px" }}
                  >
                    <span style={{ fontSize: "27px", fontWeight: "600" }}>
                      Password
                    </span>

                    {openPass === "security" ? (
                      <IoIosArrowUp size={25} />
                    ) : (
                      <IoIosArrowDown size={25} />
                    )}
                  </div>
                </Card.Header>

                <Collapse in={openPass === "security"}>
                  <div id="security-collapse">
                    <Card.Body>
                      <form action="#" className="row g-4 form_profile_basis">
                        <div className="col-12">
                          <label
                            htmlFor="current-password-setup"
                            className="d-block mb-2 fw-medium clr-neutral-500"
                          >
                            {" "}
                            Current password :{" "}
                          </label>
                          <div className="position-relative">
                            <input
                              type={
                                showPasswords.OldPassword ? "text" : "password"
                              }
                              id="current-password-setup"
                              name="OldPassword"
                              value={passwordData.OldPassword}
                              onChange={handlePasswordChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter current password"
                            />
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y pe-4 cursor-pointer"
                              onClick={() =>
                                togglePasswordVisibility("OldPassword")
                              }
                            >
                              {showPasswords.OldPassword ? (
                                <FiEyeOff size={20} />
                              ) : (
                                <FiEye size={20} />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label
                            htmlFor="new-password"
                            className="d-block mb-2 fw-medium clr-neutral-500"
                          >
                            {" "}
                            New password :{" "}
                          </label>
                          <div className="position-relative">
                            <input
                              type={
                                showPasswords.NewPassword ? "text" : "password"
                              }
                              id="new-password"
                              name="NewPassword"
                              value={passwordData.NewPassword}
                              onChange={handlePasswordChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Enter new password"
                            />
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y pe-4 cursor-pointer"
                              onClick={() =>
                                togglePasswordVisibility("NewPassword")
                              }
                            >
                              {showPasswords.NewPassword ? (
                                <FiEyeOff size={20} />
                              ) : (
                                <FiEye size={20} />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label
                            htmlFor="confirm-password"
                            className="d-block mb-2 fw-medium clr-neutral-500"
                          >
                            {" "}
                            Confirm password :{" "}
                          </label>
                          <div className="position-relative">
                            <input
                              type={
                                showPasswords.NewConfirmPassword
                                  ? "text"
                                  : "password"
                              }
                              id="confirm-password"
                              name="NewConfirmPassword"
                              value={passwordData.NewConfirmPassword}
                              onChange={handlePasswordChange}
                              className="form-control py-3 px-6 rounded-4"
                              placeholder="Confirm your new password"
                            />
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y pe-4 cursor-pointer"
                              onClick={() =>
                                togglePasswordVisibility("NewConfirmPassword")
                              }
                            >
                              {showPasswords.NewConfirmPassword ? (
                                <FiEyeOff size={20} />
                              ) : (
                                <FiEye size={20} />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <h5 className="fw-medium mb-4">
                            {" "}
                            Password requirements :{" "}
                          </h5>
                          <ul
                            className="list list-disc Password_flex-column gap-3"
                            style={{ listStyle: "disc", fontSize: "14px" }}
                          >
                            <li>
                              {" "}
                              Minimum 8 characters long - the more, the better{" "}
                            </li>
                            <li> At least one lowercase character </li>
                            <li> At least one uppercase character </li>
                            <li>
                              {" "}
                              At least one number, symbol, or whitespace
                              character{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="col-12">
                          <div className="d-flex align-items-center gap-6 inner_profile_btn flex-wrap">
                            <button
                              // href="#"
                              className="link d-inline-block py-3 px-6 rounded-pill bg-primary-300 clr-neutral-0 :bg-primary-400 :clr-neutral-0 fw-semibold"
                              onClick={handlePasswordSubmit}
                            >
                              {" "}
                              Update Password{" "}
                            </button>
                            <a
                              href="#"
                              className="btn btn-outline-primary py-3 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold"
                            >
                              {" "}
                              Cancel{" "}
                            </a>
                          </div>
                        </div>
                      </form>
                    </Card.Body>
                  </div>
                </Collapse>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

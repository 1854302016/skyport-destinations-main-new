import React, { useEffect, useRef, useState } from "react";
import "./MobileTraveller.css";
import MobileFlightModal from "./MobileFlightModal";
import TravellerInfoPhone from "./TravellerInfoPhone";
import ReviewPage from "./ReviewPage";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { toast } from "react-toastify";
import MobileSsr from "./MobileSsr/MobileSsr";
import { countryCodeNum } from "../../../CountryCodeNum";
export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};
const MobileTravellers = ({
  flight,
  srdvIdx,
  type,
  setPageFixed,
  formData,
  childData,
  infant,
  setFormData,
  setInfant,
  setChildData,
  handlePayment,
  validatePassengerData,
  onDataChange,
  flight2,
  types,
  ssr,
  ssr2,
  totalPassenger,
  onMealChange,
  onBaggageChange,
  onSeatChange,
  totalAdultCount,
  totalChildCount,
  flight3,
  handleContinueClick,
  setPaymentGateway,
  setShowPaymentPopup,
}) => {
  console.log("flightsss", flight);
  console.log("flightsss2", flight2);
  console.log("flightsss3", flight3);
  const formatTime = (arrTime) => {
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
    return `${day}, ${dateNum} ${month} ${year}`;
  };

  const [openFilter, setOpenFilter] = useState(null);
  const filterRef = useRef(null);

  const toggleFilter = (name) => {
    setOpenFilter((prev) => (prev === name ? null : name));
  };
  const closeFilter = () => {
    setOpenFilter(null);
  };

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [travellerInfo, setTravellerInfo] = useState(false);

  const [travellerInfoOpen, setTravellerInfoOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const [currentForm, setCurrentForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    date: "",
    passportNo: "",
    nationality: "",
    issuedate: "",
    expirydate: "",
  });
  const [formDatas, setFormDatas] = useState({
    countryCode: "+91",
    isoCode: "IN",
    mobile: "",
    email: "",
    gstChecked: false,
    companyName: "",
    registrationNo: "",
  });

  const { email, mobile } = formDatas;
  const handleInputChange = (field, value) => {
    setFormDatas((prev) => ({ ...prev, [field]: value }));
  };

  const handleCountryChange = (e) => {
    const dialCode = e.target.value;
    const selectedCountry = countryCodeNum.find(
      (c) => c.dial_code === dialCode,
    );
    setFormDatas((prev) => ({
      ...prev,
      countryCode: dialCode,
      isoCode: selectedCountry ? selectedCountry.code : "GY",
    }));
  };

  // Notify parent on every change
  useEffect(() => {
    onDataChange(formDatas);
  }, [formDatas, onDataChange]);

  const counts = {
    Adult:
      flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
        ?.PTC_FareBreakdowns[0]?.PassengerTypeQuantity?.Quantity || 1,
    Child:
      flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
        ?.PTC_FareBreakdowns[1]?.PassengerTypeQuantity?.Quantity || 0,
    Infant:
      flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
        ?.PTC_FareBreakdowns[2]?.PassengerTypeQuantity?.Quantity || 0,
  };

  const getDataByType = (type) => {
    if (type === "Adult") return formData;
    if (type === "Child") return childData;
    return infant;
  };

  const setDataByType = (type, data) => {
    if (type === "Adult") setFormData(data);
    else if (type === "Child") setChildData(data);
    else setInfant(data);
  };

  const handleAddClick = (type) => {
    const list = getDataByType(type);
    if (list.length >= counts[type]) {
      alert(
        `Only ${counts[type]} ${type}${counts[type] > 1 ? "s" : ""} allowed`,
      );
      return;
    }
    setCurrentForm({ title: "", firstName: "", lastName: "", date: "" });
    setEditingType(type);
    setEditingIndex(null);
    setTravellerInfoOpen(true);
  };

  const validateSinglePassengerData = (data, type, flight) => {
    const isPassportMandatory = flight.IsPassportRequiredAtBook === true;
    const isLCC = flight.IsLCC === false;

    const requiredFields = isLCC
      ? ["title", "firstName", "lastName", "date"]
      : ["title", "firstName", "lastName"];

    const passportFields = ["passportNo", "issuedate", "expirydate"];

    const today = dayjs();
    const sixMonthsAgo = today.subtract(6, "month");
    const sixMonthsLater = today.add(6, "month");

    const getAge = (dob) => today.diff(dayjs(dob), "year");

    // 1. Check required fields
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Missing Field",
          text: `Please fill out the ${field} for ${type}.`,
        });
        return false;
      }
    }

    // 3. DOB + Age Validation
    if (isLCC || data.date) {
      const age = getAge(data.date);
      if (type === "adult" && age < 18) {
        Swal.fire({
          icon: "error",
          title: "Invalid Age",
          text: `Adult must be at least 18 years old.`,
        });
        return false;
      } else if (type === "child" && (age < 2 || age > 12)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Age",
          text: `Child must be between 2 and 12 years old.`,
        });
        return false;
      } else if (type === "infant" && age >= 2) {
        Swal.fire({
          icon: "error",
          title: "Invalid Age",
          text: `Infant must be under 2 years old.`,
        });
        return false;
      }
    }

    // 4. Passport validation
    if (isPassportMandatory) {
      for (const field of passportFields) {
        if (!data[field] || data[field].trim() === "") {
          Swal.fire({
            icon: "error",
            title: "Missing Passport Info",
            text: `Please fill out the ${field} for ${type}.`,
          });
          return false;
        }
      }

      const issueDate = dayjs(data.issuedate);
      if (data.issuedate && issueDate.isAfter(sixMonthsAgo)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Passport Issue Date",
          text: `Passport issue date must be at least 6 months old.`,
        });
        return false;
      }

      const expiryDate = dayjs(data.expirydate);
      if (!expiryDate.isValid() || expiryDate.isBefore(sixMonthsLater)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Passport Expiry Date",
          text: `Passport expiry must be at least 6 months in the future.`,
        });
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (
      !validateSinglePassengerData(
        currentForm,
        editingType?.toLowerCase(),
        flight,
      )
    ) {
      return;
    }

    const list = getDataByType(editingType);
    const updatedList = [...list];

    if (editingIndex !== null) {
      updatedList[editingIndex] = currentForm;
    } else {
      updatedList.push(currentForm);
    }

    setDataByType(editingType, updatedList);
    setTravellerInfoOpen(false);
  };

  const handleEdit = (type, index) => {
    const list = getDataByType(type);
    setCurrentForm(list[index]);
    setEditingType(type);
    setEditingIndex(index);
    setTravellerInfoOpen(true);
  };

  const [reviewModal, setReviewModal] = useState(false);
  const [agreeTC, setAgreeTC] = useState(false);

  const handleFinalSubmit = () => {
    const passengerTypes = ["Adult", "Child", "Infant"];
    for (let type of passengerTypes) {
      const expectedCount = counts[type];
      const dataList = getDataByType(type);

      // Check if count matches
      if (dataList.length !== expectedCount) {
        toast.error(
          `Please fill all ${expectedCount} ${type}${
            expectedCount > 1 ? "s" : ""
          } information`,
        );
        return;
      }

      // Validate each entry
      for (let i = 0; i < dataList.length; i++) {
        const valid = validateSinglePassengerData(
          dataList[i],
          type.toLowerCase(),
          flight,
        );
        if (!valid) return;
      }
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!mobile.trim()) {
      toast.error("Please enter your mobile number");
      return;
    }

    if (mobile.length < 7 || mobile.length > 15) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    if (!agreeTC) {
      toast.error("Please accept the Terms & Conditions and Privacy Policy.");
      setReviewModal(false);
      return;
    }

    // ✅ All checks passed, open the review modal
    setReviewModal(true);
  };
  const cabinMapping = {
    1: "All",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business",
    6: "First Class",
  };

  useEffect(() => {
    if (reviewModal) {
      window.history.pushState({ modalOpen: true }, "");
    }

    const onPopState = (e) => {
      if (reviewModal) {
        setReviewModal(false);
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [reviewModal]);

  const [ssrModal, setSsrModal] = useState(false);
  const handleConfirmClick = async () => {
    setReviewModal(false);
    setTimeout(() => {
      setShowPaymentPopup(true);
    }, 200);
  };

  useEffect(() => {
    if (ssrModal) {
      window.history.pushState({ modalOpen: true }, "");
    }

    const onPopState = (e) => {
      if (ssrModal) {
        setSsrModal(false);
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [ssrModal]);

  const isAnyModalOpen =
    travellerInfoOpen || reviewModal || ssrModal || openFilter;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAnyModalOpen]);

  return (
    <div
      className={`tg_traveller_mobile ${isAnyModalOpen ? "modal-open" : ""}`}
    >
      <div style={{ position: "relative", paddingBottom: "100px" }}>
        <div className="bgGradient"></div>
        <div className="booking_title" style={{ padding: "20px 0px 5px 0px" }}>
          {/* <div className="bgGradient"></div> */}
          <div
            style={{
              display: "flex",
              position: "relative",
              gap: "20px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              className="srp-styles__IconSpace-sc-f04c77b5-2 iXBOku flight_detail_review_phoneTG"
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
              onClick={() => setPageFixed(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="#f73030"
                loading="lazy"
                style={{ cursor: "pointer" }}
                className="arrowLeft__ArrowLeftIcon-sc-5fabd0ed-0 cTjPkF"
              >
                <path d="M6.047 15.997a3.07 3.07 0 0 1 1.04-2.305L21.956.612a2.462 2.462 0 0 1 3.25 3.697L12.205 15.75a.334.334 0 0 0 0 .5l13.003 11.44a2.463 2.463 0 0 1-3.252 3.697L7.09 18.31A3.08 3.08 0 0 1 6.046 16z" />
              </svg>
              <h3 style={{ color: "#fff" }}> Traveller Details</h3>
            </div>
          </div>
        </div>
        {/* FLight Detail  */}
        {flight && flight.PricedItineraries[0].OriginDestinationOptions[0] && (
          <>
            {flight.PricedItineraries[0].OriginDestinationOptions[0] && (
              <section
                className="flt-dtl flt-container TG_flt-container"
                style={{ display: "block", position: "relative" }}
              >
                <div className="bluebx1 d-flex gap-10 align-items-center">
                  <div>
                    <img
                      className="airlgon"
                      src={`/Images/AirlineLogo/${flight.PricedItineraries[0].OriginDestinationOptions[0].FlightSegments[0].MarketingAirlineCode}.gif`}
                    />
                  </div>
                  <div className="lft">
                    <div className="fnt-17 fnt-600 ng-binding">
                      {
                        flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments[0].SourceAirport.city_name
                      }{" "}
                      to{" "}
                      {
                        flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments[
                          flight.PricedItineraries[0]
                            .OriginDestinationOptions[0].FlightSegments.length -
                            1
                        ].DestinationAirport.city_name
                      }
                    </div>
                    <div className="fnt-12  ng-binding">
                      {formatTime(
                        flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments[0].DepartureDateTime,
                      )}{" "}
                      |{" "}
                      {new Date(
                        flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments[0].DepartureDateTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}{" "}
                      -{" "}
                      {new Date(
                        flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments[0].ArrivalDateTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}{" "}
                      |{" "}
                      {formatDuration(
                        flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments[0].JourneyDuration,
                      )}
                    </div>
                    <div className="flt-tp">
                      <span
                        className="fnt-12 ng-binding"
                        ng-bind="b.Legs[0].cabin"
                      >
                        {flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments[0].CabinClassCode === "Y" &&
                          "Economy"}
                      </span>{" "}
                      •{" "}
                      <span className="fnt-12 ng-binding">
                        {flight.PricedItineraries[0].OriginDestinationOptions[0]
                          .FlightSegments.length -
                          1 ===
                        0
                          ? "Non-Stop"
                          : `${flight.PricedItineraries[0].OriginDestinationOptions[0].FlightSegments.length - 1} Stops`}
                      </span>
                    </div>
                  </div>
                  <div
                    className="rgt mglauto"
                    onClick={() => toggleFilter("depart")}
                  >
                    <img
                      src="https://flight.easemytrip.com/M_Content/img/NewTravImgV2/right-angle-arr.svg"
                      alt=""
                    />
                  </div>
                </div>
              </section>
            )}
            {flight.PricedItineraries[0].OriginDestinationOptions[1] && (
              <section
                className="flt-dtl flt-container TG_flt-container"
                style={{ display: "block", position: "relative" }}
              >
                <div className="bluebx1 d-flex gap-10 align-items-center">
                  <div>
                    <img
                      className="airlgon"
                      src={`/Images/AirlineLogo/${flight.PricedItineraries[0].OriginDestinationOptions[1].FlightSegments[0].MarketingAirlineCode}.gif`}
                    />
                  </div>
                  <div className="lft">
                    <div className="fnt-17 fnt-600 ng-binding">
                      {
                        flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments[0].SourceAirport.city_name
                      }{" "}
                      to{" "}
                      {
                        flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments[
                          flight.PricedItineraries[0]
                            .OriginDestinationOptions[1].FlightSegments.length -
                            1
                        ].DestinationAirport.city_name
                      }
                    </div>
                    <div className="fnt-12  ng-binding">
                      {formatTime(
                        flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments[0].DepartureDateTime,
                      )}{" "}
                      |{" "}
                      {new Date(
                        flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments[0].DepartureDateTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}{" "}
                      -{" "}
                      {new Date(
                        flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments[0].ArrivalDateTime,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}{" "}
                      |{" "}
                      {formatDuration(
                        flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments[0].JourneyDuration,
                      )}
                    </div>
                    <div className="flt-tp">
                      <span
                        className="fnt-12 ng-binding"
                        ng-bind="b.Legs[0].cabin"
                      >
                        {flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments[0].CabinClassCode === "Y" &&
                          "Economy"}
                      </span>{" "}
                      •{" "}
                      <span className="fnt-12 ng-binding">
                        {flight.PricedItineraries[0].OriginDestinationOptions[1]
                          .FlightSegments.length -
                          1 ===
                        0
                          ? "Non-Stop"
                          : `${flight.PricedItineraries[0].OriginDestinationOptions[1].FlightSegments.length - 1} Stops`}
                      </span>
                    </div>
                  </div>
                  <div
                    className="rgt mglauto"
                    onClick={() => toggleFilter("depart")}
                  >
                    <img
                      src="https://flight.easemytrip.com/M_Content/img/NewTravImgV2/right-angle-arr.svg"
                      alt=""
                    />
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {flight2 && flight2?.Segments?.[0]?.length > 0 && (
          <section
            className="flt-dtl flt-container TG_flt-container"
            style={{ display: "block", position: "relative" }}
          >
            <div className="bluebx1 d-flex gap-10 align-items-center">
              <div>
                <img
                  className="airlgon"
                  src={`/Images/AirlineLogo/${flight2.Segments[0][0].Airline.AirlineCode}.gif`}
                />
              </div>
              <div className="lft">
                <div className="fnt-17 fnt-600 ng-binding">
                  {flight2.Segments[0][0].Origin.Airport.CityName} to{" "}
                  {
                    flight2.Segments[0][flight2.Segments[0].length - 1]
                      .Destination.Airport.CityName
                  }
                </div>
                <div className="fnt-12  ng-binding">
                  {formatTime(flight2.Segments[0][0].Origin.DepTime)} |{" "}
                  {new Date(
                    flight2.Segments[0][0].Origin.DepTime,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  -{" "}
                  {new Date(
                    flight2.Segments[0][flight2.Segments[0].length - 1]
                      .Destination.ArrTime,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  | {formatDuration(flight2.Segments[0][0].Duration)}
                </div>
                <div className="flt-tp">
                  <span className="fnt-12 ng-binding" ng-bind="b.Legs[0].cabin">
                    {cabinMapping[flight2.Segments[0][0].CabinClass]}
                  </span>{" "}
                  •{" "}
                  <span className="fnt-12 ng-binding">
                    {flight2.Segments[0].length - 1 == 0
                      ? "Non-Stop"
                      : `${flight2.Segments[0].length - 1} Stops`}
                  </span>
                </div>
              </div>
              <div
                className="rgt mglauto"
                onClick={() => toggleFilter("return")}
              >
                <img
                  src="https://flight.easemytrip.com/M_Content/img/NewTravImgV2/right-angle-arr.svg"
                  alt=""
                />
              </div>
            </div>
          </section>
        )}
        {flight3 && flight3?.Segments?.[1]?.length > 0 && (
          <section
            className="flt-dtl flt-container TG_flt-container"
            style={{ display: "block", position: "relative" }}
          >
            <div className="bluebx1 d-flex gap-10 align-items-center">
              <div>
                <img
                  className="airlgon"
                  src={`/Images/AirlineLogo/${flight3.Segments[1][0].Airline.AirlineCode}.gif`}
                />
              </div>
              <div className="lft">
                <div className="fnt-17 fnt-600 ng-binding">
                  {flight3.Segments[1][0].Origin.Airport.CityName} to{" "}
                  {
                    flight3.Segments[1][flight3.Segments[1].length - 1]
                      .Destination.Airport.CityName
                  }
                </div>
                <div className="fnt-12  ng-binding">
                  {formatTime(flight3.Segments[1][0].Origin.DepTime)} |{" "}
                  {new Date(
                    flight3.Segments[1][0].Origin.DepTime,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  -{" "}
                  {new Date(
                    flight3.Segments[1][flight3.Segments[1].length - 1]
                      .Destination.ArrTime,
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}{" "}
                  | {formatDuration(flight3.Segments[1][0].Duration)}
                </div>
                <div className="flt-tp">
                  <span className="fnt-12 ng-binding" ng-bind="b.Legs[0].cabin">
                    {cabinMapping[flight3.Segments[1][0].CabinClass]}
                  </span>{" "}
                  •{" "}
                  <span className="fnt-12 ng-binding">
                    {flight3.Segments[1].length - 1 === 0
                      ? "Non-Stop"
                      : `${flight3.Segments[1].length - 1} Stops`}
                  </span>
                </div>
              </div>
              <div
                className="rgt mglauto"
                onClick={() => toggleFilter("inter")}
              >
                <img
                  src="https://flight.easemytrip.com/M_Content/img/NewTravImgV2/right-angle-arr.svg"
                  alt=""
                />
              </div>
            </div>
          </section>
        )}

        {/* Traveller Logic  */}
        <div className="traveller_logic_div" style={{ position: "relative" }}>
          <div className="inr_shd_pd0_n2">
            <div className="trvlr_info">
              <div className="head_bx_bg_n2">
                {/*div class="tr_icn"></div*/}
                <div className="wt600 fnt-16 clr-black">Travellers</div>

                {/* <div className="noOfpax mglauto">
                <div className="mwid-27">
                  <div className="icn-adult" />
                  <div className="pul-l">
                    <p className="pax-no">
                      <span className="ng-binding">{flight && flight?.FareBreakdown?.[0]?.PassengerCount}</span>
                    </p>
                    <p className="pax-ttl">Adult</p>
                  </div>
                </div>
                <div className="mwid-30">
                  <div className="icn-child" />
                  <div className="pul-l">
                    <p className="pax-no">
                      <span className="ng-binding">{flight && flight?.FareBreakdown?.[1]?.PassengerCount}</span>
                    </p>
                    <p className="pax-ttl">Children</p>
                  </div>
                </div>
                <div className="mwid-30">
                  <div className="icn-infant" />
                  <div className="pul-l">
                    <p className="pax-no">
                      <span className="ng-binding">{flight && flight?.FareBreakdown?.[2]?.PassengerCount}</span>
                    </p>
                    <p className="pax-ttl">Infant(s)</p>
                  </div>
                </div>
              </div> */}
                <div className="noOfpax mglauto">
                  <div className="mwid-27">
                    <div className="icn-adult" />
                    <div className="pul-l">
                      <p className="pax-no">{counts.Adult}</p>
                      <p className="pax-ttl">Adult</p>
                    </div>
                  </div>{" "}
                  <div className="mwid-30">
                    <div className="icn-child" />
                    <div className="pul-l">
                      <p className="pax-no">{counts.Child}</p>
                      <p className="pax-ttl">Children</p>
                    </div>
                  </div>
                  <div className="mwid-30">
                    <div className="icn-infant" />
                    <div className="pul-l">
                      <p className="pax-no">{counts.Infant}</p>
                      <p className="pax-ttl">Infants</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="innerpd10">
                <div className="bg-silver ng-scope" style={{ marginTop: 5 }}>
                  <img
                    src="	https://flight.easemytrip.com/M_Content/img/g-id-icon.png"
                    width={21}
                    height={16}
                    alt="Name"
                    className="spcer"
                  />{" "}
                  Name should be same as in Goverment ID proof
                </div>
                {counts.Adult > 0 && (
                  <div className="travller_tile b_bottom">
                    <span className="fn14">Adult</span>
                    <a
                      className="fr text_bl"
                      onClick={() => handleAddClick("Adult")}
                    >
                      + Add Adult
                    </a>
                  </div>
                )}
                {counts.Child > 0 && (
                  <div className="travller_tile b_bottom">
                    <span className="fn14">Child</span>
                    <a
                      className="fr text_bl"
                      onClick={() => handleAddClick("Child")}
                    >
                      + Add Child
                    </a>
                  </div>
                )}
                {counts.Infant > 0 && (
                  <div className="travller_tile b_bottom">
                    <span className="fn14">Infant</span>
                    <a
                      className="fr text_bl"
                      onClick={() => handleAddClick("Infant")}
                    >
                      + Add Infant
                    </a>
                  </div>
                )}
                {/* <div className="travller_tile b_bottom">
                <span className="fn14"> Adult </span>
                <a
                  className="fr text_bl"
                  onClick={() => setTravellerInfo(true)}
                >
                  {" "}
                  + Add Adult
                </a>
              </div> */}
                {/* <ul className="traveller_list">
                <li
                  data-ng-repeat="(id,Px) in PaxDtl.Adult"
                  className="ng-scope"
                >
                  <label className="container_hp ng-binding">
                    Mr fhg tytr
                    <input type="checkbox" id="chkAdult0" name="chkAdultName" />
                    <span className="checkmark_hp" />
                  </label>
                  <a className="fr edit_info" />
                  <div id="Addncill" className="MancillAdult0"></div>
                </li>
              </ul> */}
                <ul className="traveller_list">
                  {formData.map((traveller, index) => (
                    <li key={`Adult-${index}`}>
                      <label className="container_hp">
                        {traveller.title} {traveller.firstName}{" "}
                        {traveller.lastName}
                        {/* <input type="checkbox" /> */}
                        {/* <span className="checkmark_hp" /> */}
                      </label>
                      <a
                        className="fr edit_info"
                        onClick={() => handleEdit("Adult", index)}
                      >
                        <HiMiniPencilSquare size={25} color="#053355" />
                      </a>
                    </li>
                  ))}

                  {childData.map((traveller, index) => (
                    <li key={`Child-${index}`}>
                      <label className="container_hp">
                        {traveller.title} {traveller.firstName}{" "}
                        {traveller.lastName}
                        {/* <input type="checkbox" /> */}
                        {/* <span className="checkmark_hp" /> */}
                      </label>
                      <a
                        className="fr edit_info"
                        onClick={() => handleEdit("Child", index)}
                      >
                        <HiMiniPencilSquare size={25} color="#053355" />
                      </a>
                    </li>
                  ))}

                  {infant.map((traveller, index) => (
                    <li key={`Infant-${index}`}>
                      <label className="container_hp">
                        {traveller.title} {traveller.firstName}{" "}
                        {traveller.lastName}
                        {/* <input type="checkbox" /> */}
                        {/* <span className="checkmark_hp" /> */}
                      </label>
                      <a
                        className="fr edit_info"
                        onClick={() => handleEdit("Infant", index)}
                      >
                        <HiMiniPencilSquare size={25} color="#053355" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="clr" />
          </div>
        </div>
        {/* Contact Info  */}
        <div className="contact_info_mobile_flight">
          <div className="inr_shd_pd0_n2">
            <div className="contact_sec_td">
              <div className="head_bx_bg_n2" style={{ display: "block" }}>
                <div className="wt600 fnt-16 clr-black">
                  Contact Information
                </div>
                <div className="fnt-12 clr-grey fnt-500">
                  Your ticket &amp; flight details will be shared here
                </div>
              </div>
              <div className="innerpd10">
                <div
                  className="field-container12"
                  style={{ display: "block", marginTop: 10 }}
                >
                  <input
                    type="email"
                    id="txtEmailId"
                    placeholder="Enter Email Address"
                    value={formDatas.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="field2 ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-email ng-valid-required"
                  />
                  <label className="floating-label_1">
                    Please enter your email address
                  </label>
                  <span id="spnEmailId1" className="msgAlert" />
                </div>
                {/*add email end*/}
                <div className="clr" />
                <div className="flx_gap_10">
                  <div
                    className="field-container19"
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "5px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: "12px",
                        color: "#000",
                        zIndex: 1,
                        fontWeight: "500",
                      }}
                    >
                      {formDatas.countryCode}
                    </div>
                    <select
                      id="txtCountryCode"
                      className="field2 field222_tg ng-pristine ng-untouched ng-valid ng-not-empty"
                      value={formDatas.countryCode}
                      onChange={handleCountryChange}
                      style={{
                        padding: "0 5px",
                        fontSize: "12px",
                        color: "transparent",
                        background: "transparent",
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        height: "48px", // Matching typical field height
                      }}
                    >
                      {countryCodeNum.map((item, index) => (
                        <option
                          key={index}
                          value={item.dial_code}
                          style={{ color: "#000" }}
                        >
                          {item.name} ({item.dial_code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field-container20">
                    {/* onkeydown="validateMoblen(this)" */}
                    <input
                      type="tel"
                      id="txtCPhone"
                      placeholder="Enter Mobile No"
                      value={formDatas.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        handleInputChange("mobile", val);
                      }}
                      className="field2 ng-pristine ng-untouched ng-valid ng-not-empty"
                    />
                    <label className="floating-label_1">Enter Mobile No</label>
                    <span id="spnCPhone" className="msgAlert" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* GST NO  */}
        {/* <div className="gst_no_mobile">
          <div
            className="inr_shd2_n2"
            id="gst"
            style={{ paddingTop: 0 }}
            ng-show="IsGSTEnabled"
          >
            <div className="mgt10">
              <label className="con_insc">
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  Use GST for this booking{" "}
                  <span className="gstflt">(OPTIONAL)</span>
                </div>
                <span
                  style={{
                    display: "block",
                    fontWeight: "normal",
                    fontSize: 11,
                    color: "#737373",
                    wordBreak: "break-all",
                  }}
                >
                  {" "}
                  To claim credit of GST charged by airlines/TripGo, please
                  enter your company's GST number
                </span>
                <input
                  type="checkbox"
                  className="check_box ng-valid ng-dirty ng-valid-parse ng-touched ng-not-empty"
                  ng-model="IsGstMan"
                  id="checkbox1a"
                  ng-click="AutoFillGST()"
                  data-gtm-form-interact-field-id={8}
                />
                <span className="cmark_insc" />
              </label>
            </div>
            <div
              className="panel"
              id="autoUpdate1a"
              style={{ display: "none" }}
            >
              <div
                id="spnGstError"
                style={{ color: "red", float: "left" }}
              ></div>
              <div className="field-container12">
                <input
                  type="text"
                  name="txtEmailId"
                  id="gstEmail"
                  onblur="ValidateEmailMsg(this,'errorgstemail')"
                  className="field2"
                  placeholder="Enter Email Id"
                  required=""
                />
                <label className="floating-label_1">Enter Email Id</label>
                <span className="gsterror" id="errorgstemail" />
              </div>
              <div className="field-container12">
                <input
                  type="number"
                  className="field2"
                  placeholder="Enter Mobile No"
                  name="txtEmailId"
                  id="gstPhone"
                  onblur="ValidateMobileNumberMsg(this,'errorgstmobile')"
                  onkeydown="validateMoblen(this)"
                  required=""
                />
                <label className="floating-label_1">Enter Mobile No</label>
                <span className="gsterror" id="errorgstmobile" />
              </div>
              <div className="field-container12">
                <input
                  type="text"
                  name="txtEmailId"
                  id="gstNumber"
                  onblur="ValidateGSTMsg(this)"
                  className="field2"
                  placeholder="Enter GST No"
                  required=""
                />
                <label className="floating-label_1">Enter GST No</label>
                <span className="gsterror" id="errorgstno" />
              </div>
              <div className="field-container12">
                <input
                  type="text"
                  name="txtEmailId"
                  id="gstCom"
                  className="field2"
                  onblur="ValidateCompany()"
                  placeholder="Enter Company Name"
                  required=""
                />
                <label className="floating-label_1">Enter Company Name</label>
                <span className="gsterror" id="errorgstcompanyname" />
              </div>
              <div className="field-container12" style={{ display: "none" }}>
                <input
                  type="text"
                  id="gstAdd"
                  name=""
                  className="field2"
                  placeholder="Enter Your Address"
                  required=""
                />
                <label className="floating-label_1">Enter Your Address</label>
                <span className="gsterror">Please Enter Your Address</span>
              </div>
            </div>
          </div>
        </div> */}
        {/* Aggree  */}
        <div className="agree_tc_mobile">
          <div className="inner_block">
            <div className="tr_cnd mgbt" style={{ marginTop: 6 }}>
              <label className="con_insc">
                <span className="tc_sub">
                  I Accept <a className="tc-cl">T&amp;C </a> and{" "}
                  <a className="tc-cl">Privacy Policy </a>
                </span>
                <input
                  name="Terms"
                  id="chkTandC"
                  type="checkbox"
                  className="check_box"
                  checked={agreeTC}
                  onChange={(e) => setAgreeTC(e.target.checked)}
                />
                <span className="cmark_insc" />
              </label>
            </div>
          </div>
        </div>
        {/* Grand Total  */}
        <div className="stick_filter_nv1_mobile bb">
          <div className="col_4">
            <p>Grand Total</p>

            <span className="newfnt ng-binding">
              {" "}
              ${" "}
              {flight2
                ? 
                    flight.PricedItineraries[0].AirItineraryPricingInfo
                      .ItinTotalFare.TotalFare.Amount +
                      flight2.PricedItineraries[0].AirItineraryPricingInfo
                        .ItinTotalFare.TotalFare.Amount
                  
                :
                    flight.PricedItineraries[0].AirItineraryPricingInfo
                      .ItinTotalFare.TotalFare.Amount
                  }
            </span>
            <a className="fr_icn ovhdn" />
          </div>
          <div className="col_5_nv1 return-top" onClick={handleFinalSubmit}>
            <a className="con_btn_nv1 gotop">Continue Booking</a>
          </div>
        </div>

        {openFilter === "depart" && (
          <MobileFlightModal
            closeFilter={closeFilter}
            srdvIdx={srdvIdx}
            flight={flight}
            type="Departure"
          />
        )}
        {openFilter === "return" && (
          <MobileFlightModal
            closeFilter={closeFilter}
            srdvIdx={srdvIdx}
            flight={flight2}
            type="Return"
          />
        )}
        {openFilter === "inter" && (
          <MobileFlightModal
            closeFilter={closeFilter}
            srdvIdx={srdvIdx}
            flight3={flight3}
            type="Return"
          />
        )}
        {travellerInfoOpen && (
          <TravellerInfoPhone
            isOpen={travellerInfoOpen}
            onClose={() => setTravellerInfoOpen(false)}
            type={editingType}
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            onSave={handleSave}
            flight={flight}
            setShowPaymentPopup={setShowPaymentPopup}
          />
        )}
        {reviewModal && (
          <ReviewPage
            setReviewModal={setReviewModal}
            formData={formData}
            childData={childData}
            infant={infant}
            handleConfirmClick={handleConfirmClick}
            setShowPaymentPopup={setShowPaymentPopup}
            handlePayment={handlePayment}
          />
        )}
        {ssrModal && (
          <MobileSsr
            ssr={ssr}
            flight={flight}
            setSsrModal={setSsrModal}
            flight2={flight2}
            ssr2={ssr2}
            totalPassenger={totalPassenger}
            onSeatChange={onSeatChange}
            onBaggageChange={onBaggageChange}
            onMealChange={onMealChange}
            handlePayment={handlePayment}
            totalAdultCount={totalAdultCount}
            totalChildCount={totalChildCount}
          />
        )}
      </div>
    </div>
  );
};

export default MobileTravellers;

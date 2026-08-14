import React, { useEffect, useRef, useState } from "react";
import "./FlightDetail.css";
import FlightDetailSkeleton from "./FlightDetailSkeleton";
// import FlightDetailSide from "./FlightDetailSide";
import DepatureDetail from "./DepatureDetail";
import FlightPayModal from "./FlightPayModal";
// import { MdFlightLand } from "react-icons/md";
// import { FaAngleDown, FaRegThumbsUp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import "dayjs/locale/en-gb";
import {
  Container,
  Row,
  Col,
  // Form,
  // InputGroup,
  // FormControl,
  Nav,
  // Modal,
  Modal,
  Button,
  Card,
  Spinner,
  // Tab,
  // Card,
} from "react-bootstrap";
// import { HiPlusSmall } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { HiMiniMinusSmall } from "react-icons/hi2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import GoodToKnow from "./GoodToKnow";
// import FlightPayDetail from "./FlightPayDetail";
import FareRule from "./FareRule";
import SSRContent from "./SSRContent";
import ChargesOneWay from "./ChargesOneWay";
import BDSend from "./BDSend";
import TravellerInformation from "./TravellerInformation";
import EmiModal from "./EmiModal";
import { cities12 } from "../../../Cities";
import { initializePhonePe, PhonePe } from "phonepesdk-web"; // Import PhonePe SDK
import { BsInfoCircleFill } from "react-icons/bs";
import TripSecure from "./TripSecure";
import { toast } from "react-toastify";
import WhyBook from "./WhyBook";
import MobileTravellers from "./MobileTravellers";
import FlightSSR from "./FlightSSR.jsx";
import ReviewPassneger from "./ReviewPassneger.jsx";
const FlightDetail = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);
const [latestFareSourceCode, setLatestFareSourceCode] = useState("");
  const [fromCurrency2, setFromCurrency2] = useState("IRR");
  const [toCurrency2, setToCurrency2] = useState("INR");
  const [exchangeRate2, setExchangeRate2] = useState(null);

  const [isPassportMandatory, setIsPassportMandatory] = useState(false);
  const [openPayBtn, setOpenPayBtn] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState(false);
  const decodedIndex = decodeURIComponent(useParams().index);
  const decodedIndex2 = decodeURIComponent(useParams().index2);
  const srdvIdx = decodeURIComponent(useParams().srdvIdx);
  const [flight, setFlight] = useState(null);
  const [fareRule, setFareRule] = useState(null);
  const [ssrResponse, setSsrResponse] = useState(null);
  const [flight2, setFlight2] = useState(null);
  const [flight3, setFlight3] = useState(null);
  const [fareRule2, setFareRule2] = useState(null);
  const [ssrResponse2, setSsrResponse2] = useState(null);
  const [emiBtn, setEmiBtn] = useState(false);
  const search = useSelector((state) => state.flight.search);
  const [showFareChangePopup, setShowFareChangePopup] = useState(false);
const [fareChangeData, setFareChangeData] = useState(null);
  const [passengerBaggagePreferences, setPassengerBaggagePreferences] =
    useState([]);
  const [passengerSeatPreferences, setPassengerSeatPreferences] = useState([]);
  const [passengerMealPreferences, setPassengerMealPreferences] = useState([]);
  const [token, setToken] = useState();
  const [sessionId, setSessionId] = useState();
  const [traceId, setTraceId] = useState();
  const navigate = useNavigate();
  const [showdetail, setShowdetail] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [passengers, setPassengers] = useState([]);
  const [formData, setFormData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [infant, setInfant] = useState([]);
  const { walletData } = useSelector((state) => state.auth);
  const [totalSeatPrice, setTotalSeatPrice] = useState(0);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState("");
  const [selectedOutboundSeats, setSelectedOutboundSeats] = useState({
    adult: [],
    child: [],
  });
  const [selectedInboundSeats, setSelectedInboundSeats] = useState({
    adult: [],
    child: [],
  });

  //Mistify States
  const [revalidate, setRevalidate] = useState(null);
  const [mistifyFlight, setMistifyFlight] = useState(null);

  const [selectedInboundMeals, setSelectedInboundMeals] = useState("");
  const [selectedOutboundMeals, setSelectedOutboundMeals] = useState("");
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [selectedInboundBaggage, setSelectedInboundBaggage] = useState("");
  const [totalBaggagePrice, setTotalBaggagePrice] = useState(0);
  const [selectedOutboundBaggage, setSelectedOutboundBaggage] = useState("");
  console.log("selectedOutboundSeats", selectedOutboundSeats);
  console.log("selectedOutboundMeals", selectedOutboundMeals);
  console.log("selectedOutboundBaggage", selectedOutboundBaggage);

  const handleSeatChange = (data) => {
    setSelectedOutboundSeats(data.selectedSeats.ssr);
    setSelectedInboundSeats(data.selectedSeats.ssr2);
    setTotalSeatPrice(data.totalSeatPrice);
  };

  const handleMealChange = (data) => {
    setSelectedOutboundMeals(data.selectedMeals.ssr);
    setSelectedInboundMeals(data.selectedMeals.ssr2);
    setTotalMealPrice(data.total);
  };
  const handleBaggageChange = (data) => {
    setSelectedInboundBaggage(data.selectedBaggage.ssr2);
    setSelectedOutboundBaggage(data.selectedBaggage.ssr);
    setTotalBaggagePrice(data.total);
  };

  // const [promoCode, setPromoCode] = useState("");
  // const [appliedCode, setAppliedCode] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  console.log("passenger seat preference", passengerSeatPreferences);
  console.log("passenger meal preference", passengerMealPreferences);
  console.log("passenger baggage preference", passengerBaggagePreferences);
  const [loading, setLoading] = useState(false);
  const [storedConversationId, setStoredConversationId] = useState("");
  // const [flightPassengers,setFlightPassengers]=useState([])

  console.log("SRDVP", srdvIdx);
  useEffect(() => {
    const storedTraceId = String(sessionStorage.getItem("traceId"));
    const storedToken = String(localStorage.getItem("token"));
    const storedSessionId = String(localStorage.getItem("sessionId"));
    const storedConversationId = String(localStorage.getItem("ConversationId"));

    if (storedTraceId && storedToken && storedSessionId) {
      setTraceId(storedTraceId);
      setToken(storedToken);
      setSessionId(storedSessionId);
      setStoredConversationId(storedConversationId);
    } else {
      setTraceId(undefined);
      setToken(undefined);
      setSessionId(undefined);
    }
  }, []);
  
 const getReturnFlightDate = () => {
  const tripOptions =
    flight?.PricedItineraries?.[0]?.OriginDestinationOptions;

  if (!tripOptions?.length) {
    return null;
  }

  // Round Trip
  if (tripOptions.length > 1) {
    const returnSegments = tripOptions[1].FlightSegments;
    const lastSegment = returnSegments[returnSegments.length - 1];

    return dayjs(lastSegment.DepartureDateTime);
  }

  // One Way
  const outboundSegments = tripOptions[0].FlightSegments;
  const lastSegment = outboundSegments[outboundSegments.length - 1];

  return dayjs(lastSegment.DepartureDateTime);
};

const validatePassengerAgeByType = (dob, passengerType) => {
    const returnFlightDate = getReturnFlightDate();

    if (!returnFlightDate) {
        return true;
    }

    const birthDate = dayjs(dob);

    const secondBirthday = birthDate.add(2, "year");
    const twelfthBirthday = birthDate.add(12, "year");

    if (passengerType === "INF") {
        if (
            returnFlightDate.isSame(secondBirthday, "day") ||
            returnFlightDate.isAfter(secondBirthday)
        ) {
            toast.error(
                "Infant will be 2 years or older on the return flight. Please book as Child."
            );
            return false;
        }
    }

    if (passengerType === "CHD") {
        if (returnFlightDate.isBefore(secondBirthday, "day")) {
            toast.error(
                "Child will be under 2 years old on the return flight. Please book as Infant."
            );
            return false;
        }

        if (
            returnFlightDate.isSame(twelfthBirthday, "day") ||
            returnFlightDate.isAfter(twelfthBirthday)
        ) {
            toast.error(
                "Child will be 12 years or older on the return flight. Please book as Adult."
            );
            return false;
        }
    }

    if (passengerType === "ADT") {
        if (returnFlightDate.isBefore(twelfthBirthday, "day")) {
            toast.error(
                "Passenger will be under 12 years old on the return flight. Please book as Child."
            );
            return false;
        }
    }

    return true;
};

  useEffect(() => {
    const isValidIndex2 =
      decodedIndex2 !== "" &&
      decodedIndex2 !== "undefined" &&
      decodedIndex2 !== "null";

    if (!token || !traceId || !decodedIndex) {
      console.log(
        "Skipping API call due to missing token/traceId/decodedIndex",
      );
      return;
    }

    const fetchSSRTBO = async () => {
      try {
        const response3 = await axios.post(
          "https://admin.trustedfare.com/api/flightSsr-lcc",
          {
            EndUserIp: "192.168.11.58",
            TraceId: traceId,
            ResultIndex: decodedIndex,
          },
        );

        if (response3 && response3.data.success) {
          setSsrResponse(response3.data.data);
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    const fetchSSRTBORound = async () => {
      try {
        const response = await axios.post(
          "https://admin.trustedfare.com/api/flightSsr-lcc",
          {
            EndUserIp: "192.168.11.58",
            TraceId: traceId,
            ResultIndex: decodedIndex,
            ResultIndexIB: decodedIndex2,
          },
        );

        if (response && response.data.success) {
          const data = response.data.data;
          setSsrResponse(data);
          setSsrResponse2(data.Inbound);
        }
      } catch (error) {
        console.error("Error fetching round-trip SSR data:", error);
      }
    };

    const fetchFlightDetailsTBO = async () => {
      try {
        const payload = {
          EndUserIp: "192.168.11.58",
          TokenId: token,
          TraceId: traceId,
          ResultIndex: decodedIndex,
        };

        console.log("TBO Request payload", payload);

        const fareQuoteRes = await axios.post(
          "https://admin.trustedfare.com/api/flight-fare-quote",
          payload,
        );

        const results = fareQuoteRes.data.data.Results;
        setFlight(results);
        setFlight3(results);

        // Create passenger list dynamically
        const newPassengers =
          results?.FareBreakdown?.flatMap(
            ({ PassengerType, PassengerCount }) => {
              const typeLabel =
                PassengerType === 1
                  ? "Adult"
                  : PassengerType === 2
                    ? "Child"
                    : "Infant";
              return Array.from({ length: PassengerCount }, (_, index) => ({
                id: index + 1,
                type: typeLabel,
                name: `Passenger ${index + 1}`,
              }));
            },
          ) || [];
        setPassengers(newPassengers);

        if (!fareQuoteRes.data.success) {
          toast.error("Supplier Side Error");
          navigate("/404");
        } else if (isValidIndex2) {
          fetchSSRTBORound();
        } else {
          fetchSSRTBO();
        }
      } catch (error) {
        console.error("Error fetching TBO flight data:", error);
        toast.error("Supplier Side Error");
      }
    };

    const fetchFlightDetailsTBORound = async () => {
      try {
        const commonPayload = {
          EndUserIp: "192.168.11.58",
          TokenId: token,
          TraceId: traceId,
        };

        const payloadQuote1 = {
          ...commonPayload,
          ResultIndex: decodedIndex,
          ResultIndexIB: decodedIndex2,
        };

        console.log("Round trip payload:", payloadQuote1);

        const resQuote1 = await axios.post(
          "https://admin.trustedfare.com/api/flight-fare-quote",
          payloadQuote1,
        );

        const data = resQuote1.data.data;
        setFlight(data.Results);
        setFlight2(data.Inbound.Results);

        const fareBreakdown = data.Results?.FareBreakdown || [];
        const newPassengers = fareBreakdown.flatMap(
          ({ PassengerType, PassengerCount }) => {
            const typeLabel =
              PassengerType === 1
                ? "Adult"
                : PassengerType === 2
                  ? "Child"
                  : "Infant";
            return Array.from({ length: PassengerCount }, (_, index) => ({
              id: index + 1,
              type: typeLabel,
              name: `Passenger ${index + 1}`,
            }));
          },
        );
        setPassengers(newPassengers);

        if (!resQuote1.data.success) {
          toast.error("Supplier Side Error");
          navigate("/404");
        } else {
          fetchSSRTBORound();
        }
      } catch (error) {
        console.error("Error fetching round-trip flight data:", error);
        toast.error("Supplier Side Error");
      }
    };

    const fetchMistifyData = async () => {
      const revalidatePayload = {
        FareSourceCode: decodedIndex,
        ConversationId: storedConversationId,
      };

      try {
        const res = await axios.post(
          "https://admin.trustedfare.com/api/Mistify/Revalidate",
          revalidatePayload,
        );

        console.log("Full Mistify API response:", res.data);

        const result = res.data?.data || res.data;

        if (result?.Success === true && result?.Data?.IsValid === true) {
			
		 const updatedFareSourceCode =
			result?.Data?.PricedItineraries?.[0]
			  ?.AirItineraryPricingInfo?.FareSourceCode;

		  // store new fare source code
		  if (updatedFareSourceCode) {
			setLatestFareSourceCode(updatedFareSourceCode);
		  }
          setRevalidate(result);
          setFlight(result.Data);
          console.log("✅ Mistify data valid:", result);
          return 1; // success
        } if (result?.Success === true && result?.Data?.IsValid === false) {
			const updatedFareSourceCode =
			result?.Data?.PricedItineraries?.[0]
			  ?.AirItineraryPricingInfo?.FareSourceCode;

		  // store new fare source code
		  if (updatedFareSourceCode) {
			setLatestFareSourceCode(updatedFareSourceCode);
		  }
          setRevalidate(result);
		  setFlight(result.Data);

		  // show popup
		  setFareChangeData(result.Data);
		  setShowFareChangePopup(true);

		  return 0;
        }else {
          console.warn("❌ Revalidation failed or data invalid:", result);
          toast.error("Revalidation failed — invalid fare data");
          navigate(-1); // 👈 Go back to the previous page
          return -1;
        }
      } catch (error) {
        console.error("🔥 Error during Mistify revalidation:", error);
        toast.error("Revalidation failed — please try again");
        navigate(-1); // 👈 Go back if API call fails
        return -1;
      }
    };

    // ✅ Main flow logic
    const run = async () => {
      if (srdvIdx === "EwebM") {
        const result = await fetchMistifyData();
        if (result === -1) {
          console.warn("Redirected due to Mistify revalidation failure");
        }
      } else {
        if (isValidIndex2) {
          await fetchFlightDetailsTBORound();
        } else {
          await fetchFlightDetailsTBO();
        }
      }
    };

    run();
  }, [
    token,
    traceId,
    decodedIndex,
    decodedIndex2,
    srdvIdx,
    storedConversationId,
  ]);

  console.log("SSR", ssrResponse);
  console.log("SSRInbound", ssrResponse2);
  const [loadingFareRule, setLoadingFareRule] = useState(false);
  const [showFareRuleModal, setShowFareRuleModal] = useState(false);
  const handleFareRuleClick = () => {
    setShowFareRuleModal(true); // open modal immediately
    fetchFareRule(); // fetch data in background
  };

  // const fetchFareRule = async () => {
  //   setLoadingFareRule(true);
  //   try {
  //     const payload = {
  //       EndUserIp: "192.168.11.58",
  //       TokenId: token,
  //       TraceId: traceId,
  //       ResultIndex: decodedIndex,
  //     };

  //     const response = await axios.post(
  //       "https://admin.trustedfare.com/api/flight-fare-rule",
  //       payload
  //     );
  //     console.log(
  //       "FARE RULESSSS",
  //       response.data.data.FareRules[0].FareRuleDetail
  //     );
  //     if (!response.data.success) {
  //       toast.error("Supplier side error");
  //       navigate("/404");
  //       return;
  //     }

  //     const parsedRules = response.data.data.FareRules?.[0]?.FareRuleDetail
  //       ? parseFareRule(response.data.data.FareRules[0].FareRuleDetail)
  //       : [];

  //     setFareRule(parsedRules);
  //   } catch (error) {
  //     console.error("Error fetching fare rule:", error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoadingFareRule(false);
  //   }
  // };

  const fetchFareRule = async () => {
    setLoadingFareRule(true);

    try {
      let parsedRules = {
        BaggageInfos: [],
        FareRules: [],
      };

      if (srdvIdx === "undefined") {
        // TripGoOnline API
        const payload = {
          EndUserIp: "192.168.11.58",
          TokenId: token,
          TraceId: traceId,
          ResultIndex: decodedIndex,
        };

        const response = await axios.post(
          "https://admin.trustedfare.com/api/flight-fare-rule",
          payload,
        );

        console.log(
          "TRIPGO FARE RULE:",
          response.data.data.FareRules?.[0]?.FareRuleDetail,
        );

        if (!response.data.success) {
          toast.error("Supplier side error");
          return;
        }

        // Parse TripGoOnline rule structure
        const parsedFare = response.data.data.FareRules?.[0]?.FareRuleDetail
          ? parseFareRule(response.data.data.FareRules[0].FareRuleDetail)
          : [];

        parsedRules.FareRules = parsedFare;
      } else if (srdvIdx === "EwebM") {
        // Mistify (SkyPortDestinations) API
        const responseM = await axios.post(
          "https://admin.trustedfare.com/api/Mistify/FareRules",
          {
            FareSourceCode: latestFareSourceCode || decodedIndex,
            ConversationId: storedConversationId,
          },
        );

        const data = responseM?.data?.data?.Data;
        console.log("MISTIFY FARE RULE:", data);

        if (data?.Success === false) {
          toast.error("Supplier side error");
          return;
        }

        // Make sure the data fits our structure
        parsedRules.BaggageInfos = data?.BaggageInfos ?? [];
        parsedRules.FareRules = data?.FareRules ?? [];
      } else {
        toast.error("Unsupported index type for fare rule");
        return;
      }

      // ✅ Always set a safe structured object
      setFareRule(parsedRules);
    } catch (error) {
      console.error("Error fetching fare rule:", error);
      toast.error("Something went wrong");
    } finally {
      setLoadingFareRule(false);
    }
  };

  const parseFareRule = (fareRuleDetail) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = fareRuleDetail;
    const listItems = Array.from(tempDiv.querySelectorAll("li")).map((li) =>
      li.textContent.trim(),
    );

    return listItems;
  };
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleInputChange = (index, e) => {
    const { name, value, options, selectedIndex } = e.target;
    const cleanedName = name.replace(/\d+/g, ""); // Remove numeric parts from the name

    const list = [...formData];
    if (!list[index]) {
      list[index] = {};
    }

    // ✅ Character limit check (for firstName / lastName)
    const paxNameCharacterLimit =
      flight?.PricedItineraries?.[0]?.PaxNameCharacterLimit || 60;
    const maxPerField = Math.floor(paxNameCharacterLimit);

    if (
      (cleanedName === "firstName" || cleanedName === "lastName") &&
      value.length > maxPerField
    ) {
      toast.error(
        `Maximum ${maxPerField} characters allowed for ${cleanedName}.`,
      );
      return; // Stop here — don’t update state if limit exceeded
    }

    if (cleanedName === "nationality") {
      const selectedIndex = e.target.selectedIndex;
      const selectedOption = e.target.options[selectedIndex];

      const selectedCountryCode = selectedOption.value;
      const selectedCountryName = selectedOption.text;

      list[index]["nationality"] = selectedCountryName;
      list[index]["nationalityCode"] = selectedCountryCode;
      setFormData(list);
      return;
    }

    // Handle passport issue date validation
    if (cleanedName === "issuedate" && dayjs(value).isValid()) {
      const issueDate = dayjs(value);
      const sixMonthsAgo = dayjs().subtract(6, "months").startOf("day"); // 6 months ago from today
      const today = dayjs().endOf("day"); // Today

      // Check if the issue date is before 6 months ago, and not in the last 6 months
      if (
        issueDate.isAfter(sixMonthsAgo, "day") ||
        issueDate.isAfter(today, "day")
      ) {
        toast.error(
          "Passport issue date must be before 6 months ago from Flight.",
        );
        return; // Prevent setting invalid issue date
      }

      list[index][cleanedName] = issueDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "expirydate" && dayjs(value).isValid()) {
      // Passport Expiry Date validation: Must be at least 6 months after current date
      const expiryDate = dayjs(value);

        const returnFlightDate = getReturnFlightDate();
        const minExpiryDate = returnFlightDate.add(6, "months").startOf("day");

        if (expiryDate.isBefore(minExpiryDate, "day")) {
          toast.error(
            `Passport expiry date must be at least 6 months after return flight date (${returnFlightDate.format("DD MMM YYYY")}).`
          );
          return;
        }

      list[index][cleanedName] = expiryDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "date" && dayjs(value).isValid()) {
      // Date of Birth validation: User must be at least 18 years old
      const birthDate = dayjs(value);

        // Current age validation
        const age = dayjs().diff(birthDate, "years");

        if (age < 12) {
          toast.error("Passenger must be at least 12 years old.");
          return;
        }

        // Return flight validation
        const returnFlightDate = getReturnFlightDate();

        if (returnFlightDate) {
          const twelfthBirthday = birthDate.add(12, "year");

          if (returnFlightDate.isBefore(twelfthBirthday, "day")) {
            toast.error(
              "Passenger will be under 12 years old on the return flight. Please book as Child."
            );
            return;
          }
        }

        list[index][cleanedName] = birthDate.format("YYYY-MM-DD");
    } else if (
      cleanedName !== "issuedate" &&
      cleanedName !== "expirydate" &&
      cleanedName !== "date"
    ) {
      // For other fields, just save the raw value
      list[index][cleanedName] = value;
    } else {
      console.log("Invalid date");
    }

    setFormData(list); // Update form data with the new value
  };

  const handleInputChange1 = (index, e) => {
    const { name, value } = e.target;
    const cleanedName = name.replace(/\d+/g, "");
    const list = [...childData];
    if (!list[index]) list[index] = {};

    // Arrival date
    const flightSegments =
      flight?.PricedItineraries?.[0]?.OriginDestinationOptions?.[0]
        ?.FlightSegments || [];
    const finalArrivalDateTime =
      flightSegments[flightSegments.length - 1]?.ArrivalDateTime;
    let arrivalDate = dayjs(finalArrivalDateTime);
    if (!arrivalDate.isValid()) arrivalDate = dayjs();

    // Character limit
    const paxNameCharacterLimit =
      Number(flight?.PricedItineraries?.[0]?.PaxNameCharacterLimit) || 60;
    const maxPerField = Math.floor(paxNameCharacterLimit / 2);
    if (
      (cleanedName === "firstName" || cleanedName === "lastName") &&
      value.length > maxPerField
    ) {
      toast.error(
        `Maximum ${maxPerField} characters allowed for ${cleanedName}.`,
      );
      return;
    }

    if (cleanedName === "nationality") {
      const selectedIndex = e.target.selectedIndex;
      const selectedOption = e.target.options[selectedIndex];
      list[index]["nationality"] = selectedOption.text;
      list[index]["nationalityCode"] = selectedOption.value;
      setChildData(list);
      return;
    }

    if (
      cleanedName === "issuedate" &&
      dayjs(value, "YYYY-MM-DD", true).isValid()
    ) {
      const issueDate = dayjs(value, "YYYY-MM-DD", true);
      const sixMonthsBeforeArrival = arrivalDate
        .subtract(6, "months")
        .startOf("day");

      if (
        issueDate.isAfter(sixMonthsBeforeArrival, "day") ||
        issueDate.isAfter(arrivalDate, "day")
      ) {
        toast.error(
          "Passport issue date must be at least 6 months before flight arrival date.",
        );
        return;
      }
      list[index][cleanedName] = issueDate.format("YYYY-MM-DD");
    } else if (
      cleanedName === "expirydate" &&
      dayjs(value, "YYYY-MM-DD", true).isValid()
    ) {
      const expiryDate = dayjs(value, "YYYY-MM-DD", true);
      const sixMonthsAfterArrival = arrivalDate.add(6, "months").startOf("day");

      if (expiryDate.isBefore(sixMonthsAfterArrival, "day")) {
        toast.error(
          "Passport expiry date must be at least 6 months after flight arrival date.",
        );
        return;
      }
      list[index][cleanedName] = expiryDate.format("YYYY-MM-DD");
    } else if (cleanedName === "date" && dayjs(value).isValid()) {
              const dob = dayjs(value, "YYYY-MM-DD", true);

          if (!dob.isValid()) {
            toast.error("Invalid date of birth format.");
            return;
          }

          // Existing validation
          const arrivalDate = dayjs(
            flight?.PricedItineraries?.[0]?.OriginDestinationOptions?.[0]
              ?.FlightSegments[
              flight?.PricedItineraries?.[0]?.OriginDestinationOptions?.[0]
                ?.FlightSegments?.length - 1
            ]?.ArrivalDateTime
          );

          const months = arrivalDate.diff(dob, "month", true);

          if (months < 24 || months > 144) {
            toast.error("Child must be between 2 and 12 years old at arrival.");
            return;
          }

          // NEW RETURN FLIGHT VALIDATION
          const returnFlightDate = getReturnFlightDate();

          if (returnFlightDate) {

            const secondBirthday = dob.add(2, "year");
            const twelfthBirthday = dob.add(12, "year");

            if (returnFlightDate.isBefore(secondBirthday, "day")) {
              toast.error(
                "Child will be under 2 years old on the return flight. Please book as Infant."
              );
              return;
            }

            if (
              returnFlightDate.isSame(twelfthBirthday, "day") ||
              returnFlightDate.isAfter(twelfthBirthday, "day")
            ) {
              toast.error(
                "Child will be 12 years or older on the return flight. Please book as Adult."
              );
              return;
            }
          }

          list[index][cleanedName] = dob.format("YYYY-MM-DD");
    } else if (
      cleanedName !== "issuedate" &&
      cleanedName !== "expirydate" &&
      cleanedName !== "date"
    ) {
      list[index][cleanedName] = value;
    }

    setChildData(list);
  };

  const getSixMonthsAfterArrival = () => {
    // Check if flight.PricedItinerary.OriginDestinationOptions exists and has data
    if (
      flight &&
      flight.PricedItinerary &&
      flight.PricedItinerary.OriginDestinationOptions &&
      flight.PricedItinerary.OriginDestinationOptions.length > 0
    ) {
      const flightArrTime = new Date(
        flight.PricedItinerary.OriginDestinationOptions[
          flight.PricedItinerary.OriginDestinationOptions.length - 1
        ].FlightSegments[
          flight.PricedItinerary.OriginDestinationOptions[
            flight.PricedItinerary.OriginDestinationOptions.length - 1
          ].FlightSegments.length - 1
        ].ArrivalDateTime,
      );

      const sixMonthsAfterArrTime = new Date(
        flightArrTime.setMonth(flightArrTime.getMonth() + 6),
      );

      return sixMonthsAfterArrTime;
    } else {
      const flightArrTime = new Date(
        flight.tripInfos[0].sI[flight.tripInfos[0].sI.length - 1].at,
      );

      const sixMonthsAfterArrTime = new Date(
        flightArrTime.setMonth(flightArrTime.getMonth() + 6),
      );

      return sixMonthsAfterArrTime;
    }
  };

  const isValidExpiryDate = (date) => {
    const expiryDate = new Date(date);
    const sixMonthsAfterArrival = getSixMonthsAfterArrival();
    return {
      isValid: expiryDate >= sixMonthsAfterArrival,
      validDate: sixMonthsAfterArrival.toISOString().split("T")[0], // Return in yyyy-mm-dd format
    };
  };

  const handleExpiryDateChange = (index, e) => {
    const { value } = e.target;
    const { isValid, validDate } = isValidExpiryDate(value);

    if (!isValid) {
      toast.error(
        "The expiry date must be at least 6 months after the flight date.",
      );
      // Set the date to 6 months after the flight's arrival date
      handleInputChange(index, {
        target: { name: e.target.name, value: validDate },
      });
      console.log("formdataaaa", formData);
    } else {
      handleInputChange(index, e);
    }
  };

  const handleExpiryDateChange1 = (index, e) => {
    const { value } = e.target;
    const { isValid, validDate } = isValidExpiryDate(value);

    if (!isValid) {
      toast.error(
        "The expiry date must be at least 6 months after Flight date",
      );
      handleInputChange1(index, {
        target: { name: e.target.name, value: validDate },
      });
    } else {
      handleInputChange1(e);
    }
  };

  const handleExpiryDateChange2 = (index, e) => {
    const { value } = e.target;
    const list = [...infant];

    // Ensure expiry date is at least 6 months from today
    if (dayjs(value).isBefore(dayjs().add(6, "months"))) {
      toast.error(
        "The expiry date must be at least 6 months after the current date.",
      );
      return;
    }

    // Update the expiry date
    list[index].expirydate = value;
    setInfant(list);
  };

  const isValidDateOfBirth = (date) => {
    const currentDate = new Date();
    const dob = new Date(date);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age >= 12;
  };

  const isValidDateOfBirth1 = (date) => {
    const currentDate = new Date();
    const dob = new Date(date);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age >= 2 && age < 12;
  };

  const isValidDateOfBirth2 = (date) => {
    const currentDate = new Date();
    const dob = new Date(date);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age < 2;
  };

  const handleDOBChange = (index, e) => {
    const { name, value } = e.target;

    // Check if the field is for the date of birth
    if (name.includes("date")) {
      // Validate the date of birth (age > 12 years)
      if (!isValidDateOfBirth(value)) {
        toast.error("The age must be greater than 12 years.");
        return; // Prevent the update if invalid
      }
    }

    // Call handleInputChange to update form data
    handleInputChange(index, e);
  };
  const handleDOBChange1 = (index, e) => {
    const { name, value } = e.target;

    // Check if the field is for the date of birth
    if (name.includes("date")) {
      // Validate the date of birth (age > 12 years)
      if (!isValidDateOfBirth11(value)) {
        toast.error("The child must be at least 12 years old.");
        return; // Prevent the update if invalid
      }
    }

    // Call handleInputChange to update form data
    handleInputChange1(index, e);
  };

  // Helper function to validate the child's age
  const isValidDateOfBirth11 = (dob) => {
    const birthDate = dayjs(dob);
    const age = dayjs().diff(birthDate, "years");
    return age >= 2 && age < 12;
  };

  const handleDOBChange2 = (index, e) => {
    const { name, value } = e.target;

    // Check if the field is for the date of birth
    if (name.includes("date")) {
      // Validate the date of birth (age <= 2 years)
      if (dayjs(value).isBefore(dayjs().subtract(2, "years"))) {
        toast.error(
          "The infant's date of birth must be within the last 2 years.",
        );
        return; // Prevent the update if invalid
      }
    }

    // Call handleInputChange to update form data
    handleInputChange2(index, e);
  };

  const handleInputChange2 = (index, e) => {
    const { name, value, options, selectedIndex } = e.target;
    const cleanedName = name.replace(/\d+/g, ""); // Remove numeric parts from the name

    const list = [...infant];
    if (!list[index]) {
      list[index] = {};
    }

    // ✅ Character limit check (for firstName / lastName)
    const paxNameCharacterLimit =
      flight?.PricedItineraries?.[0]?.PaxNameCharacterLimit || 60;
    const maxPerField = Math.floor(paxNameCharacterLimit);

    if (
      (cleanedName === "firstName" || cleanedName === "lastName") &&
      value.length > maxPerField
    ) {
      toast.error(
        `Maximum ${maxPerField} characters allowed for ${cleanedName}.`,
      );
      return; // Stop here — don’t update state if limit exceeded
    }

    if (cleanedName === "nationality") {
      const selectedIndex = e.target.selectedIndex;
      const selectedOption = e.target.options[selectedIndex];

      const selectedCountryCode = selectedOption.value;
      const selectedCountryName = selectedOption.text;

      list[index]["nationality"] = selectedCountryName;
      list[index]["nationalityCode"] = selectedCountryCode;
      setInfant(list);
      return;
    }

    // Handle passport issue date validation
    if (cleanedName === "issuedate" && dayjs(value).isValid()) {
      const issueDate = dayjs(value);
      const sixMonthsAgo = dayjs().subtract(6, "months").startOf("day"); // 6 months ago from today
      const today = dayjs().endOf("day"); // Today

      // Check if the issue date is before 6 months ago, and not in the last 6 months
      if (
        issueDate.isAfter(sixMonthsAgo, "day") ||
        issueDate.isAfter(today, "day")
      ) {
        toast.error(
          "Passport issue date must be before 6 months ago from Flight.",
        );
        return; // Prevent setting invalid issue date
      }

      list[index][cleanedName] = issueDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "expirydate" && dayjs(value).isValid()) {
      // Passport Expiry Date validation: Must be at least 6 months after current date
      const expiryDate = dayjs(value);

        const returnFlightDate = getReturnFlightDate();
        const minExpiryDate = returnFlightDate.add(6, "months").startOf("day");

        if (expiryDate.isBefore(minExpiryDate, "day")) {
          toast.error(
            `Passport expiry date must be at least 6 months after return flight date (${returnFlightDate.format("DD MMM YYYY")}).`
          );
          return;
        }

      list[index][cleanedName] = expiryDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "date" && dayjs(value).isValid()) {
              const dob = dayjs(value, "YYYY-MM-DD", true);

          if (!dob.isValid()) {
            toast.error("Invalid date of birth format.");
            return;
          }

          // Existing validation against onward flight
          const arrivalDate = dayjs(
            flight?.PricedItineraries?.[0]?.OriginDestinationOptions?.[0]
              ?.FlightSegments[
              flight?.PricedItineraries?.[0]?.OriginDestinationOptions?.[0]
                ?.FlightSegments?.length - 1
            ]?.ArrivalDateTime
          );

          const months = arrivalDate.diff(dob, "month", true);

          if (months >= 24) {
            toast.error("Infant must be under 2 years.");
            return;
          }

          // NEW RETURN FLIGHT VALIDATION
          const returnFlightDate = getReturnFlightDate();

          if (returnFlightDate) {
            const secondBirthday = dob.add(2, "year");

            if (
              returnFlightDate.isSame(secondBirthday, "day") ||
              returnFlightDate.isAfter(secondBirthday, "day")
            ) {
              toast.error(
                "Infant will be 2 years or older on the return flight. Please book as Child."
              );
              return;
            }
          }

          list[index][cleanedName] = dob.format("YYYY-MM-DD");
    } else if (
      cleanedName !== "issuedate" &&
      cleanedName !== "expirydate" &&
      cleanedName !== "date"
    ) {
      // For other fields, just save the raw value
      list[index][cleanedName] = value;
    } else {
      console.log("Invalid date");
    }

    setInfant(list); // Update form data with the new value
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}T00:00:00`;
  };

  const handleChangeCurrency = (amount) => {
    if (!isNaN(amount) && exchangeRate) {
      // const convertedValue = amount * exchangeRate;
      // return convertedValue.toFixed(2);
      return amount;
    }
  };
  const handleChangeCurrency2 = (amount) => {
    if (!isNaN(amount) && exchangeRate2) {
      // const convertedValue = amount * exchangeRate2;
      // return convertedValue.toFixed(2);
      return amount;
    }
  };

  const handleTicketBookTJ = () => {};
  const handleTicketBookParto = () => {};
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const savePendingBooking = async (totalAmount) => {
    try {
      const leadPassenger = formData?.[0];
      const originSeg = flight?.Segments?.[0]?.[0];
      const destSeg = flight?.Segments?.[0]?.[flight.Segments[0].length - 1];

      await axios.post("https://admin.trustedfare.com/api/flight-book-enquiry", {
        name: leadPassenger
          ? `${leadPassenger.title || ""} ${leadPassenger.firstName || ""} ${leadPassenger.lastName || ""}`.trim()
          : "",
        email: bookingDetails?.email || email || "",
        phone: bookingDetails?.mobile || mobile || "",
        destination:
          originSeg && destSeg
            ? `${originSeg.Origin?.Airport?.CityName || ""} (${originSeg.Origin?.Airport?.AirportCode || ""}) -> ${destSeg.Destination?.Airport?.CityName || ""} (${destSeg.Destination?.Airport?.AirportCode || ""})`
            : "",
        date: originSeg?.Origin?.DepTime ? originSeg.Origin.DepTime.split("T")[0] : "",
        trip_type: flight2 ? "RoundTrip" : "OneWay",
        fare: totalAmount,
        adults: formData?.length || 0,
        children: childData?.length || 0,
        infants: infant?.length || 0,
        fare_source_code: decodedIndex,
        status: "pending",
        message: "Pending - payment not yet completed",
      });
    } catch (error) {
      console.error("Error saving pending booking:", error);
    }
  };

  const handlePayment = async () => {
    setLoading(true); // Start loading

    const res = await loadRazorpayScript();
    if (!res) {
      Swal.fire({
        icon: "error",
        title: "Razorpay SDK Failed",
        text: "Please refresh and try again.",
      });
      setLoading(false);
      return;
    }

    try {
      setOpenPayBtn(false);

      const totalAmount = Math.round(
        flight2
          ? flight.PricedItineraries[0].AirItineraryPricingInfo.ItinTotalFare
              .TotalFare.Amount +
              flight2.PricedItineraries[0].AirItineraryPricingInfo
                .ItinTotalFare.TotalFare.Amount +
              totalSeatPrice +
              totalMealPrice +
              totalBaggagePrice
          : flight.PricedItineraries[0].AirItineraryPricingInfo.ItinTotalFare
              .TotalFare.Amount +
              totalSeatPrice +
              totalMealPrice +
              totalBaggagePrice,
      );

      // Save a pending record BEFORE opening the payment gateway.
      // The real ticket (PNR) is only issued after payment succeeds, in handleTicketBook.
      await savePendingBooking(totalAmount);

      // STEP 1: Create Razorpay order
      const { data: orderData } = await axios.post(
        "https://admin.trustedfare.com/api/create-order",
        {
          amount: totalAmount,
        },
      );

      if (orderData.success === false) {
        Swal.fire({
          icon: "error",
          title: "Order Creation Failed",
          text: "Could not initiate payment. Please try again.",
        });
        setLoading(false);
        return;
      }

      // STEP 2: Razorpay options
      const options = {
        key: orderData.data.key,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: "TripGo",
        description: "TripGo",
        image: "/Images/tripgoo.png",
        order_id: orderData.data.order_id,
        handler: async function (response) {
          try {
            // STEP 3: Verify payment
            const { data: verifyData } = await axios.post(
              "https://admin.trustedfare.com/api/verify-payment",
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                type: "web",
              },
            );

            if (verifyData.success) {
              toast.success("✅ Payment Successful!");
              console.log(
                "Full selectedOutboundSeats object:",
                selectedOutboundSeats,
              );

              if (flight2) {
                await handleTicketBookRound();
              } else {
                await handleTicketBook();
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Payment Verification Failed",
                text: "Please contact support.",
              });
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            Swal.fire({
              icon: "error",
              title: "Verification Error",
              text: "An error occurred while verifying your payment.",
            });
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "TripGo",
          email: "support@tripgoonline.com",
          contact: "+91 92112 52356",
        },
        theme: { color: "#053355" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation error:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong while creating the order.",
      });
      setLoading(false);
    }
  };
  console.log("FORMDATA", formData);
  const [duringBooking, setDuringBooking] = useState(false);
  function isValidDateFn(date) {
    if (!date || typeof date !== "string") return false;
    if (date.includes("NaN") || date === "NaN-NaN-NaNT00:00:00") return false;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  const handleTicketBook = async () => {
    setLoading(true);
    setDuringBooking(true);
    let isFirstAdult = true;

    const adultPassengers = formData.map((data, index) => {
      const isLeadPax = isFirstAdult;
      isFirstAdult = false;

      const seat =
        Array.isArray(selectedOutboundSeats?.adult) &&
        typeof selectedOutboundSeats.adult[index] === "object"
          ? selectedOutboundSeats.adult[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.adult) &&
        typeof selectedOutboundMeals.adult[index] === "object"
          ? selectedOutboundMeals.adult[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.adult) &&
        typeof selectedOutboundBaggage.adult[index] === "object"
          ? [selectedOutboundBaggage.adult[index]]
          : null;

      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 1,
        DateOfBirth: data.date ? formatDate(data.date) : "",
        Gender:
          data.title.toLowerCase() === "mr" ||
          data.title.toLowerCase() === "mstr"
            ? 1
            : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: flight.FareBreakdown[0],
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        CountryName: data.nationality || "India",
        CountryCode: data.nationalityCode || "IN",
        ContactNo: "9211252356",
        Email: "support@tripgoonline.com",
        IsLeadPax: isLeadPax,
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const childPassengers = childData.map((data, index) => {
      const seat =
        Array.isArray(selectedOutboundSeats?.child) &&
        typeof selectedOutboundSeats.child[index] === "object"
          ? selectedOutboundSeats.child[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.child) &&
        typeof selectedOutboundMeals.child[index] === "object"
          ? selectedOutboundMeals.child[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.child) &&
        typeof selectedOutboundBaggage.child[index] === "object"
          ? [selectedOutboundBaggage.child[index]]
          : null;

      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 2,
        DateOfBirth: data.date ? formatDate(data.date) : "",
        Gender:
          data.title.toLowerCase() === "mr" ||
          data.title.toLowerCase() === "mstr"
            ? 1
            : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: flight.FareBreakdown[1],
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        CountryName: data.nationality || "India",
        CountryCode: data.nationalityCode || "IN",
        ContactNo: "9211252356",
        Email: "support@tripgoonline.com",
        IsLeadPax: false,
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const infantPassengers = infant.map((data, index) => ({
      Title: data.title,
      FirstName: data.firstName,
      LastName: data.lastName,
      PaxType: 3,
      DateOfBirth: data.date ? formatDate(data.date) : "",
      Gender:
        data.title.toLowerCase() === "mr" || data.title.toLowerCase() === "mstr"
          ? 1
          : 2,
      PassportNo: data.passport,
      PassportExpiry: data.expirydate,
      PassportIssueDate: data.issuedate,
      AddressLine1:
        "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
      Fare: flight.FareBreakdown[2],
      Baggage: [],

      MealDynamic: [],
      SeatDynamic: [],
      CountryName: data.nationality || "India",
      CountryCode: data.nationalityCode || "IN",
      ContactNo: "9211252356",
      Email: "support@tripgoonline.com",
      IsLeadPax: false,
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyEmail: "",
    }));

    // Combine all passengers and apply preferences
    try {
      const allPassengers = [];
      let preferenceIndex = 0;

      [...adultPassengers, ...childPassengers, ...infantPassengers].forEach(
        (passenger, idx) => {
          const mealPreference = passengerMealPreferences[preferenceIndex];
          const baggagePreference =
            passengerBaggagePreferences[preferenceIndex];
          const seatPreference = passengerSeatPreferences[preferenceIndex];

          console.log(`Passenger ${idx}:`);
          console.log("  Name:", passenger.FirstName, passenger.LastName);
          console.log("  Seat Preference:", seatPreference);
          console.log("  SeatDynamic before:", passenger.SeatDynamic);

          allPassengers.push({
            ...passenger,
            MealDynamic: mealPreference
              ? [mealPreference]
              : (passenger.MealDynamic ?? []),
            Baggage: baggagePreference
              ? [baggagePreference]
              : (passenger.Baggage ?? []),
            SeatDynamic: seatPreference
              ? [seatPreference]
              : (passenger.SeatDynamic ?? []),
          });

          console.log("  SeatDynamic after:", allPassengers[idx].SeatDynamic);
          preferenceIndex++;
        },
      );

      const requestData = {
        PreferredCurrency: null,
        ResultIndex: decodedIndex,
        Passengers: allPassengers,
        EndUserIp: "192.168.11.58",
        UserEmail: email,
        UserPhone: mobile,
        Type: "Web",
        IsLCC: flight.IsLCC,
        TokenId: token,
        TraceId: traceId,
        GSTCompanyAddress:
          "A2, Palam-Dabri Road, Mahavir Enclave, Dwarka, New Delhi, India",
        GSTCompanyContactNumber: "9015858565",
        GSTCompanyName: "eWeblink Technology LLP",
        GSTNumber: "07AAFFE6846H1Z9",
        GSTCompanyEmail: "info@eweblink.net",
      };

      console.log("Final requestData to API:", requestData);

      let bookingResponse;
      // if (flight.IsLCC === false) {
      //   const res = await fetch(
      //     "https://admin.trustedfare.com/api/flight-book",
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(requestData),
      //     }
      //   );

      //   if (!res.ok) throw new Error("Booking failed");

      //   bookingResponse = await res.json();
      //   console.log("bookingResponse", bookingResponse);
      //   if (!bookingResponse.success) throw new Error("Booking not successful");

      //   const { PNR, BookingId } = bookingResponse.data.Response;

      //   const ticketRes = await fetch(
      //     "https://admin.trustedfare.com/api/flight-ticket",
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(requestData),
      //     }
      //   );

      //   const ticketData = await ticketRes.json();
      //   console.log("Non-LCC ticket data:", ticketData);
      //   sessionStorage.setItem(
      //     "BookingId",
      //     JSON.stringify(ticketData?.data?.Response?.BookingId)
      //   );
      //   sessionStorage.setItem(
      //     "PNR",
      //     JSON.stringify(ticketData?.data?.Response?.PNR)
      //   );
      //   sessionStorage.setItem(
      //     "FirstName",
      //     ticketData?.data?.Response?.FlightItinerary?.Passenger?.[0]?.FirstName
      //   );
      //   sessionStorage.setItem(
      //     "LastName",
      //     ticketData?.data?.Response?.FlightItinerary?.Passenger?.[0]?.LastName
      //   );
      // } else

      // {
      const res = await fetch(
        "https://admin.trustedfare.com/api/flight-ticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        },
      );

      if (!res.ok) throw new Error("Ticket booking failed");

      bookingResponse = await res.json();
      if (!bookingResponse.success)
        throw new Error("Ticket booking unsuccessful");
      // }

      const data2 = bookingResponse;

      sessionStorage.setItem(
        "BookingId",
        JSON.stringify(data2?.data?.Response?.BookingId),
      );
      sessionStorage.setItem("PNR", JSON.stringify(data2?.data?.Response?.PNR));
      sessionStorage.setItem(
        "FirstName",
        data2?.data?.Response?.FlightItinerary?.Passenger?.[0]?.FirstName,
      );
      sessionStorage.setItem(
        "LastName",
        data2?.data?.Response?.FlightItinerary?.Passenger?.[0]?.LastName,
      );
      sessionStorage.removeItem("PNR2");
      sessionStorage.removeItem("BookingId2");

      navigate(`/flight-ticket/${encodeURIComponent(srdvIdx)}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        html: `
        <ol style="text-align: left; padding-left: 1.2rem; list-style: disc; font-size: 14px;">
          <li>We're sorry, your booking could not be completed.</li>
          <li>If any amount was deducted, it will be refunded within <strong>5–7 business days</strong>.</li>
          <li>Contact support at <strong><a href="tel:+91 92112 52356">+91 92112 52356</a></strong></li>
        </ol>
      `,
      });
      navigate("/");
    } finally {
      setLoading(false);
      setDuringBooking(false);
    }
  };

  const handleTicketBookRound = () => {
    setLoading(true);
    setDuringBooking(true);
    let isFirstAdult = true;

    const adultPassengers = formData.map((data, index) => {
      const isLeadPax = isFirstAdult;
      isFirstAdult = false;
      const seat =
        Array.isArray(selectedOutboundSeats?.adult) &&
        typeof selectedOutboundSeats.adult[index] === "object"
          ? selectedOutboundSeats.adult[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.adult) &&
        typeof selectedOutboundMeals.adult[index] === "object"
          ? selectedOutboundMeals.adult[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.adult) &&
        typeof selectedOutboundBaggage.adult[index] === "object"
          ? [selectedOutboundBaggage.adult[index]]
          : null;

      const seatIB =
        Array.isArray(selectedInboundSeats?.adult) &&
        typeof selectedInboundSeats.adult[index] === "object"
          ? selectedInboundSeats.adult[index]
          : null;
      const mealIB =
        Array.isArray(selectedInboundMeals?.adult) &&
        typeof selectedInboundMeals.adult[index] === "object"
          ? selectedInboundMeals.adult[index]
          : null;
      const baggageIB =
        Array.isArray(selectedInboundBaggage?.adult) &&
        typeof selectedInboundBaggage.adult[index] === "object"
          ? [selectedInboundBaggage.adult[index]]
          : null;
      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 1,
        DateOfBirth: data.date ? formatDate(data.date) : "",

        Gender:
          data.title.toLowerCase() === "mr" ||
          data.title.toLowerCase() === "mstr"
            ? 1
            : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: {
          Currency: flight2.FareBreakdown[0].Currency,
          BaseFare: flight2.FareBreakdown[0].BaseFare,
          Tax: flight2.FareBreakdown[0].Tax,
          TaxBreakup: flight2.FareBreakdown[0].TaxBreakup,
          YQTax: flight2.FareBreakdown[0].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[0].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[0].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        FareIB: {
          Currency: flight2.FareBreakdown[0].Currency,
          BaseFare: flight2.FareBreakdown[0].BaseFare,
          Tax: flight2.FareBreakdown[0].Tax,
          TaxBreakup: flight2.FareBreakdown[0].TaxBreakup,
          YQTax: flight2.FareBreakdown[0].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[0].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[0].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        BaggageIB: baggageIB ? baggageIB : [],
        MealDynamicIB: mealIB ? mealIB : [],
        SeatDynamicIB: seatIB ? seatIB : [],

        ContactNo: "9211252356",
        CountryName: data.nationality || "India",
        CountryCode: data.nationalityCode || "IN",
        Email: "support@tripgoonline.com",
        IsLeadPax: isLeadPax,
        // FFAirlineCode: flight2.Fare.Segments[0][0].Airline.FFAirlineCode,
        // FFNumber: "123",
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const childPassengers = childData.map((data, index) => {
      const seat =
        Array.isArray(selectedOutboundSeats?.child) &&
        typeof selectedOutboundSeats.child[index] === "object"
          ? selectedOutboundSeats.child[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.child) &&
        typeof selectedOutboundMeals.child[index] === "object"
          ? selectedOutboundMeals.child[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.child) &&
        typeof selectedOutboundBaggage.child[index] === "object"
          ? [selectedOutboundBaggage.child[index]]
          : null;

      const seatIB =
        Array.isArray(selectedInboundSeats?.child) &&
        typeof selectedInboundSeats.child[index] === "object"
          ? selectedInboundSeats.child[index]
          : null;
      const mealIB =
        Array.isArray(selectedInboundMeals?.child) &&
        typeof selectedInboundMeals.child[index] === "object"
          ? selectedInboundMeals.child[index]
          : null;
      const baggageIB =
        Array.isArray(selectedInboundBaggage?.child) &&
        typeof selectedInboundBaggage.child[index] === "object"
          ? [selectedInboundBaggage.child[index]]
          : null;
      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 2,
        DateOfBirth: data.date ? formatDate(data.date) : "",
        Gender:
          data.title.toLowerCase() === "mr" ||
          data.title.toLowerCase() === "mstr"
            ? 1
            : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: {
          Currency: flight2.FareBreakdown[1].Currency,
          BaseFare: flight2.FareBreakdown[1].BaseFare,
          Tax: flight2.FareBreakdown[1].Tax,
          TaxBreakup: flight2.FareBreakdown[1].TaxBreakup,
          YQTax: flight2.FareBreakdown[1].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[1].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[1].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        FareIB: {
          Currency: flight2.FareBreakdown[1].Currency,
          BaseFare: flight2.FareBreakdown[1].BaseFare,
          Tax: flight2.FareBreakdown[1].Tax,
          TaxBreakup: flight2.FareBreakdown[1].TaxBreakup,
          YQTax: flight2.FareBreakdown[1].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[1].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[1].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        BaggageIB: baggageIB ? baggageIB : [],
        MealDynamicIB: mealIB ? mealIB : [],
        SeatDynamicIB: seatIB ? seatIB : [],

        CountryName: data.nationality || "India",
        CountryCode: data.nationalityCode || "IN",

        ContactNo: "9211252356",
        Email: "support@tripgoonline.com",
        IsLeadPax: false,
        // FFAirlineCode: flight2.Fare.Segments[0][0].Airline.FFAirlineCode,
        // FFNumber: "123",
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const infantPassengers = infant.map((data) => ({
      Title: data.title,
      FirstName: data.firstName,
      LastName: data.lastName,
      PaxType: 3,

      DateOfBirth: data.date ? formatDate(data.date) : "",
      Gender:
        data.title.toLowerCase() === "mr" || data.title.toLowerCase() === "mstr"
          ? 1
          : 2,
      PassportNo: data.passport,
      PassportExpiry: data.expirydate,
      PassportIssueDate: data.issuedate,
      AddressLine1:
        "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
      Fare: {
        Currency: flight2.FareBreakdown[2].Currency,
        BaseFare: flight2.FareBreakdown[2].BaseFare,
        Tax: flight2.FareBreakdown[2].Tax,
        TaxBreakup: flight2.FareBreakdown[2].TaxBreakup,
        YQTax: flight2.FareBreakdown[2].YQTax,
        AdditionalTxnFeeOfrd: flight2.FareBreakdown[2].AdditionalTxnFeeOfrd,
        AdditionalTxnFeePub: flight2.FareBreakdown[2].AdditionalTxnFeePub,
        PublishedFare: flight2.Fare.PublishedFare,
        OfferedFare: flight2.Fare.OfferedFare,
        Discount: flight2.Fare.Discount,
      },
      FareIB: {
        Currency: flight2.FareBreakdown[2].Currency,
        BaseFare: flight2.FareBreakdown[2].BaseFare,
        Tax: flight2.FareBreakdown[2].Tax,
        TaxBreakup: flight2.FareBreakdown[2].TaxBreakup,
        YQTax: flight2.FareBreakdown[2].YQTax,
        AdditionalTxnFeeOfrd: flight2.FareBreakdown[2].AdditionalTxnFeeOfrd,
        AdditionalTxnFeePub: flight2.FareBreakdown[2].AdditionalTxnFeePub,
        PublishedFare: flight2.Fare.PublishedFare,
        OfferedFare: flight2.Fare.OfferedFare,
        Discount: flight2.Fare.Discount,
      },
      Baggage: [],
      MealDynamic: [],
      SeatDynamic: [],
      BaggageIB: [],
      MealDynamicIB: [],
      SeatDynamicIB: [],

      CountryName: data.nationality || "India",
      CountryCode: data.nationalityCode || "IN",
      ContactNo: "9211252356",
      Email: "support@tripgoonline.com",
      IsLeadPax: false,
      // FFAirlineCode: flight2.Fare.Segments[0][0].Airline.FFAirlineCode,
      // FFNumber: "123",
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyEmail: "",
    }));

    const allPassengers = [];
    let preferenceIndex = 0;

    [...adultPassengers, ...childPassengers, ...infantPassengers].forEach(
      (passenger, idx) => {
        const mealPreference = passengerMealPreferences[preferenceIndex];
        const baggagePreference = passengerBaggagePreferences[preferenceIndex];
        const seatPreference = passengerSeatPreferences[preferenceIndex];

        allPassengers.push({
          ...passenger,
          MealDynamic: mealPreference
            ? [mealPreference]
            : (passenger.MealDynamic ?? []),
          Baggage: baggagePreference
            ? [baggagePreference]
            : (passenger.Baggage ?? []),
          SeatDynamic: seatPreference
            ? [seatPreference]
            : (passenger.SeatDynamic ?? []),
          MealDynamicIB: mealPreference
            ? [mealPreference]
            : (passenger.MealDynamicIB ?? []),
          BaggageIB: baggagePreference
            ? [baggagePreference]
            : (passenger.BaggageIB ?? []),
          SeatDynamicIB: seatPreference
            ? [seatPreference]
            : (passenger.SeatDynamicIB ?? []),
        });

        // console.log("  SeatDynamic after:", allPassengers[idx].SeatDynamic);
        preferenceIndex++;
      },
    );

    // const allPassengers = [
    //   ...adultPassengers,
    //   ...childPassengers,
    //   ...infantPassengers,
    // ];

    const requestData = {
      PreferredCurrency: null,
      ResultIndex: decodedIndex,
      ResultIndexIB: decodedIndex2,
      Passengers: allPassengers,
      EndUserIp: "192.168.11.58",
      TokenId: token,
      UserEmail: email,
      UserPhone: mobile,
      Type: "Web",
      IsLCC: flight.IsLCC,
      IsLCCIB: flight2.IsLCC,
      TraceId: traceId,
      GSTCompanyAddress:
        "A2, Palam-Dabri Road, Mahavir Enclave, Dwarka, New Delhi, India",
      GSTCompanyContactNumber: "9015858565",
      GSTCompanyName: "eWeblink Technology LLP",
      GSTNumber: "07AAFFE6846H1Z9",
      GSTCompanyEmail: "info@eweblink.net",
    };
    console.log("requestData2", requestData);

    // Make the API call
    const apiUrl = "https://admin.trustedfare.com/api/flight-ticket";
    // const apiUrl = flight2.IsLCC
    //   ? "https://admin.trustedfare.com/api/flight-ticket"
    //   : "https://admin.trustedfare.com/api/flight-book";

    // flight2 &&
    //   flight2.IsLCC &&
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          navigate("/");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data2) => {
        // Handle the API response data
        console.log("LCC flight2 ticket booked successfully:", data2);
        if (!data2.success) {
          navigate("/");
        }
        sessionStorage.setItem(
          "BookingId",
          JSON.stringify(data2.data.Response.BookingId),
        );
        sessionStorage.setItem(
          "BookingId2",
          JSON.stringify(data2.data.Inbound.Response.BookingId),
        );
        sessionStorage.setItem("PNR", JSON.stringify(data2.data.Response.PNR));
        sessionStorage.setItem(
          "PNR2",
          JSON.stringify(data2.data.Inbound.Response.PNR),
        );
        sessionStorage.setItem(
          "FirstName",
          data2.data.Response.FlightItinerary.Passenger[0].FirstName,
        );
        sessionStorage.setItem(
          "LastName",
          data2.data.Response.FlightItinerary.Passenger[0].LastName,
        );
        // You can perform further actions here based on the API response

        // if (!flight2.IsLCC && data2.success) {
        //   // Extract PNR and BookingId
        //   const { PNR, BookingId } = data2.data.Response;
        //   // Make API call to get flight2 ticket
        //   fetch("https://admin.trustedfare.com/api/flight-ticket", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       EndUserIp: "192.168.10.10",
        //       TokenId: token,
        //       TraceId: requestData.TraceId,
        //       BookingId,
        //       PNR,
        //     }),
        //   })
        //     .then((ticketResponse) => ticketResponse.json())
        //     .then((ticketData) => {
        //       // Handle ticket data
        //       console.log("LCC flight2 ticket data:", ticketData);
        //     })
        //     .catch((error) => {
        //       // Handle errors
        //       console.error(
        //         "Error while fetching NonLCC flight2 ticket:",
        //         error
        //       );
        //       navigate("/404");
        //     });
        // }

        navigate(`/flight-ticket/${encodeURIComponent(srdvIdx)}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          html: `
    <ol style="text-align: left; padding-left: 1.2rem; list-style: disc; font-size: 14px;">
      <li>We're sorry, your booking could not be completed.</li>
      <li>If any amount was deducted, it will be refunded within <strong>5–7 business days</strong>.</li>
      <li>Feel free to try again, or contact our support team at <br/> <strong><a href="tel:+91 92112 52356">+91 92112 52356</a></strong> — we're here to help!</li>
     
    </ol>
  `,
        });
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
        setDuringBooking(false);
      });
  };

  const handleTicketBookMistifly = async (gateway) => {
    setLoading(true);
    setDuringBooking(true);
    setOpenPayBtn(false);

    try {
      // Helper function to map passengers
      const mapPassenger = (data, paxType) => ({
        PassengerType: paxType === 1 ? "ADT" : paxType === 2 ? "CHD" : "INF",
        Gender:
          data.title?.toLowerCase() === "mr" ||
          data.title?.toLowerCase() === "mstr"
            ? "M"
            : "F",
        PassengerName: {
          PassengerTitle: data.title || "",
          PassengerFirstName: data.firstName || "",
          PassengerLastName: data.lastName || "",
        },
        DateOfBirth: data.date,
        Passport: {
          PassportNumber: data.passport || "",
          ExpiryDate: data.expirydate,
          Country: data.nationalityCode || "IN",
        },
        FrequentFlyerNumber: "",
        PassengerNationality: data.nationalityCode || "IN",
        KnowTravelerNo: "",
        RedressNo: "",
        NationalID: "",
      });

      // Merge and map all passenger types
      const AirTravelers = [
        ...formData.map((data) => mapPassenger(data, 1)), // Adults
        ...childData.map((data) => mapPassenger(data, 2)), // Children
        ...infant.map((data) => mapPassenger(data, 3)), // Infants
      ];

      // Final request payload
      const requestData = {
        UserEmail: email || "",
        UserPhone: mobile || "",
        FareType:
          flight?.PricedItineraries[0].AirItineraryPricingInfo.FareType || "",
        FareSourceCode:
          flight?.PricedItineraries[0].AirItineraryPricingInfo.FareSourceCode ||
          "",
        ConversationId: storedConversationId || "",
        PaymentTransactionID: "",
        TravelerInfo: {
          AirTravelers,
          CountryCode: "91",
          AreaCode: "110084",
          PhoneNumber: mobile || "9632587412",
          Email: email || "support@eweblink.net",
          PostCode: "110084",
        },
        PaymentGateway: gateway,
        PaymentReferences: {
          PaymentID: "",
        },
        ClientReferenceNo: "",
      };

      console.log("Booking request payload:", requestData);

      // API call using axios
      const response = await axios.post(
        "https://admin.trustedfare.com/api/Mistify/Book",
        requestData,
        { headers: { "Content-Type": "application/json" } },
      );

      const bookingResponse = response.data;

      if (!bookingResponse.success) {
        throw new Error("Ticket booking unsuccessful");
      }
      console.log("Booking Response:", bookingResponse);
      // console.log("Booking Response2:", bookingResponse.data.Data.UniqueID);
      const bookingData = bookingResponse?.data?.Response;

      // Store booking info
      /*  sessionStorage.setItem(
        "uniqueIdentifier",
        bookingResponse.data.Data.UniqueID
      ); */

      const checkouturl = bookingResponse?.data?.Response?.url;
      console.log("Checkout url", checkouturl);
       window.location.href = checkouturl;
      // Redirect to ticket page
    //  navigate("/flight-do-not-close/241");
      // navigate(`/flight-ticket/${encodeURIComponent(srdvIdx)}`);
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        html: `
          <ol style="text-align: left; padding-left: 1.2rem; list-style: disc; font-size: 14px;">
            <li>We're sorry, your booking could not be completed.</li>
            <li>If any amount was deducted, it will be refunded within <strong>5–7 business days</strong>.</li>
            <li>Contact support at <strong><a href="tel:+7618608">+7618608</a></strong></li>
          </ol>
        `,
      });
      //navigate("/");
    } finally {
      setLoading(false);
      setDuringBooking(false);
    }
  };

  const [error, setError] = useState(null);

  const handleChangeFlight = () => {
    navigate(-1);
  };

  // const validatePassengerData = () => {
  //   const isPassportMandatory = flight.IsPassportRequiredAtBook === true;
  //   const isLCC = flight.IsLCC === false;

  //   // Required fields: if LCC, then dob (date) is mandatory; otherwise, optional
  //   const requiredFields = isLCC
  //     ? ["title", "firstName", "lastName", "date"]
  //     : ["title", "firstName", "lastName"];

  //   const passportFields = ["passport", "issuedate", "expirydate"];

  //   const today = dayjs();
  //   const sixMonthsAgo = today.subtract(6, "month");
  //   const sixMonthsLater = today.add(6, "month");

  //   const getAge = (dob) => today.diff(dayjs(dob), "year");

  //   // Validate booking details: mobile and email

  //   const isValid = (data, index, type) => {
  //     // Validate required fields
  //     for (const field of requiredFields) {
  //       if (!data[field] || data[field].trim() === "") {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Missing Field",
  //           text: `Please fill out the ${field} for ${type} ${index + 1}.`,
  //         });
  //         return false;
  //       }
  //     }

  //     // DOB & age validation only if LCC or DOB exists
  //     if (isLCC || data.date) {
  //       const age = getAge(data.date);
  //       if (type === "adult" && age < 18) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Age",
  //           text: `Adult ${index + 1} must be at least 18 years old.`,
  //         });
  //         return false;
  //       } else if (type === "child" && (age < 2 || age > 12)) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Age",
  //           text: `Child ${index + 1} must be between 2 and 12 years old.`,
  //         });
  //         return false;
  //       } else if (type === "infant" && age >= 2) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Age",
  //           text: `Infant ${index + 1} must be under 2 years old.`,
  //         });
  //         return false;
  //       }
  //     }

  //     // Passport validation
  //     if (isPassportMandatory) {
  //       for (const field of passportFields) {
  //         if (!data[field] || data[field].trim() === "") {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Missing Passport Info",
  //             text: `Please fill out the ${field} for ${type} ${index + 1}.`,
  //           });
  //           return false;
  //         }
  //       }

  //       const issueDate = dayjs(data.issuedate);
  //       if (
  //         data.issuedate &&
  //         issueDate.isAfter(dayjs().subtract(6, "months"))
  //       ) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Passport Issue Date",
  //           text: `Passport issue date for ${type} ${
  //             index + 1
  //           } must be at least 6 months old.`,
  //         });
  //         return false;
  //       }

  //       const expiryDate = dayjs(data.expirydate);
  //       if (!expiryDate.isValid() || expiryDate.isBefore(sixMonthsLater)) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Passport Expiry Date",
  //           text: `Passport expiry date for ${type} ${
  //             index + 1
  //           } must be at least 6 months in the future.`,
  //         });
  //         return false;
  //       }
  //     }

  //     return true;
  //   };

  //   const adultCount =
  //     flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
  //       ?.PTC_FareBreakdowns?.[0]?.PassengerTypeQuantity?.Quantity || 1;
  //   const childCount =
  //     flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
  //       ?.PTC_FareBreakdowns?.[1]?.PassengerTypeQuantity?.Quantity || 0;
  //   const infantCount =
  //     flight?.PricedItineraries?.[0]?.AirItineraryPricingInfo
  //       ?.PTC_FareBreakdowns?.[2]?.PassengerTypeQuantity?.Quantity || 0;

  //   if (formData.length !== adultCount) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Incomplete Adult Data",
  //       text: `Please fill out details for all ${adultCount} adults.`,
  //     });
  //     return false;
  //   }
  //   for (let i = 0; i < formData.length; i++) {
  //     if (!isValid(formData[i], i, "adult")) return false;
  //   }

  //   if (childData.length !== childCount) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Incomplete Child Data",
  //       text: `Please fill out details for all ${childCount} children.`,
  //     });
  //     return false;
  //   }
  //   for (let i = 0; i < childData.length; i++) {
  //     if (!isValid(childData[i], i, "child")) return false;
  //   }

  //   if (infant.length !== infantCount) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Incomplete Infant Data",
  //       text: `Please fill out details for all ${infantCount} infants.`,
  //     });
  //     return false;
  //   }
  //   for (let i = 0; i < infant.length; i++) {
  //     if (!isValid(infant[i], i, "infant")) return false;
  //   }
  //   if (!bookingDetails.mobile || bookingDetails.mobile.trim() === "") {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Missing Mobile Number",
  //       text: "Please enter your mobile number.",
  //     });
  //     return false;
  //   } else if (!/^\d{10}$/.test(bookingDetails.mobile)) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Invalid Mobile Number",
  //       text: "Mobile number must be 10 digits.",
  //     });
  //     return false;
  //   }

  //   if (!bookingDetails.email || bookingDetails.email.trim() === "") {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Missing Email",
  //       text: "Please enter your email address.",
  //     });
  //     return false;
  //   } else if (
  //     !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
  //       bookingDetails.email
  //     )
  //   ) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Invalid Email",
  //       text: "Please enter a valid email address.",
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  const validatePassengerData = () => {
    const pricedItinerary = flight?.PricedItineraries?.[0];
    const isPassportMandatory = pricedItinerary?.IsPassportMandatory === true;

    // ✅ Dynamic character limit
    const paxNameCharacterLimit =
      Number(pricedItinerary?.PaxNameCharacterLimit) || 60;

    // ✅ Get arrival datetime of last flight segment
    const flightSegments =
      pricedItinerary?.OriginDestinationOptions?.[0]?.FlightSegments || [];
    const finalArrivalDateTime =
      flightSegments[flightSegments.length - 1]?.ArrivalDateTime;
    const arrivalDate = dayjs(finalArrivalDateTime, "YYYY-MM-DDTHH:mm:ss");

    const sixMonthsBeforeArrival = arrivalDate.subtract(6, "month");
    const sixMonthsAfterArrival = arrivalDate.add(6, "month");

    const requiredFields = ["title", "firstName", "lastName", "date"];
    const passportFields = ["passport", "issuedate", "expirydate"];

    // ✅ Get precise age category (month-based)
    const getAgeCategoryAtArrival = (dobValue) => {
      const dob = dayjs(dobValue, "YYYY-MM-DD", true);
      if (!dob.isValid()) return { valid: false };

      const months = arrivalDate.diff(dob, "month", true); // exact month diff

      return {
        valid: true,
        months,
        isInfant: months < 24, // < 2 years
        isChild: months >= 24 && months < 156, // 2–12 years
        isAdult: months >= 156, // ≥ 13 years
      };
    };

    // ✅ Validation logic for each passenger type
    const isValid = (data, index, type) => {
      // --- Required Fields ---
      for (const field of requiredFields) {
        if (!data[field] || String(data[field]).trim() === "") {
          Swal.fire({
            icon: "error",
            title: "Missing Field",
            text: `Please fill out the ${field} for ${type} ${index + 1}.`,
          });
          return false;
        }
      }

      // --- Character Limit ---
      const first = String(data.firstName || "").trim();
      const last = String(data.lastName || "").trim();
      const fullName = `${first} ${last}`.trim();

      if (fullName.length > paxNameCharacterLimit) {
        Swal.fire({
          icon: "error",
          title: "Name Too Long",
          text: `${type} ${
            index + 1
          }'s full name (“${fullName}”) exceeds the ${paxNameCharacterLimit}-character limit.`,
        });
        return false;
      }

      // --- Age Validation (Month precise) ---
      const dobCheck = getAgeCategoryAtArrival(data.date);
      if (!dobCheck.valid) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date of Birth",
          text: `Please enter a valid date of birth for ${type} ${index + 1}.`,
        });
        return false;
      }

      if (type === "infant" && !dobCheck.isInfant) {
        Swal.fire({
          icon: "error",
          title: "Invalid Age",
          text: `Infant ${
            index + 1
          } must be under 2 years old at arrival (${dobCheck.months.toFixed(
            1,
          )} months old).`,
        });
        return false;
      } else if (type === "child" && !dobCheck.isChild) {
        Swal.fire({
          icon: "error",
          title: "Invalid Age",
          text: `Child ${
            index + 1
          } must be between 2 and 12 years old at arrival (${dobCheck.months.toFixed(
            1,
          )} months old).`,
        });
        return false;
      } else if (type === "adult" && !dobCheck.isAdult) {
        Swal.fire({
          icon: "error",
          title: "Invalid Age",
          text: `Adult ${
            index + 1
          } must be at least 13 years old at arrival (${dobCheck.months.toFixed(
            1,
          )} months old).`,
        });
        return false;
      }

      // --- Passport Validation ---
      if (isPassportMandatory) {
        let missingFields = [];

        for (const field of passportFields) {
          const value = data[field];
          if (!value || (typeof value === "string" && value.trim() === "")) {
            missingFields.push(field);
          }
        }

        if (missingFields.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Missing Passport Info",
            text: `Please fill out the following passport fields for ${type} ${
              index + 1
            }: ${missingFields.join(", ")}.`,
          });
          return false;
        }

        const issueDate = dayjs(data.issuedate, "YYYY-MM-DD", true);
        const expiryDate = dayjs(data.expirydate, "YYYY-MM-DD", true);

        if (!issueDate.isValid()) {
          Swal.fire({
            icon: "error",
            title: "Invalid Passport Issue Date",
            text: `Please enter a valid passport issue date for ${type} ${
              index + 1
            }.`,
          });
          return false;
        }

        if (!expiryDate.isValid()) {
          Swal.fire({
            icon: "error",
            title: "Invalid Passport Expiry Date",
            text: `Please enter a valid passport expiry date for ${type} ${
              index + 1
            }.`,
          });
          return false;
        }

        // --- Issue/Expiry Validation vs Arrival ---
        if (issueDate.isAfter(sixMonthsBeforeArrival)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Passport Issue Date",
            text: `Passport issue date for ${type} ${
              index + 1
            } must be at least 6 months before the flight arrival date.`,
          });
          return false;
        }

        if (expiryDate.isBefore(sixMonthsAfterArrival)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Passport Expiry Date",
            text: `Passport expiry date for ${type} ${
              index + 1
            } must be at least 6 months after the flight arrival date.`,
          });
          return false;
        }
      }

      return true;
    };

    // --- Passenger Counts ---
    const adultCount =
      pricedItinerary?.AirItineraryPricingInfo?.PTC_FareBreakdowns?.[0]
        ?.PassengerTypeQuantity?.Quantity || 1;
    const childCount =
      pricedItinerary?.AirItineraryPricingInfo?.PTC_FareBreakdowns?.[1]
        ?.PassengerTypeQuantity?.Quantity || 0;
    const infantCount =
      pricedItinerary?.AirItineraryPricingInfo?.PTC_FareBreakdowns?.[2]
        ?.PassengerTypeQuantity?.Quantity || 0;

    // --- Adults ---
    if (formData.length !== adultCount) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Adult Data",
        text: `Please fill out details for all ${adultCount} adults.`,
      });
      return false;
    }
    for (let i = 0; i < formData.length; i++) {
      if (!isValid(formData[i], i, "adult")) return false;
    }

    // --- Children ---
    if (childData.length !== childCount) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Child Data",
        text: `Please fill out details for all ${childCount} children.`,
      });
      return false;
    }
    for (let i = 0; i < childData.length; i++) {
      if (!isValid(childData[i], i, "child")) return false;
    }

    // --- Infants ---
    if (infant.length !== infantCount) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Infant Data",
        text: `Please fill out details for all ${infantCount} infants.`,
      });
      return false;
    }
    for (let i = 0; i < infant.length; i++) {
      if (!isValid(infant[i], i, "infant")) return false;
    }

    // --- Booking Details Validation ---
    if (!bookingDetails.mobile || bookingDetails.mobile.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Mobile Number",
        text: "Please enter your mobile number.",
      });
      return false;
    } else if (!/^\d{10}$/.test(bookingDetails.mobile)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Mobile number must be 10 digits.",
      });
      return false;
    }

    if (!bookingDetails.email || bookingDetails.email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Email",
        text: "Please enter your email address.",
      });
      return false;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        bookingDetails.email,
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  console.log("Flight", flight);
  const handleDataUpdate = (data) => {
    setBookingDetails(data);
    setEmail(data.email);
    setMobile(data.mobile);
    console.log("dataaa email", data);
  };
  const [tripSecure, setTripSecure] = useState("no"); // default to "No"
  const [pageFixed, setPageFixed] = useState(false);
  useEffect(() => {
    if (pageFixed) {
      // Push a new history entry when the section opens
      window.history.pushState({ modalOpen: true }, "");
    }

    const onPopState = (e) => {
      // If section is open, close it instead of navigating
      if (pageFixed) {
        setPageFixed(false);
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [pageFixed]);

  const seatsRef = useRef(null);

  const totalPassenger =
    flight &&
    flight.FareBreakdown &&
    flight.FareBreakdown.filter(
      (item) => item.PassengerType === 1 || item.PassengerType === 2,
    ).reduce((sum, item) => sum + item.PassengerCount, 0);

  const totalAdultPassenger =
    flight &&
    flight.FareBreakdown &&
    flight.FareBreakdown.filter((item) => item.PassengerType === 1).reduce(
      (sum, item) => sum + item.PassengerCount,
      0,
    );

  const totalChildPassenger =
    flight &&
    flight.FareBreakdown &&
    flight.FareBreakdown.filter((item) => item.PassengerType === 2).reduce(
      (sum, item) => sum + item.PassengerCount,
      0,
    );

  const [reviewPageDone, setReviewPageDone] = useState(false);
  const handleContinueClick = () => {
    setReviewPageDone(true);
    setOpenPayBtn(false);
    setTimeout(() => {
      seatsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleProceedPayment = (gateway) => {
    if (!selectedGateway) {
      alert("Please select payment gateway");
      return;
    }
    setPaymentGateway(false);
    handleTicketBookMistifly(gateway); // 👈 finally booking runs here
  };

  console.log("check flight:", flight);
  console.log("check flight2:", flight2);
  console.log("check flight3:", flight3);
  
  
  const validatePassportExpiry = () => {
  let returnFlightDate;
    console.log("flight2", flight2);
console.log("Return Date Object", getReturnFlightDate());
  // Round Trip
  if (flight2?.Segments?.length) {
    

      
    const segments = flight2.Segments[0];
    returnFlightDate = dayjs(
      segments[segments.length - 1]?.ArrivalDateTime
    );
  } else {
    // One Way
    const segments =
      flight?.Segments?.[0] ||
      flight?.OriginDestinationOptions?.[0]?.FlightSegments;

    returnFlightDate = dayjs(
      segments?.[segments.length - 1]?.ArrivalDateTime
    );
  }

  const minExpiryDate = returnFlightDate.add(6, "months");

  const passengers = [
    ...(formData || []),
    ...(childData || []),
    ...(infant || [])
  ];

  for (const pax of passengers) {
    if (pax.expirydate) {
      const expiryDate = dayjs(pax.expirydate);
      
       console.log("================================");
    console.log("Passenger:", pax.firstName, pax.lastName);
    console.log("Return Flight:", returnFlightDate.format("YYYY-MM-DD"));
    console.log("Min Expiry:", minExpiryDate.format("YYYY-MM-DD"));
    console.log("Passenger Expiry:", pax.expirydate);
    console.log(
      "Is Before:",
      expiryDate.isBefore(minExpiryDate, "day")
    );

      if (expiryDate.isBefore(minExpiryDate, "day")) {
        toast.error(
          `${pax.firstName} ${pax.lastName}'s passport must be valid for at least 6 months after the return flight date.`
        );
        return false;
      }
    }
  }

  return true;
};

const validatePassengerAge = () => {
    const returnFlightDate = getReturnFlightDate();

    if (!returnFlightDate) {
        toast.error("Unable to determine return flight date");
        return false;
    }

    // Infants
    for (const pax of infant || []) {
        const dob = dayjs(pax.dob);

        const ageYears = returnFlightDate.diff(dob, "year", true);

        if (ageYears >= 2) {
            toast.error(
                `${pax.firstName} ${pax.lastName} will be over 2 years old on the return flight and must be booked as a Child.`
            );
            return false;
        }
    }

    // Children
    for (const pax of childData || []) {
        const dob = dayjs(pax.dob);

        const ageYears = returnFlightDate.diff(dob, "year", true);

        if (ageYears >= 12) {
            toast.error(
                `${pax.firstName} ${pax.lastName} will be 12 years or older on the return flight and must be booked as an Adult.`
            );
            return false;
        }

        if (ageYears < 2) {
            toast.error(
                `${pax.firstName} ${pax.lastName} is under 2 years old on the return flight and must be booked as an Infant.`
            );
            return false;
        }
    }

    return true;
};

  return (
  <>
    <div className="roundtrippg">
      {srdvIdx === "undefined" && (
        // !(
        //   decodedIndex2 !== "" &&
        //   decodedIndex2 !== "undefined" &&
        //   decodedIndex2 !== "null"
        // ) && (
        <div style={{ position: "relative" }}>
          <Container className="flightBookingMainMain">
            <Row>
              <Col md={9}>
                <div className="booking_title">
                  <div className="bgGradient"></div>
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
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="#f73030"
                        loading="lazy"
                        onClick={() => handleChangeFlight()}
                        style={{ cursor: "pointer" }}
                        className="arrowLeft__ArrowLeftIcon-sc-5fabd0ed-0 cTjPkF"
                      >
                        <path d="M6.047 15.997a3.07 3.07 0 0 1 1.04-2.305L21.956.612a2.462 2.462 0 0 1 3.25 3.697L12.205 15.75a.334.334 0 0 0 0 .5l13.003 11.44a2.463 2.463 0 0 1-3.252 3.697L7.09 18.31A3.08 3.08 0 0 1 6.046 16z" />
                      </svg>
                      <h3 style={{ color: "#fff" }}> Review Your Booking</h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        // background: "#f2f3ff",
                        cursor: "pointer",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        color: "#fff",
                      }}
                    >
                      <BsInfoCircleFill />
                      <div
                        variant="primary"
                        onClick={handleFareRuleClick}
                        className="fare-rule-button"
                        style={{ fontSize: "13px" }}
                      >
                        Fare Rules
                      </div>
                    </div>
                  </div>
                </div>
                {flight?.Segments?.[0]?.length > 0 ? (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight={flight}
                    type="Departure"
                  />
                ) : (
                  <FlightDetailSkeleton />
                )}
                {flight2 && (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight={flight2}
                    type="Return"
                  />
                )}
                {flight3?.Segments?.length === 2 && (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight3={flight3}
                    types="Return"
                  />
                )}

                <Row className="traveller_detail_desktop">
                  <Col md={12} xs={12}>
                    <div
                      id="TRAVELLER_DETAIL"
                      className="oneCard-element"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="componentContainer ">
                        <div className="paxd">
                          <TravellerInformation
                            srdvIdx={srdvIdx}
                            flight={flight}
                            handleInputChange={handleInputChange}
                            handleInputChange1={handleInputChange1}
                            handleInputChange2={handleInputChange2}
                            handleExpiryDateChange={handleExpiryDateChange}
                            handleExpiryDateChange1={handleExpiryDateChange1}
                            handleExpiryDateChange2={handleExpiryDateChange2}
                            handleDOBChange={handleDOBChange}
                            handleDOBChange1={handleDOBChange1}
                            handleDOBChange2={handleDOBChange2}
                            formData={formData}
                            childData={childData}
                            infant={infant}
                          />
                        </div>
                      </div>

                      <BDSend
                        walletData={walletData}
                        onDataChange={handleDataUpdate}
                      />
                      {/* <TripSecure
                        tripSecure={tripSecure}
                        setTripSecure={setTripSecure}
                      /> */}

                      <form
                        autoComplete="off"
                        className="appendBottom20"
                        id="mainSection_1"
                      >
                        <div>
                          {reviewPageDone ? (
                            <div className="makeFlex column gap20">
                              <div id="SEATS_N_MEALS" className="">
                                <div className="componentContainer overviewSummary">
                                  {!ssrResponse ? (
                                    <div
                                      style={{
                                        width: "100%",
                                        margin: "auto",
                                        textAlign: "center",
                                        padding: "40px 0px",
                                      }}
                                    >
                                      NO SSR FOUND
                                      {/* Wait{" "}
                                      <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />{" "} */}
                                    </div>
                                  ) : (
                                    <div className="">
                                      <FlightSSR
                                        ssr={ssrResponse}
                                        ssr2={ssrResponse2}
                                        totalAdultCount={totalAdultPassenger}
                                        totalChildCount={totalChildPassenger}
                                        totalPassenger={totalPassenger}
                                        // onSeatChange={handleSeatChange}
                                        onBaggageChange={({
                                          selectedBaggage,
                                          total,
                                        }) => {
                                          setSelectedInboundBaggage(
                                            selectedBaggage.ssr2,
                                          );
                                          setSelectedOutboundBaggage(
                                            selectedBaggage.ssr,
                                          );
                                          setTotalBaggagePrice(total);
                                        }}
                                        onSeatChange={({
                                          selectedSeats,
                                          totalSeatPrice,
                                        }) => {
                                          console.log(
                                            "Received seat data in parent:",
                                            selectedSeats,
                                          );
                                          console.log(
                                            "Total Seat price",
                                            totalSeatPrice,
                                          );
                                          console.log(
                                            "SSR data",
                                            selectedSeats.ssr,
                                          );

                                          setSelectedOutboundSeats(
                                            selectedSeats.ssr,
                                          );
                                          setSelectedInboundSeats(
                                            selectedSeats.ssr2,
                                          );
                                          setTotalSeatPrice(totalSeatPrice);
                                        }}
                                        // onSeatChange={(data) => {
                                        //   setSelectedOutboundSeats(
                                        //     data.selectedSeats.ssr
                                        //   );
                                        //   setSelectedInboundSeats(
                                        //     data.selectedSeats.ssr2
                                        //   );
                                        //   setTotalSeatPrice(
                                        //     data.totalSeatPrice
                                        //   );
                                        // }}
                                        onMealChange={({
                                          selectedMeals,
                                          totalMealPrice,
                                        }) => {
                                          console.log(
                                            "Received seat data in parent:",
                                            selectedMeals,
                                          );
                                          setSelectedOutboundMeals(
                                            selectedMeals.ssr,
                                          );
                                          setSelectedInboundMeals(
                                            selectedMeals.ssr2,
                                          );
                                          setTotalMealPrice(totalMealPrice);
                                        }}
                                        // onSeatChange={({ ssr1, ssr2, ssr }) => {
                                        //   setSelectedOutboundSeats(ssr1.seats);
                                        //   setSelectedInboundSeats(ssr2.seats);
                                        //   setTotalSeatPrice(ssr.price);
                                        // }}
                                        // onBaggageChange={({
                                        //   baggageSSR1,
                                        //   baggageSSR2,
                                        //   total,
                                        // }) => {
                                        //   setSelectedOutboundBaggage(
                                        //     baggageSSR1
                                        //   );
                                        //   setSelectedInboundBaggage(
                                        //     baggageSSR2
                                        //   );
                                        //   setTotalBaggagePrice(total);
                                        // }}

                                        // onBaggageChange={handleBaggageChange}
                                        // onMealChange={handleMealChange}
                                        //  onMealChange={handleMealChange}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="makeFlex column gap20">
                              <div id="SEATS_N_MEALS" className="">
                                <div className="componentContainer overviewSummary disabled">
                                  <div
                                    data-test="component-heading"
                                    className="overviewSummaryHeading"
                                  >
                                    <h2 className="fontSize18 blackFont heading-text makeFlex gap-x-15">
                                      <span data-test="component-title">
                                        Seats &amp; Meals
                                      </span>
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* <div className="makeFlex column gap20">
                            <div id="SEATS_N_MEALS" className="">
                              <div className="componentContainer overviewSummary disabled">
                                <div
                                  data-test="component-heading"
                                  className="overviewSummaryHeading"
                                >
                                  <h2 className="fontSize18 blackFont heading-text makeFlex gap-x-15">
                                    <span data-test="component-title">
                                      Seats &amp; Meals
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </form>
                      <form
                        autoComplete="off"
                        className="appendBottom20"
                        id="mainSection_2"
                        ref={seatsRef}
                      >
                        <div>
                          <div className="makeFlex column gap20">
                            {reviewPageDone ? (
                              <div
                                style={{
                                  marginLeft: "-15px",
                                  marginRight: "-15px",
                                }}
                                onClick={handlePayment}
                              >
                                {" "}
                                <div className="con_tgg">
                                  <span className="co">Confirm Booking</span>
                                </div>
                              </div>
                            ) : (
                              <div
                                style={{
                                  marginLeft: "-15px",
                                  marginRight: "-15px",
                                }}
                                onClick={async () => {
                                  if (validatePassengerData()) {
                                    setOpenPayBtn(true);
                                    setPaymentGateway(true);
                                  }
                                }}
                              >
                                {" "}
                                <div className="con_tgg">
                                  <span className="co">Continue Booking</span>
                                </div>
                              </div>
                            )}
                            {/* <div id="DELAY_INSURANCE" className="">
                              <div className="componentContainer overviewSummary disabled">
                                <div
                                  data-test="component-heading"
                                  className="overviewSummaryHeading"
                                >
                                  <h2 className="fontSize18 blackFont heading-text makeFlex gap-x-15">
                                    <span data-test="component-title">
                                      Add ons
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
                {/* <Row className="traveller_detail_mobile">
                  <TripSecure
                    tripSecure={tripSecure}
                    setTripSecure={setTripSecure}
                  />
                </Row> */}
              </Col>

              {!flight2 && (
                <ChargesOneWay
                  srdvIdx={srdvIdx}
                  flight={flight}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  handleChangeCurrency={handleChangeCurrency}
                  walletData={walletData}
                  setOpenPayBtn={setOpenPayBtn}
                  paymentGateway={paymentGateway}
                  setPaymentGateway={setPaymentGateway}
                  openPayBtn={openPayBtn}
                  emiBtn={emiBtn}
                  setEmiBtn={setEmiBtn}
                  passengerSeatPreferences={passengerSeatPreferences}
                  passengerMealPreferences={passengerMealPreferences}
                  passengerBaggagePreferences={passengerBaggagePreferences}
                  validatePassengerData={validatePassengerData}
                  totalSeatPrice={totalSeatPrice}
                  reviewPageDone={reviewPageDone}
                  totalMealPrice={totalMealPrice}
                  totalBaggagePrice={totalBaggagePrice}
                  handlePayment={handlePayment}
                />
              )}

              {flight2 && (
                <ChargesOneWay
                  srdvIdx={srdvIdx}
                  flight={flight}
                  flight2={flight2}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  handleChangeCurrency={handleChangeCurrency}
                  walletData={walletData}
                  setOpenPayBtn={setOpenPayBtn}
                  openPayBtn={openPayBtn}
                  paymentGateway={paymentGateway}
                  setPaymentGateway={setPaymentGateway}
                  emiBtn={emiBtn}
                  setEmiBtn={setEmiBtn}
                  passengerSeatPreferences={passengerSeatPreferences}
                  passengerMealPreferences={passengerMealPreferences}
                  passengerBaggagePreferences={passengerBaggagePreferences}
                  validatePassengerData={validatePassengerData}
                  totalSeatPrice={totalSeatPrice}
                  totalMealPrice={totalMealPrice}
                  reviewPageDone={reviewPageDone}
                  totalBaggagePrice={totalBaggagePrice}
                  handlePayment={handlePayment}
                  // fetchSSRTBORound={fetchSSRTBORound}
                  // fetchSSRTBO={fetchSSRTBO}
                />
              )}
              <WhyBook />
              <div className="stick_filter_nv1_mobile bb">
                <div className="col_4">
                  <p>Grand Total</p>

                  {/* <span id="spnGrndTotal" className="CurrncyCD_Rs newfnt" /> */}
                  <span className="newfnt ng-binding">
                    ₹{" "}
                    {flight && flight2
                      ? Math.round(
                          flight &&
                            flight.Fare.PublishedFare + flight2 &&
                            flight2.Fare.PublishedFare,
                        )
                      : Math.round(flight && flight.Fare.PublishedFare)}
                  </span>
                  <a className="fr_icn ovhdn" />
                </div>
                <div
                  className="col_5_nv1 return-top"
                  onClick={() => {
                    if (!tripSecure) {
                      alert(
                        "Please select whether to secure your trip or not.",
                      );
                      return;
                    }
                    setPageFixed(true);
                  }}
                >
                  <a className="con_btn_nv1 gotop">Continue Booking</a>
                </div>
              </div>
            </Row>
          </Container>

          {duringBooking && (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#053355"
                      className="mb-3"
                    />
                    <Card.Text>
                      Hang Tight—We’re Processing Your Booking..!!
                    </Card.Text>
                    {/* <button
                      className="btn btn-outline-secondary mt-5 mb-5"
                      onClick={() => setDuringBooking(false)}
                    >
                      Cancel
                    </button> */}
                    <p>
                      Everything’s in motion. We’re just putting the final
                      touches on your reservation. You’ll hear from us soon!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <Modal
            show={showFareRuleModal}
            onHide={() => setShowFareRuleModal(false)}
            size="lg"
            aria-labelledby="fare-rule-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="fare-rule-modal">Fare Rules</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {loadingFareRule ? (
                <div className="text-center py-3">Loading Fare Rule...</div>
              ) : (
                // fareRule.length > 0 ? (
                //   <FareRule srdvIdx={srdvIdx} fareRule={fareRule} />
                // ) :
                <FareRule srdvIdx={srdvIdx} fareRule={fareRule} />
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowFareRuleModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {openPayBtn && (
            <ReviewPassneger
              handleContinueClick={handleContinueClick}
              infant={infant}
              formData={formData}
              childData={childData}
              openPayBtn={openPayBtn}
              setOpenPayBtn={setOpenPayBtn}
              setPaymentGateway={setPaymentGateway}
              setShowPaymentPopup={setShowPaymentPopup}
              validatePassportExpiry={validatePassportExpiry}
              validatePassengerAge={validatePassengerAge}
            />
          )}

          {/* {openPayBtn ? (
            <FlightPayModal
              srdvIdx={srdvIdx}
              flight={flight}
              flight2={flight2}
              handleChangeCurrency={handleChangeCurrency}
              openPayBtn={openPayBtn}
              setOpenPayBtn={setOpenPayBtn}
              paymentGateway={paymentGateway}
              setPaymentGateway={setPaymentGateway}
              formData={formData}
              childData={childData}
              bookingDetails={bookingDetails}
              infant={infant}
              handlePayment={handlePayment}
              handleTicketBook={handleTicketBook}
              handleTicketBookRound={handleTicketBookRound}
              setLoading={setLoading}
              passengerSeatPreferences={passengerSeatPreferences}
              passengerMealPreferences={passengerMealPreferences}
              passengerBaggagePreferences={passengerBaggagePreferences}
              loading={loading}
            />
          ) : (
            ""
          )} */}
          {pageFixed && (
            <MobileTravellers
              flight={flight}
              handleContinueClick={handleContinueClick}
              setPaymentGateway={setPaymentGateway}
              setShowPaymentPopup={setShowPaymentPopup}
              setPageFixed={setPageFixed}
              srdvIdx={srdvIdx}
              type="Departure"
              formData={formData}
              childData={childData}
              infant={infant}
              flight3={flight3}
              setFormData={setFormData}
              setInfant={setInfant}
              setChildData={setChildData}
              handlePayment={handlePayment}
              onDataChange={handleDataUpdate}
              validatePassengerData={validatePassengerData}
              flight2={flight2}
              types="Return"
              ssr={ssrResponse}
              ssr2={ssrResponse2}
              totalAdultCount={totalAdultPassenger}
              totalChildCount={totalChildPassenger}
              totalPassenger={totalPassenger}
              onBaggageChange={({ selectedBaggage, total }) => {
                setSelectedInboundBaggage(selectedBaggage.ssr2);
                setSelectedOutboundBaggage(selectedBaggage.ssr);
                setTotalBaggagePrice(total);
              }}
              onSeatChange={({ selectedSeats, totalSeatPrice }) => {
                console.log("Received seat data in parent:", selectedSeats);
                console.log("Total Seat price", totalSeatPrice);
                console.log("SSR data", selectedSeats.ssr);

                setSelectedOutboundSeats(selectedSeats.ssr);
                setSelectedInboundSeats(selectedSeats.ssr2);
                setTotalSeatPrice(totalSeatPrice);
              }}
              onMealChange={({ selectedMeals, totalMealPrice }) => {
                console.log("Received seat data in parent:", selectedMeals);
                setSelectedOutboundMeals(selectedMeals.ssr);
                setSelectedInboundMeals(selectedMeals.ssr2);
                setTotalMealPrice(totalMealPrice);
              }}
            />
          )}
          {showPaymentPopup && (
            <div className="payment_modal_wrapper">
              <p className="payment_overlayBg" />
              <div className="payment_commonOverlay">
                <span
                  className="payment_overlayCrossIcon"
                  onClick={() => setShowPaymentPopup(false)}
                >
                  ✕
                </span>

                <h3 className="payment_heading">Select Payment Gateway</h3>

                <div className="payment_content">
                  <div className="payment_option">
                    <label>
                      <input
                        type="radio"
                        name="payment_gateway"
                        value="wipay"
                        onChange={(e) => setSelectedGateway(e.target.value)}
                      />
                      <span>VISA Card</span>
                    </label>
                  </div>

                  <div className="payment_option">
                    <label>
                      <input
                        type="radio"
                        name="payment_gateway"
                        value="mmg"
                        onChange={(e) => setSelectedGateway(e.target.value)}
                      />
                      <span>MMG</span>
                    </label>
                  </div>
                </div>

                <div className="payment_footer">
                  <button
                    className="payment_confirm_btn"
                    onClick={() => {
                      if (!selectedGateway) {
                        alert("Please select payment gateway");
                        return;
                      }
                      setShowPaymentPopup(false);
                      handleTicketBookMistifly(selectedGateway);
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {srdvIdx === "EwebM" && (
        // !(
        //   decodedIndex2 !== "" &&
        //   decodedIndex2 !== "undefined" &&
        //   decodedIndex2 !== "null"
        // ) && (

        <div style={{ position: "relative" }}>
          <Container className="flightBookingMainMain">
            <Row>
              <Col md={9}>
                <div className="booking_title">
                  <div className="bgGradient"></div>
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
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="#f73030"
                        loading="lazy"
                        onClick={() => handleChangeFlight()}
                        style={{ cursor: "pointer" }}
                        className="arrowLeft__ArrowLeftIcon-sc-5fabd0ed-0 cTjPkF"
                      >
                        <path d="M6.047 15.997a3.07 3.07 0 0 1 1.04-2.305L21.956.612a2.462 2.462 0 0 1 3.25 3.697L12.205 15.75a.334.334 0 0 0 0 .5l13.003 11.44a2.463 2.463 0 0 1-3.252 3.697L7.09 18.31A3.08 3.08 0 0 1 6.046 16z" />
                      </svg>
                      <h3 style={{ color: "#fff" }}> Review Your Booking</h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        // background: "#f2f3ff",
                        cursor: "pointer",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        color: "#fff",
                      }}
                    >
                      <BsInfoCircleFill />
                      <div
                        variant="primary"
                        onClick={handleFareRuleClick}
                        className="fare-rule-button"
                        style={{ fontSize: "13px" }}
                      >
                        Fare Rules
                      </div>
                    </div>
                  </div>
                </div>
                {flight?.PricedItineraries?.length > 0 ? (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight={flight}
                    type="Departure"
                  />
                ) : (
                  <FlightDetailSkeleton />
                )}
                {/* {flight?.PricedItineraries?.[0]?.OriginDestinationOptions?.[1] && (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight={flight}
                    type="Return"
                  />
                )} */}
                {/* {flight3?.Segments?.length === 2 && (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight3={flight3}
                    types="Return"
                  />
                )} */}

                <Row className="traveller_detail_desktop">
                  <Col md={12} xs={12}>
                    <div
                      id="TRAVELLER_DETAIL"
                      className="oneCard-element"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="componentContainer ">
                        <div className="paxd">
                          <TravellerInformation
                            srdvIdx={srdvIdx}
                            flight={flight}
                            handleInputChange={handleInputChange}
                            handleInputChange1={handleInputChange1}
                            handleInputChange2={handleInputChange2}
                            handleExpiryDateChange={handleExpiryDateChange}
                            handleExpiryDateChange1={handleExpiryDateChange1}
                            handleExpiryDateChange2={handleExpiryDateChange2}
                            handleDOBChange={handleDOBChange}
                            handleDOBChange1={handleDOBChange1}
                            handleDOBChange2={handleDOBChange2}
                            formData={formData}
                            childData={childData}
                            infant={infant}
                          />
                        </div>
                      </div>

                      <BDSend
                        walletData={walletData}
                        onDataChange={handleDataUpdate}
                      />
                      {/* <TripSecure
                        tripSecure={tripSecure}
                        setTripSecure={setTripSecure}
                      /> */}

                      {/* <form
                        autoComplete="off"
                        className="appendBottom20"
                        id="mainSection_1"
                      >
                        <div>
                          {reviewPageDone ? (
                            <div className="makeFlex column gap20">
                              <div id="SEATS_N_MEALS" className="">
                                <div className="componentContainer overviewSummary">
                                  {!ssrResponse ? (
                                    <div
                                      style={{
                                        width: "100%",
                                        margin: "auto",
                                        textAlign: "center",
                                        padding: "40px 0px",
                                      }}
                                    >
                                      NO SSR FOUND
                                    
                                    </div>
                                  ) : (
                                    <div className="">
                                      <FlightSSR
                                        ssr={ssrResponse}
                                        ssr2={ssrResponse2}
                                        totalAdultCount={totalAdultPassenger}
                                        totalChildCount={totalChildPassenger}
                                        totalPassenger={totalPassenger}
                                        // onSeatChange={handleSeatChange}
                                        onBaggageChange={({
                                          selectedBaggage,
                                          total,
                                        }) => {
                                          setSelectedInboundBaggage(
                                            selectedBaggage.ssr2
                                          );
                                          setSelectedOutboundBaggage(
                                            selectedBaggage.ssr
                                          );
                                          setTotalBaggagePrice(total);
                                        }}
                                        onSeatChange={({
                                          selectedSeats,
                                          totalSeatPrice,
                                        }) => {
                                          console.log(
                                            "Received seat data in parent:",
                                            selectedSeats
                                          );
                                          console.log(
                                            "Total Seat price",
                                            totalSeatPrice
                                          );
                                          console.log(
                                            "SSR data",
                                            selectedSeats.ssr
                                          );

                                          setSelectedOutboundSeats(
                                            selectedSeats.ssr
                                          );
                                          setSelectedInboundSeats(
                                            selectedSeats.ssr2
                                          );
                                          setTotalSeatPrice(totalSeatPrice);
                                        }}
                                        onMealChange={({
                                          selectedMeals,
                                          totalMealPrice,
                                        }) => {
                                          console.log(
                                            "Received seat data in parent:",
                                            selectedMeals
                                          );
                                          setSelectedOutboundMeals(
                                            selectedMeals.ssr
                                          );
                                          setSelectedInboundMeals(
                                            selectedMeals.ssr2
                                          );
                                          setTotalMealPrice(totalMealPrice);
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="makeFlex column gap20">
                              <div id="SEATS_N_MEALS" className="">
                                <div className="componentContainer overviewSummary disabled">
                                  <div
                                    data-test="component-heading"
                                    className="overviewSummaryHeading"
                                  >
                                    <h2 className="fontSize18 blackFont heading-text makeFlex gap-x-15">
                                      <span data-test="component-title">
                                        Seats &amp; Meals
                                      </span>
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </form> */}
                      {/* <form
                          autoComplete="off"
                          className="appendBottom20"
                          id="mainSection_2"
                          ref={seatsRef}
                        >
                          <div>
                            <div className="makeFlex column gap20">
                              {reviewPageDone ? (
                                <div
                                  style={{
                                    marginLeft: "-15px",
                                    marginRight: "-15px",
                                  }}
                                  onClick={handlePayment}
                                >
                                  {" "}
                                  <div className="con_tgg">
                                    <span className="co">Confirm Booking</span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    marginLeft: "-15px",
                                    marginRight: "-15px",
                                  }}
                                  onClick={async () => {
                                    if (validatePassengerData()) {
                                      setOpenPayBtn(true);
                                      setPaymentGateway(true);
                                    }
                                  }}
                                >
                                  {" "}
                                  <div className="con_tgg">
                                    <span className="co">Continue Booking</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </form> */}
                      <div>
                        <div className="makeFlex column gap20">
                          {reviewPageDone ? (
                            <div
                              style={{
                                marginLeft: "-15px",
                                marginRight: "-15px",
                              }}
                              onClick={handlePayment}
                            >
                              {" "}
                              <div className="con_tgg">
                                <span className="co">Confirm Booking</span>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                marginLeft: "-15px",
                                marginRight: "-15px",
                              }}
                              onClick={async () => {
                                if (validatePassengerData()) {
                                  setOpenPayBtn(true);
                                  setPaymentGateway(true);
                                }
                              }}
                            >
                              {" "}
                              <div className="con_tgg">
                                <span className="co">Continue Booking</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row className="traveller_detail_mobile">
                  <TripSecure
                    tripSecure={tripSecure}
                    setTripSecure={setTripSecure}
                  />
                </Row> */}
              </Col>

              {!flight2 && (
                <ChargesOneWay
                  srdvIdx={srdvIdx}
                  flight={flight}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  handleChangeCurrency={handleChangeCurrency}
                  walletData={walletData}
                  setOpenPayBtn={setOpenPayBtn}
                  paymentGateway={paymentGateway}
                  setPaymentGateway={setPaymentGateway}
                  openPayBtn={openPayBtn}
                  emiBtn={emiBtn}
                  setEmiBtn={setEmiBtn}
                  passengerSeatPreferences={passengerSeatPreferences}
                  passengerMealPreferences={passengerMealPreferences}
                  passengerBaggagePreferences={passengerBaggagePreferences}
                  validatePassengerData={validatePassengerData}
                  totalSeatPrice={totalSeatPrice}
                  reviewPageDone={reviewPageDone}
                  totalMealPrice={totalMealPrice}
                  totalBaggagePrice={totalBaggagePrice}
                  handlePayment={handlePayment}
                  handleTicketBookMistifly={handleTicketBookMistifly}
                />
              )}

              {flight2 && (
                <ChargesOneWay
                  srdvIdx={srdvIdx}
                  flight={flight}
                  flight2={flight2}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  handleChangeCurrency={handleChangeCurrency}
                  walletData={walletData}
                  setOpenPayBtn={setOpenPayBtn}
                  openPayBtn={openPayBtn}
                  paymentGateway={paymentGateway}
                  setPaymentGateway={setPaymentGateway}
                  emiBtn={emiBtn}
                  setEmiBtn={setEmiBtn}
                  passengerSeatPreferences={passengerSeatPreferences}
                  passengerMealPreferences={passengerMealPreferences}
                  passengerBaggagePreferences={passengerBaggagePreferences}
                  validatePassengerData={validatePassengerData}
                  totalSeatPrice={totalSeatPrice}
                  totalMealPrice={totalMealPrice}
                  reviewPageDone={reviewPageDone}
                  totalBaggagePrice={totalBaggagePrice}
                  handlePayment={handlePayment}
                  handleTicketBookMistifly={handleTicketBookMistifly}
                  // fetchSSRTBORound={fetchSSRTBORound}
                  // fetchSSRTBO={fetchSSRTBO}
                />
              )}
              <WhyBook />
              <div className="stick_filter_nv1_mobile bb">
                <div className="col_4">
                  <p>Grand Total</p>

                  <span className="newfnt ng-binding">
                    ${" "}
                    {flight &&
                      flight.PricedItineraries[0].AirItineraryPricingInfo
                        .ItinTotalFare.TotalFare.Amount}
                  </span>
                  <a className="fr_icn ovhdn" />
                </div>
                <div
                  className="col_5_nv1 return-top"
                  onClick={() => {
                    if (!tripSecure) {
                      alert(
                        "Please select whether to secure your trip or not.",
                      );
                      return;
                    }
                    setPageFixed(true);
                  }}
                >
                  <a className="con_btn_nv1 gotop">Continue Booking</a>
                </div>
              </div>
            </Row>
          </Container>

          {duringBooking && (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#053355"
                      className="mb-3"
                    />
                    <Card.Text>
                      Hang Tight—We’re Processing Your Booking..!!
                    </Card.Text>
                    {/* <button
                      className="btn btn-outline-secondary mt-5 mb-5"
                      onClick={() => setDuringBooking(false)}
                    >
                      Cancel
                    </button> */}
                    <p>
                      Everything’s in motion. We’re just putting the final
                      touches on your reservation. You’ll hear from us soon!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <Modal
            show={showFareRuleModal}
            onHide={() => setShowFareRuleModal(false)}
            size="lg"
            aria-labelledby="fare-rule-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="fare-rule-modal">Fare Rules</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {loadingFareRule ? (
                <div className="text-center py-3">Loading Fare Rule...</div>
              ) : (
                // fareRule.length > 0 ? (
                //   <FareRule srdvIdx={srdvIdx} fareRule={fareRule} />
                // ) :
                <FareRule
                  srdvIdx={srdvIdx}
                  fareRule={fareRule}
                  loadingFareRule={loadingFareRule}
                />
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowFareRuleModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {openPayBtn && (
            <ReviewPassneger
              handleContinueClick={handleContinueClick}
              infant={infant}
              formData={formData}
              childData={childData}
              openPayBtn={openPayBtn}
              setOpenPayBtn={setOpenPayBtn}
              setPaymentGateway={setPaymentGateway}
              setShowPaymentPopup={setShowPaymentPopup}
              handleTicketBookMistifly={handleTicketBookMistifly}
              validatePassportExpiry={validatePassportExpiry}
              validatePassengerAge={validatePassengerAge}
            />
          )}
          {showPaymentPopup && (
            <div className="payment_modal_wrapper">
              <p className="payment_overlayBg" />
              <div className="payment_commonOverlay">
                <span
                  className="payment_overlayCrossIcon"
                  onClick={() => setShowPaymentPopup(false)}
                >
                  ✕
                </span>

                <h3 className="payment_heading">Select Payment Gateway</h3>

                <div className="payment_content">
                  <div className="payment_option">
                    <label>
                      <input
                        type="radio"
                        name="payment_gateway"
                        value="wipay"
                        onChange={(e) => setSelectedGateway(e.target.value)}
                      />
                      <span>VISA Card</span>
                    </label>
                  </div>

                  <div className="payment_option">
                    <label>
                      <input
                        type="radio"
                        name="payment_gateway"
                        value="mmg"
                        onChange={(e) => setSelectedGateway(e.target.value)}
                      />
                      <span>MMG</span>
                    </label>
                  </div>
                </div>

                <div className="payment_footer">
                  <button
                    className="payment_confirm_btn"
                    onClick={() => {
                      if (!selectedGateway) {
                        alert("Please select payment gateway");
                        return;
                      }
                      setShowPaymentPopup(false);
                      handleTicketBookMistifly(selectedGateway);
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          )}
          {pageFixed && (
            <MobileTravellers
              flight={flight}
              flight2={flight2}
              setPageFixed={setPageFixed}
              handleContinueClick={handleContinueClick}
              setPaymentGateway={setPaymentGateway}
              setShowPaymentPopup={setShowPaymentPopup}
              srdvIdx={srdvIdx}
              type="Departure"
              formData={formData}
              childData={childData}
              infant={infant}
              flight3={flight3}
              setFormData={setFormData}
              setInfant={setInfant}
              setChildData={setChildData}
              handlePayment={handlePayment}
              onDataChange={handleDataUpdate}
              validatePassengerData={validatePassengerData}
              types="Return"
              ssr={ssrResponse}
              ssr2={ssrResponse2}
              totalAdultCount={totalAdultPassenger}
              totalChildCount={totalChildPassenger}
              totalPassenger={totalPassenger}
              onBaggageChange={({ selectedBaggage, total }) => {
                setSelectedInboundBaggage(selectedBaggage.ssr2);
                setSelectedOutboundBaggage(selectedBaggage.ssr);
                setTotalBaggagePrice(total);
              }}
              onSeatChange={({ selectedSeats, totalSeatPrice }) => {
                console.log("Received seat data in parent:", selectedSeats);
                console.log("Total Seat price", totalSeatPrice);
                console.log("SSR data", selectedSeats.ssr);

                setSelectedOutboundSeats(selectedSeats.ssr);
                setSelectedInboundSeats(selectedSeats.ssr2);
                setTotalSeatPrice(totalSeatPrice);
              }}
              // onSeatChange={(data) => {
              //   setSelectedOutboundSeats(
              //     data.selectedSeats.ssr
              //   );
              //   setSelectedInboundSeats(
              //     data.selectedSeats.ssr2
              //   );
              //   setTotalSeatPrice(
              //     data.totalSeatPrice
              //   );
              // }}
              onMealChange={({ selectedMeals, totalMealPrice }) => {
                console.log("Received seat data in parent:", selectedMeals);
                setSelectedOutboundMeals(selectedMeals.ssr);
                setSelectedInboundMeals(selectedMeals.ssr2);
                setTotalMealPrice(totalMealPrice);
              }}
            />
          )}
        </div>
      )}
    </div>
	
	{/* Modal */}
{showFareChangePopup && (
  <>
    {/* Background Overlay */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        zIndex: 9998,
      }}
    ></div>

    {/* Popup */}
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "95%",
        maxWidth: "450px",
        background: "#fff",
        borderRadius: "16px",
        zIndex: 9999,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        animation: "popupShow 0.25s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg,#f97316,#efbf04)",
          padding: "20px",
          color: "#fff",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Fare Updated
        </h2>

        <p
          style={{
            marginTop: "5px",
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          Airline changed fare or baggage details
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: "24px" }}>
        <div
          style={{
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#444",
              lineHeight: "24px",
            }}
          >
            Your selected flight is still available, but the airline has
            updated the fare or baggage information.
          </p>
        </div>

        {/* Fare Details */}
        <div
          style={{
            background: "#f9fafb",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          {fareChangeData?.OldFare && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: "#666" }}>Old Fare</span>

              <span
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                }}
              >
                ₹{fareChangeData?.OldFare}
              </span>
            </div>
          )}

          {fareChangeData?.TotalFare && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#666" }}>
                Updated Fare
              </span>

              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#16a34a",
                }}
              >
                ₹{fareChangeData?.TotalFare}
              </span>
            </div>
          )}
        </div>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Do you want to continue with updated fare?
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <button
            onClick={() => {
              setShowFareChangePopup(false);
              navigate(-1);
            }}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              background: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>

          <button
            onClick={() => {
              setShowFareChangePopup(false);

              toast.success(
                "Continuing with updated fare"
              );

              // continue booking
            }}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(90deg,#f97316,#efbf04)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>

    {/* Animation */}
    <style>
      {`
        @keyframes popupShow {
          from {
            opacity: 0;
            transform: translate(-50%, -45%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}
    </style>
  </>
)}
</>
  );
};

export default FlightDetail;

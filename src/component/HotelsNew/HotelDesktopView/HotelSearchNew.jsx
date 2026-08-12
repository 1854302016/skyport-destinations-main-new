import React, { useEffect, useRef, useState } from "react";

// Import ./BusBookingForm.css'Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { BASE_URL } from "../../../config";
// import required modules

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
import { MdFlight, MdOutlineFlight } from "react-icons/md";
import { FaCity, FaHotel, FaSuitcaseRolling, FaWallet } from "react-icons/fa";
import moment from "moment";
import { BiSolidOffer } from "react-icons/bi";
import { IoBagHandleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import Slider from "react-slick";
// import "./gdvfdty.css";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Helmet } from "react-helmet";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { CountriesArray } from "../FlightSearchMobile/Countries";
// import { cities2 } from "./Cities";

import axios from "axios";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import {
  services,
  nationalityOptions,
} from "../../Hotel/HotelSearch/HotelSearchData";
import WebOffer from "../../Home/Home/WebOffer";
import ReasonsToBook from "../../Home/Home/ReasonToBook";
import PopularDestinations from "../../Hotel/HotelSearch/HotelSearchMobile/PopularDestinations";
import HotelsContainer from "../../Hotel/HotelSearch/HotelComponent";
import Foot from "../../Footer/Foot";
import WhyUss from "../../Home/Home/WhyUss";
import AboutHome from "../../Home/Home/AboutHome";
import WhyBookUsNew from "../../Home/Home/WhyBookUsNew";
import HotelChains from "./HotelChains";
import MobileApp from "../../Flight/FlightSearchMobile/MobileApp";
import SectionsHotel from "../../Hotel/HotelSearch/SectionsHotel";
import { toast } from "react-toastify";

// import { useDispatch } from "react-redux";
// import { flightSearch } from "../../../redux/services/operations/flight";

export const data = [
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/banner/RR_Hifive_0712.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/CTINT_RR_FLIGHTS_29052023.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_LMD_H_3001.jpg",
  },
];

export var settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 1500,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const extractBracketValue = (str) => {
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(str);
  return match ? match[1] : null;
};
const cityToAirportCode = {
  Dubai: "DXB",
  Delhi: "DEL",
  Mumbai: "BOM",
  "New York": "JFK",
  London: "LHR",
  Paris: "CDG",
  Singapore: "SIN",
  // Add more cities as needed
};
const HotelSearchNew = () => {
  const bookusdata = [
    {
      img: "/Images/Icons/esy-flights.svg",
      head: "Easy Booking",
      desc: " Book Flights Easily and Grab Exciting Offers!",
    },
    {
      img: "/Images/Icons/down-arrows.svg",
      head: "Lowest Price",
      desc: "Guaranteed Low Rates on Hotels, Holiday Packages, and Flights",
    },
    {
      img: "/Images/Icons/return-boxs.svg",
      head: "Instant Refund",
      desc: "Get Quick and Easy Refunds on All Your Travel Bookings!",
    },
    {
      img: "/Images/Icons/24-hoursa.svg",
      head: "24/7 Support",
      desc: "24/7 Support for All Your Travel Queries — We're Here to Help!",
    },
    {
      img: "/Images/Icons/hot-sales.svg",
      head: "Exciting Deals",
      desc: "Unlock Exciting Deals on Flights, Hotels, Buses, Car Rentals, and Tours!",
    },
  ];
  const [rooms, setRooms] = useState([
    { adults: 1, children: 0, childrenAges: [] },
  ]);
  const [labelClicked, setLabelClicked] = useState(false);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [daysize, setDaySize] = useState(2);
  const [startDate, setStartDate] = useState(moment().add(1, "days"));
  // const [startDate, setStartDate] = useState(moment().add(1, "days"));
  const [endDate, setEndDate] = useState(null);
  const [searchedHotel, setSearchedHotel] = useState("");
  // const [searchedHotel, setSearchedHotel] = useState(
  //   "NATIONAL CAPITAL TERRITORY OF DELHI,"
  // );
  // useEffect(() => {
  //   setEndDate(active2 ? moment().add(2, "days") : null);
  // }, [active2]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [calVisible, setCalVisible] = useState(false);
  const [clickDestination, SetClickDestination] = useState(false);
  const [residency, setResidency] = useState("gy");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
  });

  const countries = [
    { code: "ad", name: "Andorra" },
    { code: "ae", name: "United Arab Emirates" },
    { code: "af", name: "Afghanistan" },
    { code: "ag", name: "Antigua and Barbuda" },
    { code: "ai", name: "Anguilla" },
    { code: "al", name: "Albania" },
    { code: "am", name: "Armenia" },
    { code: "ao", name: "Angola" },
    { code: "aq", name: "Antarctica" },
    { code: "ar", name: "Argentina" },
    { code: "as", name: "American Samoa" },
    { code: "at", name: "Austria" },
    { code: "au", name: "Australia" },
    { code: "aw", name: "Aruba" },
    { code: "ax", name: "Åland Islands" },
    { code: "az", name: "Azerbaijan" },
    { code: "ba", name: "Bosnia and Herzegovina" },
    { code: "bb", name: "Barbados" },
    { code: "bd", name: "Bangladesh" },
    { code: "be", name: "Belgium" },
    { code: "bf", name: "Burkina Faso" },
    { code: "bg", name: "Bulgaria" },
    { code: "bh", name: "Bahrain" },
    { code: "bi", name: "Burundi" },
    { code: "bj", name: "Benin" },
    { code: "bl", name: "Saint Barthélemy" },
    { code: "bm", name: "Bermuda" },
    { code: "bn", name: "Brunei Darussalam" },
    { code: "bo", name: "Bolivia" },
    { code: "bq", name: "Bonaire, Sint Eustatius and Saba" },
    { code: "br", name: "Brazil" },
    { code: "bs", name: "Bahamas" },
    { code: "bt", name: "Bhutan" },
    { code: "bv", name: "Bouvet Island" },
    { code: "bw", name: "Botswana" },
    { code: "by", name: "Belarus" },
    { code: "bz", name: "Belize" },
    { code: "ca", name: "Canada" },
    { code: "cc", name: "Cocos (Keeling) Islands" },
    { code: "cd", name: "Democratic Republic of the Congo" },
    { code: "cf", name: "Central African Republic" },
    { code: "cg", name: "Republic of the Congo" },
    { code: "ch", name: "Switzerland" },
    { code: "ci", name: "Côte d’Ivoire" },
    { code: "ck", name: "Cook Islands" },
    { code: "cl", name: "Chile" },
    { code: "cm", name: "Cameroon" },
    { code: "cn", name: "China" },
    { code: "co", name: "Colombia" },
    { code: "cr", name: "Costa Rica" },
    { code: "cu", name: "Cuba" },
    { code: "cv", name: "Cabo Verde" },
    { code: "cw", name: "Curaçao" },
    { code: "cx", name: "Christmas Island" },
    { code: "cy", name: "Cyprus" },
    { code: "cz", name: "Czechia" },
    { code: "de", name: "Germany" },
    { code: "dj", name: "Djibouti" },
    { code: "dk", name: "Denmark" },
    { code: "dm", name: "Dominica" },
    { code: "do", name: "Dominican Republic" },
    { code: "dz", name: "Algeria" },
    { code: "ec", name: "Ecuador" },
    { code: "ee", name: "Estonia" },
    { code: "eg", name: "Egypt" },
    { code: "eh", name: "Western Sahara" },
    { code: "er", name: "Eritrea" },
    { code: "es", name: "Spain" },
    { code: "et", name: "Ethiopia" },
    { code: "fi", name: "Finland" },
    { code: "fj", name: "Fiji" },
    { code: "fk", name: "Falkland Islands" },
    { code: "fm", name: "Micronesia" },
    { code: "fo", name: "Faroe Islands" },
    { code: "fr", name: "France" },
    { code: "ga", name: "Gabon" },
    { code: "gb", name: "United Kingdom" },
    { code: "gd", name: "Grenada" },
    { code: "ge", name: "Georgia" },
    { code: "gf", name: "French Guiana" },
    { code: "gg", name: "Guernsey" },
    { code: "gh", name: "Ghana" },
    { code: "gi", name: "Gibraltar" },
    { code: "gl", name: "Greenland" },
    { code: "gm", name: "Gambia" },
    { code: "gn", name: "Guinea" },
    { code: "gp", name: "Guadeloupe" },
    { code: "gq", name: "Equatorial Guinea" },
    { code: "gr", name: "Greece" },
    { code: "gs", name: "South Georgia and the South Sandwich Islands" },
    { code: "gt", name: "Guatemala" },
    { code: "gu", name: "Guam" },
    { code: "gw", name: "Guinea-Bissau" },
    { code: "gy", name: "Guyana" },
    { code: "hk", name: "Hong Kong" },
    { code: "hm", name: "Heard Island and McDonald Islands" },
    { code: "hn", name: "Honduras" },
    { code: "hr", name: "Croatia" },
    { code: "ht", name: "Haiti" },
    { code: "hu", name: "Hungary" },
    { code: "id", name: "Indonesia" },
    { code: "ie", name: "Ireland" },
    { code: "il", name: "Israel" },
    { code: "im", name: "Isle of Man" },
    { code: "in", name: "India" },
    { code: "io", name: "British Indian Ocean Territory" },
    { code: "iq", name: "Iraq" },
    { code: "ir", name: "Iran" },
    { code: "is", name: "Iceland" },
    { code: "it", name: "Italy" },
    { code: "je", name: "Jersey" },
    { code: "jm", name: "Jamaica" },
    { code: "jo", name: "Jordan" },
    { code: "jp", name: "Japan" },
    { code: "ke", name: "Kenya" },
    { code: "kg", name: "Kyrgyzstan" },
    { code: "kh", name: "Cambodia" },
    { code: "ki", name: "Kiribati" },
    { code: "km", name: "Comoros" },
    { code: "kn", name: "Saint Kitts and Nevis" },
    { code: "kp", name: "North Korea" },
    { code: "kr", name: "South Korea" },
    { code: "kw", name: "Kuwait" },
    { code: "ky", name: "Cayman Islands" },
    { code: "kz", name: "Kazakhstan" },
    { code: "la", name: "Laos" },
    { code: "lb", name: "Lebanon" },
    { code: "lc", name: "Saint Lucia" },
    { code: "li", name: "Liechtenstein" },
    { code: "lk", name: "Sri Lanka" },
    { code: "lr", name: "Liberia" },
    { code: "ls", name: "Lesotho" },
    { code: "lt", name: "Lithuania" },
    { code: "lu", name: "Luxembourg" },
    { code: "lv", name: "Latvia" },
    { code: "ly", name: "Libya" },
    { code: "ma", name: "Morocco" },
    { code: "mc", name: "Monaco" },
    { code: "md", name: "Moldova" },
    { code: "me", name: "Montenegro" },
    { code: "mf", name: "Saint Martin" },
    { code: "mg", name: "Madagascar" },
    { code: "mh", name: "Marshall Islands" },
    { code: "mk", name: "North Macedonia" },
    { code: "ml", name: "Mali" },
    { code: "mm", name: "Myanmar" },
    { code: "mn", name: "Mongolia" },
    { code: "mo", name: "Macao" },
    { code: "mp", name: "Northern Mariana Islands" },
    { code: "mq", name: "Martinique" },
    { code: "mr", name: "Mauritania" },
    { code: "ms", name: "Montserrat" },
    { code: "mt", name: "Malta" },
    { code: "mu", name: "Mauritius" },
    { code: "mv", name: "Maldives" },
    { code: "mw", name: "Malawi" },
    { code: "mx", name: "Mexico" },
    { code: "my", name: "Malaysia" },
    { code: "mz", name: "Mozambique" },
    { code: "na", name: "Namibia" },
    { code: "nc", name: "New Caledonia" },
    { code: "ne", name: "Niger" },
    { code: "nf", name: "Norfolk Island" },
    { code: "ng", name: "Nigeria" },
    { code: "ni", name: "Nicaragua" },
    { code: "nl", name: "Netherlands" },
    { code: "no", name: "Norway" },
    { code: "np", name: "Nepal" },
    { code: "nr", name: "Nauru" },
    { code: "nu", name: "Niue" },
    { code: "nz", name: "New Zealand" },
    { code: "om", name: "Oman" },
    { code: "pa", name: "Panama" },
    { code: "pe", name: "Peru" },
    { code: "pf", name: "French Polynesia" },
    { code: "pg", name: "Papua New Guinea" },
    { code: "ph", name: "Philippines" },
    { code: "pk", name: "Pakistan" },
    { code: "pl", name: "Poland" },
    { code: "pm", name: "Saint Pierre and Miquelon" },
    { code: "pn", name: "Pitcairn" },
    { code: "pr", name: "Puerto Rico" },
    { code: "ps", name: "Palestine" },
    { code: "pt", name: "Portugal" },
    { code: "pw", name: "Palau" },
    { code: "py", name: "Paraguay" },
    { code: "qa", name: "Qatar" },
    { code: "re", name: "Réunion" },
    { code: "ro", name: "Romania" },
    { code: "rs", name: "Serbia" },
    { code: "ru", name: "Russian Federation" },
    { code: "rw", name: "Rwanda" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "sb", name: "Solomon Islands" },
    { code: "sc", name: "Seychelles" },
    { code: "sd", name: "Sudan" },
    { code: "se", name: "Sweden" },
    { code: "sg", name: "Singapore" },
    { code: "sh", name: "Saint Helena" },
    { code: "si", name: "Slovenia" },
    { code: "sj", name: "Svalbard and Jan Mayen" },
    { code: "sk", name: "Slovakia" },
    { code: "sl", name: "Sierra Leone" },
    { code: "sm", name: "San Marino" },
    { code: "sn", name: "Senegal" },
    { code: "so", name: "Somalia" },
    { code: "sr", name: "Suriname" },
    { code: "ss", name: "South Sudan" },
    { code: "st", name: "Sao Tome and Principe" },
    { code: "sv", name: "El Salvador" },
    { code: "sx", name: "Sint Maarten" },
    { code: "sy", name: "Syria" },
    { code: "sz", name: "Eswatini" },
    { code: "tc", name: "Turks and Caicos Islands" },
    { code: "td", name: "Chad" },
    { code: "tf", name: "French Southern Territories" },
    { code: "tg", name: "Togo" },
    { code: "th", name: "Thailand" },
    { code: "tj", name: "Tajikistan" },
    { code: "tk", name: "Tokelau" },
    { code: "tl", name: "Timor-Leste" },
    { code: "tm", name: "Turkmenistan" },
    { code: "tn", name: "Tunisia" },
    { code: "to", name: "Tonga" },
    { code: "tr", name: "Turkey" },
    { code: "tt", name: "Trinidad and Tobago" },
    { code: "tv", name: "Tuvalu" },
    { code: "tw", name: "Taiwan" },
    { code: "tz", name: "Tanzania" },
    { code: "ua", name: "Ukraine" },
    { code: "ug", name: "Uganda" },
    { code: "um", name: "United States Minor Outlying Islands" },
    { code: "us", name: "United States of America" },
    { code: "uy", name: "Uruguay" },
    { code: "uz", name: "Uzbekistan" },
    { code: "va", name: "Holy See (Vatican City)" },
    { code: "vc", name: "Saint Vincent and the Grenadines" },
    { code: "ve", name: "Venezuela" },
    { code: "vg", name: "Virgin Islands (British)" },
    { code: "vi", name: "Virgin Islands (U.S.)" },
    { code: "vn", name: "Vietnam" },
    { code: "vu", name: "Vanuatu" },
    { code: "wf", name: "Wallis and Futuna" },
    { code: "ws", name: "Samoa" },
    { code: "xk", name: "Kosovo" },
    { code: "ye", name: "Yemen" },
    { code: "yt", name: "Mayotte" },
    { code: "za", name: "South Africa" },
    { code: "zm", name: "Zambia" },
    { code: "zw", name: "Zimbabwe" },
  ];
  useEffect(() => {
    const handleResize = () => {
      setBreakpoints();
    };
    window.addEventListener("resize", handleResize);
    setBreakpoints();
    return () => window.removeEventListener("resize", handleResize);
  });

  const setBreakpoints = () => {
    const isSmallScreen = window.innerWidth <= 768;
    const isMediumScreen = window.innerWidth > 768 && window.innerWidth <= 992;
    if (isSmallScreen) {
      setDateRangeConfig(1, 30, 30);
    } else if (isMediumScreen) {
      setDateRangeConfig(2, 30, 60);
    } else {
      setDateRangeConfig(2, 40, 50);
    }
  };

  const setDateRangeConfig = (numberOfMonths, daysize) => {
    setNumberOfMonths(numberOfMonths);
    setDaySize(daysize);
  };

  const addRoom = () => {
    if (rooms.length < 6) {
      setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
    }
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const updatedRooms = [...rooms];
      updatedRooms.splice(index, 1);
      setRooms(updatedRooms);
    }
  };

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    if (field === "children") {
      updatedRooms[index].childrenAges = Array(value).fill(null); // Reset children ages
    }
    setRooms(updatedRooms);
  };

  const updateChildAge = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childrenAges[childIndex] = age;
    setRooms(updatedRooms);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate) {
      setFocusedInput(null);
      setCalVisible(false);
    } else if (startDate) {
      setFocusedInput("endDate");
    }
  };

  const toggleCalendar = (input) => {
    setCalVisible(!calVisible);
    if (!calVisible) {
      if (input === "startDate") {
        setFocusedInput("startDate");
      } else if (input === "endDate") {
        setFocusedInput("endDate");
      } else {
        setCalVisible(!calVisible);
        if (!calVisible) setFocusedInput("startDate");
        else setFocusedInput(null);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error(`Please fill out all fields ${startDate} ${endDate}`);
      return;
    }
    const formDataToPass = {
      ...formData,
      from: selectedCityId,
      city: selectedCityName,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: JSON.stringify(rooms), // Convert rooms array to JSON string
      residency: residency,
    };

    console.log("form data filled", {
      ...formData,
      from: selectedCityId,
      city: selectedCityName,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: rooms,
      residency: residency,
    });
    localStorage.setItem("hotelRoomsConfig", JSON.stringify(rooms));
    localStorage.setItem("hotelCin", startDate.format("YYYY-MM-DD"));
    localStorage.setItem("hotelCout", endDate.format("YYYY-MM-DD"));

    const queryString = new URLSearchParams(formDataToPass).toString();
    navigate(`/hotelmodify?${queryString}`);
  };
  const typingTimer = useRef(null);
  const handleInputChange = (value) => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    setSearchInput(value);
    SetClickDestination(true);
    setIsItemSelected(false);

    typingTimer.current = setTimeout(() => {
      if (value.length >= 3) {
        fetchDatas(value);
      } else {
        setCities2([]);
      }
    }, 300);
  };

  const [searchInput, setSearchInput] = useState("Enter City Name");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [cities2, setCities2] = useState([]);
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [destination1, setDestination1] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CityName"]}`);
    setSelectedCityId(`${city["id"]}`);
    setSelectedCityName(city["CityName"]); // if needed for display

    setSearchedHotel(`${city["CityName"]}`);
    SetClickDestination(false); // Close the city suggestion div
    setSearchInput(`${city["CityName"]} (${city["CountryName"]})`);
    setIsItemSelected(true);
    setDestination1(city);
  };

  const fetchDatas = async (value) => {
    try {
      setLoading(true);

      const response = await axios.post(`${BASE_URL}Hotel/CityList`, {
        city: value,
      });

      const json = response.data;

      if (!json?.data) {
        setCities2([]);
        return;
      }

      // ✅ Only priority + sort (NO FILTER)
      const results = json.data
        .map((user) => {
          let priority = 3;

          const city = user.CityName?.toLowerCase() || "";
          const country = user.CountryName?.toLowerCase() || "";
          const search = value.toLowerCase();

          if (city.includes(search)) priority = 1;
          else if (country.includes(search)) priority = 2;

          return { ...user, priority };
        })
        .sort((a, b) => a.priority - b.priority);

      setCities2(results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCities2([]);
    } finally {
      setLoading(false);
    }
  };
  // const fetchDatas = (value) => {
  //   fetch("https://admin.trustedfare.com/api/Hotel/CityList")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log("json responseee", json);
  //       const results = json.data
  //         .filter((user) => {
  //           return (
  //             user &&
  //             ((user.CityName &&
  //               user.CityName.toLowerCase().includes(value.toLowerCase())) ||
  //               (user.CountryName &&
  //                 user.CountryCode
  //                   .toLowerCase()
  //                   .includes(value.toLowerCase())) )
  //           );
  //         })
  //         .map((user) => {
  //           let priority = 3;

  //           if (
  //             user.CityName &&
  //             user.CityName.toLowerCase().includes(value.toLowerCase())
  //           ) {
  //             priority = 1;
  //           } else if (
  //             user.CountryName &&
  //             user.CountryName.toLowerCase().includes(value.toLowerCase())
  //           ) {
  //             priority = 2;
  //           }

  //           return { ...user, priority };
  //         })
  //         .sort((a, b) => a.priority - b.priority);

  //       console.log("RESULTS", results);
  //       setCities2(results);
  //     });
  // };

  const slides = [
    {
      backgroundImage:
        "https://www.harbourhotels.co.uk/media/d4ipp450/1c57cb2a162815dd23ef3db35d0e8521.jpg",
      overlayColor: "#05335536",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Search Hotels",
      overlayColor: "#190a0a",
      subtitle: "Smooth Hotel Booking, Unbeatable Low Prices",
    },
    {
      backgroundImage:
        "https://3.imimg.com/data3/FM/MD/MY-1906485/hotel-booking.jpg",
      overlayColor: "#190a0a",
      overlayColor: "#190a0a",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Unlock Exclusive Hotel Deals",
      subtitle:
        " Premium Stays, Corporate Rates, and Seamless Hospitality Solutions",
    },
    {
      backgroundImage:
        "https://www.harbourhotels.co.uk/media/d4ipp450/1c57cb2a162815dd23ef3db35d0e8521.jpg",
      overlayColor: "#190a0a",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Experience Hassle-Free Hotel Bookings",
      subtitle: "Premium Stays, and Unmatched Service – Only on TripGo",
    },
  ];

  return (
    <div className="bookimg_form_containerrr">
      <Helmet>
        <title>
          Hotel Booking | Luxury & Budget Hotels Worldwide - SkyPort
          Destinations
        </title>
        <meta
          name="description"
          content="Book luxury, budget, and business hotels worldwide with SkyPort Destinations. Compare hotel prices, explore top destinations, and enjoy secure online hotel booking with exclusive deals."
        />
        <meta
          name="keywords"
          content="hotel booking, cheap hotels, luxury hotels, budget hotels, online hotel booking, hotel deals, worldwide hotels, business hotels, family hotels, SkyPort Destinations hotels"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SkyPort Destinations" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Hotel Booking Worldwide | SkyPort Destinations"
        />
        <meta
          property="og:description"
          content="Find and book the best hotels worldwide with SkyPort Destinations. Compare prices and enjoy hassle-free hotel reservations online."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://trustedfare.com/hotel"
        />
        <meta
          property="og:image"
          content="https://trustedfare.com/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hotel Booking Worldwide | SkyPort Destinations"
        />
        <meta
          name="twitter:description"
          content="Book hotels online with exclusive deals and secure reservations at SkyPort Destinations."
        />
        <link rel="canonical" href="https://trustedfare.com/hotel" />
      </Helmet>
      <div style={{ position: "relative" }}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 50000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          style={{ height: "500px" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="backgroundBanner banner banner-image"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                data-v-0b3b4b19=""
                data-v-b9cf504c=""
              >
                <div
                  className=""
                  style={{
                    height: "100%",
                    backgroundColor: slide.overlayColor,
                    opacity: slide.overlayOpacity || "0.5",
                  }}
                ></div>

                {slide.imgMark && (
                  <img
                    src={slide.imgMark}
                    alt="img-mark"
                    className="img-mark"
                    data-v-0b3b4b19=""
                  />
                )}
                <h1 className="description" data-v-0b3b4b19="">
                  <div>{slide.title}</div>
                  <div>{slide.subtitle}</div>
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Container>
        <div className="flightWidgetSection appendBottom40">
          <div className="searchWidgetContainer">
            <form
              onSubmit={handleSubmit}
              data-cy="flightSW"
              className="fltWidgetSection appendBottom40 primaryTraveler "
            >
              <div className="makeFlex hrtlCenter">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div className="searchtabslist">
                    <ul className=" search_tabs">
                      <li className="tab-link ">
                        <Link className="tab-button" to="/">
                          <span>
                            <i className="fa-solid fa-plane-departure" />{" "}
                            Flight{" "}
                          </span>
                        </Link>
                      </li>
                      <li className="tab-link active">
                        <Link className="tab-button" to="/hotel">
                          <span>
                            {" "}
                            <i className="fa-solid fa-building" /> Hotel{" "}
                          </span>
                        </Link>
                      </li>

                      <li className="tab-link ">
                        <Link className="tab-button" to="/tour">
                          <span>
                            {" "}
                            <i className="fa-solid fa-umbrella-beach" />{" "}
                            Holidays{" "}
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="fsw ">
                <div className="fsw_inner returnPersuasion">
                  <div
                    className="flt_fsw_inputBox searchCity inactiveWidget "
                    style={{ width: "475px" }}
                  >
                    <label htmlFor="fromCity">
                      <span className="lbl_input appendBottom10 ">
                        Enter City Name, Location, or Specific hotel
                      </span>
                      <input
                        data-cy="fromCity"
                        id="fromCity"
                        type="text"
                        className="fsw_inputField lineHeight36 latoBlack font30"
                        readOnly=""
                        defaultValue="Delhi"
                        value={searchInput}
                        autoComplete="off"
                        onFocus={() => {
                          setSearchInput("");
                          setSearchedHotel("");
                          SetClickDestination(true);
                        }}
                        onBlur={() => {
                          if (isItemSelected) SetClickDestination(false);
                        }}
                        onChange={(e) => handleInputChange(e.target.value)}
                      />

                      <p
                        className="code makeRelative"
                        title="DEL, Delhi Airport India"
                      >
                        <span
                          data-cy="defaultFromValue"
                          title=""
                          className="truncate airPortName "
                        >
                          {searchedHotel}
                        </span>
                      </p>
                    </label>
                    <div style={{ position: "relative" }}>
                      <div
                        className="cityselect"
                        style={{
                          position: "absolute",
                          color: "black",
                          backgroundColor: "white",
                          padding: "10px",
                          border: "1px solid #e3e3e3",
                          display: clickDestination ? "block" : "none",
                          width: "100%",
                          zIndex: 9,
                          top: "-18px",
                          maxHeight: 300,
                          borderRadius: "8px",
                          overflow: "auto",
                          scrollbarWidth: "thin",
                        }}
                      >
                        {cities2.length !== 0 ? (
                          <>
                            {cities2.map((city, index) => (
                              <div
                                key={index}
                                style={{
                                  borderBottom: "1px solid grey",
                                  paddingBottom: 5,
                                  marginBottom: 5,
                                  cursor: "pointer",
                                }}
                                onClick={() => handleCitySelect(city)}
                              >
                                <Row>
                                  <Col md={1} style={{ alignItems: "center" }}>
                                    <FaCity
                                      size={22}
                                      style={{
                                        textAlign: "center",
                                        height: "100%",
                                        color: "#2d3290",
                                      }}
                                    />
                                  </Col>
                                  <Col md={11}>
                                    <Row>
                                      <div
                                        className="flightFromName"
                                        style={{
                                          color: "#2d3290",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {city.CityName}
                                        {/* ({city["AIRPORTCODE"]}) */}
                                      </div>
                                    </Row>
                                    <Row style={{ color: "grey" }}>
                                      <Col md={10} style={{ paddingRight: 0 }}>
                                        <div
                                          className="flightFromNameInner"
                                          style={{
                                            fontSize: 10,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {city.CountryName}
                                        </div>
                                      </Col>
                                      <Col md={2} style={{ paddingLeft: 0 }}>
                                        <div
                                          style={{
                                            textAlign: "center",
                                            fontWeight: "700",
                                            fontSize: 10,
                                          }}
                                        >
                                          {city.CountryCode}
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                          </>
                        ) : (
                          // <Spinner />
                          <div
                            style={{
                              padding: "10px 5px",
                              fontSize: "12px",
                              textAlign: "center",
                              margin: "auto",
                              width: "100%",
                            }}
                          >
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Please wait we are fetching city list...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flt_fsw_inputBox dates inactiveWidget ">
                    <label htmlFor="departure">
                      <span className="lbl_input appendBottom10">Check-In</span>
                      <input
                        data-cy="departure"
                        id="departure"
                        type="text"
                        className="fsw_inputField font20"
                        defaultValue="Monday, 3 Jun 2024"
                        onChange={handleChange}
                        value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                        readOnly
                        required
                        onClick={toggleCalendar}
                      />
                      <p
                        data-cy="departureDate"
                        className="blackText font20 code lineHeight36"
                      >
                        <span className="font30 latoBlack">
                          {startDate ? startDate.format("D") : "--"}{" "}
                        </span>
                        <span>
                          {startDate ? startDate.format("MMM") : "Month"}
                        </span>
                        <span className="shortYear">
                          {startDate ? startDate.format("YY") : ""}
                        </span>
                      </p>
                      <p data-cy="departureDay" className="code ">
                        {startDate ? startDate.format("dddd") : "Select a date"}
                      </p>
                    </label>
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "2000",
                      }}
                    >
                      {calVisible && (
                        <DayPickerRangeController
                          startDate={startDate}
                          endDate={endDate}
                          onDatesChange={handleDatesChange}
                          focusedInput={focusedInput}
                          onFocusChange={(focused) => setFocusedInput(focused)}
                          isOutsideRange={(day) =>
                            day.isBefore(moment(), "day")
                          } // Disable days before today
                          // renderDayContents={renderDayContents}
                          numberOfMonths={numberOfMonths} // Allow selecting a range of dates when active2 is true
                          daySize={daysize}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="flt_fsw_inputBox dates reDates inactiveWidget "
                    // style={{ opacity: active2 ? "1" : "0.3" }}
                  >
                    <div data-cy="returnArea">
                      <label
                        onChange={handleChange}
                        onClick={() => {
                          toggleCalendar("endDate");
                        }}
                        htmlFor="returnDate"
                      >
                        <span className="lbl_input appendBottom10">
                          Check-Out
                        </span>
                        <input
                          type="text"
                          id="returnDateInput"
                          name="returnDate"
                          className="fsw_inputField font20"
                          defaultValue="Monday, 3 Jun 2024"
                          onChange={handleChange}
                          value={endDate ? endDate.format("MM/DD/YYYY") : ""}
                          readOnly
                          onClick={() => {
                            toggleCalendar("endDate");
                          }}
                        />
                        <p
                          data-cy="departureDate"
                          className="blackText font20 code lineHeight36"
                          onClick={() => {
                            toggleCalendar("endDate");
                          }}
                        >
                          <span className="font30 latoBlack">
                            {endDate ? endDate.format("D") : "--"}{" "}
                          </span>
                          <span>
                            {endDate ? endDate.format("MMM") : "Month"}
                          </span>
                          <span className="shortYear">
                            {endDate ? endDate.format("YY") : ""}
                          </span>
                        </p>
                        <p data-cy="departureDay" className="code ">
                          {endDate ? endDate.format("dddd") : "Select a date"}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div
                    data-cy="flightTraveller"
                    className="flt_fsw_inputBox flightTravllers inactiveWidget "
                  >
                    <label htmlFor="travellers">
                      <span className="lbl_input appendBottom5">
                        Rooms &amp; Guests
                      </span>
                      <input
                        type="text"
                        placeholder={`${rooms.reduce(
                          (total, room) => total + room.adults + room.children,
                          0,
                        )} Persons in ${rooms.length} ${
                          rooms.length === 1 ? "Room" : "Rooms"
                        }`}
                        className="fsw_inputField font30 latoBlack"
                        readOnly=""
                        onClick={() => setLabelClicked(!labelClicked)}
                        defaultValue="0 Adult, 1 Children"
                      />
                      <p
                        onClick={() => setLabelClicked(!labelClicked)}
                        className="blackText font20 code lineHeight36"
                      >
                        <span className="appendRight10">
                          {`${rooms.reduce(
                            (total, room) =>
                              total + room.adults + room.children,
                            0,
                          )} Guest, ${rooms.length} ${
                            rooms.length === 1 ? "Room" : "Rooms"
                          }`}
                          &nbsp;
                          {/* </span> */}
                        </span>
                      </p>
                    </label>
                    <div
                      className="onlytraveller normaltraveller"
                      style={{
                        display: labelClicked ? "block" : "none",
                      }}
                    >
                      <ul className="traveller_list">
                        <li>
                          <div
                            className="list-persons-count"
                            style={{ marginBottom: "8px" }}
                          >
                            <ul className="traveller_list">
                              {rooms.map((room, index) => (
                                <li>
                                  <div className="list-persons-count">
                                    <div id="roomshtml">
                                      <div
                                        className="box"
                                        key={`divroom${index + 1}`}
                                        id={`divroom${index + 1}`}
                                      >
                                        <div className="roomTxt">
                                          <span>Room {index + 1}:</span>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginTop: "10px",
                                          }}
                                        >
                                          <div className="">
                                            <div className="txt">
                                              <span id="Label7">Adult</span>
                                              <div style={{ fontSize: "10px" }}>
                                                <em>(17+ years)</em>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="right pull-right">
                                            <div
                                              id="field1"
                                              className="right PlusMinusRow"
                                            >
                                              <Link
                                                type="button"
                                                id="Adults_room_1_1_minus"
                                                className="sub hoteladultclass"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "adults",
                                                    Math.max(
                                                      room.adults - 1,
                                                      1,
                                                    ),
                                                  )
                                                }
                                              >
                                                -
                                              </Link>
                                              <span
                                                id="Adults_room_1_1"
                                                className="PlusMinus_number"
                                              >
                                                {room.adults}
                                              </span>
                                              <Link
                                                type="button"
                                                id="Adults_room_1_1_plus"
                                                className="add hoteladultclass"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "adults",
                                                    Math.min(
                                                      room.adults + 1,
                                                      6,
                                                    ),
                                                  )
                                                }
                                              >
                                                +
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="spacer"></div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div className="">
                                            <span className="txt">
                                              <div id="Label9">
                                                Child <br />
                                                <div
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <em>(0-17 years)</em>
                                                </div>
                                              </div>
                                            </span>
                                          </div>
                                          <div className="right">
                                            <div
                                              id="field2"
                                              className="right PlusMinusRow"
                                            >
                                              <Link
                                                type="button"
                                                id="Children_room_1_1_minus"
                                                className="sub hotelchildclass"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "children",
                                                    Math.max(
                                                      room.children - 1,
                                                      0,
                                                    ),
                                                  )
                                                }
                                              >
                                                -
                                              </Link>
                                              <span
                                                id="Children_room_1_1"
                                                className="PlusMinus_number"
                                              >
                                                {room.children}
                                              </span>
                                              <Link
                                                type="button"
                                                id="Children_room_1_1_plus"
                                                className="add hotelchildclassss"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "children",
                                                    Math.min(
                                                      room.children + 1,
                                                      4,
                                                    ),
                                                  )
                                                }
                                              >
                                                +
                                              </Link>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="clear"></div>
                                        {room.children > 0 && (
                                          <div className="childresAgeTxt">
                                            Age(s) of Children
                                          </div>
                                        )}
                                        {room.childrenAges.map(
                                          (age, childIndex) => (
                                            <select
                                              key={childIndex}
                                              value={age || ""}
                                              onChange={(e) =>
                                                updateChildAge(
                                                  index,
                                                  childIndex,
                                                  e.target.value,
                                                )
                                              }
                                            >
                                              <option value="">Age</option>
                                              {[...Array(18)].map(
                                                (age, index) => (
                                                  <option
                                                    key={index}
                                                    value={age}
                                                  >
                                                    {index}
                                                  </option>
                                                ),
                                              )}
                                            </select>
                                          ),
                                        )}
                                        <div className="clear"></div>
                                      </div>
                                    </div>

                                    <Link
                                      id="addhotelRoom"
                                      to="#"
                                      className="cus_add_remove_btn addroom"
                                      style={{
                                        display:
                                          index === rooms.length - 1
                                            ? "inline-block"
                                            : "none",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        addRoom();
                                      }}
                                    >
                                      Add Room
                                    </Link>
                                    <Link
                                      id="removehotelRoom"
                                      to="#"
                                      className="cus_add_remove_btn removeroom"
                                      style={{
                                        display:
                                          rooms.length > 1
                                            ? "inline-block"
                                            : "none",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        removeRoom(index);
                                      }}
                                    >
                                      Remove Room
                                    </Link>
                                  </div>
                                </li>
                              ))}
                            </ul>

                            <Link
                              className="apply_btn"
                              onClick={(e) => {
                                e.preventDefault();
                                setLabelClicked(false);
                              }}
                            >
                              Done
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flt_fsw_inputBox dates reDates inactiveWidget search_flight_bookingsss ">
                    {" "}
                    <button className="mat-stroked-button" type="submit">
                      Search Hotel
                    </button>
                  </div>
                </div>
                <div className="makeFlex hrtlCenter appendBottom20 flightFare"></div>
                <div
                  className="flt_fsw_inputBox inactiveWidget"
                  style={{ width: "200px" }}
                >
                  <label>
                    <span className="lbl_input appendBottom10">Residency</span>

                    <select
                      className="fsw_inputField font20"
                      value={residency}
                      onChange={(e) => setResidency(e.target.value)}
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <WebOffer />
      {/* <ReasonsToBook/> */}
      <HotelsContainer />
      <SectionsHotel />
      <WhyBookUsNew bookusdata={bookusdata} />
      {/* <MobileApp
        backgroundImage="https://jaanveertoursandtravels.com/assets/img/product/tour/hotel.jpg"
        title="Download Our Mobile App"
        description="Book the flight ticket and hotel with the huge discount. Refer friends and get generous bonuses from theirs orders."
      /> */}
      <HotelChains />
      <AboutHome />
    </div>
  );
};

export default HotelSearchNew;

import React, { useEffect, useState } from "react";
import "./HotelModifyNew.css";
import { FaChevronLeft } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchFormMobile from "../../Hotel/HotelSearch/HotelSearchMobile/SearchFormMobile";

const HotelModifyForm = () => {
  const handleShowSearchForm = () => {
    setShowSearchFormMobile(true);
  };

  const handleHideSearchForm = () => {
    setShowSearchFormMobile(false);
  };

  const [showSearchFormMobile, setShowSearchFormMobile] = useState(false);
  const [labelClicked, setLabelClicked] = useState(false);
  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childrenAges: [] },
  ]);
  const [totalGuests, setTotalGuests] = useState(2);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from") || "";
      const city = queryParams.get("city");
  const startDateRaw = queryParams.get("startDate");
  const endDateRaw = queryParams.get("endDate");
  const startDate = startDateRaw ? moment(startDateRaw) : null;
  const endDate = endDateRaw ? moment(endDateRaw) : null;
const [residency, setResidency] = useState("gy");
  const [fromInput, setFromInput] = useState(from);
  const [startDateInput, setStartDateInput] = useState(
    startDate ? startDate.format("YYYY-MM-DD") : ""
  );
  const [endDateInput, setEndDateInput] = useState(
    endDate ? endDate.format("YYYY-MM-DD") : ""
  );
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
{ code: "zw", name: "Zimbabwe" }
];

  useEffect(() => {
    const roomsRaw = queryParams.get("rooms");
    if (roomsRaw) {
      try {
        const parsed = JSON.parse(roomsRaw);
        setRooms(parsed);
        const guests = parsed.reduce(
          (sum, r) => sum + (r.adults || 0) + (r.children || 0),
          0
        );
        setTotalGuests(guests);
      } catch (err) {
        console.error("Invalid rooms JSON", err);
      }
    }
  }, [location.search]);

  const updateRoom = (index, type, value) => {
    const newRooms = [...rooms];
    newRooms[index][type] = value;
    if (type === "children") {
      newRooms[index].childrenAges = Array(value).fill("");
    }
    setRooms(newRooms);
    setTotalGuests(newRooms.reduce((sum, r) => sum + r.adults + r.children, 0));
  };

  const updateChildAge = (roomIndex, childIndex, value) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].childrenAges[childIndex] = value;
    setRooms(newRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
  };

  const removeRoom = (index) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
    setTotalGuests(newRooms.reduce((sum, r) => sum + r.adults + r.children, 0));
  };

//   const handleSearch = () => {
//     const query = new URLSearchParams({
//       from: fromInput,
//       startDate: startDateInput,
//       endDate: endDateInput,
//       rooms: JSON.stringify(rooms),
//     }).toString();
// localStorage.setItem("hotelRoomsConfig", JSON.stringify(rooms));
//     navigate(`/hotelmodify?${query}`);
//   };

const handleSearch = () => {
  const query = new URLSearchParams({
    from: fromInput,
    startDate: startDateInput,
    endDate: endDateInput,
    rooms: JSON.stringify(rooms),
     residency: residency
  }).toString();

  localStorage.setItem("hotelRoomsConfig", JSON.stringify(rooms));
  navigate(`/hotelmodify?${query}`);
};



  const formattedFrom = from
    .split(",")
    .map((s) => s.trim())
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(", ");

  const handleDone = () => {
  
  setLabelClicked(false);
};



  return (
    <div className="hotelmodifysearch-Main">
      <div className="hotelmodifysearch">
        <img
          src="Images/flight_aero.png"
          alt=""
          style={{ width: "40px", marginRight: "10px" }}
        />

        <div className="hotelmodifysearchinputs" style={{ width: "30%" }}>
          <label className="hotelmodifylabelstyling">
            City name, Location or Specific hotel
          </label>
          <input
            type="text"
            className="hotelmodifyinputstyling"
            value={city}
            onChange={(e) => setFromInput(e.target.value)}
            placeholder="Enter city or hotel name"
          />
        </div>

        <div className="hotelmodifysearchinputs" style={{ width: "15%" }}>
          <label className="hotelmodifylabelstyling">Check-In</label>
          <input
            type="date"
            className="hotelmodifyinputstyling"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
          />
        </div>

        <div className="hotelmodifysearchinputs" style={{ width: "15%" }}>
          <label className="hotelmodifylabelstyling">Check-Out</label>
          <input
            type="date"
            className="hotelmodifyinputstyling"
            value={endDateInput}
            onChange={(e) => setEndDateInput(e.target.value)}
          />
        </div>

        <div
          className="hotelmodifysearchinputs"
          style={{ width: "15%", position: "relative" }}
        >
          <label className="hotelmodifylabelstyling">Rooms & Guests</label>
          <input
            type="text"
            className="hotelmodifyinputstyling"
            value={`${totalGuests} Guests, ${rooms.length} Room${
              rooms.length !== 1 ? "s" : ""
            }`}
            onClick={() => setLabelClicked(!labelClicked)}
            readOnly
          />

          {labelClicked && (
            <div className="onlytraveller normaltraveller" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, color:'black' }}>
              <ul className="traveller_list">
                <li>
                  <div className="list-persons-count" tyle={{marginBottom:'8px'}}><ul className="traveller_list">
                    {rooms.map((room, index) => (
                      <li key={index}>
                        <div className="list-persons-count">
                          <div id="roomshtml">
                        <div className="box ">
                          <div  className="roomTxt"><span>Room </span>{index + 1}:</div>
                        
                        <div >
                          <div className="hotel_adultStyling">
  <div className="txt">
    <span id="Label7">Adults</span>
    <div style={{ fontSize: "10px" }}>
      <em>(17+ years)</em>
    </div>
  </div>
 <div className="hotel_adultStyling_PlusMinus right PlusMinusRow">
   <div className="hotel_adultStyling_button-group">
    <button id="Adults_room_1_1_minus" className="sub hoteladultclass" onClick={() => updateRoom(index, 'adults', Math.max(room.adults - 1, 1))}><span class="PlusMinus_number">-</span></button>
    <span>{room.adults}</span>
    <button onClick={() => updateRoom(index, 'adults', Math.min(room.adults + 1, 6))}>+</button>
  </div>
 </div>
</div>                            
            </div>
                          <div className="hotel_childStyling ">
  <div className="hotel_childStyling_txt">
    <span id="Label9">Child</span>
    <div style={{ fontSize: "10px" }}>
      <em>(0–17 years)</em>
    </div>
  </div>
 <div>
   <div className="hotel_childStyling_button-group">
    <button onClick={() => updateRoom(index, 'children', Math.max(room.children - 1, 0))}>-</button>
    <span>{room.children}</span>
    <button onClick={() => updateRoom(index, 'children', Math.min(room.children + 1, 4))}>+</button>
  </div>
 </div>
</div>

                          {room.children > 0 && (
                            <div>
                              Age(s) of Children
                              {room.childrenAges.map((age, childIndex) => (
                                <select
                                  key={childIndex}
                                  value={age || ''}
                                  onChange={(e) => updateChildAge(index, childIndex, e.target.value)}
                                >
                                  <option value=''>Age</option>
                                  {[...Array(18)].map((_, i) => (
                                    <option key={i} value={i }>{i}</option>
                                  ))}
                                </select>
                              ))}
                            </div>
                          )}
</div>
</div>
                          {index === rooms.length - 1 && (
                            <div id="addhotelRoom"className="cus_add_remove_btn addroom" onClick={addRoom}>
                             Add Room
                            </div>
                          )}
                          {rooms.length > 1 && (
                            <div id="removehotelRoom"className="cus_add_remove_btn removeroom" onClick={() => removeRoom(index)}>Remove Room</div>
                          )}
                        
                      
                     
                      
                      </div>
                      </li>
                    ))}
                  <button className="apply_btn" onClick={handleDone}>
                    Done
                  </button>
                    
                  </ul>
                </div>
                </li>
              </ul>
            </div>
          )} 


          
        </div>

        <div style={{ width: "15%" }}>
          <button className="hotelmodifysearch-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
         <div className="flt_fsw_inputBox inactiveWidget" style={{width:"200px"}}>
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

      <div className="Hotel-reSearchForm">
        <Link to="/hotel" style={{ textDecoration: "none" }}>
          <div style={{ cursor: "pointer" }}>
            <span style={{ marginRight: "15px" }}>
              <FaChevronLeft style={{ fontSize: "14px", color: "white" }} />
            </span>
          </div>
        </Link>
        <div className="Hotel-reSearchFormStyling">
          <div className="Hotel-reSearchForm-InnerStyling">
            <div className="Hotel-reSearchForm-InnerdivStyling">
              {formattedFrom}
            </div>
            <div className="Hotel-reSearchForm-InnerdivStyling">
              {startDate ? startDate.format("MM/DD") : "--/--"}
            </div>
            <div
              className="Hotel-reSearchForm-InnerdivStyling"
              style={{ border: "none", display:"flex", alignItems:"center" }}
            >
              {totalGuests} <IoPerson />
            </div>
          </div>
          <div
            className="Hotel-reSearchForm-InnerdivStyling"
            style={{ border: "none" }}
            onClick={handleShowSearchForm}
          >
            CHANGE
          </div>
        </div>
      </div>

      {/* {showSearchFormMobile && (
        <div className='HotelSearchForm-Mobile'>
          <div className='HotelSearchForm-MobileIcon' onClick={handleHideSearchForm}>
            <RxCross2 style={{ borderRadius: '100px', background: 'white', width: '35px', height: '35px', padding: '5px' }} />
          </div>
          <SearchFormMobile />
        </div>
      )} */}
      {/* {showSearchFormMobile && (
  <div className='HotelSearchForm-Mobile'>
    <div className='HotelSearchForm-MobileIcon' onClick={handleHideSearchForm}>
      <RxCross2
        style={{
          borderRadius: '100px',
          background: 'white',
          width: '35px',
          height: '35px',
          padding: '5px',
        }}
      />
    </div>
    <SearchFormMobile />
  </div>
)} */}

      {showSearchFormMobile && (
        <div className="HotelSearchForm-Mobile">
          <div
            className="HotelSearchForm-MobileIcon"
            onClick={handleHideSearchForm}
          >
            <RxCross2
              style={{
                borderRadius: "100px",
                background: "white",
                width: "35px",
                height: "35px",
                padding: "5px",
              }}
            />
          </div>
          <SearchFormMobile onSearchComplete={handleHideSearchForm} />
        </div>
      )}
    </div>
  );
};

export default HotelModifyForm;

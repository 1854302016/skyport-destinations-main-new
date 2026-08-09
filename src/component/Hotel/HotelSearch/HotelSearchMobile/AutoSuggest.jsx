import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, ListGroup, Image } from "react-bootstrap";
import "./AutoSuggest.css";
import { FaCity } from "react-icons/fa";
import { Row, Col, Spinner } from "react-bootstrap";

const AutoSuggest = ({ initGeolocation, closeCityInput, handleCitySelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities2, setCities2] = useState([]);

  const fetchDatas = async (value) => {
    setLoading(true);
    setError(null);
    try {
      const requestData = {
        city: value,
      };

      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/Hotel/CityList",
        requestData,
      );

      const json = response.data;
      const results = json.data
        .filter((user) => {
          return (
            user &&
            ((user.CityName &&
              user.CityName.toLowerCase().includes(value.toLowerCase())) ||
              (user.CountryName &&
                user.CountryName.toLowerCase().includes(value.toLowerCase())))
          );
        })
        .map((user) => {
          let priority = 3;
          if (
            user.CityName &&
            user.CityName.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 1;
          } else if (
            user.CountryName &&
            user.CountryName.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 2;
          }
          return { ...user, priority };
        })
        .sort((a, b) => a.priority - b.priority);

      setCities2(results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch cities");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      fetchDatas(value.toLowerCase());
    } else {
      setCities2([]);
    }
  };

  const handleback = () => {
    setInputValue("");
    closeCityInput();
  };

  const handleAddAutoCity = (city) => {
    if (typeof city === "string") {
      handleCitySelect({ CityName: city, id: "" });
    } else {
      handleCitySelect(city);
    }
    setInputValue(city.CityName || city);
    closeCityInput();
    setSuggestions([]);
  };

  const guyanaCities = [
    { CityName: "Georgetown", CountryName: "Guyana", id: "123838" },
    { CityName: "Bartica", CountryName: "Guyana", id: "123841" },
    { CityName: "Linden", CountryName: "Guyana", id: "123840" },
    { CityName: "New Amsterdam", CountryName: "Guyana", id: "123839" },
    { CityName: "Anna Regina", CountryName: "Guyana", id: "135602" },
  ];

  return (
    <div className="rcnt-src-at" id="autosgt">
      <div className="autosugst_newblock" id="stickyheaderCal">
        <div className="fli-c-blv2">
          <div className="fli-m-bl">
            <div className="fullblock_topcol">
              <div
                className="arrBackWhite"
                id="backTosrch"
                onClick={handleback}
              ></div>
              <div className="group input_autosugst autosHead">Select City</div>
            </div>
            <div>
              <input
                type="text"
                className="input_autosugst_New"
                id="txtsearch"
                name="txtfrom"
                required
                placeholder="Enter City/Location/Hotel Name"
                autoComplete="off"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="auto_saugg" id="auto_saugg">
        <div className="mn-atu-pg">
          <ul id="mobFromhtml">
            {inputValue.length === 0 ? (
              <>
                <li
                  className="act-sr"
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginTop: "10px",
                  }}
                >
                  Popular Search in Guyana
                </li>
                {guyanaCities.map((city) => (
                  <li key={city.id} onClick={() => handleAddAutoCity(city)}>
                    <div className="dest-nm">
                      <span>{city.CityName}</span>
                      <span className="fnt-sz3">{city.CountryName}</span>
                    </div>
                  </li>
                ))}

                <li
                  className="act-sr"
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginTop: "10px",
                  }}
                >
                  Popular International Search
                </li>
                {[
                  {
                    CityName: "Dubai",
                    CountryName: "United Arab Emirates",
                    id: "dxb",
                  },
                  {
                    CityName: "Abu Dhabi",
                    CountryName: "United Arab Emirates",
                    id: "auh",
                  },
                  { CityName: "Singapore", CountryName: "Singapore", id: "sin" },
                  { CityName: "Bangkok", CountryName: "Thailand", id: "bkk" },
                ].map((city) => (
                  <li key={city.id} onClick={() => handleAddAutoCity(city)}>
                    <div className="dest-nm">
                      <span>{city.CityName}</span>
                      <span className="fnt-sz3">{city.CountryName}</span>
                    </div>
                  </li>
                ))}
              </>
            ) : loading ? (
              <li
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#666",
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
              </li>
            ) : cities2.length > 0 ? (
              cities2.map((city, index) => (
                <li key={index} onClick={() => handleAddAutoCity(city)}>
                  <div className="dest-nm">
                    <span>{city.CityName}</span>
                    <span className="fnt-sz3">{city.CountryName}</span>
                  </div>
                  <div className="dest-nm2">
                    <span>{city.CountryCode}</span>
                  </div>
                </li>
              ))
            ) : (
              inputValue.length >= 3 && (
                <li
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#666",
                  }}
                >
                  No Hotel Found
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AutoSuggest;

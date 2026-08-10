import { Form } from "react-bootstrap";
import { useState } from "react";

const BusCitySelection = ({
  code,
  name,
  setCity,
  closeCitySelection,
  orname,
  setDestination2,
  setDestination1,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [cities, setCities] = useState([]);

  const fetchDatas = (value) => {
    const payload = {
      city: value,
    };
    fetch("https://admin.trustedfare.com/api/Bus/City", payload)
      .then((response) => response.json())
      .then((json) => {
        const results = json.data
          .filter((user) => {
            return (
              user &&
              ((user.CityName &&
                user.CityName.toLowerCase().includes(value.toLowerCase())) ||
                (user.CityId &&
                  user.CityId.toLowerCase().includes(value.toLowerCase())))
            );
          })
          .map((user) => {
            let priority = 3;

            if (
              user.CityName &&
              user.CityName.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 1; // Highest priority for airport code matches
            } else if (
              user.CityId &&
              user.CityId.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 2; // Second priority for city name matches
            }

            return { ...user, priority };
          })
          .sort((a, b) => a.priority - b.priority);

        setCities(results);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    if (value.length === 3) {
      fetchDatas(value); // Call API only when length is exactly 3
    } else {
      setCities([]); // Clear the city list for any other input length
    }
  };

  const handleValueFrom = (
    selectedValue,
    labelId,
    labelDepartureId,
    labelDepartId
  ) => {
    // Implement logic for handling selected value
  };

  const handleClearTextFromMul = (inputId) => {
    // Implement logic for clearing text from input
  };

  const handleOnSectorPressKeyV1 = (inputId) => {
    // Implement logic for handling key press on input
  };

  const handleOnSectorPressKeyV2 = (inputId, event) => {
    // Implement logic for handling key press on input with event
  };

  const handleCitySelection = (code, name, country, cityy) => {
    const city = {
      code: code,
      name: name,
    };
    setCity(city);
    closeCitySelection();

    if (orname === "origin") {
      setDestination1(cityy);
    } else {
      setDestination2(cityy);
    }
  };

  const popularCities = [
    {
      code: "DEL",
      name: "New Delhi, India",
      airport: "Indira Gandhi Intl Airport",
    },
    {
      code: "BLR",
      name: "Bangalore, India",
      airport: "Kempegowda International Airport",
    },
    {
      code: "BOM",
      name: "Mumbai, India",
      airport: "Chhatrapati Shivaji Airport",
    },
    {
      code: "CCU",
      name: "Kolkata, India",
      airport: "Netaji S. Chandra Airport",
    },
    { code: "GOI", name: "Goa, India", airport: "Dabolim Airport" },
  ];

  return (
    <div className="bx_f2" id="divDepartauto" style={{}}>
      <div className="main_frm_f2" style={{ top: 0 }}>
        <div className="cntnt_f3_d">
          <div className="in_34">
            <div className="autosugst_newblock">
              <div className="fli-c-blv2">
                <div className="fli-m-bl">
                  <div className="fullblock_topcol">
                    <div
                      className="arrBackWhite"
                      id="backTosrch"
                      onClick={closeCitySelection}
                    ></div>
                    <div className="group input_autosugst autosHead">
                      Select {orname} City
                    </div>
                  </div>
                  <div>
                    <Form>
                      <a onClick={() => handleClearTextFromMul("mobFromhtml")}>
                        <input
                          type="text"
                          id="FromSector1Auto"
                          className="input_autosugst_New ac_input"
                          autoComplete="off"
                          onChange={handleInputChange}
                          placeholder="Enter city or airport name"
                        />
                      </a>
                      {/* <input
                        type="text"
                        id="FromSector1"
                        className="input_autosugst_New ac_input"
                        autoComplete="off"
                        onKeyDown={() => handleClearTextFromMul("mobFromhtml")}
                        onKeyUp={() => handleOnSectorPressKeyV1("FromSector1")}
                        placeholder="Enter city or airport name"
                        style={{ display: "none" }}
                      /> */}
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            <div className="auto_saugg" id="auto_saugg">
              <div className="mn-atu-pg">
                <ul id="mobFromhtml">
                  {/* {popularCities.map((city) => (
                    <li
                      key={city.code}
                      onClick={() => handleCitySelection(city.code, city.name)}
                    >
                      <div className="dest-nm">
                        <span>{city.name}</span>
                        <span className="fnt-sz3"> {city.airport}</span>
                      </div>
                      <div className="dest-nm2">
                        <span>{city.code}</span>
                      </div>
                    </li>
                  ))} */}

                  {cities.map((city) => (
                    <li
                      key={city.CityName}
                      onClick={() =>
                        handleCitySelection(
                          city.CityId,
                          city.CityName,

                          city
                        )
                      }
                    >
                      <div className="dest-nm">
                        <span>{`${city.CityName}`}</span>
                        {/* <span className="fnt-sz3"> {city.AIRPORTNAME}</span> */}
                      </div>
                      <div className="dest-nm2">
                        {/* <span>{city.AIRPORTCODE}</span> */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="clr"></div>
      </div>
      <div className="blc_brd3"></div>
      <div className="clr"></div>
    </div>
  );
};

export default BusCitySelection;

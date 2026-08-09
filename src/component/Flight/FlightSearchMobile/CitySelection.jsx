import { Form } from "react-bootstrap";
import "./CitySelection.css";
import { useState, useEffect } from "react";
import axios from "axios";

const CitySelection = ({
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
  const [staticAirportCities, setStaticAirportCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load static airport data from Airports.js file
  useEffect(() => {
    const loadStaticAirports = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL || ""}/Airports.js`,
          { cache: "no-store" }
        );
        const scriptText = await response.text();

        // Transform the script to extract the airportCities array
        const transformed = scriptText
          .replace(/^[\s\S]*?export\s+const\s+airportCities\s*=\s*/m, "return ")
          .replace(/;\s*$/, ";");
        const parser = new Function(transformed);
        const airports = parser();

        if (Array.isArray(airports)) {
          setStaticAirportCities(airports);
        }
      } catch (e) {
        console.error("Error loading static airport data:", e);
      }
    };
    loadStaticAirports();
  }, []);

  // Filter and rank airports based on search value
  const filterAndRankAirports = (airports, value) => {
    const v = (value || "").toLowerCase();
    if (!v) return [];
    return airports
      .filter((airport) => {
        return (
          airport &&
          ((airport.CITYNAME &&
            String(airport.CITYNAME).toLowerCase().includes(v)) ||
            (airport.AIRPORTNAME &&
              String(airport.AIRPORTNAME).toLowerCase().includes(v)) ||
            (airport.AIRPORTCODE &&
              String(airport.AIRPORTCODE).toLowerCase().includes(v)) ||
            (airport.CITYCODE &&
              String(airport.CITYCODE).toLowerCase().includes(v)) ||
            (airport.COUNTRYNAME &&
              String(airport.COUNTRYNAME).toLowerCase().includes(v)))
        );
      })
      .map((airport) => {
        let priority = 4;
        if (
          airport.AIRPORTCODE &&
          String(airport.AIRPORTCODE).toLowerCase().includes(v)
        ) {
          priority = 1;
        } else if (
          airport.CITYNAME &&
          String(airport.CITYNAME).toLowerCase().includes(v)
        ) {
          priority = 2;
        } else if (
          airport.AIRPORTNAME &&
          String(airport.AIRPORTNAME).toLowerCase().includes(v)
        ) {
          priority = 3;
        } else if (
          airport.COUNTRYNAME &&
          String(airport.COUNTRYNAME).toLowerCase().includes(v)
        ) {
          priority = 4;
        }
        return { ...airport, priority };
      })
      .sort((a, b) => a.priority - b.priority);
  };

  const fetchDatas = async (value) => {
    setIsLoading(true);
    try {
      const requestData = {
        city: value,
      };

      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/airport",
        requestData
      );

      // If API returns JSON directly in response.data
      const json = response.data;
      console.log("json responseee", json);
      const results = json.data
        .filter((user) => {
          return (
            user &&
            ((user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.AIRPORTNAME &&
                user.AIRPORTNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.CITYCODE &&
                user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
              (user.COUNTRYNAME &&
                user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())) ||
              (user.COUNTRYCODE &&
                user.COUNTRYCODE.toLowerCase().includes(value.toLowerCase())) ||
              (user.AIRPORTCODE &&
                user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())))
          );
        })
        .map((user) => {
          let priority = 3;

          if (
            user.AIRPORTCODE &&
            user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 1; // Highest priority for airport code matches
          } else if (
            user.CITYNAME &&
            user.CITYNAME.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 2; // Second priority for city name matches
          } else if (
            user.COUNTRYNAME &&
            user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 3; // Third priority for country name matches
          }

          return { ...user, priority };
        })
        .sort((a, b) => a.priority - b.priority);

      setCities(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const typed = value || "";
    const lower = typed.trim().toLowerCase();
    setSearchInput(typed);

    if (lower.length < 3) {
      setCities([]);
      setIsLoading(false);
      return;
    }

    // Try static data first
    const staticMatches = filterAndRankAirports(staticAirportCities, lower);
    if (staticMatches.length > 0) {
      setCities(staticMatches);
      setIsLoading(false);
      return;
    }

    // Fallback to API if no static matches
    fetchDatas(lower);
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
    console.log("cututsifsdfsdhf", city);
    if (orname === "origin") {
      setDestination1(cityy);
    } else {
      setDestination2(cityy);
    }
  };

  const popularAirports = [
    // Local / Domestic Guyana
    {
      AIRPORTCODE: "GEO",
      AIRPORTNAME: "Cheddi Jagan International Airport",
      CITYCODE: "GEO",
      CITYNAME: "Georgetown",
      COUNTRYNAME: "Guyana",
      COUNTRYCODE: "GY",
      isTopCity: true,
      category: "domestic",
    },
    {
      AIRPORTCODE: "OGL",
      AIRPORTNAME: "Eugene F. Correia International Airport",
      CITYCODE: "OGL",
      CITYNAME: "Georgetown (Ogle)",
      COUNTRYNAME: "Guyana",
      COUNTRYCODE: "GY",
      isTopCity: true,
      category: "domestic",
    },
    // Guyana Popular International
    {
      AIRPORTCODE: "JFK",
      AIRPORTNAME: "John F. Kennedy International Airport",
      CITYCODE: "NYC",
      CITYNAME: "New York",
      COUNTRYNAME: "United States",
      COUNTRYCODE: "US",
      isTopCity: true,
      category: "international",
    },
    {
      AIRPORTCODE: "MIA",
      AIRPORTNAME: "Miami International Airport",
      CITYCODE: "MIA",
      CITYNAME: "Miami",
      COUNTRYNAME: "United States",
      COUNTRYCODE: "US",
      isTopCity: true,
      category: "international",
    },
    {
      AIRPORTCODE: "YYZ",
      AIRPORTNAME: "Toronto Pearson International Airport",
      CITYCODE: "YYZ",
      CITYNAME: "Toronto",
      COUNTRYNAME: "Canada",
      COUNTRYCODE: "CA",
      isTopCity: true,
      category: "international",
    },
    {
      AIRPORTCODE: "POS",
      AIRPORTNAME: "Piarco International Airport",
      CITYCODE: "POS",
      CITYNAME: "Port of Spain",
      COUNTRYNAME: "Trinidad and Tobago",
      COUNTRYCODE: "TT",
      isTopCity: true,
      category: "international",
    },
    {
      AIRPORTCODE: "BGI",
      AIRPORTNAME: "Grantley Adams International Airport",
      CITYCODE: "BGI",
      CITYNAME: "Bridgetown",
      COUNTRYNAME: "Barbados",
      COUNTRYCODE: "BB",
      isTopCity: true,
      category: "international",
    },
    {
      AIRPORTCODE: "PBM",
      AIRPORTNAME: "Johan Adolf Pengel International Airport",
      CITYCODE: "PBM",
      CITYNAME: "Paramaribo",
      COUNTRYNAME: "Suriname",
      COUNTRYCODE: "SR",
      isTopCity: true,
      category: "international",
    },
    {
      AIRPORTCODE: "PTY",
      AIRPORTNAME: "Tocumen International Airport",
      CITYCODE: "PTY",
      CITYNAME: "Panama City",
      COUNTRYNAME: "Panama",
      COUNTRYCODE: "PA",
      isTopCity: true,
      category: "international",
    },
    {
      AIRPORTCODE: "LHR",
      AIRPORTNAME: "London Heathrow Airport",
      CITYCODE: "LON",
      CITYNAME: "London",
      COUNTRYNAME: "United Kingdom",
      COUNTRYCODE: "GB",
      isTopCity: true,
      category: "international",
    },
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
                  {/* <li className="act-sr">Search Cities</li> */}

                  {cities.length === 0 &&
                  !isLoading &&
                  searchInput.length < 3 ? (
                    <>
                      <li
                        className="act-sr"
                        style={{
                          fontSize: "14px",
                          color: "#666",
                          marginTop: "10px",
                        }}
                      >
                        Popular Domestic Cities
                      </li>
                      {popularAirports
                        .filter((airport) => airport.category === "domestic")
                        .map((airport) => (
                          <li
                            key={airport.AIRPORTCODE}
                            onClick={() =>
                              handleCitySelection(
                                airport.AIRPORTCODE,
                                airport.CITYNAME,
                                airport.COUNTRYCODE,
                                airport
                              )
                            }
                          >
                            <div className="dest-nm">
                              <span>{`${airport.CITYNAME}, ${airport.COUNTRYNAME}`}</span>
                              <span className="fnt-sz3">
                                {" "}
                                {airport.AIRPORTNAME}
                              </span>
                            </div>
                            <div className="dest-nm2">
                              <span>{airport.AIRPORTCODE}</span>
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
                        Popular International Cities
                      </li>
                      {popularAirports
                        .filter(
                          (airport) => airport.category === "international"
                        )
                        .map((airport) => (
                          <li
                            key={airport.AIRPORTCODE}
                            onClick={() =>
                              handleCitySelection(
                                airport.AIRPORTCODE,
                                airport.CITYNAME,
                                airport.COUNTRYCODE,
                                airport
                              )
                            }
                          >
                            <div className="dest-nm">
                              <span>{`${airport.CITYNAME}, ${airport.COUNTRYNAME}`}</span>
                              <span className="fnt-sz3">
                                {" "}
                                {airport.AIRPORTNAME}
                              </span>
                            </div>
                            <div className="dest-nm2">
                              <span>{airport.AIRPORTCODE}</span>
                            </div>
                          </li>
                        ))}
                    </>
                  ) : cities.length > 0 ? (
                    cities.map((city) => (
                      <li
                        key={city.AIRPORTCODE}
                        onClick={() =>
                          handleCitySelection(
                            city.AIRPORTCODE,
                            city.CITYNAME,
                            city.COUNTRYCODE,
                            city
                          )
                        }
                      >
                        <div className="dest-nm">
                          <span>{`${city.CITYNAME}, ${city.COUNTRYNAME}`}</span>
                          <span className="fnt-sz3"> {city.AIRPORTNAME}</span>
                        </div>
                        <div className="dest-nm2">
                          <span>{city.AIRPORTCODE}</span>
                        </div>
                      </li>
                    ))
                  ) : isLoading ? (
                    <li
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#666",
                      }}
                    >
                      Loading airports...
                    </li>
                  ) : (
                    <li
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#666",
                      }}
                    >
                      No matching airports found
                    </li>
                  )}
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

export default CitySelection;

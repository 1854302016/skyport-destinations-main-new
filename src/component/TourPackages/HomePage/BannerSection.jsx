import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./css/BannerSection.css";

const BannerSection = () => {
  const [destination, setDestination] = useState("");
  const [isAutoSuggestVisible, setIsAutoSuggestVisible] = useState(false);
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const backgroundImages = [
    "./Images/tour/kerala_newbb.png",
    "./Images/tour/kashmir-banner-home.webp",
    "./Images/tour/australia-banner-home.webp",
    "./Images/tour/dubai_newbb.png",
  ];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "https://admin.trustedfare.com/api/HolidayPackages/destinations"
        );
        const result = await response.json();
        if (result.success) {
          setTrendingDestinations(result.data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.trim() === "") {
      setFilteredDestinations([]);
      return;
    }

    const filtered = trendingDestinations.filter((dest) =>
      dest.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDestinations(filtered);
    setIsAutoSuggestVisible(true);
  };

  const handleDestinationSelect = (dest) => {
    setDestination(dest.name);
    setIsAutoSuggestVisible(false);
    setFilteredDestinations([]);
    window.location.href = `/tour/${dest.slug}`;
  };

  const handleSearchClick = () => {
    if (destination.trim() === "") return;
    const matched = trendingDestinations.find(
      (dest) => dest.name.toLowerCase() === destination.toLowerCase()
    );
    if (matched) {
      window.location.href = `/tour/${matched.slug}`;
    } else {
      window.location.href = `/tour/${destination
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
    }
  };

  return (
    <>
      <div className="holiday-banner-slider-wrapper">
        {/* <div
                  className=""
                  style={{
                    height: "100%",
                    backgroundColor: '#190a0a',
                    opacity: "0.5",
                  }}
                ></div> */}
        <Slider {...settings} className="background-slider">
          {backgroundImages.map((img, idx) => (
            <div key={idx}>
              <div
                className="holiday-banner"
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Container>
                  <h2
                    style={{
                      fontSize: "70px",
                      fontWeight: "bold",
                      fontFamily: "Parisienne",
                    }}
                  >
                    Tour Packages with SkyPort Destinations
                  </h2>
                  <p style={{ fontSize: "22px", marginTop: "10px" }}>
                    Plan Your Dream Vacation With Us
                  </p>

                  <div className="search_box_prnt">
                    <div className="search_box_wrapper">
                      <div className="search_box">
                        <img
                          src="https://images.emtcontent.com/holiday-img/home-img/search.svg"
                          alt="holidays"
                        />
                        <input
                          type="text"
                          placeholder="Enter Your Dream Destination!"
                          autoComplete="off"
                          value={destination}
                          onChange={handleInputChange}
                          onFocus={() => {
                            setIsAutoSuggestVisible(true);
                            if (destination.trim() === "") {
                              setFilteredDestinations(trendingDestinations);
                            }
                          }}
                          onBlur={() =>
                            setTimeout(
                              () => setIsAutoSuggestVisible(false),
                              200
                            )
                          }
                        />
                        <button
                          className="subm_btn"
                          type="button"
                          onClick={handleSearchClick}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                    {isAutoSuggestVisible &&
                      filteredDestinations.length > 0 && (
                        <div className="auto_sgtn">
                          <div
                            className="d-flex align-items-center"
                            style={{ padding: "10px 15px", gap: "15px" }}
                          >
                            <img
                              src="https://images.emtcontent.com/holiday-img/home-img/cir_loc.svg"
                              alt="location"
                            />
                            <span>
                              <strong>Top Trending</strong> Holiday Destinations
                            </span>
                          </div>
                          <ul className="auto_sgtn_ul">
                            {filteredDestinations.map((dest, index) => (
                              <li
                                key={index}
                                className="d-flex align-items-center"
                                onClick={() => handleDestinationSelect(dest)}
                              >
                                <a className="d-flex align-items-center">
                                  <div className="img_box ulimg">
                                    <img
                                      src={dest.image}
                                      alt={dest.name}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                          "https://images.emtcontent.com/holiday-img/home-img/city-100x.png";
                                      }}
                                    />
                                  </div>
                                  <div className="cont">
                                    <p>{dest.name}</p>
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </Container>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Static Section below the banner */}

      <div className="pckg_sec_prnt text-center">
        <Container>
          <div className="row travel_section_Scroll">
            <div className="col-xxl-9 col-xl-10 col-lg-12 col-12 mx-auto d-block">
              <ul className="pckg_sec d-inflex align-items-center">
                <li>
                  <Link to="/tour/fixed-group-departure">
                    <img
                      src="https://images.emtcontent.com/holiday-img/home-img/grpdept-holsm.png"
                      alt="Group Departure"
                    />
                    <span>Group Departure</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tour/honeymoon">
                    <img
                      src="https://images.emtcontent.com/holiday-img/home-img/honymn_holsm.png"
                      alt="Honeymoon"
                    />
                    <span>Honeymoon</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tour/family">
                    <img
                      src="https://images.emtcontent.com/holiday-img/home-img/pilgrimage-holsm.png"
                      alt="Pilgrimage"
                    />
                    <span>Family</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tour/beaches">
                    <img
                      src="https://images.emtcontent.com/holiday-img/home-img/ayurveda-holsm.png"
                      alt="Ayurveda"
                    />
                    <span>Beaches</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tour/ladies-special">
                    <img
                      src="https://images.emtcontent.com/holiday-img/home-img/leisure-holsm.png"
                      alt="Luxury"
                    />
                    <span>Luxury</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tour/adventure">
                    <img
                      src="https://images.emtcontent.com/holiday-img/home-img/advntu-holsm.png"
                      alt="Adventure"
                    />
                    <span>Adventure</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BannerSection;

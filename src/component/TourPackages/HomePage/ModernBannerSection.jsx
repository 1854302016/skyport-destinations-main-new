import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import "./css/ModernBanner.css";

const ModernBannerSection = () => {
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

  // Fetch destinations on component mount
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

  // Handle input change for search
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

  // Handle destination selection from dropdown
  const handleDestinationSelect = (dest) => {
    setDestination(dest.name);
    setIsAutoSuggestVisible(false);
    setFilteredDestinations([]);
    window.location.href = `/tour/${dest.slug}`;
  };

  // Handle search button click
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

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const categories = [
    {
      name: "Group Departure",
      icon: "https://images.emtcontent.com/holiday-img/home-img/grpdept-holsm.png",
      link: "/tour/fixed-group-departure"
    },
    {
      name: "Honeymoon",
      icon: "https://images.emtcontent.com/holiday-img/home-img/honymn_holsm.png",
      link: "/tour/honeymoon"
    },
    {
      name: "Family",
      icon: "https://images.emtcontent.com/holiday-img/home-img/pilgrimage-holsm.png",
      link: "/tour/family"
    },
    {
      name: "Beaches",
      icon: "https://images.emtcontent.com/holiday-img/home-img/ayurveda-holsm.png",
      link: "/tour/beaches"
    },
    {
      name: "Luxury",
      icon: "https://images.emtcontent.com/holiday-img/home-img/leisure-holsm.png",
      link: "/tour/ladies-special"
    },
    {
      name: "Adventure",
      icon: "https://images.emtcontent.com/holiday-img/home-img/advntu-holsm.png",
      link: "/tour/adventure"
    }
  ];

  return (
    <>
      {/* Hero Banner with Slider */}
      <div className="modern-banner-wrapper">
        <Slider {...settings} className="modern-banner-slider">
          {backgroundImages.map((img, idx) => (
            <div key={idx}>
              <div
                className="modern-banner-slide"
                style={{
                  backgroundImage: `url('${img}')`,
                }}
              >
                <div className="modern-banner-overlay"></div>
                <Container>
                  <div className="modern-banner-content">
                    <h1 className="modern-banner-title">
                      Travel. Relax. Discover.
                    </h1>
                    <p className="modern-banner-subtitle">
                      Plan Your Dream Vacation With Trusted Fare
                    </p>

                    {/* Modern Search Box */}
                    <div className="modern-search-container">
                      <div className="modern-search-box">
                        <div className="modern-search-icon">
                          <FaSearch />
                        </div>
                        <input
                          type="text"
                          className="modern-search-input"
                          placeholder="Enter Your Dream Destination!"
                          autoComplete="off"
                          value={destination}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
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
                          className="modern-search-button"
                          type="button"
                          onClick={handleSearchClick}
                        >
                          Search
                        </button>

                        {/* Auto Suggest Dropdown */}
                        {isAutoSuggestVisible &&
                          filteredDestinations.length > 0 && (
                            <div className="modern-autosuggest">
                              <div className="modern-autosuggest-header">
                                <FaMapMarkerAlt />
                                <strong>Top Trending</strong> Holiday Destinations
                              </div>
                              <ul className="modern-autosuggest-list">
                                {filteredDestinations.slice(0, 6).map((dest, index) => (
                                  <li
                                    key={index}
                                    className="modern-autosuggest-item"
                                    onClick={() => handleDestinationSelect(dest)}
                                  >
                                    <div className="modern-autosuggest-image">
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
                                    <div className="modern-autosuggest-content">
                                      <p className="modern-autosuggest-name">
                                        {dest.name}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Category Pills Section */}
      <div className="modern-category-section">
        <div className="modern-category-container">
          <div className="modern-category-pills">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="modern-category-pill"
              >
                <div className="modern-category-icon">
                  <img src={category.icon} alt={category.name} />
                </div>
                <span className="modern-category-text">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernBannerSection;

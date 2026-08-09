import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HotelModifyNew.css";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { Link } from "react-router-dom";
import HotelListSkeleton from "./HotelListSkeleton";
import FlightListSkeleton from "../../Flight/FlightList/FlightListSkeleton";
import HotelLoader from "../HotelLoader/HotelLoader";
import HotelNotFound from "../HotelNotFound/HotelNotFound";
import HotelSkeleton from "./HotelSkeleton";
import HotelImagesGallery from "./HotelImagesPopup";
import { FaStar } from "react-icons/fa";

function HotelListingModifyNew({hotel}) {
  const [hotelViewBtn, setHotelViewBtn] = useState(null);
  const navigate = useNavigate();
    const loading = useSelector((state) => state.hotel.loading);
    const[showGallary, setShowGallery] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedHotelName, setSelectedHotelName] = useState("");
   const handleImageClick = (images, name) => {
  setSelectedImages(images);
  setSelectedHotelName(name);
  setShowGallery(true);
};
    
  const handleViewButtonClick = (hotelId, rooms) => {
    console.log("HOTEL ID AND ROOMS ", hotelId, rooms);
    localStorage.setItem("hotelId", hotelId);
    localStorage.setItem("payload", JSON.stringify(rooms));

    setHotelViewBtn(hotelId);
    navigate("/hoteldetailsmain");
  };
 
  return (
    <>
      {loading ? (
        <HotelSkeleton />
      ) :
      hotel && hotel.length !== 0 ? (
        <div>
          {hotel.map((item) => (
            <div className="hotelListingstyling">
              <div className="hotelListingstyling-Container">
                <Row>
                  <Col md={4} className="hotelListingstyling-img">
                    <div
                      className="main-image-container"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={
                          item.images && item.images[0] ? item.images[0] : "https://www.hogastjob.com/_Resources/Static/Packages/Hogast.Jobportal/images/company-placeholder.jpg"
                        }
                        alt=""
                        style={{
                          borderRadius: "5px",
                          height:
                            item.images && item.images[0]
                              ? window.innerWidth < 768
                                ? "190px"
                                : "150px"
                              : "235px",
                          // height: window.innerWidth < 768 ? "190px" : "150px",
                          objectFit: "cover",
                          objectPosition: "center center",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(item.images, item.name)}
                      />
                      {item.images && item.images.length > 1 && (
                        <div className="image-gallery-indicator">
                          <span className="gallery-count">
                            +{item.images.length - 1}
                          </span>
                        </div>
                      )}
                    </div>

                    {item.images && item.images.length > 1 && (
                      <div className="imgcolmns_hotel">
                        {item.images[1] && (
                          <span className="inrimgsec">
                            <img
                              alt="Thumb Img"
                              src={item.images[1]}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleImageClick(item.images, item.name)
                              }
                            />
                          </span>
                        )}

                        {item.images[2] && (
                          <span className="inrimgsec ng-star-inserted">
                            <img
                              alt="Thumb Img"
                              src={item.images[2]}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleImageClick(item.images, item.name)
                              }
                            />
                          </span>
                        )}

                        {item.images[3] && (
                          <span className="inrimgsec ng-star-inserted">
                            <img
                              src={item.images[3]}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleImageClick(item.images, item.name)
                              }
                            />
                          </span>
                        )}

                        {item.images[4] && (
                          <span className="inrimgsec ng-star-inserted">
                            <img src={item.images[4]} />
                            <span
                              className="vwallimg"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleImageClick(item.images, item.name)
                              }
                            
                            >
                              View All
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                  </Col>
                  <Col md={5} className="hotelListingstyling-img">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="AltAccoRatingsRenderer-styles__HotelTag-sc-614b7d7a-0 fAFCux">
                        <div className="AltAccoRatingsRenderer-styles__HotelStarRating-sc-614b7d7a-1 gWfoeC">
                          <span>{item.star}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 17 16"
                            width="1rem"
                            height="1rem"
                            margin="0 0.2rem 0 0"
                            className="HappyRatingStarIcon-sc-934f1d6d-0 huwVyb"
                          >
                            <path
                              fillRule="evenodd"
                              d="m8.172 13.282 3.964 2.434c.726.446 1.614-.213 1.423-1.047l-1.05-4.577 3.505-3.084c.64-.562.296-1.629-.545-1.696l-4.613-.398L9.051.589c-.325-.785-1.432-.785-1.757 0L5.489 4.904l-4.613.398C.036 5.37-.31 6.436.33 6.999l3.505 3.083-1.05 4.577c-.191.834.697 1.494 1.423 1.048l3.963-2.425z"
                            />
                          </svg>
                        </div>
                        <span className="AltAccoRatingsRenderer-styles__PropertyLabel-sc-614b7d7a-2 gPwZKh">
                          {item.kind}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flexWrap: "nowrap",
                      }}
                    >
                      <div
                        className="hotelListingstyling-name"
                        title={item.name}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "300px",
                        }}
                      >
                        {item.name}
                      </div>
                    </div>

                    <div className="hotel-Address">
                      {/* <CiLocationOn /> <span>{item.city},{item.country}</span> */}
                      <CiLocationOn />{" "}
                      <span title={item.address}>{item.address}</span>
                    </div>
                    <div className="Amenties_and_Freecancellation">
<div className="amenities">
  {(() => {
    const facilities = item.facilities || [];

    const firstTwo = facilities.slice(0, 2);
    const remaining = facilities.slice(2);

    return (
      <>
        {/* Show FIRST TWO facilities */}
        <div className="amenitiesss">
          {firstTwo.map((f, i) => (
            <div className="free_amenities" key={i}>
              {f.name}
            </div>
          ))}
        </div>

        {/* + MORE */}
        {remaining.length > 0 && (
          <div className="more-container">
            <div className="free_amenities more-btn">+ more</div>

            <div className="more-details">
              {remaining.map((f, j) => (
                <div
                  className="free_amenities"
                  key={j}
                >
                 
                     {f.name}
                   
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  })()}
</div>
                    <div className="hotel-freecancellation">
                        
                        {/* {" "}
                       {item.Rooms[0].IsRefundable === true ? "Refundable"  : "Non-Refundable"} */}
                        {item.Rooms?.[0]?.MealType &&
                             item.Rooms[0].MealType.toLowerCase().includes("breakfast") && (
                                <div className="">Free Breakfast</div>
                            )}
                      </div>
                    </div>
                    <div
                      className="PersuasionTextWithImageUI__PersuasionTextWrapperDiv-sc-1663bfa1-0 cDtVtC"
                      style={{ color: "rgb(255, 109, 56)" }}
                    >
                      <img
                        src="https://go-assets.ibcdn.com/u/GI/images/1720953427381-coupleFreindlyV2.png"
                        alt=""
                        data-testid=""
                        loading="lazy"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: "rgb(255, 109, 56)",
                          marginRight: "5px",
                        }}
                      />
                      <span style={{ fontSize: "12px" }}>Couple Friendly</span>
                    </div>


                    <div className="PersuasionsUnif-styles__PersuasionUIElementsWrapper-sc-984d18fd-0 kpiDMy">
                      <img
                        src="https://gos3.ibcdn.com/Inclusion_Icon_Revamped_SRP-1673507159.png"
                        alt=""
                        data-testid=""
                        loading="lazy"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: "rgb(70, 72, 77)",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        className="PersuasionTextUI__PersuasionTextWrapperSpan-sc-33168a02-1 bdcGAt"
                        style={{ color: "rgb(70, 72, 77)", fontSize: "12px" }}
                      >
                        {item.Rooms[0].IsRefundable === true
                          ? "Refundable"
                          : "Non-Refundable"}
                      </span>
                    </div>
                    <div className="PersuasionsUnif-styles__PersuasionUIElementsWrapper-sc-984d18fd-0 kpiDMy">
                      <img
                        src="https://gos3.ibcdn.com/Inclusion_Icon_Revamped_SRP-1673507159.png"
                        alt=""
                        data-testid=""
                        loading="lazy"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: "rgb(70, 72, 77)",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        className="PersuasionTextUI__PersuasionTextWrapperSpan-sc-33168a02-1 bdcGAt"
                        style={{ color: "rgb(70, 72, 77)", fontSize: "12px" }}
                      >
                        {item.Rooms[0].has_breakfast
                          ? "Breakfast available"
                          : "Breakfast available at extra charges"}
                        
                      </span>
                    </div>
                    <div className="PersuasionsUnif-styles__PersuasionUIElementsWrapper-sc-984d18fd-0 kpiDMy">
                      <img
                        src="https://gos3.ibcdn.com/Inclusion_Icon_Revamped_SRP-1673507159.png"
                        alt=""
                        data-testid=""
                        loading="lazy"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: "rgb(70, 72, 77)",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        className="PersuasionTextUI__PersuasionTextWrapperSpan-sc-33168a02-1 bdcGAt"
                        style={{ color: "rgb(70, 72, 77)", fontSize: "12px" }}
                      >
                      
                         {item.Rooms[0].MealType} 
                      </span>
                    </div>
                    
                  </Col>
                  <Col
                    md={3}
                    className="hotelListingstyling-img hotelListingstyling_hotelRatings"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div>
                      <div className="hotel-numberic-ratingMain">
                        <div className="hotel-numberic-rating">
                         
                          <div className="rating-score rating-score-inNum">
                            {item.star}
                          </div>
                        </div>
                        <div>
                        
                          <div className="real-pricing">
                            $ {Math.round(item.Rooms[0].TotalFare)}{" "}
                          </div>
                          <div className="hotel-taxesFees">
                            + $ {Math.round(item.Rooms[0].TotalTax)} Taxes &
                            fees
                          </div>
                         
                          
                        </div>
                      </div>
                      
                      <Link to="/hoteldetailsmain">
                        <button
                          onClick={() =>
                            handleViewButtonClick(item.hotelCode_string, item.payload)
                          }
                          className="hotel-viewRoom-btn"
                        >
                          View Room
                        </button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
             
            </div>
            
          ))}
           <HotelImagesGallery
 show={showGallary}
    onClose={() => setShowGallery(false)}
    images={selectedImages} 
    name={selectedHotelName}
/>
        </div>
      ) : (
        // <> <HotelListSkeleton/> <HotelListSkeleton/> <HotelListSkeleton/></>
        // <HotelLoader/>
        <HotelNotFound />
      )}
    </>
  );
}

export default HotelListingModifyNew;

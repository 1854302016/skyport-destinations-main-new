import React, { useState } from "react";
import { Modal, Button, Carousel, Alert } from "react-bootstrap";
import {
  FaTimes,
  FaUserAlt,
  FaChalkboard,
  FaBath,
  FaHandHoldingUsd,
  FaWifi,
  FaGlassMartiniAlt,
  FaSnowflake,
  FaTv,
  FaConciergeBell,
  FaPaw,
  FaCaretRight,
} from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import "./CustomModal.css";
import { TbPointFilled } from "react-icons/tb";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import axios from "axios";

const CustomModal = ({ show, handleClose, roomGroup, id }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [lightboxImages, setLightboxImages] = useState([]);

  const validateImage = (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => resolve(image);
      img.onerror = () => resolve(null);
    });
  };

  const openLightbox = async (images) => {
    const validImages = await Promise.all(
      images.map((img) => validateImage(img))
    );
    setLightboxImages(
      validImages.filter((img) => img).map((img) => ({ src: img.url }))
    );
    setLightboxIndex(0);
  };

  // const validateImage =()=>{};
  // const openLightbox =()=>{};
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingUrl, setBookingUrl] = useState(null);

  const checkAvailability = async (optionId) => {
    setLoading(true);
    setError(null);
    setAvailability(null);
    setBookingUrl(null);

    const requestData = {
      hotelId: id,
      optionId: optionId,
    };

    try {
      const response = await axios.post(
        "https://admin.skyportdestinations.com/api/hotelTJ/hotel_review",
        requestData
      );
      const data = response.data.data;
      console.log("response data for flight review", response.data.data);

      if (
        !data.status.success &&
        data.alerts &&
        data.alerts.length > 0 &&
        data.alerts.some((alert) => alert.type !== "SOLDOUT") &&
        data.alerts.some((alert) => alert.type === "FAREALERT")
      ) {
        setError("Service exception / Not available.");
      } else if (
        data.alerts &&
        data.alerts.length > 0 &&
        data.alerts.some((alert) => alert.type === "SOLDOUT")
      ) {
        setError("The selected option is no longer available.");
      } else if (
        data.alerts &&
        data.alerts.length > 0 &&
        data.alerts.some((alert) => alert.type === "FAREALERT")
      ) {
        const fareAlert = data.alerts.find(
          (alert) => alert.type === "FAREALERT"
        );
        setAvailability(
          `Price has changed. Old fare: ${fareAlert.oldFare}, New fare: ${fareAlert.newFare}`
        );
      } else {
        setBookingUrl(`/hotel/booking/${id}/${optionId}`);
      }
    } catch (error) {
      console.log("error mssg in review", error);
      setError("An error occurred while checking availability.");
    }

    setLoading(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      className="ajax-modal-container"
    >
      <div className="ajax-loader" style={{ display: "none" }}>
        <div className="ajax-loader-circle"></div>
      </div>
      <div id="ajax-modal" className="fl-wrap">
        <div className="ajax-modal-wrap fl-wrap">
          <Button
            className="ajax-modal-close"
            onClick={() => {
              handleClose();
              setLoading(false);
              setError(null);
              setAvailability(null);
              setBookingUrl(null);
            }}
          >
            <FaTimes />
          </Button>

          {/* <Button className="ajax-modal-close ajax-modal-close2 ">
            {roomGroup.length} options
          </Button> */}

          <div className="ajax-modal-item fl-wrap">
            <Carousel>
              {roomGroup.map((option, index) => (
                <Carousel.Item key={index}>
                  <div className="ajax-modal-media fl-wrap">
                    <img
                      src={option.ris[0].imgs && option.ris[0].imgs[0].url}
                      onClick={() => openLightbox(option.ris[0].imgs)}
                      alt=""
                    />
                    <div className="ajax-modal-title">
                      <div className="section-title-separator">
                        <span></span>
                      </div>
                      {option.ris[0].rt}
                    </div>
                    <div
                      className="ajax-modal-photos-btn dynamic-gal"
                      onClick={() => openLightbox(option.ris[0].imgs)}
                    >
                      Photos (<span>{option.ris[0].imgs.length}</span>)
                    </div>
                  </div>
                  <div className="ajax-modal-list fl-wrap">
                    <ul className="features_list">
                      <li className="feature">
                        <FaUserAlt />
                        <h5>
                          <span>{option.ris[0].adt}</span> Adult
                        </h5>
                        <h5>
                          <span>{option.ris[0].chd}</span> Child
                        </h5>
                      </li>
                      <li className="feature">
                        <FaChalkboard />
                        <h5>
                          <span>
                            {option.ris[0].rexb.SERVICE &&
                              option.ris[0].rexb.SERVICE[0].values[0]}
                          </span>
                        </h5>
                      </li>
                      <li className="feature">
                        <BiSolidOffer />
                        <h5>
                          <span>
                            {option.ris[0].rexb.PROMOTION &&
                              option.ris[0].rexb.PROMOTION[0].values[0]}
                          </span>
                        </h5>
                      </li>
                      <li className="feature">
                        <FaHandHoldingUsd />
                        <h5>
                          <span>INR {option.tp}</span>
                        </h5>
                      </li>
                    </ul>
                  </div>
                  <div className="ajax-modal-details fl-wrap">
                    <div className="ajax-modal-details-box">
                      <h3>Details</h3>
                      <p>{option.ris[0].des}</p>
                    </div>
                    <div className="ajax-modal-details-box">
                      <h3>Room Amenities</h3>
                      <div className="listing-features fl-wrap">
                        <ul>
                          {option.ris[0].rexb.BENEFIT[0].values.map(
                            (facility, index) => (
                              <li>
                                {/* <FaWifi /> */}
                                <TbPointFilled />
                                {facility}
                                {/* <span>Free WiFi</span> */}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <Button
                      onClick={() => checkAvailability(option.id)}
                      className="btn float-btn color2-bg"
                      disabled={loading}
                    >
                      Check Availability <FaCaretRight />
                    </Button>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            {error && <Alert variant="danger">{error}</Alert>}
            {availability && <Alert variant="info">{availability}</Alert>}
            {bookingUrl && (
              <Button href={bookingUrl} className="btn float-btn color2-bg">
                Book Now <FaCaretRight />
              </Button>
            )}
          </div>
        </div>
      </div>
      <Lightbox
        slides={lightboxImages}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
      />
    </Modal>
  );
};

export default CustomModal;

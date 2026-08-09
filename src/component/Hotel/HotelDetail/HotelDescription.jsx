import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { TbPointFilled } from "react-icons/tb";
import {
  FaRocket,
  FaWifi,
  FaParking,
  FaSnowflake,
  FaPlane,
  FaPaw,
  FaUtensils,
  FaWheelchair,
  FaShareAlt,
  FaHeart,
  FaBookmark,
  FaTaxi,
  FaCocktail,
  FaUsers,
  FaBed,
  FaSearch,
  FaPlay,
  FaBath,
  FaTv,
  FaConciergeBell,
  FaCaretRight,
  FaSmokingBan,
  FaCalendarCheck,
  FaReply,
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaAngleDown,
  FaCaretDown,
  FaHandPointRight,
} from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import "./HotelDescription.css";
import HotelDetail from "./HotelDetail";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import CustomModal from "./CustomModal";

const HotelDescription = ({ isSticky, hotelDetails, id }) => {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState([]);


  useEffect(() => {
    const validateImages = async () => {
      const validImages = await Promise.all(
        hotelDetails.img.map((image) => validateImage(image))
      );
      setImages(validImages.filter((img) => img));
    };

    validateImages();
  }, [hotelDetails]);

  const validateImage = (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => resolve(image);
      img.onerror = () => resolve(null);
    });
  };

  const slides = images.map((image) => ({
    src: image.url,
  }));

  const handleClick = (index) => {
    setIndex(index);
  };

  const groupedRooms = hotelDetails.ops.reduce((acc, room) => {
    // Use the room type as the key
    const key = room.ris[0].rt; 
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(room);
    return acc;
  }, {});

  console.log("grouped rooms", groupedRooms);

  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedRooms, setExpandedRooms] = useState({});

  const toggleDescription = (roomType) => {
    setExpandedRooms((prevExpandedRooms) => ({
      ...prevExpandedRooms,
      [roomType]: !prevExpandedRooms[roomType],
    }));
  };

  const [selectedRoomGroup, setSelectedRoomGroup] = useState([]);

  const getShortDescription = (description) => {
    const words = description && description.split(" ");
    if (words && words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return description;
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (roomGroup) => {
    setSelectedRoomGroup(roomGroup);
    setShow(true);
  };

  return (
    <div className="list-single-main-container">
      <div className="fixed-scroll-column">
        <div
          className={`fixed-scroll-column-item fl-wrap scroll-to-fixed-fixed ${
            isSticky ? "stickyy" : ""
          }`}
        >
          {/* <Container> */}
          <div className="showshare sfcs fc-button">
            <FaShareAlt />
            {/* <span>Share </span> */}
          </div>
          <div className="share-holder fixed-scroll-column-share-container">
            <div className="share-container  isShare">
              <a
                href="http://www.facebook.com/share.php?u=http%3A%2F%2Feasybook.kwst.net%2Flisting-single.html%23"
                title="Share this page on facebook"
                className="pop share-icon share-icon-facebook"
              ></a>
              <a
                href="http://pinterest.com/pin/create/button/?url=http%3A%2F%2Feasybook.kwst.net%2Flisting-single.html%23&amp;media=&amp;description="
                title="Share this page on pinterest"
                className="pop share-icon share-icon-pinterest"
              ></a>
              <a
                href="https://plusone.google.com/_/+1/confirm?hl=en&amp;url=http%3A%2F%2Feasybook.kwst.net%2Flisting-single.html%23"
                title="Share this page on googleplus"
                className="pop share-icon share-icon-googleplus"
              ></a>
              <a
                href="https://twitter.com/share?via=in1.com&amp;text=Easybook - Hotel Booking Directory Listing Template"
                title="Share this page on twitter"
                className="pop share-icon share-icon-twitter"
              ></a>
              <a
                href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Feasybook.kwst.net%2Flisting-single.html%23&amp;title=Easybook - Hotel Booking Directory Listing Template&amp;summary=&amp;source=in1.com"
                title="Share this page on linkedin"
                className="pop share-icon share-icon-linkedin"
              ></a>
            </div>
          </div>
          <a className="fc-button custom-scroll-link" href="#sec6">
            <MdRateReview />
            {/* <span>Add review </span> */}
          </a>
          <a className="fc-button" href="#">
            <FaHeart />
            {/* <span>Save</span> */}
          </a>
          <a className="fc-button" href="booking-single.html">
            <FaBookmark />
            {/* <span> Book Now </span> */}
          </a>
          {/* </Container> */}
        </div>
        <div
          className="divvvv"
          style={{
            display: "block",
            width: "50px",
            height: "216px",
            float: "none",
          }}
        ></div>
      </div>

      <div className="list-single-main-media fl-wrap">
        <Row>
          {images.slice(0, 5).map((image, index) => (
            <Col
              sm={6}
              md={4}
              className="gallery-item"
              key={index}
              style={{ padding: "5px" }}
            >
              <Card onClick={() => handleClick(index)}>
                <Card.Img
                  variant="top"
                  src={image.url}
                  className="fixed-size-img"
                />
              </Card>
            </Col>
          ))}
          {images.length > 6 && (
            <Col
              sm={6}
              md={4}
              className="gallery-item"
              style={{ padding: "5px", position: "relative" }}
            >
              <Card onClick={() => handleClick(5)}>
                <Card.Img
                  variant="top"
                  src={images[5].url}
                  className="fixed-size-img"
                />
                <div className="overlay">
                  <div className="text">{images.length - 6}+ more</div>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />

      <div className="list-single-facts fl-wrap"></div>

      <div className="list-single-main-item fl-wrap">
        <div className="list-single-main-item-title fl-wrap">
          <h3>About Hotel</h3>
          <FaCaretDown />
        </div>

        {Object.entries(
          JSON.parse(hotelDetails.des.replace(/(\r\n|\n|\r)/gm, ""))
        ).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace("_", " ").toUpperCase()}:</strong> {value}
          </p>
        ))}
        {/* <Button
          href="https://vimeo.com/70851162"
          variant="primary"
          className="btn flat-btn color-bg big-btn float-btn image-popup">
          Video Presentation
          <FaPlay />
        </Button> */}
        {/* </div> */}
        {/* </Card> */}
      </div>

      <div className="list-single-main-item fl-wrap" id="sec3">
        {/* <Card> */}
        {/* <Card.Body> */}
        <div className="list-single-main-item-title fl-wrap">
          <h3>Amenities</h3>
          <FaCaretDown />
        </div>
        <div className="listing-features fl-wrap">
          <ul>
            {hotelDetails.fl.map((feature, index) => (
              <li key={index}>
                <TbPointFilled />
                {"  "}
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <span className="fw-separator"></span>
        <div className="list-single-main-item-title no-dec-title fl-wrap">
          <h3>Tags</h3>
        </div>
        <div className="list-single-tags tags-stylwrap">
          {hotelDetails.pops[0].fc.map((pops, index) => (
            <a>{pops}</a>
          ))}
        </div>
        {/* </Card.Body> */}
        {/* </Card> */}
      </div>

      <div className="list-single-main-item fl-wrap" id="sec4">
        <div className="list-single-main-item-title fl-wrap">
          <h3>Available Rooms</h3>
          <FaCaretDown />
        </div>
        <div className="rooms-container fl-wrap">
          {/* Room 1 */}
          {Object.entries(groupedRooms).map(([roomType, options]) => (
            <div key={roomType}>
              {/* {options.map((room, index) => ( */}
              <div className="rooms-item fl-wrap">
                <div className="rooms-media">
                  <img
                    src={
                      options[0].ris[0].imgs && options[0].ris[0].imgs[0].url
                    }
                    alt=""
                  />
                  {/* <div
                className="dynamic-gal more-photos-button"
                data-dynamicpath="[{'src': 'images/gal/slider/1.jpg'}, {'src': 'images/gal/slider/2.jpg'},{'src': 'images/gal/slider/3.jpg'}]">
                View Gallery <span>3 photos</span>{" "}
                <i className="far fa-long-arrow-right"></i>
              </div> */}
                </div>
                <div className="rooms-details">
                  <div className="rooms-details-header fl-wrap">
                    <h3>{options[0].ris[0].rt}</h3>
                    <span className="rooms-price" style={{ position: "unset" }}>
                      INR {options[0].tp} <strong> / person</strong>
                    </span>
                    {/* <h5>
                        Max Guests: <span>3 persons</span>
                      </h5> */}
                      <h5>
                        Available Options: <span>{options.length}</span>
                      </h5>
                  </div>
                  <p>
                    {expandedRooms[roomType]
                      ? options[0].ris[0].des
                      : getShortDescription(options[0].ris[0].des)}
                    {options[0].ris[0].des &&
                      options[0].ris[0].des.split(" ").length > 15 && (
                        <span
                          onClick={() => toggleDescription(roomType)}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          {expandedRooms[roomType]
                            ? " Read less"
                            : " Read more"}
                        </span>
                      )}
                  </p>
                  <div className="facilities-list fl-wrap">
                    {/* <ul>
                      {options[0].ris[0].fcs.map((facility, index) => (
                        <li>
                          <TbPointFilled />
                          {facility}
                        </li>
                      ))}
                    </ul> */}
                    <a
                      // href="/hotel/booking"
                      onClick={() => handleShow(options)}
                      className="btn color-bg ajax-link"
                      style={{ position: "unset" }}
                    >
                      Book Now
                      <FaCaretRight />
                    </a>
                  </div>
                </div>
              </div>
              {/* ))} */}
            </div>
          ))}
        </div>
      </div>
      <CustomModal show={show} handleClose={handleClose}  roomGroup={selectedRoomGroup} id={id}/>
    </div>
  );
};

export default HotelDescription;

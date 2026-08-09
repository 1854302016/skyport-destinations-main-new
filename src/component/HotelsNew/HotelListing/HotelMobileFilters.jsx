import React from "react";
import "./HotelMobileFilters.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { MdSort } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

function HotelMobileFilters({ toggleFilter }) {
  return (
    <div className="Hotel-menuContainerMain" style={{ position: "relative" }}>
      <div className="Hotel-menuContainer">
        <div
          className="hotelFilter-menuItem"
          onClick={() => toggleFilter("filter")}
        >
          <FaFilter className="hotel-menuIcons" />
          Filter
        </div>
        <div
          className="hotelFilter-menuItem"
          onClick={() => toggleFilter("rating")}
        >
          <IoIosStar className="hotel-menuIcons" />
          Rating
        </div>
        <div
          className="hotelFilter-menuItem"
          onClick={() => toggleFilter("price")}
        >
          <RiMoneyRupeeCircleFill className="hotel-menuIcons" />
          Price
        </div>
        <div
          className="hotelFilter-menuItem"
          onClick={() => toggleFilter("location")}
        >
          <MdLocationOn className="hotel-menuIcons" /> Location
        </div>
        <div
          className="hotelFilter-menuItem"
          onClick={() => toggleFilter("sort")}
        >
          <MdSort className="hotel-menuIcons" />
          Sort
        </div>
      </div>
    </div>
  );
}

export default HotelMobileFilters;

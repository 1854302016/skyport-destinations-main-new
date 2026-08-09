import React from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LuBaggageClaim } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { Row, Col } from "react-bootstrap";
import "./BusVoucher.css";

const BusVoucher = () => {
  return (
    <div className="bus-voucher-container">
      <div className="voucher-header">
        <div className="voucher-header-left">
          <h2>Booking Confirmed</h2>
          <p>Booking ID: <strong>BUS123456789</strong></p>
          <p>Booking Date: 30 Jul 2025</p>
        </div>
        <div className="voucher-header-right">
          <h5>Passenger: John Doe</h5>
          <p>Phone: 9876543210</p>
          <p>Email: johndoe@example.com</p>
        </div>
      </div>

      <div className="bus-details">
        <h3>Rajdhani Travels</h3>
        <p><CiLocationOn /> Delhi to Jaipur</p>
        <p>Bus Type: AC Sleeper</p>
      </div>

      <div className="travel-details">
        <Row>
          <Col md={4}>
            <div className="travel-box">
              <h6>Boarding</h6>
              <p>01 Aug 2025</p>
              <p>8:30 PM</p>
              <p>Kashmere Gate, Delhi</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="travel-box">
              <h6>Dropping</h6>
              <p>02 Aug 2025</p>
              <p>5:00 AM</p>
              <p>Sindhi Camp, Jaipur</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="travel-box">
              <h6>Seat & Coach</h6>
              <p>Seat: 12L</p>
              {/* <p>Coach: A</p> */}
            </div>
          </Col>
        </Row>
      </div>

      <div className="amenities">
        <h5>Inclusions</h5>
        <ul>
          <li><IoMdCheckboxOutline className="icon" /> Blanket</li>
          <li><IoMdCheckboxOutline className="icon" /> Water Bottle</li>
          <li><IoMdCheckboxOutline className="icon" /> Charging Point</li>
          <li><LuBaggageClaim className="icon" /> Luggage Storage</li>
        </ul>
      </div>

      <div className="passenger-info">
        <h5>Passenger Details</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Seat No.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Male</td>
              <td>32</td>
              <td>12L</td>
            </tr>
            <tr>
              <td>Jane Doe</td>
              <td>Female</td>
              <td>30</td>
              <td>12U</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="invoice">
        <h5>Invoice Summary</h5>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Base Fare</td>
              <td className="text-end">₹ 1,200</td>
            </tr>
            <tr>
              <td>Taxes & Fees</td>
              <td className="text-end">₹ 180</td>
            </tr>
            <tr>
              <td><strong>Total Amount</strong></td>
              <td className="text-end"><strong>₹ 1,380</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusVoucher;

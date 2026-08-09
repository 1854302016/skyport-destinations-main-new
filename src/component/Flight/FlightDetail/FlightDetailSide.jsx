import React from "react";
import Skeleton from "react-loading-skeleton";
import { Row, Col } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";
const FlightDetailSide = () => {
  return (
    <div className="flightBookingsecDiv">
      <Row className="flightBookingSecDivRow3">
        <Col xs={12} md={12}>
          <span className="lbl">
            <Skeleton />
          </span>{" "}
          <Skeleton />
          <span className="val">
            <Skeleton />
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div
            className="d-flex gap-2"
            style={{ height: "4vh", marginBlock: "auto" }}
          >
            <span className="">
              {" "}
              <Skeleton width={200} />
            </span>{" "}
            -{" "}
            <span className="">
              {" "}
              <Skeleton width={50} />
            </span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={12}>
          <div
            className="d-flex gap-2"
            style={{ height: "4vh", marginBlock: "auto" }}
          >
            <span className="">
              {" "}
              <Skeleton width={200} />
            </span>{" "}
            -{" "}
            <span className="">
              {" "}
              <Skeleton width={50} />
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div
            className="d-flex gap-2"
            style={{ height: "4vh", marginBlock: "auto" }}
          >
            <span className="">
              {" "}
              <Skeleton width={200} />
            </span>{" "}
            -{" "}
            <span className="">
              {" "}
              <Skeleton width={50} />
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div
            className="d-flex gap-2"
            style={{ height: "4vh", marginBlock: "auto" }}
          >
            <span className="">
              {" "}
              <Skeleton width={200} />
            </span>{" "}
            -{" "}
            <span className="">
              {" "}
              <Skeleton width={50} />
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div
            className="d-flex gap-2"
            style={{ height: "4vh", marginBlock: "auto" }}
          >
            <span className="">
              {" "}
              <Skeleton width={200} />
            </span>{" "}
            -{" "}
            <span className="">
              {" "}
              <Skeleton width={50} />
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div
            className="d-flex gap-2"
            style={{ height: "4vh", marginBlock: "auto" }}
          >
            <span className="">
              {" "}
              <Skeleton width={200} />
            </span>{" "}
            -{" "}
            <span className="">
              {" "}
              <Skeleton width={50} />
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <Skeleton />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <Skeleton />
        </Col>
      </Row>
    </div>
  );
};

export default FlightDetailSide;

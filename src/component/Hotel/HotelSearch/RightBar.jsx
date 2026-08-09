import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BiSolidOffer } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import Slider from "react-slick";
import { data, settings } from "./HotelSearchData";

const RightBar = () => {
  return (
    <Col md={3}>
      <Row>
        <Col md={12} className="resp-mt-20">
          <Card
            className="dashboardbox dashboxcolor2"
            style={{ marginBottom: "5px" }}
          >
            <Card.Body style={{ padding: "0px" }}>
              <h2 className="boxheading boxheadcolor2" style={{color:"#fff"}}>
                My Wallet
                <FaWallet style={{ float: "right", fontSize: "18px" }} />
              </h2>
              <div className="dashinnerbox">
                <ul className="creditlist">
                  <li>
                    <label>Profile Credit Limit:</label> USD 0.00
                  </li>
                  <li>
                    <label>Wallet Balance:</label> USD 0.00
                  </li>
                </ul>
              </div>
            </Card.Body>
            <Card.Footer
              className="text-muted"
              style={{ paddingInline: "5px" }}
            >
              <Card.Text
                style={{
                  color: "white",
                  fontSize: "14px",
                  textWrap: "wrap",
                  overflow: "ellipsis",
                }}
              >
                Available Credit Limit:{" "}
                <span className="float-right">USD 0.00</span>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
        <div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <BiSolidOffer size={22} style={{ color: "#2d3290" }} />
            <div style={{ fontSize: "18px", fontWeight: "500" }}>
              {" "}
              More Offer
            </div>
          </div>
          <Slider {...settings} className="mb-3">
            {/* <SwiperSlide className=''> */}
            {/* {data.map((item, id) => (
              <Reuse key={id} url={item.img} />
            ))} */}
          </Slider>
        </div>
        {/* <div>More Offer</div> */}
      </Row>
      {/* </div> */}
      {/* </div> */}
    </Col>
  );
};

export default RightBar;

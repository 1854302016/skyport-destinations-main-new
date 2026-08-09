import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BiSolidOffer } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import Slider from "react-slick";
import { data, settings } from "./FlightBooking";
import Reuse from "./Reuse";
import { useSelector } from "react-redux";

const WalletOffer = ({ handleChnageCurrency }) => {
  const { walletData } = useSelector((state) => state.auth);
  var settingss = {
    dots: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    infinite: true,
    speed: 100,
    // nextArrow: <NextBtn />,
    // prevArrow: <PreviousBtn />,
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //     {
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 3,
    //             infinite: true,
    //             dots: true
    //         }
    //     },
    //     {
    //         breakpoint: 600,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 2,
    //             initialSlide: 2
    //         }
    //     },
    //     {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //         }
    //     }
    // ]
  };
  return (
    <Col md={5}>
      <Row>
        {/* <Col md={12} className="resp-mt-20">
          <Card
            className="dashboardbox dashboxcolor2"
            style={{ marginBottom: "5px" }}
          >
            <Card.Body style={{ padding: "0px" }}>
              <h2
                className="boxheading boxheadcolor2"
                style={{ color: "white" }}
              >
                My Wallet
                <FaWallet style={{ float: "right", fontSize: "18px" }} />
              </h2>
              <div className="dashinnerbox">
                <ul className="creditlist">
                  <li>
                    <label>Profile Credit Limit:</label> ${parseInt(handleChnageCurrency(0))}
                  </li>
                  <li>
                    <label>Wallet Balance:</label> ${parseInt(handleChnageCurrency(walletData.Wallet))}
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
                <span className="float-right">₹0.00</span>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col> */}
        <div>
          <Slider {...settings} className="">
            {data.map((item, id) => (
              <Reuse key={id} url={item.img} />
            ))}
          </Slider>
        </div>

        {/* <div
          style={{
            display: "flex",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <BiSolidOffer
            size={22}
            style={{ color: "#d32f2f", marginTop: "3px" }}
          />
          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {" "}
            More Offer
          </div>
        </div> */}
        {/* <div>
        <div className="_toprflcont">
          <div className="_hdrtxt">Recent Search</div>
      </div>
       </div> */}
        {/* <div>
          <Slider {...settingss} className="">
            <div className="item awssld">
              <div>
                <h2 className="offers-head2">Lelo Trip Max Sale Is Live</h2>
                <div>
                  <p className="offers-paraa">
                    Enjoy up to 25% off + No-cost EMI on leading Airlines!
                  </p>
                  <p className="offers-paraa2">Book Now & Save</p>
                </div>
                <button className="offers-btn-know">Know More</button>
              </div>
            </div>
            <div className="item awssld">
              <div>
                <h2 className="offers-head2">Lelo Trip Max Sale Is Live</h2>
                <div>
                  <p className="offers-paraa">
                    Enjoy up to 25% off + No-cost EMI on leading Airlines!
                  </p>
                  <p className="offers-paraa2">Book Now & Save</p>
                </div>
                <button className="offers-btn-know">Know More</button>
              </div>
            </div>
            <div className="item awssld">
              <div>
                <h2 className="offers-head2">Lelo Trip Max Sale Is Live</h2>
                <div>
                  <p className="offers-paraa">
                    Enjoy up to 25% off + No-cost EMI on leading Airlines!
                  </p>
                  <p className="offers-paraa2">Book Now & Save</p>
                </div>
                <button className="offers-btn-know">Know More</button>
              </div>
            </div>
          </Slider>
        </div> */}
     
      </Row>
      {/* <div className="banner-again-div">
          <img className="" src="https://www.alhind.com/assets/img/banner2.webp" alt="" />
        </div> */}
    </Col>
  );
};

export default WalletOffer;

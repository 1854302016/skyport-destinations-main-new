import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Lelo from "./logo-lelotrip.png";
import "./Header.css";
const Header = () => (
  <header
    className="hbs bc-neutral-100 flex flex-middle p-relative bg-white"
    style={{ height: 72 }}
  >
    <div className="bg-white p-relative w-100p z-50">
      <Container style={{ maxWidth: 1264 }} className="container">
        <Row className="row p-relative">
          <Col className="col">
            <div className="flex flex-middle flex-between pt-4 pb-4">
              <div className="flex flex-middle">
                <a data-test-attrib="cleartrip-logo" href="/" className="mr-6">
                  <img
                    src={Lelo}
                    alt=""
                    style={{ width: "110px", height: "44px" }}
                  />
                </a>
              </div>
              <div className="flex flex-middle px-1">
                <div className="d-flex c-pointer">
                  <button className="hero-navbar-btnn h-10 br-6 bg-secondary-500 hover:bg-secondary-600 text-white border-transparent cursor-pointer py-1 px-3 font-weight-bold text-uppercase border-solid text-500 border-1 rounded-4 line-height-solid box-border">
                    Log in / Sign up
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </header>
);

export default Header;

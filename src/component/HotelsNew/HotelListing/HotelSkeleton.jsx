import React from "react";
import './HotelSkeleton.css'
import { Container, Row, Col, Card } from "react-bootstrap";
const HotelSkeleton = () => {
  return (
    <div className="container_loader2" id="Loader">
      <div className="loader-wrapper loader-hide">
        <div className="row loader-img">
          <div className="col-12">
            <img
              src="https://angular.pixelstrap.net/sheltos/assets/images/loader/loader-2.gif"
              alt="loader"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSkeleton;

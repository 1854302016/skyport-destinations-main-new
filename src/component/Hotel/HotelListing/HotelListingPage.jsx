import React from 'react'
import HotelListingNew from './HotelListingNew'
import { Container, Row, Col, Button } from "react-bootstrap";
import HotelFiltering from './HotelFiltering';
import HotelListModify from './HotelListModify';
import HotelModify from './HotelModify';




function HotelListingPage() {
  return (
    <> 
    {/* <HotelModify/> */}
    <HotelListModify/>
     <div className="container_pd list_hotel" >
     
      <section className="list_fliter">
        <Row>
          <Col lg={3} md={3} sm={12}>
            <HotelFiltering  />
          </Col>
          <Col lg={9} md={9} sm={12}>
            <HotelListingNew />
          </Col>
        </Row>
      </section>
    </div>
    </>
  )
}

export default HotelListingPage

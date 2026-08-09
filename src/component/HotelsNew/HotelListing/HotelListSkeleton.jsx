import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HotelModifyNew.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
function HotelListSkeleton() {

  return (
    
   
        <div>
          
              <div className="hotelListingstyling">
                <Container className="hotelListingstyling-Container">
                  <Row>
                    <Col className="hotelListingstyling-img">
                      <Skeleton height={225}/>
                    </Col>
                    <Col className="hotelListingstyling-img">
                      <div className="hotelListingstyling-name">
                     <Skeleton/>
                       <Skeleton/>
                      </div>
                      <div style={{display:'flex',gap:'10px'}}>
                        <Skeleton width={100} height={50}/> <span><Skeleton width={100} height={50}/></span>
                      </div>
                     
                      <div style={{marginTop:'45px'}}>
                       <Skeleton width={150} height={30}/>
                   
                      </div>
                      <div className="hotel-roomType"><Skeleton/></div>
                     
                    </Col>
                    <Col
                      className="hotelListingstyling-img"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <div>
                        <div className="hotel-numberic-rating">
                          <div>
                            <div ><Skeleton width={100} height={20}/></div>
                            <div className="rating-reviews"><Skeleton width={100} height={20}/></div>
                          </div>
                          
                        </div>
                        <div>
                        
                          <div style={{marginTop:'10px'}}><Skeleton height={30}/></div>
                         
                        
                          <div
                            className="hotel-freecancellation"
                            style={{ textAlign: "right",marginTop:'70px' }}
                          >
                          <Skeleton width={150} height={30}/>
                          <Skeleton width={150} height={30}/>
                          </div>
                        </div>
                        {/* <div className="hotel-coupon hotel-couponDouble">
                          <div className="">
                           
                           <Skeleton/>
                          </div>
                        </div> */}
                      
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
       
        </div>
    
  );
}

export default HotelListSkeleton;

import React from 'react'
import { Container, Row } from 'react-bootstrap'

const RecentSearch = () => {
  return (
    <Container>
        <div className="flightBookingMainDiv">
          <Row>
            <h4 className="flightBookingRecent">RECENT SEARCH</h4>
          </Row>
          <Row>
            <div className="flightBookingSearch">
              <div className="FlightBookingDel">
                <div className="flightBookingtext"> DELHI</div>
                <div className="flightBookingMinText">
                  21 Mar -25 Mar ( 1 Adult )
                </div>
              </div>
              <div className="FlightBookingDel">
                <div className="flightBookingtext">MUMBAI</div>
                <div className="flightBookingMinText">
                  21 Mar -25 Mar ( 1 Adult )
                </div>
              </div>
              <div className="FlightBookingDel">
                <div className="flightBookingtext">BANGLORE</div>
                <div className="flightBookingMinText">
                  21 Mar -25 Mar ( 1 Adult )
                </div>
              </div>
              <div className="FlightBookingDel">
                <div className="flightBookingtext">GOA</div>
                <div className="flightBookingMinText">
                  21 Mar -25 Mar ( 1 Adult )
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Container>
  )
}

export default RecentSearch
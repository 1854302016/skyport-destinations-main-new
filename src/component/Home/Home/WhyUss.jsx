import React from 'react'
import { Container } from 'react-bootstrap'
import './WhyUss.css'
const WhyUss = () => {
  return (
    <div style={{ padding: "40px 0px" }}>
      <Container>
        <>
          <div className="d-flex justify-content-between">
            <div className="_hdrtxt">Why book with us?</div>
          </div>
          <div
            className="d-flex uspsec justify-content-between "
            style={{ gap: "20px" }}
          >
            <div className="trcard">
              <img src="/Images/Icons/esy-flights.svg" alt=" Easy Booking" />
              <div className="crdttl">Easy Booking</div>
              <div className="crdbdy">
                Book Flights Easily and Grab Exciting Offers!"
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/down-arrows.svg" alt="Lowest Price" />
              <div className="crdttl">Lowest Price</div>
              <div className="crdbdy">
                Guaranteed Low Rates on Flights!
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/return-boxs.svg" alt="Instant Refund" />
              <div className="crdttl">Instant Refund</div>
              <div className="crdbdy">
                Get Quick and Easy Refunds on All Your Travel Bookings!
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/24-hoursa.svg" alt=" 24/7 Support" />
              <div className="crdttl">24/7 Support</div>
              <div className="crdbdy">
                24/7 Support for All Your Flight Queries — We're Here to Help!
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/hot-sales.svg" alt=" Exciting Deals" />
              <div className="crdttl">Exciting Deals</div>
              <div className="crdbdy">
                Unlock Exciting Deals on Flights!
              </div>
            </div>
          </div>
        </>
      </Container>
    </div>
//     <div className="whychoose_con">
//   <div className="container">
//     <h3>Why Smart Travelers Trust Skyport Destinations?</h3>
//     <p>
//       We focus only on flights — and that’s why we do it better than anyone
//       else.
//     </p>
//     <div className="whyus_container">
//       <div className="whychoose_20">
//         <div className="choose_left">
//           <img src="https://www.flightsmojo.in/images/paper-plane.svg" alt="pci" />
//         </div>
//         <div className="choose_right border_right">
//           <h4>Flights. That’s All.</h4>
//           <p>No hotels. No distractions. Just the best airfares.</p>
//         </div>
//       </div>
//       <div className="whychoose_20">
//         <div className="choose_left">
//           <img src="https://www.flightsmojo.in/images/target.svg" alt="easyicon" />
//         </div>
//         <div className="choose_right border_right">
//           <h4>Experts in Complex Routes</h4>
//           <p>Multi-leg, visa-sensitive, and rare itineraries? We’ve got it.</p>
//         </div>
//       </div>
//       <div className="whychoose_20">
//         <div className="choose_left">
//           <img src="https://www.flightsmojo.in/images/receipts.svg" alt="rupee icon" />
//         </div>
//         <div className="choose_right border_right">
//           <h4>Transparent, Real-Time Pricing</h4>
//           <p>
//             All fares are fresh and accurate — no stale prices or surprises.
//           </p>
//         </div>
//       </div>
//       <div className="whychoose_20">
//         <div className="choose_left">
//           <img src="https://www.flightsmojo.in/images/customer-support.svg" alt="icon" />
//         </div>
//         <div className="choose_right">
//           <h4>24x7 Flight Support</h4>
//           <p>Ticket issues? Re-validations? Our agents speak airline.</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

  );
}

export default WhyUss
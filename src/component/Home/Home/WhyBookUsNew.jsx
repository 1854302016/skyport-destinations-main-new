import React from "react";
import { Container } from "react-bootstrap";

function WhyBookUsNew({ bookusdata }) {
  return (
    bookusdata && (
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
              {bookusdata.map((item) => (
                <div className="trcard">
                  <img src={item.img} alt=" Easy Booking" />
                  <div className="crdttl">{item.head}</div>
                  <div className="crdbdy">{item.desc}</div>
                </div>
              ))}
            </div>
          </>
        </Container>
      </div>
    )
  );
}

export default WhyBookUsNew;

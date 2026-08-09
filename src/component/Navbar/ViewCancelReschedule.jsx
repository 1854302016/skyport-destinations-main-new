import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './ViewCancelReschedule.css'; // Assuming you have a corresponding CSS file

const ViewCancelReschedule = ({ handleShow }) => {
  const [reffid, setReffid] = useState('');
  const [reffemail, setReffemail] = useState('');
  const [guesterr, setGuesterr] = useState('');

  const handleGuestLogin = () => {
    // Implement your login logic here
    // For now, just a placeholder
    if (reffid && reffemail) {
      console.log('Logging in guest user with:', { reffid, reffemail });
      // Reset error message
      setGuesterr('');
    } else {
      setGuesterr('Please fill in both fields.');
    }
  };

  return (
    <div className="View-print">
      <h1>View/Cancel/Reschedule your Reservation</h1>
      <span style={{ fontSize: '12px', textAlign: 'center', width: '100%', display: 'block' }}>
        (As a Guest User)
      </span>

      <Form className="ng-pristine ng-valid">
        <Form.Group className="se_m_v9" style={{ marginBottom: '1rem' }}>
          <Form.Label className="mob-h_v1">Reference ID/Booking ID/PNR</Form.Label>
          <Form.Control
            type="text"
            name="BetId"
            placeholder="Reference ID/Booking ID/PNR"
            id="reffid"
            value={reffid}
            onChange={(e) => setReffid(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="se_m_v9" style={{ marginBottom: '1rem' }}>
          <Form.Label className="mob-h_v1">Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email Address"
            id="reffemail"
            value={reffemail}
            onChange={(e) => setReffemail(e.target.value)}
          />
        </Form.Group>
        <Form.Control type="hidden" name="req" value="1" id="req" />
        <div className="brn">
          You only have to fill your EMT Booking ID/Reference ID/PNR with Email Address used at the time of booking to retrieve the details
        </div>
        <div
          style={{
            color: '#FF0000',
            fontSize: '11px',
            textAlign: 'center',
            marginBottom: '5px',
            fontWeight: '600'
          }}
          id="guesterr"
        >
          {guesterr}
        </div>
        <div className="submit">
          <Button className="buttonLogin" onClick={handleGuestLogin}>
            Submit
          </Button>
        </div>
      </Form>

      <div className="mnblock" style={{ marginTop: '2rem' }}>
        <div className="persuation-hacks last-booked">
          <div className="mySlides">
            <div className="ph-msg">
              <div className="ph-content">
                <h3 className="bold ph-content-heading">
                  <span style={{ textDecoration: 'underline', fontWeight: '600' }}>Note:-</span> To View/Cancel/Reschedule/Change/Print your flight tickets, Please login into{' '}
                  <span>mybookings</span>
                  <br />
                  <a style={{ display: 'none' }} href="#" className="ng-binding">
                    mybookings.easemytrip.com
                  </a>
                </h3>
                <br />
                <span className="ph-content-description">
                  <span className="bold">
                    <strong>a) Registered User</strong> - You can log in using a combination of your Booking /Reference ID or PNR along with your password.
                    <br />
                    <br />
                    <strong>b) Guest user</strong> - You can log in using a combination of your Booking /Reference ID or PNR along with the email address entered at the time of booking.
                    <br />
                    <br />
                    <span style={{ fontSize: '9px' }}>
                      If you are unable to login and cancel/reschedule your reservation, kindly call corresponding airlines if your date of travel is within the next 7 days.
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCancelReschedule;

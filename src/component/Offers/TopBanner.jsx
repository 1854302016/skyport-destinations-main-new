import React from 'react';
import { Container } from 'react-bootstrap';
import './TopBanner.css'; // Assuming you have a CSS file for additional styles

const TopBanner = () => {
  return (
    <section>
      {/* <Container> */}
        <div className="_top_bnnr">
          <img src="https://www.easemytrip.com/images/offer-img/hotel-deal-azadi-banner13.webp" alt="Hotel Deal Azadi Banner" />
        </div>
      {/* </Container> */}
    </section>
  );
};

export default TopBanner;

import React from 'react';
import { Container } from 'react-bootstrap';
import './AppDownloadBanner.css'

const AppDownloadBanner = () => {
  return (
    <div className="mnblock" style={{ marginBottom: '24px' }}>
      {/* <a href="https://emt.bio/5Brlv3"><img src="https://www.easemytrip.com/images/hotel-img/app-download-strip-mob1.png" alt="Download App" style={{ borderRadius: '5px' }} /></a> */}
      <a href="https://www.easemytrip.com/offers/hotels-best-price-guarantee.html" target="_new">
        <img src="https://www.easemytrip.com/images/hotel-img/double_refund_mob_banner_final.png" alt="Double Refund" style={{ borderRadius: '5px' }} />
      </a>
    </div>
  );
};

export default AppDownloadBanner;

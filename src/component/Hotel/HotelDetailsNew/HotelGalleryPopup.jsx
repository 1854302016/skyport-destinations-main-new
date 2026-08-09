import React, { useState } from 'react';
import HotelImagesGallery from './HotelImagesGallery';
import './HotelGalleryPopup.css';

const HotelGalleryPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="carouselImage-container" onClick={() => setShowPopup(true)}>
        <img src="./images/hotel-bg.jpg" alt="" className="carousel-smallImages" />
        <div className="carouselImageOverlay-full">
          <div className="carouselImageOverlay-text">+15</div>
        </div>
      </div>

      {showPopup && (
        <div className="gallery-modal-overlay" onClick={() => setShowPopup(false)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <HotelImagesGallery />
            <button className="gallery-modal-close" onClick={() => setShowPopup(false)}>✕</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelGalleryPopup;

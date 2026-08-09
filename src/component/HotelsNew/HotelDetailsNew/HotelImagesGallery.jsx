import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';
import './HotelImagesGallery.css'

const HotelGallery = ({setShowGallery, showGallary, images}) => {

  
    const handleCloseGallery = () => {
     setShowGallery(false);
   };

  return (

    <>
    {showGallary && (

    <Container>  
        <div className="HotelImagesGallery-Main" > 
          <div className="HotelImagesGallery-Container">
            <div>See All Images</div>
            <div onClick={handleCloseGallery} style={{ cursor: 'pointer' }}>
              <RxCross2 />
            </div>
          </div>
          <Row>
            <Col className="HotelImagesGallery-Col">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.replace("{size}", "1024x768")}
                    alt={`Gallery ${idx + 1}`}
                    className="HotelImageGallery-CarouselContainer"
                  />
                ))}
              </Col>
          </Row>
        </div>
    </Container>
    )}
    </>
  );
};

export default HotelGallery;

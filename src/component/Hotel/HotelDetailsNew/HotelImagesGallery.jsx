import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './HotelImagesGallery.css'
import { RxCross2 } from "react-icons/rx";


const HotelImagesGallery = () => {
  return (
    <div>
      <Container >
        <div className='HotelImagesGallery-Main'>
        <div className='HotelImagesGallery-Container'>
        <div>See All Images</div>
        <div><RxCross2/></div>
        </div>
        <Row>
            <Col className='HotelImagesGallery-Col'>
                <img src="./Images/hotel-bg.jpg" alt="" className='HotelImageGallery-CarouselContainer'/>
                <img src="./Images/hotel-bg1.jpg" alt="" className='HotelImageGallery-CarouselContainer'/>
                <img src="./Images/hotel-bg2.jpg" alt="" className='HotelImageGallery-CarouselContainer'/>
                <img src="./Images/hotel-bg3.jpg" alt="" className='HotelImageGallery-CarouselContainer'/>
                <img src="./Images/hotel-bg.jpg" alt="" className='HotelImageGallery-CarouselContainer'/><img src="./Images/hotel-bg1.jpg" alt="" className='HotelImageGallery-CarouselContainer'/>
                <img src="./Images/hotel-bg2.jpg" alt="" className='HotelImageGallery-CarouselContainer'/>
                <img src="./Images/hotel-bg3.jpg" alt="" className='HotelImageGallery-CarouselContainer'/>
            </Col>
        </Row>
        </div>
      </Container>
    </div>
  )
}

export default HotelImagesGallery

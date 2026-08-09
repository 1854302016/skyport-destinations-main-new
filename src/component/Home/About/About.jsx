import React from "react";
import "./About.css";
import { Col, Container, Row } from "react-bootstrap";
import Testimonial from "./Testimonial";
// import WhyChoose from "../Home/innerComponents/WhyChoose";
// import WhyChoose from "../Home/innerComponents/WhyChoose";
const About = () => {
  return (
    <div>
      <section className="bannerInner">
        <div className="container">
          <h1>
            <b>About Us</b>
          </h1>
        </div>
      </section>
      <section className="section_padding">
        <Container>
          <div className="text-center">
            <h2>
              <b>About SkyPort Destinations</b>
            </h2>
          </div>
        </Container>
      </section>
      {/* <section className="section_padding">
        <Container>
        <Row className="d-flex align-items-center">
            <Col md={6}>
              <div>
             
                <p>
                Every journey begins with more than a boarding pass.
            It starts with a spark — a desire to explore, to reconnect, to feel alive somewhere new.
            Whether you&#39;re chasing opportunities, escaping to turquoise coastlines, reuniting, or simply
            answering the quiet call of adventure — SkyPort Destinations is your passport to the world.
            SkyPort Destinations is a premium online travel agency specializing exclusively in global flight
            bookings. Designed for the modern traveler, the platform offers a seamless, secure, and
            efficient way to search, compare, and book flights across international routes — all from a
            single, trusted destination. Every aspect of the experience — from search to checkout — has
            been designed to align with international best practices in travel technology and customer
            satisfaction.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
                className="img-fluid"
                alt="Expand Sales"
              />
            </Col>
          </Row>
        </Container>
      </section> */}




      <section className="section about" style={{marginBottom:'60px'}}>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <div className="about-image mb-4 mb-lg-0">
        
          <div className="about-img">
            <img src="https://www.shutterstock.com/image-photo/back-view-happy-family-standing-600nw-2056218710.jpg" alt="about" style={{borderRadius:'8px'}} />
          </div>
       
        </div>
      </div>
      <div className="col-lg-6">
        <div className="about-content mb-4">
          <h6 className="text-primary fs-14 fw-medium mb-2">
            About SkyPort Destinations
          </h6>
          <h2 className="display-6 mb-2">
            Global Flight Bookings Made Effortless with SkyPort Destinations!
          </h2>
          <p className="" style={{fontSize:"14px",lineHeight:'25px'}}>
           Every journey begins with more than a boarding pass.
            It starts with a spark — a desire to explore, to reconnect, to feel alive somewhere new.
            Whether you&#39;re chasing opportunities, escaping to turquoise coastlines, reuniting, or simply
            answering the quiet call of adventure — SkyPort Destinations is your passport to the world.
            SkyPort Destinations is a premium online travel agency specializing exclusively in global flight
            bookings. Designed for the modern traveler, the platform offers a seamless, secure, and
            efficient way to search, compare, and book flights across international routes — all from a
            single, trusted destination. Every aspect of the experience — from search to checkout — has
            been designed to align with international best practices in travel technology and customer
            satisfaction.
          </p>
        
          
        </div>
        
      </div>
    </div>
    <div className="about-bg d-none d-md-block">
      <img src="https://dreamstour.dreamstechnologies.com/html/assets/img/bg/about-bg.png" alt="img" className="about-bg-01" />
    </div>
    
  </div>
</section>

<section
  className="section-padding about-main"
  style={{ backgroundImage: "url('https://media.cntraveler.com/photos/6536c00072700c0d03660e60/16:9/w_2560%2Cc_limit/Air%2520Canada_IMG_6836.jpg')" ,padding:"50px 0px"}}
>
  <div className="container">
    <div className="about-new-sec" style={{width:'950px',margin:'auto'}}>
      <h1 className="text-white" style={{fontWeight:"700",marginBottom:'20px'}}>From the Caribbean to the World: Reimagining Air Travel with Purpose</h1>
      <p className="text-white" style={{fontSize:'16px',lineHeight:"25px"}}>
        Launched by Guyanese with a vision of connecting the world from our vibrant corner of the
            Caribbean, SkyPort Destinations is driven by a vision to become the leading name in digital air
            travel across the Caribbean and beyond. By prioritizing transparency, innovation, and
            operational excellence, the company aims to reshape how travelers book flights — making it
            smarter, simpler, and more secure.
            SkyPort Destinations represents a new standard in flight booking — built for scale, powered by
            trust, and committed to delivering travel solutions that match the speed and ambition of the
            modern world.
            At SkyPort Destinations, we don’t just book flights — we open the skies to your next story.
      </p>
      {/* <a href="#" className="btn-border">
        View our Tour Packages
      </a> */}
    </div>
  </div>
</section>


      {/* <section className="section_padding">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <img
                src="https://img.freepik.com/free-vector/business-team-communicating-via-social-media_74855-5439.jpg"
                className="img-fluid"
                alt="Expand Sales"
              />
            </Col>
            <Col md={6}>
              <div>
             
                <p>
                Launched by Guyanese with a vision of connecting the world from our vibrant corner of the
            Caribbean, SkyPort Destinations is driven by a vision to become the leading name in digital air
            travel across the Caribbean and beyond. By prioritizing transparency, innovation, and
            operational excellence, the company aims to reshape how travelers book flights — making it
            smarter, simpler, and more secure.
            SkyPort Destinations represents a new standard in flight booking — built for scale, powered by
            trust, and committed to delivering travel solutions that match the speed and ambition of the
            modern world.
            At SkyPort Destinations, we don’t just book flights — we open the skies to your next story.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
      {/* <WhyChoose /> */}
      <Testimonial/>
    </div>
  );
};

export default About;

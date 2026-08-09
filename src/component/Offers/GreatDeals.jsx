import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './GreatDeals.css'; // Assuming you have a CSS file for additional styles
import { FaRegStar } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";



const deals = [
  {
    id: 1,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-1.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'exclusive',
  },
  {
    id: 2,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-2.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'exclusive',
  },
  {
    id: 3,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-3.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'coupon',
  },
  {
    id: 4,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-4.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'cashback',
  },
  {
    id: 5,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-5.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'exclusive',
  },
  {
    id: 6,
    imgSrc: 'https://demoxml.com/html/comre/images/c-img-6.jpg',
    title: 'Flat 40% off Hotel Bookings In 10 Cities Near you',
    expiresOn: 'Jan 17, 2014',
    ribbon: 'coupon',
  },
];

const GreatDeals = () => {
  return (
    <section className="great-deals">
      <Container>
        {/*======= TITTLE =========*/}
        <div className="tittle">
          <h3>great deals of the day</h3>
        </div>
        <div className="coupon">
          <Row>
            {deals.map((deal) => (
              <Col sm={4} key={deal.id} className='li'>
                <div className="coupon-inner">
                  <div className="top-tag">
                    <span className="ribn-red">
                      <span>{deal.ribbon}</span>
                    </span>
                    <span className="star">
                      <FaRegStar/>
                    </span>
                  </div>
                  <div className="c-img">
                    <img
                      className="img-responsive offer_img"
                      src={deal.imgSrc}
                      alt={deal.title}
                    />
                    <a className="head" href="#">
                      {deal.title}
                    </a>
                    <p style={{paddingInline:"10px"}}>Expires On : {deal.expiresOn}</p>
                    <div className="text-center">
                      <Button href="#" className="btn">
                        get coupon code
                      </Button>
                    </div>
                  </div>
                  <ul className="btm-info">
                    <li className="col-xs-4">
                      <FiCheckSquare/>Verified
                    </li>
                    <li className="col-xs-3">
                      <i className="fa fa-bookmark"></i> Save
                    </li>
                    <li className="col-xs-2">
                      <i className="fa fa-share"></i> Share
                    </li>
                    <li className="col-xs-3">
                      <i className="fa fa-comments"></i> Discuss
                    </li>
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default GreatDeals;

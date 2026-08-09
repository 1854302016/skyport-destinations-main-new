import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./CategoryOffers.css";

const offers = [
  {
    id: 1,
    // href: "https://www.easemytrip.com/offers/cab-easeday.html",
    imgSrc: "https://www.easemytrip.com/images/offer-img/easeday14apr23-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Deal of the Day",
    dealDtl: "Enjoy Different Deals Each Day with TripGo",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "EASEDAY",
  },
  {
    id: 2,
    // href: "https://www.easemytrip.com/offers/cab-discount.html",
    imgSrc:
      "https://www.easemytrip.com/images/offer-img/cab-discount-14aug24-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Cab Deal",
    dealDtl:
      "Get Flat 12% OFF* on Airport Transfer, Hourly Rental, One Way & Round Trip Cabs",
    bookingPeriod: "Valid till : 26th Aug, 2024",
    promocode: "LTRIDE",
  },
  {
    id: 3,
    // href: "https://www.easemytrip.com/offers/hourly-rental-cabs.html",
    imgSrc:
      "https://www.easemytrip.com/images/cab-img/rental-cabs-7aug24-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Hourly rental cab",
    dealDtl: "Get up to Rs. 900 OFF on Cab Bookings with TripGo",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "LTHOURLY",
  },
  {
    id: 4,
    // href: "https://www.easemytrip.com/offers/cab-deal.html",
    imgSrc: "https://www.easemytrip.com/images/cab-img/cab-deal-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Cab Offer",
    dealDtl:
      "Get Up to 7% Off* on Airport transfer Hourly rental, One Way & Round Trip Cab Book",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "LTCAB",
  },
  {
    id: 5,
    // href: "https://www.easemytrip.com/offers/partial-payment.html",
    imgSrc:
      "https://www.easemytrip.com/images/offer-img/cab-partial-payment-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Partial Payment",
    dealDtl: "Enjoy Cab Booking by Paying 15% and Rest to Driver",
    bookingPeriod: "Book Now",
    promocode: "",
  },
  {
    id: 1,
    // href: "https://www.easemytrip.com/offers/cab-easeday.html",
    imgSrc: "https://www.easemytrip.com/images/offer-img/easeday14apr23-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Deal of the Day",
    dealDtl: "Enjoy Different Deals Each Day with TripGo",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "EASEDAY",
  },
  {
    id: 2,
    // href: "https://www.easemytrip.com/offers/cab-discount.html",
    imgSrc:
      "https://www.easemytrip.com/images/offer-img/cab-discount-14aug24-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Cab Deal",
    dealDtl:
      "Get Flat 12% OFF* on Airport Transfer, Hourly Rental, One Way & Round Trip Cabs",
    bookingPeriod: "Valid till : 26th Aug, 2024",
    promocode: "LTRIDE",
  },
  {
    id: 3,
    // href: "https://www.easemytrip.com/offers/hourly-rental-cabs.html",
    imgSrc:
      "https://www.easemytrip.com/images/cab-img/rental-cabs-7aug24-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Hourly rental cab",
    dealDtl: "Get up to Rs. 900 OFF on Cab Bookings with TripGo",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "LTHOURLY",
  },
  {
    id: 4,
    // href: "https://www.easemytrip.com/offers/cab-deal.html",
    imgSrc: "https://www.easemytrip.com/images/cab-img/cab-deal-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Cab Offer",
    dealDtl:
      "Get Up to 7% Off* on Airport transfer Hourly rental, One Way & Round Trip Cab Book",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "LTCAB",
  },
  {
    id: 5,
    // href: "https://www.easemytrip.com/offers/partial-payment.html",
    imgSrc:
      "https://www.easemytrip.com/images/offer-img/cab-partial-payment-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Partial Payment",
    dealDtl: "Enjoy Cab Booking by Paying 15% and Rest to Driver",
    bookingPeriod: "Book Now",
    promocode: "",
  },
  {
    id: 1,
    // href: "https://www.easemytrip.com/offers/cab-easeday.html",
    imgSrc: "https://www.easemytrip.com/images/offer-img/easeday14apr23-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Deal of the Day",
    dealDtl: "Enjoy Different Deals Each Day with TripGo",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "EASEDAY",
  },
  {
    id: 2,
    // href: "https://www.easemytrip.com/offers/cab-discount.html",
    imgSrc:
      "https://www.easemytrip.com/images/offer-img/cab-discount-14aug24-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Cab Deal",
    dealDtl:
      "Get Flat 12% OFF* on Airport Transfer, Hourly Rental, One Way & Round Trip Cabs",
    bookingPeriod: "Valid till : 26th Aug, 2024",
    promocode: "LTRIDE",
  },
  {
    id: 3,
    // href: "https://www.easemytrip.com/offers/hourly-rental-cabs.html",
    imgSrc:
      "https://www.easemytrip.com/images/cab-img/rental-cabs-7aug24-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Hourly rental cab",
    dealDtl: "Get up to Rs. 900 OFF on Cab Bookings with TripGo",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "LTHOURLY",
  },
  {
    id: 4,
    // href: "https://www.easemytrip.com/offers/cab-deal.html",
    imgSrc: "https://www.easemytrip.com/images/cab-img/cab-deal-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Cab Offer",
    dealDtl:
      "Get Up to 7% Off* on Airport transfer Hourly rental, One Way & Round Trip Cab Book",
    bookingPeriod: "Valid till : 31st Aug, 2024",
    promocode: "LTCAB",
  },
  {
    id: 5,
    // href: "https://www.easemytrip.com/offers/partial-payment.html",
    imgSrc:
      "https://www.easemytrip.com/images/offer-img/cab-partial-payment-sm.png",
    alt: "SkyPort DestinationsOffers",
    dealName: "Partial Payment",
    dealDtl: "Enjoy Cab Booking by Paying 15% and Rest to Driver",
    bookingPeriod: "Book Now",
    promocode: "",
  },
];

const CategoryOffers = () => {
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied ${code} to clipboard`);
  };

  const stopredir = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="offerpage">
      <section>
        <div className="_top_innr">
          <div className="_top_head">
            <h1 className="_heading">
              Find Best Cab Offers and Cab Booking Deals
            </h1>
          </div>
        </div>
      </section>

      <section>
        <Container>
          <div className="_top_innr">
            <Row className="_offrgrid">
              {offers.map((offer) => (
                <Col
                  key={offer.id}
                  sm={6}
                  md={4}
                  lg={3}
                  style={{ marginBottom: "10px" }}
                >
                  <a
                    href={offer.href}
                    target="_blank"
                    className="_offrbx"
                    rel="noopener noreferrer"
                  >
                    <div className="_imgbox">
                      <img src={offer.imgSrc} alt={offer.alt} />
                    </div>
                    <div className="_deal">
                      <div className="_dealName">{offer.dealName}</div>
                      <div className="_dealDtl">{offer.dealDtl}</div>
                    </div>
                    <div className="_mflxp">
                      <div className="_bookng_prd">
                        <div>
                          <b>BOOKING PERIOD</b>
                        </div>
                        <div>{offer.bookingPeriod}</div>
                      </div>
                      {offer.promocode && (
                        <div className="promcolm" onClick={stopredir}>
                          <span className="promcde">Promocode</span>
                          <span className="coupncde" id={offer.promocode}>
                            {offer.promocode}
                          </span>
                          <span
                            className="copycol"
                            onClick={() => copyToClipboard(offer.promocode)}
                          >
                            <img
                              src="https://www.easemytrip.com/images/offer-img/copy-icon.svg"
                              alt="Copy Code"
                            />
                          </span>
                        </div>
                      )}
                    </div>
                  </a>
                </Col>
              ))}
            </Row>
            <div className="clr"></div>
            <p className="ofr_para_nw">
              SkyPort Destinationsis the most consistent and reliable travel
              platform that furnishes customers with unbeatable travel deals and
              discounts on cab bookings. With the expanded networks in diverse
              destinations and perfect connectivity, we provide seamless can
              rides at inexpensive rates. Further, our user-friendly platform
              enables users to make hassle-free bookings, choose preferred
              seats/cabs and personalize their trips according to their
              requirements. So, to unlock surprising deals and discounts apply
              the SkyPort Destinationscab coupon and have a happy journey.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CategoryOffers;

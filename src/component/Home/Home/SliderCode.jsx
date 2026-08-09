import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const SliderCode = () => {
  var settings = {
    dots: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    infinite: true,
    speed: 100,
    // nextArrow: <NextBtn />,
    // prevArrow: <PreviousBtn />,
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //     {
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 3,
    //             infinite: true,
    //             dots: true
    //         }
    //     },
    //     {
    //         breakpoint: 600,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 2,
    //             initialSlide: 2
    //         }
    //     },
    //     {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //         }
    //     }
    // ]
  };

  const sliderItems = [
    {
      id: 1,
      imgSrc: "https://images.pexels.com/photos/31546481/pexels-photo-31546481/free-photo-of-ancient-temple-in-siem-reap-surrounded-by-lush-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Visit Saudi",
      link: "/tour/saudi",
    },
    {
      id: 2,
      imgSrc: "https://images.pexels.com/photos/31643020/pexels-photo-31643020/free-photo-of-serene-river-landscape-in-ramamangalam-kerala.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Explore Kerala",
      link: "/tour/kerala",
    },
    {
      id: 3,
      imgSrc: "https://images.pexels.com/photos/31625198/pexels-photo-31625198/free-photo-of-aerial-view-of-melasti-beach-coastal-road-in-bali.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Visit Meghalaya",
      link: "/tour/meghalaya",
    },
    {
      id: 4,
      imgSrc: "https://images.pexels.com/photos/30596983/pexels-photo-30596983/free-photo-of-aerial-view-of-eiffel-tower-in-paris.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Visit France",
      link: "tour/france",
    },
  ];

  return (
    <div style={{ marginTop: "50px" }}>
      <Container>
        <Slider {...settings}>
          {sliderItems.map((item) => (
            <div className="item" key={item.id}>
              <Link to={item.link}>
                <img
                  src={item.imgSrc}
                  className="rounded img-fluid slider_code_mobilee"
                  alt={item.title}
                  style={{height:'250px',objectFit:'cover'}}
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <h4 className="view-button">{item.title}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default SliderCode;

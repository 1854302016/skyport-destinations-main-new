import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HotelCard = ({ imageUrl, altText, destination, links }) => {
  return (
    <div className="ecpl_rbx">
      <div className="mgdestn">
        <Link>
          <img variant="top" src={imageUrl} alt={altText} />
        </Link>
      </div>
      <div className="_pckgdscrptn">
        <h5 className="htlnking"><Link>{destination}</Link></h5>
        <div className="htlnking">
          {links.map((link, index) => (
            <Link key={index} className="htlnking-link">
              {link}
            </Link>
          ))}
        </div>
        {/* <Button variant="primary">Book Now</Button> */}
      </div>
    </div>
  );
};

const CabContainer = () => {
  const hotels = [
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/hyd-sm.webp",
      altText: "Hyderabad",
      destination: "Hyderabad",
      links: [
        "To- Kokapet, ", 
        "Amberpet, ", 
        "Secunderabad, ",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/goa-sm.webp",
      altText: "Goa",
      destination: "Goa",
      links: [
        "To- Panaji, ", 
        "Calangute, ", 
        "Bambolim, ",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/mumb-sm.webp",
      altText: "Mumbai",
      destination: "Mumbai",
      links: [
        "To- Shirdi, ",
        "Pune, ",
        "Lonavala ",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/pune-sm.webp",
      altText: "Pune",
      destination: "Pune",
      links: [
        "To- Pimpri-Chinchwad, ", 
        "Koregaon Park, ", 
        "Magarpatta, ",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/del-sm.webp",
      altText: "Delhi",
      destination: "Delhi",
      links: [
        "To- Agra, ", 
        "Bareilly, ", 
        "Dehradun ",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/chennai-sm.webp",
      altText: "Chennai",
      destination: "Chennai",
      links: [
        "To- Hosur, ",
        "Tirupati, ",
        "Bengaluru, ",
        "Anna Nagar, ",
        "Kotturpuram, "
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/jaipur-sm.webp",
      altText: "Jaipur",
      destination: "Jaipur",
      links: [
        "Amber, ",
        "Kotputli, ",
        "Phulera, ",
        "Govindgarh, ",
        "Bagrana, "
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/shimla-sm.webp",
      altText: "Dehradun",
      destination: "Dehradun",
      links: [
        "Rishikesh, ",
        "Dehradun, ",
        "Mussoorie, ",
        "Vikasnagar, ",
        "Doiwala ",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/ahmd-sm.webp",
      altText: "Ahmedabad",
      destination: "Ahmedabad",
      links: [
        "Bareja, ",
        "Dholka, ",
        "Dhandhuka, ",
        "Madhupura, ",
        "Girdharnagar ",
      ],
    },
  ];
  

  return (
  <div style={{background:'#fff',position:'relative',zIndex:'100',padding:'5px'}}>
      <div className="innerWrap">
      <div className="slchtl_mn">
        <div className="pg_tle f28 wt600">
          City To City-Outstation Cabs
        </div>
        <div className="_polrdestnbx mt20">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} {...hotel} />
          ))}
        </div>
      </div>
      {/* <div className="view_btn ctmrg">
        <Link >View More</Link>
      </div> */}
    </div>
  </div>
  );
};

export default CabContainer;

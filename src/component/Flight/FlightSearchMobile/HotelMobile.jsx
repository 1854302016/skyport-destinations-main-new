import React from "react";
import "./HotelMobile.css";
import { Link } from "react-router-dom";

// Step 1: Define data
const travelCategories = [
  {
    title: "Explore Destinations",
    description: "Relax on the beach",
    image:
      "https://www.kingsthantourism.com/uploads/packages/thumb/04-days-goa-tour-package-1590829944-9.jpg",
    link: "/tour/beaches",
    interest: "beach",
  },
  {
    title: "Themed Recommendation",
    description: "Getaways to the Mountains",
    image:
      "https://static.toiimg.com/thumb/msid-96460173,width-748,height-499,resizemode=4,imgsize-94378/.jpg",
    link: "/tour/adventure",
    interest: "mountains",
  },
  {
    title: "Discover by Interest",
    description: "Honeymoon Hotspots",
    image:
      "https://media.istockphoto.com/id/1142802668/photo/wedding-travel-honeymoon-trip-couple-in-love-among-balloons-a-guy-proposes-to-a-girl-couple.jpg?s=612x612&w=0&k=20&c=Io03iJTe0GLh6dOAAXXAx8whq9GJgKmIrJg6eJv1Lq4=",
    link: "/tour/honeymoon",
    interest: "honeymoon",
  },
  {
    title: "Travel by Interest",
    description: "Perfect for Groups",
    image:
      "https://www.kingsthantourism.com/uploads/packages/thumb/04-days-goa-tour-package-1590829944-9.jpg",
    link: "/tour/fixed-group-departure",
    interest: "group",
  },
];

const HotelMobile = () => {
  // Step 2 (optional): Filter if needed
  const filteredCategories = travelCategories; // e.g., you can filter based on user role, interest, etc.

  return (
    <div>
      <div className="indexstyle__SectionWrap-sc-1wckqjh-0 egQjbu">
        <h2 className="commonstyle__Heading-sc-ru2tq2-0 eKQmQU">
          WHERE2GO Next? Let SkyPort DestinationsInspire You
        </h2>
        <ul className="indexstyle__IdeaList-sc-1wckqjh-1 flCSiT">
          {filteredCategories.map((item, index) => (
            <li key={index} className="smlItem">
              <div className="overlay" style={{ opacity: "0.4" }}></div>
              <Link to={item.link}>
                <img
                  src={item.image}
                  alt={item.title}
                  height={122}
                  width={201}
                />
                <div className="indexstyle__Details-sc-1wckqjh-2 iGjIZc">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HotelMobile;

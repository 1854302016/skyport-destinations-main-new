import React from "react";
import { Container } from "react-bootstrap";
import "./WhyBook.css";
import { MdOutlineFlight, MdOutlineSupportAgent } from "react-icons/md";
import { GiCheckedShield } from "react-icons/gi";
import { BiSolidLike, BiSolidFolderOpen } from "react-icons/bi";

const WhyBook = () => {
  const whyBookWithTripGo = [
    {
      title: "24/7 Customer Support",
      desc: "We're here to help whenever you need us",
      icon: <MdOutlineSupportAgent color="#148ceb" size={25} />,
    },
    {
      title: "Secure Booking",
      desc: "Your privacy is out top priority",
      icon: <GiCheckedShield color="#148ceb" size={25} />,
    },
    {
      title: "Trusted by Millions",
      desc: "Millions of users trust Skyport Destinations",
      icon: <BiSolidLike color="#148ceb" size={25} />,
    },
    {
      title: "Best Deals",
      desc: "Get the lowest prices on flights",
      icon: <MdOutlineFlight color="#148ceb" size={25} />,
    },

    {
      title: "No Convenience Fee",
      desc: "Book Tucket wihtout extra charges",
      icon: <BiSolidFolderOpen color="#148ceb" size={25} />,
    },
  ];

  return (
    <div className="tripgo_why_book_mobile">
      <Container>
        <p>Why Book with Skyport Destinations</p>
        <ul className="whbklist_tg">
          {whyBookWithTripGo.map((item) => (
            <li>
              <div className="whybkicn_tg"> {item.icon}</div>

              <div>
                <p className="whybhed_tg">{item.title} </p>
                <p className="whybsbd_tg">{item.desc} </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default WhyBook;

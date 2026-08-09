import React from "react";
import { Link } from "react-router-dom";
import "./css/SimilarPackagesSection.css";
const SimilarPackagesSection = ({ image, day, night, price, detail, nam }) => {
  return (
    <div className="">
      <div className="mainReuse">
        <div className="reuseRelative">
          <div className="">
            <Link>
              <img src={image} alt="" className="ReuseTourPackageImage w-100" />
            </Link>
          </div>
          <div className="reuseSecMain">
            <h2 className="reuseSecMainhead1">HISTORIC</h2>
            <h2 className="reuseSecMainhead2">
              {day}D/{night}N
            </h2>
          </div>
        </div>
        <div className="reuseSecMain2">
          <h2 className="reuseSecMain2Head1">{nam}</h2>
          <h2 className="reuseSecMain2Head2">{detail}</h2>
          <h2 className="reuseSecMain2Head3">
            From <span className="text-[#efbf04]">₹ {price}</span>/per person
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SimilarPackagesSection;

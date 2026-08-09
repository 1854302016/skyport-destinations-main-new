import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GoodToKnow = () => {
  return (
    <div className="m-info-tips2 mar20" style={{ display: "block" }}>
      <div className="bg-head">
        <div className="fltl">
          <h2 className="m-info-tips2_tit">
            <Skeleton count={2} />
          </h2>
          <p className="grn-txt 25">
            <Skeleton />
          </p>
        </div>
        <div className="clr"></div>
      </div>
      <div className="left_gtk">
        <div>
          <div>
            <ul>
              <li className="">
                <p className="txt-sb">
                  <Skeleton count={5} />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodToKnow;

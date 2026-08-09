import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
//  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
const FlightDetailSkeleton = () => {
  return (
    <div className="flight-detail-skeleton-main block-content-2 custom_block_content">
      <div className="box-result custom_box_result">
        <div className="flight_tags depart_tags">
          <span style={{ zIndex: 2 }}>Departure</span>
        </div>
        <ul className="list-search-result booking_list forMinScreenul">
          <li className="flight_name">
            <Skeleton width={60} height={60}/>
            <div className="name">
              {" "}
              
              <span className="flight_no" style={{marginTop:'5px'}}>
                <Skeleton width={60}/>
                <Skeleton width={60} className="left-skeleton-depart"/>
              </span>
              
            </div>
          </li>
          <li className="flight_time">
            <span className="">
              <Skeleton />
              <Skeleton />
            </span>
            <strong>
              <Skeleton />
            </strong>
            <span className="date">
              <Skeleton />
            </span>
            <span className="">
              {" "}
              <Skeleton />
              
            </span>
            <span className="airport">
              <Skeleton />
              <Skeleton />
            </span>
          </li>
          <li className="flight_amenties">
            <div className="top">
              <span className="duration">
               
                <Skeleton width={40}/>
              </span>
              <span className="flightDetailSpantag line-skeleton-hide"></span>
              <span className="grey_rtbrder">
                <Skeleton width={30}/>
              </span>{" "}
              <span className="">
                <Skeleton width={50}/>{" "}
              </span>
            </div>

            <div className="middle">
              
            </div>

            <div className="bottom">
              <span className="wght">
                <Skeleton />
              </span>
              <span className="grey_rtbrder">
                <Skeleton />
              </span>

              <span className="refundable" style={{border:'none'}}>
                <Skeleton width={90}/>
            
              </span>
            </div>
          </li>
          <li className="flight_time">
            <span className="">
              <Skeleton />
              <Skeleton />
            </span>
            <strong>
              <Skeleton />
            </strong>
            <span className="date">
              <Skeleton />
            </span>
            <span className="">
              {" "}
              <Skeleton />
              
            </span>
            <span className="airport">
              <Skeleton />
              <Skeleton />
            </span>
          </li>
        </ul>
        <div className="clearfix" />
      </div>
    </div>
  );
};

export default FlightDetailSkeleton;

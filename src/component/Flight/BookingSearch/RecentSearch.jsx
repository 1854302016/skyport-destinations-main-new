import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { MdOutlineFlightTakeoff } from "react-icons/md";

const formatTime = (arrTime) => {
  const date = new Date(arrTime);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const day = days[date.getDay()];
  const dateNum = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}, ${dateNum} ${month} ${year}`;
};

const RecentSearch = ({ cacheData }) => {
  const navigate = useNavigate();

  const handleSearchClick = (item) => {
    const segment = item.Segments[0];
    const queryParams = `dest_${segment.Destination}*org_${segment.Origin}*dep_${segment.PreferredDepartureTime}*arr_${segment.PreferredArrivalTime}*px_${item.AdultCount}-${item.ChildCount}-${item.InfantCount}*jt_${item.JourneyType}*cbn_${segment.FlightCabinClass}`;

    const originCode = item.originCountryCode?.trim().toUpperCase();
    const destinationCode = item.destinationCountryCode?.trim().toUpperCase();

    if (item.JourneyType === 2) {
      if (originCode && destinationCode && originCode !== destinationCode) {
        navigate(`/international-round/${encodeURIComponent(queryParams)}`);
      } else {
        navigate(`/round/${encodeURIComponent(queryParams)}`);
      }
    } else {
      navigate(`/flightList/${encodeURIComponent(queryParams)}`);
    }
  };

  return (
    <>
      {cacheData.length > 0 && (
        <div className="flightBookingMainDiv">
          <Row>
            <div className="flightBookingSearch_recent">
              {cacheData.slice(0, 8).map((item, index) => {
                const segment = item.Segments[0];
                return (
                  <div
                    className="FlightBookingDel"
                    key={index}
                    onClick={() => handleSearchClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flightBookingtext">
                      <MdOutlineFlightTakeoff style={{ marginRight: "5px" }} />
                      {segment.Origin} - {segment.Destination}
                    </div>
                    <div className="flightBookingMinText">
                      {formatTime(segment.PreferredDepartureTime)}
                    </div>
                  </div>
                );
              })}
            </div>
          </Row>
        </div>
      )}
    </>
  );
};

export default RecentSearch;

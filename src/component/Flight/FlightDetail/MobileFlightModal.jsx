import React from "react";
import DepatureDetail from "./DepatureDetail";

const MobileFlightModal = ({ closeFilter, srdvIdx, flight, type, flight3 }) => {
  return (
    <div className="mobile heading_flight_list_two">
      <div className="actpop fltr-pop" id="idflr" ng-show="isFilt">
        <div className="popbx ">
          <div className="close-btn fltPop" onClick={closeFilter}>
            ✕
          </div>
          <div className="ovf-sc">
            {flight && (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight={flight}
                type="Departure"
              />
            )}
            {flight3 && (
              <DepatureDetail
                srdvIdx={srdvIdx}
                flight3={flight3}
                type="Return"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFlightModal;

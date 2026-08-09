import React from "react";
import "./Emi.css";

const Emi = ({ setEmiBtn, emiBtn }) => {
  return (
    <div className="pri-sect-holi">
      <div className="hol-1">
        <div className="sta-frm">Starting From</div>
        <div className="hol-pr-mn">
          {/* ngIf: packDetails.CuttingPrice.IsActive && PriceCompare() */}
          <div
            className="fin-pri-n ng-scope"
            ng-if="packDetails.CuttingPrice.IsActive && PriceCompare()"
          >
            <span ng-bind="packDetails.currSymbol" className="ng-binding">
              $
            </span>
            <span className="fin-pri-n">
              <s
                ng-bind="packDetails.CuttingPrice.Amount"
                className="ng-binding"
              >
                152000
              </s>
            </span>
          </div>
          {/* end ngIf: packDetails.CuttingPrice.IsActive && PriceCompare() */}
          {/* <div className="th-pr"></div> */}
          <div className="mn-prie">
            <span ng-bind="packDetails.currSymbol" className="ng-binding">
              $
            </span>
            <span
              className="fin-pri ng-binding"
              ng-bind="packDetails.twoPaxOccupancy"
            >
              120000
            </span>
          </div>
        </div>
        <div id="calcudvpr">{/* ngIf: packDetails.isOnlineBooking */}</div>
        <div className="mai-per">Per Person on twin sharing </div>
        <div className="clr" />
        <div className="emi_text" ng-show="packDetails.twoPaxOccupancy>10000">
          <img src="https://www.easemytrip.com/holidays/Content/customize/img/emi-pay-list.svg" />{" "}
          Easy No Cost EMI Starts from &nbsp;{" "}
          <span className="ng-binding">
            {" "}
            ₹<span className="ng-binding">20987</span>{" "}
            <span className="chsemi" onClick={() => setEmiBtn(!emiBtn)}>
              see option
            </span>
          </span>
        </div>
        <div
          className="visearn ng-hide"
          ng-show="IsVistara != undefined && IsVistara != null && IsVistara"
        >
          <div className="visimg">
            <img src="https://www.easemytrip.com/images/advisory-img/club_vistara.png" />
          </div>
          <div className="visearnn ng-binding">Earn 0 CV points</div>
        </div>
      </div>
      <a
        className="bt-hol fare-rl-send-query"
        id="qmsshowdiv"
        ng-click="SaveQryDetail()"
        style={{ display: "none" }}
      >
        Save Query
      </a>
    </div>
  );
};

export default Emi;

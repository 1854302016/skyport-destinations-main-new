import React from "react";

const Ssr = () => {
  return (
    <div>
      <div className="addn_slct">
        <div className="slct_tap ng-scope">
          <img src="https://flight.easemytrip.com/Content/img/seat-ico-addon.svg" />
          <span>Seat</span>
        </div>

        <div className="slct_tap ng-scope active">
          <img src="https://flight.easemytrip.com/Content/img/meal-ico-addon.svg" />
          <span>Meal</span>
        </div>

        <div className="slct_tap ng-scope">
          <img src="https://flight.easemytrip.com/Content/img/luggage-ico-addon.svg" />
          <span>Baggage</span>
        </div>

        <div className="slct_tap ng-scope" style={{ display: "block" }}>
          <img src="https://flight.easemytrip.com/Content/img/pouplar-ico-addon.svg" width="" />
          <span> Popular Add-Ons</span>
        </div>

        <a className="skipotp ng-scope">Skip to Payment</a>
      </div>
    </div>
  );
};

export default Ssr;

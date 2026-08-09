import React from "react";
import BusForm from "./BusForm";
import ListProduct from "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct";

const BusMain = () => {
  return (
    <div id="hotelSearch" className="hotelsearchmobile">
      <ListProduct />
      <BusForm />
    </div>
  );
};

export default BusMain;

import React, { useEffect, useState } from "react";
import FlightBookingTable from "./FlightBookingTable";
// import flightBookingsData from './FlightBookingData';
import axios from "axios";

const FlightBookingPage = () => {
  const [flightBookingsData, setFlightBookingsData] = useState([]);

  useEffect(() => {
    const fetchFlightBookingData = async () => {
      try {
        const response = await axios.get(
          "https://heritage.travelsdata.com/api/details"
        );
        console.log("dghfytdftyfv", response);
        if (response.data.success) {
          console.log("bookings from db", response.data.data);
          setFlightBookingsData(response.data.data);
        } else {
          console.error(
            "Failed to fetch flight booking data:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching flight booking data:", error);
      }
    };

    fetchFlightBookingData();
  }, []);
  
  return (
    <div>
      <FlightBookingTable heading="Tour Booking" data={flightBookingsData} />
    </div>
  );
};

export default FlightBookingPage;

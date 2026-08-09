import React from 'react';
import HotelBookingTable from './HotelBookingTable';
import hotelBookingsData from './HotelBookingData';


const HotelBookingPage = () => {
  // Sample data for bookings
  

  return (
    <div>
      <HotelBookingTable heading="Hotel Booking" data={hotelBookingsData} />
    </div>
  );
};

export default HotelBookingPage;

import React from 'react';
import SightBookingTable from './SightBookingTable';
import sightBookingsData from './SightBookingData';


const SightBookingPage = () => {
  return (
    <div>
      <SightBookingTable heading="Sightseeing Booking" data={sightBookingsData} />
    </div>
  );
};

export default SightBookingPage;

import React from 'react';
import PackageBookingTable from './PackageBookingTable';
import packageBookingsData from './PackageBookingData';


const PackageBookingPage = () => {
  return (
    <div>
      <PackageBookingTable heading="Tour Booking" data={packageBookingsData} />
    </div>
  );
};

export default PackageBookingPage;

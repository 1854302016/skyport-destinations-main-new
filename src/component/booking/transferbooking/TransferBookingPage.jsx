import React from 'react';
import TransferBookingTable from './TransferBookingTable';
import transferBookingsData from './TransferBookingData';


const TransferBookingPage = () => {
  return (
    <div>
      <TransferBookingTable heading="Transfer Booking" data={transferBookingsData} />
    </div>
  );
};

export default TransferBookingPage;

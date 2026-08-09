const packageBookingsData = [
    {
      id: 10,
      bookingDate: '2023-10-19 12:44:56',
      packageName: 'AMSTERDAM + PARIS + SWISS',
      info: '02NAmsterdam 03N Paris + 03N Zurich',
      status: 'Pending',
      price: 1000,
      detailLink: 'https://tripoholidays.com/bookings/tour/detail/IiwzYGAKYAo='
    },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Pending',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Failed',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    // {
    //   id: 18,
    //   bookingDate: '07:35 PM, 10 Oct 2023',
    //   status: 'Success',
    //   hotelName: 'Hotel Gems By OYO Rooms',
    //   checkIn: '11 Oct 2023',
    //   checkOut: '12 Oct 2023',
    //   fare: '1478',
    //   detailLink: 'https://tripoholidays.com/bookings/hotel/detail/IiwzQGAKYAo='
    // },
    
  ];

  export default packageBookingsData;
// src/App.js
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Navbar/Header";
import Hero from "./component/Home/Hero";
import MainNav from "./component/Navbar/MainNav";
import Navbars from "./component/Navbar/Navbars";
import Footer from "./component/Footer/Footer";
import About from "./component/Home/About/About";
import TermCondition from "./component/Home/TermCondition/TermCondition";
import PrivacyPolicy from "./component/Home/PrivacyPolicy/PrivacyPolicy";
import Contact from "./component/Home/ContactUs/Contact";
import HotelSearch from "./component/Hotel/HotelSearch/HotelSearch";
import BookingConfirm from "./component/Hotel/HotelBookingConfirm/BookingConfirm";
import HotelBooking from "./component/Hotel/HotelBooking/HotelBooking";
import HotelDetail from "./component/Hotel/HotelDetail/HotelDetail";
import Hotels from "./component/Hotel/Hotels/Hotels";
import { useEffect, useState } from "react";
import FlightInternational from "./component/Flight/FlightInternational/FlightInternational";
import RoundTrips from "./component/roundtrip/RoundTrips";
import FlightDetail from "./component/Flight/FlightDetail/FlightDetail.jsx";
import FlightDoNotClose from "./component/Flight/FlightDetail/FlightDoNotClose.jsx";
import FlightBookingTicket from "./component/Flight/TicketBooking/BookingTicket";
import { FlightList } from "./component/Flight/FlightList/FlightList";
import  FlightError  from "./component/Flight/FlightList/FlightError";

import CommingSoon from "./CommingSoon";
import FlightSearchMobile from "./component/Flight/FlightSearchMobile/FlightSearchMobile";
// import HotelSearchMobile from "./component/Hotel/HotelSearch/HotelSearchMobile/HotelSearchMobile";
import Offers from "./component/Offers/Offers";
import CategoryOffers from "./component/Offers/CategoryOffers";
import FlightBookingPage from "./component/booking/flightbooking/FlightBookingPage";
import FlightBookingDetails from "./component/booking/flightbooking/FlightBookingDetails";
import HotelBookingPage from "./component/booking/hotelbooking/HotelBookingPage";
import PackageBookingPage from "./component/booking/packagebooking/PackageBookingPage";
import ProtectedRoute from "./component/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginFirst from "./component/Navbar/LoginFirst";
import PhonePePayment from "./Dummy";
import Footers from "./component/Footer/Footers";
import Foot from "./component/Footer/Foot";
import ContactUs from "./component/Home/ContactUs/ContactUs";
import TicketBooking from "./component/Flight/TicketBooking/TicketBooking";
import MainDash from "./component/Dashboard/MainDash";
import Insurance from "./component/More/Insurance/Insurance";
import Visa from "./component/More/Insurance/Visa";
// import HotelSearchNew from "./component/Hotel/HotelSearch/HotelSearchNew";
import BusBookingForm from "./component/Buses/BusBookingForm";
import CabBookingForm from "./component/Cabs/CabBookingForm";
import PromoCode from "./PromoCode";
import Ssr from "./component/Flight/FlightDetail/Ssr";
// import HotelFinalBooking from "./component/HotelsNew/HotelFinalBooking/HotelFinalBooking";
// import HotelDetailMain from "./component/Hotel/HotelDetailsNew/HotelDetailMain";
// import HotelListingPage from "./component/Hotel/HotelListing/HotelListingPage";
// import HotelListingNew from "./component/Hotel/HotelListing/HotelListingNew";
// import HotelModifyNew from "./component/Hotel/HotelListing/HotelModifyNew";
// import HotelImagesGallery from "./component/Hotel/HotelDetailsNew/HotelImagesGallery";
import HotelModifyNew from "./component/HotelsNew/HotelListing/HotelModifyNew";
import HotelDetailMain from "./component/HotelsNew/HotelDetailsNew/HotelDetailMain";
import HotelSearchNew from "./component/HotelsNew/HotelDesktopView/HotelSearchNew";
import HotelSearchMobile from "./component/HotelsNew/HotelMobileView/HotelSearchMobile";
import HotelFinalBooking from "./component/HotelsNew/HotelPreBooking/HotelFinalBooking";
import HotelFinishBooking from "./component/HotelsNew/HotelPreBooking/HotelFinishBooking";
import HotelError from "./component/HotelsNew/HotelPreBooking/HotelError";
import HotelVoucher from "./component/HotelsNew/HotelVouchers/HotelVoucher";
import HotelDetailMobile from "./component/HotelsNew/HotelMobileView/HotelDetailMobile";
// import HotelSearchMobile from "./component/HotelsNew/HotelSearchMobile";
import Home from "./component/TourPackages/HomePage/Home";
import Lists from "./component/TourPackages/ListPage/Lists";
import Detail from "./component/TourPackages/Detailpage/Detail";
import Uttrakhand from "./component/components/Uttarakhand/Uttarakhand";
import Ladakh from "./component/components/Ladakh/Ladakh";
import Rajasthan from "./component/components/Rajasthan/Rajasthan";
import Himachal from "./component/components/Himachal/Himachal";
import MobileSsr from "./component/Flight/FlightDetail/MobileSsr/MobileSsr";
import Singapore from "./component/components/Singapore/Singapore";
import Dummy from "./Dummy";
import ForgetPassword from "./component/Navbar/ForgetPassword";
import HotelPreBookMobile from "./component/HotelsNew/HotelMobileView/HotelPreBookMobile.jsx";
import HotelNotFound from "./component/HotelsNew/HotelNotFound/HotelNotFound.jsx";
import HotelTechnicalError from "./component/HotelsNew/HotelNotFound/HotelTechnicalError.jsx";
import HotelReviewPageMobile from "./component/HotelsNew/HotelPreBooking/HotelReviewPageMobile.jsx";
import HotelReviewPage from "./component/HotelsNew/HotelPreBooking/HotelReviewPage.jsx";
import BusMain from "./component/Buses/BusPhone/BusMain.jsx";
import BusListing from "./component/Buses/BusModify/BusListing.jsx";
import BusFilter from "./component/Buses/BusModify/BusFilter.jsx";
import BusPreBook from "./component/Buses/BusPreBook/BusPreBook.jsx"
import BusSeatLayout from "./component/Buses/BusModify/BusSeatLayout.jsx";
import BusReviewPage from "./component/Buses/BusPreBook/BusReviewPage.jsx";
import BusVoucher from "./component/Buses/BusPreBook/BusVoucher.jsx";
import CabListing from "./component/Cabs/CabListing/CabListing.jsx";
import NewFooter from "./component/Footer/NewFooter.jsx";
import Login from "./component/Home/Login/Login.jsx";
import HomeModern from "./component/TourPackages/HomePage/HomeModern.jsx";
import ContactFloat from "./component/ContactFloat/ContactFloat.jsx";
import InPersonBooking from "./component/InPerson/InPersonBooking.jsx";
import HotelDoNotClose from "./component/HotelsNew/HotelPreBooking/HotelDoNotClose.jsx";
import ViewDetail from "./component/Dashboard/ViewDetail.jsx";
import DummyForm from "./component/demo/DummyForm.jsx";
import DummyList from "./component/demo/DummyList.jsx";
import DummyDetail from "./component/demo/DummyDetail.jsx";



function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 576);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const location = useLocation();

  const dynamicFooterHiddenPrefixes = [
    "/flightList",
    "/flight-detail",
    "/flight-ticket",
    "/round",
    "/international-round",
    "/uttarakhand-tour-packages",
    "/ladakh-tour-packages",
    "/himachal-tour-packages",
    "/rajasthan-tour-packages",
    "/singapore-tour-packages",
    "/hoteldetailsmain",
    "/hotelmodify",
    "/hotelfinalbooking"
  ];

  const shouldShowFooter = !dynamicFooterHiddenPrefixes.some(
    (prefix) =>
      location.pathname === prefix || location.pathname.startsWith(prefix + "/")
  );

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const hideNavbarPaths = [
    "/uttarakhand-tour-packages",
    "/ladakh-tour-packages",
    "/himachal-tour-packages",
    "/rajasthan-tour-packages",
    "/singapore-tour-packages",
  ];

  const hideNavbar = hideNavbarPaths.includes(location.pathname);
  // console.log("FLight Detail", FlightDetail);
  return (
    <div>
      {!hideNavbar && <Navbars handleShow={handleShow} />}

      <Routes>
        <Route
          path="/"
          element={isMobileView ? <FlightSearchMobile /> : <Hero />}
        />
        <Route path="/dummyform" element={<DummyForm />} />
        <Route path="/dummylist" element={<DummyList/>}/>
        <Route path="/dummydetail" element={<DummyDetail />} />
         <Route path="/in-person-booking" element={<InPersonBooking />} />
        <Route path="/uttarakhand-tour-packages" element={<Uttrakhand />} />
        <Route path="/ladakh-tour-packages" element={<Ladakh />} />
        <Route path="/rajasthan-tour-packages" element={<Rajasthan />} />
        <Route path="/himachal-tour-packages" element={<Himachal />} />
        <Route path="/singapore-tour-packages" element={<Singapore />} />
        <Route path="/dash" element={<ProtectedRoute><MainDash /></ProtectedRoute>} />
        {/* <Route path="/" element={<TourBanner />} /> */}
          <Route
          path="/bookings/flightdetail/:id"
          element={
            <ProtectedRoute>
              <ViewDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms-conditions" element={<TermCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/insurance" element={<Insurance />} />
        <Route path="/visa" element={<Visa />} />
        <Route path="/forex" element={<Visa />} />
        <Route path="/ticket" element={<TicketBooking />} />

        {/* <Route
            path="/hotel"
            element={isMobileView ? <HotelSearchMobile /> : <HotelSearchNew />}
          /> */}
        {/* <Route
          path="/hotel-booking-confirm/:bookingId"
          element={<BookingConfirm />}
        />
        <Route path="/hotel/booking/:id/:optionId" element={<HotelBooking />} />
        <Route path="/hotel-detail/:id" element={<HotelDetail />} /> */}
         <Route
          path="/hotel-booking-confirm/:bookingId"
          element={<BookingConfirm />}
        />
        <Route path="/hotel/booking/:id/:optionId" element={<HotelBooking />} />
        <Route path="/hotel-detail/:id" element={<HotelDetail />} />
        <Route path="/hotellist" element={<Hotels />} />
        <Route
          path="/hotel-do-not-close/:bookingId"
          element={<HotelDoNotClose  />}
        />
        <Route path="/hotellist" element={<Hotels />} />
        <Route path="/flightList" element={<FlightList />} />
        <Route path="/flightList/:data" element={<FlightList />} />
         <Route path="/flight-error" element={<FlightError />} />
        <Route
          path="/international-round/:data"
          element={<FlightInternational />}
        />
        <Route path="/round/:data" element={<RoundTrips />} />
        <Route
          path="/flight-detail/:index/:index2?/:srdvIdx?"
          element={<FlightDetail />}
        />
		<Route
          path="/flight-do-not-close/:bookingId"
          element={<FlightDoNotClose  />}
        />
        <Route path="/flight-ticket/:srdvIdx?" element={<TicketBooking />} />
        <Route
          path="/my-booking"
          element={
            <CommingSoon
              image="https://www.anu-sport.com.au/UITemplates/DefaultPublic/images/placeholder.jpg?MaxH=300"
              heading=""
            />
          }
        />
        <Route path="/loader" element={<Dummy />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:category" element={<CategoryOffers />} />
        <Route
          path="/bookings/flight"
          element={
            <ProtectedRoute>
              <MainDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/hotel"
          element={
            <ProtectedRoute>
              <HotelBookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/tour"
          element={
            <ProtectedRoute>
              <PackageBookingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/ssr" element={<MobileSsr />} />
        <Route
          path="/bookings/flight/details/:id"
          element={
            <ProtectedRoute>
              <FlightBookingDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check" element={<PhonePePayment />} />
        <Route path="/promo" element={<PromoCode />} />
        <Route path="/ssr" element={<Ssr />} />
        <Route path="/tour" element={<HomeModern />} />
        <Route path="/tour/:pack" element={<Lists />} />
        <Route path="/tour/:pack/:fullDetails" element={<Detail />} />
        {/* <Route
          path="/hotel"
          element={isMobileView ? <HotelSearchMobile /> : <HotelSearchNew />}
         
        />

        <Route path="/hotelmodify" element={<HotelModifyNew />} />
        <Route path="/hoteldetailsmain" element={<HotelDetailMain />} />
        <Route path="/hotelfinalbooking" element={<HotelFinalBooking />} /> */}
        <Route
          path="/hotel"
          // element={ <HotelSearchNew />}
          element={isMobileView ? <HotelSearchMobile /> : <HotelSearchNew />}
        />

        <Route path="/hotelmodify" element={<HotelModifyNew />} />
        <Route
          path="/hoteldetailsmain"
          element={isMobileView ? <HotelDetailMobile /> : <HotelDetailMain />}
        />
        <Route path="/hotelfinalbooking" element={<HotelFinalBooking />} />
        <Route path="/HotelFinishBooking" element={<HotelFinishBooking />} />
        <Route path="/hotelvoucher" element={<HotelVoucher />} />
        <Route path="/hotelerror" element={<HotelError />} />
        <Route path="/hoteldetailmobile" element={<HotelDetailMobile />} />
        <Route path="/hotelprebookmobile" element={<HotelPreBookMobile />} />
        <Route path="/hotelnotfound" element={<HotelNotFound />} />
        <Route path="/hoteltechnicalerror" element={<HotelTechnicalError />} />
        <Route path="/hotelreviewmobile" element={<HotelReviewPageMobile />} />
        <Route path="/hotelreview" element={<HotelReviewPage />} />
        <Route path="/hotelreviewmobile" element={<HotelReviewPageMobile />} />


{/* Buses */}

        <Route path="/buses"  element={isMobileView ? <BusMain /> : <BusBookingForm />}/>
        <Route path="/buslisting" element={<BusListing />} />
        <Route path="/busfilter" element={<BusFilter />} />
        <Route path="/busprebook" element={<BusPreBook/>} />
        <Route path="/busseatlayout" element={<BusSeatLayout/>} />
        <Route path="/busreview" element={<BusReviewPage/>} />
        <Route path="/busvoucher" element={<BusVoucher/>} />

{/* Cabs */}

        <Route path="/cabs" element={<CabBookingForm />} />
        <Route path="/cablisting" element={<CabListing />} />



      </Routes>
      <ToastContainer newestOnTop rtl={false} />
      {shouldShowFooter && <NewFooter />}
      {/* {shouldShowFooter && <Foot />} */}
      <ContactFloat />
    </div>
  );
}

export default App;

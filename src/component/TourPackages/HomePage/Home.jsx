import React from "react";
import { Helmet } from "react-helmet";
import "./css/Home.css";
import BannerSection from "./BannerSection";
import TopTrendingSection from "./TopTrendingSection";
import AddSection from "./AddSection";
import PopularIndianSection from "./PopularIndianSection";
import PopularTourSection from "./PopularTourSection";
import PopularInternationalSection from "./PopularInternationalSection";
import HolidayThemesSection from "./HolidayThemesSection";
import SupportSection from "./SupportSection";
import FooterSection from "../FooterSection";
import EnquiryPopup from "../Common/EnquiryPopup";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Tour Packages & Holiday Deals Worldwide | SkyPort Destinations
        </title>
        <meta
          name="description"
          content="Explore domestic and international tour packages with SkyPort Destinations. Discover affordable holiday deals, family vacations, honeymoon packages, adventure tours, and customized travel experiences."
        />
        <meta
          name="keywords"
          content="tour packages, holiday packages, international tours, domestic tours, honeymoon packages, family vacation packages, travel packages, adventure tours, customized tours, cheap holiday deals, SkyPort Destinations tours"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SkyPort Destinations" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Tour Packages & Holiday Deals | SkyPort Destinations"
        />
        <meta
          property="og:description"
          content="Book affordable domestic and international holiday packages with SkyPort Destinations. Customized tours, family vacations, honeymoon trips and more."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://skyportdestinations.com/tour"
        />
        <meta
          property="og:image"
          content="https://skyportdestinations.com/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Tour Packages & Holiday Deals | SkyPort Destinations"
        />
        <meta
          name="twitter:description"
          content="Discover the best tour packages and holiday deals worldwide with SkyPort Destinations."
        />
        <link rel="canonical" href="https://skyportdestinations.com/tour" />
      </Helmet>
      <div style={{ overflowX: "hidden" }} className="tour_package_skyy">
        <BannerSection />
        {/* <div className='container'>
                  <WebOffer defaultTab="Holidays" />
                </div> */}
        <TopTrendingSection />
        <AddSection />
        <PopularIndianSection
          sheading="DESTINATION"
          fheading="Popular"
          secheading="Indian Destination"
        />
        <PopularTourSection />
        <PopularInternationalSection />
        <HolidayThemesSection />
        <SupportSection />
        {/* <MobileApp
                    backgroundImage="/Images/tour/mobile_app_trip_holiday.png"
                    title="Download Our Mobile App"
                    description="Book exciting holiday packages at unbeatable prices. Refer your friends and earn attractive rewards from their bookings."
                /> */}
        <FooterSection />
        <EnquiryPopup />
      </div>
    </>
  );
};

export default Home;

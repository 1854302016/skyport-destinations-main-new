import React from "react";
import { Helmet } from "react-helmet";
import "./css/Home.css";
import "./css/ModernTourStyle.css";
import ModernBannerSection from "./ModernBannerSection";
import BestsellingPackages from "./BestsellingPackages";
import WhyChooseUs from "./WhyChooseUs";
import TopDestinationsCircular from "./TopDestinationsCircular";
import DiverseExperiences from "./DiverseExperiences";
import AddSection from "./AddSection";
import PopularIndianSection from "./PopularIndianSection";
import PopularInternationalSection from "./PopularInternationalSection";
import SupportSection from "./SupportSection";
import FooterSection from "../FooterSection";
import EnquiryPopup from "../Common/EnquiryPopup";

const HomeModern = () => {
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
      <div
        style={{ overflowX: "hidden" }}
        className="tour_package_skyy tour_package_modern"
      >
        {/* Modern Hero Banner with Search */}
        <ModernBannerSection />

        {/* Bestselling Packages Section - Matches Reference Design */}
        <BestsellingPackages />

        {/* Top Destinations with Circular Images */}
        <TopDestinationsCircular />

        {/* Promotional Banner/Add Section */}
        <AddSection />

        {/* Diverse Experiences (Honeymoon, Family, Adventure, etc.) */}
        <DiverseExperiences />

        {/* Popular Indian Destinations */}
        {/* <PopularIndianSection 
                    sheading="EXPLORE INDIA" 
                    fheading="Popular" 
                    secheading="Indian Destinations" 
                /> */}

        {/* Popular International Destinations */}
        <WhyChooseUs />
        <PopularInternationalSection />

        {/* Support/Contact Section */}
        <SupportSection />

        {/* Footer */}
        <FooterSection />

        {/* Enquiry Popup */}
        <EnquiryPopup />
      </div>
    </>
  );
};

export default HomeModern;

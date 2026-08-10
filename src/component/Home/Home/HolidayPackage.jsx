import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

const HolidayPackages = () => {
  const data = [
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/narkanda/mmt/destination/m_Narkanda_l_372_902.jpg?im=Resize=(400,462)",
      name: "Shimla's Best Kept Secret",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/yercaud/mmt/destination/m_destination-yercaud-landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Tamil Nadu's Charming Hill Town",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/dooars/mmt/destination/m_Dooars_l_457_685.jpg?im=Resize=(400,462)",
      name: "Picturesque Gateway to Himalayas",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/saputara/mmt/destination/m_destination-saputara-landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Quaint Little Hill Station in Gujarat",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/dhanaulti/mmt/destination/m_Destination_Dhanaulti_l_534_801.jpg?im=Resize=(400,462)",
      name: "A pleasant summer retreat and a snowy winter wonderland!",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/mandarmani/mmt/destination/m_destination-mandarmoni-landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Seaside Resort Village in West Bengal",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/malvan/mmt/destination/m_Malvan_l_636_847.jpg?im=Resize=(400,462)",
      name: "Hidden Gem along Maharashtra's Coast",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/yelagiri/mmt/destination/m_destination_yelagiri_landscape_l_340_544.jpg?im=Resize=(400,462)",
      name: "Picture-Perfect Hill Station in Tamil Nadu",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/araku/mmt/destination/m_destination_Araku Valley_landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Hill Retreat in Andhra Pradesh",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/sasan/mmt/destination/m_destination_sasan_gir_l_400_640.jpg?im=Resize=(400,462)",
      name: "Nature Lover's Paradise in Gujarat",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/udupi/mmt/destination/m_destination-udupi-landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Spiritual Coastal Town in Karnataka",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/panchmarhi/mmt/destination/m_Destination_Panchmarhi_l_464_696.jpg?im=Resize=(400,462)",
      name: "Queen of Satpura Pachmarhi",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/dapoli/mmt/destination/m_Dapoli_l_703_937.jpg?im=Resize=(400,462)",
      name: "A Town with Beaches and Hills!",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/vengurla/mmt/destination/m_destination_vengurla_landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Known as the 'Goa of Malvan",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/dandeli/mmt/destination/m_Destination_Dandeli_l_536_804.jpg?im=Resize=(400,462)",
      name: "A Green Getaway in Karnataka",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/destination/mmt/destination/m_destination_vagamon_landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Idyllic Hill Station in Kerala",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/tadoba/mmt/destination/m_Tadoba_l_587_880.jpg?im=Resize=(400,462)",
      name: "Wildlife Hotspot in Maharashtra",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/guntur/mmt/destination/m_Guntur-landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Erstwhile Abode of Rulers in Andhra Pradesh",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/Bhandardara/mmt/destination/m_Bhandardara_l_568_852.jpg?im=Resize=(400,462)",
      name: "Hidden Gem in the Sahyadri Ranges",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/shoghi/mmt/destination/m_Shoghi_l_667_1000.jpg?im=Resize=(400,462)",
      name: "Striking Hill Resort near Shimla",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/srisailam/mmt/destination/m_srisailam-landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "A Spiritual Getaway in Andhra Pradesh",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/vellore/mmt/destination/m_destination-vellore-landscape_l_400_640.jpg?im=Resize=(400,462)",
      name: "Ancient City in Tamil Nadu",
    },
    {
      img: "https://hblimg.mmtcdn.com//content/hubble/img/parwanoo/mmt/destination/m_Parwanoo_l_393_699.jpg?im=Resize=(400,462)",
      name: "Beautiful Apple & Peach Orchards",
    },
  ];

  const swiperRef = useRef(null);
  const [destinations, setIndianDestinations] = useState([]);

  useEffect(() => {
    const fetchIndianDest = async () => {
      try {
        const response = await axios.get(
          "https://admin.trustedfare.com/api/HolidayPackages/IndianDestinations"
        );

        if (
          response.data &&
          response.data.success === true &&
          Array.isArray(response.data.data)
        ) {
          setIndianDestinations(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching popular Indian Destinations:", error);
      }
    };
    fetchIndianDest();
  }, []);

  return (
    <section className="pt-60 holiday_package_main_home">
      {destinations && destinations.length > 0 && (
        <Container style={{ position: "relative" }}>
          <h2 className=" mb-4 holiday-pack-h2">
            <strong>
              India's Best-Kept Secrets: Stories and Spots You Must Discover
            </strong>
          </h2>

          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            // modules={[Pagination, Autoplay]}
            autoplay
            loop
            className="mySwiper"
            style={{ paddingBottom: "20px" }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {destinations &&
              destinations.map((destination, index) => (
                <SwiperSlide style={{ width: "301px" }} key={index}>
                  <div
                    data-test="topDestination_item"
                    className="tpDest__slider--item"
                    style={{ width: "100%", display: "inline-block" }}
                  >
                    <Link to={`/tour/${destination.slug}`}>
                      <div className="tpDest__slider--itemImg">
                        <div className="tpDest__slider--itemDesc">
                          <p className="latoBold font16 lineHeight22 whiteText">
                            {destination.name}
                          </p>
                        </div>
                        <img src={destination.image} alt={destination.name} />
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            className="custom-next3"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaChevronRight />
          </div>
          <div
            className="custom-prev3"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaChevronLeft />
          </div>
        </Container>
      )}
    </section>
  );
};

export default HolidayPackages;

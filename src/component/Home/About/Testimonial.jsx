import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import './Testi.css'
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
const Testimonial = () => {
  return (
    <section className="section-box box-testimonials-2 box-testimonials-4 background-body">
      <div className="container">
        <div className="text-center wow fadeInUp" style={{ visibility: "visible" }}>
          <div className="d-flex justify-content-center">
            <div className="box-author-testimonials">
              <img src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/testimonial.png" alt="Travila" />
              <img src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/testimonial2.png" alt="Travila" />
              <img src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/testimonial3.png" alt="Travila" />
            <div style={{marginLeft:'20px'}}>  Testimonials</div>
            </div>
          </div>
          <h2 className="mt-8 mb-35 neutral-1000" style={{fontWeight:'700'}}>Don't take our word for it</h2>
        </div>
        <div className="row align-items-center wow fadeInUp" style={{ visibility: "visible" }}>
          <div className="col-lg-6 mb-30">
            <img className="light-mode" src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage7/img-testimonial.png" alt="Travila" />
            <img className="dark-mode" src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage7/img-testimonial-dark.png" alt="Travila" />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-swiper box-swiper-home7">
              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                // breakpoints={{
                //   768: {
                //     slidesPerView: 2,
                //     spaceBetween: 20,
                //   },
                //   1024: {
                //     slidesPerView: 3,
                //     spaceBetween: 30,
                //   },
                // }}
              >
                {/* Swiper Slide 1 */}
                <SwiperSlide>
                  <div className="card-testimonial background-card">
                    <div className="card-info">
                      <p className="text-xl-bold card-title neutral-1000">The best booking system</p>
                      <p className="neutral-500">
                        I've been using the Flight booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of flights.
                      </p>
                    </div>
                    <div className="card-top">
                      <div className="card-author">
                        <div className="card-image">
                          <img src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/author.png" alt="Travila" />
                        </div>
                        <div className="card-info">
                          <p className="text-lg-bold neutral-1000">Sara Mohamed</p>
                          <p className="text-sm neutral-1000">Jakatar</p>
                        </div>
                      </div>
                      <div className="card-rate">
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Swiper Slide 2 */}
                <SwiperSlide>
                  <div className="card-testimonial background-card">
                    <div className="card-info">
                      <p className="text-xl-bold card-title neutral-1000">The best booking system</p>
                      <p className="neutral-500">
                        I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.
                      </p>
                    </div>
                    <div className="card-top">
                      <div className="card-author">
                        <div className="card-image">
                          <img src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/author2.png" alt="Travila" />
                        </div>
                        <div className="card-info">
                          <p className="text-lg-bold neutral-1000">Atend John</p>
                          <p className="text-sm neutral-1000">California</p>
                        </div>
                      </div>
                      <div className="card-rate">
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Swiper Slide 3 */}
                <SwiperSlide>
                  <div className="card-testimonial background-card">
                    <div className="card-info">
                      <p className="text-xl-bold card-title neutral-1000">The best booking system</p>
                      <p className="neutral-500">
                        I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.
                      </p>
                    </div>
                    <div className="card-top">
                      <div className="card-author">
                        <div className="card-image">
                          <img src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/author.png" alt="Travila" />
                        </div>
                        <div className="card-info">
                          <p className="text-lg-bold neutral-1000">Sara Mohamed</p>
                          <p className="text-sm neutral-1000">Jakatar</p>
                        </div>
                      </div>
                      <div className="card-rate">
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                        <img src="https://travila-nextjs.vercel.app/assets/imgs/template/icons/star.svg" alt="Travila" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Swiper Navigation Buttons */}
              <div className="testimonial-swiperees-prev testimonial-swiperees swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-group-1">
                <GoArrowLeft color="#161845"/>
              </div>
              <div className="testimonial-swiperees-next testimonial-swiperees swiper-button-next swiper-button-next-style-1 swiper-button-next-group-1">
              <GoArrowRight color="#161845"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

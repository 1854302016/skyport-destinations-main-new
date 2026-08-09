import React from "react";
import "./SectionFive.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const SectionFive = () => {
  return (
    <section className="benefits-one">
      <div className="benefits-one__shape-1 float-bob-x">
        <img src="assets/images/shapes/benefits-one-shape-1.png" alt="" />
      </div>
      <div className="benefits-one__shape-2 float-bob-y">
        <img src="assets/images/shapes/benefits-one-shape-2.png" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-5">
            <div className="benefits-one__left">
              <div className="section-title text-left">
                <span
                  className="section-title__taglineeee"
                  style={{ color: "#1b348c" }}
                >
                  Our Benefits
                </span>
                <h2 className="section-title__titlell">
                  Learn More About TravelsData Benefits
                </h2>
              </div>
              <p className="benefits-one__text">
              Make your trips easier with TravelsData – enjoy hassle-free bookings, live travel updates, and smart savings, all designed to give you a smoother, more affordable travel experience.
              </p>
              <Link to="/contact" className=" benefits-one__btn">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="benefits-one__right">
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  {/*Benefit One Single Start*/}
                  <div className="benefits-one__single">
                    <div className="benefits-one__content">
                      <div className="benefits-one__icon">
                        <img
                          src="https://cdn-icons-png.freepik.com/512/1604/1604546.png?ga=GA1.1.12114912.1717589849"
                          style={{ height: "40px" }}
                          className="icon-travel-insurance-1"
                        />
                      </div>
                      <div className="benefits-one__title">
                        <h3>
                          <Link>
                            Extensive Flight
                            <br /> Search
                          </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="benefits-one__arrow">
                      <Link>
                        <MdKeyboardArrowRight
                          className="fas fa-angle-right"
                          size={30}
                        />
                      </Link>
                    </div>
                  </div>
                  {/*Benefit One Single End*/}
                  {/*Benefit One Single Start*/}
                  <div className="benefits-one__single">
                    <div className="benefits-one__content">
                      <div className="benefits-one__icon">
                        <img
                          src="https://cdn-icons-png.freepik.com/512/2782/2782459.png?ga=GA1.1.12114912.1717589849"
                          style={{ height: "40px" }}
                          className="icon-pilot"
                        />
                      </div>
                      <div className="benefits-one__title">
                        <h3>
                          <Link>
                            Efficient Booking <br /> System
                          </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="benefits-one__arrow">
                      <Link>
                        <MdKeyboardArrowRight
                          className="fas fa-angle-right"
                          size={30}
                        />
                      </Link>
                    </div>
                  </div>
                  {/*Benefit One Single End*/}
                  {/*Benefit One Single Start*/}
                  <div className="benefits-one__single">
                    <div className="benefits-one__content">
                      <div className="benefits-one__icon">
                        <img
                          src="https://cdn-icons-png.freepik.com/512/17980/17980489.png?ga=GA1.1.12114912.1717589849"
                          style={{ height: "40px" }}
                          className="icon-plane"
                        />
                      </div>
                      <div className="benefits-one__title">
                        <h3>
                          <Link>
                            Competitive <br /> Pricing
                          </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="benefits-one__arrow">
                      <Link>
                        <MdKeyboardArrowRight
                          className="fas fa-angle-right"
                          size={30}
                        />
                      </Link>
                    </div>
                  </div>
                  {/*Benefit One Single End*/}
                </div>
                <div className="col-xl-6 col-lg-6">
                  {/*Benefit One Single Start*/}
                  <div className="benefits-one__single">
                    <div className="benefits-one__content">
                      <div className="benefits-one__icon">
                        <img
                          src="https://cdn-icons-png.freepik.com/512/18222/18222306.png?ga=GA1.1.12114912.1717589849"
                          style={{ height: "40px" }}
                          className="icon-plane"
                        />
                      </div>
                      <div className="benefits-one__title">
                        <h3>
                          <Link>
                            24/7 <br /> Support
                          </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="benefits-one__arrow">
                      <Link>
                        <MdKeyboardArrowRight
                          className="fas fa-angle-right"
                          size={30}
                        />
                      </Link>
                    </div>
                  </div>
                  {/*Benefit One Single End*/}
                  {/*Benefit One Single Start*/}
                  <div className="benefits-one__single">
                    <div className="benefits-one__content">
                      <div className="benefits-one__icon">
                        <img
                          src="https://cdn-icons-png.freepik.com/512/18326/18326454.png?ga=GA1.1.12114912.1717589849"
                          style={{ height: "40px" }}
                          className="icon-globe"
                        />
                      </div>
                      <div className="benefits-one__title">
                        <h3>
                          <Link>
                            Customizable <br /> Solutions
                          </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="benefits-one__arrow">
                      <Link>
                        <MdKeyboardArrowRight
                          className="fas fa-angle-right"
                          size={30}
                        />
                      </Link>
                    </div>
                  </div>
                  {/*Benefit One Single End*/}
                  {/*Benefit One Single Start*/}
                  <div className="benefits-one__single">
                    <div className="benefits-one__content">
                      <div className="benefits-one__icon">
                        <img
                          src="https://cdn-icons-png.freepik.com/512/3929/3929255.png?ga=GA1.1.12114912.1717589849"
                          style={{ height: "40px" }}
                          className="icon-flight"
                        />
                      </div>
                      <div className="benefits-one__title">
                        <h3>
                          <Link>
                            Real-Time <br /> Updates
                          </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="benefits-one__arrow">
                      <Link>
                        <MdKeyboardArrowRight
                          className="fas fa-angle-right"
                          size={30}
                        />
                      </Link>
                    </div>
                  </div>
                  {/*Benefit One Single End*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFive;

import React from 'react'
import './FlightDetailss.css'
const FlightDetailss = () => {
  return (
    <div className="flight-details pr slide-down ovf-hidden full-width full-details">
      <div className="header full-width table clearfix">
        <div className="active bold cursor-pointer heading pr text-center fs-13">
          <div className="text pr i-b">Flight Details</div>
        </div>
        <div className="cursor-pointer heading pr text-center fs-13">
          <div className="text pr i-b">Fare Summary</div>
        </div>
        <div className="cursor-pointer heading pr text-center fs-13">
          <div className="text pr i-b">Fare Rules</div>
        </div>
        <span className="fs-22 i-b pr-5 cursor-pointer ytfi-cancel" />
      </div>
      <div className="details">
        <div className="contents white-bg ">
          <div className="pr container">
            <div className="tab-content scroll-v">
              <div className="schedule">
                <div className="airline-det fs-13 flex">
                  <div className="logo clearfix">
                    <span className="ytfi-plane">
                      <span className="airline-logo">
                        <i className="air-logo domAirLogo xUK size-28" />
                      </span>
                    </span>
                  </div>
                  <div className="airline pl-10 text-left">
                    <div className="airline-text full-width mb-2">
                      <span
                        className="i-b name fs-13 ellipsis pull-left"
                        title="Vistara"
                      >
                        Vistara
                      </span>
                      <span className="mr-2">, UK-983</span>
                      <span
                        className="ellipsis font-lightestgrey fs-12 i-b air-className v-aligm-m"
                        title="Economy"
                      >
                        {" "}
                        (Economy)
                      </span>
                    </div>
                    <div className="airline-sub fs-10 font-lightgrey i-b ellipsis full pull-left">
                      <span>Airbus A320-100</span>
                    </div>
                  </div>
                  <div className="amenties text-right fs-13">
                    <div className="amenety font-lightgrey i-b meal">
                      <div className="tipsy">
                        <i className="ytfi-meal" />
                        <div className="text-center tipsy-content fs-10 bottom bottom-center">
                          <p className="content">Free Meal</p>
                        </div>
                      </div>
                    </div>
                    <div className="amenety font-lightgrey i-b wifi disabled">
                      <div className="tipsy">
                        <i className="ytfi-wifi" />
                        <div className="text-center tipsy-content fs-10 bottom bottom-center">
                          <p className="content" />
                        </div>
                      </div>
                    </div>
                    <div className="amenety font-lightgrey i-b seat disabled">
                      <div className="tipsy">
                        <i className="ytfi-seat" />
                        <div className="text-center tipsy-content fs-10 bottom bottom-center">
                          <p className="content" />
                        </div>
                      </div>
                    </div>
                    <div className="amenety font-lightgrey i-b power disabled">
                      <div className="tipsy">
                        <i className="ytfi-power" />
                        <div className="text-center tipsy-content fs-10 bottom bottom-right">
                          <p className="content" />
                        </div>
                      </div>
                    </div>
                    <div className="amenety font-lightgrey i-b entTyp disabled">
                      <div className="tipsy">
                        <i className="ytfi-entertainment" />
                        <div className="text-center tipsy-content fs-10 bottom bottom-right">
                          <p className="content" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center full-width schedule-det clearfix">
                  <div className="pr-18 depart-det city pull-left text-left">
                    <div
                      className="mb-2 fs-13 no-wrap ellipsis"
                      title="New Delhi (DEL)"
                    >
                      New Delhi (DEL)
                    </div>
                    <div className="bold fs-16 mb-2">02:30</div>
                    <div className="bold fs-12 mb-5">Sat, 27 Apr 2024</div>
                    <div
                      className="font-lightestgrey fs-12 ellipsis"
                      title="Indira Gandhi ,T-3"
                    >
                      <span>Indira Gandhi</span>
                      <span className="ml-2">,T-3</span>
                    </div>
                  </div>
                  <div className="duration-stop pull-left text-center clearfix pr">
                    <span className="fs-12 i-b mb-14 no-wrap">
                      <i className="ytfi-clock mr-2" />
                      <span className="fs-12 du text-left mb-14">2h 15m </span>
                    </span>
                    <div className="bdr-btm-grey full-width pull-left pr">
                      <i className="abs white-bg transport-icon abs font-lightestgrey ytfi-plane" />
                    </div>
                    <div className="fs-12 du mt-10 no-wrap">
                      <span className="">Non Stop</span>
                    </div>
                  </div>
                  <div className="arrive-det city pull-left text-left">
                    <div
                      className="mb-2 fs-13 no-wrap ellipsis"
                      title="Mumbai (BOM)"
                    >
                      Mumbai (BOM)
                    </div>
                    <div className="bold fs-16 mb-2">04:45</div>
                    <div
                      className="bold fs-12 mb-5 ellipsis"
                      title="Sat, 27 Apr 2024"
                    >
                      Sat, 27 Apr 2024
                    </div>
                    <div
                      className="ellipsis font-lightestgrey fs-12"
                      title="Chatrapati Shivaji ,T-2"
                    >
                      <span>Chatrapati Shivaji</span>
                      <span className="ml-2">,T-2</span>
                    </div>
                  </div>
                </div>
                <div className="amen-details mb-15 text-center">
                  <div className="fs-12 no-wrap">
                    <span className="baggage">
                      <span className="mr-5 font-lightestgrey">
                        Checkin Baggage:
                      </span>
                      <span className="font-lightgrey">
                        <i className="mr-5 ytfi-bag" />1 piece
                      </span>
                    </span>
                    <span className="meal">
                      <i className="font-lightgrey mr-5 ytfi-meal" />
                      Free Meal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightDetailss
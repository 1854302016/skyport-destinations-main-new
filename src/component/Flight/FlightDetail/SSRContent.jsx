import React, { useState } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";

const SSRContent = ({
  srdvIdx,
  index,
  passenger,
  passengers,
  activeTab,
  ssrResponse,
  ssrResponse2,
  handleChangeCurrency,
  passengerBaggagePreferences,
  setPassengerBaggagePreferences,
  passengerMealPreferences,
  setPassengerMealPreferences,
  passengerSeatPreferences,
  setPassengerSeatPreferences,
}) => {
  const [activesubtab, setactivesubtab] = useState("selectseat");
  // const [selectedBaggage, setSelectedBaggage] = useState(null); // State to store selected baggage for each passenger

  console.log("ssrResponsemnfvbvv", ssrResponse);
  const handlechangeactivesubtab = (tabid) => {
    setactivesubtab(tabid);
  };

  const handleBaggageSelection = (option) => {
    const updatedPreferences = [...passengerBaggagePreferences];
    updatedPreferences[index] = option;
    setPassengerBaggagePreferences(updatedPreferences);
    // console.log("passeneger bag preference", passengerBaggagePreferences);
  };

  const handleSeatSelection = (option) => {
    const updatedPreferences = [...passengerSeatPreferences];
    updatedPreferences[index] = option;
    setPassengerSeatPreferences(updatedPreferences);
    console.log("passeneger seat preference", passengerSeatPreferences);
  };


  const handleMealSelection = (option) => {
    const updatedPreferences = [...passengerMealPreferences];
    updatedPreferences[index] = option;
    setPassengerMealPreferences(updatedPreferences);
    // console.log("passeneger meal preference", passengerMealPreferences);
  };
  

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    // setActivePassenger(passengers[index]); // Set active passenger
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const seatData = Array.from({ length: 38 }, (_, i) =>
  //   Array.from({ length: 6 }, (_, j) => ({
  //     seatCode: `${i + 1}${String.fromCharCode((j % 6) + 65)}`,
  //     seatPrice: Math.floor(Math.random() * 1000) + 100,
  //     occupied: Math.random() < 0.5,
  //   }))
  // );

  const [activeSeat, setActiveSeat] = useState(null);

  const toggleSeatDetails = (seatCode) => {
    setActiveSeat(activeSeat === seatCode ? null : seatCode);
  };
  const [activePassenger, setActivePassenger] = useState(passenger);

  // const handleSeatSelection = (selectedSeat) => {
  //   const updatedPassenger = { ...activePassenger, SeatCode: selectedSeat.Code };
  //   setActivePassenger(updatedPassenger);
  // };

  // const [selectedSeats, setSelectedSeats] = useState(
  //   Array(passengers.length).fill(null)
  // );
  // const handleSeatSelection = (passengerIndex, selectedSeat) => {
  //   const updatedSelectedSeats = [...selectedSeats];
  //   updatedSelectedSeats[passengerIndex] = selectedSeat;
  //   setSelectedSeats(updatedSelectedSeats);
  // };

  const [selectedRoute, setSelectedRoute] = useState(null);
  // Extract unique routes from ssrResponse.MealDynamic
  const routes =
    ssrResponse?.MealDynamic?.flat().reduce((acc, flight) => {
      const route = `${flight.Origin}-${flight.Destination}`;
      if (!acc.includes(route)) {
        acc.push(route);
      }
      return acc;
    }, []) || [];

  // Set the first route as active by default
  if (selectedRoute === null && routes.length > 0) {
    setSelectedRoute(routes[0]);
  }

  const [selectedRoutebaggage, setSelectedRoutebaggage] = useState(null);
  // Extract unique routes from ssrResponse.MealDynamic
  const routesbaggage =
    ssrResponse?.Baggage?.flat().reduce((acc, flight) => {
      const route = `${flight.Origin}-${flight.Destination}`;
      if (!acc.includes(route)) {
        acc.push(route);
      }
      return acc;
    }, []) || [];

  // Set the first route as active by default
  if (srdvIdx==="SrdvTJ" && selectedRoutebaggage === null && routesbaggage.length > 0) {
    setSelectedRoutebaggage(routesbaggage[0]);
  }

  const extractRoutes = (ssrResponse, type) => {
    const routes = [];

    srdvIdx==="SrdvTJ" && ssrResponse.baggageMeal.forEach((flight) => {
      flight.sI.forEach((segment) => {
        const route = `${segment.da.code}-${segment.aa.code}`;

        if (type === "MEAL" && segment.ssrInfo.MEAL.length > 0) {
          if (!routes.includes(route)) {
            routes.push(route);
          }
        }

        if (type === "BAGGAGE" && segment.ssrInfo.BAGGAGE?.length > 0) {
          if (!routes.includes(route)) {
            routes.push(route);
          }
        }
      });
    });

    return routes;
  };
  const routesTJ = ssrResponse ? extractRoutes(ssrResponse, "MEAL") : [];
  const routesbaggageTJ = ssrResponse
    ? extractRoutes(ssrResponse, "BAGGAGE")
    : [];

  return (
    <div
      role="tabpanel"
      className={`tab-pane maintabcontent ${activeTab === index && "active"}`}
      id={`passengertab${passenger.id}`}
    >
      <p>
        {passenger.type} {passenger.id} details :{" "}
        {/* <span id={`adultName_${passenger.id}`}>{passenger.name}</span> */}
      </p>

      <Nav variant="tabs" className="nav-tabs custom_tabs">
        <Nav.Item className={activesubtab === "selectseat" && "active"}>
          <Nav.Link
            // href={`#selectseat${passenger.id}`}
            // aria-controls={`selectseat${passenger.id}`}
            role="tab"
            onClick={() => handlechangeactivesubtab("selectseat")}
          >
            Seats
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={activesubtab === "selectmeal" && "active"}>
          <Nav.Link
            // href={`#selectmeal${passenger.id}`}
            // aria-controls={`selectmeal${passenger.id}`}
            role="tab"
            onClick={() => handlechangeactivesubtab("selectmeal")}
          >
            Meals
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={activesubtab === "selectbag" && "active"}>
          <Nav.Link
            // href={`#selectbag${passenger.id}`}
            // aria-controls={`selectbag${passenger.id}`}
            role="tab"
            onClick={() => handlechangeactivesubtab("selectbag")}
          >
            Baggage
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* {ssrResponse && ( */}
      {srdvIdx === "undefined" && (
        <Tab.Content
        //  transition={false}
        >
          <Tab.Pane
            role="tabpanel"
            // className="seat_tabpane"
            className={`${
              activesubtab === "selectseat" ? "active show" : ""
            } seat_tabpane`}
            paxid={passenger.id}
            id={`selectseat${passenger.id}`}
          >
            <div className="seatloader" style={{ display: "none" }}>
              <i className="fa fa-spinner"></i>
            </div>
            {passenger.type !== "Infant" ? (
              ssrResponse ? (
                <button
                  className="btn btn-primary openseatpopup"
                  type="button"
                  onClick={handleOpenModal}
                >
                  Select Seat
                </button>
              ) : (
                <p style={{ textAlign: "center" }}>No SSR Details Found</p>
              )
            ) : (
              <p style={{ textAlign: "center" }}>
                Seats not available for Infants
              </p>
            )}
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              size="lg"
              id="seatsmodalpopup"
              className="seatmodal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Seat Map</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="block-content-2 custom_block_content">
                  <div className="box-result custom_box_result">
                    <div className="service_req_sec">
                      {ssrResponse && (
                        <Nav variant="tabs" className="custom_tabs">
                          {routesbaggage.map((route, index) => (
                            <Nav.Item
                              key={index}
                              className={`mybagpasadult-${index} ${
                                selectedRoutebaggage === route ? "active" : ""
                              } countdepvalue`}
                            >
                              <Nav.Link
                                href={`#bagpasadult-${index}-${route}`}
                                role="tab"
                                aria-controls={`bagpasadult-${index}-${route}`}
                                aria-expanded="true"
                                className={`mybagpasadult-${index} active countdepvalue`}
                                onClick={() => setSelectedRoutebaggage(route)}
                              >
                                {route}
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      )}
                      <Tab.Content
                      // transition={false}
                      >
                        <Tab.Pane
                          eventKey="departure_seat_0_Seg_0"
                          className="show active"
                        >
                          <div className="plane_seat_sec">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="seat_info">
                                  <div className="flight_name">
                                    <img
                                      src="https://www.zapbooking.com/public/img/airline/6E.gif"
                                      alt=""
                                      className="img-fluid"
                                    />
                                    <div className="name">
                                      <span className="flight_no">5605</span>
                                    </div>
                                  </div>
                                  <div className="ticket_info">
                                    {passengers.map((passenger, index) => (
                                      <div
                                        className="ticket_col"
                                        key={`passenger_${passenger.id}`}
                                      >
                                        <div className="tic_label">
                                          {passenger.type} {passenger.id}{" "}
                                          <span
                                            fid="0"
                                            tif={`${
                                              passenger.type === "Adult"
                                                ? "adultPaxSeat"
                                                : "childPaxSeat"
                                            }_${index}_0_Seg_0_paxCount`}
                                            className="seatnumber"
                                            id={`PaxSeat_${index}_Seg_0_paxCount_${passenger.id}`}
                                            style={{ visibility: "hidden" }}
                                          ></span>
                                        </div>
                                        <div className="tic_price">
                                          Rs{" "}
                                          <code
                                            id={`PaxSeatCH_${index}_Seg_0_paxCount_${passenger.id}`}
                                          >
                                            0.00
                                          </code>
                                        </div>
                                        <input
                                          className={`PaxSeat_${index}_Seg_0_paxCount_${passenger.id}`}
                                          type="hidden"
                                          name={`${passenger.type.toLowerCase()}_${
                                            passenger.id
                                          }_PaxSeat_${index}_Seg_0_paxCount_${
                                            passenger.id
                                          }`}
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  <div className="seat_section">
                                    <div className="seat_title">Seat Type</div>
                                    <ul>
                                      <li className="ytfi-seat booked">
                                        Occupied Seat
                                      </li>
                                      <li className="ytfi-seat sclt">
                                        <i className="fa fa-check"></i> Selected
                                        Seat
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="seat_list">
                                  <div className="main_title">Front</div>
                                  <div className="wings_top cus_wings">
                                    <span>Wings</span>
                                  </div>
                                  <div className="table-responsive table_data">
                                    <table border="0" className="table">
                                      {ssrResponse &&
                                        ssrResponse.SeatDynamic[0] &&
                                        ssrResponse.SeatDynamic[0]
                                          .SegmentSeat[0] && (
                                          <tbody>
                                            {ssrResponse.SeatDynamic[0].SegmentSeat[0].RowSeats.map(
                                              (row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                  {row.Seats.map(
                                                    (seat, seatIndex) => (
                                                      <td
                                                        key={`seat_${rowIndex}_${seatIndex}`}
                                                      >
                                                        <span
                                                          className={`ytfi-seat ${
                                                            seat.AvailablityType ===
                                                            3
                                                              ? "occupied"
                                                              : "open"
                                                          } ${
                                                            passengerSeatPreferences[
                                                              index
                                                            ] &&
                                                            passengerSeatPreferences[
                                                              index
                                                            ].Code === seat.Code
                                                              ? "selected"
                                                              : ""
                                                          }`}
                                                          onMouseEnter={() =>
                                                            toggleSeatDetails(
                                                              seat.Code
                                                            )
                                                          }
                                                          onMouseLeave={() =>
                                                            toggleSeatDetails(
                                                              seat.Code
                                                            )
                                                          }
                                                          onClick={() =>
                                                            seat.AvailablityType !==
                                                              3 &&
                                                            handleSeatSelection(
                                                              seat
                                                            )
                                                          }
                                                        >
                                                          {seat.Code}
                                                        </span>
                                                        <div
                                                          className="seatdetails"
                                                          id={`FlSeatInfo_${rowIndex}_Seg_0_Row_${rowIndex}_Seat_${seatIndex}`}
                                                          style={{
                                                            display:
                                                              activeSeat ===
                                                              seat.Code
                                                                ? ""
                                                                : "none",
                                                          }}
                                                        >
                                                          <ul className="seatinfo">
                                                            <li>
                                                              Seat No:{" "}
                                                              {seat.Code}
                                                            </li>
                                                            <li>
                                                              Price: ₹
                                                              {handleChangeCurrency(
                                                                seat.Price
                                                              )}
                                                            </li>
                                                          </ul>
                                                        </div>
                                                      </td>
                                                    )
                                                  )}
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        )}
                                    </table>
                                  </div>
                                  <div className="wings_bottom cus_wings">
                                    <span>Wings</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="departure_seat_0_Seg_1"
                          // className="show active"
                        >
                          <div className="plane_seat_sec">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="seat_info">
                                  <div className="flight_name">
                                    <img
                                      src="https://www.zapbooking.com/public/img/airline/6E.gif"
                                      alt=""
                                    />
                                    <div className="name">
                                      <span className="flight_no">949</span>
                                    </div>
                                  </div>
                                  <div className="ticket_info">
                                    {/* Seat details for adult and child passengers */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="seat_list">
                                  <div className="main_title">Front</div>
                                  <div className="wings_top cus_wings">
                                    <span>Wings</span>
                                  </div>
                                  <div className="table-responsive table_data">
                                    <table border="0" className="table">
                                      <tbody>
                                        <tr>
                                          {/* Seat rows and columns */}
                                          <td
                                            id="FlSeat_0_Seg_1_Row_1_Seat_0"
                                            seatprice="2000"
                                            seatcode="1A"
                                          >
                                            <span className="ytfi-seat occupied">
                                              1A
                                            </span>
                                            <div
                                              className="seatdetails"
                                              id="FlSeatInfo_0_Seg_1_Row_1_Seat_0"
                                              style={{ display: "none" }}
                                            >
                                              <ul className="seatinfo">
                                                <li>Seat No : 1A</li>
                                                <li id="StPrc_0_Seg_1_Row_1_Seat_0">
                                                  Price : Rs. 2000
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                          {/* Additional seat rows and columns */}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="wings_bottom cus_wings">
                                    <span>Wings</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </Tab.Pane>
          <Tab.Pane
            role="tabpanel"
            className={`${
              activesubtab === "selectmeal" ? "active show" : ""
            } seat_tabpane`}
            paxid={passenger.id}
            id={`selectmeal${passenger.id}`}
          >
            {ssrResponse ? (
              <div
                className="service_req_sec service_req_sec_nseat meal_info mealBoxAdult"
                id={`mealBoxAdult${passenger.id}`}
              >
                {ssrResponse && (
                  <Nav variant="tabs" className="custom_tabs">
                    {routes.map((route, index) => (
                      <Nav.Item
                        key={index}
                        className={`mybagpasadult-${index} ${
                          selectedRoute === route ? "active" : ""
                        } countdepvalue`}
                      >
                        <Nav.Link
                          href={`#bagpasadult-${index}-${route}`}
                          role="tab"
                          aria-controls={`bagpasadult-${index}-${route}`}
                          aria-expanded="true"
                          className={`mybagpasadult-${index} active countdepvalue`}
                          onClick={() => setSelectedRoute(route)}
                        >
                          {route}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                )}
                <Tab.Content
                // transition={false}
                >
                  <Tab.Pane
                    role="tabpanel"
                    className={`${
                      activesubtab === "selectmeal" ? "active show" : ""
                    }`}
                    paxid={passenger.id}
                    id={`selectmeal${passenger.id}`}
                  >
                    <div
                      className="meals_list service_req_list dep_meal_sele"
                      id={`mealBoxAdult${passenger.id}`}
                    >
                      <ul className="nav nav-tabs custom_tabs">
                        {ssrResponse.MealDynamic[0]
                          .filter(
                            (meal) =>
                              `${meal.Origin}-${meal.Destination}` ===
                              selectedRoute
                          )
                          .map((meal, idx) => (
                            <li key={idx} className="nav-item">
                              <div className="serv_addon_sel">
                                <div className="serv_txt ">
                                  <div className="serv_icon">
                                    <i className="fa fa-utensils"></i>
                                  </div>
                                  <span className="serv_price bag_price">
                                    ₹ {meal.Price}
                                  </span>
                                  <span className="serv_type meals_type">
                                    <input
    type="checkbox"
    className="form-check-input"
    checked={
      passengerMealPreferences[index] &&
      passengerMealPreferences[index].Code === meal.Code &&
      passengerMealPreferences[index].FlightNumber === meal.FlightNumber
    }
    onChange={() => handleMealSelection(meal)}
    disabled={
      passengerMealPreferences[index] &&
      passengerMealPreferences[index].Code === meal.Code &&
      passengerMealPreferences[index].FlightNumber === meal.FlightNumber
    }
  />
                                    {meal.AirlineDescription
                                      ? meal.AirlineDescription
                                      : meal.Code}
                                  </span>
                                </div>
                                <div className="serv_btn">
                              

                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>

                      <div className="tab-content"></div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>No SSR Details Found</p>
            )}
            {/* </div> */}
          </Tab.Pane>
          <Tab.Pane
            role="tabpanel"
            className={`${activesubtab === "selectbag" ? "active show" : ""}`}
            paxid={passenger.id}
            id={`selectbag${passenger.id}`}
          >
            <div
              className="service_req_sec service_req_sec_nseat baggage_info baggageBoxAdult"
              id={`baggageBoxAdult${passenger.id}`}
            >
              {ssrResponse && (
                <Nav variant="tabs" className="custom_tabs">
                  {routesbaggage.map((route, index) => (
                    <Nav.Item
                      key={index}
                      className={`mybagpasadult-${index} ${
                        selectedRoutebaggage === route ? "active" : ""
                      } countdepvalue`}
                    >
                      <Nav.Link
                        href={`#bagpasadult-${index}-${route}`}
                        role="tab"
                        aria-controls={`bagpasadult-${index}-${route}`}
                        aria-expanded="true"
                        className={`mybagpasadult-${index} active countdepvalue`}
                        onClick={() => setSelectedRoutebaggage(route)}
                      >
                        {route}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              )}
              <Tab.Content>
                <Tab.Pane
                  role="tabpanel"
                  className="mydbagpasadult-0 tab-pane show active"
                  id="bagpasadult-0-DEL-BLR"
                >
                  <div className="baggage_list service_req_list dep_baggage_sele">
                    {/* {passenger.type !== "Infant" ? ( */}
                      {ssrResponse ? (
                        <ul
                          id="adultbaggage_0_DEL-BLR"
                          className="b_DEL-BLR"
                          vclass="DEL-BLR"
                        >
                          {ssrResponse.Baggage[0]
                            .filter(
                              (baggage) =>
                                `${baggage.Origin}-${baggage.Destination}` ===
                                selectedRoutebaggage
                            )
                            .map((option, idx) => (
                              <li key={idx}>
                                <div className="serv_addon_sel">
                                  <div className="serv_txt serv_txt2">
                                    <div className="serv_icon">
                                      <i className="fa fa-suitcase"></i>
                                    </div>
                                    <span className="serv_price bag_price">
                                      ₹{(option.Price)}
                                    </span>
                                    <span className="serv_type meals_type">
                                      Additional {option.Weight} kg
                                    </span>
                                  </div>
                                  <div className="serv_btn">
                                    <button
                                      type="button"
                                      className="btn-sm btn-primary selectbagforpax"
                                      data-value="NoBaggage,5605,6E"
                                      price="0"
                                      data-bag="0"
                                      onClick={() =>
                                        handleBaggageSelection(option)
                                      }
                                      disabled={
                                        passengerBaggagePreferences[index] &&
                                        passengerBaggagePreferences[index]
                                          .Code === option.Code
                                      }
                                    >
                                      {passengerBaggagePreferences[index] &&
                                      passengerBaggagePreferences[index]
                                        .Code === option.Code
                                        ? "Selected"
                                        : "Select"}
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          No SSR Details Found
                        </p>
                      )
                    //  : (
                    //   <p style={{ textAlign: "center" }}>
                    //     Baggage not available for Infants
                    //   </p>
                    // )
                    }

                  </div>
                </Tab.Pane>
              </Tab.Content>
              <code style={{ display: "none" }} id="bagwt_0_seg_0">
                0
              </code>
              <code style={{ display: "none" }} id="bagch_0_seg_0">
                0
              </code>
              <input
                type="hidden"
                id="bagin_0_seg_0"
                className=""
                value=""
                name="AdultbaggageSel_1"
              />
            </div>
          </Tab.Pane>
        </Tab.Content>
      )}
      {srdvIdx === "SrdvTJ" && (
        <Tab.Content
        //  transition={false}
        >
          <Tab.Pane
            role="tabpanel"
            // className="seat_tabpane"
            className={`${
              activesubtab === "selectseat" ? "active show" : ""
            } seat_tabpane`}
            paxid={passenger.id}
            id={`selectseat${passenger.id}`}
          >
            <div className="seatloader" style={{ display: "none" }}>
              <i className="fa fa-spinner"></i>
            </div>
            {passenger.type !== "Infant" ? (
              ssrResponse ? (
                <button
                  className="btn btn-primary openseatpopup"
                  type="button"
                  onClick={handleOpenModal}
                >
                  Select Seat
                </button>
              ) : (
                <p style={{ textAlign: "center" }}>No SSR Details Found</p>
              )
            ) : (
              <p style={{ textAlign: "center" }}>
                Seats not available for Infants
              </p>
            )}
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              size="lg"
              id="seatsmodalpopup"
              className="seatmodal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Seat Map</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="block-content-2 custom_block_content">
                  <div className="box-result custom_box_result">
                    <div className="service_req_sec">
                      {ssrResponse && (
                        <Nav variant="tabs" className="custom_tabs">
                          {routesbaggage.map((route, index) => (
                            <Nav.Item
                              key={index}
                              className={`mybagpasadult-${index} ${
                                selectedRoutebaggage === route ? "active" : ""
                              } countdepvalue`}
                            >
                              <Nav.Link
                                href={`#bagpasadult-${index}-${route}`}
                                role="tab"
                                aria-controls={`bagpasadult-${index}-${route}`}
                                aria-expanded="true"
                                className={`mybagpasadult-${index} active countdepvalue`}
                                onClick={() => setSelectedRoutebaggage(route)}
                              >
                                {route}
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      )}
                      <Tab.Content
                      // transition={false}
                      >
                        <Tab.Pane
                          eventKey="departure_seat_0_Seg_0"
                          className="show active"
                        >
                          <div className="plane_seat_sec">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="seat_info">
                                  <div className="flight_name">
                                    <img
                                      src="https://www.zapbooking.com/public/img/airline/6E.gif"
                                      alt=""
                                      className="img-fluid"
                                    />
                                    <div className="name">
                                      <span className="flight_no">5605</span>
                                    </div>
                                  </div>
                                  <div className="ticket_info">
                                    {passengers.map((passenger, index) => (
                                      <div
                                        className="ticket_col"
                                        key={`passenger_${passenger.id}`}
                                      >
                                        <div className="tic_label">
                                          {passenger.type} {passenger.id}{" "}
                                          <span
                                            fid="0"
                                            tif={`${
                                              passenger.type === "Adult"
                                                ? "adultPaxSeat"
                                                : "childPaxSeat"
                                            }_${index}_0_Seg_0_paxCount`}
                                            className="seatnumber"
                                            id={`PaxSeat_${index}_Seg_0_paxCount_${passenger.id}`}
                                            style={{ visibility: "hidden" }}
                                          ></span>
                                        </div>
                                        <div className="tic_price">
                                          Rs{" "}
                                          <code
                                            id={`PaxSeatCH_${index}_Seg_0_paxCount_${passenger.id}`}
                                          >
                                            0.00
                                          </code>
                                        </div>
                                        <input
                                          className={`PaxSeat_${index}_Seg_0_paxCount_${passenger.id}`}
                                          type="hidden"
                                          name={`${passenger.type.toLowerCase()}_${
                                            passenger.id
                                          }_PaxSeat_${index}_Seg_0_paxCount_${
                                            passenger.id
                                          }`}
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  <div className="seat_section">
                                    <div className="seat_title">Seat Type</div>
                                    <ul>
                                      <li className="ytfi-seat booked">
                                        Occupied Seat
                                      </li>
                                      <li className="ytfi-seat sclt">
                                        <i className="fa fa-check"></i> Selected
                                        Seat
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="seat_list">
                                  <div className="main_title">Front</div>
                                  <div className="wings_top cus_wings">
                                    <span>Wings</span>
                                  </div>
                                  <div className="table-responsive table_data">
                                    <table border="0" className="table">
                                      {ssrResponse &&
                                        ssrResponse.tripSeatMap &&
                                        ssrResponse.tripSeatMap.tripSeat && (
                                          <tbody>
                                            {Object.entries(
                                              ssrResponse.tripSeatMap.tripSeat
                                            ).map(([key, value]) => {
                                              if (value.sData && value.sInfo) {
                                                const { sData, sInfo } = value;
                                                const rows = Array.from(
                                                  { length: sData.row },
                                                  (_, i) => i + 1
                                                );
                                                const columns = Array.from(
                                                  { length: sData.column },
                                                  (_, i) => i + 1
                                                );

                                                const seats = rows.map(
                                                  (row) => {
                                                    return columns.map(
                                                      (column) => {
                                                        const seat = sInfo.find(
                                                          (seat) =>
                                                            seat.seatPosition
                                                              .row === row &&
                                                            seat.seatPosition
                                                              .column === column
                                                        );
                                                        return seat || null;
                                                      }
                                                    );
                                                  }
                                                );

                                                return seats.map(
                                                  (rowSeats, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                      {rowSeats.map(
                                                        (seat, seatIndex) => (
                                                          <td
                                                            key={`seat_${rowIndex}_${seatIndex}`}
                                                          >
                                                            {seat ? (
                                                              <span
                                                                className={`ytfi-seat ${
                                                                  seat.isBooked
                                                                    ? "occupied"
                                                                    : "open"
                                                                } ${
                                                                  passengerSeatPreferences[
                                                                    index
                                                                  ] &&
                                                                  passengerSeatPreferences[
                                                                    index
                                                                  ].code ===
                                                                    seat.code
                                                                    ? "selected"
                                                                    : ""
                                                                }`}
                                                                onMouseEnter={() =>
                                                                  toggleSeatDetails(
                                                                    seat.code
                                                                  )
                                                                }
                                                                onMouseLeave={() =>
                                                                  toggleSeatDetails(
                                                                    seat.code
                                                                  )
                                                                }
                                                                onClick={() =>
                                                                  !seat.isBooked &&
                                                                  handleSeatSelection(
                                                                    seat
                                                                  )
                                                                }
                                                              >
                                                                {seat.code}
                                                              </span>
                                                            ) : null}
                                                            {seat && (
                                                              <div
                                                                className="seatdetails"
                                                                id={`FlSeatInfo_${rowIndex}_Seg_0_Row_${rowIndex}_Seat_${seatIndex}`}
                                                                style={{
                                                                  display:
                                                                    activeSeat ===
                                                                    seat.code
                                                                      ? ""
                                                                      : "none",
                                                                }}
                                                              >
                                                                <ul className="seatinfo">
                                                                  <li>
                                                                    Seat No:{" "}
                                                                    {seat.code}
                                                                  </li>
                                                                  <li>
                                                                    Price: ₹
                                                                    {handleChangeCurrency(
                                                                      seat.amount
                                                                    )}
                                                                  </li>
                                                                </ul>
                                                              </div>
                                                            )}
                                                          </td>
                                                        )
                                                      )}
                                                    </tr>
                                                  )
                                                );
                                              } else if (value.nt) {
                                                return (
                                                  <tr key={key}>
                                                    <td
                                                      colSpan="7"
                                                      className="text-center"
                                                    >
                                                      {value.nt}
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                              return null;
                                            })}
                                          </tbody>
                                        )}
                                    </table>
                                  </div>
                                  <div className="wings_bottom cus_wings">
                                    <span>Wings</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="departure_seat_0_Seg_1"
                          // className="show active"
                        >
                          <div className="plane_seat_sec">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="seat_info">
                                  <div className="flight_name">
                                    <img
                                      src="https://www.zapbooking.com/public/img/airline/6E.gif"
                                      alt=""
                                    />
                                    <div className="name">
                                      <span className="flight_no">949</span>
                                    </div>
                                  </div>
                                  <div className="ticket_info">
                                    {/* Seat details for adult and child passengers */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="seat_list">
                                  <div className="main_title">Front</div>
                                  <div className="wings_top cus_wings">
                                    <span>Wings</span>
                                  </div>
                                  <div className="table-responsive table_data">
                                    <table border="0" className="table">
                                      <tbody>
                                        <tr>
                                          {/* Seat rows and columns */}
                                          <td
                                            id="FlSeat_0_Seg_1_Row_1_Seat_0"
                                            seatprice="2000"
                                            seatcode="1A"
                                          >
                                            <span className="ytfi-seat occupied">
                                              1A
                                            </span>
                                            <div
                                              className="seatdetails"
                                              id="FlSeatInfo_0_Seg_1_Row_1_Seat_0"
                                              style={{ display: "none" }}
                                            >
                                              <ul className="seatinfo">
                                                <li>Seat No : 1A</li>
                                                <li id="StPrc_0_Seg_1_Row_1_Seat_0">
                                                  Price : Rs. 2000
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                          {/* Additional seat rows and columns */}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="wings_bottom cus_wings">
                                    <span>Wings</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </Tab.Pane>
          <Tab.Pane
            role="tabpanel"
            className={`${
              activesubtab === "selectmeal" ? "active show" : ""
            } seat_tabpane`}
            paxid={passenger.id}
            id={`selectmeal${passenger.id}`}
          >
            {ssrResponse ? (
              <div
                className="service_req_sec service_req_sec_nseat meal_info mealBoxAdult"
                id={`mealBoxAdult${passenger.id}`}
              >
                {ssrResponse && (
                  <Nav variant="tabs" className="custom_tabs">
                    {routesTJ.map((route, index) => (
                      <Nav.Item
                        key={index}
                        className={`mybagpasadult-${index} ${
                          selectedRoute === route ? "active" : ""
                        } countdepvalue`}
                      >
                        <Nav.Link
                          href={`#bagpasadult-${index}-${route}`}
                          role="tab"
                          aria-controls={`bagpasadult-${index}-${route}`}
                          aria-expanded="true"
                          className={`mybagpasadult-${index} active countdepvalue`}
                          onClick={() => setSelectedRoute(route)}
                        >
                          {route}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                )}
                <Tab.Content
                // transition={false}
                >
                  <Tab.Pane
                    role="tabpanel"
                    className={`${
                      activesubtab === "selectmeal" ? "active show" : ""
                    }`}
                    paxid={passenger.id}
                    id={`selectmeal${passenger.id}`}
                  >
                    <div
                      className="meals_list service_req_list dep_meal_sele"
                      id={`mealBoxAdult${passenger.id}`}
                    >
                      <ul className="nav nav-tabs custom_tabs">
                        {ssrResponse.baggageMeal &&
                          ssrResponse.baggageMeal.flatMap(flight=>flight.sI
                            .filter(
                              (meal) =>
                                `${meal.da.code}-${meal.aa.code}` ===
                                selectedRoute
                            ).flatMap(meal=> meal.ssrInfo.MEAL))
                            .map((meal, idx) => (
                              <li key={idx} className="nav-item">
                                <div className="serv_addon_sel">
                                  <div className="serv_txt ">
                                    <div className="serv_icon">
                                      <i className="fa fa-utensils"></i>
                                    </div>
                                    <span className="serv_price bag_price">
                                      ₹{handleChangeCurrency(meal.amount)}
                                    </span>
                                    <span className="serv_type meals_type">
                                      {meal.desc
                                        ? meal.desc
                                        : meal.code}
                                    </span>
                                  </div>
                                  <div className="serv_btn">
                                    <button
                                      type="button"
                                      className="btn-sm btn-primary selectmealforpax"
                                      data-value="AVML,,"
                                      data-meal={meal.AirlineDescription}
                                      onClick={() => handleMealSelection(meal)}
                                      disabled={
                                        passengerMealPreferences[index] &&
                                        passengerMealPreferences[index].code ===
                                          meal.code
                                      }
                                    >
                                      {passengerMealPreferences[index] &&
                                      passengerMealPreferences[index].code ===
                                        meal.code
                                        ? "Selected"
                                        : "Select"}
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                      </ul>

                      <div className="tab-content"></div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>No SSR Details Found</p>
            )}
            {/* </div> */}
          </Tab.Pane>
          <Tab.Pane
            role="tabpanel"
            className={`${activesubtab === "selectbag" ? "active show" : ""}`}
            paxid={passenger.id}
            id={`selectbag${passenger.id}`}
          >
            <div
              className="service_req_sec service_req_sec_nseat baggage_info baggageBoxAdult"
              id={`baggageBoxAdult${passenger.id}`}
            >
              {ssrResponse && (
                <Nav variant="tabs" className="custom_tabs">
                  {routesbaggageTJ.map((route, index) => (
                    <Nav.Item
                      key={index}
                      className={`mybagpasadult-${index} ${
                        selectedRoutebaggage === route ? "active" : ""
                      } countdepvalue`}
                    >
                      <Nav.Link
                        href={`#bagpasadult-${index}-${route}`}
                        role="tab"
                        aria-controls={`bagpasadult-${index}-${route}`}
                        aria-expanded="true"
                        className={`mybagpasadult-${index} active countdepvalue`}
                        onClick={() => setSelectedRoutebaggage(route)}
                      >
                        {route}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              )}
              <Tab.Content>
                <Tab.Pane
                  role="tabpanel"
                  className="mydbagpasadult-0 tab-pane show active"
                  id="bagpasadult-0-DEL-BLR"
                >
                  <div className="baggage_list service_req_list dep_baggage_sele">
                    {passenger.type !== "Infant" ? (
                      ssrResponse ? (
                        <ul
                          id="adultbaggage_0_DEL-BLR"
                          className="b_DEL-BLR"
                          vclass="DEL-BLR"
                        >
                          {ssrResponse.baggageMeal &&
                             ssrResponse.baggageMeal.flatMap(flight=>flight.sI
                              .filter(
                                (meal) =>
                                  `${meal.da.code}-${meal.aa.code}` ===
                                  selectedRoute
                              ).flatMap(meal=> meal.ssrInfo.BAGGAGE))
                              .map((meal, idx) => (
                                <li key={idx}>
                                  <div className="serv_addon_sel">
                                    <div className="serv_txt serv_txt2">
                                      <div className="serv_icon">
                                        <i className="fa fa-suitcase"></i>
                                      </div>
                                      <span className="serv_price bag_price">
                                        ₹{handleChangeCurrency(meal.amount)}
                                      </span>
                                      <span className="serv_type meals_type">
                                        Additional {meal.desc}
                                      </span>
                                    </div>
                                    <div className="serv_btn">
                                      <button
                                        type="button"
                                        className="btn-sm btn-primary selectbagforpax"
                                        data-value="NoBaggage,5605,6E"
                                        price="0"
                                        data-bag="0"
                                        onClick={() =>
                                          handleBaggageSelection(meal)
                                        }
                                        disabled={
                                          passengerBaggagePreferences[index] &&
                                          passengerBaggagePreferences[index]
                                            .code === meal.code
                                        }
                                      >
                                        {passengerBaggagePreferences[index] &&
                                        passengerBaggagePreferences[index]
                                          .code === meal.code
                                          ? "Selected"
                                          : "Select"}
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          No SSR Details Found
                        </p>
                      )
                    ) : (
                      <p style={{ textAlign: "center" }}>
                        Baggage not available for Infants
                      </p>
                    )}
                  </div>
                </Tab.Pane>
              </Tab.Content>
              <code style={{ display: "none" }} id="bagwt_0_seg_0">
                0
              </code>
              <code style={{ display: "none" }} id="bagch_0_seg_0">
                0
              </code>
              <input
                type="hidden"
                id="bagin_0_seg_0"
                className=""
                value=""
                name="AdultbaggageSel_1"
              />
            </div>
          </Tab.Pane>
        </Tab.Content>
      )}
      {srdvIdx === "SrdvP" && (
        <Tab.Content
        //  transition={false}
        >
          <Tab.Pane
            role="tabpanel"
            // className="seat_tabpane"
            className={`${
              activesubtab === "selectseat" ? "active show" : ""
            } seat_tabpane`}
            paxid={passenger.id}
            id={`selectseat${passenger.id}`}
          >
            <div className="seatloader" style={{ display: "none" }}>
              <i className="fa fa-spinner"></i>
            </div>
            {passenger.type !== "Infant" ? (
              ssrResponse ? (
                <button
                  className="btn btn-primary openseatpopup"
                  type="button"
                  onClick={handleOpenModal}
                >
                  Select Seat
                </button>
              ) : (
                <p style={{ textAlign: "center" }}>No SSR Details Found</p>
              )
            ) : (
              <p style={{ textAlign: "center" }}>
                Seats not available for Infants
              </p>
            )}
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              size="lg"
              id="seatsmodalpopup"
              className="seatmodal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Seat Map</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="block-content-2 custom_block_content">
                  <div className="box-result custom_box_result">
                    <div className="service_req_sec">
                      {ssrResponse && (
                        <Nav variant="tabs" className="custom_tabs">
                          {routesbaggage.map((route, index) => (
                            <Nav.Item
                              key={index}
                              className={`mybagpasadult-${index} ${
                                selectedRoutebaggage === route ? "active" : ""
                              } countdepvalue`}
                            >
                              <Nav.Link
                                href={`#bagpasadult-${index}-${route}`}
                                role="tab"
                                aria-controls={`bagpasadult-${index}-${route}`}
                                aria-expanded="true"
                                className={`mybagpasadult-${index} active countdepvalue`}
                                onClick={() => setSelectedRoutebaggage(route)}
                              >
                                {route}
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      )}
                      <Tab.Content
                      // transition={false}
                      >
                        <Tab.Pane
                          eventKey="departure_seat_0_Seg_0"
                          className="show active"
                        >
                          <div className="plane_seat_sec">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="seat_info">
                                  <div className="flight_name">
                                    <img
                                      src="https://www.zapbooking.com/public/img/airline/6E.gif"
                                      alt=""
                                      className="img-fluid"
                                    />
                                    <div className="name">
                                      <span className="flight_no">5605</span>
                                    </div>
                                  </div>
                                  <div className="ticket_info">
                                    {passengers.map((passenger, index) => (
                                      <div
                                        className="ticket_col"
                                        key={`passenger_${passenger.id}`}
                                      >
                                        <div className="tic_label">
                                          {passenger.type} {passenger.id}{" "}
                                          <span
                                            fid="0"
                                            tif={`${
                                              passenger.type === "Adult"
                                                ? "adultPaxSeat"
                                                : "childPaxSeat"
                                            }_${index}_0_Seg_0_paxCount`}
                                            className="seatnumber"
                                            id={`PaxSeat_${index}_Seg_0_paxCount_${passenger.id}`}
                                            style={{ visibility: "hidden" }}
                                          ></span>
                                        </div>
                                        <div className="tic_price">
                                          Rs{" "}
                                          <code
                                            id={`PaxSeatCH_${index}_Seg_0_paxCount_${passenger.id}`}
                                          >
                                            0.00
                                          </code>
                                        </div>
                                        <input
                                          className={`PaxSeat_${index}_Seg_0_paxCount_${passenger.id}`}
                                          type="hidden"
                                          name={`${passenger.type.toLowerCase()}_${
                                            passenger.id
                                          }_PaxSeat_${index}_Seg_0_paxCount_${
                                            passenger.id
                                          }`}
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  <div className="seat_section">
                                    <div className="seat_title">Seat Type</div>
                                    <ul>
                                      <li className="ytfi-seat booked">
                                        Occupied Seat
                                      </li>
                                      <li className="ytfi-seat sclt">
                                        <i className="fa fa-check"></i> Selected
                                        Seat
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="seat_list">
                                  <div className="main_title">Front</div>
                                  <div className="wings_top cus_wings">
                                    <span>Wings</span>
                                  </div>
                                  <div className="table-responsive table_data">
                                    <table border="0" className="table">
                                      {ssrResponse &&
                                        ssrResponse.SeatDynamic[0] &&
                                        ssrResponse.SeatDynamic[0]
                                          .SegmentSeat[0] && (
                                          <tbody>
                                            {ssrResponse.SeatDynamic[0].SegmentSeat[0].RowSeats.map(
                                              (row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                  {row.Seats.map(
                                                    (seat, seatIndex) => (
                                                      <td
                                                        key={`seat_${rowIndex}_${seatIndex}`}
                                                      >
                                                        <span
                                                          className={`ytfi-seat ${
                                                            seat.AvailablityType ===
                                                            3
                                                              ? "occupied"
                                                              : "open"
                                                          } ${
                                                            passengerSeatPreferences[
                                                              index
                                                            ] &&
                                                            passengerSeatPreferences[
                                                              index
                                                            ].Code === seat.Code
                                                              ? "selected"
                                                              : ""
                                                          }`}
                                                          onMouseEnter={() =>
                                                            toggleSeatDetails(
                                                              seat.Code
                                                            )
                                                          }
                                                          onMouseLeave={() =>
                                                            toggleSeatDetails(
                                                              seat.Code
                                                            )
                                                          }
                                                          onClick={() =>
                                                            seat.AvailablityType !==
                                                              3 &&
                                                            handleSeatSelection(
                                                              seat
                                                            )
                                                          }
                                                        >
                                                          {seat.Code}
                                                        </span>
                                                        <div
                                                          className="seatdetails"
                                                          id={`FlSeatInfo_${rowIndex}_Seg_0_Row_${rowIndex}_Seat_${seatIndex}`}
                                                          style={{
                                                            display:
                                                              activeSeat ===
                                                              seat.Code
                                                                ? ""
                                                                : "none",
                                                          }}
                                                        >
                                                          <ul className="seatinfo">
                                                            <li>
                                                              Seat No:{" "}
                                                              {seat.Code}
                                                            </li>
                                                            <li>
                                                              Price: ₹
                                                              {handleChangeCurrency(
                                                                seat.Price
                                                              )}
                                                            </li>
                                                          </ul>
                                                        </div>
                                                      </td>
                                                    )
                                                  )}
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        )}
                                    </table>
                                  </div>
                                  <div className="wings_bottom cus_wings">
                                    <span>Wings</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="departure_seat_0_Seg_1"
                          // className="show active"
                        >
                          <div className="plane_seat_sec">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="seat_info">
                                  <div className="flight_name">
                                    <img
                                      src="https://www.zapbooking.com/public/img/airline/6E.gif"
                                      alt=""
                                    />
                                    <div className="name">
                                      <span className="flight_no">949</span>
                                    </div>
                                  </div>
                                  <div className="ticket_info">
                                    {/* Seat details for adult and child passengers */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="seat_list">
                                  <div className="main_title">Front</div>
                                  <div className="wings_top cus_wings">
                                    <span>Wings</span>
                                  </div>
                                  <div className="table-responsive table_data">
                                    <table border="0" className="table">
                                      <tbody>
                                        <tr>
                                          {/* Seat rows and columns */}
                                          <td
                                            id="FlSeat_0_Seg_1_Row_1_Seat_0"
                                            seatprice="2000"
                                            seatcode="1A"
                                          >
                                            <span className="ytfi-seat occupied">
                                              1A
                                            </span>
                                            <div
                                              className="seatdetails"
                                              id="FlSeatInfo_0_Seg_1_Row_1_Seat_0"
                                              style={{ display: "none" }}
                                            >
                                              <ul className="seatinfo">
                                                <li>Seat No : 1A</li>
                                                <li id="StPrc_0_Seg_1_Row_1_Seat_0">
                                                  Price : Rs. 2000
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                          {/* Additional seat rows and columns */}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="wings_bottom cus_wings">
                                    <span>Wings</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </Tab.Pane>
          <Tab.Pane
            role="tabpanel"
            className={`${
              activesubtab === "selectmeal" ? "active show" : ""
            } seat_tabpane`}
            paxid={passenger.id}
            id={`selectmeal${passenger.id}`}
          >
            {ssrResponse ? (
              <div
                className="service_req_sec service_req_sec_nseat meal_info mealBoxAdult"
                id={`mealBoxAdult${passenger.id}`}
              >
                {ssrResponse && (
                  <Nav variant="tabs" className="custom_tabs">
                    {routes.map((route, index) => (
                      <Nav.Item
                        key={index}
                        className={`mybagpasadult-${index} ${
                          selectedRoute === route ? "active" : ""
                        } countdepvalue`}
                      >
                        <Nav.Link
                          href={`#bagpasadult-${index}-${route}`}
                          role="tab"
                          aria-controls={`bagpasadult-${index}-${route}`}
                          aria-expanded="true"
                          className={`mybagpasadult-${index} active countdepvalue`}
                          onClick={() => setSelectedRoute(route)}
                        >
                          {route}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                )}
                <Tab.Content
                // transition={false}
                >
                  <Tab.Pane
                    role="tabpanel"
                    className={`${
                      activesubtab === "selectmeal" ? "active show" : ""
                    }`}
                    paxid={passenger.id}
                    id={`selectmeal${passenger.id}`}
                  >
                    <div
                      className="meals_list service_req_list dep_meal_sele"
                      id={`mealBoxAdult${passenger.id}`}
                    >
                      <ul className="nav nav-tabs custom_tabs">
                        {ssrResponse.MealDynamic[0]
                          .filter(
                            (meal) =>
                              `${meal.Origin}-${meal.Destination}` ===
                              selectedRoute
                          )
                          .map((meal, idx) => (
                            <li key={idx} className="nav-item">
                              <div className="serv_addon_sel">
                                <div className="serv_txt ">
                                  <div className="serv_icon">
                                    <i className="fa fa-utensils"></i>
                                  </div>
                                  <span className="serv_price bag_price">
                                    ₹{handleChangeCurrency(meal.Price)}
                                  </span>
                                  <span className="serv_type meals_type">
                                    {meal.AirlineDescription
                                      ? meal.AirlineDescription
                                      : meal.Code}
                                  </span>
                                </div>
                                <div className="serv_btn">
                                  <button
                                    type="button"
                                    className="btn-sm btn-primary selectmealforpax"
                                    data-value="AVML,,"
                                    data-meal={meal.AirlineDescription}
                                    onClick={() => handleMealSelection(meal)}
                                    disabled={
                                      passengerMealPreferences[index] &&
                                      passengerMealPreferences[index].Code ===
                                        meal.Code &&
                                      passengerMealPreferences[index]
                                        .FlightNumber === meal.FlightNumber
                                    }
                                  >
                                    {passengerMealPreferences[index] &&
                                    passengerMealPreferences[index].Code ===
                                      meal.Code &&
                                    passengerMealPreferences[index]
                                      .FlightNumber === meal.FlightNumber
                                      ? "Selected"
                                      : "Select"}
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>

                      <div className="tab-content"></div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>No SSR Details Found</p>
            )}
            {/* </div> */}
          </Tab.Pane>
          <Tab.Pane
            role="tabpanel"
            className={`${activesubtab === "selectbag" ? "active show" : ""}`}
            paxid={passenger.id}
            id={`selectbag${passenger.id}`}
          >
            <div
              className="service_req_sec service_req_sec_nseat baggage_info baggageBoxAdult"
              id={`baggageBoxAdult${passenger.id}`}
            >
              {ssrResponse && (
                <Nav variant="tabs" className="custom_tabs">
                  {routesbaggage.map((route, index) => (
                    <Nav.Item
                      key={index}
                      className={`mybagpasadult-${index} ${
                        selectedRoutebaggage === route ? "active" : ""
                      } countdepvalue`}
                    >
                      <Nav.Link
                        href={`#bagpasadult-${index}-${route}`}
                        role="tab"
                        aria-controls={`bagpasadult-${index}-${route}`}
                        aria-expanded="true"
                        className={`mybagpasadult-${index} active countdepvalue`}
                        onClick={() => setSelectedRoutebaggage(route)}
                      >
                        {route}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              )}
              <Tab.Content>
                <Tab.Pane
                  role="tabpanel"
                  className="mydbagpasadult-0 tab-pane show active"
                  id="bagpasadult-0-DEL-BLR"
                >
                  <div className="baggage_list service_req_list dep_baggage_sele">
                    {passenger.type !== "Infant" ? (
                      ssrResponse ? (
                        <ul
                          id="adultbaggage_0_DEL-BLR"
                          className="b_DEL-BLR"
                          vclass="DEL-BLR"
                        >
                          {ssrResponse.Baggage[0]
                            .filter(
                              (baggage) =>
                                `${baggage.Origin}-${baggage.Destination}` ===
                                selectedRoutebaggage
                            )
                            .map((option, idx) => (
                              <li key={idx}>
                                <div className="serv_addon_sel">
                                  <div className="serv_txt serv_txt2">
                                    <div className="serv_icon">
                                      <i className="fa fa-suitcase"></i>
                                    </div>
                                    <span className="serv_price bag_price">
                                      ₹{handleChangeCurrency(option.Price)}
                                    </span>
                                    <span className="serv_type meals_type">
                                      Additional {option.Weight} kg
                                    </span>
                                  </div>
                                  <div className="serv_btn">
                                    <button
                                      type="button"
                                      className="btn-sm btn-primary selectbagforpax"
                                      data-value="NoBaggage,5605,6E"
                                      price="0"
                                      data-bag="0"
                                      onClick={() =>
                                        handleBaggageSelection(option)
                                      }
                                      disabled={
                                        passengerBaggagePreferences[index] &&
                                        passengerBaggagePreferences[index]
                                          .Code === option.Code
                                      }
                                    >
                                      {passengerBaggagePreferences[index] &&
                                      passengerBaggagePreferences[index]
                                        .Code === option.Code
                                        ? "Selected"
                                        : "Select"}
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          No SSR Details Found
                        </p>
                      )
                    ) : (
                      <p style={{ textAlign: "center" }}>
                        Baggage not available for Infants
                      </p>
                    )}
                  </div>
                </Tab.Pane>
              </Tab.Content>
              <code style={{ display: "none" }} id="bagwt_0_seg_0">
                0
              </code>
              <code style={{ display: "none" }} id="bagch_0_seg_0">
                0
              </code>
              <input
                type="hidden"
                id="bagin_0_seg_0"
                className=""
                value=""
                name="AdultbaggageSel_1"
              />
            </div>
          </Tab.Pane>
        </Tab.Content>
      )}
      {/* )} */}
    </div>
  );
};

export default SSRContent;

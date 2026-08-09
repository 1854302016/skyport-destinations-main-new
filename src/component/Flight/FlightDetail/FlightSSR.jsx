import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // ← Import SweetAlert
import "./FlightSSR.css";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Row } from "react-bootstrap";

const getSeatTypeText = (type) => {
  switch (type) {
    case 1:
      return "Window Seat";
    case 2:
      return "Aisle Seat";
    case 3:
      return "Middle Seat";
    default:
      return "Seat";
  }
};

const FlightSSR = ({
  ssr,
  ssr2,
  totalAdultCount,
  totalChildCount,
  totalPassenger,
  onSeatChange,
  onBaggageChange,
  onMealChange,
}) => {
  const [activeTab, setActiveTab] = useState("seats");
  const [activeTabs, setActiveTabs] = useState("ssr");
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [totalSeatPrice, setTotalSeatPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState({
    ssr: { adult: [], child: [] },
    ssr2: { adult: [], child: [] },
  });

  const initializeSelectedSeats = () => {
    const initGroup = (count, segments) =>
      Array.from({ length: count }, () =>
        Array.from({ length: segments }, () => null)
      );
    const ssrSegments = ssr?.SeatDynamic?.[0]?.SegmentSeat?.length || 0;
    const ssr2Segments = ssr2?.SeatDynamic?.[0]?.SegmentSeat?.length || 0;

    return {
      ssr: {
        adult: initGroup(totalAdultCount, ssrSegments),
        child: initGroup(totalChildCount, ssrSegments),
      },
      ssr2: {
        adult: initGroup(totalAdultCount, ssr2Segments),
        child: initGroup(totalChildCount, ssr2Segments),
      },
    };
  };

  useEffect(() => {
    setSelectedSeats(initializeSelectedSeats());
  }, [ssr, ssr2, totalAdultCount, totalChildCount]);

  const currentSSRSeat = activeTabs === "ssr" ? ssr : ssr2;
  const currentSegment =
    currentSSRSeat?.SeatDynamic?.[0]?.SegmentSeat?.[activeSegmentIndex];
  const rows = currentSegment?.RowSeats || [];

  const shouldRenderLayout = rows.length > 2;

  const allSeatLetters = new Set();
  rows.forEach((row) => {
    row.Seats?.forEach((seat) => {
      if (seat.SeatNo) allSeatLetters.add(seat.SeatNo);
    });
  });

  const sortedLetters = Array.from(allSeatLetters).sort();
  const midIndex = Math.ceil(sortedLetters.length / 2);
  const columns = [
    ...sortedLetters.slice(0, midIndex),
    null,
    ...sortedLetters.slice(midIndex),
  ];

  const getSeatByLetter = (row, letter) =>
    row.Seats?.find((seat) => seat.SeatNo === letter);

  const handleSeatClick = (seat, segmentIndex) => {
    if (!seat || seat.AvailablityType !== 1) return;

    const currentTab = activeTabs;
    const updated = { ...selectedSeats[currentTab] };
    const groupKeys = ["adult", "child"];
    let seatAssigned = false;

    for (const groupKey of groupKeys) {
      const group = [...updated[groupKey]];
      for (let i = 0; i < group.length; i++) {
        const passenger = [...group[i]];

        // Deselect if already selected
        if (passenger[segmentIndex]?.Code === seat.Code) {
          passenger[segmentIndex] = null;
          group[i] = passenger;
          updated[groupKey] = group;
          seatAssigned = true;
          break;
        }

        // Select if not already selected
        if (!passenger[segmentIndex]) {
          const alreadySelected = group.some(
            (p) => p[segmentIndex]?.Code === seat.Code
          );
          if (!alreadySelected) {
            passenger[segmentIndex] = seat;
            group[i] = passenger;
            updated[groupKey] = group;
            seatAssigned = true;
            break;
          }
        }
      }
      if (seatAssigned) break;
    }

    if (!seatAssigned) {
      toast.error(
        "All passengers have already selected seats for this segment."
      );
      return;
    }

    setSelectedSeats((prev) => ({
      ...prev,
      [currentTab]: {
        ...prev[currentTab],
        ...updated,
      },
    }));
  };

  const removeEmptySeats = (data) => {
    const cleaned = {};
    Object.keys(data).forEach((typeKey) => {
      cleaned[typeKey] = {};
      Object.keys(data[typeKey]).forEach((groupKey) => {
        cleaned[typeKey][groupKey] = data[typeKey][groupKey]
          .map((group) => group.filter(Boolean))
          .filter((group) => group.length > 0);
      });
    });
    return cleaned;
  };

  useEffect(() => {
    const total = Object.keys(selectedSeats).reduce((sum, key) => {
      return (
        sum +
        ["adult", "child"].reduce((subSum, groupKey) => {
          return (
            subSum +
            selectedSeats[key][groupKey].reduce(
              (passengerSum, segmentSeats) =>
                passengerSum +
                segmentSeats.reduce(
                  (segSum, seat) => segSum + (seat?.Price || 0),
                  0
                ),
              0
            )
          );
        }, 0)
      );
    }, 0);

    setTotalSeatPrice(total);
    const cleanedData = removeEmptySeats(selectedSeats);
    onSeatChange?.({ selectedSeats: cleanedData, totalSeatPrice: total });
  }, [selectedSeats]);

  const renderSeat = (seat) => {
    if (
      !seat ||
      seat.Code === "NoSeat" ||
      [0, 5].includes(seat.AvailablityType)
    ) {
      return <div className="seatEmptyLabel" />;
    }

    const isSelected =
      selectedSeats[activeTabs].adult.some(
        (p) => p[activeSegmentIndex]?.Code === seat.Code
      ) ||
      selectedSeats[activeTabs].child.some(
        (p) => p[activeSegmentIndex]?.Code === seat.Code
      );

    return (
      <div
        className="seatCol"
        style={{ margin: "2.8px", position: "relative" }}
      >
        <div
          className="relative seat-wrapper"
          id={`seat-${seat.Code}`}
          onClick={() => handleSeatClick(seat, activeSegmentIndex)}
        >
          <div className="seat-tooltip">
            <div className="dtlflgttext">
              <div className="w40tp">
                {seat.RowNo}-{seat.SeatNo}
              </div>
              <div className="w60tp">
                <p className="price">
                  <span>Rs {seat.Price}</span>
                </p>
              </div>
            </div>
          </div>
          {seat.AvailablityType === 3 ? (
            <div className="seatNotAvailable">
              <img
                src="https://imgak.goibibo.com/flights-gi-assets/dt/ancillaries/seat_not_available.webp"
                alt="seatNotAvailable"
              />
            </div>
          ) : (
            <div
              className="seatBlock pointer"
              style={{
                marginBottom: "5px",
                background: isSelected
                  ? "#86ed4e url(/Images/seat_booked.svg)"
                  : "rgb(135, 187, 255)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderBottom: isSelected ? "0" : "1px solid #ccc",
              }}
            />
          )}
        </div>
      </div>
    );
  };

  const hasSSRData = ssr?.SeatDynamic?.[0]?.SegmentSeat?.length > 0;
  const hasSSR2Data = ssr2?.SeatDynamic?.[0]?.SegmentSeat?.length > 0;
  const [activeTabMeal, setActiveTabMeal] = useState("ssr");
  const [activeMealSegmentIndex, setActiveMealSegmentIndex] = useState(0);
  const [totalMealPrice, setTotalMealPrice] = useState(0);

  const initializeSelectedMeals = () => {
    const initGroup = (count, segments) =>
      Array.from({ length: count }, () =>
        Array.from({ length: segments }, () => null)
      );

    const ssrSegments = ssr?.MealDynamic?.length || 0;
    const ssr2Segments = ssr2?.MealDynamic?.length || 0;

    return {
      ssr: {
        adult: initGroup(totalAdultCount, ssrSegments),
        child: initGroup(totalChildCount, ssrSegments),
      },
      ssr2: {
        adult: initGroup(totalAdultCount, ssr2Segments),
        child: initGroup(totalChildCount, ssr2Segments),
      },
    };
  };

  const [selectedMeals, setSelectedMeals] = useState(initializeSelectedMeals);

  useEffect(() => {
    setSelectedMeals(initializeSelectedMeals());
  }, [ssr, ssr2, totalAdultCount, totalChildCount]);

  useEffect(() => {
    const hasSSR = ssr?.MealDynamic?.length > 0;
    const hasSSR2 = ssr2?.MealDynamic?.length > 0;

    if (hasSSR && hasSSR2) setActiveTabMeal("ssr");
    else if (hasSSR) setActiveTabMeal("ssr");
    else if (hasSSR2) setActiveTabMeal("ssr2");
    else setActiveTabMeal(null);
  }, [ssr, ssr2]);

  const currentSSRMeal = activeTabMeal === "ssr" ? ssr : ssr2;
  const currentMealSegment =
    currentSSRMeal?.MealDynamic?.[activeMealSegmentIndex] || [];
  const currentTabKey = activeTabMeal;

  const getMealCountForSegment = (
    tabKey,
    segmentIndex,
    mealCode,
    mealIndex
  ) => {
    let count = 0;
    ["adult", "child"].forEach((groupKey) => {
      selectedMeals[tabKey][groupKey].forEach((passenger) => {
        if (
          passenger[segmentIndex] &&
          passenger[segmentIndex].Code === mealCode &&
          passenger[segmentIndex]._mealInstanceIndex === mealIndex
        ) {
          count++;
        }
      });
    });
    return count;
  };

  const handleMealQuantityChange = (meal, segmentIndex, change, mealIndex) => {
    const currentTab = currentTabKey;
    const updated = { ...selectedMeals[currentTab] };
    const groupKeys = ["adult", "child"];
    const totalPassengers = totalAdultCount + totalChildCount;

    const totalSelectedInSegment = ["adult", "child"].reduce(
      (acc, groupKey) => {
        return (
          acc +
          selectedMeals[currentTab][groupKey].reduce(
            (count, passenger) => (passenger[segmentIndex] ? count + 1 : count),
            0
          )
        );
      },
      0
    );

    const mealWithInstance = { ...meal, _mealInstanceIndex: mealIndex };

    if (change > 0) {
      if (totalSelectedInSegment >= totalPassengers) {
        toast.error("You can't select more meals than total passengers.");
        return;
      }

      for (const groupKey of groupKeys) {
        const group = [...updated[groupKey]];
        for (let i = 0; i < group.length; i++) {
          const passenger = [...group[i]];
          if (!passenger[segmentIndex]) {
            passenger[segmentIndex] = mealWithInstance;
            group[i] = passenger;
            updated[groupKey] = group;
            setSelectedMeals((prev) => ({
              ...prev,
              [currentTab]: updated,
            }));
            return;
          }
        }
      }
    } else {
      for (const groupKey of groupKeys) {
        const group = [...updated[groupKey]];
        for (let i = 0; i < group.length; i++) {
          const passenger = [...group[i]];
          const selectedMeal = passenger[segmentIndex];
          if (
            selectedMeal &&
            selectedMeal.Code === meal.Code &&
            selectedMeal._mealInstanceIndex === mealIndex
          ) {
            passenger[segmentIndex] = null;
            group[i] = passenger;
            updated[groupKey] = group;
            setSelectedMeals((prev) => ({
              ...prev,
              [currentTab]: updated,
            }));
            return;
          }
        }
      }
    }
  };

  const removeEmptyMeals = (data) => {
    const cleaned = {};
    Object.keys(data).forEach((typeKey) => {
      cleaned[typeKey] = {};
      Object.keys(data[typeKey]).forEach((groupKey) => {
        cleaned[typeKey][groupKey] = data[typeKey][groupKey]
          .map((group) => group.filter(Boolean))
          .filter((group) => group.length > 0);
      });
    });
    return cleaned;
  };

  useEffect(() => {
    const total = Object.keys(selectedMeals).reduce((sum, key) => {
      return (
        sum +
        ["adult", "child"].reduce((subSum, groupKey) => {
          return (
            subSum +
            selectedMeals[key][groupKey].reduce(
              (passengerSum, segmentMeals) =>
                passengerSum +
                segmentMeals.reduce(
                  (segSum, meal) => segSum + (meal?.Price || 0),
                  0
                ),
              0
            )
          );
        }, 0)
      );
    }, 0);

    setTotalMealPrice(total);
    const cleanedData = removeEmptyMeals(selectedMeals);
    onMealChange?.({ selectedMeals: cleanedData, totalMealPrice: total });
  }, [selectedMeals]);

  const [activeTabBaggage, setActiveTabBaggage] = useState("ssr");
  const [selectedBaggage, setSelectedBaggage] = useState({
    ssr: { adult: [], child: [] },
    ssr2: { adult: [], child: [] },
  });
  const [totalBaggagePrice, setTotalBaggagePrice] = useState(0);

  useEffect(() => {
    const hasSSR = ssr?.Baggage?.[0]?.length > 0;
    const hasSSR2 = ssr2?.Baggage?.[0]?.length > 0;

    if (hasSSR && hasSSR2) {
      setActiveTabBaggage("ssr");
    } else if (hasSSR) {
      setActiveTabBaggage("ssr");
    } else if (hasSSR2) {
      setActiveTabBaggage("ssr2");
    } else {
      setActiveTabBaggage(null);
    }
  }, [ssr, ssr2]);

  const currentSSRBag = activeTabBaggage === "ssr" ? ssr : ssr2;
  const baggageList =
    currentSSRBag?.Baggage?.[0]?.filter((b) => b.Code !== "NoBaggage") || [];
  const currentTabKeyBag = activeTabBaggage;

  const handleBaggageChange = (item, action) => {
    setSelectedBaggage((prev) => {
      const tabData = { ...prev[currentTabKeyBag] };
      let newAdult = [...tabData.adult];
      let newChild = [...tabData.child];
      const totalSelected = newAdult.length + newChild.length;

      if (action === "increment") {
        if (totalSelected >= totalPassenger) {
          toast.warning(
            `You can't select more than ${totalPassenger} baggage.`
          );
          return prev;
        }

        if (newAdult.length < totalAdultCount) {
          newAdult.push(item);
        } else if (newChild.length < totalChildCount) {
          newChild.push(item);
        }
      } else if (action === "decrement") {
        const code = item.Code;

        const childIndex = newChild.map((b) => b.Code).lastIndexOf(code);
        if (childIndex !== -1) {
          newChild.splice(childIndex, 1);
        } else {
          const adultIndex = newAdult.map((b) => b.Code).lastIndexOf(code);
          if (adultIndex !== -1) {
            newAdult.splice(adultIndex, 1);
          }
        }
      }

      const updated = {
        ...prev,
        [currentTabKeyBag]: {
          adult: newAdult,
          child: newChild,
        },
      };

      return updated;
    });
  };

  const getBaggageQty = (code) => {
    const baggage = selectedBaggage[currentTabKeyBag];
    return [...baggage.adult, ...baggage.child].filter((b) => b.Code === code)
      .length;
  };

  useEffect(() => {
    const allBaggage = [
      ...selectedBaggage.ssr.adult,
      ...selectedBaggage.ssr.child,
      ...selectedBaggage.ssr2.adult,
      ...selectedBaggage.ssr2.child,
    ];
    const total = allBaggage.reduce((sum, item) => sum + (item.Price || 0), 0);
    setTotalBaggagePrice(total);

    if (typeof onBaggageChange === "function") {
      onBaggageChange({ selectedBaggage, total });
    }
  }, [selectedBaggage]);

  return (
    <>
      <ul className="custom-tabs">
        <li>
          <button
            type="button"
            className={`tab-button ${activeTab === "seats" ? "active" : ""}`}
            onClick={() => setActiveTab("seats")}
          >
            <img
              src="https://flight.easemytrip.com/Content/img/seat-ico-addon.svg"
              alt=""
              style={{ height: "32px", width: "28px", marginRight: "8px" }}
            />
            Seats
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`tab-button ${activeTab === "meals" ? "active" : ""}`}
            onClick={() => setActiveTab("meals")}
          >
            <img
              src="https://flight.easemytrip.com/Content/img/meal-ico-addon.svg"
              alt=""
              style={{ height: "32px", width: "28px", marginRight: "8px" }}
            />
            Meals
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`tab-button ${activeTab === "baggages" ? "active" : ""}`}
            onClick={() => setActiveTab("baggages")}
          >
            <img
              src="https://flight.easemytrip.com/Content/img/luggage-ico-addon.svg"
              alt=""
              style={{ height: "32px", width: "28px", marginRight: "8px" }}
            />
            Baggages
          </button>
        </li>
      </ul>

      <div className="tab-content Ssrtgo">
        {activeTab === "seats" && (
          <>
            <>
              {ssr &&
              rows.length !== 0 &&
              (Array.isArray(ssr.Seat) ||
                (Array.isArray(ssr.SeatDynamic) &&
                  ssr.SeatDynamic[0]?.length !== 1)) ? (
                <div
                  className="ancillaryScrollWrap singleLengthWrap"
                  style={{
                    transform: "translateX(0px)",
                    transition: "transform 0.45s ease-out",
                  }}
                >
                  <div
                    className="scrollItem customScroll seats"
                    style={{ opacity: 1 }}
                  >
                    <div>
                      <div className="makeSticky">
                        <div className="seatHeader">
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                                fontSize: "12px",
                              }}
                            >
                              {currentSSRSeat?.SeatDynamic?.[0]?.SegmentSeat?.map(
                                (seg, i) => (
                                  <p
                                    className={`fontSize16 boldFont seat_selected_header_para ${
                                      activeSegmentIndex === i ? "active" : ""
                                    }`}
                                    key={i}
                                    onClick={() => setActiveSegmentIndex(i)}
                                  >
                                    <b>
                                      {seg.RowSeats[0].Seats[0].Origin} -{" "}
                                      {seg.RowSeats[0].Seats[0].Destination}
                                      {/* {ssr?.SeatDynamic?.[0]?.SegmentSeat?.[0]
                                  ?.RowSeats?.[0]?.Seats?.[0] &&
                                  `${ssr.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Origin} - ${ssr.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Destination}`} */}
                                    </b>
                                  </p>
                                )
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "start",
                                fontSize: "12px",
                              }}
                            >
                              <div
                                className={`ssr_active_head ${
                                  activeTabs === "ssr" ? "active" : ""
                                }`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setActiveTabs("ssr")}
                              >
                                {ssr?.SeatDynamic?.[0]?.SegmentSeat?.[0]
                                  ?.RowSeats?.[0]?.Seats?.[0] &&
                                  `${ssr.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Origin} - ${ssr.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Destination}`}
                              </div>
                              {hasSSR2Data && (
                                <div
                                  className={`ssr_active_head ${
                                    activeTabs === "ssr2" ? "active" : ""
                                  }`}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setActiveTabs("ssr2")}
                                >
                                  {ssr2?.SeatDynamic?.[0]?.SegmentSeat?.[0]
                                    ?.RowSeats?.[0]?.Seats?.[0] &&
                                    `${ssr2.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Origin} - ${ssr2.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Destination}`}
                                </div>
                              )}
                            </div>
                            {/* {hasSSR2Data && (
                              <p
                                className={`fontSize16 boldFont seat_selected_header_para ${
                                  activeTabs === "ssr2" ? "active" : ""
                                }`}
                                onClick={() => setActiveTabs("ssr2")}
                              >
                                <b>
                                  {ssr2?.SeatDynamic?.[0]?.SegmentSeat?.[0]
                                    ?.RowSeats?.[0]?.Seats?.[0] &&
                                    `${ssr2.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Origin} - ${ssr2.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Destination}`}
                                </b>
                              </p>
                            )} */}
                          </div>
                        </div>
                      </div>

                      <ul className="legendWrap">
                        <li className="makeFlex gap-x-15">
                          <span
                            className="box"
                            style={{
                              marginRight: "5px",
                              background:
                                "#86ed4e url(/Images/seat_booked.svg)",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              borderBottom: 0,
                            }}
                          />
                          <span className="fontSize12">Selected Seat</span>
                        </li>
                        <li className="makeFlex gap-x-15">
                          <span
                            className="box"
                            style={{
                              marginRight: "5px",
                              backgroundColor: "rgb(135, 187, 255)",
                            }}
                          />
                          <span className="fontSize12">Seats Avaliability</span>
                        </li>
                        <li className="makeFlex gap-x-15">
                          <span
                            className="box"
                            style={{
                              marginRight: "5px",
                              background:
                                "url(https://imgak.goibibo.com/flights-gi-assets/dt/ancillaries/seat_not_available.webp)",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              borderBottom: 0,
                            }}
                          />
                          <span className="fontSize12">Booked Seats</span>
                        </li>
                      </ul>

                      <div className="flightWrap">
                        <div>
                          <span
                            className="bgProperties iconflFront"
                            style={{
                              backgroundImage:
                                'url("https://imgak.mmtcdn.com/flights/assets/media/dt/ancillaries/ic_flightSmallFrontGI.webp")',
                            }}
                          />
                        </div>
                        {shouldRenderLayout ? (
                          <div className="flightSeatMatrix">
                            <div className="seatRow">
                              <div className="seatCol">
                                <div className="seatEmptyLabel" />
                              </div>
                              {columns.map((col, i) => (
                                <div className="seatCol" key={i}>
                                  {col ? (
                                    <div className="seatLabel">{col}</div>
                                  ) : (
                                    <div className="seatEmptyLabel" />
                                  )}
                                </div>
                              ))}
                              <div className="seatCol">
                                <div className="seatEmptyLabel" />
                              </div>
                            </div>

                            {rows.map((row, rowIndex) => {
                              const rowNumber =
                                row.Seats?.[0]?.RowNo || rowIndex + 1;
                              return (
                                <div className="seatRow" key={rowIndex}>
                                  <div className="seatCol">
                                    <div className="seatLabel">{rowNumber}</div>
                                  </div>
                                  {columns.map((letter, colIndex) => (
                                    <div className="seatCol" key={colIndex}>
                                      {letter ? (
                                        renderSeat(getSeatByLetter(row, letter))
                                      ) : (
                                        <div className="seatEmptyLabel" />
                                      )}
                                    </div>
                                  ))}
                                  <div className="seatCol">
                                    <div className="seatLabel">{rowNumber}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-red-500 text-center my-4">
                            No seat layout available for this segment.
                          </div>
                        )}

                        <div>
                          <span
                            className="bgProperties iconflTail"
                            style={{
                              backgroundImage:
                                'url("//jsak.mmtcdn.com/flights/assets/media/ic_flightSmallTail.png")',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    margin: "auto",
                    marginTop: "10px",
                  }}
                >
                  No Seat Found
                </div>
              )}
            </>
          </>
        )}

        {activeTab === "meals" && (
          <>
            {(Array.isArray(ssr?.MealDynamic?.[0]) &&
              ssr.MealDynamic[0].length > 0) ||
            (Array.isArray(ssr2?.MealDynamic?.[0]) &&
              ssr2.MealDynamic[0].length > 0) ? (
              <div>
                <div className="makeSticky">
                  <div className="seatHeader">
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          fontSize: "12px",
                        }}
                      >
                        {currentSSRMeal?.MealDynamic?.map((segment, index) => {
                          const firstMeal = segment?.[0];

                          return (
                            <p
                              className={`fontSize16 boldFont seat_selected_header_para ${
                                setActiveMealSegmentIndex === index
                                  ? "active"
                                  : ""
                              }`}
                              key={index}
                              onClick={() => setActiveMealSegmentIndex(index)}
                            >
                              <b>
                                {firstMeal?.Origin} - {firstMeal?.Destination}
                                {/* {ssr?.SeatDynamic?.[0]?.SegmentSeat?.[0]
                                  ?.RowSeats?.[0]?.Seats?.[0] &&
                                  `${ssr.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Origin} - ${ssr.SeatDynamic[0].SegmentSeat[0].RowSeats[0].Seats[0].Destination}`} */}
                              </b>
                            </p>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          fontSize: "12px",
                        }}
                      >
                        {ssr?.MealDynamic?.[0]?.length > 0 && (
                          <p
                            className={`ssr_active_head ${
                              activeTabMeal === "ssr" ? "active" : ""
                            }`}
                            onClick={() => setActiveTabMeal("ssr")}
                          >
                            <b>
                              {ssr?.MealDynamic?.[0]?.[0]?.Origin || ""} -{" "}
                              {ssr?.MealDynamic?.[0]?.[0]?.Destination || ""}
                            </b>
                          </p>
                        )}
                        {ssr2?.MealDynamic?.[0]?.length > 0 && (
                          <p
                            className={`ssr_active_head ${
                              activeTabMeal === "ssr2" ? "active" : ""
                            }`}
                            onClick={() => setActiveTabMeal("ssr2")}
                          >
                            <b>
                              {ssr2?.MealDynamic?.[0]?.[0]?.Origin || ""} -{" "}
                              {ssr2?.MealDynamic?.[0]?.[0]?.Destination || ""}
                            </b>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ancTab pdcstm">
                  <div
                    className="tp_sec_adn ancnewMeal ng-scope"
                    style={{ display: "block" }}
                  >
                    <Row>
                      {currentMealSegment
                        .filter((meal) => meal.Code !== "NoMeal")
                        .map((meal, index) => (
                          <div className="col-lg-6 p-2">
                            <div className="menu_50 ng-scope">
                              <div className="img_sec">
                                <img
                                  src="https://flight.easemytrip.com/Content/img/traveller/I5_NCBB.png"
                                  alt="Meal"
                                />
                              </div>
                              <div className="dtlsec_adon">
                                <div className="meanadons ng-binding">
                                  {meal.AirlineDescription}
                                </div>
                                <div className="pritag_adon">
                                  <span className="CurrncyCD_Rs">
                                    {meal.Price}
                                  </span>
                                </div>
                              </div>
                              <div className="qutsec_adon">
                                <div className="PlusMinusRow_adon PlusMinusRow">
                                  <a
                                    type="button"
                                    className="sub_adon subanc"
                                    onClick={() =>
                                      handleMealQuantityChange(
                                        meal,
                                        activeMealSegmentIndex,
                                        -1,
                                        index
                                      )
                                    }
                                  >
                                    <span>-</span>
                                  </a>
                                  <div>
                                    {" "}
                                    {getMealCountForSegment(
                                      currentTabKey,
                                      activeMealSegmentIndex,
                                      meal.Code,
                                      index
                                    )}
                                  </div>
                                  {/* <input
                                        type="text"
                                        value={qty}
                                        readOnly
                                        className="PlusMinus_number_adon PlusMinus_number"
                                      /> */}
                                  <a
                                    type="button"
                                    className="add_adon addanc"
                                    onClick={() =>
                                      handleMealQuantityChange(
                                        meal,
                                        activeMealSegmentIndex,
                                        1,
                                        index
                                      )
                                    }
                                  >
                                    <span>+</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Row>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  margin: "auto",
                  marginTop: "10px",
                }}
              >
                No Meal Found
              </div>
            )}
          </>
        )}

        {activeTab === "baggages" && (
          <>
            {ssr?.Baggage?.[0]?.length > 0 || ssr2?.Baggage?.[0]?.length > 0 ? (
              <div>
                <div className="makeSticky">
                  <div className="seatHeader">
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      {ssr?.Baggage?.[0]?.length > 0 && (
                        <p
                          className={`fontSize16 boldFont seat_selected_header_para ${
                            activeTabBaggage === "ssr" ? "active" : ""
                          }`}
                          onClick={() => setActiveTabBaggage("ssr")}
                        >
                          <b>
                            {ssr.Baggage[0][0]?.Origin} -{" "}
                            {ssr.Baggage[0][0]?.Destination}
                          </b>
                        </p>
                      )}
                      {ssr2?.Baggage?.[0]?.length > 0 && (
                        <p
                          className={`fontSize16 boldFont seat_selected_header_para ${
                            activeTabBaggage === "ssr2" ? "active" : ""
                          }`}
                          onClick={() => setActiveTabBaggage("ssr2")}
                        >
                          <b>
                            {ssr2.Baggage[0][0]?.Origin} -{" "}
                            {ssr2.Baggage[0][0]?.Destination}
                          </b>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="ancTab pdcstm">
                  <div
                    className="tp_sec_adn ancnewMeal ng-scope"
                    style={{ display: "block" }}
                  >
                    {baggageList.length > 0 ? (
                      <Row>
                        {baggageList.map((item, index) => {
                          const qty = getBaggageQty(item.Code);
                          return (
                            <div className="col-lg-6 p-2" key={index}>
                              <div className="menu_50 ng-scope">
                                <div className="img_sec">
                                  <img
                                    src="https://flight.easemytrip.com/M_Content/img/img_MB/3Kg-bag.png"
                                    alt="baggage"
                                  />
                                </div>
                                <div className="dtlsec_adon">
                                  <div className="meanadons ng-binding">
                                    {item.Weight} Kg
                                  </div>
                                  <div className="pritag_adon">
                                    <span className="CurrncyCD_Rs">
                                      {item.Price}
                                    </span>
                                  </div>
                                </div>
                                <div className="qutsec_adon">
                                  <div className="PlusMinusRow_adon PlusMinusRow">
                                    <a
                                      className="sub_adon subanc"
                                      onClick={() =>
                                        handleBaggageChange(item, "decrement")
                                      }
                                    >
                                      <span>-</span>
                                    </a>
                                    <input
                                      type="text"
                                      value={qty}
                                      readOnly
                                      className="PlusMinus_number_adon PlusMinus_number"
                                    />
                                    <a
                                      className="add_adon addanc"
                                      onClick={() =>
                                        handleBaggageChange(item, "increment")
                                      }
                                    >
                                      <span>+</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Row>
                    ) : (
                      <div style={{ textAlign: "center", padding: 16 }}>
                        No Baggage Found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  margin: "auto",
                  marginTop: "10px",
                }}
              >
                No Baggage Found
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FlightSSR;

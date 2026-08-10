import axios from "axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaBusAlt, FaCar } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";
import {
  MdFlightTakeoff,
  MdHotel,
  MdDirectionsBus,
  MdLocalTaxi,
} from "react-icons/md";
import { Link } from "react-router-dom";

export const formatTime = (arrTime) => {
  const date = new Date(arrTime);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[date.getDay()];
  const dateNum = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${dateNum} ${month} ${year}`;
};

export default function Bookings({ flights, hotels, cabs, buses }) {
  const [activeTab, setActiveTab] = useState("flight");
  const [subTabs, setSubTabs] = useState({
    flight: "complete",
    hotel: "complete",
    // bus: "complete",
    // cab: "complete",
  });

  // ✅ Change: Per-ticket loading state
  const [loadingTickets, setLoadingTickets] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelType, setCancelType] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const cabinMapping = {
    1: "All",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business",
    6: "First Class",
  };

  const getBookingIdByType = (item, type) => {
    switch (type) {
      case "flight":
      case "hotel":
        return item.booking_id;
      case "bus":
        return item.pnr;
      case "cab":
        return item.order_no;
      default:
        return null;
    }
  };

  const downloadTicket = async (id, type) => {
    setLoadingTickets((prev) => ({ ...prev, [id]: true }));
    try {
      let apiUrl = "";
      let payload = {};

      switch (type) {
        case "flight":
          apiUrl = "https://admin.trustedfare.com/api/FlightDownloadTicket";
          payload = { BookingId: id };
          break;
        case "hotel":
          apiUrl = "https://admin.trustedfare.com/api/Hotel/DownloadTicket";
          payload = { BookingId: id };
          break;
        case "bus":
          apiUrl = "https://admin.trustedfare.com/api/Bus/DownloadTicket";
          payload = { PNR: id };
          break;
        case "cab":
          apiUrl = "https://admin.trustedfare.com/api/Cab/DownloadTicket";
          payload = { OrderNo: id };
          break;
        default:
          throw new Error("Unknown booking type");
      }

      const response = await axios.post(apiUrl, payload, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket_${type}_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket.");
    } finally {
      setLoadingTickets((prev) => ({ ...prev, [id]: false }));
    }
  };

  const cancelTicketAPI = async () => {
    if (!remarks.trim()) {
      alert("Enter remarks");
      return;
    }

    setCancelLoading(true);

    let apiUrl = "";
    let payload = {};

    switch (cancelType) {
      case "flight":
        apiUrl = "https://admin.trustedfare.com/api/Flight/Cancel";
        payload = { BookingId: cancelId, Remarks: remarks };
        break;

      case "hotel":
        apiUrl = "https://admin.trustedfare.com/api/Hotel/Cancel";
        payload = { BookingId: cancelId, Remarks: remarks };
        break;

      case "bus":
        apiUrl = "https://admin.trustedfare.com/api/Bus/Cancel";
        payload = { PNR: cancelId, Remarks: remarks };
        break;

      case "cab":
        apiUrl = "https://admin.trustedfare.com/api/Cab/Cancel";
        payload = { OrderNo: cancelId, Remarks: remarks };
        break;
    }

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Ticket cancelled successfully!");
      setShowCancelModal(false);
      setRemarks("");
    } catch (err) {
      alert("Cancellation failed");
    } finally {
      setCancelLoading(false);
    }
  };

  const renderBookings = (items, type) => {
    const currentStatus = subTabs[type];
    const statusMap = { complete: "1", cancel: "2", pending: "3" };

    const filtered = items.filter(
      (item) => String(item.status) === statusMap[currentStatus]
    );

    if (filtered.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500 fw-medium">
          No {currentStatus} {type} bookings found
        </div>
      );
    }

    return filtered.map((item, i) => {
      const bookingId = getBookingIdByType(item, type);
      const isDisabled =
        !bookingId || bookingId === "" || Number(item.status) !== 1;

      // const isDisabled = !bookingId || bookingId === "" || item.status !== 1;
      const isLoading = loadingTickets[bookingId];

      return (
        <div key={i} className="booking-card">
          <div className="d-flex gap-4 flex-wrap align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4 flex-wrap">
              <div className="d-grid place-content-center w-12 h-12 box-shadow rounded-circle flex-shrink-0">
                <div className="d-grid place-content-center w-10 h-10 bg-primary-50 clr-primary-300 rounded-circle">
                  <span className="material-symbols-outlined mat-icon">
                    {type === "flight" && <MdFlightTakeoff color="#1d489f" />}
                    {/* {type === "bus" && <FaBusAlt color="#1d489f" />} */}
                    {type === "hotel" && <IoIosBusiness color="#1d489f" />}
                    {/* {type === "cab" && <FaCar color="#1d489f" />} */}
                  </span>
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="fw-medium mb-1">
                  {type === "flight"
                    ? `${item.depart} → ${item.arrival}`
                    : type === "hotel"
                    ? item.hotel_name
                    : type === "bus"
                    ? `${item.origin} → ${item.destination}`
                    : `${item.pickup} → ${item.drop}`}
                </h5>
                <ul className="listttt list-row align-items-center flex-wrap list-divider-half-xs">
                  <li>
                    <span className="d-inline-block fs-14">
                      <span className="d-inline-block clr-neutral-500">
                        Booking ID : &nbsp;
                      </span>
                      <span className="d-inline-block clr-neutral-700 fw-medium">
                        {/* {bookingId} */}
                        {type === "flight"
                          ? `${item.booking_id}`
                          : type === "hotel"
                          ? item.booking_id
                          : type === "bus"
                          ? `${item.bus_id}`
                          : `${item.cab_id}`}
                      </span>
                    </span>
                  </li>
                  {type === "flight" && (
                    <li>
                      <span className="d-inline-block fs-14">
                        <span className="d-inline-block clr-neutral-500">
                          Travel Class :
                        </span>
                        <span className="d-inline-block clr-neutral-700 fw-medium">
                          {item.farequoteib_log &&
                            cabinMapping[
                              item.farequoteib_log.Results.Segments[0][0]
                                .CabinClass
                            ]}
                        </span>
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div>
              <Link
                to={`/bookings/flightdetail/${item.id}?service=${type}`}
                style={{ fontSize: "12px", marginRight: "5px" }}
                className="btn mr-1 btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0"
              >
                View Detail
              </Link>

              {/* <button
                onClick={() => {
                  if (!isDisabled) {
                    setCancelId(bookingId);
                    setCancelType(type);
                    setShowCancelModal(true);
                  }
                }}
                disabled={isDisabled}
                className={`btn btn-outline-primary py-2 px-6 rounded-pill ${
                  isDisabled ? "opacity-50" : ""
                }`}
                style={{ fontSize: "12px", marginRight: "5px" }}
              >
                Cancel Ticket
              </button> */}

              <button
                onClick={() => !isDisabled && downloadTicket(bookingId, type)}
                disabled={isDisabled}
                style={{ fontSize: "12px" }}
                className={`btn btn-outline-primary py-2 px-6 rounded-pill d-inline-flex align-items-center gap-1 fw-semibold flex-shrink-0 ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Download Ticket"
                )}
              </button>
            </div>
          </div>

          <div className="hr-dashed my-6" />

          <div className="row" style={{ padding: "0px 20px" }}>
            {type === "flight" && (
              <>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> Departure time </p>
                  <h5 className="mb-0 fw-medium">
                    {item.farequoteib_log &&
                      formatTime(
                        item.farequoteib_log.Results.Segments[0][0].Origin
                          .DepTime
                      )}
                  </h5>
                </div>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> Arrival time </p>
                  <h5 className="mb-0 fw-medium">
                    {item.farequoteib_log &&
                      formatTime(
                        item.farequoteib_log.Results.Segments[0][
                          item.farequoteib_log.Results.Segments[0].length - 1
                        ].Destination.ArrTime
                      )}
                  </h5>
                </div>
              </>
            )}
            {type === "hotel" && (
              <>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> CheckIn time </p>
                  <h5 className="mb-0 fw-medium"> {item.checkin}</h5>
                </div>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> CheckOut time </p>
                  <h5 className="mb-0 fw-medium"> {item.checkout}</h5>
                </div>
              </>
            )}
            {type === "bus" && (
              <>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> Boarding time </p>
                  <p>Operator: {formatTime(item.departuretime)}</p>
                </div>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> Dropping time </p>
                  <h5 className="mb-0 fw-medium">
                    {item.farequoteib_log && formatTime(item.arrivaltime)}
                  </h5>
                </div>
              </>
            )}
            {type === "cab" && (
              <>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> Start Date </p>
                  <p>
                    {item.booking_request.start_date} (
                    {item.booking_request.start_time})
                  </p>
                </div>
                <div className="col-lg-6 col-xl-4">
                  <p className="clr-neutral-500"> End Date </p>
                  <h5 className="mb-0 fw-medium">
                    {item.booking_request.end_date} (
                    {item.booking_request.end_time})
                  </h5>
                </div>
              </>
            )}

            <div className="col-lg-6 col-xl-4">
              <p className="clr-neutral-500"> Booked by </p>
              <h5 className="mb-0 fw-medium">
                {type === "flight"
                  ? `${item.booking_request.Passengers[0].FirstName} ${item.booking_request.Passengers[0].LastName}`
                  : type === "hotel"
                  ? `${item.booking_request.HotelRoomsDetails[0].HotelPassenger[0].FirstName} ${item.booking_request.HotelRoomsDetails[0].HotelPassenger[0].LastName}`
                  : type === "bus"
                  ? `${item.booking_request.Passenger[0].FirstName} ${item.booking_request.Passenger[0].LastName}`
                  : `${item.booking_request.name}`}
              </h5>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderSubTabs = (type) => (
    <>
      <div className="sub-tab-buttons">
        {["complete", "cancel", "pending"].map((status) => (
          <button
            key={status}
            className={subTabs[type] === status ? "active" : ""}
            onClick={() => setSubTabs((prev) => ({ ...prev, [type]: status }))}
          >
            {status === "complete"
              ? "Completed"
              : status === "cancel"
              ? "Cancelled"
              : "Pending"}
          </button>
        ))}
      </div>

      {renderBookings(
        type === "flight"
          ? flights
          : type === "hotel"
          ? hotels
          : type === "bus"
          ? buses
          : cabs,
        type
      )}
    </>
  );

  return (
    <ul className="list gap-6 my_account_col_shadow">
      <li>
        <div className="p-6 p-xl-10 rounded-4 bg-neutral-0 shadow-3">
          <h3 className="mb-0 flex-grow-1">My Bookings</h3>
          <div className="hr-line my-6" />

          <div className="row g-4">
            <div className="col-12">
              <div className="booking-tab">
                <button
                  className={`booking-tab__btn ${
                    activeTab === "flight" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("flight")}
                >
                  <MdFlightTakeoff /> Flight
                </button>
                <button
                  className={`booking-tab__btn ${
                    activeTab === "hotel" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("hotel")}
                >
                  <MdHotel /> Hotel
                </button>
                {/* <button
                  className={`booking-tab__btn ${
                    activeTab === "bus" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("bus")}
                >
                  <MdDirectionsBus /> Bus
                </button>
                <button
                  className={`booking-tab__btn ${
                    activeTab === "cab" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("cab")}
                >
                  <MdLocalTaxi /> Cab
                </button> */}
              </div>
            </div>

            <div className="col-12">
              {activeTab === "flight" && renderSubTabs("flight")}
              {activeTab === "hotel" && renderSubTabs("hotel")}
              {activeTab === "bus" && renderSubTabs("bus")}
              {activeTab === "cab" && renderSubTabs("cab")}
            </div>
          </div>
        </div>
      </li>
      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="cancel-modal-overlay">
          <div className="cancel-modal-content">
            <div className="cancel-modal-header">
              <h4>Cancel {cancelType.toUpperCase()} Booking</h4>
              <span
                className="cancel-close-btn"
                onClick={() => setShowCancelModal(false)}
              >
                ✕
              </span>
            </div>

            <div className="cancel-modal-body">
              <label className="fw-semibold mb-2">Remarks</label>
              <textarea
                className="form-control"
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter reason for cancellation..."
              />
            </div>

            <div className="cancel-modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowCancelModal(false)}
              >
                Close
              </button>

              <button
                className="btn btn-danger px-4"
                onClick={cancelTicketAPI}
                disabled={cancelLoading}
              >
                {cancelLoading ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ul>
  );
}

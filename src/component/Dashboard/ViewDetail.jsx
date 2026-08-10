import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { LuBaggageClaim } from "react-icons/lu";
import { useReactToPrint } from "react-to-print";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";
import { FaCarSide } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { FiPlusCircle } from "react-icons/fi";

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
const ViewDetail = () => {
  const [bookingDetails, setBookingDetails] = useState("");
  const cabinMapping = {
    1: "All",
    2: "Economy",
    3: "Premium Economy",
    4: "Business",
    5: "Premium Business",
    6: "First Class",
  };
  const { id } = useParams();
  const location = useLocation();
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const service = queryParams.get("service");
  useEffect(() => {
    if (hasFetched.current || !id || !service) return;
    hasFetched.current = true;

    const fetchBookingData = async () => {
      try {
        const response = await axios.post(
          `https://admin.trustedfare.com/api/details/${id}?service=${service}`,
        );
        const data = response.data?.data;

        if (!data) {
          console.error("Invalid response format");
          return;
        }

        let detail = null;

        switch (service) {
          case "flight":
            detail = data.Flights?.[0];
            break;
          case "hotel":
            detail = data.Hotels?.[0];
            break;
          case "bus":
            detail = data.Buses?.[0];
            break;
          case "cab":
            detail = data.Cabs?.[0];
            break;
          default:
            console.error("Invalid service type");
        }

        setBookingDetails(detail);
      } catch (error) {
        console.error("API call failed:", error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id, service]);

  const [ticketDownload, setTicketDownload] = useState(false);
  const downloadTicket = async (id) => {
    setTicketDownload(true);
    // setTicketDownload((prev) => ({ ...prev, [id]: true }));
    try {
      let apiUrl = "";
      let payload = {};

      switch (service) {
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
      link.setAttribute("download", `ticket_${service}_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket.");
    } finally {
      setTicketDownload(false);
    }
  };

  return (
    <>
      {service === "flight" && (
        <div>
          {bookingDetails && bookingDetails ? (
            <>
              <section
                className="order__section"
                style={{ position: "relative" }}
              >
                <div className="pageStickyHder">
                  <div className="flightsContainer pageHeaderWrap">
                    <div className="pageHeader">
                      <h2
                        data-test="component-title"
                        className="fontSize20 blackFont whiteText headerTitle"
                      />
                    </div>
                    {/* <div className="pageComponentsLinks">
                      <ul className="pageLinksUl">
                        <li data-test="component-nav_link">
                          <span data-test="component-link_text" className="">
                            Print
                          </span>
                        </li>
                        <li
                          data-test="component-nav_link"
                          onClick={() =>
                            downloadTicket(bookingDetails.booking_id)
                          }
                        >
                          <span data-test="component-link_text" className="">
                            {ticketDownload ? <Spinner animation="border" size="sm" /> : "Save Pdf"}
                          </span>
                        </li>
                        <li data-test="component-nav_link">
                          <span data-test="component-link_text" className="">
                            Email
                          </span>
                        </li>
                        <li data-test="component-nav_link">
                          <span data-test="component-link_text" className="">
                            Whatsapp
                          </span>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>

                <div>
                  <span className="bgGradient"></span>
                  <div className="container ticketContainers">
                    <div className="row justify-content-center">
                      <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                          <div className="invoice__textwrapper mb__10">
                            <div className="invoice__leftbox">
                              <h3 className="dtext xs-32">TripGo Online </h3>
                            </div>
                            {/* <div
                              className="invoice__righttbox mt-2"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                downloadTicket(bookingDetails.booking_id)
                              }
                            >
                              {ticketDownload ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                <img
                                  src="https://pixner.net/rechargio/rechargio/assets/img/svg/pringting.svg"
                                  alt="img"
                                />
                              )}
                            </div> */}
                            <div
                              className="hotelinvoiceBottom-buttons"
                              style={{ marginTop: "-25px" }}
                            >
                              <div className="invoice-buttons hotelinvoice-buttons">
                                <button className="print_btn">
                                  <svg
                                    width={20}
                                    height={21}
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                      fill="#00C764"
                                    />
                                  </svg>
                                </button>{" "}
                                <button
                                  id="download_btn"
                                  className="download_btn"
                                  onClick={() =>
                                    downloadTicket(bookingDetails.booking_id)
                                  }
                                >
                                  {ticketDownload ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : (
                                    <svg
                                      width={25}
                                      height={19}
                                      viewBox="0 0 25 19"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                        fill="#2D7CFE"
                                      />
                                    </svg>
                                  )}
                                </button>
                                <button className="whatsapp_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                      fill="#25D366"
                                    />
                                  </svg>
                                </button>
                                <button className="email_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                      fill="#EA4335"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="themeholy-invoice invoice_style17">
                            <div
                              className="download-inner"
                              id="download_section"
                            >
                              <div className="row gx-0 justify-content-between my-4">
                                <div className="col-6">
                                  <div className="info-box2 text-start">
                                    <div
                                      style={{ display: "flex", gap: "20px" }}
                                    >
                                      <div>
                                        <b>Booking ID:</b>
                                        <br />
                                        <span>{bookingDetails.booking_id}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="info-box2 text-end">
                                    <b>Payment Method:</b>
                                    <br />
                                    <span>Credit Card</span>
                                  </div>
                                </div>
                              </div>
                              <p className="table-title">
                                <b>Flight Information:</b>
                              </p>
                              <table className="invoice-table table-stripe3 style5">
                                <thead>
                                  <tr>
                                    <th colSpan="2">Airline Details</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Duration</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bookingDetails.farequoteib_log.Results.Segments[0].map(
                                    (detail, index) => (
                                      <tr>
                                        <td>
                                          <img
                                            src={`/Images/AirlineLogo/${detail.Airline.AirlineCode}.gif`}
                                            // src={`/Images/AirlineLogo/AI.gif`}
                                            alt=""
                                            style={{ width: "80px" }}
                                          />
                                          <br />
                                          <span>
                                            {" "}
                                            {detail.Airline.AirlineCode}{" "}
                                            {detail.Airline.FlightNumber}
                                          </span>
                                        </td>
                                        <td>
                                          <p>
                                            <span style={{ fontSize: "14px" }}>
                                              {detail.Airline.AirlineName}
                                            </span>
                                            <br />
                                            Cabin Class :{" "}
                                            {cabinMapping[detail.CabinClass]}
                                          </p>
                                        </td>
                                        <td>
                                          <p style={{ fontSize: "14px" }}>
                                            <span style={{ fontSize: "14px" }}>
                                              {formatTime(
                                                detail.Origin.DepTime,
                                              )}
                                            </span>
                                            <br />
                                            {detail.Origin.Airport.CityName}(
                                            {detail.Origin.Airport.CityCode})
                                            <br />
                                            {/* Terminal - 2 */}
                                          </p>
                                        </td>
                                        <td>
                                          <p style={{ fontSize: "14px" }}>
                                            <span style={{ fontSize: "14px" }}>
                                              {formatTime(
                                                detail.Destination.ArrTime,
                                              )}
                                            </span>
                                            <br />
                                            {
                                              detail.Destination.Airport
                                                .CityName
                                            }
                                            (
                                            {
                                              detail.Destination.Airport
                                                .CityCode
                                            }
                                            )
                                            <br />
                                            {/* Terminal - 2 */}
                                          </p>
                                        </td>
                                        <td>{detail.Duration} m</td>
                                      </tr>
                                    ),
                                  )}
                                </tbody>
                              </table>
                              {/* {bookingDetails2 && (
                              <>
                                <p className="table-title">
                                  <b>Inbound Flight Information:</b>
                                </p>
                                <table className="invoice-table table-stripe3 style5">
                                  <thead>
                                    <tr>
                                      <th colSpan="2">Airline Details</th>
                                      <th>Departure</th>
                                      <th>Arrival</th>
                                      <th>Duration</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {bookingDetails2.Segments.map(
                                      (detail, index) => (
                                        <tr>
                                          <td>
                                            <img
                                              src={`/Images/AirlineLogo/${detail.Airline.AirlineCode}.gif`}
                                              // src={`/Images/AirlineLogo/AI.gif`}
                                              alt=""
                                              style={{ width: "80px" }}
                                            />
                                            <br />
                                            <span>
                                              {" "}
                                              {detail.Airline.AirlineCode}{" "}
                                              {detail.Airline.FlightNumber}
                                            </span>
                                          </td>
                                          <td>
                                            <p>
                                              <span style={{ fontSize: "14px" }}>
                                                {detail.Airline.AirlineName}
                                              </span>
                                              <br />
                                              Cabin Class :{" "}
                                              {cabinMapping[detail.CabinClass]}
                                            </p>
                                          </td>
                                          <td>
                                            <p style={{ fontSize: "14px" }}>
                                              <span style={{ fontSize: "14px" }}>
                                                {formatTime(
                                                  detail.Origin.DepTime
                                                )}
                                              </span>
                                              <br />
                                              {detail.Origin.Airport.CityName}(
                                              {detail.Origin.Airport.CityCode})
                                              <br />
                                             
                                            </p>
                                          </td>
                                          <td>
                                            <p style={{ fontSize: "14px" }}>
                                              <span style={{ fontSize: "14px" }}>
                                                {formatTime(
                                                  detail.Destination.ArrTime
                                                )}
                                              </span>
                                              <br />
                                              {
                                                detail.Destination.Airport
                                                  .CityName
                                              }
                                              (
                                              {
                                                detail.Destination.Airport
                                                  .CityCode
                                              }
                                              )
                                              <br />
                                             
                                            </p>
                                          </td>
                                          <td>{detail.Duration} m</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </>
                            )} */}

                              {bookingDetails && (
                                <>
                                  <p className="table-title">
                                    <b> Passenger Information:</b>
                                  </p>
                                  <table className="invoice-table table-stripe3 style5">
                                    <thead>
                                      <tr>
                                        <th>Passenger's :</th>
                                        <th>Gender:</th>
                                        <th>PNR :</th>

                                        <th> Ticket Number :</th>

                                        <th>Seat No.:</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {bookingDetails.booking_request.Passengers.map(
                                        (passenger, index) => (
                                          <tr>
                                            <td>
                                              {" "}
                                              {passenger.FirstName}{" "}
                                              {passenger.LastName}{" "}
                                            </td>
                                            <td>
                                              {passenger.Gender === 1 && "Male"}{" "}
                                              {passenger.Gender === 0 &&
                                                "Female"}
                                              {passenger.Gender === 2 &&
                                                "Female"}{" "}
                                            </td>
                                            <td>{bookingDetails.pnr}</td>

                                            <td>
                                              {/* {passenger.Ticket &&
                                              passenger.Ticket.TicketNumber} */}
                                            </td>

                                            <td>
                                              {/* {passenger.SeatDynamic &&
                                              passenger.SeatDynamic.map(
                                                (item) => (
                                                  <span>
                                                    {item.RowNo}-{item.SeatNo},
                                                  </span>
                                                )
                                              )} */}
                                            </td>
                                          </tr>
                                        ),
                                      )}
                                    </tbody>
                                  </table>
                                </>
                              )}

                              {/* {bookingDetails2 && (
                              <>
                                <p className="table-title">
                                  <b>Inbound Passenger Information:</b>
                                </p>
                                <table className="invoice-table table-stripe3 style5">
                                  <thead>
                                    <tr>
                                      <th>Passenger's :</th>
                                      <th>Gender:</th>
  
                                      <th>PNR :</th>
  
                                      <th>Ticket Number :</th>
  
                                      <th>Seat No.:</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {bookingDetails2.Passenger.map(
                                      (passenger, index) => (
                                        <tr>
                                          <td>
                                            {" "}
                                            {passenger.FirstName}{" "}
                                            {passenger.LastName}{" "}
                                          </td>
                                          <td>
                                            {passenger.Gender === 1 && "Male"}{" "}
                                            {passenger.Gender === 0 && "Female"}
                                            {passenger.Gender === 2 &&
                                              "Female"}{" "}
                                          </td>
  
                                          {bookingDetails2 && (
                                            <td>
                                              {bookingDetails2.Segments[0]
                                                .AirlinePNR === ""
                                                ? bookingDetails2.PNR
                                                : bookingDetails2.Segments[0]
                                                    .AirlinePNR}
                                            </td>
                                          )}
                                          <td>
                                            {passenger.Ticket &&
                                              passenger.Ticket.TicketNumber}
                                          </td>
  
                                          <td>
                                            {passenger.SeatDynamic &&
                                              passenger.SeatDynamic.map(
                                                (item) => (
                                                  <span>
                                                    {item.RowNo}-{item.SeatNo},
                                                  </span>
                                                )
                                              )}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </>
                            )} */}

                              {bookingDetails && (
                                <table className="invoice-table table-stripe3">
                                  <thead>
                                    <tr>
                                      <th>Description</th>

                                      <th style={{ textAlign: "end" }}>
                                        Total
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Base Fare</td>
                                      <td style={{ textAlign: "end" }}>
                                        ₹
                                        {Math.round(
                                          bookingDetails.payment_detail
                                            .onward_base_fare,
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Tax & Surcharges</td>
                                      <td style={{ textAlign: "end" }}>
                                        ₹
                                        {Math.round(
                                          bookingDetails.payment_detail.tax,
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Discount</td>
                                      <td style={{ textAlign: "end" }}>
                                        ₹
                                        {Math.round(
                                          bookingDetails.payment_detail
                                            .discount_amount,
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td>
                                        <b>Total Amount:</b>
                                      </td>
                                      <td style={{ textAlign: "end" }}>
                                        ₹
                                        {Math.round(
                                          bookingDetails.payment_detail
                                            .finalbooingamount -
                                            bookingDetails.payment_detail
                                              .discount_amount,
                                        )}
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              )}
                              <div
                                className=""
                                style={{ width: "100%", textAlign: "end" }}
                              >
                                <div>
                                  <b>Payment Info:</b>
                                  <p className="mb-0">
                                    Credit Card No: 2456**********
                                    <br />
                                    A/C Name: TEST
                                  </p>
                                </div>
                              </div>

                              {/* <p className="invoice-note mt-3">
                              <svg
                                width={14}
                                height={18}
                                viewBox="0 0 14 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                                  fill="#2D7CFE"
                                />
                              </svg>{" "}
                              <b>NOTE: </b>This is computer generated receipt
                              and does not require physical signature.
                            </p> */}
                            </div>
                            {/* <div className="invoice-buttons">
                            <button className="print_btn">
                              <svg
                                width={20}
                                height={21}
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                  fill="#00C764"
                                />
                              </svg>
                            </button>{" "}
                            <button id="download_btn" className="download_btn">
                              <svg
                                width={25}
                                height={19}
                                viewBox="0 0 25 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                  fill="#2D7CFE"
                                />
                              </svg>
                            </button>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#1d489f"
                      className="mb-3"
                    />
                    <Card.Text>Fetching Your Booking Details..!!</Card.Text>
                    {/* <button
                                className="btn btn-outline-secondary mt-5 mb-5"
                                onClick={() => setDuringBooking(false)}
                              >
                                Cancel
                              </button> */}
                    <p>
                      Please hold on a moment while we retrieve your Booking
                      information. This won't take long!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <div
            style={{ position: "relative" }}
            className="ticket_container_mobileee"
          >
            <span className="bgGradient"></span>
            {bookingDetails && bookingDetails ? (
              <div className="p-3 ticketContainers">
                <div className="booking-details mb-4">
                  <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
                    <h6 className="fw-bold mb-3">Booking Information</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking ID</div>
                      <div className="fw-medium">
                        {bookingDetails.booking_id}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>{formatTime(bookingDetails.created_at)}</div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Airline PNR</div>
                      <div>{bookingDetails.pnr}</div>
                    </div>
                    {/* {bookingDetails2 && (
                  <div className="d-flex justify-content-between mb-2">
                    <div className="text-muted">Inbound Airline PNR</div>
                    <div>
                      {bookingDetails2.Segments[0].AirlinePNR === ""
                        ? bookingDetails2.PNR
                        : bookingDetails2.Segments[0].AirlinePNR}
                    </div>
                  </div>
                )} */}
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Payment Method</div>
                      <div>Visa •••• 4321</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Amount Paid</div>
                      <div className="fw-bold text-primary-color">
                        {Math.round(
                          bookingDetails.payment_detail.finalbooingamount -
                            bookingDetails.payment_detail.discount_amount,
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
                    <div>
                      <h6
                        className="fw-bold mb-3"
                        style={{
                          color: "#396ace",
                          background: "#9ebdd54a",
                          padding: "10px",
                        }}
                      >
                        Flight Details
                      </h6>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bus-icon me-3">
                          <img
                            style={{ width: "40px", borderRadius: "5px" }}
                            src={`/Images/AirlineLogo/${bookingDetails.farequoteib_log.Results.Segments[0][0].Airline.AirlineCode}.gif`}
                          />
                          {/* <i className="bi bi-bus-front" /> */}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">
                            {" "}
                            {
                              bookingDetails.farequoteib_log.Results
                                .Segments[0][0].Airline.AirlineName
                            }
                          </h6>
                          <div className="text-muted small">
                            {
                              bookingDetails.farequoteib_log.Results
                                .Segments[0][0].Airline.AirlineCode
                            }
                            -{" "}
                            {
                              bookingDetails.farequoteib_log.Results
                                .Segments[0][0].Airline.FlightNumber
                            }
                          </div>
                        </div>
                      </div>

                      {bookingDetails.farequoteib_log.Results.Segments[0].map(
                        (detail, index) => (
                          <div className="journey-details mb-3">
                            <div className="d-flex mb-3">
                              <div className="journey-stops me-3">
                                <div className="departure-stop" />
                                <div className="journey-line" />
                                <div className="arrival-stop" />
                              </div>
                              <div className="journey-info flex-grow-1">
                                <div className="mb-3">
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.Origin.Airport.CityName}(
                                    {detail.Origin.Airport.CityCode})
                                  </div>
                                  <div className="text-muted small">
                                    {" "}
                                    {formatTime(detail.Origin.DepTime)}
                                  </div>
                                </div>
                                <div>
                                  <div className="fw-bold">
                                    {" "}
                                    {detail.Destination.Airport.CityName}(
                                    {detail.Destination.Airport.CityCode})
                                  </div>
                                  <div className="text-muted small">
                                    {formatTime(detail.Destination.ArrTime)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    {/* {bookingDetails2 && (
                  <div>
                    <h6
                      className="fw-bold mb-3"
                      style={{
                        color: "#396ace",
                        background: "#9ebdd54a",
                        padding: "10px",
                      }}
                    >
                      Inbound Flight Details
                    </h6>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bus-icon me-3">
                        <img
                          style={{ width: "40px", borderRadius: "5px" }}
                          src={`/Images/AirlineLogo/${bookingDetails2.Segments[0].Airline.AirlineCode}.gif`}
                        />
                       
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">
                          {" "}
                          {bookingDetails2.Segments[0].Airline.AirlineName}
                        </h6>
                        <div className="text-muted small">
                          {bookingDetails2.Segments[0].Airline.AirlineCode}-{" "}
                          {bookingDetails2.Segments[0].Airline.FlightNumber}
                        </div>
                      </div>
                    </div>
                    {bookingDetails2.Segments.map((detail, index) => (
                      <div className="journey-details mb-3">
                        <div className="d-flex mb-3">
                          <div className="journey-stops me-3">
                            <div className="departure-stop" />
                            <div className="journey-line" />
                            <div className="arrival-stop" />
                          </div>
                          <div className="journey-info flex-grow-1">
                            <div className="mb-3">
                              <div className="fw-bold">
                                {" "}
                                {detail.Origin.Airport.CityName}(
                                {detail.Origin.Airport.CityCode})
                              </div>
                              <div className="text-muted small">
                                {" "}
                                {formatTime(detail.Origin.DepTime)}
                              </div>
                            </div>
                            <div>
                              <div className="fw-bold">
                                {" "}
                                {detail.Destination.Airport.CityName}(
                                {detail.Destination.Airport.CityCode})
                              </div>
                              <div className="text-muted small">
                                {formatTime(detail.Destination.ArrTime)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}

                    {bookingDetails.booking_request.Passengers.map(
                      (passenger, index) => (
                        <div className="row mb-3">
                          <div className="col-6">
                            <div className="text-muted small mb-1">
                              Passenger
                            </div>
                            <div className="fw-medium">
                              {passenger.FirstName} {passenger.LastName}{" "}
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="text-muted small mb-1">
                              Ticket No.
                            </div>
                            <div
                              className="fw-medium"
                              style={{ textAlign: "end" }}
                            ></div>
                          </div>
                          {/* {bookingDetails2 && (
                      <div className="col-6">
                        <div className="text-muted small mb-1">
                          Inbound Ticket No.
                        </div>
                        <div className="fw-medium">
                          {bookingDetails2.Passenger[index].Ticket.TicketNumber}
                        </div>
                      </div>
                    )} */}
                        </div>
                      ),
                    )}
                    {/* Additional Info */}
                    {bookingDetails.farequoteib_log.Results.Segments[0][0]
                      .Baggage !== "" && (
                      <div className="additional-info bg-white p-2 rounded-3 small">
                        <div>
                          <LuBaggageClaim className="bi bi-bag me-1 text-primary-color" />{" "}
                          Luggage allowance:
                          {
                            bookingDetails.farequoteib_log.Results
                              .Segments[0][0].Baggage
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="d-flex justify-content-between mt-2 ">
          <div className="" style={{fontWeight:'400',fontSize:'14px'}}>We have sent the ticket to <br />
          <span style={{fontWeight:'700',fontSize:'14px'}}>support@weblink.net</span></div>
          <div>Resent</div>
        </div> */}
                  <div className="booking-card p-3 rounded-3 bg-primary-light ">
                    <h6 className="fw-bold mb-3">Fare Summary</h6>

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>
                        {" "}
                        ₹
                        {Math.round(
                          bookingDetails.payment_detail.onward_base_fare,
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Tax & Surcharges</div>
                      <div>
                        {" "}
                        ₹{Math.round(bookingDetails.payment_detail.tax)}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Discount</div>
                      <div>
                        {" "}
                        ₹
                        {Math.round(
                          bookingDetails.payment_detail.discount_amount,
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Total Amount:</div>
                      <div className="fw-bold text-primary-color">
                        ₹
                        {Math.round(
                          bookingDetails.payment_detail.finalbooingamount -
                            bookingDetails.payment_detail.discount_amount,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="action-buttons d-grid gap-2">
                  <button
                    className="btn btn-app"
                    type="button"
                    onClick={() => downloadTicket(bookingDetails.booking_id)}
                  >
                    {ticketDownload ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Download PDF Ticket"
                    )}
                  </button>
                  <Link className="btn btn-outline-secondary rounded-3">
                    Resend Mail
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary rounded-3">
                    Back to Home
                  </Link>
                </div>
                {/* Share Trip */}
                {/* <div className="share-trip text-center mt-4">
      <p className="text-muted small mb-2">Share your trip details</p>
      <div className="social-share d-flex justify-content-center gap-3">
       <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
          <i className="bi bi-whatsapp" />
       </Link>
       <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
          <i className="bi bi-facebook" />
       </Link>
       <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
          <i className="bi bi-twitter" />
       </Link>
       <Link to="#" className="btn btn-sm btn-outline-secondary rounded-circle">
          <i className="bi bi-envelope" />
       </Link>
      </div>
    </div> */}
              </div>
            ) : (
              <div className="booking-overlayyyssss">
                <div className="overlay" style={{ opacity: "1" }}></div>
                <div className="booking-card animate-fade-in">
                  <Card className="text-center shadow">
                    <Card.Header
                      className="fw-bold"
                      style={{
                        background:
                          "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                        color: "#fff",
                      }}
                    >
                      Please Wait
                    </Card.Header>
                    <Card.Body>
                      <Spinner
                        animation="border"
                        variant="#1d489f"
                        className="mb-3"
                      />
                      <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                      {/* <button
                                className="btn btn-outline-secondary mt-5 mb-5"
                                onClick={() => setDuringBooking(false)}
                              >
                                Cancel
                              </button> */}
                      <p>
                        Please hold on a moment while we retrieve your ticket
                        information. This won't take long!
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {service === "hotel" && (
        <>
          {bookingDetails && bookingDetails ? (
            <>
              <section
                className="order__section "
                style={{ position: "relative" }}
              >
                <div className="pageStickyHder">
                  <div className="flightsContainer pageHeaderWrap">
                    <div className="pageHeader">
                      <h2
                        data-test="component-title"
                        className="fontSize20 blackFont whiteText headerTitle"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="bgGradient"></span>
                  <div className="container ticketContainers">
                    <div className="row justify-content-center">
                      <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                          <div className="invoice__textwrapper  mb__10">
                            <div className="invoice__leftbox">
                              <h3 className="dtext xs-32">TripGo Online </h3>
                            </div>
                            <div className="invoice-buttons hotelinvoice-buttons">
                              <button className="print_btn">
                                <svg
                                  width={20}
                                  height={21}
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                    fill="#00C764"
                                  />
                                </svg>
                              </button>{" "}
                              <button
                                id="download_btn"
                                className="download_btn"
                                onClick={() =>
                                  downloadTicket(bookingDetails.booking_id)
                                }
                              >
                                {ticketDownload ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <svg
                                    width={25}
                                    height={19}
                                    viewBox="0 0 25 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                      fill="#2D7CFE"
                                    />
                                  </svg>
                                )}
                              </button>
                              <button className="whatsapp_btn">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                >
                                  <path
                                    d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                    fill="#25D366"
                                  />
                                </svg>
                              </button>
                              <button className="email_btn">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                >
                                  <path
                                    d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                    fill="#EA4335"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="reservation__contetn">
                            <span className="dtext fz-16 fw-400 lato d-block mb__10">
                              <span>
                                Hey{" "}
                                {bookingDetails?.booking_request?.HotelRoomsDetails?.[0]?.HotelPassenger?.find(
                                  (p) => p.LeadPassenger,
                                )?.FirstName || "Guest"}
                                ,
                              </span>
                            </span>
                            <div className="input-esingl input-check d-flex align-items-center gap-2 payment__save mb__15">
                              <IoMdCheckboxOutline
                                size={20}
                                color="#43a047"
                                className="overcheck"
                                alt="img"
                                style={{ marginTop: "-8px" }}
                              />
                              <label className="gratext fz-18 fw-600 lato booking-confirm ">
                                Congratulations! Your Booking has been
                                confirmed.
                              </label>
                            </div>
                          </div>

                          <div className="themeholy-invoice invoice_style17">
                            <div
                              className="download-inner"
                              id="download_section"
                            >
                              <div className="row gx-0 justify-content-between my-4">
                                <div className="col-6">
                                  <div className="info-box2 text-start">
                                    <div
                                      style={{ display: "flex", gap: "20px" }}
                                    >
                                      <div>
                                        <b>Booking ID:</b>
                                        <br />
                                        <span>
                                          {bookingDetails?.booking_id}
                                        </span>
                                      </div>
                                      {/* <div>
                                <b>Inbound Booking ID:</b>
                                <br />
                                <span>11324342</span>
                              </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="info-box2 text-end">
                                    <b>Payment Method:</b>
                                    <br />
                                    <span>Credit Card</span>
                                  </div>
                                </div>
                              </div>

                              <div className="hotelPrebookVoucher">
                                <div className="hotelFinalBooking_hotelDetails ">
                                  <div className="hotelFinalBooking_hotelNameAdd">
                                    <div className="hotelListingstyling-name hotelFinalBooking-name">
                                      {bookingDetails?.hotel_name}
                                      <div
                                        className="rating-score"
                                        style={{
                                          textAlign: "center",
                                          fontSize: "18px",
                                        }}
                                      >
                                        {[...Array(5)].map((_, index) => (
                                          <span
                                            key={index}
                                            style={{
                                              color:
                                                index <
                                                Number(
                                                  bookingDetails?.star_rating,
                                                )
                                                  ? "#FFD700"
                                                  : "#ccc",
                                            }}
                                          >
                                            ★
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="hotel-Address">
                                      <CiLocationOn />{" "}
                                      <span
                                        title={
                                          bookingDetails?.hotel_detail.name
                                        }
                                      >
                                        {bookingDetails?.hotel_detail.address}
                                      </span>
                                    </div>
                                  </div>

                                  <Row className="hotelFinalBooking_rowCols">
                                    <Col
                                      md={4}
                                      className="hotelFinalBooking_Col1"
                                    >
                                      <img
                                        src="/Images/Images/hotelroom.jpg"
                                        alt=""
                                      />
                                    </Col>
                                    <Col
                                      md={8}
                                      className="hotelFinalBooking_Col2"
                                    >
                                      <div className="hotelFinalBooking_CheckinDetails">
                                        <div className="hotelFinalBooking_checkIn">
                                          <h6>CHECK-IN </h6>
                                          {/* <h3>{bookingDetails?.InitialCheckInDate}</h3> */}
                                          <h3>
                                            {bookingDetails?.checkin
                                              ? new Date(
                                                  bookingDetails?.checkin,
                                                ).toLocaleDateString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                })
                                              : ""}
                                          </h3>
                                        </div>
                                        <div
                                          style={{
                                            width: "80px",
                                            height: "2px",
                                            backgroundColor: "black",
                                          }}
                                        ></div>
                                        <div className="hotelFinalBooking_checkOut">
                                          <h6>CHECK-OUT</h6>
                                          {/* <h3>{bookingDetails?.InitialCheckOutDate}</h3> */}
                                          <h3>
                                            {bookingDetails?.checkout
                                              ? new Date(
                                                  bookingDetails?.checkout,
                                                ).toLocaleDateString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                })
                                              : ""}
                                          </h3>
                                        </div>

                                        {/* <Link to='/hoteldetailsmain'>
                                  <div className="hotelFinalBooking_changeRoom">CHANGE ROOM</div>
                                </Link> */}
                                      </div>

                                      <div className="hotelFinalBooking_roomsGuests">
                                        <h6>ROOMS & GUESTS</h6>
                                        <h6>
                                          <span style={{ fontWeight: "bold" }}>
                                            {bookingDetails?.rm[0].Rooms
                                              .length || 0}
                                          </span>{" "}
                                          <span className="hotelFinalBooking_roomsGuests_Span">
                                            Rooms
                                          </span>{" "}
                                          <span style={{ fontWeight: "bold" }}>
                                            {bookingDetails?.booking_request
                                              ?.HotelRoomsDetails?.[0]
                                              ?.HotelPassenger?.length || 0}
                                          </span>{" "}
                                          <span className="hotelFinalBooking_roomsGuests_Span">
                                            Guests
                                          </span>
                                        </h6>
                                      </div>
                                    </Col>
                                  </Row>

                                  <div className="hotelFinalBooking_roomType">
                                    {/* <h6>Name</h6> */}
                                    <div>
                                      {/* <span style={{ fontWeight: "bold" }}>1</span> Room */}
                                      <span style={{ fontWeight: "bold" }}>
                                        {bookingDetails?.rm[0].Rooms.length ||
                                          0}
                                      </span>{" "}
                                      <span className="hotelFinalBooking_roomsGuests_Span">
                                        Rooms
                                      </span>{" "}
                                    </div>

                                    <div className="hotelFinalBooking_inclusion">
                                      Inclusions
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <>
                                <p
                                  style={{ paddingTop: "25px" }}
                                  className="table-title"
                                >
                                  <b> Guest Information:</b>
                                </p>

                                <table className="invoice-table table-stripe3 style5">
                                  <thead>
                                    <tr>
                                      <th>Guest's :</th>
                                      <th>Gender:</th>
                                      <th>PAN No. :</th>
                                      <th>Mobile Number :</th>
                                      <th>Room No.:</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {bookingDetails?.booking_request.HotelRoomsDetails?.flatMap(
                                      (room, roomIndex) =>
                                        room.HotelPassenger?.map(
                                          (passenger, passengerIndex) => (
                                            <tr
                                              key={`${roomIndex}-${passengerIndex}`}
                                            >
                                              <td>{`${passenger.Title} ${passenger.FirstName} ${passenger.LastName}`}</td>
                                              <td>
                                                {passenger.Title === "Mr"
                                                  ? "Male"
                                                  : "Female"}
                                              </td>
                                              <td>{passenger.PAN || "-"}</td>
                                              <td>
                                                {passenger.Phoneno || "-"}
                                              </td>
                                              <td>{room.RoomId || "-"}</td>
                                            </tr>
                                          ),
                                        ),
                                    )}
                                  </tbody>
                                </table>
                              </>

                              <table className="invoice-table table-stripe3">
                                <thead>
                                  <tr>
                                    <th>Description</th>

                                    <th style={{ textAlign: "end" }}>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Base Fare</td>
                                    <td style={{ textAlign: "end" }}>
                                      {" "}
                                      ₹{" "}
                                      {bookingDetails?.payment_detail
                                        ?.base_total || 0}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Taxes & Fees</td>
                                    <td style={{ textAlign: "end" }}>
                                      ₹{" "}
                                      {Math.round(
                                        bookingDetails?.payment_detail
                                          ?.service_fee || 0,
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Discount</td>
                                    <td style={{ textAlign: "end" }}>
                                      ₹{" "}
                                      {Math.round(
                                        bookingDetails?.payment_detail
                                          ?.discount_amount || 0,
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td>
                                      <b>Total Amount:</b>
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                      ₹{" "}
                                      {bookingDetails?.payment_detail?.amount -
                                        bookingDetails?.payment_detail
                                          ?.discount_amount}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>

                              <div
                                className=""
                                style={{ width: "100%", textAlign: "end" }}
                              >
                                <div>
                                  <b>Payment Info:</b>
                                  <p className="mb-0">
                                    Credit Card No: 2456**********
                                    <br />
                                    A/C Name: TEST
                                  </p>
                                </div>
                              </div>

                              <p className="invoice-note mt-3">
                                <svg
                                  width={14}
                                  height={18}
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                                    fill="#2D7CFE"
                                  />
                                </svg>{" "}
                                <b>NOTE: </b>This is computer generated receipt
                                and does not require physical signature.
                              </p>
                            </div>

                            <div className="hotelinvoiceBottom-buttons">
                              <div className="invoice-buttons hotelinvoice-buttons">
                                <button className="print_btn">
                                  <svg
                                    width={20}
                                    height={21}
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                      fill="#00C764"
                                    />
                                  </svg>
                                </button>{" "}
                                <button
                                  id="download_btn"
                                  className="download_btn"
                                  onClick={() =>
                                    downloadTicket(bookingDetails.booking_id)
                                  }
                                >
                                  {ticketDownload ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : (
                                    <svg
                                      width={25}
                                      height={19}
                                      viewBox="0 0 25 19"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                        fill="#2D7CFE"
                                      />
                                    </svg>
                                  )}
                                </button>
                                <button className="whatsapp_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                      fill="#25D366"
                                    />
                                  </svg>
                                </button>
                                <button className="email_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                      fill="#EA4335"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="p-3 ticketContainers hide-desktop">
                <div className="success-message text-center mb-4">
                  <h4 className="fw-bold mb-2 text-black mt-2 ">
                    Payment Successful!{" "}
                    <img
                      src="/Images/Images/verify.png"
                      className="bi bi-check-circle"
                      style={{ height: "26px" }}
                    />
                  </h4>
                  <p className="" style={{ color: "rgb(138 136 136)" }}>
                    Your booking has been confirmed. Voucher details have been
                    sent to your email.
                  </p>
                </div>

                <div className="booking-details mb-4">
                  <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
                    <h6 className="fw-bold mb-3">Booking Information</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking ID</div>
                      <div className="fw-medium">
                        {bookingDetails?.booking_id}
                      </div>
                    </div>

                    {/* <div className="d-flex justify-content-between mb-2">
              <div className="text-muted">Inbound Booking ID</div>
              <div className="fw-medium">123123124</div>
            </div> */}

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>
                        {bookingDetails?.checkout
                          ? new Date(
                              bookingDetails?.checkout,
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </div>
                    </div>
                    {/* <div className="d-flex justify-content-between mb-2">
                    <div className="text-muted">Airline PNR</div>
                    <div>3423242</div>
                  </div>
    
                  <div className="d-flex justify-content-between mb-2">
                    <div className="text-muted">Inbound Airline PNR</div>
                    <div>53453453</div>
                  </div> */}

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Payment Method</div>
                      <div>Visa •••• 4321</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Amount Paid</div>
                      <div className="fw-bold text-primary-color">
                        ₹{" "}
                        {bookingDetails?.payment_detail?.amount -
                          bookingDetails?.payment_detail?.discount_amount}
                      </div>
                    </div>
                  </div>

                  <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
                    <div>
                      <h6
                        className="fw-bold mb-3"
                        style={{
                          color: "#396ace",
                          background: "#9ebdd54a",
                          padding: "10px",
                        }}
                      >
                        Hotel Details
                      </h6>
                      <div className="d-flex align-items-center mb-3">
                        {/* <div className="bus-icon me-3">
                        <img
                          style={{ width: "40px", borderRadius: "5px" }}
                          src={"/Images/hotel-icon.png"}
                        />
                      </div> */}
                        <div>
                          <h6 className="fw-bold mb-0">
                            {bookingDetails?.hotel_detail.name}
                          </h6>
                          <div className="text-muted small">
                            {bookingDetails?.hotel_detail.address}
                          </div>
                        </div>
                      </div>

                      <div className="journey-details mb-3">
                        <div className="d-flex mb-3">
                          <div className="journey-stops me-3">
                            <div className="departure-stop" />
                            <div className="journey-line" />
                            <div className="arrival-stop" />
                          </div>
                          <div className="journey-info flex-grow-1">
                            <div className="mb-3">
                              <div className="fw-bold"> Check-In</div>
                              <div className="text-muted small">
                                {" "}
                                {bookingDetails?.checkin
                                  ? new Date(
                                      bookingDetails?.checkin,
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : ""}
                              </div>
                            </div>
                            <div>
                              <div className="fw-bold"> Check-Out</div>
                              <div className="text-muted small">
                                {bookingDetails?.checkout
                                  ? new Date(
                                      bookingDetails?.checkout,
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text-muted mediam mb-0">Guests</div>
                          <div className="text-muted mediam mb-0 text-end">
                            Room No
                          </div>
                        </div>
                      </div>

                      {bookingDetails?.booking_request.HotelRoomsDetails?.flatMap(
                        (room, roomIndex) =>
                          room.HotelPassenger?.map(
                            (passenger, passengerIndex) => (
                              <div
                                className="col-12 mb-2"
                                key={`${roomIndex}-${passengerIndex}`}
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="fw-medium">
                                    {passenger.FirstName} {passenger.LastName}
                                  </div>
                                  <div className="fw-medium">
                                    {room.RoomId || "-"}
                                  </div>
                                </div>
                              </div>
                            ),
                          ),
                      )}
                    </div>
                  </div>

                  <div className="booking-card p-3 rounded-3 bg-primary-light ">
                    <h6 className="fw-bold mb-3">Fare Summary</h6>

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Base Fare</div>
                      <div>
                        ₹ {bookingDetails?.payment_detail?.base_total || 0}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Tax & Fees</div>
                      <div>
                        ₹{" "}
                        {Math.round(
                          bookingDetails?.payment_detail?.service_fee || 0,
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Discount</div>
                      <div>
                        ₹{" "}
                        {Math.round(
                          bookingDetails?.payment_detail?.discount_amount,
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Total Amount:</div>
                      <div className="fw-bold text-primary-color">
                        ₹{" "}
                        {bookingDetails?.payment_detail?.amount -
                          bookingDetails?.payment_detail?.discount_amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="action-buttons d-grid gap-2">
                  <button
                    className="btn btn-app"
                    type="button"
                    onClick={() => downloadTicket(bookingDetails.booking_id)}
                  >
                    {ticketDownload ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Download PDF Ticket"
                    )}
                  </button>
                  <Link className="btn btn-outline-secondary rounded-3">
                    Resend Mail
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary rounded-3">
                    Back to Home
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#1d489f"
                      className="mb-3"
                    />
                    <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                    {/* <button
                                className="btn btn-outline-secondary mt-5 mb-5"
                                onClick={() => setDuringBooking(false)}
                              >
                                Cancel
                              </button> */}
                    <p>
                      Please hold on a moment while we retrieve your ticket
                      information. This won't take long!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
      {service === "bus" && (
        <>
          {bookingDetails && bookingDetails ? (
            <>
              <section
                className="order__section "
                style={{ position: "relative" }}
              >
                <div className="pageStickyHder">
                  <div className="flightsContainer pageHeaderWrap">
                    <div className="pageHeader">
                      <h2
                        data-test="component-title"
                        className="fontSize20 blackFont whiteText headerTitle"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="bgGradient"></span>
                  <div className="container ticketContainers">
                    <div className="row justify-content-center">
                      <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                          <div className="invoice__textwrapper  mb__10">
                            <div className="invoice__leftbox">
                              <h3 className="dtext xs-32">TripGo Online </h3>
                            </div>
                            <div className="invoice-buttons hotelinvoice-buttons">
                              <button className="print_btn">
                                <svg
                                  width={20}
                                  height={21}
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                    fill="#00C764"
                                  />
                                </svg>
                              </button>{" "}
                              <button
                                id="download_btn"
                                className="download_btn"
                                onClick={() =>
                                  downloadTicket(bookingDetails.pnr)
                                }
                              >
                                {ticketDownload ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <svg
                                    width={25}
                                    height={19}
                                    viewBox="0 0 25 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                      fill="#2D7CFE"
                                    />
                                  </svg>
                                )}
                              </button>
                              <button className="whatsapp_btn">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                >
                                  <path
                                    d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                    fill="#25D366"
                                  />
                                </svg>
                              </button>
                              <button className="email_btn">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                >
                                  <path
                                    d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                    fill="#EA4335"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="reservation__contetn">
                            <span className="dtext fz-16 fw-400 lato d-block mb__10">
                              <span>
                                Hey{" "}
                                {
                                  bookingDetails.booking_request.Passenger[0]
                                    .FirstName
                                }{" "}
                                {
                                  bookingDetails.booking_request.Passenger[0]
                                    .LastName
                                }
                                ,
                              </span>
                            </span>
                            <div className="input-esingl input-check d-flex align-items-center gap-2 payment__save mb__15">
                              <IoMdCheckboxOutline
                                size={20}
                                color="#43a047"
                                className="overcheck"
                                alt="img"
                                style={{ marginTop: "-8px" }}
                              />
                              <label className="gratext fz-18 fw-600 lato booking-confirm ">
                                Congratulations! Your Booking has been
                                confirmed.
                              </label>
                            </div>
                          </div>

                          <div className="themeholy-invoice invoice_style17">
                            <div
                              className="download-inner"
                              id="download_section"
                            >
                              <div className="row gx-0 justify-content-between my-4">
                                <div className="col-6">
                                  <div className="info-box2 text-start">
                                    <div
                                      style={{ display: "flex", gap: "20px" }}
                                    >
                                      <div>
                                        <b>Booking Id:</b>
                                        <br />
                                        <span>{bookingDetails.bus_id}</span>
                                      </div>
                                      {/* <div>
                                      <b>Inbound Booking ID:</b>
                                      <br />
                                      <span>11324342</span>
                                    </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="info-box2 text-end">
                                    <b>Payment Method:</b>
                                    <br />
                                    <span>Credit Card</span>
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                className="cabGetBooking-Detailcard"
                              >
                                <div
                                  style={{ width: "750px" }}
                                  className="cabDetails-bookingCard"
                                >
                                  <div className="cabDetails-bookingTop">
                                    <div className="cabDetails-carSection">
                                      <img
                                        src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg"
                                        alt="Sedan"
                                        className="cabDetails-carImage"
                                      />
                                      {/* <div className="cabDetails-carType">Sedan</div> */}
                                    </div>

                                    <div className="cabDetails-routeInfo">
                                      <p className="cabDetails-pickupDate">
                                        Pickup :{" "}
                                        {moment(
                                          bookingDetails.block_response
                                            .BlockResult &&
                                            bookingDetails.block_response
                                              .BlockResult.DepartureTime,
                                        ).format("D MMMM, YYYY")}
                                        ,{" "}
                                        {moment(
                                          bookingDetails.block_response
                                            .BlockResult &&
                                            bookingDetails.block_response
                                              .BlockResult.DepartureTime,
                                        ).format("hh:mm A")}
                                      </p>

                                      <div className="cabDetails-route">
                                        <div>
                                          <strong>Pickup</strong>
                                          <p>
                                            {
                                              bookingDetails.boarding_response
                                                .GetBusRouteDetailResult
                                                .BoardingPointsDetails[0]
                                                .CityPointName
                                            }
                                            (
                                            {
                                              bookingDetails.boarding_response
                                                .GetBusRouteDetailResult
                                                .BoardingPointsDetails[0]
                                                .CityPointAddress
                                            }
                                            )
                                          </p>
                                        </div>
                                        <span className="cabDetails-arrow">
                                          →
                                        </span>
                                        <div>
                                          <strong>Drop-Off</strong>
                                          <p style={{ marginBottom: "0" }}>
                                            {
                                              bookingDetails.boarding_response
                                                .GetBusRouteDetailResult
                                                .DroppingPointsDetails[
                                                bookingDetails.boarding_response
                                                  .GetBusRouteDetailResult
                                                  .DroppingPointsDetails
                                                  .length - 1
                                              ].CityPointName
                                            }
                                            (
                                            {
                                              bookingDetails.boarding_response
                                                .GetBusRouteDetailResult
                                                .DroppingPointsDetails[
                                                bookingDetails.boarding_response
                                                  .GetBusRouteDetailResult
                                                  .DroppingPointsDetails
                                                  .length - 1
                                              ].CityPointLocation
                                            }
                                            )
                                          </p>
                                          <p></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="cabDetails-features">
                                    <div className="cabDetails-featuresIcon">
                                      <div className="cabDetails-featuresIconType">
                                        <FaCarSide />
                                      </div>
                                      <div className="cabDetails-featuresType">
                                        <div>Bus Type</div>
                                        <div className="cabDetails-link">
                                          {bookingDetails.block_response
                                            .BlockResult &&
                                            bookingDetails.block_response
                                              .BlockResult.BusType}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <>
                                <p
                                  style={{ paddingTop: "25px" }}
                                  className="table-title"
                                >
                                  <b> Guest Information:</b>
                                </p>

                                <table className="invoice-table table-stripe3 style5">
                                  <thead>
                                    <tr>
                                      <th>Guest's :</th>
                                      <th>Gender:</th>
                                      {/* <th>PAN No. :</th> */}
                                      <th>Mobile Number :</th>
                                      <th>Seat No:</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {bookingDetails?.block_response
                                      ?.BlockResult &&
                                    bookingDetails?.block_response?.BlockResult
                                      ?.Passenger.length > 0 ? (
                                      bookingDetails?.block_response
                                        ?.BlockResult &&
                                      bookingDetails?.block_response?.BlockResult?.Passenger.map(
                                        (dropItem, index) => (
                                          <tr key={index}>
                                            <td>{dropItem.FirstName || "-"}</td>
                                            <td>
                                              {dropItem.Gender === 1 && "Male"}
                                              {dropItem.Gender === 2 &&
                                                "Female"}
                                            </td>

                                            <td>{dropItem.Phoneno || "-"}</td>

                                            <td>
                                              {dropItem.Seat.SeatName || "-"}
                                            </td>
                                          </tr>
                                        ),
                                      )
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="5"
                                          style={{ textAlign: "center" }}
                                        >
                                          No guest information available
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </>

                              <table className="invoice-table table-stripe3">
                                <thead>
                                  <tr>
                                    <th>Description</th>

                                    <th style={{ textAlign: "end" }}>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Base Fare</td>
                                    <td style={{ textAlign: "end" }}>
                                      {" "}
                                      ₹{" "}
                                      {bookingDetails.payment_detail.base_total}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Discount</td>
                                    <td style={{ textAlign: "end" }}>
                                      ₹{" "}
                                      {
                                        bookingDetails?.payment_detail
                                          ?.discount_amount
                                      }
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td>
                                      <b>Total Amount:</b>
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                      ₹{" "}
                                      {bookingDetails.payment_detail.amount -
                                        bookingDetails?.payment_detail
                                          ?.discount_amount}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>

                              <div
                                className=""
                                style={{ width: "100%", textAlign: "end" }}
                              >
                                <div>
                                  <b>Payment Info:</b>
                                  <p className="mb-0">
                                    Credit Card No: 2456**********
                                    <br />
                                    A/C Name: TEST
                                  </p>
                                </div>
                              </div>

                              <p className="invoice-note mt-3">
                                <svg
                                  width={14}
                                  height={18}
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                                    fill="#2D7CFE"
                                  />
                                </svg>{" "}
                                <b>NOTE: </b>This is computer generated receipt
                                and does not require physical signature.
                              </p>
                            </div>

                            <div className="hotelinvoiceBottom-buttons">
                              <div className="invoice-buttons hotelinvoice-buttons">
                                <button className="print_btn">
                                  <svg
                                    width={20}
                                    height={21}
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                      fill="#00C764"
                                    />
                                  </svg>
                                </button>{" "}
                                <button
                                  id="download_btn"
                                  className="download_btn"
                                  onClick={() =>
                                    downloadTicket(bookingDetails.pnr)
                                  }
                                >
                                  {ticketDownload ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : (
                                    <svg
                                      width={25}
                                      height={19}
                                      viewBox="0 0 25 19"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                        fill="#2D7CFE"
                                      />
                                    </svg>
                                  )}
                                </button>
                                <button className="whatsapp_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                      fill="#25D366"
                                    />
                                  </svg>
                                </button>
                                <button className="email_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                      fill="#EA4335"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="p-3 ticketContainers hide-desktop">
                <div className="success-message text-center mb-4">
                  <h4 className="fw-bold mb-2 text-black mt-2 ">
                    Payment Successful!{" "}
                    <img
                      src="/Images/Images/verify.png"
                      className="bi bi-check-circle"
                      style={{ height: "26px" }}
                    />
                  </h4>
                  <p className="" style={{ color: "rgb(138 136 136)" }}>
                    Your booking has been confirmed. Ticket details have been
                    sent to your email.
                  </p>
                </div>

                <div className="booking-details mb-4">
                  <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
                    <h6 className="fw-bold mb-3">Booking Information</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Id</div>
                      <div className="fw-medium">{bookingDetails.bus_id}</div>
                    </div>

                    {/* <div className="d-flex justify-content-between mb-2">
                    <div className="text-muted">Inbound Booking ID</div>
                    <div className="fw-medium">123123124</div>
                  </div> */}

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>
                        {bookingDetails?.created_at
                          ? new Date(
                              bookingDetails?.created_at,
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </div>
                    </div>
                    {/* <div className="d-flex justify-content-between mb-2">
                          <div className="text-muted">Airline PNR</div>
                          <div>3423242</div>
                        </div>
          
                        <div className="d-flex justify-content-between mb-2">
                          <div className="text-muted">Inbound Airline PNR</div>
                          <div>53453453</div>
                        </div> */}

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Payment Method</div>
                      <div>Visa •••• 4321</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Amount Paid</div>
                      <div className="fw-bold text-primary-color">
                        ₹{" "}
                        {bookingDetails.payment_detail.amount -
                          bookingDetails?.payment_detail?.discount_amount}
                      </div>
                    </div>
                  </div>

                  <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
                    <div>
                      <h6
                        className="fw-bold mb-3"
                        style={{
                          color: "#396ace",
                          background: "#9ebdd54a",
                          padding: "10px",
                        }}
                      >
                        Bus Details
                      </h6>
                      <div className="d-flex align-items-center mb-3">
                        {/* <div className="bus-icon me-3">
                              <img
                                style={{ width: "40px", borderRadius: "5px" }}
                                src={"/Images/hotel-icon.png"}
                              />
                            </div> */}
                        <div>
                          <h6 className="fw-bold mb-0">
                            {bookingDetails.block_response.BlockResult &&
                              bookingDetails.block_response.BlockResult.BusType}
                          </h6>
                          {/* <div className="text-muted small">Address</div> */}
                        </div>
                      </div>

                      <div className="journey-details mb-3">
                        <div className="d-flex mb-3">
                          <div className="journey-stops me-3">
                            <div className="departure-stop" />
                            <div className="journey-line" />
                            <div className="arrival-stop" />
                          </div>
                          <div className="journey-info flex-grow-1">
                            <div className="mb-3">
                              <div className="fw-bold"> Pick-Up</div>
                              <div className="text-muted small">
                                {
                                  bookingDetails.boarding_response
                                    .GetBusRouteDetailResult
                                    .BoardingPointsDetails[0].CityPointName
                                }
                                (
                                {
                                  bookingDetails.boarding_response
                                    .GetBusRouteDetailResult
                                    .BoardingPointsDetails[0].CityPointAddress
                                }
                                )
                              </div>
                            </div>
                            <div>
                              <div className="fw-bold"> Drop-Off</div>
                              <div className="text-muted small">
                                {
                                  bookingDetails.boarding_response
                                    .GetBusRouteDetailResult
                                    .DroppingPointsDetails[
                                    bookingDetails.boarding_response
                                      .GetBusRouteDetailResult
                                      .DroppingPointsDetails.length - 1
                                  ].CityPointName
                                }
                                (
                                {
                                  bookingDetails.boarding_response
                                    .GetBusRouteDetailResult
                                    .DroppingPointsDetails[
                                    bookingDetails.boarding_response
                                      .GetBusRouteDetailResult
                                      .DroppingPointsDetails.length - 1
                                  ].CityPointLocation
                                }
                                )
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      {/* <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted mediam mb-0">Guests</div>
                      <div className="text-muted mediam mb-0 text-end">
                        Room No
                      </div>
                    </div>
                  </div> */}

                      {bookingDetails?.block_response?.BlockResult &&
                      bookingDetails?.block_response?.BlockResult?.Passenger
                        .length > 0 ? (
                        bookingDetails?.block_response?.BlockResult &&
                        bookingDetails?.block_response?.BlockResult?.Passenger.map(
                          (dropItem, index) => (
                            <tr key={index}>
                              <td>{dropItem.FirstName || "-"}</td>
                              <td>
                                {dropItem.Gender === 1 && "Male"}
                                {dropItem.Gender === 2 && "Female"}
                              </td>
                              <td>{"-"}</td> {/* No gender in API */}
                              <td>{dropItem.Phoneno || "-"}</td>{" "}
                              {/* No PAN in API */}
                              <td>{dropItem.Seat.SeatName || "-"}</td>
                            </tr>
                          ),
                        )
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            No guest information available
                          </td>
                        </tr>
                      )}
                    </div>
                  </div>

                  <div className="booking-card p-3 rounded-3 bg-primary-light ">
                    <h6 className="fw-bold mb-3">Fare Summary</h6>

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Base Fare</div>
                      <div>₹ {bookingDetails.payment_detail.base_total}</div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Discount</div>
                      <div>
                        ₹ {bookingDetails?.payment_detail?.discount_amount}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Total Amount:</div>
                      <div className="fw-bold text-primary-color">
                        ₹{" "}
                        {bookingDetails.payment_detail.amount -
                          bookingDetails?.payment_detail?.discount_amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="action-buttons d-grid gap-2">
                  <button
                    className="btn btn-app"
                    type="button"
                    onClick={() => downloadTicket(bookingDetails.pnr)}
                  >
                    {ticketDownload ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Download PDF Ticket"
                    )}
                  </button>
                  <Link className="btn btn-outline-secondary rounded-3">
                    Resend Mail
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary rounded-3">
                    Back to Home
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#1d489f"
                      className="mb-3"
                    />
                    <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                    {/* <button
                                className="btn btn-outline-secondary mt-5 mb-5"
                                onClick={() => setDuringBooking(false)}
                              >
                                Cancel
                              </button> */}
                    <p>
                      Please hold on a moment while we retrieve your ticket
                      information. This won't take long!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
      {service === "cab" && (
        <>
          {bookingDetails && bookingDetails ? (
            <>
              <section
                className="order__section "
                style={{ position: "relative" }}
              >
                <div className="pageStickyHder">
                  <div className="flightsContainer pageHeaderWrap">
                    <div className="pageHeader">
                      <h2
                        data-test="component-title"
                        className="fontSize20 blackFont whiteText headerTitle"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="bgGradient"></span>
                  <div className="container ticketContainers">
                    <div className="row justify-content-center">
                      <div className="col-xxl-12 col-xl-12 col-lg-12">
                        <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                          <div className="invoice__textwrapper  mb__10">
                            <div className="invoice__leftbox">
                              <h3 className="dtext xs-32">TripGo Online </h3>
                            </div>
                            <div className="invoice-buttons hotelinvoice-buttons">
                              <button className="print_btn">
                                <svg
                                  width={20}
                                  height={21}
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                    fill="#00C764"
                                  />
                                </svg>
                              </button>{" "}
                              <button
                                id="download_btn"
                                className="download_btn"
                                onClick={() =>
                                  downloadTicket(bookingDetails.order_no)
                                }
                              >
                                {ticketDownload ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <svg
                                    width={25}
                                    height={19}
                                    viewBox="0 0 25 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                      fill="#2D7CFE"
                                    />
                                  </svg>
                                )}
                              </button>
                              <button className="whatsapp_btn">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                >
                                  <path
                                    d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                    fill="#25D366"
                                  />
                                </svg>
                              </button>
                              <button className="email_btn">
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                >
                                  <path
                                    d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                    fill="#EA4335"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="reservation__contetn">
                            <span className="dtext fz-16 fw-400 lato d-block mb__10">
                              <span>
                                Hey {bookingDetails.booking_request.name},
                              </span>
                            </span>
                            <div className="input-esingl input-check d-flex align-items-center gap-2 payment__save mb__15">
                              <IoMdCheckboxOutline
                                size={20}
                                color="#43a047"
                                className="overcheck"
                                alt="img"
                                style={{ marginTop: "-8px" }}
                              />
                              <label className="gratext fz-18 fw-600 lato booking-confirm ">
                                Congratulations! Your Booking has been
                                confirmed.
                              </label>
                            </div>
                          </div>

                          <div className="themeholy-invoice invoice_style17">
                            <div
                              className="download-inner"
                              id="download_section"
                            >
                              <div className="row gx-0 justify-content-between my-4">
                                <div className="col-6">
                                  <div className="info-box2 text-start">
                                    <div
                                      style={{ display: "flex", gap: "20px" }}
                                    >
                                      <div>
                                        <b>Order Number:</b>
                                        <br />
                                        <span>{bookingDetails.order_no}</span>
                                      </div>
                                      {/* <div>
                                    <b>Inbound Booking ID:</b>
                                    <br />
                                    <span>11324342</span>
                                  </div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="info-box2 text-end">
                                    <b>Payment Method:</b>
                                    <br />
                                    <span>Credit Card</span>
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                className="cabGetBooking-Detailcard"
                              >
                                <div
                                  style={{ width: "750px" }}
                                  className="cabDetails-bookingCard"
                                >
                                  <div className="cabDetails-bookingTop">
                                    <div className="cabDetails-carSection">
                                      <img
                                        src="/Images/cab/img1.jpg"
                                        alt="Sedan"
                                        className="cabDetails-carImage"
                                      />
                                      {/* <div className="cabDetails-carType">Sedan</div> */}
                                    </div>

                                    <div className="cabDetails-routeInfo">
                                      <p className="cabDetails-pickupDate">
                                        Pickup :{" "}
                                        {moment(
                                          bookingDetails.booking_request
                                            .start_date,
                                        ).format("D MMMM, YYYY")}
                                        ,{" "}
                                        {
                                          bookingDetails.booking_request
                                            .start_time
                                        }
                                      </p>

                                      <div className="cabDetails-route">
                                        <div>
                                          <strong>Pickup</strong>
                                          <p>
                                            {
                                              bookingDetails.booking_request
                                                .pickup
                                            }
                                          </p>
                                        </div>
                                        <span className="cabDetails-arrow">
                                          →
                                        </span>
                                        <div>
                                          <strong>Drop-Off</strong>
                                          <p style={{ marginBottom: "0" }}>
                                            {
                                              bookingDetails.booking_request
                                                .drop
                                            }
                                          </p>
                                          <p></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="cabDetails-features">
                                    {/* <div className="cabDetails-featuresIcon">
                                  <div className="cabDetails-featuresIconType">
                                    <FaCarSide />
                                  </div>
                                  <div className="cabDetails-featuresType">
                                    <div>Car Model</div>
                                    <div className="cabDetails-link">
                                      {bookingDetails.product_name}
                                    </div>
                                  </div>
                                </div> */}
                                    {/* <div className="cabDetails-featuresIcon">
                                  <div className="cabDetails-featuresIconType">
                                    <SlSpeedometer />
                                  </div>
                                  <div className="cabDetails-featuresType">
                                    <div>Km Charges</div>
                                    <div className="cabDetails-link">
                                      Rs. {bookingDetails.extra_per_km}/km after{" "}
                                      {bookingDetails.distance} KM.
                                    </div>
                                  </div>
                                </div> */}
                                    {/* <div className="cabDetails-featuresIcon">
                                  <div className="cabDetails-featuresIconType">
                                    <FiPlusCircle />
                                  </div>
                                  <div className="cabDetails-featuresType">
                                    <div>Extra</div>
                                    <div className="cabDetails-link">
                                      {bookingDetails.total_seats} Seats
                                    </div>
                                  </div>
                                </div> */}
                                  </div>
                                </div>
                              </div>
                              <>
                                <p
                                  style={{ paddingTop: "25px" }}
                                  className="table-title"
                                >
                                  <b> Guest Information:</b>
                                </p>

                                <table className="invoice-table table-stripe3 style5">
                                  <thead>
                                    <tr>
                                      <th>Guest's :</th>
                                      {/* <th>Gender:</th> */}
                                      {/* <th>PAN No. :</th> */}
                                      <th>Mobile Number :</th>
                                      <th>Drop Location:</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {bookingDetails && (
                                      <tr>
                                        <td>
                                          {bookingDetails.booking_request
                                            .name || "-"}
                                        </td>

                                        <td>
                                          {bookingDetails.booking_request
                                            .phone || "-"}
                                        </td>
                                        <td>
                                          {bookingDetails.booking_request
                                            .drop || "-"}
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </>

                              <table className="invoice-table table-stripe3">
                                <thead>
                                  <tr>
                                    <th>Description</th>

                                    <th style={{ textAlign: "end" }}>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Base Fare</td>
                                    <td style={{ textAlign: "end" }}>
                                      {" "}
                                      ₹{" "}
                                      {bookingDetails.payment_detail.base_total}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Discount</td>
                                    <td style={{ textAlign: "end" }}>
                                      ₹{" "}
                                      {
                                        bookingDetails?.payment_detail
                                          ?.discount_amount
                                      }
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td>
                                      <b>Total Amount:</b>
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                      ₹{" "}
                                      {bookingDetails.payment_detail.amount -
                                        bookingDetails?.payment_detail
                                          ?.discount_amount}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>

                              <div
                                className=""
                                style={{ width: "100%", textAlign: "end" }}
                              >
                                <div>
                                  <b>Payment Info:</b>
                                  <p className="mb-0">
                                    Credit Card No: 2456**********
                                    <br />
                                    A/C Name: TEST
                                  </p>
                                </div>
                              </div>

                              <p className="invoice-note mt-3">
                                <svg
                                  width={14}
                                  height={18}
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                                    fill="#2D7CFE"
                                  />
                                </svg>{" "}
                                <b>NOTE: </b>This is computer generated receipt
                                and does not require physical signature.
                              </p>
                            </div>

                            <div className="hotelinvoiceBottom-buttons">
                              <div className="invoice-buttons hotelinvoice-buttons">
                                <button className="print_btn">
                                  <svg
                                    width={20}
                                    height={21}
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                      fill="#00C764"
                                    />
                                  </svg>
                                </button>{" "}
                                <button
                                  id="download_btn"
                                  className="download_btn"
                                  onClick={() =>
                                    downloadTicket(bookingDetails.order_no)
                                  }
                                >
                                  {ticketDownload ? (
                                    <Spinner animation="border" size="sm" />
                                  ) : (
                                    <svg
                                      width={25}
                                      height={19}
                                      viewBox="0 0 25 19"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                        fill="#2D7CFE"
                                      />
                                    </svg>
                                  )}
                                </button>
                                <button className="whatsapp_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                      fill="#25D366"
                                    />
                                  </svg>
                                </button>
                                <button className="email_btn">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                  >
                                    <path
                                      d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                      fill="#EA4335"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="p-3 ticketContainers hide-desktop">
                <div className="success-message text-center mb-4">
                  <h4 className="fw-bold mb-2 text-black mt-2 ">
                    Payment Successful!{" "}
                    <img
                      src="/Images/Images/verify.png"
                      className="bi bi-check-circle"
                      style={{ height: "26px" }}
                    />
                  </h4>
                  <p className="" style={{ color: "rgb(138 136 136)" }}>
                    Your booking has been confirmed. Voucher details have been
                    sent to your email.
                  </p>
                </div>

                <div className="booking-details mb-4">
                  <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
                    <h6 className="fw-bold mb-3">Booking Information</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Order Number</div>
                      <div className="fw-medium">{bookingDetails.order_no}</div>
                    </div>

                    {/* <div className="d-flex justify-content-between mb-2">
                  <div className="text-muted">Inbound Booking ID</div>
                  <div className="fw-medium">123123124</div>
                </div> */}

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Booking Date</div>
                      <div>
                        {moment(
                          bookingDetails.booking_request.start_date,
                        ).format("D MMMM, YYYY")}
                      </div>
                    </div>
                    {/* <div className="d-flex justify-content-between mb-2">
                        <div className="text-muted">Airline PNR</div>
                        <div>3423242</div>
                      </div>
        
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-muted">Inbound Airline PNR</div>
                        <div>53453453</div>
                      </div> */}

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Payment Method</div>
                      <div>Visa •••• 4321</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Amount Paid</div>
                      <div className="fw-bold text-primary-color">
                        ₹{" "}
                        {bookingDetails.payment_detail.amount -
                          bookingDetails?.payment_detail?.discount_amount}
                      </div>
                    </div>
                  </div>

                  <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
                    <div>
                      <h6
                        className="fw-bold mb-3"
                        style={{
                          color: "#396ace",
                          background: "#9ebdd54a",
                          padding: "10px",
                        }}
                      >
                        Cab Details
                      </h6>
                      <div className="d-flex align-items-center mb-3">
                        {/* <div className="bus-icon me-3">
                            <img
                              style={{ width: "40px", borderRadius: "5px" }}
                              src={"/Images/hotel-icon.png"}
                            />
                          </div> */}
                        <div>
                          {/* <h6 className="fw-bold mb-0">
                        {bookingDetails.product_name}
                      </h6> */}
                          {/* <div className="text-muted small">Address</div> */}
                        </div>
                      </div>

                      <div className="journey-details mb-3">
                        <div className="d-flex mb-3">
                          <div className="journey-stops me-3">
                            <div className="departure-stop" />
                            <div className="journey-line" />
                            <div className="arrival-stop" />
                          </div>
                          <div className="journey-info flex-grow-1">
                            <div className="mb-3">
                              <div className="fw-bold"> Pick-Up</div>
                              <div className="text-muted small">
                                {bookingDetails.booking_request.pickup}
                              </div>
                            </div>
                            <div>
                              <div className="fw-bold"> Drop-Off</div>
                              <div className="text-muted small">
                                {bookingDetails.booking_request.drop}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      {bookingDetails ? (
                        <tr>
                          <td>{bookingDetails.booking_request.name || "-"}</td>

                          <td>{bookingDetails.booking_request.phone || "-"}</td>
                          <td>{bookingDetails.booking_request.drop || "-"}</td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            No guest information available
                          </td>
                        </tr>
                      )}
                    </div>
                  </div>

                  <div className="booking-card p-3 rounded-3 bg-primary-light ">
                    <h6 className="fw-bold mb-3">Fare Summary</h6>

                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Base Fare</div>
                      <div>₹ {bookingDetails.payment_detail.base_total}</div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div className="text-muted">Discount</div>
                      <div>
                        ₹ {bookingDetails?.payment_detail?.discount_amount}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="text-muted">Total Amount:</div>
                      <div className="fw-bold text-primary-color">
                        ₹ {bookingDetails.payment_detail.amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="action-buttons d-grid gap-2">
                  <button
                    className="btn btn-app"
                    type="button"
                    onClick={() => downloadTicket(bookingDetails.order_no)}
                  >
                    {ticketDownload ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Download PDF Ticket"
                    )}
                  </button>
                  <Link className="btn btn-outline-secondary rounded-3">
                    Resend Mail
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary rounded-3">
                    Back to Home
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#1d489f"
                      className="mb-3"
                    />
                    <Card.Text>Fetching Your Ticket Details..!!</Card.Text>
                    {/* <button
                                className="btn btn-outline-secondary mt-5 mb-5"
                                onClick={() => setDuringBooking(false)}
                              >
                                Cancel
                              </button> */}
                    <p>
                      Please hold on a moment while we retrieve your ticket
                      information. This won't take long!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewDetail;

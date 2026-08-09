import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Breadcrumb,
  Dropdown,
  Pagination,
  Form,
  ListGroup,
} from "react-bootstrap";
import { FaBuilding, FaEye, FaFilter, FaPlane, FaSuitcaseRolling } from "react-icons/fa";
import { Link } from "react-router-dom";
// import "./PackageBookingTable.css";

// UserTags component
const UserTags = ({ data }) => {
  // Initialize counts for each status
  let successCount = 0;
  let failedCount = 0;
  let pendingCount = 0;

  // Iterate over data to count occurrences of each status
  data.forEach((booking) => {
    const status = booking.status.toLowerCase(); // Convert status to lowercase

    if (status === "success") {
      successCount++;
    } else if (status === "failed") {
      failedCount++;
    } else if (status === "pending") {
      pendingCount++;
    }
  });

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        variant="success"
        className="success_tag cus_tag">
        <span className="span_tag approvetag">{successCount}</span>{" "}
        <span className="tag_label">Success</span>
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        variant="danger"
        className="failed_tag cus_tag">
        <span className="span_tag failedtag">{failedCount}</span>{" "}
        <span className="tag_label">Failed</span>
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        variant="warning"
        className="pending_tag cus_tag">
        <span className="span_tag pendingtag">{pendingCount}</span>{" "}
        <span className="tag_label">Pending</span>
      </ListGroup.Item>
    </ListGroup>
  );
};
// CardCustomMenu component
const CardCustomMenu = ({ toggleFilter }) => {
  return (
    <div className="full-container">
      <div>
        <ul className="custom-menu-container">
          <li>
            <Link to="/bookings/hotel">
              <FaBuilding style={{ marginRight: "10px" }} />
              Hotel
            </Link>
          </li>
          <li className="active">
            <Link to="/bookings/tour"><FaSuitcaseRolling style={{ marginRight: "10px" }} />Package</Link>
          </li>
          <li>
            <Link to="/bookings/flight"><FaPlane style={{ marginRight: "10px" }} />Flight</Link>
          </li>
          {/* <li>
            <Link to="/bookings/transfer">Transfer</Link>
          </li> */}
        </ul>
      </div>
      <div>
        <Button
          variant="theme"
          size="sm"
          className="filter_btn"
          onClick={toggleFilter}>
          <FaFilter className="filter-icon" /> Filter
        </Button>
      </div>
    </div>
  );
};

// Filter component
const Filter = ({ onFilter }) => {
  // const [fromDate, setFromDate] = useState(null);
  // const [toDate, setToDate] = useState(null);

  // const handleFromDateChange = (date) => {
  //   if (!toDate || date <= toDate) {
  //     setFromDate(date);
  //   }
  // };

  // const handleToDateChange = (date) => {
  //   if (!fromDate || date >= fromDate) {
  //     setToDate(date);
  //   }
  // };

  const [filters, setFilters] = useState({
    booking_id: "",
    fromDate: null,
    toDate: null,
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFromDateChange = (date) => {
    // Ensure that the selected date is less than or equal to the "To Booking Date"
    if (!filters.toDate || date <= filters.toDate) {
      setFilters({ ...filters, fromDate: date });
    }
  };

  const handleToDateChange = (date) => {
    // Ensure that the selected date is greater than or equal to the "From Booking Date"
    if (!filters.fromDate || date >= filters.fromDate) {
      setFilters({ ...filters, toDate: date });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="filter_panel">
      <h4>Search By Details</h4>
      <Form onSubmit={handleSubmit}>
        <input type="hidden" name="type" value="b2c" />
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                autoComplete="off"
                placeholder="Enter ID"
                name="booking_id"
                type="text"
                value={filters.booking_id}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>From Booking Date</Form.Label>
              <DatePicker
                selected={filters.fromDate}
                onChange={handleFromDateChange}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="From Booking Date"
                maxDate={filters.toDate || new Date()}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>To Booking Date</Form.Label>
              <DatePicker
                selected={filters.toDate}
                onChange={handleToDateChange}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="To Booking Date"
                minDate={filters.fromDate}
                maxDate={new Date()}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Booking Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={filters.status}
                onChange={handleInputChange}>
                <option value="">- Select Type -</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <Button
              variant="theme"
              size="md"
              type="submit"
              className="search-filter-btn">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const PackageBookingTable = ({ heading, data }) => {
  // State to manage the visibility of the filter panel
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  // const [currentPage, setCurrentPage] = useState(1);
  // const entriesPerPage = 5;

  // Function to toggle the filter panel visibility
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFilter = (filters) => {
    const { booking_id, fromDate, toDate, status } = filters;
    const filteredData = data.filter((booking) => {
      let matchesFilter = true;

      if (booking_id && !booking.id.toString().includes(booking_id)) {
        // Convert booking.id to string before calling includes
        matchesFilter = false;
      }

      if (fromDate && new Date(booking.bookingDate) < new Date(fromDate)) {
        matchesFilter = false;
      }

      if (toDate && new Date(booking.bookingDate) > new Date(toDate)) {
        matchesFilter = false;
      }

      if (status && booking.status !== status) {
        matchesFilter = false;
      }

      return matchesFilter;
    });

    setFilteredData(filteredData);
    setCurrentPage(1); // Reset pagination to the first page
  };

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5; // Number of entries per page

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div
      className="content-wrapper"
      // style={{ minHeight: "531px", margin: "15px" }}
    >
      <Container fluid>
        <div className="content-header">
          <Container fluid>
            <Row>
              <Col sm={6} md={6} className="sm-center">
                <h1 className="m-0 text-dark">{heading}</h1>
              </Col>
              <Col sm={6} md={6} className="sm-center">
                <Breadcrumb className="float-sm-right">
                  <Breadcrumb.Item
                    linkAs={Link}
                    linkProps={{ to: "/bookings" }}>
                    Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{heading}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="content">
          <Container fluid>
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Header>
                    <div className="cus_user_tags">
                      <UserTags data={filteredData} />
                    </div>
                  </Card.Header>
                </Card>
              </Col>
              <Col md={12}>
                <Card>
                  <Card.Header>
                    <div className="card_custom_menu">
                      <CardCustomMenu toggleFilter={toggleFilter} />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {showFilter && <Filter onFilter={handleFilter} />}
                    <Col md={12}>
                      <div className="table-responsive">
                        <Table bordered hover className="no-footer">
                          <thead>
                            <tr>
                              <th className="no-sort sorting_disabled">
                                Basic
                              </th>
                              <th className="no-sort sorting_disabled">Info</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Price</th>
                              <th className="no-sort sorting_disabled">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="tdata booking_data">
                            {currentEntries.map((booking, index) => (
                              <tr
                                key={index}
                                role="row"
                                className={index % 2 === 0 ? "odd" : "even"}>
                                <td>
                                  <b>ID:</b> {booking.id}
                                  <br />
                                  {booking.bookingDate}
                                </td>
                                <td>
                                  <b>{booking.packageName}</b>
                                  <br />
                                  {booking.info}
                                </td>{" "}
                                <td>
                                  {new Date(
                                    booking.bookingDate
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                  <div className="check_status">
                                    <Button
                                      variant="link"
                                      className={`chk_stat_btn ${
                                        booking.status === "Pending"
                                          ? "yellow_clr"
                                          : booking.status === "Success"
                                          ? "green_clr"
                                          : "red_clr"
                                      }`}>
                                      {booking.status}
                                    </Button>
                                  </div>
                                </td>
                                <td
                                  style={{
                                    // textAlign: "right",
                                    fontWeight: 600,
                                  }}>
                                  ₹ {booking.price}
                                </td>
                                <td>
                                  <div className="nav-item dropdown action_dropdown cus_action_btn">
                                    <Dropdown>
                                      <Dropdown.Toggle
                                        variant="primary"
                                        size="sm"
                                        className="action_btn btn btn-primary btn-rounded btn-xs"
                                        id="dropdown-basic">
                                        Action <span className="caret"></span>
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to={booking.detailLink}>
                                            <FaEye className="eye-icon" /> View
                                            Detail
                                          </Link>
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {currentEntries.length === 0 && (
                              <tr>
                                <td className="text-center" colSpan="6">
                                  No Record Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Col>

                    <Col md={12}>
                      {/* Pagination */}
                      <Row>
                        <Col sm={12} md={5}>
                          <div
                            className="dataTables_info"
                            id="invoicetable_info"
                            role="status"
                            aria-live="polite">
                            {filteredData.length > 0
                              ? `Showing ${indexOfFirstEntry + 1} to ${Math.min(
                                  indexOfLastEntry,
                                  filteredData.length
                                )} of ${filteredData.length} entries`
                              : "No bookings to show"}
                          </div>
                        </Col>
                        <Col sm={12} md={7}>
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="invoicetable_paginate">
                            <Pagination>
                              {/* Previous page button */}
                              <Pagination.Prev
                                onClick={() => paginate(currentPage - 1)}
                                disabled={
                                  currentPage === 1 || filteredData.length === 0
                                }>
                                Previous
                              </Pagination.Prev>
                              {/* Page numbers */}
                              {Array.from({ length: totalPages }).map(
                                (_, index) => (
                                  <Pagination.Item
                                    key={index}
                                    active={currentPage === index + 1}
                                    onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                  </Pagination.Item>
                                )
                              )}
                              {/* Next page button */}
                              <Pagination.Next
                                onClick={() => paginate(currentPage + 1)}
                                disabled={
                                  currentPage === totalPages ||
                                  filteredData.length === 0
                                }>
                                Next
                              </Pagination.Next>
                            </Pagination>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </div>
  );
};

export default PackageBookingTable;

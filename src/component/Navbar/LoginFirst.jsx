import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { FaUser, FaKey, FaUserTie } from "react-icons/fa";
import "./LoginFirst.css";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import ViewCancelReschedule from "./ViewCancelReschedule";
import { useAuth } from "../../context/AuthContext";
import { loggedIn } from "../../redux/slices/login";
import { useDispatch } from "react-redux";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { Wallentbalance, login } from "../../../../redux/services/operations/auth";

const LoginFirst = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔁 Loading state
  const dispatch = useDispatch();
  // const [showOtp, setShowOtp] = useState(false);

  // const handleOtpToggle = () => setShowOtp(!showOtp);

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://admin.trustedfare.com/api/User/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id: UserName,
            Pw: Password,
          }),
        }
      );

      const data = await response.json();

      if (data && data.success == true) {
        console.log("Login successful", data);
        localStorage.setItem("isAuthenticated", data.data.token);
        dispatch(loggedIn(data.data.token));
        localStorage.setItem("UserId", data.data.Phone);
        // Save token or redirect
        navigate("/bookings/flight"); // Redirect to login page
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Network or server error");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  //   const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  // const { login } = useAuth(); // Get login function from AuthContext

  // const handleLogin = async () => {
  //   // dispatch(login(UserName, Password, navigate));
  //   // dispatch(Wallentbalance(UserName,Password, navigate))
  //   // navigate('/agent/dashboard')

  //   // Simple mock validation, you can replace it with your actual login logic
  //   // if (UserName === "admin" && Password === "password") {
  //   login(); // Set user as authenticated
  //   // navigate("/dashboard"); // Navigate to the protected route
  //   // } else {
  //   //   alert("Invalid credentials, please try again.");
  //   // }
  // };

  const handleOtpToggle = () => {
    setShowOtp(!showOtp);
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="login-background">
      <div className="travelagent" style={{ background: "none" }}>
        <Container>
          <Row className="d-flex align-items-center flex_wrap">
            {/* <Col md={6}>
            <h1 className="text-white" style={{ fontSize: "36px" }}>
              <b>Welcome to Abasinexpress B2C Portal</b>
            </h1>
            <p className="text-white">
              Welcome to Abasinexpress, your gateway to seamless and efficient
              travel management. Our B2C portal is designed to elevate your
              travel experience, providing a usessr-friendly platform for travel
              professionals like you.
            </p>
            <Button
              as={Link}
              style={{ marginTop: "20px" }}
              to="/agent-registration"
              className="btn btn-primary"
            >
              Register with us
            </Button>
          </Col> */}
            <Col md={6} className="col_xs_480 floatrgt_lg">
              <div className="agent_form">
                <form
                  method="POST"
                  acceptCharset="UTF-8"
                  name="admin_login"
                  autoComplete="off"
                >
                  <h1>Login or Create an account</h1>
                  <div className="inner_form_field">
                    <div className="form-group" style={{ marginTop: "50px" }}>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FaUser className="fas" />
                        </span>
                        <input
                          type="text"
                          name="username"
                          value={UserName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="form-control input"
                          placeholder="Email ID / Phone Number"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <FaKey className="fa" />
                        </span>
                        <input
                          type={showOtp ? "text" : "password"}
                          name="password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control input"
                          placeholder="Password"
                        />
                        <div
                          onClick={handleOtpToggle}
                          className="pass_eyeswitch lgpassicon"
                        >
                          <i
                            className={
                              showOtp ? "fa fa-eye" : "fa fa-eye-slash"
                            }
                          ></i>
                        </div>
                      </div>
                    </div>

                    <div className="form_btn">
                      <Button
                        type="button"
                        className="btn verify_button input"
                        onClick={handleLogin}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" /> Logging
                            in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>

                    <div className="cus_txt">
                      <p>
                        Don’t have an account?{" "}
                        <Link onClick={handleShow}>Sign Up Here</Link>
                      </p>
                      <p>
                        Forgot your password?{" "}
                        <Button
                          variant="link"
                          style={{
                            padding: "0px",
                            textDecoration: "none",
                            color: "#2d3290",
                            fontSize: "inherit",
                          }}
                          onClick={handleShowModal}
                        >
                          Forgot Password
                        </Button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </Col>

            <Col md={6} className="cancel_col">
              <ViewCancelReschedule />
            </Col>
          </Row>
        </Container>

        <SignUp
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
        />

        {/* Forgot Password Modal */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="md"
          className="forgotpasswordmodal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change your Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="travelagent">
                <div className="agent_form">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <FaUserTie />
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form_btn">
                    <Button type="submit" className="btn submit_btn">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default LoginFirst;

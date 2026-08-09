import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  FaUser,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaCheckSquare,
} from "react-icons/fa";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../../redux/slices/login";
import SignUp from "../../Navbar/SignUp";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [reffid, setReffid] = useState("");
  const [reffemail, setReffemail] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://admin.skyportdestinations.com/api/User/Login",
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

      if (data && data.success === true) {
        localStorage.setItem("isAuthenticated", data.data.token);
        dispatch(loggedIn(data.data.token));
        localStorage.setItem("UserId", data.data.Phone);
        navigate("/bookings/flight");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    console.log("Guest Submission:", { reffid, reffemail });
  };

  return (
    <div className="login-page-v2">
      <div className="auth-container-v5">
        {/* Member Card */}
        <div className="auth-card-v5">
          <h2>Login or Create an account</h2>
          <span className="card-subtitle-v5">
            Manage your bookings & faster checkout
          </span>

          <form onSubmit={handleLogin}>
            <div className="v5-input-group">
              <div className="v5-icon-box">
                <FaUser />
              </div>
              <div className="password-container-v5">
                <input
                  type="text"
                  className="v5-input-field"
                  placeholder="Email ID / Phone Number"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <FaCheckSquare className="v5-green-check" />
              </div>
            </div>

            <div className="v5-input-group">
              <div className="v5-icon-box">
                <FaKey />
              </div>
              <div className="password-container-v5">
                <input
                  type={showPassword ? "text" : "password"}
                  className="v5-input-field"
                  placeholder="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="v5-eye"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="v5-submit-btn orange-btn"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "LOGIN"}
            </button>

            <div className="auth-links-v5">
              <p>
                Don't have an account?{" "}
                <Link onClick={() => setShowSignUp(true)}>Sign Up Here</Link>
              </p>
              <Link to="">Forgot Password?</Link>
            </div>
          </form>
        </div>

        {/* Guest Card */}
        <div className="auth-card-v5">
          <h1>View/Cancel/Reschedule Trip</h1>
          <span className="card-subtitle-v5">(As a Guest User)</span>

          <form onSubmit={handleGuestSubmit}>
            <label className="guest-label-v5">
              Reference ID/Booking ID/PNR
            </label>
            <input
              type="text"
              className="guest-input-v5"
              placeholder="Reference ID/Booking ID/PNR"
              value={reffid}
              onChange={(e) => setReffid(e.target.value)}
              required
            />

            <label className="guest-label-v5">Email Address</label>
            <div
              className="password-container-v5"
              style={{ marginBottom: "20px" }}
            >
              <input
                type="email"
                className="guest-input-v5"
                style={{ marginBottom: 0 }}
                placeholder="Enter Email Address"
                value={reffemail}
                onChange={(e) => setReffemail(e.target.value)}
                required
              />
              <FaCheckSquare className="v5-green-check" />
            </div>

            <button type="submit" className="v5-submit-btn">
              SUBMIT
            </button>

            <div className="guest-info-box-v5">
              <p>
                <strong>Note:</strong> To View/Cancel/Reschedule/Change/Print
                your flight tickets, please provide your PNR and Email.
              </p>
              <p>
                <strong>Registered User:</strong> Log in using your credentials.
              </p>
              <p>
                <strong>Guest User:</strong> Access using Booking ID + Email
                validation.
              </p>
              <span className="note-disclaimer">
                If travel is within 7 days, please contact airline support
                directly for urgent changes.
              </span>
            </div>
          </form>
        </div>
      </div>

      <SignUp
        show={showSignUp}
        handleClose={() => setShowSignUp(false)}
        otpSent={false}
        setOtpSent={() => {}}
      />
    </div>
  );
};

export default Login;

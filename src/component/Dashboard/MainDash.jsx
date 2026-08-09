import React from "react";
import "./MainDash.css";
import { AiOutlineLogout } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import User from "./User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../redux/slices/login";

const MainDash = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(loggedOut());
  };
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("isAuthenticated"); // Clear the token
  //   navigate("/bookings/flight"); // Redirect to login page
  // };

  return (
    <div>
      <div className="section-space--smmm bg-neutral-900">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 col-8">
              <h1 className="d4 clr-neutral-0 mb-3"> User Booking </h1>
              <ul className="listsss list-row list-arrow align-items-center">
                <li>
                  <a
                    href="#"
                    className="link d-inline-block clr-neutral-0 :clr-tertiary-300"
                  >
                    {" "}
                    Account{" "}
                  </a>
                </li>
                <MdKeyboardArrowRight color="#fff" />
                <li>
                  <a href="#" className="link d-inline-block clr-tertiary-300">
                    {" "}
                    User Booking{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-4">
              <div className="text-md-end">
                <a
                  href="#"
                  className="link d-inline-flex align-items-center gap-2 py-3 px-6 rounded-pill bg-neutral-700 :bg-primary-300"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-outlined mat-icon clr-neutral-0">
                    {" "}
                    <AiOutlineLogout />
                  </span>
                  <span className="d-inline-block clr-neutral-0 fw-semibold">
                    {" "}
                    Logout{" "}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <User />
    </div>
  );
};

export default MainDash;

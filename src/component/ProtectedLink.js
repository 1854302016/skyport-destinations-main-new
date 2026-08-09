// src/components/ProtectedLink.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Nav } from "react-bootstrap";

const ProtectedLink = ({ to, handleShow, children, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      handleShow();
    } else {
      navigate(to);
    }
  };

  return (
    <Nav.Link as={Link} to={to} onClick={handleClick} {...rest}>
      {children}
    </Nav.Link>
  );
};

export default ProtectedLink;

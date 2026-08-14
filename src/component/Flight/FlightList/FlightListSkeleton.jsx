import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import ModernThemeLoader from "../../Loader/ModernThemeLoader";
import "./FlightListInfo.css";

const FlightListSkeleton = ({ message, subMessage }) => {
  return (
    <ModernThemeLoader message={message} subMessage={subMessage} />
  );

  /* Preserved Legacy Loader Markup:
  return (
     <div className="container_loader2" id="Loader">
      <div className="loaderpp">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ '--i': i + 1 }} />
        ))}
        <div className="paperplane"></div>
      </div>
      <div className="loadtxtfl">
        Wings up! Scanning the skies for your perfect route.
      </div>
    </div>
  );
  */
};

export default FlightListSkeleton;

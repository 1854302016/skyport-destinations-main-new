import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelTechnicalError.css';

const HotelTechnicalError = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload(); // refresh page
  };

  const handleGoBack = () => {
    navigate(-1); // go back in history
  };

  return (
    <div className="technicalErrorContainer">
      <img
        src="/Images/troubleshooting.png"
        alt="Technical Error"
        className="technicalErrorIcon"
      />
      <h2 className="technicalErrorTitle">Oops! Something went wrong.</h2>
      <p className="technicalErrorMessage">
        We're having trouble processing your request right now.  
        Please try again or come back later.
      </p>
      <div className="technicalErrorActions">
        <button onClick={handleRetry} className="technicalErrorButton">
          Retry
        </button>
        <button onClick={handleGoBack} className="technicalErrorButton secondary">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default HotelTechnicalError;

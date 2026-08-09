import React from "react";
import "./BusReviewPage.css"; // create this for styling

const BusReviewPage = ({ setReviewModal, handleConfirmClick }) => {
  return (
    <div className="busReviewPage_container">
      <div className="busReviewPage_overlayWrapper">
        <p className="busReviewPage_overlayBg" />
        <div className="busReviewPage_modalBox" style={{ width: 530 }}>
          <span
            className="busReviewPage_closeIcon"
            style={{
              backgroundImage:
                'url("https://jsak.mmtcdn.com/flights/assets/media/cross-icon.png")',
            }}
            onClick={() => setReviewModal(false)}
          />
          <h3 className="busReviewPage_heading">Review Details</h3>
          <p className="busReviewPage_note">
            Please ensure that the spelling of your name and other details match
            with your travel document/govt. ID, as these cannot be changed
            later. Errors might lead to cancellation penalties.
          </p>

          <div className="busReviewPage_scrollArea">
            {/* Sample static passengers */}
            <div className="busReviewPage_passengerCard">
              <p className="busReviewPage_sectionTitle">PASSENGER 1</p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">First &amp; Middle Name</span>
                <span className="busReviewPage_value">Mr. Rahul</span>
              </p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">Last Name</span>
                <span className="busReviewPage_value">Sharma</span>
              </p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">Gender</span>
                <span className="busReviewPage_value">Male</span>
              </p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">Age</span>
                <span className="busReviewPage_value">32</span>
              </p>
            </div>

            <div className="busReviewPage_passengerCard">
              <p className="busReviewPage_sectionTitle">PASSENGER 2</p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">First &amp; Middle Name</span>
                <span className="busReviewPage_value">Ms. Priya</span>
              </p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">Last Name</span>
                <span className="busReviewPage_value">Mehta</span>
              </p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">Gender</span>
                <span className="busReviewPage_value">Female</span>
              </p>
              <p className="busReviewPage_infoRow">
                <span className="busReviewPage_label">Age</span>
                <span className="busReviewPage_value">28</span>
              </p>
            </div>
          </div>

          <div className="busReviewPage_footer">
            <span
              className="busReviewPage_editBtn"
              onClick={() => setReviewModal(false)}
            >
              EDIT
            </span>
            <button
              onClick={handleConfirmClick}
              type="button"
              className="busReviewPage_confirmBtn"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusReviewPage;

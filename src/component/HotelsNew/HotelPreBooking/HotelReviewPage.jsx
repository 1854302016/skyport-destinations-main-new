import React from "react";
import "../../Flight/FlightDetail/ReviewPassenger.css"; 

const HotelReviewPage = ({
  setReviewModal,
  handleConfirmClick,
  childData,
  formData,
}) => {
  return (
    <div className="review_passenger_detail">
      <div className="overlayss">
        <p className="overlayBggg" />
        <div className="commonOverlay" style={{ width: 530 }}>
          <span
            className="bgProperties overlayCrossIcon icon20"
            style={{
              backgroundImage:
                'url("https://jsak.mmtcdn.com/flights/assets/media/cross-icon.png")',
            }}
            onClick={() => setReviewModal(false)}
          />
          <h3 className="fontSize24 boldFont appendBottom12">Review Details</h3>
          <p className="darkText review_page_para">
            Please ensure that the spelling of your name and other details match
            with your travel document/govt. ID, as these cannot be changed
            later. Errors might lead to cancellation penalties.
          </p>

          <div className="reviewDtlsOverlayContent customScroll">
            {formData && (
              <div>
                {formData.map((item, index) => (
                  <div key={index} className="tvlrDtlsCard">
                    <p className="makeFlex appendBottom7 title">
                      <span className="blackText blackFont">
                        ADULT {index + 1}
                      </span>
                    </p>
                    <p className="makeFlex appendBottom7">
                      <span className="tvlrLftInfo">First &amp; Middle Name</span>
                      <span className="blackText boldFont flexOne">
                        {item.Title} {item.FirstName}
                      </span>
                    </p>
                    <p className="makeFlex appendBottom7">
                      <span className="tvlrLftInfo">Last Name</span>
                      <span className="blackText boldFont flexOne">
                        {item.LastName}
                      </span>
                    </p>
                    <p className="makeFlex appendBottom7">
                      <span className="tvlrLftInfo">Gender</span>
                      <span className="blackText boldFont flexOne">
                        {item.Title === "Mr" ? "Male" : "Female"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}

            {childData && (
              <div>
                {childData.map((item, index) => (
                  <div key={index} className="tvlrDtlsCard">
                    <p className="makeFlex appendBottom7 title">
                      <span className="blackText blackFont">
                        CHILD {index + 1}
                      </span>
                    </p>
                    <p className="makeFlex appendBottom7">
                      <span className="tvlrLftInfo">First &amp; Middle Name</span>
                      <span className="blackText boldFont flexOne">
                        {item.Title} {item.FirstName}
                      </span>
                    </p>
                    <p className="makeFlex appendBottom7">
                      <span className="tvlrLftInfo">Last Name</span>
                      <span className="blackText boldFont flexOne">
                        {item.LastName}
                      </span>
                    </p>
                    <p className="makeFlex appendBottom7">
                      <span className="tvlrLftInfo">Gender</span>
                      <span className="blackText boldFont flexOne">
                        {item.Title === "Mr" ? "Male" : "Female"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="detailsPopupFooter">
            <span
              className="review_pass_editt appendRight20 linkText"
              onClick={() => setReviewModal(false)}
            >
              EDIT
            </span>
            <button
              onClick={handleConfirmClick}
              type="button"
              className="button buttonPrimary buttonBig fontSize14 review_pass_condifmr"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelReviewPage;

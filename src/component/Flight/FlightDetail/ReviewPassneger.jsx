import React from "react";
import './ReviewPassenger.css'
const ReviewPassneger = ({handleContinueClick,setOpenPayBtn,infant,openPayBtn,childData,formData,handleTicketBookMistifly,setPaymentGateway,setShowPaymentPopup, validatePassportExpiry, validatePassengerAge}) => {
  return (
    <div className="review_passenger_detail">
      <div className="overlayss">
        <p className="overlayBggg" />
        <div className="commonOverlay " style={{ width: 530 }}>
          <span
            className="bgProperties overlayCrossIcon icon20"
            style={{
              backgroundImage:
                'url("https://jsak.mmtcdn.com/flights/assets/media/cross-icon.png")',
            }}
             onClick={() => {
                      setOpenPayBtn(false);
                    }}
          />
          <h3 className="fontSize24 boldFont appendBottom12">Review Details</h3>
          <p className="darkText review_page_para">
            Please ensure that the spelling of your name and other details match
            with your travel document/govt. ID, as these cannot be changed
            later. Errors might lead to cancellation penalties.
          </p>
          <div className="reviewDtlsOverlayContent customScroll">
            {formData && (
          <div >
            {formData.map((item, index) => (
            <div className="tvlrDtlsCard">
              <p className="makeFlex appendBottom7 title">
                <span className="blackText blackFont ">ADULT {index + 1}</span>
              </p>
              <p className="makeFlex appendBottom7">
                   <span className="tvlrLftInfo">First &amp; Middle Name</span>
                <span className="blackText boldFont flexOne">{item.title} {item.firstName}</span>
              </p>
              <p className="makeFlex appendBottom7">
                <span className="tvlrLftInfo">Last Name</span>
                <span className="blackText boldFont flexOne">{item.lastName}</span>
              </p>
              <p className="makeFlex appendBottom7">
                <span className="tvlrLftInfo">Gender</span>
                <span className="blackText boldFont flexOne">{item.title === "Mr" ? "Male" : "Female"}</span>
              </p>
            </div>
             ))}
             
          </div>)}
           {childData && (
          <div >
            {childData.map((item, index) => (
            <div className="tvlrDtlsCard">
              <p className="makeFlex appendBottom7 title">
                <span className="blackText blackFont ">CHILD {index + 1}</span>
              </p>
              <p className="makeFlex appendBottom7">
               <span className="tvlrLftInfo">First &amp; Middle Name</span>
                <span className="blackText boldFont flexOne">{item.title} {item.firstName}</span>
              </p>
              <p className="makeFlex appendBottom7">
                <span className="tvlrLftInfo">Last Name</span>
                <span className="blackText boldFont flexOne">{item.lastName}</span>
              </p>
              <p className="makeFlex appendBottom7">
                <span className="tvlrLftInfo">Gender</span>
                <span className="blackText boldFont flexOne">{item.title === "Mstr" ? "Male" : "Female"}</span>
              </p>
            </div>
             ))}
             
          </div>)}
           {infant && (
          <div>
            {infant.map((item, index) => (
            <div className="tvlrDtlsCard">
              <p className="makeFlex appendBottom7 title">
                <span className="blackText blackFont ">INFANT {index + 1}</span>
              </p>
              <p className="makeFlex appendBottom7">
              <span className="tvlrLftInfo">First &amp; Middle Name</span>
                <span className="blackText boldFont flexOne">{item.title} {item.firstName}</span>
              </p>
              <p className="makeFlex appendBottom7">
                <span className="tvlrLftInfo">Last Name</span>
                <span className="blackText boldFont flexOne">{item.lastName}</span>
              </p>
              <p className="makeFlex appendBottom7">
                <span className="tvlrLftInfo">Gender</span>
                <span className="blackText boldFont flexOne">{item.title === "Mstr" ? "Male" : "Female"}</span>
              </p>
            </div>
             ))}
             
          </div>)}
          </div>
          <div className="detailsPopupFooter">
            <span className="review_pass_editt appendRight20 linkText"  onClick={() => {
                      setOpenPayBtn(false);
                    }}>
              EDIT
            </span>
            <button
            onClick={() => {
                 
              if (!validatePassportExpiry()) {
                return;
              }

              setOpenPayBtn(false);

              setTimeout(() => {
                setShowPaymentPopup(true);
              }, 200);
            }}
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

export default ReviewPassneger;

import React, { useEffect, useState } from "react";
// import "./TravellerInfoMobile.css";
const HotelReviewPageMobile = ({
  setReviewModal,
  handlePayment,
  infant,
  childData,
  formData,
  handleConfirmClick,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <div id="divPaxVerifyDtl">
        <div className="revw_opcty" />
        <div className="revw_rt_pp slideUpani">
          <div className="revw_f22">Review Details </div>
          <div className="revw_f12">
            Kindly cross-check the names &amp; other details with your essential
            travel documents. Since, the changes cannot be updated later and it
            might lead to flight cancellation penalties.
          </div>
          <div className="_scr_tvlllr">
            {formData &&
              formData.map((item, index) => (
                <div className="adcolbx ng-scope" key={index}>
                  <p className="adlttl ng-binding">Adult {index + 1}</p>
                  <div className="adlflx">
                    <div className="_scr_20">
                      <p className="adtp_nm">Title</p>
                      <p className="adbt_nm ng-binding">{item.Title} </p>
                    </div>
                    <div className="_scr_40">
                      <p className="adtp_nm">First &amp; Middle Name</p>
                      <p className="adbt_nm ng-binding">{item.FirstName}</p>
                    </div>
                    <div className="_scr_30">
                      <p className="adtp_nm">Last Name</p>
                      <p className="adbt_nm ng-binding">{item.LastName}</p>
                    </div>
                  </div>
                </div>
              ))}
            {childData &&
              childData.length > 0 &&
              childData.map((item, index) => (
                <div className="adcolbx ng-scope" key={index}>
                  <p className="adlttl ng-binding">Child {index + 1}</p>
                  <div className="adlflx">
                    <div className="_scr_20">
                      <p className="adtp_nm">Title</p>
                      <p className="adbt_nm ng-binding">{item.Title}</p>
                    </div>
                    <div className="_scr_40">
                      <p className="adtp_nm">First &amp; Middle Name</p>
                      <p className="adbt_nm ng-binding">{item.FirstName}</p>
                    </div>
                    <div className="_scr_30">
                      <p className="adtp_nm">Last Name</p>
                      <p className="adbt_nm ng-binding">{item.LastName}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="btnsect">
            <a className="conf_btn" onClick={handleConfirmClick}>
              Confirm
            </a>
            <a className="edit_btn" onClick={() => setReviewModal(false)}>
              Edit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelReviewPageMobile;

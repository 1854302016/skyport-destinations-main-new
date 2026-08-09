import React, { useState } from "react";
import "./HotelPromoCodes.css";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const HotelPromoCodes = () => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [message, setMessage] = useState("");

  const availableCoupons = [
    { code: "EMTUPI", description: "Get Rs.250 OFF on your hotel booking." },
    { code: "HDFCEMI", description: "₹1,500 Instant Discount on HDFC Credit Cards with no-cost EMI." },
    { code: "UPIGO", description: "₹760 instant discount on UPI payments." },
    { code: "TRAVELSAFE", description: "₹579 off on booking and Trip Secure." },
    { code: "GISUPER", description: "₹450 instant discount on your booking." },
  ];

  const handleApply = () => {
    const trimmedCode = promoCode.trim();
    if (trimmedCode === "") {
      setMessage("Please enter a promo code.");
      return;
    }
    setAppliedCode(trimmedCode.toUpperCase());
    setMessage("Promo code applied successfully!");
  };

  const handleRemove = () => {
    setPromoCode("");
    setAppliedCode("");
    setMessage("");
  };

  const handleSelectCoupon = (code) => {
    const trimmedCode = code.trim();
    setPromoCode(trimmedCode);
    setAppliedCode(trimmedCode);
    setMessage("Promo code applied successfully!");
  };

  return (
    <div>
      {/* ================= Desktop View ================ */}
      <div className="hotelFinalBookingPC_desktop">
        <section className="hotelFinalBookingPC_promocodeWrap">
          <div
            className="hotelFinalBookingPC_promoHeader"
            style={{
              backgroundImage:
                "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
            }}
          >
            <span className="hotelFinalBookingPC_fontSize18">
              <b>PROMO</b> CODES
            </span>
            <span className="hotelFinalBookingPC_promoIconWrapper">
              <span
                className="hotelFinalBookingPC_iconPromoImg"
                style={{
                  backgroundImage:
                    'url("https://imgak.goibibo.com/flights-gi-assets/dt/rta_assets/promo-code.png")',
                }}
              />
            </span>
          </div>

          <div className="hotelFinalBookingPC_inputSection">
            <input
              type="text"
              className="hotelFinalBookingPC_promoInput"
              placeholder="Enter promo code here"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={!!appliedCode}
            />
            {appliedCode && (
              <button
                className="hotelFinalBookingPC_btnRemove"
                onClick={handleRemove}
                title="Remove Promo Code"
              >
                <RxCross2 size={25} color="#f73030" />
              </button>
            )}
            {message && (
              <p className="hotelFinalBookingPC_msgSuccess">{message}</p>
            )}
          </div>

          <div className="hotelFinalBookingPC_couponList">
            {availableCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="hotelFinalBookingPC_promoItem"
                onClick={() => handleSelectCoupon(coupon.code)}
              >
                <div className="hotelFinalBookingPC_couponContent">
                  <span className="hotelFinalBookingPC_couponIcon">
                    {appliedCode === coupon.code ? (
                      <RiCheckboxBlankCircleFill color="#2196f3" />
                    ) : (
                      <RiCheckboxBlankCircleLine color="#2196f3" />
                    )}
                  </span>
                  <div className="hotelFinalBookingPC_couponText">
                    <span className="hotelFinalBookingPC_couponCode">
                      {coupon.code}
                    </span>
                    <span className="hotelFinalBookingPC_couponDescription">
                      {coupon.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =============== Mobile View ================ */}
      <div className="hotelFinalBookingPC_mobile">
        <div className="hotelFinalBookingPC_mobileWrapper">
          <div className="hotelFinalBookingPC_mobileHeader">
            <img src="/Images/promo-code.png" alt="Coupon Icon" width="25" />
            <div className="hotelFinalBookingPC_mobileTitle">
              Offers and Promo Codes
            </div>
            <img
              src="https://flight.easemytrip.com/M_Content/img/Icon-ionic-ios-arrow-back.svg"
              alt="back"
              style={{ marginLeft: "auto" }}
            />
          </div>

          <div className="hotelFinalBookingPC_mobileInput">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={!!appliedCode}
            />
            {appliedCode ? (
              <span className="removeText" onClick={handleRemove}>
                Remove
              </span>
            ) : (
              <span className="applyText" onClick={handleApply}>
                Apply
              </span>
            )}
          </div>

          {message && (
            <p className="hotelFinalBookingPC_msgSuccess">{message}</p>
          )}

          <div className="hotelFinalBookingPC_mobileCouponList">
            {availableCoupons.slice(0, 3).map((coupon) => (
              <label key={coupon.code} className="hotelFinalBookingPC_couponRadio">
                <div>{coupon.code}</div>
                <span>{coupon.description}</span>
                <input
                  type="radio"
                  name="coupon"
                  checked={appliedCode === coupon.code}
                  onChange={() => handleSelectCoupon(coupon.code)}
                />
                {appliedCode === coupon.code ? (
                  <RiCheckboxBlankCircleFill color="#2196f3" />
                ) : (
                  <RiCheckboxBlankCircleLine color="#2196f3" />
                )}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPromoCodes;

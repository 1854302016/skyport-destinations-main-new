import React, { useState } from "react";
import "./PromoCode.css";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ViewMorePormo from "./ViewMorePormo";

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [message, setMessage] = useState("");
  const [showAllCouponsModal, setShowAllCouponsModal] = useState(false);

  const availableCoupons = [
    { code: "SPDUPI", description: "Get $50 OFF on your flight booking." },
    {
      code: "HDFCEMI",
      description: "$5 Instant Discount on HDFC Credit Cards with no-cost EMI.",
    },
    { code: "UPIGO", description: "$60 instant discount on UPI payments." },
    { code: "TRAVELSAFE", description: "$79 off on booking and Trip Secure." },
    { code: "GISUPER", description: "$40 instant discount on your booking." },
  ];

  const handleApply = () => {
    const trimmedCode = promoCode.trim().toUpperCase();
    if (trimmedCode === "") {
      setMessage("Please enter a promo code.");
      return;
    }

    const couponExists = availableCoupons.find((c) => c.code === trimmedCode);

    if (couponExists) {
      setAppliedCode(trimmedCode);
      setMessage("Promo code applied successfully!");
    } else {
      setAppliedCode("");
      setMessage(`No promo code found for "${trimmedCode}".`);
    }
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
      <div className="appendBottom20 offer_promoContainers_desktop">
        <div>
          <section className="promocodeWrap">
            <div>
              <div
                className="promoHeader"
                style={{
                  background: "#f2bc06",
                }}
              >
                <span className="fontSize18">
                  <b>PROMO</b> CODES
                </span>
                <span className="promoIconWrapper appendLeft10">
                  <span
                    className="bgProperties iconPromoImg iconPromocode"
                    style={{
                      backgroundImage:
                        'url("https://imgak.goibibo.com/flights-gi-assets/dt/rta_assets/promo-code.png")',
                    }}
                  />
                </span>
              </div>

              <div className="appendBottom15 position-relative">
                <input
                  type="text"
                  className="promoInput"
                  placeholder="Enter promo code here"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={!!appliedCode}
                />
                {appliedCode ? (
                  <button
                    className="btn-remove-inline removew_promocode_desktop"
                    onClick={handleRemove}
                    title="Remove Promo Code"
                  >
                    <RxCross2 size={25} color="#f73030" />
                  </button>
                ) : (
                  <button
                    className="promo-apply-btn-desktop"
                    onClick={handleApply}
                    disabled={!promoCode.trim()}
                  >
                    APPLY
                  </button>
                )}
                {message && <p className="clr-sucess fnt-12 mt-2">{message}</p>}
              </div>

              <div className="appendBottom20">
                {/* {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="pointer promoContent"
                    style={{ backgroundColor: "rgb(242, 242, 242)" }}
                    onClick={() => handleSelectCoupon(coupon.code)}
                  >
                    <div className="flexOne cpn-wrapper">
                      <div className="makeFlex pointer gap-x-5 align-items-center">
                        <span className="radioWrap">
                          {appliedCode === coupon.code ? (
                            <RiCheckboxBlankCircleFill color="#2196f3" />
                          ) : (
                            <RiCheckboxBlankCircleLine color="#2196f3" />
                          )}
                        </span>
                        <div className="promoContentWrap flexOne">
                          <span className="couponCode">{coupon.code}</span>
                          <span className="promoCheckContent">
                            {coupon.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
                {/* <div
                  className="fnt-14 shof clr-blue fnt-500"
                  onClick={() => setShowAllCouponsModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  View More Coupons
                </div> */}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =============== Mobile View ================ */}
      <div className="offer_promoContainers_mobile">
        <div className="cpnbx">
          <div className="prmo_bxaht mr20">
            <div className="_tophecpn d-flex gap-20 align-items-center">
              <img
                src="/Images/promo-code.png"
                alt="Coupon Icon"
                style={{ width: "25px" }}
              />
              <div className="fnt-16 cblack fnt-600">
                Offers and Promo Codes
              </div>
              <img
                src="https://flight.easemytrip.com/M_Content/img/Icon-ionic-ios-arrow-back.svg"
                alt="right"
                style={{ marginLeft: "auto" }}
              />
            </div>

            <div className="cpn_mcoter">
              <div id="divCouponCodeApply">
                <div className="_fcpnentr d-flex justify-content-between align-items-center">
                  <input
                    className="f15"
                    id="txtCouponCode"
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={!!appliedCode}
                  />
                  {appliedCode ? (
                    <span
                      className="f13 wt600 clr-danger"
                      onClick={handleRemove}
                      style={{ cursor: "pointer" }}
                    >
                      Remove
                    </span>
                  ) : (
                    <span
                      className="f13 wt600 clr-blue"
                      onClick={handleApply}
                      style={{ cursor: "pointer" }}
                    >
                      Apply
                    </span>
                  )}
                </div>
              </div>

              {message && (
                <p className="clr-sucess fnt-12 mx-15 _msgBx">{message}</p>
              )}

              {/* <div className="cpon_chbx mt-10">
                {availableCoupons.slice(0, 3).map((coupon) => (
                  <div key={coupon.code} className="coupn_colap">
                    <label className="radio-invrto lblnewCpn">
                      <div className="d-flex align-items-center">
                        <div className="fnt-600 cpn-n d-flex align-items-center">
                          {coupon.code}
                        </div>
                      </div>
                      <span className="z-con fnt-400">{coupon.description}</span>
                      <input
                        type="radio"
                        name="cpnRadio"
                        checked={appliedCode === coupon.code}
                        onChange={() => handleSelectCoupon(coupon.code)}
                      />
                      {appliedCode === coupon.code ? (
                        <RiCheckboxBlankCircleFill className="checkmark-invrto" color="#2196f3" />
                      ) : (
                        <RiCheckboxBlankCircleLine className="checkmark-invrto" color="#2196f3" />
                      )}
                    </label>
                  </div>
                ))}
                
                <div
                  className="fnt-14 shof clr-blue fnt-500"
                  onClick={() => setShowAllCouponsModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  View More Coupons
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {showAllCouponsModal && (
        <ViewMorePormo
          handleApply={handleApply}
          handleRemove={handleRemove}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          appliedCode={appliedCode}
          handleSelectCoupon={handleSelectCoupon}
          setShowAllCouponsModal={setShowAllCouponsModal}
          availableCoupons={availableCoupons}
        />
      )}
    </div>
  );
};

export default PromoCode;

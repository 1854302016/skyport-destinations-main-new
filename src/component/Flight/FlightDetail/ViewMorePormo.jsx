import React from "react";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import "./PromoCode.css";
const ViewMorePormo = ({
  handleSelectCoupon,
  availableCoupons,
  setShowAllCouponsModal,
  appliedCode,
  handleApply,
  handleRemove,
  promoCode,
  setPromoCode,
}) => {
  return (
    <div className="mobile mobile_view_more_promo heading_flight_list_two">
      <div className="actpop fltr-pop" id="idflr" ng-show="isFilt">
        <div className="popbx ">
          <div
            className="close-btn fltPop"
            onClick={() => setShowAllCouponsModal(false)}
          >
            ✕
          </div>
          <div className="offer_promoContainers_mobile">
            <div className="cpnbx">
              <div className="prmo_bxaht mr20">
                <div className="poptitle">
                  <img
                    src="/Images/promo_code.png"
                    alt="Coupon Icon"
                  />
                  <div className="fnt-20 fnt-600">Apply Promo Code</div>
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

                  <div className="cpon_chbx mt-10">
                    {availableCoupons.map((coupon) => (
                      <div key={coupon.code} className="coupn_colap">
                        <label className="radio-invrto lblnewCpn">
                          <div className="d-flex align-items-center">
                            <div className="fnt-600 cpn-n d-flex align-items-center">
                              {coupon.code}
                            </div>
                          </div>
                          <span className="z-con fnt-400">
                            {coupon.description}
                          </span>
                          <input
                            type="radio"
                            name="cpnRadio"
                            checked={appliedCode === coupon.code}
                            onChange={() => {
                              handleSelectCoupon(coupon.code);
                              setShowAllCouponsModal(false);
                            }}
                          />
                          {appliedCode === coupon.code ? (
                            <RiCheckboxBlankCircleFill
                              className="checkmark-invrto"
                              color="#2196f3"
                            />
                          ) : (
                            <RiCheckboxBlankCircleLine
                              className="checkmark-invrto"
                              color="#2196f3"
                            />
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ViewMorePormo;

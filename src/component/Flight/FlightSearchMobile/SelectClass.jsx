import React from "react";
import "./SelectClass.css";

const SelectClass = ({ closeClassInput, setClass,selectedClass }) => {
  const handleSelectCabin = (cabinType) => {
    // Implement logic for selecting cabin
    console.log(`Selected cabin: ${cabinType}`);
    setClass(cabinType);
    closeClassInput();
  };

  const handleClose = () => {
    closeClassInput();
  };
 
  return (
    <>
      <div className="overlay_sc showBx"></div>
      <div id="selectClass" className="showBx">
        <div className="inner_wrap_bg">
          <div className="top_pnl">
            <div className="innr_header_pd">
              <div className="lft_pnl">
                <span className="sClass_ttl">Select Class</span>
              </div>
              <span className="close_class" onClick={handleClose}>
                ×
              </span>
             
            </div>
          </div>

          <div className="innr_pd10">
              {/* <label className="radio_sclass">
              All
              <input
                type="radio"
                name="radio"
                id="d0-Economy"
                onChange={() => handleSelectCabin(1)}
                defaultChecked
              />
              <span className="checkmark_sclass"></span>
            </label> */}
            <label className="radio_sclass">
              Economy
              <input
                type="radio"
                name="radio"
                id="d0-Economy"
                onChange={() => handleSelectCabin(2)}
                checked={selectedClass === 2}
              />
              <span className="checkmark_sclass"></span>
            </label>
            <label className="radio_sclass">
              Premium Economy
              <input
                type="radio"
                name="radio"
                id="d4-Prem.Economy"
                onChange={() => handleSelectCabin(3)}
                 checked={selectedClass === 3}
              />
              <span className="checkmark_sclass"></span>
            </label>
            <label className="radio_sclass">
              Business
              <input
                type="radio"
                name="radio"
                id="d2-Business"
                onChange={() => handleSelectCabin(4)}
                      checked={selectedClass === 4}
              />
              <span className="checkmark_sclass"></span>
            </label>
            <label className="radio_sclass">
              Premium Business
              <input
                type="radio"
                name="radio"
                id="d2-Business"
                onChange={() => handleSelectCabin(5)}
                      checked={selectedClass === 5}
              />
              <span className="checkmark_sclass"></span>
            </label>
            <label className="radio_sclass" style={{ display: "block" }}>
              First Class
              <input
                type="radio"
                name="radio"
                id="d1-First"
                onChange={() => handleSelectCabin(6)}
                      checked={selectedClass === 6}
              />
              <span className="checkmark_sclass"></span>
            </label>

            <button className="Btnclass_v2" onClick={handleClose} style={{border:'none'}}>
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectClass;

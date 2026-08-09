import React, { useState } from 'react';

const Meals = ({
  allFacilities,
  selectedFacilities,
  setSelectedFacilities,
  closeFilter,
  handleToggle,
}) => {
  const [visibleCount, setVisibleCount] = useState(10); // Initial number of facilities to show

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10); // Show 10 more each time
  };

  return (
    <div className="mobile heading_flight_list_two heading_flight_list_three heading_flight_list_four">
      <div className="actpop dur-pop" id="idsrt1">
        <div className="popbx ">
          <div className="close-btn fltPop" onClick={closeFilter}>
            ✕
          </div>
          <div className="ovf-sc">
            <div className="flter">
              <div className=" d-flex justify-content-between align-items-center">
                <div className="fltr-title">Filter</div>
                {/* <small>Reset</small> */}
              </div>
              <div className="pd-bx">
                <div className="pd-title">Facilities</div>
                <fieldset>
                  {allFacilities.slice(0, visibleCount).map((f) => {
                    const isSelected = selectedFacilities.includes(f);

                    return (
                      <div
                        key={f}
                        className="DestinationDetailMailFilterInput"
                        onClick={() =>
                          handleToggle(f, selectedFacilities, setSelectedFacilities)
                        }
                        style={{
                          cursor: 'pointer',
                          background: isSelected ? '#1d489f' : '#fff',
                        }}
                      >
                        <label>
                          <span
                            style={{
                              color: isSelected ? '#fff' : '#000',
                              marginRight: '5px',
                              marginTop: '-5px',
                              display: 'inline-flex',
                              alignItems: 'center',
                            }}
                          >
                            {f}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </fieldset>

                {/* Show More Button */}
                {visibleCount < allFacilities.length && (
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-link"
                      onClick={handleShowMore}
                      style={{ textDecoration: 'underline', color: '#1d489f', cursor: 'pointer' }}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </div>

              <div className="apl-btn" onClick={closeFilter}>
                <a className="slt-st goTopBtn">Apply</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meals;

import React, { useState } from 'react';

const Location = ({
  allLocations,
  selectedLocations,
  setSelectedLocations,
  closeFilter,
  handleToggle,
}) => {
  const [visibleCount, setVisibleCount] = useState(10); // Initial number of locations to show

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
              </div>
              <div className="pd-bx">
                <div className="pd-title">Location</div>
                <fieldset>
                  {allLocations.slice(0, visibleCount).map((l) => {
                    const isSelected = selectedLocations.includes(l);

                    return (
                      <div
                        key={l}
                        className="DestinationDetailMailFilterInput"
                        onClick={() =>
                          handleToggle(l, selectedLocations, setSelectedLocations)
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
                            {l}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </fieldset>

                {/* Show More Button */}
                {visibleCount < allLocations.length && (
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

export default Location;

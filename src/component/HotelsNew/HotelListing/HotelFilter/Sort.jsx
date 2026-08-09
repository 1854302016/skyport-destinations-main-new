import React from 'react';

const Sort = ({
  sortOption,
  setSortOption,
  closeFilter,

}) => {
  return (
    <div className="mobile heading_flight_list_two heading_flight_list_three heading_flight_list_four">
    
        <div className="actpop sort-pop" id="idsrt">
          <div className="popbx">
            <div className="close-btn fltPop" onClick={closeFilter}>
              ✕
            </div>
            <div className="ovf-sc">
              <div className="flter">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fltr-title">Sort By</div>
                  {/* <small onClick={resetAllFilters} style={{ cursor: 'pointer' }}>Reset</small> */}
                </div>

                <div className="pd-bx">
                  <div className="d-flex justify-content-between gap-10">
                    
                    {/* Low to High */}
                    <div
                      className={`bx-1 ${sortOption === 'Low to High' ? 'clckd' : ''}`}
                      id="divsrtlh"
                      onClick={() => setSortOption('Low to High')}
                      style={{ cursor: 'pointer' }}
                    >
                      Price
                      <img
                        src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/low-hirgh.svg"
                        alt="Low to High"
                      />
                      <span className="srtbl">Low to High</span>
                    </div>

                    {/* High to Low */}
                    <div
                      className={`bx-1 ${sortOption === 'High to Low' ? 'clckd' : ''}`}
                      id="divsrthl"
                      onClick={() => setSortOption('High to Low')}
                      style={{ cursor: 'pointer' }}
                    >
                      Price
                      <img
                        src="https://www.easemytrip.com/holidays/Content/customize/mob/newimg/hight-low.svg"
                        alt="High to Low"
                      />
                      <span className="srtbl">High to Low</span>
                    </div>

                  </div>
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

export default Sort;

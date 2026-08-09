import React from 'react';


const Dummy = () => {
  return (
    <div className="container_loader2" id="Loader">
      {/* <div className="loader2"> <img src="/Content/img/loading-ban.gif" alt="loading" /> </div> */}
      <div className="loaderpp">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ '--i': i + 1 }} />
        ))}
        <div className="paperplane"></div>
      </div>
      <div className="loadtxtfl">
        Just a moment, we are searching for the flights on this route.
      </div>
    </div>
  );
};

export default Dummy;

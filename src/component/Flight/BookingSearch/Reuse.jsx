import React from "react";
import "./Reuse.css";

const Reuse = ({ url, nam }) => {
  return (
    <div className="silk-container">
      <div>
        <img src={url} alt="" className="silk-image" />
      </div>
      <div className="silk-name">{nam}</div>
    </div>
  );
};

export default Reuse;

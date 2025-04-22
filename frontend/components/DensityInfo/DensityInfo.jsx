import React from "react";
import "./densityInfo.css"; 

function DensityInfo({ densityLevel, levelMessage }) {
  return (
    <div className="density-info-container">
      <div className="density-info">
        <p className="density-text">{densityLevel}</p>
        <h2>Teenager density level</h2>
      </div>
      <p className="level-message">{levelMessage}</p>
    </div>
  );
}

export default DensityInfo;

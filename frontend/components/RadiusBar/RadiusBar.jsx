import { useState, useEffect } from "react";
import "./radiusBar.css"; 
function RadiusBar({ defaultRadius, onChangeRadius }) {
  const [radius, setRadius] = useState(defaultRadius);

  useEffect(() => {
    setRadius(defaultRadius);
  }, [defaultRadius]);

  const handleSliderChange = (e) => {
    const newRadius = parseInt(e.target.value);
    setRadius(newRadius);
  };

  const handleSliderRelease = () => {
    onChangeRadius(radius); 
  };

  return (
    <section className="radius-container">
      <h2 className="radius-display">Radius: {radius} km</h2>
      <input
      className="radius-slider"
      aria-label="Radius slider"
        type="range"
        min="1"
        max="50"
        value={radius}
        onChange={handleSliderChange}
        onMouseUp={handleSliderRelease}
        onTouchEnd={handleSliderRelease}
      />
    </section>
  );
}

export default RadiusBar;

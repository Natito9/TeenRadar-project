import { useState, useEffect } from "react";

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
    <div>
      <p>Radius: {radius} km</p>
      <input
        type="range"
        min="1"
        max="50"
        value={radius}
        onChange={handleSliderChange}
        onMouseUp={handleSliderRelease}
        onTouchEnd={handleSliderRelease}
      />
    </div>
  );
}

export default RadiusBar;

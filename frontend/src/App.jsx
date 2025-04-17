import './App.css';
import { useEffect, useState } from "react";
import useUserLocation from '../hooks/getUserLocation.js';
import RadiusBar from '../components/RadiusBar.jsx';
import { updateRadius } from './api/updateRadius.js';
import { scanLocation } from './api/scanLocation.js';
import { getRadius } from './api/getRadius.js';
import ScanButton from '../components/ScanButton.jsx';



function App() {
  const [buttonText, setButtonText] = useState("Scan area");
  const { location, error } = useUserLocation();
  const [showSchools, setShowSchools] = useState(false);
  const [nearbySchools, setNearbySchools] = useState([]);
  const [densityLevel, setDesnsityLevel] = useState(0);
  const [levelMessage, setLevelMessage] = useState("");
  const [radius, setRadius] = useState(1);

  useEffect(() => {
    const fetchRadius = async () => {
      try {
        const data = await getRadius();
        setRadius(data.radius);
        console.log("Initial radius:", data.radius);
      } catch (err) {
        console.error("Error fetching radius:", err.message);
      }
    };

    fetchRadius();
  }, []);

  const handleRadiusChange = async (newRadius) => {
    if (typeof newRadius !== 'number' || isNaN(newRadius) || newRadius < 1 || newRadius > 50) {
      console.warn("Invalid radius input");
      return;
    }
  
    setRadius(newRadius);
  
    try {
      const data = await updateRadius(newRadius);
      console.log("Radius updated:", data);
    } catch (err) {
      console.error(err.message);
    }
  };
  

  const handleClick = async () => {
    setShowSchools(false);
    setButtonText("Scanning...");
  
    window.gtag("event", "button_click", {
      text: buttonText,
    });
  
    try {
      if (location) {
        const data = await scanLocation(location);
        console.log(data);
  
        setNearbySchools(data.schoolNames);
        setDesnsityLevel(data.densityLevel);
        setLevelMessage(data.levelMessage);
      } else {
        console.warn("Location not available yet.");
      }
    } catch (err) {
      console.error("Error during scan:", err);
    }
  
    setTimeout(() => {
      setButtonText("Scan area");
      setShowSchools(true);
    }, 1000);
  };

  return (
    <>
      <h1>Teen Radar</h1>
      <p>Ever wonder what are your chances of meeting a teenager? Now you can!</p>
      <RadiusBar defaultRadius={radius} onChangeRadius={handleRadiusChange} />
      <ScanButton onScan={handleClick} />

      {showSchools && (
        <div>
          {location ? (
            <>
              <h2>Teenager density Level: {densityLevel}</h2>
              <p>{levelMessage}</p>
              <section aria-labelledby="school-list">
              <h3>Nearby Schools: {nearbySchools.length}</h3>
              <ul>
                {nearbySchools.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
              </section>
            </>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>Loading location...</p>
          )}
        </div>
      )}
    </>
  );
}

export default App;

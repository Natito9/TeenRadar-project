import "./scanbutton.css"; 
import { useState } from "react";

function ScanButton({ onScan, disabled = false }) {
  const [buttonText, setButtonText] = useState("Scan area");

  const handleClick = async () => {
    setButtonText("Scanning...");
    await onScan(); 
    setTimeout(() => setButtonText("Scan area"), 1000);
  };

  return (
    <button
    title="Click to scan nearby schools"
      onClick={handleClick}
      aria-label="Scan for nearby schools"
      disabled={disabled}
       className="scan-button"
    >
      {buttonText}
    </button>
  );
}

export default ScanButton;
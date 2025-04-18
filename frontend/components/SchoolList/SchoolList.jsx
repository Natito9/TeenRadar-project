import React, { useState } from 'react';
import './SchoolList.css';

function SchoolList({ schools }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section aria-labelledby="school-list" className="school-list">
      <button
         className={`toggle-button-schools ${isOpen ? "open" : ""}`}
        onClick={toggleList}
        aria-expanded={isOpen}
        aria-controls="school-list-content"
      >
        {isOpen ? "Hide" : "Show"} Nearby Schools ({schools.length})
      </button>

      {isOpen && (
        <ul id="school-list-content">
          {schools.map((name, idx) => (
            <li key={idx}>{name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SchoolList;

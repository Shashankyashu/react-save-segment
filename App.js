import React, { useState } from "react";
import SegmentPopup from "./SegmentPopup";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveSegmentClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <button
        style={{
          backgroundColor: "#008080",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleSaveSegmentClick}
      >
        Save segment
      </button>

      {showPopup && <SegmentPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default App;

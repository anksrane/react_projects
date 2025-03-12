import React, { useState, useEffect, useContext } from "react";
import {WorkContext} from '../context/WorkContext';

const ImageDisplay = () => {
  const {selectedWork}=useContext(WorkContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false); // Immediately reset loaded

    const timeout = setTimeout(() => {
      setLoaded(true); // Delay the fade-in effect
    }, 300); // Adjust delay in milliseconds (300ms = 0.3s)

    return () => clearTimeout(timeout); // Cleanup timeout on unmount/change
  }, [selectedWork]);

  return (
    <div className="image-container">
      <img
        src={selectedWork.src}
        alt="Selected Work"
        className={`img-fluid ${loaded ? "fade-in" : ""}`}
      />
    </div>
  );
};

export default ImageDisplay;
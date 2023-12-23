import React from "react";

const colors = ["green", "blue", "red", "orange", "purple"];
const availabilityColors = ["#ccc", "rgb(236, 194, 56)"];

const Tag = ({ initial, id, available = false }) => {
  const availableColor = available ? availabilityColors[1] : availabilityColors[0];

  return (
    <div className="w-4 h-4 rounded-full bg-center inline-flex items-center justify-center text-white text-smaller relative"  style={{ backgroundColor: colors[id % 5] }}>
      <span style={{fontSize:"0.5em", fontWeight:"400"}}>{initial}</span>
      <div
        className="w-1.5 h-1.5 rounded-full border-1 border-white absolute bottom-0 right-0"
        style={{ backgroundColor: availableColor }}
      ></div>
    </div>
  );
};

export default Tag;

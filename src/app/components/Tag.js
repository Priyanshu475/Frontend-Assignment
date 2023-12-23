import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

const Tag = ({ text }) => {
  return (
    <div className="Tag border border-solid border-gray-300 p-1 inline-flex items-center gap-2 text-gray-500 text-xs">
      <CircleIcon style={{ fontSize: "small" }} />
      <span>{text}</span>
    </div>
  );
};

export default Tag;

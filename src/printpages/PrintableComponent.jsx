import React from "react";
import "./PrintableComponent.css"; // Import CSS for styling

const PrintableComponent = ({ children }) => {
  return <div className="printable">{children}</div>;
};

export default PrintableComponent;

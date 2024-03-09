import React from "react";
import ComponentToPrint from "./ComponentToPrint";
import { useNavigate } from "react-router-dom";

const FinalPrint = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    window.print();
    navigate("/finalbill");
  }, 1000);
  return (
    <div>
      <ComponentToPrint />
    </div>
  );
};

export default FinalPrint;

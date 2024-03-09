import React from "react";
import PrintableComponent from "./PrintableComponent";
import BillData from "../components/BillData";

const ComponentToPrint = () => {
  return (
    <PrintableComponent>
      <BillData />
    </PrintableComponent>
  );
};

export default ComponentToPrint;

import React from "react";
import DotLoader from "react-spinners/DotLoader";
import BounceLoader from "react-spinners/BounceLoader";
import ProtectedRoutes from "./ProtectedRoutes";

const Spinner = () => {
  return (
    <div className="" style={{ marginTop: "25%", marginLeft: "50%" }}>
      <DotLoader color="#36d7b7" />
    </div>
  );
};

export const Boundloder = () => {
  return (
    <ProtectedRoutes>
      <div style={{ marginTop: "25%", marginLeft: "50%" }}>
        <BounceLoader color="#8000ff" />
      </div>
    </ProtectedRoutes>
  );
};
export default Spinner;

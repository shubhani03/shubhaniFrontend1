import React from "react";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#00ffff",
      }}
    >
      <h3 style={{ fontFamily: "brush script mt", fontSize: "3rem" }}>
        Subhani hardware & plumber
      </h3>
      <h5 style={{ fontFamily: "georgia" }}> Sobhan Darbhanga </h5>
    </div>
  );
};

export default Header;

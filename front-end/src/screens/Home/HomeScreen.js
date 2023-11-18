import React from "react";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  return (
    <>
      <div style={{ textAlign: "center", margin: "0 auto", padding: "100px" }}>
        <h1> Welcome Screen Here</h1>
        <Link to={"/visitorLogin"}>
          <button
            style={{
              borderRadius: "6px",
              background: "#4F4F4F",
              color: "white",
              boxShadow:
                "0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06)",
            }}
          >
            Schedule a Meeting
          </button>
        </Link>
      </div>
    </>
  );
};

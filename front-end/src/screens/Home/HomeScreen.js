import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
export const HomeScreen = () => {
  return (
    <>
      <div style={{ textAlign: "center", margin: "0 auto", padding: "100px" }}>
        <h1> Welcome Screen Here</h1>
        <br></br>
        <Link to={"/visitorLogin"}>
          <Button
            style={{
              borderRadius: "6px",
              background: "black",
              color: "white",
              boxShadow:
                "0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06)",
            }}
          >
            Schedule a Meeting
          </Button>
        </Link>
      </div>
    </>
  );
};

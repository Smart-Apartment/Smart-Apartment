import React, { Component,useState,useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import logo from '../Header/logo3.png'
const useStyles = makeStyles((theme) => ({
    loader: {
        border: "1px solid white",
        width: "240px",
        height: "10px",
        borderRadius: "3px",
      },
      loading: {
        borderRadius: "3px",
        height: "100%",
        width: "40px",
        backgroundColor: "rgba(255,255,255,0.7)",
        animation: "$load 1.5s infinite",
        animationTimingFunction: "linear",
      },
      image: {
        filter: "brightness(1.5) hue-rotate(30deg)",
      },
      text: {
        fontSize: "2rem",
        color: "white",
        fontWeight: "700",
      },
      parent: {
        backgroundColor: "#000",
        width: "30%",
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      "@keyframes load": {
        "0%": {
          transform: "translateX(0)",
        },
        "10%": {
          transform: "translateX(40px)",
        },
        "20%": {
          transform: "translateX(80px)",
        },
        "30%": {
          transform: "translateX(120px)",
        },
        "40%": {
          transform: "translateX(160px)",
        },
        "50%": {
          transform: "translateX(200px)",
        },
      },
      loadingParent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "black",
      },
}));

const Loading=({load})=> {
    const classes  = useStyles();
   
  
    return (
    load && (
      <div className={classes.loadingParent}>
      <div className={classes.logo}>
        <img className={classes.image} src={logo} alt="logo" />
        <p className={classes.text}>Smart Apartment</p>
      </div>
      <div className={classes.parent}>
        <div className={classes.loader}>
          <div className={classes.loading}></div>
        </div>
      </div>
      </div>)
    );
  }


export default Loading;

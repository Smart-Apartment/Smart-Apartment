const styles = {
  loader: {
    border: "1px solid white",
    width: "100%",
    height: "10px",
    borderRadius: "3px",
  },
  loading: {
    borderRadius: "3px",
    height: "100%",
    width: "20%",
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
      transform: "translateX(0%)",
    },
    "10%": {
      transform: "translateX(100%)",
    },
    "20%": {
      transform: "translateX(200%)",
    },
    "30%": {
      transform: "translateX(300%)",
    },
    "40%": {
      transform: "translateX(400%)",
    },
  },
  loadingParent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
  },
};

export default styles;

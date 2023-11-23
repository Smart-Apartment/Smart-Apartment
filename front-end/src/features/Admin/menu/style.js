const style = {
  logo: {
    height: "7%",
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "800",
    fontSize: "1.2rem",
    margin: "20px 0",
  },
  logoimg: {
    height: "30px",
    width: "30px",
  },
  menu: {
    width: "20%",
    height: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.7)",
    "@media(max-width:1100px)": {
      width: "30%",
    },
    "@media(max-width:800px)": {
      width: "40%",
    },
    "@media(max-width:700px)": {
      position: "absolute",
      width: "80%",
      backgroundColor: "#000",
      zIndex: "100",
    },
  },
  menuItems: {
    display: "flex",
    padding: "15px",
    alignItems: "center",
    height: "5%",
    fontWeight: "600",
    borderRadius: "10px",
    justifyContent: "space-between",
    width: "90%",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.5)",
      color: "rgba(0,0,0,0.8)",
    },
  },
  menuLogo: {
    position: "absolute",
    fontSize: "1.4rem",
    backgroundColor: "#000",
    color: "orange",
    height: "30px",
    width: "100%",
    display: "flex",
    paddingLeft: "30px",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  active: {
    color: "orange",
  },
};

export default style;

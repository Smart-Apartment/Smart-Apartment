const styles = {
  parent: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(90,90,90)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "1.8rem",
    fontWeight: "800",
  },
  span: {
    color: "white",
  },
  adminLogo: {
    color: "white",
    fontSize: "3rem",
  },
  login: {
    borderRadius: "20px",
    height: "65%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0)",
    gap: "3%",
    "@media(max-width:800px)": {
      width: "90%",
    },
    "@media(max-height:500px)": {
      height: "90%",
    },
  },
  merge: {
    display: "flex",
    justifyContent: "center",
    height: "9%",
    flexShrink: 0,
    width: "80%",
    "@media(max-width:800px)": {
      width: "80%",
      borderRadius: "5px",
    },
    "@media(max-height:600px)": {
      height: "12%",
    },
  },
  label: {
    backgroundColor: "rgba(250,250,250,0.6)",
    height: "100%",
    fontWeight: "800",
    textAlign: "right",
    fontFamily: "Georgia, serif",
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 20px",
    fontSize: "0.9rem",
    borderRadius: "10px 0 0 10px",
    "@media(max-width:800px)": {
      display: "none",
      borderRadius: "5px 0 0 5px",
    },
  },
  input: {
    padding: "5px 10px",
    width: "60%",
    flexShrink: 0,
    backgroundColor: "rgba(250,250,250,0.9)",
    border: "none",
    "@media(max-width:800px)": {
      width: "80%",
      borderRadius: "10px 0 0 10px",
    },
  },
  viewValue: {
    height: "100%",
    width: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "0 10px 10px 0",
  },
  button: {
    height: "8%",
    width: "35%",
    color: "black",
    backgroundColor: "white",
    display: "flex",
    fontSize: "1rem",
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.5)",
      color: "black",
    },
  },
};

export default styles;

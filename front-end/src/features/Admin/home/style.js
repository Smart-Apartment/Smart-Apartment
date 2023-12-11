const style = {
  parent: {
    width: "100%",
    overflow: "hidden",
    height: "90%",
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.7)",
    userSelect: "none",
  },
  adminParent: {
    width: "100%",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.7)",
    userSelect: "none",
    "@media(max-width:700px)": {
      flexDirection: "column",
      gap: "1%",
    },
  },
  smallDashParent: {
    width: "40%",
    marginTop: "1.6%",
    height: "47%",
    paddingBottom: "10px",
    overflow: "hidden",
    display: "flex",
    borderRadius: "10px",
    flexShrink: 0,
    flexDirection: "column",
    alignItems: "center",
    "@media(max-width:800px)": {
      gap: "10px",
      height: "50%",
      alignItems: "flex-start",
      width: "95%",
    },
  },
  dashboard: {
    overflowY: "auto",
    overflowX: "hidden",
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    "@media(max-width:800px)": {
      width: "60%",
      justifyContent: "center",
    },
    "@media(max-width:700px)": {
      width: "100%",
    },
    "&::-webkit-scrollbar": {
      backgroundColor: "rgba(0,0,0,0.7)",
      borderRadius: "10px",
      padding: "5px",
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "10px",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    "&::-webkit-scrollbar-thumb": {
      margin: "0 2px",
      backgroundColor: "ORANGE",
      borderRadius: "10px",
    },
  },
  mediumDash: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "2%",
    width: "50%",
    justifyContent: "space-evenly",
    height: "47%",
    borderRadius: "10px",
    backgroundColor: "#000",
    "@media(max-width:800px)": {
      width: "95%",
      height: "40%",
      alignItems: "center",
      flexWrap: "nowrap",
    },
  },
  complaintsdiv: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "97%",
    flexWrap: "nowrap",
    flexDirection: "column",
    height: "80%",
  },
  compcount: {
    backgroundColor: "#808080",
    padding: "5%",
    width: "100%",
    height: "30%",
    gap: "2%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "orange",
    fontWeight: "800",
    borderRadius: "10px",
    "@media(max-width:800px)": {
      width: "95%",
    },
  },
  whiteText: {
    color: "white",
  },
  small: {
    fontSize: getComputedStyle(document.documentElement).getPropertyValue(
      "--fs-med"
    ),
    width: "fit-content",
    fontWeight: "800",
  },
  medium: {
    fontSize: getComputedStyle(document.documentElement).getPropertyValue(
      "--fs-med"
    ),
    width: "fit-content",
    fontWeight: "600",
  },
  smallDash: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 4%",
    color: "white",
    width: "100%",
    flexShrink: 0,
    borderRadius: "10px !important",
    height: "35%",
    backgroundColor: "#000",
    "@media(max-width:800px)": {
      height: "30%",
    },
  },
  smallDashcomp: {
    flexWrap: "nowrap",
    padding: "4%",
    height: "75%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px ",
    width: "100%",
    justifyContent: "space-evenly",
    "@media(max-width:800px)": {
      height: "70%",
      alignItems: "flex-start",
    },
  },
  countText: {
    fontSize: getComputedStyle(document.documentElement).getPropertyValue(
      "--fs-med"
    ),
    color: "white",
    width: "100%",
  },
  count: {
    color: "orange",
    fontSize: getComputedStyle(document.documentElement).getPropertyValue(
      "--fs-lrg"
    ),
    fontWeight: 800,
  },
  span: {
    display: "block",
    fontWeight: 500,
    color: "#fff",
  },
  largeDash: {
    marginTop: "20px",
    width: "96%",
    padding: "20px",
    gap: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    height: "46%",
    borderRadius: "10px",
    backgroundColor: "#000",
  },
  graph: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "&::-webkit-scrollbar": {
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: "10px",
      padding: "5px",
      height: "10px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "10px",
      backgroundColor: "rgba(255,255,255)",
    },
    "&::-webkit-scrollbar-thumb": {
      margin: "0 2px",
      height: "5px",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    "media(max-width:800px)": {
      height: "50%",
    },
  },
  visible: {
    display: "contents",
  },
  hide: {
    display: "none",
  },
};

export default style;

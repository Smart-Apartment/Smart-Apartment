const style = {
  complaints: {
    width: "80%",
    "@media(max-width:700px)": {
      width: "100%",
      marginTop: "30px",
    },
  },
  nav: {
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    padding: "15px",
    zIndex: "99",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
  userText: {
    padding: "5px",
    color: "#fff",
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchLogo: {
    height: "30px",
    backgroundColor: "white",
    color: "rgba(0,0,0,0.5)",
    marginRight: 0,
    display: "flex",
    fontSize: "10px",
    paddingLeft: "10px",
    borderRadius: "10px 0 0 10px",
    alignItems: "center",
  },
  input: {
    marginLeft: "white",
    height: "30px",
    border: "none",
    borderRadius: "0 10px 10px 0",
    "&::placeholder": {
      paddingLeft: "5px",
    },
  },
};

export default style;

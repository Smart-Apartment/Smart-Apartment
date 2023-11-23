const style = {
  users: {
    height: "100%",
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
  searchBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  userText: {
    padding: "5px",
    color: "#fff",
  },
  columns: {
    height: "40px",
    padding: "30px",
    color: "white",
    backgroundColor: "#000",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  columnValues: {
    width: "100%",
  },
  row: {
    fontSize: "1vw",
    width: "14%",
    marginTop: "10px",
    padding: "10px 0",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(250,0,50,0.6)",
    width: "85%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "25px",
    fontSize: "15px",
    color: "white",
    padding: "5px",
  },
  tables: {
    width: "98%",
    overflow: "hidden",
    borderRadius: "15px",
    margin: "1% 1%",
  },
  span: {
    fontSize: "1vw",
    "@media(max-width:700px)": {
      display: "none",
    },
  },
};

export default style;

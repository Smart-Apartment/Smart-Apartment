const style = {
  users: {
    height: "100%",
    width: "80%",
    "@media(max-width:700px)": {
      width: "100%",
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
  viewServiceProviders: {
    height: "90%",
    width: "90%",
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
    paddingTop: "10px",
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "#000",
    borderRadius: "10px",
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
  complaintsColumn: {
    backgroundColor: "black",
    color: "#fff",
    width: "70%  ",
    flexShrink: 0,
    height: "200px",
    borderRadius: "10px",
    padding: "15px",
  },
  complaints: {
    marginTop: "10px",
    overflowY: "auto",
    height: "90%",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "10px",
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
    padding: "30px 10px",
    color: "white",
    gap: "20px",
    backgroundColor: "#000",
    justifyContent: "space-evenly",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  columnValues: {
    width: "100%",
  },
  complaintsRow: {
    borderRadius: "10px",
  },
  row: {
    fontSize: "1vw",
    width: "12%",
    wordWrap: "break-word",
    marginTop: "10px",
    padding: "10px 0",
  },
  button: {
    backgroundColor: "rgba(250,0,50,0.6)",
    width: "25%",
    minWidth: "30px",
    display: "flex",
    justifyContent: "center",
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

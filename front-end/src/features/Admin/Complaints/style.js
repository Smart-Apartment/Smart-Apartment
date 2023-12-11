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
  complaintstable: {
    width: "100%",
    overflowY: "auto",
    display: "flex",
    margin: "10px",
    gap: "10px",
    flexWrap: "wrap",
  },
  complaintName: {
    //  color: "orange",
    fontSize: "1.2rem",
    fontWeight: "800",
  },
  columnDate: {
    fontSize: "1vw",
    fontWeight: "600",
  },
  complaintsColumn: {
    width: "48%",
    position: "relative",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    gap: "10px",
    "@media(max-width:1100px)": {
      width: "97%",
    },
  },
  button: {
    position: "absolute",
    right: "20px",
    top: "20px",
    minWidth: "25px",
    backgroundColor: "rgba(250,0,50,0.6)",
    color: "white",
    height: "30px",
    display: "flex",
    alignItems: "center",
    fontSize: "1vw",
  },
  span: {
    marginLeft: "4%",
    textAlign: "justify",
    color: "orange",
  },
};

export default style;

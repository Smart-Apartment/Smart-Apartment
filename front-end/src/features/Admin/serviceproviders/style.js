const styles = {
  parent: {
    width: "80%",
    height: "100%",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media(max-width:700px)": {
      width: "100%",
      marginTop: "12%",
    },
  },
  enabled: {
    backgroundColor: "rgba(0,130,0) !important",
    textDecoration: "none",
  },
  disabled: {
    textDecoration: "line-through",
    backgroundColor: "rgba(190,0,0) !important",
  },
  merge: {
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "50vw",
    borderRadius: "10px",
    color: "black",
    "@media(max-width:700px)": {
      width: "96%",
      flexDirection: "column",
    },
  },
  roles: {
    height: "50%",
    display: "flex",
    padding: "10px",
    overflow: "auto",
    width: "100%",
    "@media(max-width:700px)": {
      width: "96%",
    },
    backgroundColor: "white",
  },
  muiSelect: {
    backgroundColor: "white",
  },
  roleBox: {
    flexShrink: 0,
    fontSize: "0.7rem",
    height: "96%",
    width: "fit-content",
    display: "flex",
    fontWeight: "800",
    alignItems: "center",
    gap: "1%",
    backgroundColor: "black",
    borderRadius: "10px",
    padding: "5px 10px",
    color: "white",
  },
  Securityinput: {
    width: "39%",
    height: "70%",
    padding: "15px",
    border: "2px solid black",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: "7px",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },
  options: {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    width: "50%",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    height: "6%",
    "@media(max-width:700px)": {
      width: "96%",
    },
  },
  option: {
    color: "white",
  },
  active: {
    color: "orange",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  select: {
    color: "black",
    width: "100%",
    height: "40%",
    border: "1px solid #000",
    borderRadius: "10px 10px 0 0",
    padding: "0 10px",
    backgroundColor: "#fff",
    "&:focus": {
      outline: "orange",
      border: "2px solid orange",
    },
    "@media(max-width:700px)": {
      width: "96%",
    },
  },
  form: {
    overflowY: "auto",
    backgroundColor: "#000",
    width: "98%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 20px",
    gap: "10px",
    height: "90%",
    borderRadius: "10px",
  },
  input: {
    width: "50vw",
    flexShrink: 0,
    height: "42px",
    border: "1px solid #000",
    borderRadius: "10px",
    color: "black",
    padding: "0 10px",
    backgroundColor: "#fff",
    "&:focus": {
      outline: "orange",
      border: "2px solid orange",
    },
    "@media(max-width:700px)": {
      width: "96%",
    },
  },
  head: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "700",
  },
  imageInput: {
    width: "50%",
    backgroundColor: "black",
    height: "90%",
    color: "white",
    gap: "10px",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    justifyContent: "center",
  },
  preview: {
    width: "100px",
    height: "100px",
  },
  imageUpload: {
    flexShrink: 0,
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "120px",
    backgroundColor: "#fff",
  },
  upload: {
    fontSize: "2rem",
  },
  button: {
    color: "white",
    height: "35px",
    width: "100px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,180,0,0.5)",
  },
};

export default styles;
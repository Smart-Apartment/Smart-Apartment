const styles = {
  Topparent: {
    height: "100%",
    width: "80%",
    "@media(max-width:700px)": {
      width: "100%",
      // marginTop: (active) => {
      //   return active !== 1 ? "12%" : 0;
      // },
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  quaterlyForm: {
    fontSize: "90%",
    padding: "20px",
    height: "100%",
    width: "65%",
    flexShrink: 0,
    borderRadius: "20px",
  },
  parent: {
    width: "95%",
    height: "90%",
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    color: "#fff",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "black",
    overflowY: "auto",
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
  formParent: {
    height: "90%",
    width: "97%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    borderRadius: "10px",
    backgroundColor: "black",
    width: "10%",
    color: "orange",
    fontWeight: "700",
    height: "25%",
    "@media(max-width:1000px)": {
      width: "30%",
    },
    "@media(max-width:600px)": {
      width: "50%",
    },
    "@media(max-width:1300px)": {
      width: "31%",
    },
  },
  form: {
    width: "95%",
    height: "94%",
    backgroundColor: "black",
    borderRadius: "15px ",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    width: "50%",
    padding: "10px 20px",
    height: "100%",
    borderRadius: "0 10px 10px 0",
    fontSize: "20px",
    fontWeight: "700",
    border: "none",
    "&::-webkit-outer-spin-button": {
      display: "none",
    },
    "&::-webkit-inner-spin-button": {
      display: "none",
    },
    "&:focus": {
      backgroundColor: "#808080",
      outline: "none",
      border: "3px solid orange",
    },
    "&::placeholder": {
      fontSize: "15px",
    },
  },
  head: {
    fontSize: "1.5rem",
    marginBottom: "30px",
    color: "white",
    fontFamily: " 'Times New Roman', serif;",
  },
  label: {
    backgroundColor: "rgba(255,255,255,0.6)",
    width: "50%",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "10px 0 0 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "black",
    fontWeight: "700",
  },
  merge: {
    display: "flex",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  quaterlyInput: {
    width: "24.9%",
    padding: "10px 20px",
    height: "100%",
    borderRadius: "0 10px 10px 0",
    fontSize: "15px",
    fontWeight: "700",
    border: "none",
    "&::-webkit-outer-spin-button": {
      display: "none",
    },
    "&::-webkit-inner-spin-button": {
      display: "none",
    },
    "&:focus": {
      backgroundColor: "#808080",
      outline: "none",
      border: "3px solid orange",
    },
  },
  menu: {
    width: "80%",
    backgroundColor: "black",
    display: "flex",
    height: "5%",
    borderRadius: "20px",
    justifyContent: "space-evenly",
    "@media(max-width:400px)": {
      width: "98%",
    },
  },
  menuItem: {
    fontSize: "100%",
    fontWeight: "700",
    alignItems: "center",
    color: "white",
    width: "33%",
    display: "flex",
    height: "100%",
    justifyContent: "center",
  },
  active: {
    color: "orange",
  },
  monthly: {
    display: "flex",
    flexWrap: "wrap",
    height: "55%",
    width: "95%",
    gap: "1%",
    padding: "20px",
    borderRadius: "20px",
    backgroundColor: "#808080",
    "@media(max-width:1300px)": {
      overflowY: "auto",
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
  inputmid: {
    borderRadius: 0,
    borderRight: "1px solid black",
    "&::placeholder": {
      fontSize: "70%",
    },
  },
  quaterly: {
    fontSize: "90%",
    padding: "20px",
    backgroundColor: "rgba(250,250,250,0.6)",
    height: "100%",
    width: "48%",
    flexShrink: 0,
    borderRadius: "20px",
    "@media(max-width:1000px)": {
      overflowY: "auto",
      width: "95%",
    },
  },
  date: {
    width: "10%",
    height: "25%",
    fontSize: "90%",
    padding: "10px",
    "@media(max-width:1300px)": {
      width: "31%",
    },
    "@media(max-width:1000px)": {
      width: "30%",
    },
    "@media(max-width:600px)": {
      width: "46%",
    },
  },
  maintainDay: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "orange",
    backgroundColor: "black",
    height: "100%",
    borderRadius: "10px",
    padding: "10px",
  },
  calender: {
    height: "30%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  calenderChild: {
    height: "100%",
    borderRadius: "10px",
    width: "fill-content",
    display: "flex",
    alignItems: "center",
    color: "orange",
    justifyContent: "center",
    fontSize: "1rem",
    minWidth: "30%",
    padding: "0 10px",
    fontWeight: "800",
    backgroundColor: "black",
  },
  calenderSheets: {
    display: "flex",
    height: "75%",
    justifyContent: "space-evenly",

    width: "100%",
  },
  quaterlycalenderChild: {
    width: "100%",
    backgroundColor: "black",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "800",
    color: "orange",
    borderRadius: "10px",
  },
  quaterlyCalender: {
    height: "100%",
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  quaterlyParent: {
    width: "33%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  halfYearly: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    "@media(max-width:1000px)": {
      width: "95%",
    },
  },
  normalDay: {
    height: "100%",
    backgroundColor: "rgba(250,250,250,0.6)",
    fontSize: "1.3rem",
    color: "black",
    borderRadius: "10px",
    fontWeight: "700",
    padding: "10px",
  },
  button: {
    backgroundColor: "white",
    borderRadius: "10px",
    color: "orange",
    fontSize: "90%",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#808080",
      color: "black",
    },
  },
  scheduleDivParent: {
    height: "35%",
    display: "flex",
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
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
    "@media(max-width:1000px)": {
      flexDirection: "column",
      overflowY: "auto",
      gap: "20px",
      justifyContent: "flex-start",
    },
  },
  scheduleDiv: {
    padding: "20px",
    backgroundColor: "rgba(250,250,250,0.6)",
    height: "100%",
    width: "47%",
    flexShrink: 0,
    borderRadius: "20px",
    "@media(max-width:1000px)": {
      width: "95%",
    },
  },
  scheduleDivHead: {
    fontSize: "1.2rem",
    fontWeight: "700",
  },
  scheduleDate: {
    width: "100%",
    height: "20%",
    color: "black",
    fontSize: "1rem",
    fontWeight: "700",
  },
  calenderLogo: {
    marginRight: "10px",
  },
  viewInvoiceParent: {
    padding: "1%",
    height: "35%",
    border: "1px solid white",
    width: "95%",
    display: "flex",
    backgroundColor: "rgba(250,250,250,0.6)",
    gap: "1%",
    borderRadius: "15px",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      backgroundColor: "rgba(0,0,0,0.7)",
      borderRadius: "10px",
      padding: "5px",
      height: "5px",
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
  viewInvoiceChild: {
    padding: "1%",
    borderRadius: "15px",
    width: "40%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2%",
    backgroundColor: "#000",
    justifyContent: "center",
  },
  chart: {
    height: "55%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    "@media(max-width:1000px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  },
  expenseChart: {
    display: "flex",
    alignItems: "center",
    height: "95%",
    width: "48%",
    flexDirection: "column",
    "@media(max-width:1000px)": {
      width: "100%",
    },
  },
  invoiceButton: {
    backgroundColor: "rgba(250,0,50,0.6)",
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    borderRadius: "5px",
    padding: "5px",
  },
};

export default styles;

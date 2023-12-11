import { useEffect, useState } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import BarChart from "../temp/budget";
import Chart from "./chart";

function View(props) {
  const { classes } = props;
  const [invoice, setInvoice] = useState({});
  const [budget, setBudget] = useState({});
  const [complaints, setComplaints] = useState({});
  const [serviceProviderData, setServiceProviderData] = useState({});
  const [loaded, setLoaded] = useState(0);

  function handleInvoice() {
    return invoice.map((k) => {
      return (
        <div className={classes.viewInvoiceChild}>
          <p className={classes.invoiceData}>Complaint:{k["complaint_id"]}</p>
          <p className={classes.invoiceData}>Resident:{k["complaint_id"]}</p>
          <p className={classes.invoiceData}>
            Service Provider:{k["complaint_id"]}
          </p>
          <p className={classes.invoiceButton}>
            <i class="fa-solid fa-circle-dollar-to-slot"></i>
            {k["cost"]}
          </p>
        </div>
      );
    });
  }

  async function getData() {
    await axios
      .get(
        `https://smartapartmentserver.onrender.com/admin/getBudgetData/${new Date().getFullYear()}`
      )
      .then((res) => {
        setBudget(res.data[0]);
      });
    await axios
      .get(
        `https://smartapartmentserver.onrender.com/admin/getInvoiceData/${new Date().getFullYear()}`
      )
      .then((res) => {
        setInvoice(res.data[0]);
      });
    await axios
      .get(
        `https://smartapartmentserver.onrender.com/admin/getServiceProviders`
      )
      .then((res) => {
        setServiceProviderData(res.data[0]);
      });
    await axios
      .get("https://smartapartmentserver.onrender.com/admin/getComplaints")
      .then((res) => {
        setComplaints(res["data"][0]);
      });
    setLoaded(1);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`${classes.parent} ${classes.viewParent}`}>
      <div className={classes.viewInvoiceParent}>
        {loaded ? handleInvoice() : ""}
      </div>
      <div className={classes.chart}>
        <div className={classes.expenseChart}>
          <p className={classes.head}>Budget</p>
          <BarChart
            width={window.innerWidth * 0.2}
            height={window.innerHeight * 0.2}
          />
        </div>
        <div className={classes.expenseChart}>
          <p className={classes.head}>Expenses</p>
          <Chart
            width={window.innerWidth * 0.4}
            height={window.innerHeight * 0.4}
          />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(View);

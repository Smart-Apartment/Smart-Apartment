import { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles.js";
import axios from "axios";

function Form(props) {
  const { classes } = props;

  async function handleBudget(evt) {
    evt.preventDefault();
    let d = {
      psqftQuaterly: evt.target.form[0].value,
      psqftHalf: evt.target.form[1].value,
      psqftYearly: evt.target.form[2].value,
      sqft: evt.target.form[3].value,
      totalCostPerSquareFeet: Number(evt.target.form[4].value),
      year: evt.target.form[5].value,
      quaterly: `${evt.target.form[6].value},${evt.target.form[7].value}`,
      half: `${evt.target.form[8].value}`,
      yearly: `${evt.target.form[9].value}`,
      otherExpenses: 0,
    };
    axios.post("http://localhost:8000/admin/BudgetUpdate", d).then((res) => {
      console.log("done");
    });
  }

  return (
    <div className={classes.formParent}>
      <form className={classes.form}>
        <h1 className={classes.head}>Budget</h1>
        <div className={classes.merge}>
          <div className={classes.label}>Maintenance cost/SQFT</div>
          <input
            className={`${classes.inputmid} ${classes.input}`}
            placeholder="Quaterly"
            type="number"
          />
          <input
            className={`${classes.inputmid} ${classes.input}`}
            placeholder="Half Yearly"
            type="number"
          />
          <input className={classes.input} placeholder="Yearly" type="number" />
        </div>
        <div className={classes.merge}>
          <div className={classes.label}>Total SQFT</div>
          <input className={classes.input} type="number" />
        </div>
        <div className={classes.merge}>
          <div className={classes.label}>Total Maintanence Cost/SQFT</div>
          <input className={classes.input} type="number" />
        </div>
        <div className={classes.merge}>
          <div className={classes.label}>Year</div>
          <input className={classes.input} min="2023" max="2033" />
        </div>
        <div className={classes.merge}>
          <div className={classes.label}>Quaterly</div>
          <input
            className={`${classes.inputmid} ${classes.quaterlyInput}  ${classes.quaterlyForm}`}
            type="date"
          />
          <input
            className={`${classes.quaterlyInput} ${classes.quaterlyForm}`}
            type="date"
          />
        </div>
        <div className={classes.merge}>
          <div className={classes.label}>Half Early</div>
          <input className={classes.input} type="date" />
        </div>
        <div className={classes.merge}>
          <div className={classes.label}>Yearly</div>
          <input className={classes.input} type="date" />
        </div>
        <button className={classes.button} onClick={handleBudget}>
          Update
        </button>
      </form>
    </div>
  );
}

export default withStyles(styles)(Form);

import { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import BudgetForm from "./maintenanceForm";
import Schedule from "./Schedule";
import View from "./view";

function Maintenance(props) {
  const { classes } = props;
  const [active, setActive] = useState(2);

  function handleActive(evt) {
    setActive(Number(evt.target.id));
  }

  return (
    <div className={classes.Topparent}>
      <div className={classes.menu}>
        <p
          className={`${classes.menuItem} ${
            active === 0 ? classes.active : ""
          }`}
          onClick={handleActive}
          id="0"
        >
          Edit Budget
        </p>
        <p
          className={`${classes.menuItem} ${
            active === 1 ? classes.active : ""
          }`}
          onClick={handleActive}
          id="1"
        >
          View
        </p>
        <p
          onClick={handleActive}
          className={`${classes.menuItem} ${
            active === 2 ? classes.active : ""
          }`}
          id="2"
        >
          Schedule
        </p>
      </div>
      {active === 0 ? <BudgetForm /> : ""}
      {active === 1 ? <View active={active} /> : ""}
      {active === 2 ? <Schedule /> : ""}
    </div>
  );
}

export default withStyles(styles)(Maintenance);

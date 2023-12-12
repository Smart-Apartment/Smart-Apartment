import { withStyles } from "@material-ui/styles";
import styles from "./style";
import { useState, useEffect } from "react";

function Complaints(props) {
  const { classes } = props;
  const [complaints, setComplaints] = useState(false);

  useEffect(() => {
    fetch("https://smartapartmentserver.onrender.com/admin/getComplaints").then(
      (res) => {
        console.log(res);
        setComplaints(res.data[0]);
      }
    );
  }, []);

  function Users() {
    console.log(complaints);
    return complaints[0].map((k) => {
      return (
        <div className={classes.complaintsColumn}>
          <p className={`${classes.complaintsRow} ${classes.complaintName}`}>
            <i class="fa-solid fa-user"></i>
            {"  "} {k["name"].toUpperCase()}
          </p>
          <p className={`${classes.complaintsRow}  ${classes.complaintDate}`}>
            <i class="fa-solid fa-building"></i>
            {"  "}
            {"Flat "}
            {k["flat_no"]}
          </p>
          <p className={`${classes.complaintsRow} ${classes.complaintDate}`}>
            <i class="fa-solid fa-calendar-days"></i>
            {"  "}
            {k["date"]} - {k["time"]}
          </p>
          <p
            className={`${classes.complaintsRow} ${classes.complaintDescription}`}
          >
            <span className={classes.span}>{k["description"]}</span>
          </p>
          <div className={classes.row}>
            <button id="userId" className={classes.button} disabled>
              {k["status"]}
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className={classes.complaints}>
      <div className={classes.nav}>
        <p className={classes.text}>
          <i className={`fa-solid fa-user ${classes.userText}`}></i>Complaints
        </p>
        <div>
          <div className={classes.searchBar}>
            <i
              className={`fa-solid fa-magnifying-glass ${classes.searchLogo}`}
            ></i>
            <input placeholder="search" className={classes.input} />
          </div>
        </div>
      </div>
      {complaints ? (
        <div className={classes.complaintstable}>{Users()}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default withStyles(styles)(Complaints);

import styles from "../Users/style";
import { withStyles } from "@material-ui/styles";
import Keys from "./keys";
import { useState } from "react";
import axios from "axios";

function Users(props) {
  const { classes } = props;
  const [logData, setLog] = useState(false);

  async function getData() {
    await axios(
      "https://smartapartmentserver.onrender.com/admin/getVisitor"
    ).then((res) => {
      setLog(res.data[0]);
    });
  }

  useState(() => {
    getData();
  });

  function Users() {
    return logData.map((k) => {
      return (
        <div className={classes.columns}>
          <p className={classes.row}>{k["FullName"]}</p>
          <p className={classes.row}>{k["phoneNumber"]}</p>
          <p className={classes.row}>{k["check_in_time"]}</p>
          <p className={classes.row}>{k["check_out_time"]}</p>
          <p className={classes.row}>{k["flatno"]}</p>
          <p className={classes.row}>{k["Purpose"]}</p>
        </div>
      );
    });
  }

  function getTitles() {
    return Keys.map((k) => {
      return <p className={classes.row}>{k}</p>;
    });
  }

  return (
    <div className={classes.users}>
      <div className={classes.nav}>
        <p className={classes.text}>
          <i className={`fa-solid fa-user ${classes.userText}`}></i>Visitors
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
      {logData ? (
        <div className={classes.tables}>
          <div className={classes.columns}>{getTitles()}</div>
          <div className={classes.columnValues}>{Users()}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default withStyles(styles)(Users);

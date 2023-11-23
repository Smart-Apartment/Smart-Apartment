import UserData from "../temp/users";
import styles from "./style";
import { withStyles } from "@material-ui/styles";
import Keys from "./keys";

function Users(props) {
  const { classes } = props;

  function Users() {
    return Object.keys(UserData).map((k) => {
      return (
        <div className={classes.columns}>
          <p className={classes.row}>{UserData[k]["fname"]}</p>
          <p className={classes.row}>{UserData[k]["lname"]}</p>
          <p className={classes.row}>{UserData[k]["email"]}</p>
          <p className={classes.row}>{UserData[k]["DOB"]}</p>
          <p className={classes.row}>{UserData[k]["Flat no"]}</p>
          <p className={classes.row}>{UserData[k]["mob"]}</p>
          <div className={classes.row}>
            <button id="userId" className={classes.button}>
              <span className={classes.span}>Remove</span>{" "}
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
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
          <i className={`fa-solid fa-user ${classes.userText}`}></i>Users
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
      <div className={classes.tables}>
        <div className={classes.columns}>{getTitles()}</div>
        <div className={classes.columnValues}>{Users()}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Users);

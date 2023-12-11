import styles from "./style";
import { withStyles } from "@material-ui/styles";
import Keys from "./keys";
import axios from "axios";

function Users(props) {
  const { classes } = props;

  function Users() {
    return Object.keys(props.users).map((k) => {
      return (
        <div className={classes.columns}>
          <p className={classes.row}>{props.users[k]["full_name"]}</p>
          <p className={classes.row}>{props.users[k]["flat_no"]}</p>
          <p className={classes.row}>{props.users[k]["dob"]}</p>
          <p className={classes.row}>{props.users[k]["aadhar_number"]}</p>
          <p className={classes.row}>{props.users[k]["user_name"]}</p>
          <p className={classes.row}>{props.users[k]["email"]}</p>
          <div className={classes.row}>
            <button
              id={props.users[k]["user_name"]}
              className={classes.button}
              onClick={handleRemove}
            >
              <span
                className={classes.span}
                id={props.users[k]["user_name"]}
                onClick={handleRemove}
              ></span>{" "}
              <i
                id={props.users[k]["user_name"]}
                className="fa-solid fa-trash"
              ></i>
            </button>
          </div>
        </div>
      );
    });
  }

  async function handleRemove(evt) {
    await axios
      .post(`http://localhost:8000/user/remove/${evt.target.id}`)
      .then(() => {
        props.handleRender();
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
            <input
              placeholder="search"
              className={classes.input}
              onChange={props.handleSearch}
            />
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

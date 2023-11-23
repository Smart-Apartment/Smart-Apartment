import { withStyles } from "@material-ui/styles";
import style from "./style";

function Complaints(props) {
  const { classes } = props;

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
    </div>
  );
}

export default withStyles(style)(Complaints);

import { withStyles } from "@material-ui/styles";
import logo from "../../../screens/Header/logo3.png";
import styles from "./style";
import menudata from "./menuItems";
import { v4 } from "uuid";

function Menu(props) {
  const { classes } = props;

  function menuItems() {
    return Object.keys(menudata).map((k, ind) => {
      return (
        <div
          key={v4()}
          onClick={props.changeActive}
          id={ind}
          className={`${classes.menuItems}  ${
            ind == props.active ? classes.active : ""
          }`}
        >
          <p id={ind}>{k}</p>
          <i id={ind} className={menudata[k]}></i>
        </div>
      );
    });
  }

  return (
    <>
      {props.menuIcon ? (
        <div
          className={classes.menuLogo}
          onClick={props.handleVisibility}
          id="icon"
        >
          <i class="fa-solid fa-bars"></i>
        </div>
      ) : (
        ""
      )}
      {!props.visibility ? (
        ""
      ) : (
        <div className={classes.menu}>
          <div className={`${classes.logo}`}>
            <img className={classes.logoimg} src={logo} alt="logo" />
            <p>Smart Apartments</p>
            {props.close ? (
              <i
                id="close"
                onClick={props.handleVisibility}
                style={{ teztAlign: "right" }}
                className="fa-solid fa-xmark"
              ></i>
            ) : (
              ""
            )}
          </div>
          {menuItems()}
        </div>
      )}
    </>
  );
}

export default withStyles(styles)(Menu);

import { withStyles } from "@material-ui/styles";
import style from "./style";
import { useEffect, useState } from "react";
import Menu from "../menu/menu";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Users/users";
import Residents from "../ResidentLog/residents";
import Complaints from "../Complaints/complaints";
import Service from "../serviceproviders/service";

function Admin(props) {
  const { classes } = props;
  const [userCount, setUserCount] = useState(0);
  const [Budget, setBudget] = useState({});
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [visitorsCount, setvisitorsCount] = useState(0);
  const [menu, setMenu] = useState(window.innerWidth <= 700 ? false : true);
  const [menuIcon, setmenuIcon] = useState(
    window.innerWidth <= 700 ? true : false
  );
  const [close, setClose] = useState(window.innerWidth <= 700 ? true : false);
  const [width, setWidth] = useState(window.innerWidth);
  const [active, setActive] = useState(0);

  //Usercount
  //   useEffect(() => {
  //     fetch("http://localhost:8000/getCount").then((response) => {
  //       response.json().then((data) => {
  //         setCount(data.count);
  //       });
  //     });
  //   },[]);

  //Budget
  //   useEffect(() => {
  //     fetch("http://localhost:8000/getBudget").then((response) => {
  //       response.json().then((data) => {
  //         setBudget(data.count);
  //       });
  //     });
  //   },[]);

  useEffect(() => {
    let eventListener = window.addEventListener("resize", () => {
      if (window.innerWidth < 700) {
        setClose(false);
        setMenu(false);
        setmenuIcon(true);
      } else if (window.innerWidth >= 700) {
        setClose(false);
        setMenu(true);
        setmenuIcon(false);
      }
      setWidth(window.innerWidth);
    });
    return clearInterval(eventListener);
  }, []);

  function handleVisibility(evt) {
    if (evt.target.id === "close") {
      setMenu(false);
      setClose(false);
      setmenuIcon(true);
    } else {
      setMenu(true);
      setClose(true);
      setmenuIcon(false);
    }
  }

  function changeActive(evt) {
    setActive(evt.target.id);
  }

  return (
    <div className={classes.parent}>
      <Menu
        menuIcon={menuIcon}
        visibility={menu}
        close={close}
        handleVisibility={handleVisibility}
        width={width}
        changeActive={changeActive}
        active={active}
      />
      {active == 0 ? (
        <Dashboard
          classes={classes}
          userCount={userCount}
          complaintsCount={complaintsCount}
          visitorsCount={visitorsCount}
          width={width}
        />
      ) : (
        ""
      )}
      {active == 1 ? <Users /> : ""}
      {active == 2 ? <Residents /> : ""}
      {active == 4 ? <Complaints /> : ""}
      {active == 6 ? <Service /> : ""}
    </div>
  );
}

export default withStyles(style)(Admin);

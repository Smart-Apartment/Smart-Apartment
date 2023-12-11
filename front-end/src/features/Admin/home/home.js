import { withStyles } from "@material-ui/styles";
import style from "./style";
import { useEffect, useState } from "react";
import Menu from "../menu/menu";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Users/users";
import Visitor from "../Visitors/log";
import Complaints from "../Complaints/complaints";
import Service from "../serviceproviders/service";
import MaintenanceForm from "../Maintanence/Maintenance";
import axios from "axios";

function Admin(props) {
  const { classes } = props;
  const [userCount, setUserCount] = useState(0);
  const [Budget, setBudget] = useState({});
  const [complaintsCount, setComplaintsCount] = useState([]);
  const [visitorsCount, setvisitorsCount] = useState(384);
  const [users, setUsers] = useState({});
  const [menu, setMenu] = useState(window.innerWidth <= 700 ? false : true);
  const [menuIcon, setmenuIcon] = useState(
    window.innerWidth <= 700 ? true : false
  );
  const [close, setClose] = useState(window.innerWidth <= 700 ? true : false);
  const [width, setWidth] = useState(window.innerWidth);
  const [active, setActive] = useState(0);
  const [complaints, setComplaints] = useState({});

  // useEffect(() => {
  //   fetch("http://localhost:8000/getBudget").then((response) => {
  //     response.json().then((data) => {
  //       setBudget(data.count);
  //     });
  //   });
  // }, []);

  function getUsers() {
    fetch("https://smartapartmentserver.onrender.com/admin/users").then(
      (response) => {
        response.json().then((data) => {
          setUsers(data);
          setUserCount(data.length);
        });
      }
    );
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    fetch(
      "https://smartapartmentserver.onrender.com/admin/getComplaintsCount"
    ).then((res) => {
      res.json().then((data) => {
        setComplaintsCount(data);
      });
    });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8000/admin/getVisitors").then((res) => {
  //     res.json().then((data) => {});
  //   });
  // }, []);

  async function handleSearch(evt) {
    if (evt.target.value.length > 0) {
      await axios(
        `https://smartapartmentserver.onrender.com/admin/userSearch/${evt.target.value}`
      ).then((res) => {
        setUsers(res.data[0]);
      });
    }
  }

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
    <div className={classes.adminParent}>
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
      {active == 1 ? (
        <Users
          users={users}
          handleRender={getUsers}
          handleSearch={handleSearch}
        />
      ) : (
        ""
      )}
      {active == 2 ? <Visitor /> : ""}
      {active == 3 ? <Complaints complaints={complaints} /> : ""}
      {active == 4 ? <Service /> : ""}
      {active == 5 ? <MaintenanceForm /> : ""}
    </div>
  );
}

export default withStyles(style)(Admin);

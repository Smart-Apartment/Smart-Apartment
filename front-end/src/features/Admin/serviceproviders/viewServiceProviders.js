import { withStyles } from "@material-ui/styles";
import styles from "../Users/style";
import Keys from "./keys";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewServiceProviders(props) {
  const { classes } = props;
  const [data, getData] = useState({});
  const [loaded, setloaded] = useState(0);

  function getTitles() {
    return Keys.map((k) => {
      return <p className={classes.row}>{k}</p>;
    });
  }

  async function getServiceProvider() {
    await axios
      .get(
        `https://smartapartmentserver.onrender.com/admin/getServiceProviders`
      )
      .then((res) => {
        getData(res.data[0]);
        setloaded(1);
      });
  }

  useEffect(() => {
    getServiceProvider();
  }, []);

  async function handleRemove(evt) {
    await axios
      .post(
        `https://smartapartmentserver.onrender.com/admin/removeServiceProvider/${evt.target.id}`
      )
      .then((res) => {
        if (res.data === 200) {
          getServiceProvider();
        }
      });
  }

  async function handleSearch(evt) {
    if (evt.target.value.length > 0) {
      await axios
        .get(
          `https://smartapartmentserver.onrender.com/admin/serviceSearch/${evt.target.value}`
        )
        .then((res) => {
          if (res.data[1] === 200) {
            getData(res.data[0]);
          }
        });
    }
  }

  function Users() {
    return data.map((k) => {
      return (
        <div className={classes.columns}>
          <p
            className={classes.row}
          >{`${k["first_name"]} ${k["last_name"]}`}</p>
          <p className={classes.row}>{String(k["role"])}</p>
          <p className={classes.row}>{k["dob"]}</p>
          <p className={classes.row}>{k["aadhar_number"]}</p>
          <p className={classes.row}>{k["phone"]}</p>
          <div className={classes.row}>
            <button
              id={k["aadhar_number"]}
              className={classes.button}
              onClick={handleRemove}
            >
              <span
                id={k["aadhar_number"]}
                className={classes.span}
                onClick={handleRemove}
              ></span>{" "}
              <i id={k["aadhar_number"]} className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className={classes.viewServiceProviders}>
      <div className={classes.nav}>
        <p className={classes.text}>
          <i className={`fa-solid fa-user ${classes.userText}`}></i>Service
          Providers
        </p>
        <div>
          <div className={classes.searchBar}>
            <i
              className={`fa-solid fa-magnifying-glass ${classes.searchLogo}`}
            ></i>
            <input
              placeholder="search"
              className={classes.input}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className={classes.tables}>
        <div className={classes.columns}>{getTitles()}</div>
        <div className={classes.columnValues}>{loaded ? Users() : ""}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(ViewServiceProviders);

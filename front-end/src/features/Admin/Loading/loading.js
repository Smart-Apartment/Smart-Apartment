import { useEffect, useState, createContext } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import logo from "../../../screens/Header/logo3.png";
import Loader from "./loader";
import axios from "axios";
import Login from "../Auth/login";

const Authentication = createContext();

function Loading(props) {
  const { classes } = props;
  const [auth, setAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function checkToken() {
    let data = window.localStorage.getItem("sa-token");
    if (data) {
      await axios
        .get(`https://smartapartmentserver.onrender.com/admin/getToken/${data}`)
        .then((res) => {
          if (res.data[1] === 200) {
            setAuth(true);
          }
        });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      {loaded ? (
        <Authentication.Provider value={{ auth, setAuth }}>
          <Login />
        </Authentication.Provider>
      ) : (
        <div className={classes.loadingParent}>
          <div className={classes.logo}>
            <img className={classes.image} src={logo} alt="logo" />
            <p className={classes.text}>Smart Apartment</p>
          </div>
          <Loader />
        </div>
      )}
    </>
  );
}

export default withStyles(styles)(Loading);
export { Authentication };

import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { useEffect, useContext, createContext, useState } from "react";
import axios from "axios";
import AdminHome from "../home/home";
import { v4 } from "uuid";
import { Authentication } from "../Loading/loading";

function Login(props) {
  const { auth, setAuth } = useContext(Authentication);
  const [userName, setUsername] = useState(true);
  const [password, setPassword] = useState(true);

  async function handleLogin(evt) {
    evt.preventDefault();
    let data = {
      username: evt.target[0].value,
      password: evt.target[1].value,
    };
    await axios
      .post("http://localhost:8000/admin/login", data)
      .then(async (res) => {
        let token = String(v4());
        window.localStorage.setItem("sa-token", token);
        await axios
          .post("http://localhost:8000/admin/setToken", {
            token: token,
          })
          .then(() => {
            setAuth(true);
          });
      });
  }

  function handleInput(evt) {
    evt.preventDefault();
    Number(evt.target.id) ? setPassword(!password) : setUsername(!userName);
  }

  const { classes } = props;
  return (
    <>
      {!auth ? (
        <div className={classes.parent}>
          <form className={classes.login} onSubmit={handleLogin}>
            <i className={`${classes.adminLogo} fa-solid fa-user-secret`}></i>
            <p className={classes.welcome}>Welcome Back</p>
            <div className={classes.merge}>
              <label className={classes.label}>USERNAME</label>
              <input
                className={classes.input}
                placeholder="username"
                type={userName ? "password" : "text"}
              />
              <div className={classes.viewValue} id="0" onClick={handleInput}>
                <i className="fa-solid fa-eye" id="0"></i>
              </div>
            </div>
            <div className={classes.merge}>
              <label className={classes.label}>PASSWORD</label>
              <input
                className={classes.input}
                placeholder="password"
                type={password ? "password" : "text"}
              />
              <div className={classes.viewValue} id="1" onClick={handleInput}>
                <i className="fa-solid fa-eye" id="1"></i>
              </div>
            </div>
            <button className={classes.button}>Login</button>
          </form>
        </div>
      ) : (
        <AdminHome />
      )}
    </>
  );
}

export default withStyles(styles)(Login);

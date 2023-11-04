import React, { useState } from "react";

import { Container, TextField, Typography, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {PersonOutlined, EmailOutlined, PasswordOutlined, PhoneOutlined} from '@mui/icons-material';

import InputAdornment from '@mui/material/InputAdornment';


function VisitorLogin() {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formControl}>
      <Controller
        name="FullName"
        control={control}
        defaultValue=""
        className={classes.formControl}
        render={({ field }) => (
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            placeholder="Full Name"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlined />
                </InputAdornment>
              ),

            }}
              />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            placeholder="Phone Number"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneOutlined />
                </InputAdornment>
              ),

            }}
          />
        )}
      />

      <Button
        className={classes.loginBtn}
        variant="contained"
        type="submit"
        color="primary"
      >
        Next
      </Button>
    </form>
  );
}

function LoginForm() {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formControl}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        className={classes.formControl}
        render={({ field }) => (
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            placeholder="Enter your email"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),

            }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            
            placeholder="Enter your password"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordOutlined />
                </InputAdornment>
              ),

            }}
          />
        )}
      />

      <Button
        className={classes.loginBtn}
        variant="contained"
        type="submit"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#FBFBFB",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  head: {
    backgroundColor: "#fff",
    height: "10%",
  },
  top: {
    marginTop: "10px",
    color: "#828282",
    fontSize: "20px",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    height: "500px",
    width: "600px",
    marginTop: "20px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  loginBtn: {
    width: "100%",
    marginTop: "10px",
    height: "48px",
    backgroundColor: "#4F4F4F",
    "&:hover": {
      backgroundColor: "black", // Change the background color on hover
      color: "white", // Change the text color on hover
    },
  },
  formControl: {
    width: "75%",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [value, setValue] = useState("user");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.main}>
      <Container maxWidth="sm">
        <Typography align="center" variant="h4">
          Sign in as a Staff!
        </Typography>
        <Typography
          className={classes.top}
          variant="h5"
          align="center"
          sx={{ mt: 5 }}
        >
          Enter your username and password
        </Typography>

        <Container >
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="Tab List" centered>
              <Tab label="User" value="user" />
              <Tab label="Visitor" value="visitor" />
            </TabList>
            <TabPanel value="user">
              <Container maxWidth="sm" align="center">
                <LoginForm />
                <Typography
                  className={classes.top}
                  variant="h5"
                  align="center"
                  sx={{ mt: 10 }}
                >
                  OR
                </Typography>
                <Typography>Login with facial recognition </Typography>
              </Container>
            </TabPanel>
            <TabPanel value="visitor">
              <Container maxWidth="sm" align="center">
                <VisitorLogin />
              </Container>
            </TabPanel>
          </TabContext>
        </Container>
      </Container>
    </div>
  );
};

export default Login;

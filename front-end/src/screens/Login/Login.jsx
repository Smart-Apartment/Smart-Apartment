import React, { useState } from "react";

import { Container, TextField, Typography, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {PersonOutlined, EmailOutlined, PasswordOutlined, PhoneOutlined} from '@mui/icons-material';

import InputAdornment from '@mui/material/InputAdornment';


function VisitorLogin() {
  const { control, handleSubmit ,formState:{errors}} = useForm();
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
        rules={{
          required:true
        }}
        className={classes.formControl}
        render={({ field:{ref,...field} }) => (
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            placeholder="Full Name"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlined />
                </InputAdornment>
              ),

            }}
            error={!!errors.FullName}
            helperText={errors.FullName && "Full Name is Required"}
              />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        rules={{
          required:true,
          maxLength:12,
        }}
        render={({ field :{ref,...field}}) => (
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
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && "Phone Number is Required"}
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
  const { control, handleSubmit ,formState:{errors}} = useForm();
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
        rules={{
          required:true,
        }}
        render={({ field :{ref,...field}}) => (
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            placeholder="Enter your Email"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),

            }}
            error={!!errors.email }
            inputRef={ref}
            helperText={errors.email && "Email Is Required"}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required:true,
        }}
        render={({ field :{ref,...field}}) => (
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            
            placeholder="Enter your Password"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordOutlined />
                </InputAdornment>
              ),

            }}
            error={!!errors.password }
            inputRef={ref}
            helperText={errors.password && "Password is Required"}
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
        <Typography align="center" >
          <h1>
          Sign In 
          </h1>
        </Typography>
        <Typography
          className={classes.top}
          variant="h5"
          align="center"
          sx={{ mt: 5 }}
        >
          Enter your Username and Password
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
                <Button>Login with Facial Recognition </Button>
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

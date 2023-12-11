import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { MuiTelInput } from 'mui-tel-input';
import { CircularProgress, CssBaseline,  Paper} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';

import {
  
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { PasswordOutlined, Phone ,VisibilityOffOutlined,VisibilityOutlined} from "@mui/icons-material";
import { useAuth } from "../provider/authProvider";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  main: {
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
  textField: {
    backgroundColor: "whitesmoke",
    notchedOutline: {
      px: 10,
    },
    fontFamily: "Poppins",
    fontSize: "14px",
  },
  loginBtn: {
    width: "40%",
    marginTop: "10px",
    height: "48px",
    backgroundColor: "black !important",
    color:"orange !important",
    "&:hover": {
      backgroundColor: "#909090", 
      color: "yellow", 
    },
  },
  formControl: {
    display: "flex",
    gap: "15px",
    flexDirection: "column",
    marginTop: "10px",
  },
  FaceForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));



function LoginForm() {
  const {  token,setToken } = useAuth();
  const navigate=useNavigate();
  const [loginSnackbar, setloginSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [error,setError]=useState('Invalid Phone Number or Password');  
  const[loading,setLoading]=useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  
  } = useForm();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data) => {
    console.log(data);
    const loginResult = await handleSpLogin(data);
    console.log("login",loginResult);
    if(loginResult.status===200){
    if (loginResult.data.role.includes("Security")) {
      navigate('/security/profile');
    } 
    else{
      navigate('/service/profile')
    }
  }
  };
  const handleSpLogin = async (data) => {
    setLoading(true);
    const form=new FormData()
    form.append("username",data.phone_number)
    form.append("password",data.password)
    try {
      
      const response = await axios.post("http://127.0.0.1:8000/auth/login/serviceprovider", form);
      if(response){
      setToken(response.data.access_token);
      Cookies.set("token", response.data.access_token);
      Cookies.set("auth",true);
      setloginSnackbar(true);
      setLoading(false);
      return response;
      
      }
      
    } catch (error) {
      console.log(error.message);
      setError("Invalid Phone Number or Password")
      setErrorSnackbar(true);
      setLoading(false);
      return error;
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setloginSnackbar(false);
    setErrorSnackbar(false);
  };
 

  

  
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formControl}>
       <Controller
        control={control}
        name="phone_number"
        rules={{
          required:true,
          
        }}
        defaultValue=""
        render={({ field :{ref,...field}}) => (
          <MuiTelInput
          className="telinput"
          label="Phone Number" 
          variant="outlined"
          placeholder="Enter Your Phone Number"
          fullWidth
          margin="normal"
          disableDropdown
          disableFormatting
          forceCallingCode
          error={!!errors.phone_number }
          inputRef={ref}
          helperText={errors.phone_number?.message}
          {...field}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
            className: classes.textField,

          }}
          inputProps={{
            maxLength:10,
            style: { padding:'18.5px 0px' }
          }}     
          defaultCountry="IN"     
         />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            fullWidth
            margin="normal"
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility } className="password-toggle">
                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            className:classes.textField
            }}

                        
              
          />
        )}
      />
      <Box textAlign="center">
      <Button
  className={classes.loginBtn}
  variant="contained"
  
  type="submit"
  disabled={loading}
>
  {loading ? (
    <CircularProgress size={24} style={{color:'orange'}} />
  ) : (
    <>
      Login
    </>
  )}
</Button>
      </Box>

    </form>
    <Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={errorSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="warning">
          Invalid Phone Number or Password
        </Alert>
      </Snackbar>
      <Snackbar  anchorOrigin={{ vertical: 'top', horizontal:'center' }}
          open={loginSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose}  severity="success">
         Log In Success
        </Alert>
      </Snackbar>
      </>
        );
}


const SpLogin = () => {
  const classes = useStyles();

  const { vertical, horizontal } = {
    vertical: "top",
    horizontal: "right",
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="sm">
        <h1 style={{textAlign:"center"}}>Sign In As <span style={{color:'orange'}}>Service</span></h1>
        <Typography
          className={classes.top}
          variant="h5"
          align="center"
          sx={{ mt: 5 }}
        >
          Enter your Username and Password
        </Typography>

        <Container disableGutters maxWidth={false} className={classes.root}>
          <LoginForm />
        </Container>
      </Container>
    </div>
  );
};

export const SpLoginScreen=()=>{
    return(
      <>
      <CssBaseline />

        <Container style={{ paddingTop: "12vh" }} maxWidth={"sm"} component={Box} p={3}>
          <Paper component={Box} p={3}>
            <SpLogin />
          </Paper>
        </Container>
      </>
    )
  }
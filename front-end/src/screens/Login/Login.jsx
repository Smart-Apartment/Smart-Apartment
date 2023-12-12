import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Navigate, useNavigate } from "react-router-dom";
import { MuiTelInput } from 'mui-tel-input';
import {
  
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "../provider/authProvider";
import IconButton from '@mui/material/IconButton';
import {  PasswordOutlined, Phone ,VisibilityOffOutlined,VisibilityOutlined} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from '../Loader/loader'
import { CircularProgress } from "@material-ui/core";
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
    color:'orange',
    fontFamily: "Poppins",
    fontSize: "14px",
    borderColor:'black'
  },
  loginBtn: {
    position:'relative',
    width: "40%",
    marginTop: "10px",
    height: "48px",
    color:'orange !important',
    backgroundColor: "black !important",
    "&:hover": {
      backgroundColor: "black",
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



function LoginForm(props) {
  const [loginSnackbar, setloginSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [error,setError]=useState('Invalid Phone Number or Password');  
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate=useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  
  } = useForm();
  const classes = useStyles();
  const onSubmit = async (data) => {
    
      const loginResult = await handleLogin(data);
      if (loginResult) {
        navigate('/user/dashboard', { replace: true });
      }
    
  };
  const [auth, setAuth] = useState(false);

 
  const handleLogin = async (data) => {
    const form=new FormData()
    form.append("username",data.phone_number)
    form.append("password",data.password)
    try {
      setLoading(true);
      const response = await axios.post("https://smartapartmentserver.onrender.com/auth/login", form);
      if(response){
        console.log(response);
      setAuth(true);
      setToken(response.data.access_token);
      console.log(auth);
      Cookies.set("token", response.data.access_token);
      Cookies.set("auth",true);
      setloginSnackbar(true);
      setLoading(false);
      return response;
      }
      
    } catch (error) {
      setLoading(false)
      console.log(error);
      setErrorSnackbar(true);
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
          color='secondary'
          disableDropdown
          forceCallingCode
          error={!!errors.phone_number }
          inputRef={ref}
          helperText={errors.phone_number&&   "Phone Number Is Required"}
          {...field}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
           
          }}
          inputProps={{
            maxLength:11,
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
            helperText={errors.password&&"Password is Required"}
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
            }}

                        
              
          />
       
        )}
      />
      {/* <Typography>      
        <Button variant='text' size='small' style={{ margin:0 }}>
                Sign In with QR
      </Button>
      </Typography> */}
      <Box textAlign="center" position='relative'>
      <Button
  className={classes.loginBtn}
  
  variant="contained"
  type="submit"
  disabled={loading}
>
  {loading ? (
    <CircularProgress size={24} style={{color:'orange'}}/>
  ) : (
    <>
      Login
    </>
  )}
</Button>

      </Box>
     
    </form>
     <Snackbar color='error' anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
     open={errorSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}>
   <Alert style={{textAlign:'center'}} onClose={handleSnackbarClose} severity="warning">
            Invalid Phone Number Or Password
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


const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { vertical, horizontal } = {
    vertical: "top",
    horizontal: "right",
  };
  const handleClose = () => {
    console.log("came close");
    setOpen(false);
  };

  const handleOpen = () => {
    console.log("came here ");
    setOpen(true);
  };

  return (
   

    <div className={classes.main}>
      <Container maxWidth="sm">
        <h1 style={{textAlign:"center"}}>Sign In</h1>
        <Typography
          className={classes.top}
          variant="h5"
          align="center"
          sx={{ mt: 5 }}
        >
          Enter your Username and Password
        </Typography>

        <Container disableGutters maxWidth={false} className={classes.root}>
          <LoginForm handleOpen={handleOpen}/>
        </Container>
      </Container>
     
    </div>
    
  );
};

export default Login;
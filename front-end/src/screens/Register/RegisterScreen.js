import React, { useState} from "react";
import { MuiTelInput } from 'mui-tel-input';
import "./register.css";
import {PersonOutlined,Cake, EmailOutlined, PasswordOutlined, BadgeOutlined, PhoneOutlined,VisibilityOutlined,VisibilityOffOutlined, Padding, HomeMaxOutlined, HouseOutlined, MapsHomeWorkOutlined, Person2Outlined} from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordChecklist from 'react-password-checklist';
import IconButton from '@mui/material/IconButton';
import FaceForm from "./FaceForm";
import { Link } from "react-router-dom";
import {
  
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import CameraView from "./FaceForm";

const useStyles = makeStyles((theme) => ({
 
  button: {
    marginRight: theme.spacing(1),
  },
  textField:{
    backgroundColor:"whitesmoke",
    notchedOutline: {
      px: 10,
    },
    fontFamily:"Poppins",
    fontSize:"14px"
  },
  root: {
    "& .MuiStepIcon-active": { color: "black" },
    "& .MuiStepIcon-completed": { color: "green" },
    "& .Mui-disabled .MuiStepIcon-root": { color: "grey" },
  },
  
}));

function getSteps() {
  return [
    "Basic Information",
    "Face",
  ];
}


const BasicForm = ({handleValidationChange}) => {
  const { control,formState: { errors },setValue,getValues,setError,clearErrors } = useFormContext();
  const classes=useStyles();
  const error={
    fullName:"Full Name is Required",
    userName:"UserName is Required",

    dob:"Date Of Birth is Required",
    email:"Email Id is Required",
    phoneNumber:"Phone Number is Required",
    aadharNumber:"Aadhar Number is Required",
    password:"Password is Required",
    confirmPassword:"Passwords Should Match",
    flatno:"Flat Number Is Required"
  }
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFieldFocused, setPasswordFieldFocused] = useState(false);
  const[valid,setValid]=useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (field) => {
    const value = getValues(field);
    if (value === '') {
      setError(field, { type: 'required', message: `${field} is required` });
    } else {
      clearErrors(field);
    }
  };
  return (
    <>

      <Controller
        control={control}
        name="fullName"
        rules={{
          required:true,
        }}
        render={({ field:{ref,...field} }) => (
          <TextField
            
            id="fullname"
            label="Full Name"
            variant="outlined"
            fullWidth
            placeholder="Enter Your Full Name"
            error={!!errors.fullName }
            inputRef={ref}
            helperText={errors.fullName && `${error.fullName}`}
            margin="normal"
            {...field}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlined />
                </InputAdornment>
              ),
              className: classes.textField,

            }}

            />
        )}
      />
      
      <Controller
        control={control}
        name="Dob"
        rules={{
          required:true,
        }}
        render={({ field :{ref,...field}}) => (
          <TextField
            id="dob"
            type="date"
            label="Date of birth"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.Dob }
            inputRef={ref}
            helperText={errors.Dob && `${error.dob}`}
            {...field}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Cake />
                </InputAdornment>
              ),
              className: classes.textField,
                
            }}
          />
          
        )}
      />
      <Controller
        control={control}
        name="userName"
        rules={{
          required:true,
        }}
        render={({ field:{ref,...field} }) => (
          <TextField
            
            id="username"
            label="User Name"
            variant="outlined"
            fullWidth
            placeholder="Enter Your User Name"
            error={!!errors.userName }
            inputRef={ref}
            helperText={errors.userName && `${error.userName}`}
            margin="normal"
            {...field}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person2Outlined />
                </InputAdornment>
              ),
              className: classes.textField,

            }}

            />
        )}
      />
      <Controller
        control={control}
        name="emailAddress"
        rules={{
          required:true,
        }}
        render={({ field:{ref,...field} }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            type="email"
            error={!!errors.emailAddress }
            inputRef={ref}
            helperText={errors.emailAddress && `${error.email}`}
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
              className: classes.textField,
            
            }}
            

          />
        )}
      />
      <Controller
        control={control}
        name="flatno"
        rules={{
          required:true,
        }}
        render={({ field:{ref,...field} }) => (
          <TextField
            id="flatno"
            label="Flat No"
            variant="outlined"
            error={!!errors.flatno }
            inputRef={ref}
            helperText={errors.flatno && `${error.flatno}`}
            placeholder="Enter Your Flat Number"
            fullWidth
            margin="normal"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapsHomeWorkOutlined />
                </InputAdornment>
              ),
              className: classes.textField,
            
            }}
            

          />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          required:true,
          
        }}
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
          error={!!errors.phoneNumber }
          inputRef={ref}
          helperText={errors.phoneNumber?.message}
          {...field}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneOutlined />
              </InputAdornment>
            ),
            className: classes.textField,

          }}
          inputProps={{
            maxLength:15,
            style: { padding:'18.5px 0px' }
          }}
          defaultCountry="IN"
          
         />
        )}
      />
      <Controller
        control={control}
        name="aadharNumber"
        rules={{
          required:true,
          
        }}
        render={({ field:{ref,...field} }) => (
          <TextField
            id="aadhar-number"
            label="Aadhar Number"
            variant="outlined"
            placeholder="Enter Your Aadhar Number"
            fullWidth
            type="tel"
            margin="normal"
            error={!!errors.aadharNumber }
            inputRef={ref}
            helperText={errors.aadharNumber && `${error.aadharNumber}`}
            {...field}
            
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlined />
                </InputAdornment>
              ),
              className: classes.textField,

            }}
            inputProps={{
              maxLength: 12,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required:true,
          
        }}
        render={({ field :{ref,...field}}) => (
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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
              className: classes.textField,
            
            }}

            onBlur={() => setPasswordFieldFocused(false)}
              onChange={(e) => {
                field.onChange(e);
                validatePassword("password")
              }}
              onFocus={() => setPasswordFieldFocused(true)}            

          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required:"Required",
        }}
        render={({ field :{ref,...field}}) => (
          <TextField
            id="confirmpassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            placeholder="Confirm Password"
            fullWidth
            margin="normal"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordOutlined />
                </InputAdornment>
              ),
              className: classes.textField,

            }}
            onBlur={() => setPasswordFieldFocused(false)}
              onChange={(e) => {
                field.onChange(e);
                validatePassword("confirmPassword")
              }}
              onFocus={() => setPasswordFieldFocused(true)}            

          />
        )}
      />
      {passwordFieldFocused && 
      (<PasswordChecklist
        className="password-checklist-container"

          style={{
            display:"grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gridAutoRows:"60px",
            fontSize:"8px",
            paddingTop:"10px",
            paddingLeft:"20px",
           
        
          }}
          iconSize={
          "14px"
          }
          rules={['capital', 'match','specialChar', 'minLength', 'number']}
          minLength={8}
          value={getValues("password")}
          valueAgain={getValues("confirmPassword")}
          onChange={(isValid, errors) => {
            if (isValid) {
              setValid(true);
              console.log("Valid");
              handleValidationChange(true); 
            }
          }}
      
        />
      )}
    </>
  );
};



function getStepContent(step,handleValidationChange,handleCaptureImage,handleResetCapture) {
  switch (step) {
   case 0:
     return <BasicForm handleValidationChange={handleValidationChange}/>;
    case 1:
      return  <CameraView
      onCaptureImage={handleCaptureImage}
      onResetCapture={handleResetCapture}
    />;
    
    default:
      return "unknown step";
  }
}

const RegisterScreen = () => {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      Dob:"",
      emailAddress: "",
      flatno:"",
      userName:"",
      aadharNumber:"",
      phoneNumber:'',
      password:"",
      confirmPassword:"",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
 const c=useStyles();
 const [valid, setValid] = useState(false); 
 const [capturedImage, setCapturedImage] = useState(null);

 const handleCaptureImage = (imageData) => {
   setCapturedImage(imageData);
   console.log("From Register Screen",imageData);
 };

 const handleResetCapture = () => {
   setCapturedImage(null);
 };

  const handleValidationChange = (valid) => {
    setValid(valid);
  };
//   const handleNext = (data) => {
//     if (valid ) {
//     console.log(data);
//     if (activeStep === steps.length - 1) {
//       fetch("https://jsonplaceholder.typicode.com/comments")
//         .then((data) => data.json())
//         .then((res) => {
//           console.log(capturedImage);
//           setActiveStep(activeStep + 1);
//         });
//     } else {
//       setActiveStep(activeStep + 1);
//     }
//   }
// };
//Api Call 
const handleNext = async (data) => {
 if(valid){
 const formData={
     ...data,
   }

  if (activeStep === steps.length - 1) {
     formData = {
      ...formData,
      image: capturedImage,
    };

    try {
      // Make a POST request to your backend API
      const response = await fetch("https://user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        if (activeStep === steps.length - 1) {
          // If the last step, update the active step
          setActiveStep(activeStep + 1);
        }
      } else {
        console.error("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
};
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
    <header>
        <h1 style={{textAlign:"center"}}>Sign Up Page</h1>
    </header>
    <div className="Stepper-root">
      
      <Stepper  className={c.root} alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step  key={index} >
            <StepLabel className="StepLabel-label" >{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <>
        <Typography variant="h4" align="center" color="textPrimary" className="ThankYouMessage">
          Registered Successfully!
          
        </Typography>
        <div style={{display:'flex',alignItems:"center",justifyContent:'center'}}>
        <Link to='/login' className='login'>
            <Button variant="outlined" style={{backgroundColor:"black",color:"white",marginTop:'20px'}}>Click Here To Login</Button>
          </Link>
          </div>
        </>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            {getStepContent(activeStep,handleValidationChange,handleCaptureImage,handleResetCapture)}
            <div className="button-container">
            <Button
              className={`button ${activeStep === 0 ? 'hidden' : ''}`} 
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              className="button" 
              variant="contained"
              type="submit"
              style={{
                borderRadius: 5,
                backgroundColor: "black",
                color:"white"
               
            }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
    </div>
  );
};

export default RegisterScreen;

import React, { useState ,useRef,useEffect} from "react";
import { MuiTelInput } from 'mui-tel-input';
import "./register.css";
import {PersonOutlined,Cake, EmailOutlined, PasswordOutlined, BadgeOutlined, PhoneOutlined,VisibilityOutlined,VisibilityOffOutlined} from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordChecklist from 'react-password-checklist';
import IconButton from '@mui/material/IconButton';

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
    "& .Mui-disabled .MuiStepIcon-root": { color: "grey" }
  },
  
}));

function getSteps() {
  return [
    "Basic Information",
    "Face",
  ];
}


const BasicForm = () => {
  const { control,formState: { errors },setValue,getValues,setError,clearErrors } = useFormContext();
  const classes=useStyles();
  const error={
    fullName:"Full Name is Required",
    dob:"Date Of Birth is Required",
    email:"Email Id is Required",
    phoneNumber:"Phone Number is Required",
    aadharNumber:"Aadhar Number is Required",
    password:"Password is Required",
    confirmPassword:"Passwords Should Match"
  }
  const [showPassword, setShowPassword] = useState(false);

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
        name="phoneNumber"
        rules={{
          required:true,
          
        }}
        render={({ field :{ref,...field}}) => (
          <MuiTelInput
          
          id="phone-number"
          label="Phone Number" 
          variant="outlined"
          placeholder="Enter Your Phone Number"
          fullWidth
          margin="normal"
          error={!!errors.phoneNumber }
          inputRef={ref}
          helperText={errors.phoneNumber && `${error.phoneNumber}`}
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
            maxLength: 15,
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

            onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e);
                // Manually trigger validation on change
                validatePassword("password")
              }}
              
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
            onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e);
                // Manually trigger validation on change
                validatePassword("confirmPassword")
              }}
            
          />
        )}
      />
      <PasswordChecklist
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3, 2fr) ",
            gridAutoRows:"60px",
            fontSize:"8px",
            paddingTop:"10px",
            paddingLeft:"20px"
          }}
          iconSize={
          "14px"
          }
          rules={['capital', 'match','specialChar', 'minLength', 'number']}
          minLength={8}
          value={getValues("password")}
          valueAgain={getValues("confirmPassword")}
          onChange={(isValid, errors) => {
            if (!isValid) {
              const errorMessages = errors.join(', ');
              setValue('password', getValues('password'), {
                shouldDirty: true,
              });
              setError('password', {
                type: 'manual',
                message:errorMessages,
              });
            } else {
              clearErrors('password');
            }
          }}
        />
    </>
  );
};

const CameraView = () => {
  const videoRef = useRef(null);
  let stream = null;

  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="camera-container">
    <div className="camera-view">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={320} 
        height={240}
      
      />
    </div>
    </div>
  );
};

const FaceForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        
        control={control}
        name="cameraView"
        render={({ field }) => <CameraView />}
      />
    </>
  );
};


// const QRForm = () => {
//   // const { control } = useFormContext();
//   return (
//     <>
     
//     </>
//   );
// };

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <FaceForm />;
    
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
      aadharNumber:"",
      phoneNumber: "",
      password:"",
      confirmPassword:"",
    },
  });
  const {formState,setError} = useForm();

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
 const c=useStyles();
  const handleNext = (data) => {

    console.log(data);
    // if(formState.isValid ){
    //   console.log("Password matching");
    // }
    // else{
    //   setError('password', {
    //     type: 'manual',
    //     message:"Password is Weak",
    //   });
    //   return;
    // }
    if (activeStep === steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
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
        <Typography variant="h3" align="center" className="ThankYouMessage">
          Registered Successfully!
          <Button>Click here to Login</Button>
        </Typography>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleNext)}>
            {getStepContent(activeStep)}
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
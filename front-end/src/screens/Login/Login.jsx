import React, { useState, useRef, useEffect } from "react";

import {
  Container,
  TextField,
  Typography,
  Button,
  Modal,
  Box,
} from "@material-ui/core";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  PersonOutlined,
  EmailOutlined,
  PasswordOutlined,
  PhoneOutlined,
} from "@mui/icons-material";

import CameraIcon from "@mui/icons-material/Camera";
import InputAdornment from "@mui/material/InputAdornment";

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
    backgroundColor: "#4F4F4F",
    "&:hover": {
      backgroundColor: "black", // Change the background color on hover
      color: "white", // Change the text color on hover
    },
  },
  formControl: {
    width: "75%",
  },
  FaceForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

function VisitorLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="FullName"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
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
              className: classes.textField,
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
          required: true,
          maxLength: 12,
        }}
        render={({ field: { ref, ...field } }) => (
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
              className: classes.textField,
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
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
              className: classes.textField,
            }}
            error={!!errors.email}
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
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
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
              className: classes.textField,
            }}
            error={!!errors.password}
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

const CameraView = ({ capturePhoto, capturedPhoto }) => {
  const videoRef = useRef(null);
  let stream = null;
  const classes = useStyles();
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
  }, [capturedPhoto]);

  return (
    <div className={classes.FaceForm}>
      <div className="camera-view">
        {capturedPhoto ? (
          <img src={capturedPhoto} width={320} height={240} alt="Captured" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width={320}
            height={240}
          />
        )}
      </div>
      <Button onClick={capturePhoto}>
        <CameraIcon />
      </Button>
    </div>
  );
};

const FaceForm = () => {
  const { control, handleSubmit } = useForm();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const classes = useStyles();
  const capturePhoto = () => {
    const videoRef = document.querySelector("video"); // Get the video element
    if (videoRef) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.videoWidth;
      canvas.height = videoRef.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg"); // You can use other formats here

      setCapturedPhoto(dataUrl);
    }
  };

  const onSubmit = (data) => {
    // Handle the form submission
    console.log("Form data:", data);
  };

  const onCancel = () => {
    setCapturedPhoto(null); // Clear the captured photo
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="cameraView"
        render={({ field }) => (
          <CameraView
            capturePhoto={capturePhoto}
            capturedPhoto={capturedPhoto}
          />
        )}
      />
      <input type="hidden" name="photo" value={capturedPhoto} />
      {capturedPhoto ? (
        <Box textAlign="center">
          <Button variant="contained" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      ) : null}
    </form>
  );
};

const FacialLogin = (props) => {
  return (
    <React.Fragment>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 350,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <FaceForm />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const Login = () => {
  const classes = useStyles();
  const [value, setValue] = useState("user");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={classes.main}>
      <Container maxWidth="sm">
        <Typography align="center">
          <h1>Sign In</h1>
        </Typography>
        <Typography
          className={classes.top}
          variant="h5"
          align="center"
          sx={{ mt: 5 }}
        >
          Enter your Username and Password
        </Typography>

        <Container disableGutters maxWidth={false} className={classes.root}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="Tab List" centered>
              <Tab label="User" value="user" />
              <Tab label="Visitor" value="visitor" />
            </TabList>
            <TabPanel value="user">
              <Container align="center" disableGutters maxWidth={false}>
                <LoginForm />
                <Typography
                  className={classes.top}
                  variant="h5"
                  align="center"
                  sx={{ mt: 10 }}
                >
                  OR
                </Typography>
                <Button onClick={handleOpen}>
                  Login with Facial Recognition{" "}
                </Button>
                <FacialLogin open={open} handleClose={handleClose} />
              </Container>
            </TabPanel>
            <TabPanel value="visitor">
              <Container disableGutters maxWidth={false} align="center">
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

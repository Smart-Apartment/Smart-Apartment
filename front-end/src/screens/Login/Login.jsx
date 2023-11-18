import React, { useContext, useState } from "react";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import { PasswordOutlined, Person2Outlined } from "@mui/icons-material";
import { AuthContext, useAuth } from "./AuthContext";
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

let Data = {
  15: ["Ajay", "Kannan"],
  16: ["saravana"],
  68: ["arun", "surendar"],
};

function LoginForm() {
  const { handleLogin, userIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [flatUser, setFlatUser] = useState([]);
  const classes = useStyles();
  const onSubmit = (data) => {
    console.log(data.name);
    if (handleLogin(data)) {
      navigate("/visitor  ");
    }
    // Handle form submission here
  };

  const fetchData = async (flatNumber) => {
    //     // You can make your API request here and update the data accordingly
    // const response = await fetch(`your-api-url/${flatNumber}`);
    // const data = await response.json();

    // Update the form data with the fetched data
    setValue("flatno", flatNumber);
    if (Data[flatNumber]) setFlatUser(Data[flatNumber]);
    else setFlatUser([]);
  };

  // Handle text input change and trigger the data fetch
  const handleFlatNumberChange = (e) => {
    const flatNumber = e.target.value;
    fetchData(flatNumber);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formControl}>
      <Controller
        name="flatno"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            label="Flat No"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            placeholder="Enter your Flat Number"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapsHomeWorkOutlinedIcon />
                </InputAdornment>
              ),
              className: classes.textField,
            }}
            inputRef={ref}
            error={!!errors.flatno}
            helperText={errors.flatno && "Flat Number Is Required"}
            onChange={handleFlatNumberChange}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
          <FormControl>
            <InputLabel shrink id="demo-simple-select-helper-label">
              Name
            </InputLabel>
            <Select
              notched={true}
              label="Name"
              variant="outlined"
              {...field}
              style={{ backgroundColor: "whitesmoke" }}
              startAdornment={
                <InputAdornment position="start">
                  <Person2Outlined />
                </InputAdornment>
              }
            >
              <MenuItem value="">
                <em>Choose the Name</em>
              </MenuItem>
              {flatUser.map((names) => (
                <MenuItem key={names} value={names}>
                  {names}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      <Box textAlign="center">
        <Button
          className={classes.loginBtn}
          variant="contained"
          type="submit"
          color="primary"
        >
          Login
        </Button>
      </Box>
    </form>
  );
}

// const CameraView = ({ capturePhoto, capturedPhoto }) => {
//   const videoRef = useRef(null);
//   let stream = null;
//   const classes = useStyles();
//   const startCamera = async () => {
//     try {
//       stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   useEffect(() => {
//     startCamera();

//     return () => {
//       stopCamera();
//     };
//   }, [capturedPhoto]);

//   return (
//     <div className={classes.FaceForm}>
//       <div className="camera-view">
//         {capturedPhoto ? (
//           <img src={capturedPhoto} width={320} height={240} alt="Captured" />
//         ) : (
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             muted
//             width={320}
//             height={240}
//           />
//         )}
//       </div>
//       <Button onClick={capturePhoto}>
//         <CameraIcon />
//       </Button>
//     </div>
//   );
// };

// const FaceForm = () => {
//   const { control, handleSubmit } = useForm();
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const classes = useStyles();
//   const capturePhoto = () => {
//     const videoRef = document.querySelector("video"); // Get the video element
//     if (videoRef) {
//       const canvas = document.createElement("canvas");
//       canvas.width = videoRef.videoWidth;
//       canvas.height = videoRef.videoHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
//       const dataUrl = canvas.toDataURL("image/jpeg"); // You can use other formats here

//       setCapturedPhoto(dataUrl);
//     }
//   };

//   const onSubmit = (data) => {
//     // Handle the form submission
//     console.log("Form data:", data);
//   };

//   const onCancel = () => {
//     setCapturedPhoto(null); // Clear the captured photo
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         control={control}
//         name="cameraView"
//         render={({ field }) => (
//           <CameraView
//             capturePhoto={capturePhoto}
//             capturedPhoto={capturedPhoto}
//           />
//         )}
//       />
//       <input type="hidden" name="photo" value={capturedPhoto} />
//       {capturedPhoto ? (
//         <Box textAlign="center">
//           <Button variant="contained" type="button" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button
//             style={{ marginLeft: "10px" }}
//             variant="contained"
//             color="primary"
//             type="submit"
//           >
//             Submit
//           </Button>
//         </Box>
//       ) : null}
//     </form>
//   );
// };

// const FacialLogin = (props) => {

// for setup before component

// const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
// <FacialLogin open={open} handleClose={handleClose} />
//  <Button onClick={handleOpen}>Login with Facial Recognition </Button>

//   return (
//     <React.Fragment>
//       <Modal
//         open={props.open}
//         onClose={props.handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 500,
//             height: 350,
//             bgcolor: "background.paper",
//             border: "2px solid #000",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <FaceForm />
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// };

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Container maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
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

export default Login;

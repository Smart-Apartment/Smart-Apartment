import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Controller, useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { PersonOutlined, PhoneOutlined } from "@mui/icons-material";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { MuiTelInput } from "mui-tel-input";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#fbfbfb",
    height: "100vh",
  },
  form: {
    backgroundColor: "#fff",
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
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
          <MuiTelInput
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            error={!!errors.phoneNumber}
            inputRef={ref}
            helperText={errors.phoneNumber && "Phone Number is Required"}
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
        name="Date"
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            id="Date"
            type="date"
            label="Date"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.Date}
            inputRef={ref}
            helperText={errors.Date && "Date is Required"}
            {...field}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthOutlinedIcon />
                </InputAdornment>
              ),
              className: classes.textField,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="Time"
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            id="Time"
            type="time"
            label="Time"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.Time}
            inputRef={ref}
            helperText={errors.Time && "Time is Required"}
            {...field}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeOutlinedIcon />
                </InputAdornment>
              ),
              className: classes.textField,
            }}
          />
        )}
      />

      <Controller
        name="Purpose"
        control={control}
        defaultValue=""
        render={({ field: { ref, ...field } }) => (
          <TextField
            label="Purpose of visit"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            maxRows={5}
            margin="normal"
            type="text"
            placeholder="Purpose of visit"
            {...field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HelpOutlineOutlinedIcon />
                </InputAdornment>
              ),
              className: classes.textField,
            }}
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
          Book
        </Button>
      </Box>
    </form>
  );
}
const Visitor = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <CssBaseline />
      <Container
        style={{ paddingTop: "12vh" }}
        maxWidth={"sm"}
        component={Box}
        p={3}
      >
        <Typography style={{ paddingTop: "3vh" }} variant="h4" align="center">
          Fill the <span style={{ color: "#4f4f4f" }}>FORM</span> below
        </Typography>
        <Paper component={Box} p={2} className={classes.form}>
          <Container>
            <VisitorLogin />
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default Visitor;

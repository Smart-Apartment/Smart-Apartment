import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import QRCode from "qrcode.react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
  },
  form: {
    backgroundColor: "black",
  },
  textField: {
    backgroundColor: "white",
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
    backgroundColor: "black",
    color:'orange',
    "&:hover": {
      backgroundColor: "grey",
      color: "yellow",
    },
  },
}));

function VisitorLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const id = uuid();
  const classes = useStyles();
  const [showQR, setShowQR] = useState(false);
  const [data, setData] = useState([]);
  const [qrvalue, setQrValue] = useState([]);
  const [downloadLink, setDownloadLink] = useState("");
  const onSubmit = (data) => {
    handleGenerateQRCode(data);
  };
  const handleGenerateQRCode = (data) => {
    const qrTime = new Date().toLocaleTimeString();
    setQrValue({ ...data, qrTime, id });
    handleShowQR();
    const canvas = document.getElementById("qrcode-canvas");
    if (canvas) {
      const qrCodeDataURL = canvas.toDataURL("image/png");
      setDownloadLink(qrCodeDataURL);
    } else {
      console.error("Canvas not found");
    }
  };

  const handleDownloadQRCode = () => {
    if (downloadLink) {
      const downloadLinkElement = document.createElement("a");
      downloadLinkElement.href = downloadLink;
      downloadLinkElement.download = "qrcode.png";
      document.body.appendChild(downloadLinkElement);
      downloadLinkElement.click();
      document.body.removeChild(downloadLinkElement);
    }
  };

  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
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
              maxLength: 15,
              style: { padding: "18.5px 0px" },
            }}
            defaultCountry="IN"
          />
        )}
      />

      <Controller
        control={control}
        name="Date"
        defaultValue=""
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
        defaultValue=""
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
            minRows={5}
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
        >
          Book
        </Button>
      </Box>
      <Dialog style={{ zIndex: "10000"}} open={showQR} onClose={handleCloseQR}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <QRCode
            id="qrcode-canvas"
            value={JSON.stringify(qrvalue)}
            size={240}
            level={"H"}
            includeMargin={true}
          />
        </DialogContent>
        <DialogContent>
          <Button
            variant="contained"
            style={{margin:'0 auto', backgroundColor: "black", color: "white" }}
            onClick={handleDownloadQRCode}
          >
            Download QR
          </Button>
        </DialogContent>
        <DialogActions>
          <Button className="button" onClick={handleCloseQR}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
       
        <Paper component={Box} p={2} className={classes.form}>
          <Container>
          <Typography style={{ paddingTop: "3vh",color:'white' }} variant="h4" align="center">
          Fill Your <span style={{ color: "orange" }}>Details</span> below
        </Typography>
            <VisitorLogin />
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default Visitor;

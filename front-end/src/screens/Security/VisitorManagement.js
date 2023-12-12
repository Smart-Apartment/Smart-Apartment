import React, { useState,useContext } from 'react';
import Button from '@material-ui/core/Button';
import { NorthEast,QrCodeScannerSharp,SouthWest } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Typography,Grid } from '@material-ui/core';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import './qr.css'
import QrReader from 'react-qr-scanner'
import { SidebarContext } from '../Residents/SidebarContext';
import axios from 'axios';
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    position:"relative",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
    marginTop:"20px",
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },

  button: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
    color: 'orange',
    width: '300px',
    height: '150px',    
    [theme.breakpoints.up('sm')]: {
      width: '300px', 
    },
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'yellow',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:2000
  },
  
    paper: {
      display: 'flex',
      flexDirection: 'column',
      textAlign:'center',
      position: 'absolute',
      alignItems:"center",
      justifyContent:"center",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      height: 400,
      borderRadius: '10px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      
    },
    formTextField: {
      margin: theme.spacing(1),
      width: '100%',
    },
    checkInButton: {
      width: '150px',
      marginTop: theme.spacing(2),
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
      padding: theme.spacing(2),
      width:'600px',
      },
    icon: {
      marginRight: theme.spacing(1),
    },
}));

export default function VisitorManagementSystem() {
  const classes = useStyles();
  const [qrscan,setQrscan]=useState(false);
  const [open, setOpen] = useState(false);
  const [hasProfileDetails, setHasProfileDetails] = useState(false);
  const [visitorDetails, setVisitorDetails] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [checkInSnackbar, setCheckInSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [usercheckInSnackbar, setUserCheckInSnackbar] = useState(false);

  const { menuCollapse } = useContext(SidebarContext);
  const[checkIn,setCheckIn]=useState(false);
  const[error,setError]=useState("");
  const handleScan = (data) => {
    if (data) {
      const qrData = JSON.parse(data.text);
      console.log(JSON.parse(data.text));
      if (qrData.phone_number && qrData.features) {
        const phoneNumber = qrData.phone_number;
        const features = qrData.features;
  
        const autoCheckInData = {
          phoneNumber,
          features,
        };
  
        handleAutoCheckIn(autoCheckInData);
      }
        else{
      const details = parseDetails(data);
      if (details) {
        setHasProfileDetails(true);
        setVisitorDetails(details);
        console.log(details);
      } else {
        setHasProfileDetails(false);
        console.error('Invalid QR code data');
      }
    }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCheckInSnackbar(false);
    setErrorSnackbar(false);
  };
  const parseDetails = (data) => {
    try {
      console.log(JSON.stringify(data));
      const parsedData = JSON.parse(data.text); 
      const requiredFields = ['FullName', 'flatno', 'phoneNumber', 'Date', 'Time', 'Purpose','qrTime','id'];
  
      const isValidData = requiredFields.every(field => parsedData.hasOwnProperty(field));
  
      if (isValidData) {
        return parsedData;
      } else {
        console.error('Missing required fields in QR code data');
      }

    } catch (error) {
      console.log(JSON.stringify(data));

      console.error('Error parsing QR code data:', error);
    }
    return null;
  };
  const handleBack=()=>{
    setQrscan(false);
  }
  const handleError = (err) => {
    console.error(err);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHasProfileDetails(false);
    setVisitorDetails(null);
  };
  const handleIn=()=>{
   
      setCheckIn(true);
      setQrscan(true);
  }
  const handleOut=()=>{
    setCheckIn(false);
    setQrscan(true);
  
}
  const handleViewProfile = () => {
    setOpen(false);
    setHasProfileDetails(false);
    setProfileOpen(true);
  };
  const handleAutoCheckIn = async (data) => {
    try {
  
      
      const response = await axios.post('https://smartapartmentserver.onrender.com/users/auto-check-in',data); 
  
      if (response.status===200) {
        const responseData = await response.data;
        console.log('Check-in successful:', responseData);
  
        setOpen(false);
        setUserCheckInSnackbar(true);
      } else {
        console.error('Check-in failed:', response.statusText);
  
        
      }
    } catch (error) {
      console.error('Error during check-in:', error);
      console.log(error.response.data.detail);
      setError(error.response.data.detail);
      setErrorSnackbar(true);
    }
  };
  const handleCheckIn = async () => {
    try {
  
      const checkInData = {
        ...visitorDetails,
      };
  
      const response = await axios.post('https://smartapartmentserver.onrender.com/visitor/check-in',checkInData); 
  
      if (response.status===200) {
        const responseData = await response.data;
        console.log('Check-in successful:', responseData);
  
        setProfileOpen(false);
        setHasProfileDetails(false);
        setCheckInSnackbar(true);
      } else {
        console.error('Check-in failed:', response.statusText);
  
        
      }
    } catch (error) {
      console.error('Error during check-in:', error);
      console.log(error.response.data.detail);
      setError(error.response.data.detail);
      setErrorSnackbar(true);
      setProfileOpen(false);
      setHasProfileDetails(false);
    }
  };
  const handleCheckOut = async () => {
    try {
  
      const checkOutData = {
        ...visitorDetails,
      };
  
      const response = await axios.post('https://smartapartmentserver.onrender.com/visitor/check-out',checkOutData); 
  
      if (response.status===200) {
        const responseData = await response.data;
        console.log('Check-out successful:', responseData);
  
        setProfileOpen(false);
        setHasProfileDetails(false);
        setCheckInSnackbar(true);
      } else {
        console.error('Check-out failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during check-out:', error);
      setError(error.response.data.detail);
      setErrorSnackbar(true);
      setProfileOpen(false);
      setHasProfileDetails(false);
        }
  };
  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"50px",color:"black",zIndex:"0"}}>

    <div className={classes.root}>
      <h1>VISITOR MANAGEMENT </h1>
      <p>Select any of the options</p>
      {!qrscan ?(
       <div className={classes.buttonContainer}>
       <Button
         variant="contained"
         size="large"
         id="1"
         className={classes.button}
         startIcon={<NorthEast />}
         onClick={handleIn}
       >
         Check In
       </Button>
     
       <Button
         id="2"
         variant="contained"
         className={classes.button}
         endIcon={<SouthWest />}
         onClick={handleOut}
       >
         Check Out
       </Button>
     </div>
      ) : (
        <>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<QrCodeScannerSharp />}
        onClick={handleOpen}
      >
        QR SCAN
      </Button>
      <Button variant='contained' style={{backgroundColor:"black",color:'orange'}} onClick={handleBack}>Back</Button>
      </>
      )}
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  className={classes.modal}
  style={{zIndex:2000}}
>
  <div className={classes.paper}>
    <Typography>Scan Your QR Code</Typography>
    <div className="qr-scanner-container">
    <div className="qr-scanner-border top" />

      <div className="qr-scanner-border right" />
      <div className="qr-scanner-border bottom" />

      <div className="qr-scanner-border left" />

      <QrReader
        onScan={handleScan}
        onError={handleError}
        style={{ height:'300px', width:"300px",objectFit:"cover" }}
        resolution={600} 
        constraints={{ video: { facingMode: 'environment' } }}
      />
    </div>
    {hasProfileDetails && (
            <Button
              variant="contained"
              
              style={{ width: '150px',backgroundColor:'black',color:'orange' }}
              onClick={handleViewProfile}
            >
              View Profile
            </Button>
      )}
  </div>

  
</Modal>
<Modal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        style={{zIndex:2000}}
      >
        <div className={classes.paper} style={{width:"600px"}}>
        {visitorDetails && (
             <div className={classes.profileContainer}>
             <Typography variant="h5" id="simple-modal-title">
             {checkIn===false ? "Check out" :"Check in"} Visitor
             </Typography>
             <Typography variant="body1" id="simple-modal-description">
               You are required to {checkIn===false ? "check out" :"check in"} the visitor
             </Typography>
             <Grid container spacing={4} style={{width:"600px",padding:'10px'}}>
            <Grid item xs={6}>
              <Typography style={{textAlign:"center"}}>
                <strong>Name:</strong> {visitorDetails.FullName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Flat Number:</strong> {visitorDetails.flatno}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <strong>Phone Number:</strong> {visitorDetails.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{textAlign:"center"}}>
                <strong >Date:</strong> {visitorDetails.Date}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography >
                <strong>Time:</strong> {visitorDetails.Time}
              </Typography>
            </Grid>
           { checkIn===false && (
            <Grid item xs={6}>
              <Typography >
                <strong>Check In Time:</strong> {visitorDetails.check_in_time}
              </Typography>
            </Grid> )}

            <Grid item xs={12}>
              <Typography >
                <strong>Purpose:</strong> {visitorDetails.Purpose}
              </Typography>
            </Grid>
          </Grid>
            {checkIn?(
             <Button variant='contained' style={{backgroundColor:"black",color:"orange"}} onClick={handleCheckIn} className={classes.checkInButton}>
            Check In
            </Button>):( <Button variant='contained' style={{backgroundColor:"black",color:"orange"}} onClick={handleCheckOut} className={classes.checkInButton}>
            Check Out
            </Button>)}
        
           </div>
        )}
        </div>
      </Modal>
      <Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={errorSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="warning">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar  anchorOrigin={{ vertical: 'top', horizontal:'right' }}
          open={checkInSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose}  severity="success">
          Visitor Checked {checkIn ? "In" :"Out"} Successfully 
        </Alert>
      </Snackbar>
      <Snackbar  anchorOrigin={{ vertical: 'top', horizontal:'right' }}
          open={usercheckInSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose}  severity="success">
          Flat User Checked {checkIn ? "In" :"Out"} Successfully 
        </Alert>
      </Snackbar>
      </div>
      </div>
  );
}

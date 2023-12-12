import {React,useContext,useState,useEffect} from 'react';
import { Card, CardContent, Typography, Button, Box, InputLabel } from '@material-ui/core';
import { SidebarContext } from '../Residents/SidebarContext';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from 'axios';
import Chip from '@mui/material/Chip'
import '../Residents/Test.css'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  accept: {
    '&:hover': {
      backgroundColor: 'green', 
    },
    margin: "10px" ,backgroundColor:"black",color:"white",
  },
  decline:{
    '&:hover': {
      backgroundColor: 'red', 
    },
    margin: "10px" ,backgroundColor:"brown",color:"white",
  }
}));
export const AppointmentCard = ({  appointment, showButtons=false,onAccept, onDecline  }) => {
  const classes=useStyles();
  const handleAccept = () => {

    onAccept(appointment.id);
    
  };
 
  const handleDecline = () => {

    onDecline(appointment.id);
  };
  let statusColor;
  switch (appointment.status) {
    case 'Accepted':
      statusColor = 'green';
      break;
    case 'Pending':
      statusColor = 'rgb(170, 68, 0)'
      break;
    case 'Declined':
      statusColor = 'red';
      break;
    default:
      statusColor = 'black';
  }

  const detailsLabels = {
    date: 'Date',
    time:"Time",
    position:"Type",
    description: 'Description',
    severity:"Severity"
  };
  const renderStatusChip = (status) => {
    switch (status) {
      case "Accepted":
        return <Chip label="Confirmed" size='small' color='success' variant="outlined" />;
      case "Completed":
        return <Chip label="Finished" size='small' color="success" variant="outlined" />;
      case "Declined":
        return <Chip label="Declined" size='small' color="error" variant="outlined" />;
      default:
        return <Chip label="Pending" size='small' color="primary" variant="outlined" />;
    }
  };
  return (
      <Card variant='elevation' elevation={3} style={{ maxWidth: '80%', marginBottom: '20px' }}>
        <CardContent>
        <div >{renderStatusChip(appointment.status)}</div>        
        <Typography variant='h5' style={{color:'orange'}}>Name: {appointment.name}</Typography>

        {Object.keys(detailsLabels).map((key) => (
  <Typography key={key} style={{ color: 'white' }}>
    {detailsLabels[key] === "Severity" ? (
      <>
        {detailsLabels[key]}:
        {appointment[key] === "High" ? (
          <span style={{ color: 'red' }}>{appointment[key]}</span>
        ) : appointment[key] === "Medium" ? (
          <span style={{ color: 'yellow' }}>{appointment[key]}</span>
        ) : (
          <span style={{ color: 'green' }}>{appointment[key]}</span>
        )}
      </>
    ) : (
      <>
        {detailsLabels[key]}: {appointment[key]}
      </>
    )}
  </Typography>
))}
          {showButtons && (
          <Box display="flex" >
            <Button className={classes.accept} variant="contained" size='small'   onClick={handleAccept}>
              Accept
            </Button>
            <Button  className={classes.decline} variant="contained" size='small' onClick={handleDecline}>
              Decline
            </Button>
          </Box>
        )}
        </CardContent>
        
        
      </Card>
  );
};

const Bookings = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const { menuCollapse } = useContext(SidebarContext);
  const [acceptSnackbarOpen, setAcceptSnackbarOpen] = useState(false);
  const [declineSnackbarOpen, setDeclineSnackbarOpen] = useState(false);
  const[message,setMessage]=useState("");
  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    try {
      const response = await axios.get('https://smartapartmentserver.onrender.com/complaints/appointments');
      let pendingAppointments1 = response.data.filter(appointment => appointment.status === 'Pending');

      pendingAppointments1 = pendingAppointments1.sort((a, b) => {
        const severityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      });

      setPendingAppointments(pendingAppointments1);
      console.log(pendingAppointments1);
    } catch (error) {
      console.error('Error fetching pending appointments:', error);
    }
  };

  const handleAccept = async (appointmentId) => {
    console.log(appointmentId);
    try{
      const response = await axios.get(`https://smartapartmentserver.onrender.com/complaints/appointments/${appointmentId}`);
      const newAppointment = response.data;
  
      const acceptedAppointmentsResponse = await axios.get('https://smartapartmentserver.onrender.com/complaints/appointments');
      const acceptedAppointments = acceptedAppointmentsResponse.data.filter(appointment => appointment.status === 'Accepted');
  
      const appointmentsWithSameDate = acceptedAppointments.filter(appointment => {
        const newAppointmentDate = new Date(newAppointment.date);
        const existingAppointmentDate = new Date(appointment.date);
        return (
          newAppointmentDate.getDate() === existingAppointmentDate.getDate() &&
          newAppointmentDate.getMonth() === existingAppointmentDate.getMonth() &&
          newAppointmentDate.getFullYear() === existingAppointmentDate.getFullYear()
        );
      });
  
      const hasAppointmentWithSameDateTime = acceptedAppointments.some(existingAppointment => {
        const existingAppointmentDateTime = new Date(`2000-01-01 ${existingAppointment.time}`);
        const newAppointmentDateTime = new Date(`2000-01-01 ${newAppointment.time}`);
        console.log(existingAppointmentDateTime,newAppointmentDateTime);
        return existingAppointmentDateTime.getTime() === newAppointmentDateTime.getTime();
      });
    if (!hasAppointmentWithSameDateTime) {

      if (appointmentsWithSameDate.length < 2) {
        console.log(appointmentId);
        await axios.put(`https://smartapartmentserver.onrender.com/complaints/appointments/accept/${appointmentId}`);
        setMessage("Appointment Accepted")
        setAcceptSnackbarOpen(true);
        fetchPendingAppointments();
      } else {
        setMessage('Cannot accept more than Two Appointments on the same date.');
        setDeclineSnackbarOpen(true);
        console.log('Cannot accept more than two appointments on the same date.');
      }
    }
    else {
      setMessage('Cannot accept more than one appointment at the same date and time.');
      setDeclineSnackbarOpen(true);
      console.log('Cannot accept more than one appointment at the same date and time.');
    }}
    catch(e){
      console.error(e);
    }
  };
  

  const handleDecline = async (appointmentId) => {
    try {
      await axios.put(`https://smartapartmentserver.onrender.com/complaints/appointments/decline/${appointmentId}`);
      setMessage("Appointment Declined")
      setDeclineSnackbarOpen(true);
      fetchPendingAppointments();
    } catch (error) {
      console.error('Error declining appointment:', error);
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAcceptSnackbarOpen(false);
    setDeclineSnackbarOpen(false);
  };
  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}`} style={{ marginTop: "50px", color: "black", zIndex: "0" }}>
      {pendingAppointments.length > 0 ? (
        pendingAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            showButtons={true}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ))
      ) : (
       <> <h2 style={{color:'white'}}>No New </h2><h2 style={{color:"orange"}}>Complaints  </h2></>
      )}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={acceptSnackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={declineSnackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
  
};

export default Bookings;


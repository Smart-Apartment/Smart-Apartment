import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Container, Box, Paper, Chip } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SidebarContext } from "./SidebarContext";


const BookingCard = (props) => {
  let { name, date, position, provider_name,provider_phone, description, status, time } =
    props.cardData;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmSnackbarOpen, setConfirmSnackbarOpen] = useState(false);
  
  const renderStatusChip = (status) => {
    switch (status) {
      case "Accepted":
        return <Chip label="Confirmed" color="success" variant="contained" />;
      case "Completed":
        return <Chip label="Finished" color="success" variant="contained" />;
      case "Declined":
        return <Chip label="Failed" color="error" variant="contained" />;
      default:
        return <Chip label="Pending" color="error" variant="contained" />;
    }
  };

  function handleConfirm() {
    setShowConfirmationModal(true);
  }

  const handleComplete1 = async (newData) => {
    try {
      const response = await axios.post(
        `https://smartapartmentserver.onrender.com/complaints/appointments/completed/`,
        {
          ...newData,
          status: "Completed",
        }
      );
      response.then((res) => {
        setConfirmSnackbarOpen(true);
        let newData = props.cardData;
        newData["status"] = "finished";
        let findIndex = props.data.findIndex((i) => i.id === props.cardData.id);
        let newDataAll = props.data;
        newDataAll[findIndex] = newData;
        props.setData([...newDataAll]);
        console.log("Appointment created:", response.data);
      });
    } catch (error) {
      setShowConfirmationModal(false);
      console.error("Error creating appointment:", error);
    }
    setShowConfirmationModal(false);
  };
  const handleComplete = async (data) => {
    try {
      const newdata={
        ...data,
        user_id:'',
        serviceProvider_id:'',
        cost:'',
        year:new Date().getFullYear()
      }
      console.log(data);
      await axios.post(`https://smartapartmentserver.onrender.com/complaints/appointments/completed`,data);
      setConfirmSnackbarOpen(true);
      props.fetchAllAppointments();
      
    } catch (error) {
      console.error('Error declining appointment:', error);
      setShowConfirmationModal(false);
    }
    setShowConfirmationModal(false);

  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway" ) {
      return;
    }
    setConfirmSnackbarOpen(false);
  };

  return (
    <>
    <Card sx={{ maxWidth: 500,padding:'10px',marginBottom:'20px',backgroundColor:'grey' }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={confirmSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Successfully
        </Alert>
      </Snackbar>
      <CardContent>
        <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {position}
            </Typography>
          </div>
          <div>{renderStatusChip(status)}</div>
          </div>
          
        <TableContainer style={{backgroundColor:'grey',border:'1px solid white'}} component={Paper}>
          <Table aria-label="simple table">
            <TableHead > 
              <TableRow >
                <TableCell style={{color:'white'}}>Name</TableCell>
                <TableCell align="right">
                  {" "}
                  <Typography variant="body2" color="white">
                    {name}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              <TableRow >
                <TableCell style={{color:'white'}} component="th" scope="row">
                  Date
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Typography variant="body2" color="white">
                    {date}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{color:'white'}} component="th" scope="row">
                  Time
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Typography variant="body2" color="white">
                    {time}
                  </Typography>
                </TableCell>
              </TableRow>
              {provider_name &&(
                <>
              <TableRow>
                <TableCell style={{color:'white'}} component="th" scope="row">
                  Worker Name
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Typography variant="body2" color="white">
                    {provider_name}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
              <TableCell style={{color:'white'}} component="th" scope="row">
                Worker Phone
              </TableCell>
              <TableCell align="right">
                {" "}
                <Typography variant="body2" color="white">
                  {provider_phone}
                </Typography>
              </TableCell>
            </TableRow>
            </>
              )}
              <TableRow>
                <TableCell style={{color:'white'}} component="th" scope="row">
                  Description
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <Typography variant="body2" color="white">
                    {description}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </CardContent>
      <CardContent>
        <div>
        {status === "Accepted" ? (
          <Box textAlign="center">
            <Button variant="contained" style={{color:'orange',backgroundColor:'black'}} onClick={handleConfirm}>
              Complaint Resolved
            </Button>
          </Box>
        ) : (
          ""
        )}
        </div>
      </CardContent>
      <Dialog open={showConfirmationModal} onClose={handleCancel}>
        <DialogTitle color='green'>Confirm </DialogTitle>
        <DialogContent>
          <DialogContentText color='white'>
            Please Confirm work as been Done
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={() => handleComplete(props.cardData)}
            
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function ServiceResult() {
  const [value, setValue] = React.useState(0);
  const [orientation, setOrientation] = useState("horizontal");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { menuCollapse } = useContext(SidebarContext);
  let color = ["primary", "secondary", "inherit"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [allAppointments, setAllAppointments] = useState([]);

  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get(
        'https://smartapartmentserver.onrender.com/complaints/user/appointments'
      );
      const allAppointments = response.data;
      console.log(allAppointments);
      setAllAppointments(allAppointments);
    } catch (error) {
      console.error('Error fetching all appointments:', error);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}`} style={{ marginTop: "40px", color: "black", zIndex: "0", fontFamily: "Poppins" }}>
      <Container style={{ padding: 0, margin: 0 }}>
        <Container>
          <Typography variant="h4" align="center" fontFamily="Poppins" color='white'>
            Service History
          </Typography>
        </Container>
        
        <Container
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            fontFamily: "Poppins",
            marginBottom:'20px',
          }}
          className="mob-view2"
        >
          
          <Container
            sx={{
              maxHeight: "80vh",
              marginTop: '20px',
              marginLeft: "0px",
              padding:'20px',
              
            }}
          >
            <Box
            sx={{
              display: "flex",
              height:'50px',
              marginLeft:'100px',
              
            }}
          >
            <Tabs
              textColor='inherit'
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                minWidth: "100px",
                backgroundColor:'rgb(30,30,30)',
                color:'orange',
                
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "white"
                }
              }}
            >
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="History" {...a11yProps(1)} />
              <Tab label="Draft" {...a11yProps(2)} />
            </Tabs>
          </Box>
            <TabPanel value={value} index={0}>
              {allAppointments.map((value, index) => {
                if (value["status"] === "Pending" || value["status"] === "Accepted")
                  return <BookingCard key={index} cardData={value} fetchAllAppointments={fetchAllAppointments} />;
              })}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {allAppointments.map((value, index) => {
                if (value["status"] === "Completed")
                  return <BookingCard key={index} cardData={value} />;
              })}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {allAppointments.map((value, index) => {
                if (value["status"] === "Declined")
                  return <BookingCard key={index} cardData={value} />;
              })}
            </TabPanel>
          </Container>
          
        </Container>
      </Container>
    </div>
  );
}

export default ServiceResult;
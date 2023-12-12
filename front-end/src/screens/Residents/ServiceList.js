import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardActionArea,
  
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  
  
  Paper,
  Snackbar,
  
  Typography,
  Box,
  Alert
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem} from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {TextField,Button} from "@material-ui/core";
import { SidebarContext } from "./SidebarContext";
import { makeStyles } from "@material-ui/styles";
import { format } from "date-fns";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import "./app.css";
import { Person2Outlined } from "@mui/icons-material";
import { InputAdornment } from "@material-ui/core";

const service = [
  {
    id: "1",
    src: "img/lift.jpeg",
    name: "Lift Maintanence",
    desc: "Ensuring the proper functioning of lift systems requires ",
  },
  {
    id: "2",
    src: "img/cleaning.jpg",
    name: "House Keeping",
    desc: "Revitalize your home with our powerful vacuum cleaning service.",
  },

  {
    id: "3",
    src: "img/plumber.png",
    name: "Plumbing",
    desc: "Fix leaks and plumbing issues with our expert plumbing service.",
  },
  {
    id: "4",
    src: "img/electric.jpg",
    name: "Electricity",
    desc: "Repair or install electronic devices with our professional service.",
  },
  {
    id: "5",
    src: "img/terrace.png",
    name: "Terrace",
    desc: "Maintain your terrace with our terrace maintenance service.",
  },
  {
    id: "6",
    src: "img/Painting.png",
    name: "Painting",
    desc: "We provide professional painting services for your home.",
  },
  {
    id: "7",
    src: "img/Gardening.png",
    name: "Gardening",
    desc: "We provide professional painting services for your home.",
  },
];



const ServiceCard = (props) => {
  const {  src, name, desc } = props.data;
  return (
    <div  >
      <Card
        sx={{
          maxWidth: 400,
          maxHeight:200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea>

        <div
          style={{ maxWidth: 400, display: "flex", flexDirection: "row" ,color:'white'}}
        > 
          <CardContent  sx={{ minWidth: 100 }}>
            <CardMedia
              component="img"
              height="100"
              image={require(`./${src}`).default}
              alt={name}
            />
          </CardContent>
          <CardContent sx={{ minWidth: 150 }}>
            <Typography color='white' gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography  variant="body2" color="wheat">
              {desc}
            </Typography>

          </CardContent>
        </div>
        </CardActionArea>

      </Card>
    </div>
  );
};

const MyForm = ({
  name,
  date,
  position,
  time,
  description,
  setDescription,
  setName,
  setDate,
  setTime,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmSnackbarOpen, setConfirmSnackbarOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowConfirmationModal(true);
  };

  const handleTimeChange = (event) => {
    const inputValue = event.target.value;
    const formattedTime = format(
      new Date(`2023-01-01 ${inputValue}`),
      "h:mm a"
    );

    setTime(formattedTime);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        "https://smartapartmentserver.onrender.com/complaints/create-complaint",
        {
          name,
          date,
          time,
          position,
          description,
          status: "Pending",
        }
      );
      setConfirmSnackbarOpen(true);
      console.log("Complaint created:", response.data);

      setName("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error("Error creating complaint:", error);
    }
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setConfirmSnackbarOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={confirmSnackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Booked Successfully
          </Alert>
        </Snackbar>
        <div style={{height:'100vh'}}>
        <TextField
          id="name"
          variant='outlined'
          fullWidth
          
          label="Your Name"
          margin="normal"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person2Outlined />
              </InputAdornment>
            ),

          }}
        ></TextField>
        <TextField
          id="date"
          variant="outlined"
          type="date"
          fullWidth
          value={date}
          margin="normal"
          label="Date"
          InputLabelProps={{
            shrink: true,
          }}
          
          onChange={(e) => setDate(e.target.value)}
          required
        ></TextField>
        <TextField
          id="time"
          
          variant="outlined"
          type="time"
          fullWidth
          label="Time"
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleTimeChange}
          required
        />
       
        <TextField
          id="description"
          label="Description"
          required
          multiline
          minRows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant='outlined'
          style={{ backgroundColor: "black" ,color:'orange'}}
          type="submit"
        >
          Book
        </Button>
        </div>
        <Dialog  open={showConfirmationModal} onClose={handleCancel}>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm your booking details:
              <br />
              <strong>Name:</strong> {name}
              <br />
              <strong>Date:</strong> {date}
              <br />
              <strong>Time:</strong> {time}
              <br />
              <strong>Type:</strong> {position}
              <br />
              <strong>Description:</strong> {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm} style={{color:'orange'}} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
    </form>
  );
};

const ServiceDetails = ({ position }) => {

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  
  
 
  const getImageSrc = () => {
    switch (position) {
      case "Lift Maintanence":
        return require("./img/lift.jpeg").default;
      case "House Keeping":
        return require("./img/cleaning.jpg").default;
      case "Plumbing":
        return require("./img/plumber.png").default;
      case "Electricity":
        return require("./img/electric.jpg").default;
      case "Terrace":
        return require("./img/terrace.png").default; 
      case "Painting":
        return require("./img/Painting.png").default; 
      case "Gardening":
        return require("./img/Gardening.png").default;    
      default :
        return require("./img/cleaning.jpg").default; 
    }
  };
  return (
    <>
    {!!position && (
      <Card className="mob-view1"  >
          <Container style={{ overflowY: "scroll", height: "85vh"}}>
            
            <CardMedia
              component="img"
              height="150px"
              style={{
                objectFit: "cover",
                objectPosition: "5px 20%",
              }}
              src={getImageSrc()}
              alt="green iguana"
            />
            <Typography
              sx={{ pl: 4, pt: 2 }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {position}
            </Typography>
            <CardContent>
              
                <MyForm
                  position={position}
                  
                  name={name}
                  date={date}
                  time={time}
                  description={description}
                  setDescription={setDescription}
                  setDate={setDate}
                  setName={setName}
                  setTime={setTime}
                />
            </CardContent>
          </Container>
        
      </Card>
    )}
         </>
  )
};

const useStyles = makeStyles((theme) => ({
  box: {
    background: "#eaeaea",
  },
}));

const ServiceList = () => {
  const [position, setPosition] = useState("");
  const [serviceRows, setServiceRows] = useState(service);
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const { menuCollapse } = useContext(SidebarContext);

  function handleServiceProvider(item) {
    setPosition(item.name);
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = service.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setServiceRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div
      className={`${menuCollapse ? "main-open" : "main-collapsed"}`}
      style={{ marginTop: "20px", color: "white", zIndex: "0" }}
    >
      <Container  component={Box} p={3}>
        <Container style={{color:'white'}} >
          <SearchBar
            style={{ maxWidth: "400px", margin: "20px 0px" }}
            value={searched}
            className="search"
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </Container>
        <Paper component='div' >
          <Container className="mob-view1">
            <div className="mob-view-2" style={{display:'flex',flexDirection:'row',width:'100%'}}>
            <div
              className="mob-view"

            >
              {serviceRows?.map((val, index) => (
                <div
                  key={index}
                  onClick={() => handleServiceProvider(val)}
                  className={`${classes.box} ${
                    position === val.name ? classes.activeTab : ""
                  }`}
                  style={{maxWidth:'100%',padding:'5px',backgroundColor:'black'}}
                >
                  <ServiceCard data={val} />
                </div>
              ))}
            </div>
            <ServiceDetails position={position} />

          </div>
            
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default ServiceList;

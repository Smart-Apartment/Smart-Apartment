import React, { useContext,useState ,useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import {TablePagination} from "@material-ui/core";
import TableRow from "@mui/material/TableRow";
import SearchBar from "material-ui-search-bar";
import Select from "@mui/material/Select";
import { SidebarContext } from '../Residents/SidebarContext';
import Container from "@mui/material/Container";
import {MenuItem,Button,Typography,Grid,Modal,Snackbar, } from "@material-ui/core";
import Alert from '@mui/material/Alert'
import InputAdornment from "@mui/material/InputAdornment";
import TodayIcon from "@mui/icons-material/Today";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "../provider/authProvider";
import axios from '../provider/axiosConfig'
import { FaSearchLocation } from "react-icons/fa";
import { green } from "@material-ui/core/colors";




const VisitorHistory = () => {
  const [visitorData, setVisitorData] = useState([]);
  const{token}=useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const{menuCollapse}=useContext(SidebarContext);
  const [searched, setSearched] = useState("");
  const [selectedOption, setSelectedOption] = useState("allday");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [visitorDetails, setVisitorDetails] = useState(null);

  const [checkOutSnackbar, setCheckOutSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);  
  const[error,setError]=useState("");

  const columns = [
    { id: "flatno", label: "Flat Number", minWidth: 20, align: "center" },
    { id: "FullName", label: "Full Name", minWidth: 50, align: "center" },
    {
      id: "phoneNumber",
      label: "Phone Number",
      minWidth: 150,
      align: "center",
    },
    {
      id: "check_in_time",
      label: "Check In",
      minWidth: 130,
      align: "center",
    },

    {
      id: "check_out_time",
      label: "Check Out",
      minWidth: 130,
      align: "center",
      renderCell: (params) => renderDetailsButton(params), 
      disableClickEventBubbling: true,
    },
    {
        id: "fulldetails",
        label: "Full Details",
        minWidth: 120,
        align: "left",
        renderCell: (params) => renderViewButton(params), 
        disableClickEventBubbling: true,
      },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
       console.log(token);
        const response = await axios.get("https://smartapartmentserver.onrender.com/visitor/allvisitors");
        
        console.log(response);
        setVisitorData(response.data);
        setFilteredData(response.data);

      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchData(); 
  }, []); 

  const renderDetailsButton = (data) => {
    
    return (
      <strong>
        <Button
          variant='contained'
          size='small'
          style={{ marginLeft: 16, backgroundColor: "black" ,borderRadius:"5px",color:"orange",padding:"2px",fontSize:"smaller"}}
          onClick={() => {
            setSelectedVisitor(data);
          }
          }
        ><span>Check Out</span>
        </Button>
      </strong>
    );
  };
  const renderViewButton = (data) => {
    
    return (
      <strong>
        <Button
          variant='contained'
          size='small'
          style={{ marginLeft: 16, backgroundColor: "black" ,borderRadius:"5px",color:"orange",padding:"2px",fontSize:"smaller"}}
          onClick={() => {
            setVisitorDetails(data);
          }
          }
        ><span>View Details</span>
        </Button>
      </strong>
    );
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCheckOutSnackbar(false);
    setErrorSnackbar(false);
  };
  const handleCheckOut=async(data)=>{
    try {
      console.log(data);
      const checkOutData = {
        id: data.id,
      };
      console.log(checkOutData);
      const response = await axios.post(
        'https://smartapartmentserver.onrender.com/visitor/check-out',
        checkOutData
      );

      if (response.status === 200) {
        const responseData = await response.data;
        console.log('Check-out successful:', responseData);
        setCheckOutSnackbar(true);
        setSelectedVisitor(null);
      } else {
        console.error('Check-out failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during check-out:', error);
      setError(error.response?.data?.detail || 'An error occurred during check-out');
      setErrorSnackbar(true);
      setSelectedVisitor(null)
    }
  };

  
  const requestSearch = (searchedVal) => {
    const filteredRows = visitorData.filter((row) => {
      return row.FullName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilteredData(filteredRows); 
    setSelectedOption("allday");
  };

  const cancelSearch = () => {
    setSearched("");
    setFilteredData(visitorData); 
    setSelectedOption("allday");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    let filteredData = [];

    switch (event.target.value) {
      case "today":
        filteredData = visitorData.filter(
          (item) => {
          console.log(new Date(item.check_in_time).toLocaleDateString() === getCurrentDate());
          console.log(new Date(item.check_in_time).toLocaleDateString(),new Date(getCurrentDate()).toLocaleDateString());
            return new Date(item.check_in_time).toLocaleDateString()===new Date(getCurrentDate()).toLocaleDateString();
        }
        );
       

        break;
      case "yesterday":
        filteredData = visitorData.filter(
          (item) => new Date(item.check_in_time).toLocaleDateString()===new Date(getYesterdayDate()).toLocaleDateString()
        );
        break;
      case "thisWeek":
        filteredData = visitorData.filter((item) => isInLastWeek(new Date(item.check_in_time)));
        break;
      default:
        filteredData = visitorData;
    }
    setFilteredData([...filteredData]);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const isInLastWeek = (dateString) => {
    const today = new Date();
    console.log(today,dateString,(today-dateString));
    // today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(Math.abs(today-dateString)/ (1000 * 60 * 60 * 24)); 
    console.log(diffDays);
    // const lastWeekStart = new Date(today);
    // lastWeekStart.setDate(today.getDate() - today.getDay() - 6); 

    // const lastWeekEnd = new Date(lastWeekStart);
    // lastWeekEnd.setDate(lastWeekStart.getDate() + 6);

    return diffDays<=6;
  };

  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"50px",color:"white",zIndex:"0"}}>
      <Container
        maxWidth="xl"
        
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10%",
          margin: "20px 0px",
          marginLeft:'0',
          color:'white',
          paddingTop:'10px'
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <SearchBar
            className="search"
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </div>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={selectedOption}
          variant='outlined'
        size='small'
          onChange={handleSelectChange}
          startAdornment={
            <InputAdornment position="start" style={{color:'white'}}>
              <TodayIcon />
            </InputAdornment>
          }
        >
          <MenuItem value="allday">All Day</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="yesterday">Yesterday</MenuItem>
          <MenuItem value="thisWeek">Last Week</MenuItem>
        </Select>
      </Container>
      <TableContainer sx={{ maxHeight: 440 ,backgroundColor:'rgb(80,80,80)'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    fontSize: "17px",
                    background: "rgb(80,80,80)",
                    color:'white',
                    border
                      : "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log(row)

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          
                          style={{
                            color:'white',
                            border: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                    {
  column.id === 'check_in_time' ? (
    <span style={{ color: 'orange' }}>
      {new Date(row[column.id]).toLocaleString()}
    </span>
  ) : column.id === 'check_out_time' ? (
    row[column.id] !== 'Pending' ? (
      <span style={{ color: 'orange' }}>
        {new Date(row[column.id]).toLocaleString()}
      </span>
    ) : (
      <span style={{ color: 'red' }}> {column.renderCell(row)}</span>
    )
  ) : column.id === 'fulldetails' ? (
    <span style={{ color: 'red' }}>
      {column.renderCell(row)}
    </span>
  ) : (
    row[column.id]
  )
}             
                      </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{color:'white'}}
        
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={visitorData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
  open={Boolean(selectedVisitor)}
  onClose={() => setSelectedVisitor(null)}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <div style={{
    backgroundColor: 'grey',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '600px',
    border:'3px solid white'
  }}>
    {selectedVisitor && (
      
             <div style={{textAlign:'center'}}>
             <Typography style={{textAlign:'center',color:'green',fontWeight:'bold'}} variant="h5" id="simple-modal-title">
              Check out Visitor
             </Typography>
             <Typography style={{textAlign:"center"}} variant="body1" id="simple-modal-description">
               You are required to check out the visitor
             </Typography>
             <Grid container spacing={4} style={{width:"600px",padding:'10px',marginTop:'5px'}}>
            <Grid item xs={6}>
              <Typography >
                <strong>Name:</strong> <span style={{fontWeight:'bold',color:'green',fontSize:'20px'}}>{selectedVisitor.FullName}</span>
              </Typography>
            </Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Typography>
                <strong>Flat Number:</strong> {selectedVisitor.flatno}
              </Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography>
                <strong>Phone:</strong> {selectedVisitor.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{textAlign:'center'}} >
                <strong >Date:</strong> {selectedVisitor.Date}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography >
                <strong>Time:</strong> {selectedVisitor.Time}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography >
                <strong>Check In Time:</strong> <span style={{color:'green'}}>{new Date(selectedVisitor.check_in_time).toLocaleString()}</span>
              </Typography>
            </Grid> 

            <Grid item xs={12}>
              <Typography >
                <strong>Purpose:</strong> <span style={{color:'red'}}>{selectedVisitor.Purpose}</span>
              </Typography>
            </Grid>
          </Grid>
           <Button variant='contained' style={{backgroundColor:"black",color:"orange",marginTop:'10px'}} onClick={()=>handleCheckOut(selectedVisitor)} >
            Check Out
            </Button>
        
           </div>
        )}

        </div>
      </Modal>
      <Modal
  open={Boolean(visitorDetails)}
  onClose={() => setVisitorDetails(null)}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <div style={{
    backgroundColor: 'grey',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '600px',
    border:'3px solid white'
  }}>
    {visitorDetails && (
      
             <div style={{textAlign:'center'}}>
             <Typography style={{textAlign:'center',color:'white',fontWeight:'bold'}} variant="h5" id="simple-modal-title">
              Visitor Details
             </Typography>
             <Grid container spacing={4} style={{width:"600px",padding:'10px',marginTop:'5px'}}>
            <Grid item xs={6}>
              <Typography >
                <strong>Name:</strong> <span style={{fontWeight:'bold',color:'white',fontSize:'20px'}}>{visitorDetails.FullName}</span>
              </Typography>
            </Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Typography>
                <strong>Flat Number:</strong> {visitorDetails.flatno}
              </Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography>
                <strong>Phone:</strong> {visitorDetails.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography >
                <strong>Time:</strong> {visitorDetails.Time}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography >
                <strong>Check In Time:</strong> <span style={{color:'white'}}>{new Date(visitorDetails.check_in_time).toLocaleString()}</span>
              </Typography>
            </Grid> 
            <Grid item xs={6}>
              <Typography >
                <strong>Check Out Time:</strong> <span style={{color:'white'}}>{visitorDetails.check_out_time!=="Pending"?new Date(visitorDetails.check_out_time).toLocaleString():"Pending"}</span>
              </Typography>
            </Grid> 
            <Grid item xs={12}>
              <Typography >
                <strong>Purpose:</strong> <span style={{color:'orange'}}>{visitorDetails.Purpose}</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography >
                <strong>Check In Approved By:</strong> <br></br><span style={{color:'white'}}>{visitorDetails.check_in_approver}</span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography >
                <strong>Check Out Approved By:</strong><br></br> <span style={{color:'white'}}>{visitorDetails.check_out_approver}</span>
              </Typography>
            </Grid>
          </Grid>
           
        
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
          open={checkOutSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose}  severity="success">
          Visitor Checked Out Successfully 
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VisitorHistory;

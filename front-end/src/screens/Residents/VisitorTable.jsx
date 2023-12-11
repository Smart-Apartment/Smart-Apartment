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
import {MenuItem } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import TodayIcon from "@mui/icons-material/Today";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "../provider/authProvider";
import axios from '../provider/axiosConfig'
const VisitorTable = () => {
  const [visitorData, setVisitorData] = useState([]);
  const{token}=useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const{menuCollapse}=useContext(SidebarContext);
  const [searched, setSearched] = useState("");
  const [selectedOption, setSelectedOption] = useState("allday");
  const columns = [
    { id: "flatno", label: "Flat Number", minWidth: 20, align: "center" },
    { id: "FullName", label: "Full Name", minWidth: 50, align: "center" },
    {
      id: "Purpose",
      label: "Purpose of Visit",
      minWidth: 100,
      align: "center",
    },
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
      
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get("http://localhost:8000/visitor/getvisitors");
        
        console.log(response.data);
        setVisitorData(response.data);
        setFilteredData(response.data);

      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchData(); 
  }, []); 

  // const renderDetailsButton = (params) => {
  //   return (
  //     <strong>
  //       <Button
  //         variant='contained'
  //         size='small'
  //         style={{ marginLeft: 16, background: "black" ,borderRadius:"5px",color:"white",padding:"2px",fontSize:"smaller"}}
  //         onClick={() => {
  //           let data = params.row;
  //           let time = new Date();
  //           data["checkout"] = time.getHours() + ":" + time.getMinutes();
  //           let findIndex = originalData.findIndex((i) => i.id == data.id);
  //           originalData[findIndex] = data;
  //           let newRowValue = rows;
  //           let rowIndex = newRowValue.findIndex((i) => i.id == data.id);
  //           newRowValue[rowIndex] = data;
  //           setChange([...newRowValue]);
  //         }}
  //       ><span>Check Out</span>
  //       </Button>
  //     </strong>
  //   );
  // };

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
          (item) => item.Date === getCurrentDate()
        );
        console.log(getCurrentDate());
        break;
      case "yesterday":
        filteredData = visitorData.filter(
          (item) => item.Date === getYesterdayDate()
        );
        break;
      case "thisWeek":
        filteredData = visitorData.filter((item) => isInLastWeek(item.Date));
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
    const date = new Date(dateString);

    today.setHours(0, 0, 0, 0);

    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - today.getDay() - 6); 

    const lastWeekEnd = new Date(lastWeekStart);
    lastWeekEnd.setDate(lastWeekStart.getDate() + 6);

    return date >= lastWeekStart && date <= lastWeekEnd;
  };

  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"50px",color:"black",zIndex:"0"}}>
      <Container
        maxWidth="xl"
        
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10%",
          margin: "30px 0px",
          paddingTop:'10px',
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
            <InputAdornment position="start">
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
      <TableContainer  sx={{ maxHeight: 440,backgroundColor:'black' ,borderRadius:'10px'}}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow style={{color:'white'}}>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    fontSize: "17px",
                    background: "black",
                    color:'white'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                          color:"white"                        
                          }}
                        >
                      {column.id==="Date" ? new Date(row[column.id]).toLocaleDateString() 
                      : column.id === "check_in_time"
                      ? new Date(row[column.id]).toLocaleString() 
                      : column.id === "check_out_time"
                      ? row[column.id]!=="Pending"
                        ? new Date(row[column.id]).toLocaleString() 
                        : "Pending"
                      : row[column.id]}                     
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
    </div>
  );
};

export default VisitorTable;

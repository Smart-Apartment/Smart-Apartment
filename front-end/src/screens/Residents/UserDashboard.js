import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Box,
  
} from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import axios from '../provider/axiosConfig'
import Loading from "../Loader/loader";
import { SidebarContext } from "./SidebarContext";
import { Container } from "@material-ui/core";
const data = [
  {
    count: "0",
    title: "Total Visitors ",
    icon: <Person2OutlinedIcon />,
  },
  {
    count: "0",
    title: "Complaints Total",
    icon: <HandymanOutlinedIcon />,
  },
  {
    count: "0",
    title: "Family Count",
    icon: <FamilyRestroomOutlinedIcon />,
  },
  {
    count: "0",
    title: "Flat No",
    icon: <ApartmentOutlinedIcon />,
  },
];

const cdata = [
  { day: "Mon", visits: 4 },
  { day: "Tues", visits: 5 },
  { day: "Wed", visits: 2 },
  { day: "Thurs", visits: 8 },
  { day: "Fri", visits: 1 },
  { day: "Sat", visits: 6 },
  { day: "Sun", visits: 10 },
];
function CustomTooltip({ active, payload,label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          fontSize: "15px",
          padding: "10px",
          borderRadius: "10px",
          color:'black'
        }}
      >
        <p>{`Day: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index}>{`${entry.name}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
}

const DarkThemeLineChart = ({ mobWidth ,week}) => {
  return (
    <LineChart
      width={Number(mobWidth)}
      height={350}
      data={week}
      margin={{ top: 5, bottom: 5 }}
    >
      <XAxis dataKey="day" stroke="white" />
      <YAxis  stroke="white" />
      <Tooltip content={<CustomTooltip/>} />
      <Legend />
      <Line
        type='bump'
        dataKey="visits"
        stroke="black"
        strokeWidth={2}
        dot={{ fill: "orange" }}
      />
    </LineChart>
  );
};

const MonthlyExpensesChart = ({ mobWidth }) => {
  const data = [
    { month: "July", amount: 1100 },
    { month: "Aug", amount: 1000 },
    { month: "Sep", amount: 1400 },
    { month: "Oct", amount: 1200 },
    { month: "Nov", amount: 1600 },
    { month: "Dec", amount: 1300 },
  ];

  return (
    <BarChart
      width={Number(mobWidth)}
      height={350}
      data={data}
      margin={{ top: 20, bottom: 5 }}
    >
      <XAxis stroke="white" dataKey="month" />
      <YAxis stroke="white"/>
      <Tooltip />
      <Legend color="white" />
      <Bar dataKey="amount" fill="orange"  />
    </BarChart>
  );
};

const CardDetails = (props) => {
  let { count, title, icon } = props.cardData;
  return (
    <Grid item>
      <Card sx={{ minWidth: 200, minHeight: 200 }}>
        <CardActionArea>
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "200px",
            }}
          >
            <Typography
              style={{ color: "orange" }}
              gutterBottom
              variant="h2"
              component="div"
            >
              <span style={{color:'orange !important' }}>{count}</span>
            </Typography>
            {icon}
            <Typography variant="h6" color='white'>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const UserDashBoard = () => {
  const [mainData, setMainData] = useState(data);
  const [mobWidth, setMobWidth] = useState("1000");
  const [loading, setLoading] = useState(true); 
  const[week,setWeekData]=useState(null);
  const {menuCollapse}=useContext(SidebarContext);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setMobWidth("500");
      } else {
        setMobWidth("1000");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {

    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/getmembercount`
        );
        console.log(response);
        let newState = [...mainData];
        newState[0].count=response.data.visitor_count
        newState[1].count=response.data.complaints
        newState[2].count = response.data.member;

        newState[3].count = response.data.flat_no;
        setMainData(newState);
        const lastWeekData = response.data.last_week;
        const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const transformedData = allDays.map((day) => ({
          day: day,
          visits: lastWeekData[day] || 0,
        }));
        setWeekData(transformedData)

      } catch (error) {
        console.log(error.message);
      }
      
    };

    fetchMembers();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"50px",color:"black",zIndex:"0"}}>
    
      <Grid container justifyContent="center" spacing={6}>
        {mainData.map((val) => {
          return <CardDetails cardData={val} />;
        })}
      </Grid>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: 'space-evenly',
          margin: "10px",
        }}
      >
        <Card  elevation={4} style={{padding:'0px' ,  marginTop: 12,}}>
          <Typography ml={5} mt={5}  variant="h5" color='white' gutterBottom>
            Last Week <span style={{color:"orange"}} >Visitors</span>
          </Typography>
          <DarkThemeLineChart mobWidth={mobWidth}  week={week}/>
        </Card>
        <Card elevation={4} style={{ marginTop: 12,color:'white' }}>
          <Typography ml={3} mt={5}  variant="h5"  gutterBottom>
            Monthly<span style={{color:"orange"}}> Expenses</span>
          </Typography>
          <MonthlyExpensesChart mobWidth={mobWidth} />
        </Card>
      </div>
    </div>
    )
  
};

export default UserDashBoard;

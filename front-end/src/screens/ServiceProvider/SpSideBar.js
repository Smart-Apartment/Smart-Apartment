import React, { useContext ,useState,useEffect} from "react";
import "../Residents/Visitor.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  
} from "react-pro-sidebar";
import Logo from "../Header/logo3.png";
import { FaAddressBook, FaList} from "react-icons/fa";
import {FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { Toc, Clear, PersonOutlined } from "@mui/icons-material";
import { SidebarContext } from "../Residents/SidebarContext";
import { useAuth } from "../provider/authProvider";
import Header1 from "../Header/InsideHeader";
import axios from '../provider/axiosConfig'
import Cookies from "js-cookie";

const SpSidebar = () => {
  const { setMenuCollapse, menuCollapse } = useContext(SidebarContext);
  const navigate = useNavigate();
  const { token,setToken,image} = useAuth();
  const[user,setUser]=useState([]);
  
  useEffect(() => {
    if(token){
    getUser();
    }
  }, [token,image]);
  const getUser=async()=>{
    const res=await axios.get("http://localhost:8000/users/getservice");
    setUser(res.data);
    console.log(res);
  }  
  const logout=()=>{
    const res=handleLogout();
    if(res){
      navigate('/login');
    }
  }
  const handleLogout = () => {
    Cookies.remove('token');
    setToken(null); 
    return true;
  };
  const menuIconClick = (e) => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <div id="header">
      <Header1 user={user}/>
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="logotext">
            {menuCollapse ? (
              <div className="logo-container">
                <img src={Logo} alt="Logo" className="logo" />
              </div>
            ) : (
              <div className="logo-container">
                <img src={Logo} alt="Logo" className="logo" />
                <h3 className="logo1">Smart Apartment</h3>
              </div>
            )}
          </div>
          <div className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? <Toc /> : <Clear />}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu  iconShape="square">
            
           
            <MenuItem
              active={window.location.pathname === "/service/profile"}
              icon={<PersonOutlined />}
              onClick={() => navigate("/service/profile")}
            >
              Profile
            </MenuItem>
            <MenuItem 
            active={window.location.pathname === "/service/bookings"}
            icon={<FaAddressBook />} onClick={() => navigate("/service/bookings")}>
              Bookings
            </MenuItem>
            <MenuItem active={window.location.pathname === "/service/history"} icon={<FaList/>} onClick={()=> navigate("/service/history")}>Booking <br></br>History</MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} onClick={logout}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SpSidebar;

import React, { useContext ,useState,useEffect} from "react";
import "./Visitor.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";
import axios from '../provider/axiosConfig'
import Logo from "../Header/logo3.png";
import { FaAddressBook, FaList, FaScrewdriver } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { Toc, Clear, PersonOutlined } from "@mui/icons-material";
import { SidebarContext } from "./SidebarContext";
import { useAuth } from "../provider/authProvider";
import Header1 from "../Header/InsideHeader";
import Cookies from 'js-cookie'
const Sidebar = () => {
  const { setMenuCollapse, menuCollapse } = useContext(SidebarContext);
  const navigate = useNavigate();
  const {token,setToken,image} = useAuth();
  const[user,setUser]=useState([]);
 
  useEffect(() => {
    if(token){
    getUser();
    }
  }, [token,image]);
  const getUser=async()=>{
    const res=await axios.get("https://smartapartmentserver.onrender.com/users/getuser");
    setUser(res.data);
    console.log(res);
  }  
  const logout=()=>{
    const res=handleLogout();
    if(res){
      navigate('/login',{replace:true});
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
            <MenuItem active={window.location.pathname === "/user/dashboard"}  onClick={() => navigate("/user/dashboard")} icon={<FiHome />}>
              DashBoard
            </MenuItem>
           
            <MenuItem
              icon={<PersonOutlined />}
              active={window.location.pathname === "/user/profile"} 
              onClick={() => navigate("/user/profile")}
            >
              Profile
            </MenuItem>
            <MenuItem  active={window.location.pathname === "/user/visitor"}  icon={<FaAddressBook />} onClick={() => navigate("/user/visitor")}>
              Visitor
            </MenuItem>
            <SubMenu  title="Services" icon={<FaList/>}>
              <MenuItem active={window.location.pathname === "/user/complaint"}  icon={<FaScrewdriver/>}onClick={() => navigate("/user/complaint")} >Book A Service</MenuItem>
              <MenuItem active={window.location.pathname === "/user/history"}  icon={<FaList/>} onClick={() => navigate("/user/history")}>Service History</MenuItem>

            </SubMenu>
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

export default Sidebar;

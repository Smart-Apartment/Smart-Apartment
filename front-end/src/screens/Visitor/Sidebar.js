import React, { useContext } from "react";
import "./Visitor.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import Logo from "../Header/logo3.png";
import { FaList } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { Toc, Clear, PersonOutlined } from "@mui/icons-material";
import { Typography, Avatar } from "@material-ui/core";
import { SidebarContext } from "./SidebarContext";
import { useAuth } from "../Login/AuthContext";

const Sidebar = () => {
  const { setMenuCollapse, menuCollapse } = useContext(SidebarContext);
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const menuIconClick = (e) => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <div id="header">
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
            {menuCollapse ? (
              <Toc />
            ) : (
              <Clear />
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FiHome />}>
              DashBoard
            </MenuItem>
            <MenuItem icon={<FaList />} onClick={() => navigate("/visitor")}>
              Visitor
            </MenuItem>
            <MenuItem
              icon={<PersonOutlined />}
              onClick={() => navigate("/profile")}
            >
              Profile
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} onClick={() => navigate("/login")}>
              Logout
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;


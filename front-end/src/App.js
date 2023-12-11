import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/Home/HomeScreen";
import { Register } from "./screens/Register/Register";
import Sidebar from "./screens/Residents/Sidebar";
import Navbar from "./screens/Header/Header";
import { SidebarContext } from "./screens/Residents/SidebarContext";
import AuthProvider from "./screens/provider/authProvider";
import VisitorLogin from "./screens/Login/VisitorLogin";
import SpSidebar from "./screens/ServiceProvider/SpSideBar";
import ServiceProvider from "./screens/ServiceProvider/ServiceProvider";
import Bookings from "./screens/ServiceProvider/Bookings";
import BookingHistory from "./screens/ServiceProvider/BookingsHistory";
import ServiceList from "./screens/Residents/ServiceList";
import ServiceResult from "./screens/Residents/ServiceResult";
import SecSideBar from "./screens/Security/SecSideBar";
import VisitorManagementSystem from "./screens/Security/VisitorManagement";
import VisitorHistory from "./screens/Security/VisitorHistory";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { SpLoginScreen } from "./screens/ServiceProvider/SpLogin";
import VisitorTable from "./screens/Residents/VisitorTable";
import Profile from "./screens/Residents/ProfileForm";
import UserDashBoard from "./screens/Residents/UserDashboard";
// import Routes from "./screens/routes/index";
import { ProtectedLogin, ProtectedRoute } from "./screens/routes/ProtectedRoute";
import { Button } from "@material-ui/core";
import Loading from "./features/Admin/Loading/loading";
function App() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const ErrorElement=()=>{
    const {navigate}=useNavigate();

    return(
      <>
      <h2>Something Went Wrong!!</h2>
      <h5>Try Logging In again</h5>
      <Button onClick={()=>navigate('/login')} style={{backgroundColor:"black",color:'red'}}>Login</Button>
      </>
    )
  }
  return (
    <>
      <SidebarContext.Provider value={{ menuCollapse, setMenuCollapse }}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/admin" element={<Loading/>}/>
              <Route errorElement={<ErrorElement/>} path="/user/visitor" element={<ProtectedRoute children={<div className="rootmain"><Sidebar /><VisitorTable /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/user/profile" element={<ProtectedRoute children={<div className="rootmain"><Sidebar /><Profile/></div>} />} />
              <Route  path="/" element={<ProtectedLogin children={<div className="rootmain"><Navbar /><HomeScreen /></div>}/>} />
              <Route path="/register" element={<ProtectedLogin children={<div className="rootmain"><Navbar /><Register /></div>}/>} />
              <Route path="/login" element={<ProtectedLogin children={<div className="rootmain"><Navbar /><LoginScreen /></div>} />}/>
              <Route path="/login/serviceprovider" element={<ProtectedLogin children={<div className="rootmain"><Navbar /><SpLoginScreen /></div>}/>}/>
              <Route path="/visitorLogin" element={<div className="rootmain"><Navbar /><VisitorLogin /></div>} />
              <Route errorElement={<ErrorElement/>} path="/user/dashboard" element={<ProtectedRoute children={<div className="rootmain"><Sidebar /><UserDashBoard /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/user/visitor" element={<ProtectedRoute children={<div className="rootmain"><Sidebar /><VisitorTable /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/user/profile" element={<ProtectedRoute children={<div className="rootmain"><Sidebar /><Profile /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/service/profile" element={<ProtectedRoute children={<div className="rootmain"><SpSidebar /><ServiceProvider /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/service/bookings" element={<ProtectedRoute children={<div className="rootmain"><SpSidebar /><Bookings /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/service/history" element={<ProtectedRoute children={<div className="rootmain"><SpSidebar /><BookingHistory /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/user/complaint" element={<ProtectedRoute children={<div className="rootmain"><Sidebar /><ServiceList /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/user/history" element={<ProtectedRoute children={<div className="rootmain"><Sidebar /><ServiceResult /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/security/profile" element={<ProtectedRoute children={<div className="rootmain"><SecSideBar /><ServiceProvider /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/security/visitor" element={<ProtectedRoute children={<div className="rootmain"><SecSideBar /><VisitorManagementSystem /></div>} />} />
              <Route errorElement={<ErrorElement/>} path="/security/logbook" element={<ProtectedRoute children={<div className="rootmain"><SecSideBar /><VisitorHistory /></div>} />} />
            </Routes>
          </Router>
        </AuthProvider>
      </SidebarContext.Provider>
    </>
  );
}

// const ErrorElement=()=>{

// }
export default App;

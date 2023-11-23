import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/Home/HomeScreen";
import { Register } from "./screens/Register/Register";
import Sidebar from "./screens/Visitor/Sidebar";
import Test from "./screens/Visitor/Test";
import Navbar from "./screens/Header/Header";
import Test1 from "./screens/Visitor/Test1";
import { SidebarContext } from "./screens/Visitor/SidebarContext";
import { useState } from "react";
import { LoginScreen } from "./screens/Login/LoginScreen.js";
import { AuthProvider, useAuth } from "./screens/Login/AuthContext.js";
import VisitorLogin from "./screens/Login/VisitorLogin.js";
import Admin from "./features/Admin/home/home.js";
function App() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  // const {userIsLoggedIn} =useAuth();
  return (
    <>
      <SidebarContext.Provider value={{ menuCollapse, setMenuCollapse }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <HomeScreen />
                  </>
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <>
                    <Navbar />
                    <Register />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <Navbar />
                    <LoginScreen />
                  </>
                }
              />
              <Route
                path="/visitorLogin"
                element={
                  <>
                    <Navbar />
                    <VisitorLogin />
                  </>
                }
              />
            </Routes>
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/visitor"
                element={
                  <>
                    <Sidebar />
                    <Test />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Sidebar />
                    <Test1 />
                  </>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </SidebarContext.Provider>
    </>
  );
}

export default App;

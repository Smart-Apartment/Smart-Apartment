import React, { useState } from "react";
import Test from "./Test";
import Sidebar from "./Sidebar";
import { SidebarContext } from "./SidebarContext";
import Test1 from "./Test1";
function Layout() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  return (
    <>
    <SidebarContext.Provider value={{menuCollapse,setMenuCollapse }}>
        <Sidebar />
        <Test/>
        <Test1/>
    </SidebarContext.Provider>
    </>
);
}

export default Layout;

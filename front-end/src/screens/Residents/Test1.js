import './Test.css'
import React from 'react';
import Profile from './ProfileForm';
import { SidebarContext } from "./SidebarContext";
import { useContext } from 'react';


const Test1 = () => {
  const { menuCollapse } = useContext(SidebarContext);
  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}`} style={{marginTop:'20px'}}>
      <Profile/>
    </div>
  );
};

export default Test1;
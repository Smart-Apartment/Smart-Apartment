import './Test.css'
import React from 'react';
import Profile from './ProfileForm';
import Header1 from '../Header/InsideHeader';
import { SidebarContext } from "./SidebarContext";
import { useContext } from 'react';
const user = {
  name: 'Arun',
  flatNo: '15',
  age: 22,
  email: 'arun@example.com',
  phoneNumber: '123-456-7890',
  familyMembers: [],
};

const Test1 = () => {
  const { menuCollapse } = useContext(SidebarContext);

  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}`} style={{marginTop:'20px'}}>
      <Header1 user={user}/>
      <Profile user={user} />
    </div>
  );
};

export default Test1;
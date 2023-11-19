import React, { useContext } from "react";
import './Test.css'
import { SidebarContext } from "./SidebarContext";
import Header1 from "../Header/InsideHeader";
export default function Test(){
    const { menuCollapse } = useContext(SidebarContext);
    const user = {
        name: 'Arun',
        flatNo: '15',
        age: 22,
        email: 'arun@example.com',
        phoneNumber: '123-456-7890',
        familyMembers: [],
      };
    return(
        <>
        
        <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"50px",color:"black",zIndex:"0"}}>
        <Header1 user={user}/>
        <p>
        Dashboard Here        
        </p>
        </div>
        </>
    );
}
import React from "react";
import { Typography, Avatar } from '@material-ui/core';
// import { Link } from "react-router-dom";

const Header1 = ({user}) => {


  const { name} = user;

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '50px', zIndex: 1, backgroundColor: 'rgb(0, 0, 62)' }}>
        <nav  style={{ display: 'flex', justifyContent: 'end'}}>

          <div style={{ display: 'flex', alignItems: 'center' ,padding:"5px",cursor:"pointer"}}>
            <Avatar
              alt={'name'}  
              style={{marginRight:'5px'}}
            />
            <Typography style={{fontSize:'20px',color:'white'}}>{name}</Typography>

          </div>

        </nav>
      </div>
    </>
  );
};

export default Header1;

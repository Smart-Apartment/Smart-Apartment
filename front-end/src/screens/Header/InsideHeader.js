import React from "react";
import { Typography, Avatar } from '@material-ui/core';
const Header1 = ({user}) => {
  

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '50px', zIndex: 1, backgroundColor: 'black' }}>
        <nav  style={{ display: 'flex', justifyContent: 'end'}}>

          <div style={{ display: 'flex', alignItems: 'center' ,padding:"5px",cursor:"pointer"}}>
            <Avatar
              alt={user.full_name}  
              style={{marginRight:'5px',border:'1px solid white'}}
              src={user.profile_image}
              
            />
            <Typography style={{fontSize:'20px',color:'orange'}}>{user.full_name}</Typography>

          </div>

        </nav>
      </div>
    </>
  );
};

export default Header1;

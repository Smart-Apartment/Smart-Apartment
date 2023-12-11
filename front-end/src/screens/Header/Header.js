import React, { useState,useEffect } from "react"
import "./header.css"
import { Link } from "react-router-dom"

import {Toc,Clear} from '@mui/icons-material';
import Logo from './logo3.png'
import { Typography } from "@material-ui/core";
const Navbar = () => {
  const [Mobile, setMobile] = useState(false)
  const [forceRender, setForceRender] = useState(false);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setMobile(false);
    }
    setForceRender((prev) => !prev); 
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [forceRender]); 

  return (
    <>
    <div className="header-container">
      <nav className='navbar'>
      <div className='logo-container'>
        <img src={Logo} alt="Logo" className="logo" />
        <h3 className="logo1">Smart Apartment</h3>
      </div>
        
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to='/' className='home'>
            <li>Home</li>
          </Link >
          {/* <Link to='/#about' className='about'>
            <li>About</li>
          </Link > */}
            {/* <li ><a href="/#about" style={{color:'inherit',textDecoration:'none'} }>About</a></li> */}
          
          <Link to='/login' className='login'>
            <li>Login</li>
          </Link>
          <Link to='/register' className='register'>
            <li>SignUp</li>
          </Link>
          <Link to='/login/serviceprovider' className='splogin'>
            <li>Service Provider</li>
          </Link>
        </ul>
        
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <Clear/> :<Toc/>}
        </button>
      </nav>
      </div>
    </>
  )
}
export default Navbar
import React, { useState } from "react"
import "./header.css"
import { Link } from "react-router-dom"

import {Toc,Clear} from '@mui/icons-material';
import Logo from './logo3.png'
const Navbar = () => {
  const [Mobile, setMobile] = useState(false)
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
          </Link>
          <Link to='/' className='about'>
            <li>About</li>
          </Link>
          <Link to='/login' className='login'>
            <li>Login</li>
          </Link>
          <Link to='/register' className='register'>
            <li>SignUp</li>
          </Link>
          {/* <Link to='/contact' className='home'>
            <li>contact</li>
          </Link> */}
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
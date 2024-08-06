import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="container">
            <Link className="link home" to="/home">Home</Link>
            <Link className="link profile" to="/user/profile" >Profile</Link>
            <Link className="link feeds" to="/user/feeds">Feeds </Link>
            <Link className="link login" to="/login">Login</Link>
            <Link className="link signUp" to="/signUp">SignUp</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar;

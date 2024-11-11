import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom"
import '../../index.css'
import backgroundImg from './img/nib.jpg';

const Navbar = () => {
  return (
    <>
      <div className=" fixed top-0 left-0 z-50 flex w-full h-[10vh] text-black font-thin text-xl  bg-contain bg-center   justify-between items-center "  style={{ backgroundImage: `url(${backgroundImg})` }}>
        <Link className="ml-10 bg-purple-500 p-1 rounded-md" to="/home">Home</Link>
        <div className="flex gap-x-20 mr-10 ">
            <Link className= " bg-purple-500 p-1 rounded-md" to="/user/profile" >Profile</Link>
            <Link className= " bg-purple-500 p-1 rounded-md" to="/user/feeds">Feeds </Link>
            <Link className= " bg-purple-500 p-1 rounded-md" to="/login">Login</Link>
            <Link className= " bg-purple-500 p-1 rounded-md" to="/signUp">Sign Up</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar;

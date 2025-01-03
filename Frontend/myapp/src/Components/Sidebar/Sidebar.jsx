import React from 'react'
import './Sidebar.css'
import {Link} from "react-router-dom"
const Sidebar = () => {
    const handleCloseButton =()=>{
        var ele= document.getElementsByClassName('sidebar')[0];
        console.log(ele)
        ele.classList.add('visibility');
    }
  return (
    <div className="sidebar">
        <div className="close-btn"><button className='close-btn' onClick={handleCloseButton}><i class="fa fa-times-circle" aria-hidden="true"></i></button></div>
        <header><Link to="/" ><h1>Socialmedia</h1></Link></header>
        <ul className='links-list'>
            <li><Link className= "link-css" to="/user/profile" ><i class="fa fa-user" aria-hidden="true"></i>Profile</Link></li>
            <li><Link className= "link-css" to="/user/feeds"><i class="fa fa-bell-o" aria-hidden="true"></i>Feeds </Link></li>
            <li><Link className= "link-css" to="/login"><i class="fa fa-sign-out" aria-hidden="true"></i>Login</Link></li>
            <li><Link className= "link-css" to="/signUp"><i class="fa fa-user-plus" aria-hidden="true"></i>Sign Up</Link></li>

        </ul>
    </div>
  )
}

export default Sidebar

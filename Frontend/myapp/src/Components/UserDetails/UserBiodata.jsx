import React, { useEffect } from 'react'
import "./UserDetails.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserProvider";

const UserBiodata = () => {
  const [user]=useUser();

  return (
    <div className='user-biodata'>
      
    </div>
  )
}

export default UserBiodata;

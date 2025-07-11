import React, { useEffect } from 'react'
import "./UserDetails.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserProvider";

const UserBiodata = () => {
  const [user]=useUser();
  useEffect(()=>{console.log("User biodata", user)}, [])

  return (
    <div className='user-biodata'>
      <div className="basic-info">
        <div className="profile-pic">
          <img src={user.imageUrl} alt="" srcset="" />
        </div>
        <div className="quick-info">
          <div className='box1'>
            <h2>{user.firstName}</h2> <h2>{user.lastName}</h2>
          </div>
          <div className='box2'>
            <h2>{user.nickName}</h2> <h2>{user.gender}</h2> <h2>{user.dob}</h2>
          </div>
        </div>
      </div>
      <div className="personal-info">
        personal-info
      </div>
    </div>
  )
}

export default UserBiodata;

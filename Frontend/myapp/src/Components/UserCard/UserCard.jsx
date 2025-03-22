import {React, useEffect, useState} from 'react'
import './UserCard.css'
import axios from 'axios'



const UserCard = ({firstName, lastName, nickName, id, imgurl}) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  },[token]);

  const SendRequest= async ()=>{
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/send-request/` + id, null, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <>
        <div className="card-background">
            <img className="image" src={imgurl}></img>
            <div className="description">
              <p className='text-class'>Hi! There, I am {`${firstName}`} {`${lastName}`}, friends call me {`${nickName}`} too. Its been 25 years, living on this earth.</p>
            </div>
            <div className="Action">
                <button className='btn-view anim'>View Profile</button>
                <button className='btn-add anim' onClick={SendRequest}>Add Partner</button>
                <button className='btn-block anim'>Block</button>
            </div>
        </div>
    </>
    
  )
}

export default UserCard
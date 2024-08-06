import React from 'react'
import './AddFrienCard.css';
import axios from 'axios';

const AddFrienCard = ({rId, token}) => {

  const acceptHandler = async () => {
    console.log(token);
    try {
        const response = await axios.post(`http://localhost:7070/user/add-friend/${rId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized:', error);
            // Handle unauthorized here (e.g., redirect to login)
        } else {
            console.error('Error fetching Received Requests:', error);
        }
    }
};

const rejectHandler = async () => {
  console.log(token);
  try {
      const response = await axios.post(`http://localhost:7070/user/reject/${rId}`, null, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
  } catch (error) {
      if (error.response && error.response.status === 401) {
          console.error('Unauthorized:', error);
          // Handle unauthorized here (e.g., redirect to login)
      } else {
          console.error('Error fetching Received Requests:', error);
      }
  }
};


  return (
    <>
      <div className="addfriendCard">
        <div className="frndImg">
          <img  src="" alt="" srcSet="" />
        </div>
        <button id="btn1" type="button" onClick={acceptHandler}>Accept</button>
        <button id="btn2" type="button"onClick={rejectHandler}>Reject</button>
      </div>
    </>
  )
}

export default AddFrienCard

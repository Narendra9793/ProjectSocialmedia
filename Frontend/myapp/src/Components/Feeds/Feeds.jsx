
import React, { useEffect, useState } from 'react';
import './Feeds.css';
import AddFriendCard from '../AddFriendCard/AddFrienCard';
import Login from '../Login/Login';
import axios from 'axios'; // Import axios directly

const Feeds = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    if (token) {
      fetchAllReceivedRequests();
    }
  }, [token, receivedRequests]);

  const fetchAllReceivedRequests = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/all-received-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response", response.data);
      setReceivedRequests(response.data);
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
    <div className="feedsDiv">
      {receivedRequests.map((receivedRequest) => (
        <div key={receivedRequest.receiveRequestId} className="request-wrapper">
          <AddFriendCard  rId={receivedRequest.receiveRequestId} token={token}/>
        </div>
      ))}
    </div>
  );
};

export default Feeds;

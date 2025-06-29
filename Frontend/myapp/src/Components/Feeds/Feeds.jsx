
import React, { useEffect, useState } from 'react';
import './Feeds.css';
import AddFriendCard from '../AddFriendCard/AddFrienCard';
import Login from '../Login/Login';
import axios from 'axios'; // Import axios directly

const Feeds = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [visitors, setVisitors] = useState([]);


  useEffect(() => {
    if (token) {
      fetchAllReceivedRequests();
      fetchAllVisitors();
    }
  }, [token, receivedRequests, visitors]);

  useEffect(() => {
    if (!visitors) return;
    console.log("Visitros", visitors)
  }, [visitors]);

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

    const fetchAllVisitors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/allVisits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response", response.data);
      setVisitors(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized:', error);
        // Handle unauthorized here (e.g., redirect to login)
      } else {
        console.error('Error fetching Visitors:', error);
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

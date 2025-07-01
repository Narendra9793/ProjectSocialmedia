
import React, { useEffect, useState } from 'react';
import './Feeds.css';
import AddFriendCard from '../AddFriendCard/AddFrienCard';
import Login from '../Login/Login';
import axios from 'axios'; // Import axios directly
import VisitCard from '../VisitCard/VisitCard';

const Feeds = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [visits, setVisits] = useState([]);


  useEffect(() => {
    if (token) {
      fetchAllReceivedRequests();
      fetchAllVisits();
    }
  }, [token, receivedRequests, visits]);

  useEffect(() => {
    if (!visits) return;
    console.log("Visits", visits)
  }, [visits]);

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

    const fetchAllVisits = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/allVisits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response", response.data);
      setVisits(response.data);
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

      {visits.map((visit) => (   // <-- Line 77
        <div key={visit.visitId} className="request-wrapper">
          <VisitCard visitor={visit.visitBy} date={visit.visitDate} />
        </div>
      ))}
    </div>
  );
};

export default Feeds;

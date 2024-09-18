import React from 'react';
import './Home.css'
import UserCard from '../UserCard/UserCard';
import { useState , useEffect} from 'react'
import axios from 'axios';


const Home = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [publicPosts, setPublicPosts] = useState([]);

  useEffect(() => {

    fetchData()
    fetchPosts()
  }, [ ]); // Added token to the dependency array
  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
      
      const url = storedToken ? "http://localhost:7070/user/allusers" : "http://localhost:7070/api/auth/allusers";
      const response = await axios.get(url, {
        headers: storedToken ? { Authorization: 'Bearer ' + storedToken } : undefined,
      });
      
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:7070/api/auth/allpublicpost', {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      
      setPublicPosts(response.data);

      console.log(response.data.length + "are post Public");
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Handle error fetching user profile
    }
  };
  

  return (
    <> 
      <div className="background ">
        <div className="homeContent">

        </div>
        <div className="allUsers fade-content" >
          {users.map((user) => (          
            <div className="card" key={user.userId}>
              <UserCard  firstName={user.firstName} lastName={user.lastName} nickName={user.nickName} id={user.userId} imgurl={user.imageUrl}  />
            </div>                             
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;


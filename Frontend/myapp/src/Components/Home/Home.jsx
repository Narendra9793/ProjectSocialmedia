'use strictmode'
import React, { useState, useEffect } from 'react';
import './Home.css';
import UserCard from '../UserCard/UserCard';
import axios from 'axios';
import Post from '../Post/Post';
import Post_video from '../Post/Post_videos';
import { useUser } from '../../context/UserProvider';
import Masonry from "react-masonry-css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [publicPosts, setPublicPosts] = useState([]);
  const [user] = useUser();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let isThrottled = false; // Throttle flag
  let isFetching = false;

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };


  useEffect(() => {
    if (page > 0) {
      fetchData();
    }
  }, [page]);
  

  
  useEffect(() => {
    fetchPosts();
    fetchData();
    console.log('current Page=', page);
  }, []); // Fetch users when `page` changes.

  useEffect(() => {
    const scrollDiv = document.getElementById('frndList');
    const handleScroll = (e) => handleInfinityScroll(e);

    if (scrollDiv) {
      scrollDiv.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Attach the listener only once.

  const handleInfinityScroll = (e) => {
    if (isThrottled) return; // Skip if already throttled.

    if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 1) {
      console.log('Scrolled to the bottom!');
      isThrottled = true; // Enable throttling
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        console.log('Previous Page:', prevPage, 'Next Page:', nextPage);
        return nextPage;
      });

      setTimeout(() => {
        isThrottled = false; // Disable throttling after 500ms
      }, 500);
    }
  };

  const fetchData = async () => {
    if (isFetching) return;
    isFetching = true;
    
    try {
      console.log("I am from fetchData");
      console.log(`${process.env.REACT_APP_API_BASE_URL}/user/allusers/${page}`)
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);

      
      const url = storedToken
        ? `${process.env.REACT_APP_API_BASE_URL}/user/allusers/${page}`
        : `${process.env.REACT_APP_API_BASE_URL}/api/auth/allusers/${page}`;
      

      console.log("URL :", url)
      const response = await axios.get(url, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      
      console.log("response no.=", response.data);
      setUsers((prevUsers) => [...prevUsers, ...response.data]); // Append new users.
      setIsLoading(false);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        // Unauthorize error, clear token
        localStorage.clear()
        console.warn('Unauthorized access, token removed');
      }
      console.error('Error fetching users:', e.message || e);
    } finally {
      isFetching = false;
    }
  };
  
  const fetchPosts = async () => {
    try {
      
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/auth/allpublicpost`);
      setPublicPosts(response.data);
      console.log(`${response.data.length} public posts fetched`);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <>
      <div className="background">
        <div className="homeContent">
          <div className="publicPosts" id="posts">
             <Masonry
                          breakpointCols={breakpointColumnsObj}
                          className="my-masonry-grid"
                          columnClassName="my-masonry-grid_column"
                          id="my-masonry-grid"
                        >
                          {publicPosts.map((post) => (
                            <div key={post.postId} className="post-wrapper">
                              {post.postImageUrl?.toLowerCase().endsWith(".mp4") ? (
                                <Post_video
                                  url={post.postImageUrl}
                                  description={post.postDescription}
                                  id={post.postId}
                                  Token={localStorage.getItem("token")}
          
                                  ownerId={post.ownerId}
                                  loggedUserId={user}
                                />
                              ) : (
                                <Post
                                  url={post.postImageUrl}
                                  description={post.postDescription}
                                  id={post.postId}
                                  Token={localStorage.getItem("token")}
                 
                                  ownerId={post.ownerId}
                                  loggedUserId={user}
                                />
                              )}
                            </div>
                          ))}
                        </Masonry>
          </div>
        </div>
        <div className="allUsers fade-content" id="frndList">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : null}
          {users.map((user) => (
            <div className="card" key={user.userId}>
              <UserCard
                firstName={user.firstName}
                lastName={user.lastName}
                nickName={user.nickName}
                id={user.userId}
                imgurl={user.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

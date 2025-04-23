import React, { useEffect, useState } from 'react'
import "./FriendCard.css"
import Message from '../Message/Message'
import Post from '../Post/Post';
import Post_video from '../Post/Post_videos';
import { useSocket } from '../../context/SocketProvider';
import VideoCall from '../VideoCall/VideoCall';
import axios from 'axios';


const FriendCard = ({loggedUser, friend, token}) => {

  const [friendData, setFriendData]=useState(friend);
  const socket=useSocket();


  const visitorhandler= async(id)=>{
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/visit-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  const handleClosebutton= (id)=>{
    const div=document.getElementById(id);
    if(div.style.display === "block"  )
    div.style.display="none";
    else {
      div.style.display="block";
      visitorhandler(friend.userId)
    }
  }

  function showDiv(id) {
    // Hide all divs
    document.getElementById('posts').classList.add('hidden');
    document.getElementById('posts').classList.remove('show');
    document.getElementById('bio').classList.add('hidden');
    document.getElementById('bio').classList.remove('show');

      
    // Show the selected div
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('show');
  }


  return (
    <>
      <div className={`friendCard  ${friend.status === "ONLINE" ? "online" : ""}`}>
        <button id="v-call-bttn" type="button" onClick={()=>handleClosebutton(`V-call_${friendData.userId}`)}>Video Call</button>
        <button id="friend-profile-bttn" type="button" onClick={()=>handleClosebutton(`Friend-profile_${friendData.userId}`)}>Profile</button>
        <button id="chat-bttn" type="button" onClick={()=>handleClosebutton(`Chat_${friendData.userId}`)}>Chat</button>
        <div className="frndImg">
          <img  className="frndImage" src={friendData.imageUrl} alt="friend image" srcSet="" />
        </div>
      </div>

      <div className="V-call glass" id={`V-call_${friendData.userId}`}>
        <button id="close" type="button" onClick={()=>handleClosebutton(`V-call_${friendData.userId}`)}>X</button>
        <div className="video-window">
        <VideoCall loggedUser={loggedUser} friend={friendData}/>
        </div>

      </div>

      <div className="Friend-profile glass" id={`Friend-profile_${friendData.userId}`}>
        <button id="close" type="button" onClick={()=>handleClosebutton(`Friend-profile_${friendData.userId}`)}>X</button>

          <div className="friendProfile">
            {
              (friendData.imageUrl!== "")?<img className='friendProfileImage'id="upPrev"  src={friendData.imageUrl} />:
              <img className='friendProfileImage'id="upPrev"  src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" />
            }
            
            <h3 id="fullName">{friendData.firstName}   {friendData.lastName}</h3>
            <h3 id="nickName">{friendData.nickName}nickName</h3>
          </div>
          <div className="friendContentArea">
              <div className="FriendContentBar">
                <button type="button"   onClick={() => showDiv("posts")}>Posts</button>
                <button type="button"  onClick={() => showDiv("bio")}>Biodata</button>
              </div>
                <div className="Friend_contentType">
                  <div className="Friend_posts show" id="posts"> 
                    {friendData.posts.map((post) => (          
                                  <div key={post.postId} className="Friend_post-wrapper">
                                    {(post.postImageUrl.endsWith(".mp4") )
                                    ? 
                                    (
                                     <Post_video url={post.postImageUrl} description={post.postDescription} id={post.postId} Token={localStorage.getItem('token')} />
                                    )
                                    :
                                    (
                                     <Post url={post.postImageUrl} description={post.postDescription} id={post.postId} Token={localStorage.getItem('token')} />
                                    )
                                    }

                                  </div>                            
                          ))}
                  </div>
                  <div className="bio hidden" id="bio">Bio</div>
              </div>
          </div>

      </div>

      <div className="Chat glass" id={`Chat_${friendData.userId}`}>
        <button id="close" type="button" onClick={()=>handleClosebutton(`Chat_${friendData.userId}`)}>X</button>
        <h1>This is Chat section!</h1>
        <Message loggedUser={loggedUser} receiverId={friendData.userId}/>
      </div> 
      
    </>
  )
}

export default FriendCard

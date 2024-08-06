import React, { useState, useEffect } from 'react';
import './Post.css'

const Post_video = ({url, description,  id,deleteItem, Token}) => {

  useEffect(()=>{
    PostClick();
  }, []);
    
  

  function PostClick() {
    var posts = document.getElementsByClassName('overlay');
    for (var x = 0; x < posts.length; x++) {
      posts[x].addEventListener("click", function() {
        var elements = document.getElementsByClassName("post_veiwer");
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = "block";
        }
      });
    }
  }
  

  return (
    <>
        <div className="Postcard-background animate">
          <video className="PostVideo" id="PostVideo" controls loop >
            <source src={url} type="video/mp4"/>
          </video>

          <div className="overlay">
            <button type="button" onClick={()=>{deleteItem(id, Token)}} >Delete</button>
          </div>
        </div>
    </>
    
  )
}

export default Post_video
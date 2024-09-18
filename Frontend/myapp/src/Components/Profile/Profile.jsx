import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Post from "../Post/Post";
import Post_video from "../Post/Post_videos";
import FriendCard from "../FriendCard/FriendCard";
import Login from "../Login/Login";
import { FaCamera } from "react-icons/fa";
import Carausel from "../Carausel/Carausel";

const Profile = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [Posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [accStatus, setAccStatus] = useState(null);

  const handleImageChange = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const response = await axios.post(
        "http://localhost:7070/user/change-dp",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data", // Make sure to set the content type for FormData
          },
        }
      );

      setFile(null);
      if (response.status === 200) {
        alert("File uploaded successfully");
        // Handle success, e.g., show a success message
      } else {
        alert("Failed to upload file");
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error uploading file", error);
      // Handle error, e.g., show an error message
    }
  };

  useEffect(() => {
    // socket.on("goodbye", (data) => {
    //   alert(data);
    //   handleLogout();
    // });
    const fetchData = async () => {
      if (!token) return;
      await fetchUserProfile();
      await Promise.all([fetchPosts(), fetchFriends()]);
    };
    fetchData();
  }, [token, accStatus, profileImage]);



  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:7070/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(response.data);
      setProfileImage(response.data.imageUrl);
      setAccStatus(response.data.accountStatus);
      // connectEver();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized, handle accordingly (e.g., redirect to login)
        console.error("Unauthorized:", error);
      } else {
        // Other errors (network issues, server errors, etc.)
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const fetchPosts = async () => {
    // console.log("this is posts")
    try {
      const response = await axios.get(
        "http://localhost:7070/user/profile/allposts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data)

      // Assuming the API returns user profile data in the response.data
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error fetching user profile
    }
  };

  const fetchFriends = async () => {
    // console.log("this is friends")
    try {
      const response = await axios.get(
        "http://localhost:7070/user/allFriends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming the API returns user profile data in the response.data
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error fetching user profile
    }
  };

  function showDiv(id) {
    // Hide all divs
    document.getElementById("posts").classList.add("hidden");
    document.getElementById("posts").classList.remove("show");
    document.getElementById("bio").classList.add("hidden");
    document.getElementById("bio").classList.remove("show");
    document.getElementById("create-post").classList.add("hidden");
    document.getElementById("create-post").classList.remove("show");

    // Show the selected div
    document.getElementById(id).classList.remove("hidden");
    document.getElementById(id).classList.add("show");
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      const response = await axios.get("http://localhost:7070/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming the API returns user profile data in the response.data
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error fetching user profile
    }

    alert("You logged Out!");
    navigate("/login");
    return;
  };
  const DeleteItem = async (postId, authToken) => {
    try {
      const response = await fetch(
        `http://localhost:7070/user/delete-post/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include your authentication token here
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Post deleted successfully
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in to handle submit");
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Add additional form data as needed, e.g., formData.append('description', description);

      const response = await axios.post(
        "http://localhost:7070/user/create-post",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data", // Make sure to set the content type for FormData
          },
        }
      );
      console.log("submitted file");

      setFile(null);
      if (response.status === 200) {
        alert("File uploaded successfully");
        // Handle success, e.g., show a success message
      } else {
        alert("Failed to upload file");
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error uploading file", error);
      // Handle error, e.g., show an error message
    }
  };

  function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
      document.getElementById("upPrev").src = oFREvent.target.result;
    };
  }

  function postPreview(e) {
    e.preventDefault();
    setFile(e.target.files[0]);
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadPost").files[0]);

    oFReader.onload = function (oFREvent) {
      document.getElementById("postPrev").src = oFREvent.target.result;
    };
  }

  const handleACstatus = async (e) => {
    var ele = document.getElementsByClassName("switch");
    console.log("Toggler used!");
    ele[0].checked = !ele[0].checked;
    console.log("Toggler value", ele[0].checked);
    console.log("AccStatus", accStatus);
    if (ele[0].checked) setAccStatus("PUBLIC");
    else setAccStatus("PRIVATE");

    try {
      const response = await axios.post(
        `http://localhost:7070/user/AccountStatus/${ele[0].checked}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
    } catch (error) {
      console.log("Catch block of handleACstatus!", error);
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
      }
    }
  };

  if (token === null || token === "undefined") {
    handleLogout();
    return <Login />;
  }
  if (userProfile === null) return <h1>Loading.....</h1>;
  return (
    <>
      <div className="parent">
        <div className="left">
          <div className="profilePicture">
            <div className="Switcher">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={accStatus === "PUBLIC"}
                  onClick={handleACstatus}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="field-content">
              <section className="profile-photo">
                <div className="user-profile-image">
                  <label>
                    {/* <img src={userProfile.imageUrl} alt="Profile" className="profile-image" /> */}
                    {profileImage !== null ? (
                      <img
                        src={userProfile.imageUrl}
                        alt="Profile"
                        className="profile-image"
                      />
                    ) : (
                      <img
                        src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
                        alt="Profile"
                        className="profile-image"
                      />
                    )}
                  </label>
                </div>
                <div className="uploader">
                  <span>
                    <input
                      accept="image/png,image/jpeg, gif"
                      className="hidden"
                      id="profile_image_5585964168781"
                      name="profile[image]"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <FaCamera className="uploader-icon" />
                  </span>
                </div>
              </section>
            </div>

            <h3>
              {userProfile.firstName} {userProfile.lastName}
            </h3>
            <h3>{userProfile.nickName}nickName</h3>
            {/* <button type="button">Edit Profile</button> */}
            <button type="button" id ="logout" onClick={handleLogout}>Logout</button>
          </div>
          <div className="events">events</div>
        </div>

        <div className="contentArea">
          <div className="contentBar">
            <button type="button" onClick={() => showDiv("posts")}>
              Posts
            </button>
            <button type="button" onClick={() => showDiv("bio")}>
              Biodata
            </button>
            <button type="button" onClick={() => showDiv("create-post")}>
              Create Post
            </button>
          </div>
          <div className="contentType">
            <div className="posts show " id="posts">
              {Posts.map((post) => (
                <div key={post.postId} className="post-wrapper">
                  {post.postImageUrl.endsWith(".mp4") ? (
                    <Post_video
                      url={post.postImageUrl}
                      description={post.postDescription}
                      id={post.postId}
                      Token={localStorage.getItem("token")}
                      deleteItem={DeleteItem}
                    />
                  ) : (
                    <Post
                      url={post.postImageUrl}
                      description={post.postDescription}
                      id={post.postId}
                      Token={localStorage.getItem("token")}
                      deleteItem={DeleteItem}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="bio hidden" id="bio">
              Bio
            </div>

            <div className="create-post hidden" id="create-post">
              <form className="preDiv" onSubmit={handleSubmit}>
                <img className="postPrev" id="postPrev" src="" />
                <input
                  type="file"
                  name="uploadPost"
                  id="uploadPost"
                  onChange={postPreview}
                />
                {/* <input type="text" name="PostDescription" id="PostDescription" onChange={(e)=>{setDescription(e.target.value)}}/>   */}
                <button type="submit" id="postSubmit" name="postSubmit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="post_veiwer">
          <Carausel posts={Posts} />
        </div>

        <div className="friendList">
          <div className="friends">
            {friends.map((friend) => (
              <div key={friend.userId}>
                <FriendCard friend={friend} loggedUser={userProfile} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

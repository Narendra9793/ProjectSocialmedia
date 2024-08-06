import React,{useState, useEffect }  from 'react'
import './Login.css'
import {useNavigate } from 'react-router-dom'; 
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('email@gmail.com');
  const [password, setPassword] = useState('password');
  // const [token, setToken] = useState(null);
  
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:7070/api/auth/login', {
        email: username,
        password: password,
      })
      localStorage.setItem('token', response.data.jwtToken)
      // Assuming your API returns a token in the 'token' property

      // if (localStorage.getItem('token') !== response.data.jwtToken) {
      //   alert("Wrong Credentials!");
      //   // navigate('/login'); // Adjust the path as needed
      //   return;
      // }
      if ( response.data.jwtToken === undefined) {
        alert("Wrong Credentials!");
        navigate('/login'); // Adjust the path as needed
        return;
      }
      // Store the token in localStorage or sessionStorage
      
      // setToken(localStorage.getItem('token'));
      alert("You are Logged in !");

      navigate('/home');// Adjust the path as needed
    } 
    catch (error) {
      alert("Wrong Credentials!");
      console.error('Error during login:', error);
      // Handle login failure
    }


  };

  return (
    <>
      <div className="background" id="background">
        <div className="login-card" id="login-card">
          <img
            className="image "
            src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
            alt=""
          />
          <form className="login-details " action="">
            <input
              type="email"
              name="email"
              className="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              className="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className="text-1" href="http://">
              SignUp
            </a>
            <a className="text-2" href="http://">
              Forgot Password?
            </a>

            <button type="button" className="btn" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;




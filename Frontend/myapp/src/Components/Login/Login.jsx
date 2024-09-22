import React, { useState, useEffect, useCallback } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from "../../context/SocketProvider";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const socket = useSocket();

  // const connectEver = useCallback(() => {
  //   console.log("Entered in connect", userId);
  //   if (!userId) {
  //     console.log("connectEver aborted: userId is null");
  //     return;
  //   }
  //   socket.emit("ConnectEveryone", `${userId}`);
  //   console.log("Ending in connect");
  // }, [userId, socket]);

  // useEffect(() => {
  //   if (userId) {
  //     connectEver();
  //   }
  // }, [userId, connectEver]);

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:7070/api/auth/login', {
  //       email: username,
  //       password: password,
  //     });

  //     if (response.data.jwtToken) {
  //       localStorage.setItem('token', response.data.jwtToken); // Store token
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwtToken}`; // Set default header
  //       setUserId(response.data.userId);
  //       setToken(response.data.jwtToken);
  //       console.log("Response", response);
  //       alert('You are logged in!');
  //       navigate('/home'); // Navigate to home
  //     } else {
  //       alert('Invalid credentials, please try again.');
  //     }
  //   } catch (error) {
  //     alert('Login failed! Please check your credentials and try again.');
  //     console.error('Error during login:', error);
  //   }
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:7070/api/auth/login', {
        email: username,
        password: password,
      });
  
      if (response.data.jwtToken) {
        localStorage.setItem('token', response.data.jwtToken); // Store token
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwtToken}`; // Set default header
        setUserId(response.data.userId);
        setToken(response.data.jwtToken);
        console.log("Response", response);
  
        // Emit ConnectEveryone event after setting userId
        socket.emit("ConnectEveryone", `${response.data.userId}`);
  
        alert('You are logged in!');
        navigate('/home'); // Navigate to home
      } else {
        alert('Invalid credentials, please try again.');
      }
    } catch (error) {
      alert('Login failed! Please check your credentials and try again.');
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div className="background" id="background">
      <div className="login-card" id="login-card">
        <form className="login-details" onSubmit={(e) => e.preventDefault()}>
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
          <a className="text-1" href="/signup">
            SignUp
          </a>
          <a className="text-2" href="/forgot-password">
            Forgot Password?
          </a>
          <button type="button" className="btn" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


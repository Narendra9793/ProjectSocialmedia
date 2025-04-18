// import React, { useState, useEffect, useCallback } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useSocket } from "../../context/SocketProvider";
// import { useUser } from '../../context/UserProvider';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const socket = useSocket();
//   const [user, setUser] = useUser();


//   useEffect(()=>{console.log("logger user ",user)}, [user])

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
//         email: username,
//         password: password,
//       });
  
//       if (response.data.jwtToken) {
//          // Store token
//         localStorage.setItem('token', response.data.jwtToken);
//         localStorage.setItem('user', JSON.stringify(response.data.userId));
        
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwtToken}`; // Set default header
//         setUser(response.data.userId);
//         setUserId(response.data.userId);
//         setToken(response.data.jwtToken);
//         console.log("Response", response);
  
//         // Emit ConnectEveryone event after setting userId
//         // socket.emit("ConnectEveryone", `${response.data.userId}`);
  
//         // navigate('/home'); // Navigate to home
//         toast.success("Login Successful!", {
//           icon: "✅"
//         })
//         setUsername("");
//         setPassword("")
//       } else {
//         alert('Invalid credentials, please try again.');
//       }
//     } catch (error) {
//       alert('Login failed! Please check your credentials and try again.');
//       console.error('Error during login:', error);
//     }
//   };
  

//   return (
//     <div className="background" id="background">
//       <div className="login-card" id="login-card">
//         <form className="login-details" onSubmit={(e) => e.preventDefault()}>
//           <input
//             type="email"
//             name="email"
//             className="email"
//             placeholder="Email"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             name="password"
//             className="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="text-style">
//             <a className="text-1" href="/signup">
//               SignUp
//             </a>
//             <a className="text-2" href="/forgot-password">
//               Forgot Password?
//             </a>
//           </div>
//           <button type="button" className="btn" onClick={handleLogin}>
//             Login
//           </button>
//         </form>
//         <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         toastClassName={() =>
//           "relative flex p-4 mb-4 w-full max-w-xs text-white bg-green-500 rounded-lg shadow-lg ring-1 ring-green-700"
//         }
//         bodyClassName={() => "text-sm font-medium"}
//         progressClassName="bg-green-700 h-1 rounded"

//       />
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from "../../context/SocketProvider";
import { useUser } from '../../context/UserProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const [user, setUser] = useUser();

  useEffect(() => {
    console.log("logger user ", user)
  }, [user]);

  const validateForm = () => {
    if (!username || !password) {
      toast.error("Email and password are required.");
      return false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        email: username,
        password: password,
      });

      if (response.data.jwtToken) {
        localStorage.setItem('token', response.data.jwtToken);
        localStorage.setItem('user', JSON.stringify(response.data.userId));

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwtToken}`;
        setUser(response.data.userId);
        setUserId(response.data.userId);
        setToken(response.data.jwtToken);

        toast.success("Login Successful!", { icon: "✅" });
        setUsername("");
        setPassword("");

        
        setTimeout(() => navigate('/user/profile'), 1000);
      } else {
        toast.error('Invalid credentials, please try again.', { icon: "❌"});
      }
    } catch (error) {
      toast.error('Login failed! Please check your credentials.', { icon: "❌"});
    } finally {
      setLoading(false);
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

          <div className="text-style">
            <a className="text-1" href="/signup">SignUp</a>
            <a className="text-2" href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="button" className="btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Wait..." : "Login"}
          </button>
        </form>

        {loading && (
          <div className="login-loader-container">
            <div className="login-loader"></div>
          </div>
        )}

        <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  closeOnClick
                  pauseOnHover
                  draggable
        />
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      // Show success toast
      toast.success(response.data.message || 'Registration successful!', {
        icon: '✅',
      });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');


    } catch (error) {
      // Show error toast
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage, {
        icon: '❌',
      });
    };
  }


  return (
    <>


      <div className="background" id="background">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
        <div className="signUp-card" id="signUp-card">
          <form className="signUp-details" onSubmit={handleSubmit}>
            <div className="full-name">
            <input type="text" name="firstName"  id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' required />
            <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' required />
            </div>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <div className='password'>
              <input type={showPassword ? 'text' : 'password'}
               name="password" id="password" 
               value={password} onChange={(e) => setPassword(e.target.value)} 
               placeholder='Password' required 
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit" className='btn'>SignUp</button>
          </form>
        </div>
      </div>
    </>)
};

export default SignUp;


import React, { useState } from 'react';
import './SignUp.css';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7070/api/auth/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });

      setAlertMessage(response.data);
      setAlertSeverity('success');
    } catch (error) {
      setAlertMessage(error.message);
      setAlertSeverity('error');
    }
  };

  return (
    <>
      <Alert severity={alertSeverity}>{alertMessage}</Alert>
      <div className='background' id="background">
        <div className='signUp-card' id="signUp-card">
          <form className="signUp-details" onSubmit={handleSubmit}>
            <input type="text" name="firstName" className="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' required />
            <input type="text" name="lastName" className="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' required />
            <input type="email" name="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type="password" name="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type="submit" className='btn'>SignUp</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

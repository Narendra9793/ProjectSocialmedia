import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import Feeds from './Components/Feeds/Feeds';
import { SocketProvider } from './context/SocketProvider';
import { UserProvider } from './context/UserProvider';
import Sidebar from './Components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';

function App() {
  const [showSidemenu, setSidemenu] = useState(false);
  const [showNavbar, setShownavbar] = useState(window.innerWidth > 700);

  const handlesidemenu= ()=>{
    setSidemenu(!showSidemenu)
  }
  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setShownavbar(window.innerWidth > 700)
    })

    return ()=>{
      window.removeEventListener('resize',()=>{
        setShownavbar(window.innerWidth > 700)
      })
    }
  }, [])
  return (
    <UserProvider>
      <SocketProvider>
        <BrowserRouter>
         { showNavbar && <Navbar className="navbar"/>}
          <div className="burger-menu">
           <button type="button" onClick={handlesidemenu}><i class="fa fa-bars" aria-hidden="true"></i></button>
          </div>
          {showSidemenu && <Sidebar/>}
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/feeds" element={<Feeds />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;


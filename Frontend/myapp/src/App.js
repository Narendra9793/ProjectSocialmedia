import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/Login/Login';
import Home from'./Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from'./Components/SignUp/SignUp';
import Feeds from './Components/Feeds/Feeds';
import { SocketProvider } from './context/SocketProvider';
import { UserProvider } from './context/UserProvider';


function App() {


  return (
    <UserProvider>
        <SocketProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>
            <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/user/profile" element={<Profile/>}/>
              <Route path="/user/feeds" element={<Feeds/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signUp" element={<SignUp/>}/> 
            </Routes>
          </BrowserRouter>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;

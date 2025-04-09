import { createContext, useContext, useState, useEffect } from "react";

const userContext=createContext(null);

export const useUser= ()=>{
    return useContext(userContext);

};

export const UserProvider=(props)=>{
    const [user, setUser]=useState(null);

      // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
    return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
    )
}
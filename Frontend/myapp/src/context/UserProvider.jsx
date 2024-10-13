import { createContext, useContext, useState } from "react";

const userContext=createContext(null);

export const useUser= ()=>{
    return useContext(userContext);
};

export const UserProvider=(props)=>{
    const [user, setUser]=useState(null);
    return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
    )
}
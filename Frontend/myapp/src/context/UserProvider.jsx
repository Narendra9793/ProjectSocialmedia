import { createContext, useContext, useState, useEffect } from "react";

const userContext = createContext(null);

export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    console.log("This is userProver UE1");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    console.log("This is userProver UE2");
    console.log("User", user);
    if (user) {
      
      localStorage.setItem("user", user);
      console.log("user from userProvider", user);
      
    }
  }, [user]);

  return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
  );
};

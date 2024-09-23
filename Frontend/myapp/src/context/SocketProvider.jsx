// import React, { createContext, useMemo, useContext, useEffect } from "react";
// import * as io from "socket.io-client";
// import { SOCKET_BASE_URL } from "../constants/apiConstants";

// const SocketContext = createContext(null); //this is to create an Empty context or container

// // this will help us to use Socket Context
// export const useSocket = () => {
//   const socket = useContext(SocketContext);
//   return socket;
// };

// export const SocketProvider = (props) => {

//   const socket = io(SOCKET_BASE_URL, {
//     // reconnection : false
//   });

//   return (
//     <SocketContext.Provider value={socket}>
//       {props.children}
//     </SocketContext.Provider>
//   );
// };


import React, { createContext, useMemo, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; // Ensure correct import for Socket.IO
import { SOCKET_BASE_URL } from "../constants/apiConstants";

const SocketContext = createContext(null);

// Custom hook to use Socket context
export const useSocket = () => {
  return useContext(SocketContext);
};

// Socket Provider component
export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_BASE_URL, {
      reconnection: true, // Enable reconnection if needed
      reconnectionAttempts: 5, // Optional: number of reconnection attempts
      transports: ['websocket'], // Ensure websocket transport is used
    });

    // Log connection and disconnection events
    socketInstance.on('connect', () => {
      console.log("Connected to Socket.IO server");
    });

    socketInstance.on('disconnect', (reason) => {
      console.log(`Disconnected: ${reason}`);
    });

    setSocket(socketInstance); // Store the socket instance in state

    // Cleanup function to disconnect socket on unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

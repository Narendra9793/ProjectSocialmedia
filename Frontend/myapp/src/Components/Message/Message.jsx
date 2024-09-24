import React, { useEffect, useState, useCallback } from "react";
import { useSocket } from '../../context/SocketProvider'
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import "./Message.css";
import { MessageList } from "./MessageList";
import { timeStampConverter } from "../../util/timeUtils";
import { useFetch } from "../../customHooks/useFetch";

const Message = ({ loggedUser, receiverId }) => {
  const socket= useSocket();
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [socketResponse, setSocketResponse] = useState({
    username : "",
    senderId: "",
    receiverId: "",
    content: "",
    messageType: "",
    createdDateTime: "",
  });
  // const [isConnected, setConnected] = useState(false);

  // const { responseData, error, loading } = useFetch("/message/" + `thisistheroomkeyforusers${loggedUser.userId}and${receiverId}`);
  const { responseData, error, loading } = useFetch("/message/" + `${loggedUser.userId}_${receiverId}`);

  const addMessageToList = (val) => {
    if (val.room == "") return;
    setMessageList([...messageList, val]);
  };

  const sendData = useCallback(
    (payload) => {
      socket.emit("SendMessage", {
        username: `${loggedUser.firstName}`,
        senderId: `${loggedUser.userId}`,
        recieverId: `${receiverId}`,
        content: payload.content,
        messageType: "CLIENT",
      });
    },
    [socket]
  );
  const fetchMsg=(res)=>{
    // console.log("ReceiveMessage event got fired ", res);
    setSocketResponse({
      username: res.username,
      senderId: res.senderId,
      receiverId:res.receiverId,
      content: res.content,
      messageType: res.messageType,
      createdDateTime: res.createdDateTime,
    });
  }
  useEffect(() => {
    socket.on("ReceiveMessage", fetchMsg);

    return () => {
      socket.off("ReceiveMessage", fetchMsg);
    };
  }, [socketResponse]);

  useEffect(() => {
    if (responseData != undefined) {
      setMessageList([...responseData, ...messageList]);
    }
  }, [responseData]);

  useEffect(() => {
    // console.log("Socket Response: ", socketResponse);
    addMessageToList(socketResponse);
  }, [socketResponse]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput != "") {
      sendData({
        content: messageInput,
      });
      const time = ""; //timeStampConverter(Math.floor(Date.now() / 1000));
      addMessageToList({
        username : loggedUser.firstName,
        content: messageInput,
        senderId: loggedUser.userId,
        receiverId: receiverId,
        createdDateTime: new Date(),
        messageType: "CLIENT",
      });
      setMessageInput("");
    }
  };

  return (
    <div className="message_root_div">
      <div className="message_component">
        <MessageList loggedUser={loggedUser} messageList={messageList} />
        <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">
            {messageInput == "" ? (
              <RiSendPlaneLine size={25} />
            ) : (
              <RiSendPlaneFill color="#2671ff" size={25} />
            )}
          </button>
        </form>
      </div>
    </div>
  );

};
export default Message;


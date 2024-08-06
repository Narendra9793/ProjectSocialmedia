import React, { useState, useEffect, useMemo } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import './ChatRoom.css';
import axios from 'axios'; 

const ChatRoom = ({senderId, receiverId}) => {
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [chatResponse, setChatResponse] = useState(null);


    useMemo(() => {
        const socket = new SockJS('/ws'); 
        const stomp= Stomp.over(socket); 
        setStompClient(stomp);
        stomp.connect({}, onConnected, onError);
    }, [senderId, receiverId]); 

  useEffect(() => {
    fetchAndDisplayUserChat().then(displayMessage(chatResponse))
  }, [chatResponse]);


  function onConnected() {
    stompClient.subscribe(`/user/${senderId}/queue/messages`, {});
    // stompClient.subscribe(`/user/public`, onMessageReceived);
  }

  function onError() {
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
  }


  function displayMessage(chatResponse) {
    if(chatResponse === null)return;
    const chatArea = document.getElementById('chat-messages');
    
    chatArea.innerHTML = '';

    chatResponse.forEach(chat => {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message');
      if (chat.senderId === senderId) {
          messageContainer.classList.add('sender');
      } else {
          messageContainer.classList.add('receiver');
      }
      const message = document.createElement('p');
      const time = document.createElement('p');
      // time.textContent = Time;
      message.textContent = chat.content;
  
      messageContainer.appendChild(message);
      // messageContainer.appendChild(time);
      chatArea.appendChild(messageContainer);
      chatArea.scrollTop = chatArea.scrollHeight;
    });
}


const fetchAndDisplayUserChat = async () => {
    try {
        const userChatResponse = await axios.get(`/messages/${senderId}/${receiverId}`); 
        setChatResponse(userChatResponse.data);
        console.log("We are in fetchAndDisplayUserChat")
    } catch (error) {
        console.error(error);
    }
}



function sendeHandler(e) {
    const chatArea = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message');
    const messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
        const chatMessage = {
            senderId: senderId,
            recipientId: receiverId,
            content: messageInput.value.trim(),
            timestamp: new Date()
        };
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    chatArea.scrollTop = chatArea.scrollHeight;
    setMessage("")
    e.preventDefault();
}

  return (
    <div>
        <h2>Spring boot & Websocket By Narendra </h2>
        <div className="chat-container" id="chat-page">
            <div className="chat-area" id="chat-messages"></div>
            <form id="messageForm" name="messageForm">
                <div className="message-input">
                    <input  type="text" id="message" placeholder='Enter Your Message...' value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <button type='submmit' onClick={sendeHandler}>Send</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ChatRoom;

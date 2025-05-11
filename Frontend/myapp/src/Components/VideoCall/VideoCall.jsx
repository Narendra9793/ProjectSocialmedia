
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSocket } from '../../context/SocketProvider';
import "./VideoCall.css"
import 'bootstrap-icons/font/bootstrap-icons.css';


const VideoCall = ({loggedUser, friend}) => {
  const [room, setRoom] = useState("");
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [isCaller, setIsCaller] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const rtcPeerConnectionRef = useRef(null);
  const remoteDescriptionPromiseRef = useRef(null);
  const socket = useSocket();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const  [isConnected, setIsConnected]=useState(false);
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:global.stun.twilio.com:3478" }
    ]
  };

  const streamConstraints = { audio: true, video: true };
  useEffect(()=>{
    if(isConnected)

     document.getElementById("videoIcon").classList.add("video_Endcall_Icon")
    else{
      document.getElementById("videoIcon").classList.remove("video_Endcall_Icon")
    }
  }, [isConnected])

  useEffect(() => {
    socket.on('created', handleCreated);
    return () => {
      socket.off('created', handleCreated);
      cleanupConnections();
    };
  }, [socket]);

  useEffect(() => {
    socket.on('incomingCall', handleIncommingCall);   
    socket.on('joined', handleJoined);
    socket.on('setCaller', handleSetCaller);
    socket.on('ready', handleReady);
    socket.on('candidate', handleCandidate);
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    // socket.on('userDisconnected', handleUserDisconnected);
    socket.on('YouEndedCall', handleYouEndedCall);
    socket.on('EndedCall', handleEndedCall);
    socket.on('full', handleFull);

    return () => {
      socket.off('incomingCall', handleIncommingCall);  
      socket.off('joined', handleJoined);
      socket.off('setCaller', handleSetCaller);
      socket.off('candidate', handleCandidate);
      socket.off('ready', handleReady);
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('YouEndedCall', handleYouEndedCall);
      socket.off('EndedCall', handleEndedCall);

      socket.off('full', handleFull);
      cleanupConnections();
    };

  }, [isCaller, isRoomJoined]);

  //When you will receive a video call server will let u know
  const handleIncommingCall= (data) => {
    console.log("U got a call!", data)
    setRoom(data.roomKey)
    var ele=document.getElementById(`picker${data.callerId}`);
    ele.classList.remove("hide_pick_call_card")
    
  };

  // This event will be fired when friend will join the room and it sets the value of IsCaller
  const handleSetCaller = callerId => {
    console.log("Caller Id", callerId);
    console.log("loggedUser Id", loggedUser.userId);
    setIsCaller(loggedUser.userId === callerId);
    console.log("IsCaller ? ", isCaller);
  };

  //This event will get your streams and set it in your localStream variable and emit a ready event for seocket server
  const handleJoined = useCallback(async (room) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(streamConstraints);
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      socket.emit('ready', room);
      setIsRoomJoined(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }, []);




// This event is sended by the socket server to all users who have joined a particular room but executes only for user who decided to call to his friend
//Caller user will make a peerConnection and fire offer event
  const handleReady = () => {
    console.log("Ready handler started with is caller value= ", isCaller);
    console.log("Ready handler started with localStream value= ", localStream);
    if (isCaller && localStream) {
      console.log("Inside if condition of handleReady");
      initializePeerConnection();
      rtcPeerConnectionRef.current.createOffer().then(sessionDescription => {
        rtcPeerConnectionRef.current.setLocalDescription(sessionDescription);
        socket.emit('offer', {
          type: 'offer',
          sdp: sessionDescription,
          room: room,
        });
        console.log("Ready handler Ended");
      }).catch(console.error);
    } else if (!localStream) {
      console.error('Local stream not initialized');
    }
  };

  const handleCreated = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(streamConstraints);
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsCaller(true);
      setIsRoomJoined(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }, []);
  const connectToRoom = () => {
    socket.emit('AnswerCall', {
      sender : `${loggedUser.userId}`,
      receiver : `${friend.userId}`
    });
    var ele=document.getElementById(`picker${friend.userId}`)
    ele.classList.add("hide_pick_call_card")
    setIsConnected(true)
  };



  const handleCandidate = event => {
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: event.label,
      candidate: event.candidate,
    });
    if (rtcPeerConnectionRef.current && remoteDescriptionPromiseRef.current) {
      remoteDescriptionPromiseRef.current.then(() => {
        rtcPeerConnectionRef.current.addIceCandidate(candidate);
      }).catch(console.error);
    }
  };


// This will fired when caller will send its offer to picker

  const handleOffer = event => {
    if (!isCaller && localStream) {
      console.log("This is handleOffer from picker side");
      
      initializePeerConnection();
  
      if (event && event.sdp && event.type) {
        remoteDescriptionPromiseRef.current = rtcPeerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(event)
        );
  
        remoteDescriptionPromiseRef.current
        .then(() => {
          if (rtcPeerConnectionRef.current.signalingState === 'have-remote-offer') {
            return rtcPeerConnectionRef.current.createAnswer();
          } else {
            throw new Error('Unexpected signaling state: ' + rtcPeerConnectionRef.current.signalingState);
          }
        })
        
          .then(sessionDescription => {
            return rtcPeerConnectionRef.current.setLocalDescription(sessionDescription);
          })
          .then(() => {
            socket.emit('answer', {
              type: 'answer',
              sdp: rtcPeerConnectionRef.current.localDescription,
              room: room,
            });
          })
          .catch(error => {
            console.error('Error handling offer or setting up peer connection:', error);
          });
      } else {
        console.error('Invalid offer event', event);
      }
    } else if (!localStream) {
      console.error('Local stream not initialized');
    }
  };
  
// This will be fired when picker will send its answer to caller
  const handleAnswer = event => {
    console.log("this is from handleAnswer")
    if (isCaller && rtcPeerConnectionRef.current && rtcPeerConnectionRef.current.signalingState === 'have-local-offer') {
      console.log("this is from handleAnswer; from if cond")
      remoteDescriptionPromiseRef.current = rtcPeerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(event)
      );
      remoteDescriptionPromiseRef.current.catch(console.error);
    }
  };


  const handleFull = () => {
    alert('Room is full!');
    window.location.reload();
  };

  const handleIceCandidate = event => {
    if (event.candidate) {
      socket.emit('candidate', {
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate,
        room: room,
      });
    }
  };

  const handleAddStream = event => {
    setRemoteStream(event.streams[0]);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };

  const toggleTrack = trackType => {
    if (!localStream) {
      return;
    }

    const track = trackType === 'video' ? localStream.getVideoTracks()[0] : localStream.getAudioTracks()[0];
    track.enabled = !track.enabled;
  };

  const initializePeerConnection = () => {
    console.log("initializePeerConnection func call started")
    rtcPeerConnectionRef.current = new RTCPeerConnection(iceServers);
    rtcPeerConnectionRef.current.onicecandidate = handleIceCandidate;
    rtcPeerConnectionRef.current.ontrack = handleAddStream;
    if (localStream) {
      localStream.getTracks().forEach(track => {
        rtcPeerConnectionRef.current.addTrack(track, localStream);
      });
    } else {
      console.error('Local stream not initialized');
    }
  };

  const cleanupConnections = () => {
    if (rtcPeerConnectionRef.current) {
      rtcPeerConnectionRef.current.close();
      rtcPeerConnectionRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

    const handleCall = () => {
      if (buttonDisabled) return;
    
      setButtonDisabled(true);
      setTimeout(() => setButtonDisabled(false), 1000); // prevent spamming for 1 sec
    
      if (isConnected) {
        socket.emit('UserDisconnected', {
          sender: `${loggedUser.userId}`,
          receiver: `${friend.userId}`
        });
        setIsConnected(false);
      } else {
        socket.emit('joinRoom', {
          sender: `${loggedUser.userId}`,
          receiver: `${friend.userId}`
        });
        setIsConnected(true);
      }
    };

    const handleYouEndedCall = () => {
      setIsConnected(false);
      alert("You have Ended the call!");
      console.log("You have Ended the call!");
    
      // Close the peer connection if it exists
      if (rtcPeerConnectionRef.current) {
        rtcPeerConnectionRef.current.close();
        rtcPeerConnectionRef.current = null;
      }
    
      // Stop all media tracks for local stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    
      // Stop all media tracks for remote stream
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
    
      // Clear video elements
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    
      setLocalStream(null);
      setRemoteStream(null);
    };
    

    const handleEndedCall=()=>{
      setIsConnected(false)
      alert("Your Friend have Ended the call!")
      console.log("Your Friend have Ended the call!")
      // Close the peer connection if it exists
      if (rtcPeerConnectionRef.current) {
        rtcPeerConnectionRef.current.close();
        rtcPeerConnectionRef.current = null;
      }
    
      // Stop all media tracks for local stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    
      // Stop all media tracks for remote stream
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
    
      // Clear video elements
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    
      setLocalStream(null);
      setRemoteStream(null);
  }


  return (
    <div>
      <div className="pickCall hide_pick_call_card" id ={`picker${friend.userId}`}>
        <button id="pickUp" onClick={connectToRoom}>Answer</button>
      </div>    
      <div id="roomDiv" className="video_call_window">
        <div id="remoteVideoContainer"className="remoteVideoContainer">
          <video
            id="remoteVideo"
            ref={remoteVideoRef}
            autoPlay
          ></video>

          <div className="control_panel">
            {/* <button id="toggleVideo" className="btn-circle enabled-style" onClick={() => toggleTrack('video')}>
              <i id="videoIcon" className="bi bi-camera-video-fill"></i>
            </button> */}
            {/* <button id="toggleAudio" className="btn-circle enabled-style" onClick={() => toggleTrack('audio')}>
              <i id="audioIcon" className="bi bi-mic-fill"></i>
            </button> */}
            <button type="button" id='callButton'className='callButton' onClick={handleCall}>
              <i id="videoIcon" className="bi bi-camera-video-fill video_Icon"></i>
            </button>
          </div>

          <video
            className="My_Video_Container"
            muted
            id="localVideo"
            ref={localVideoRef}
            autoPlay
          ></video>
        </div>

      </div>
    </div>
  );
};

export default VideoCall;


package com.backend.projectbackend.Controllers;


import com.backend.projectbackend.Dao.MessageRepository;
import com.backend.projectbackend.Dao.RoomRepository;
import com.backend.projectbackend.Models.JoinRoomData;
import com.backend.projectbackend.Models.Message;
import com.backend.projectbackend.Models.MessageType;
import com.backend.projectbackend.Models.Room;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class SocketHandler {

  @Autowired
  private  SocketIOServer server;

  @Autowired
  private RoomRepository roomRepository;
  @Autowired
  private MessageRepository messageRepository;

  private static final Map<String, String> users = new HashMap<>();
  private static final Map<String, String> rooms = new HashMap<>();


  public SocketHandler(SocketIOServer server) {
    this.server = server;
    server.addListeners(this); // Attaching listeners
  }

  @PostConstruct
  public void startSocketIOServer() {
    try {
      server.start();
      log.info("Socket.IO server started successfully.");
    } catch (Exception e) {
      log.error("Failed to start Socket.IO server", e);
    }
  }

  @PreDestroy
  public void stopSocketIOServer() {
    if (server != null) {
      server.stop();
      log.info("Socket.IO server stopped.");
    }
  }
  

  @OnConnect
  public void onConnect(SocketIOClient client) {
    String clientId = client.getSessionId().toString();
    System.out.println("You are connected " + clientId);
    users.put(clientId, null);
  }

  @OnEvent("ConnectEveryone")
  public void ConnectToEveryone(SocketIOClient client, String user) {
    List<Room> rooms = roomRepository.findRoomsByLoggedUserId(Integer. parseInt(user));
    System.out.println("ConnectEveryone event started");
    for (Room room : rooms) {
      System.out.println(user +" joined room " + room.getRoomKey());
      client.joinRoom(room.getRoomKey());
      System.out.println("Connecting");
    }
    System.out.println("ConnectEveryone event ended");
  }



  @OnDisconnect
  public void onDisconnect(SocketIOClient client) {
    System.out.println("Client ///////////" + client.getSessionId() + "is Disconnected !");
    client.sendEvent("goodbye", "Client Disconnected!" );
    String clientId = client.getSessionId().toString();
    String room = users.get(clientId);
    if (!Objects.isNull(room)) {
      System.out.println(String.format("Client disconnected: %s from : %s", clientId, room));
      users.remove(clientId);
      client.getNamespace().getRoomOperations(room).sendEvent("userDisconnected", clientId);
    }
    printLog("onDisconnect", client, room);
  }

  @OnEvent("joinRoom")
  public void onJoinRoom(SocketIOClient client, JoinRoomData jrd) {
    String sender=jrd.getSender();
    String reciever=jrd.getReceiver();
    System.out.println("JoinRoom got fired!" + sender + reciever);
    Room room= this.roomRepository.getRoomsBySenderReceiver(Integer. parseInt(sender), Integer. parseInt(reciever)).get(0);


    System.out.println("This is the first room "+ room.getRoomKey());
    client.joinRoom(room.getRoomKey());
    Set<SocketIOClient> clients = (Set<SocketIOClient>) server.getRoomOperations(room.getRoomKey()).getClients();

    for (SocketIOClient c : clients) {
      System.out.println("this is client "+ c.getSessionId().toString());
        if (c != client) {
            c.sendEvent("incomingCall", room.getRoomKey());
            System.out.println("This is the room where other client is present" + room.getRoomKey());
            System.out.println("This is the client other then me" + c.getSessionId().toString());
        }
    }

    client.sendEvent("created", room.getRoomKey());
    System.out.println("Controller reached");
    users.put(client.getSessionId().toString(), room.getRoomKey());
    rooms.put(room.getRoomKey(), client.getSessionId().toString());
    System.out.println("This is the room's user :" + users.get(client.getSessionId().toString()));
    System.out.println("This is the users's room :" + rooms.get(room.getRoomKey()));
    printLog("onReady", client, room.getRoomKey());
  }


  @OnEvent("AnswerCall")
public void onAnswerCall(SocketIOClient client, JoinRoomData jrd) {
    String sender = jrd.getSender();
    String receiver = jrd.getReceiver();
    System.out.println("JoinRoom got fired! " + sender + " " + receiver);
    
    // Retrieve the list of rooms
    List<Room> rooms = this.roomRepository.getRoomsBySenderReceiver(Integer.parseInt(sender), Integer.parseInt(receiver));

    // Assuming you want the first room in the list
    if (rooms != null && !rooms.isEmpty()) {
        Room room = rooms.get(0); // Get the first room
        System.out.println("This is the room " + room.getRoomKey());

        client.joinRoom(room.getRoomKey());
        client.sendEvent("joined", room.getRoomKey());
        users.put(client.getSessionId().toString(), room.getRoomKey());
        client.sendEvent("setCaller", room); // Send the Room object or its details

        System.out.println("We are in Answer Call event!");
        printLog("onReady", client, room.getRoomKey());
    } else {
        System.out.println("No rooms found for the given sender and receiver.");
        client.sendEvent("error", "Room not found");
    }
}


  @OnEvent("ready")
  public void onReady(SocketIOClient client, String room, AckRequest ackRequest) {
    client.getNamespace().getBroadcastOperations().sendEvent("ready", room);
    System.out.println("We are in server ready event!");
    printLog("onReady", client, room);
  }

  @OnEvent("candidate")
  public void onCandidate(SocketIOClient client, Map<String, Object> payload) {
    String room = (String) payload.get("room");
    client.getNamespace().getRoomOperations(room).sendEvent("candidate", payload);
    printLog("onCandidate", client, room);
  }

  @OnEvent("offer")
  public void onOffer(SocketIOClient client, Map<String, Object> payload) {
    System.out.println("Offerr");
    String room = (String) payload.get("room");
    Object sdp = payload.get("sdp");
    client.getNamespace().getRoomOperations(room).sendEvent("offer", sdp);
    printLog("onOffer", client, room);
  }

  @OnEvent("answer")
  public void onAnswer(SocketIOClient client, Map<String, Object> payload) {
    String room = (String) payload.get("room");
    Object sdp = payload.get("sdp");
    client.getNamespace().getRoomOperations(room).sendEvent("answer", sdp);
    printLog("onAnswer", client, room);
  }

  @OnEvent("leaveRoom")
  public void onLeaveRoom(SocketIOClient client, String room) {
    client.leaveRoom(room);
    printLog("onLeaveRoom", client, room);
  }
  @OnEvent("welcome")
  public void Well(SocketIOClient client, String msg) {
      System.out.println("Client " + client + " joined us");
      printLog("welcome", client, msg);
  }

  @OnEvent("SendMessage")
  public void SendMessage(SocketIOClient client, Message message) {
      String sender = message.getSenderId();
      String receiver = message.getRecieverId();
      System.out.println("SendMessage got fired! Sender: " + sender + ", Receiver: " + receiver+ ", this is msg = "+ message.getContent());
  
      Room room= this.roomRepository.getRoomsBySenderReceiver(Integer. parseInt(sender), Integer. parseInt(receiver)).get(0);
      if (room == null) {
          System.out.println("Room not found for sender: " + sender + " and receiver: " + receiver);
          return;
      }
      System.out.println("This is the room " + room.getRoomKey());
  
      Message msg = new Message();
      msg.setContent(message.getContent());
      msg.setSenderId(sender);
      msg.setRecieverId(receiver);
      msg.setRoom(room.getRoomKey());
      msg.setMessageType(MessageType.CLIENT); // Assuming setMessageType is the correct method
      msg.setUsername(message.getUsername());
  
      this.messageRepository.save(msg);
  
      Set<SocketIOClient> clients = (Set<SocketIOClient>) server.getRoomOperations(room.getRoomKey()).getClients();
      for (SocketIOClient c : clients) {
          if (c != client) {
              c.sendEvent("ReceiveMessage", msg);
              System.out.println("ReceiveMessage event is sended");
          }
      }
      
      printLog("SendMessage", client, room.getRoomKey());
  }
  

  private static void printLog(String header, SocketIOClient client, String room) {
    if (room == null) return;
    int size = 0;
    try {
      size = client.getNamespace().getRoomOperations(room).getClients().size();
    } catch (Exception e) {
      log.error("error ", e);
    }
    log.info("#ConncetedClients - {} => room: {}, count: {}", header, room, size);
  }
}




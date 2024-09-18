package com.backend.projectbackend.Configuration;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SocketConfig {

  @Value("${socket.host}")
  private String host;

  @Value("${socket.port}")
  private int port;

  @Bean
  public SocketIOServer socketIOServer() throws Exception {
    System.out.println("About to running SocketServer");
    com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
    config.setHostname(host);
    config.setPort(port);
    return new SocketIOServer(config);
  }
}


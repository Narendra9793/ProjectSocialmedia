package com.backend.projectbackend.Controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.projectbackend.Dao.RoomRepository;
import com.backend.projectbackend.Models.Message;
import com.backend.projectbackend.Models.Room;
import com.backend.projectbackend.Services.MessageService;

import java.util.List;

@RestController
@RequestMapping("/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final RoomRepository roomRepository;

    @CrossOrigin
    // @GetMapping("/{particiepents}")
    // public ResponseEntity<List<Message>> getMessages(@PathVariable String particiepents) {
    //     String part1=particiepents.substring(0, 0);
    //     String part2=particiepents.substring(2, 2);
    //     Room room= roomRepository.getRoomsBySenderReceiver(Integer.parseInt(part1),Integer.parseInt(part2)).get(0);
    //     return ResponseEntity.ok(messageService.getMessages(room.getRoomKey()));
    // }

    @GetMapping("/{participants}")
public ResponseEntity<List<Message>> getMessages(@PathVariable String participants) {
    // Split the participants string assuming it's in the format "part1-part2"
    String[] parts = participants.split("_");
    
    // Check that there are exactly two parts
    if (parts.length != 2) {
        return ResponseEntity.badRequest().body(null); // Or you can throw a custom exception
    }

    try {
        // Parse participants as integers
        int part1 = Integer.parseInt(parts[0]);
        int part2 = Integer.parseInt(parts[1]);

        // Retrieve the room by sender and receiver
        List<Room> rooms = roomRepository.getRoomsBySenderReceiver(part1, part2);

        if (rooms.isEmpty()) {
            return ResponseEntity.notFound().build(); // No room found for the participants
        }

        // Assuming the first room is the correct one
        Room room = rooms.get(0);

        // Fetch messages using the room's key
        List<Message> messages = messageService.getMessages(room.getRoomKey());

        return ResponseEntity.ok(messages);

    } catch (NumberFormatException e) {
        return ResponseEntity.badRequest().body(null); // Handle parsing error
    }
}


}

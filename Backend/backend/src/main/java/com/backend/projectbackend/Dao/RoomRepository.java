package com.backend.projectbackend.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.projectbackend.Models.Room;

@Repository
public interface RoomRepository extends CrudRepository <Room, Integer> {
    
@Query("SELECT u FROM Room u WHERE u.ParticepentA = :loggedUserId OR u.ParticepentB = :loggedUserId")
List<Room> findRoomsByLoggedUserId(@Param("loggedUserId") int loggedUserId);

@Query("SELECT u FROM Room u WHERE (u.ParticepentA = :sender AND u.ParticepentB = :receiver) OR (u.ParticepentA = :receiver AND u.ParticepentB = :sender)")
List<Room> getRoomsBySenderReceiver(@Param("sender") int sender, @Param("receiver") int receiver);
}

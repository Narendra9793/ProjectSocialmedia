package com.backend.projectbackend.Controllers;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.projectbackend.Dao.CommentRepository;
import com.backend.projectbackend.Dao.FriendRepository;
import com.backend.projectbackend.Dao.SendedRequestRepository;
import com.backend.projectbackend.Dao.LikesRepository;
import com.backend.projectbackend.Dao.PostRepository;
import com.backend.projectbackend.Dao.ReceivedRequestRepository;
import com.backend.projectbackend.Dao.RoomRepository;
import com.backend.projectbackend.Dao.UserRepository;
import com.backend.projectbackend.Models.AccountStatus;
import com.backend.projectbackend.Models.Comment;
import com.backend.projectbackend.Models.Friend;
import com.backend.projectbackend.Models.SendedRequest;
import com.backend.projectbackend.Models.Status;
import com.backend.projectbackend.Models.Likes;
import com.backend.projectbackend.Models.Post;
import com.backend.projectbackend.Models.ReceivedRequest;
import com.backend.projectbackend.Models.Room;
import com.backend.projectbackend.Models.User;
import com.backend.projectbackend.Models.Visitors;
import com.backend.projectbackend.Services.FileService;
import com.backend.projectbackend.Services.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class userController {

    
    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private LikesRepository likesRepository;

    @Autowired
    private SendedRequestRepository sendedRequestRepository;

    @Autowired
    private ReceivedRequestRepository receivedRequestRepository;

    @Autowired
    private FriendRepository friendRepository;

    @Autowired
    private RoomRepository roomRepository;

    /**
     *
     */
    @Value("${project.media}")
    private String path;

    //http://localhost:7070/user/profile
    @GetMapping("/profile")
    public User showUserProfile(Integer userId, Principal principal ) {
        return this.userRepository.getUserByUserName(principal.getName());
    }

    //http://localhost:7070/user/create-post
    @PostMapping("/create-post")
    public String createPost(@RequestParam("file") MultipartFile file, Principal principal){
        
        try {
            Post post = new Post();
            if(file.isEmpty()){
                System.out.println("Image file is empity!");
                post.setPostImageUrl("default url");
            }
            else{
                User user=this.userRepository.getUserByUserName(principal.getName());
                
                // post.setPostDescription(postData.getPostDescription());

                String fileName=this.fileService.uploadMedia(path, file, user.getUserId());
                post.setPostImageUrl(fileName);
        
                post.setOwnerId(user.getUserId());
                post.setUser(user);
                System.out.println(post);
                user.getPosts().add(post);
                this.userRepository.save(user);
            }

            return "post added!";
            
        } catch (Exception e) {
            e.printStackTrace();
            return "post is not added!" ;
        }

    }


        //http://localhost:7070/user/change-dp
        @PostMapping("/change-dp")
        public String changeDPString(@RequestParam("file") MultipartFile file, Principal principal){
            User user=this.userRepository.getUserByUserName(principal.getName());
            try {
                System.out.println("Try block of change dp");

                // if(file.isEmpty()){
                //     System.out.println("Image file is empity!");
                //     user.setImageUrl("https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg");
                // }
                if(user.getImageUrl()!= null && user.getImageUrl()!= ""  && user.getImageUrl()!= "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"){
                    System.out.println("Going to delete previous dp");
                    this.fileService.deleteFile(path, user.getImageUrl());
                    System.out.println("deleted previous dp");
                    String fileName=this.fileService.uploadMedia(path, file, user.getUserId());
                    user.setImageUrl(fileName);
                    this.userRepository.save(user);
                }
                else{
                    
                    String fileName=this.fileService.uploadMedia(path, file, user.getUserId());
                    user.setImageUrl(fileName);
                    this.userRepository.save(user);
                }
    
                return "dp changed!";
                
            } catch (Exception e) {
                System.out.println("catch block of change dp");
                e.printStackTrace();
                System.out.println(e);
                return "dp is not changed!" ;
            }
    
        }
    

    //http://localhost:7070/user/comment/{postId}
    @PostMapping("/comment/{postId}")
    public Comment MakeComment(@PathVariable Integer postId, @RequestBody Comment comment, Principal principal){
        System.out.println("About to make Comment" + postId);
        User user=this.userRepository.getUserByUserName(principal.getName());
        Post post=this.postRepository.findPostBypostId(postId);
        comment.setOwnerId(user.getUserId());
        comment.setPost_id(postId);
        this.commentRepository.save(comment);
        post.getComments().add(comment);
        this.postRepository.save(post);
        return comment;
    }

    //http://localhost:7070/user/like/{postId}
    @PostMapping("/like/{postId}")
    public Post MakeLike(@PathVariable Integer postId,  Principal principal){
        System.out.println("About to like post" + postId);
        Likes like = new Likes();
        User user=this.userRepository.getUserByUserName(principal.getName());
        Post post=this.postRepository.findPostBypostId(postId);
        like.setUserId(user.getUserId());
        like.setPostId(postId);
        this.likesRepository.save(like);

        post.getLikes().add(like);
        this.postRepository.save(post);
        return post;
    }

    //http://localhost:7070/user/dislike/{postId}
    @PostMapping("/dislike/{postId}")
    public Post MakeDislike(@PathVariable Integer postId,  Principal principal){
        System.out.println("About to dislike post" + postId);
        User user=this.userRepository.getUserByUserName(principal.getName());
        Post post=this.postRepository.findPostBypostId(postId);
        Likes like=this.likesRepository.findLikeByuserIdAndpostId(user.getUserId(), post.getPostId());

        post.getLikes().remove(like);
            this.postRepository.save(post);
        return post;
    }


    //http://localhost:7070/user/profile/allposts
    @GetMapping("/profile/allposts")
    public List<Post> ShowAllPosts(Principal principal){
        User user=this.userRepository.getUserByUserName(principal.getName());
        return user.getPosts();
    }

    //http://localhost:7070/user/visit-profile/{userId}
    // @GetMapping("/visit-profile/{userId}")
    // public User ShowProfile(@PathVariable Integer userId,Principal principal){
        
    //     User user=this.userRepository.getUserByUserName(principal.getName());
    //     User userTovisit=this.userRepository.findById(userId).get();
    //     Visitors visitor = new Visitors(user.getUserId(), new Date(), user);

    //     System.out.println(visitor);
    //     System.out.println(userTovisit.getFirstName());
    //     if(!userTovisit.getVisitors().contains(visitor)){
    //         System.out.println("In array");
    //         userTovisit.getVisitors().add(visitor);
    //     }
    //     this.userRepository.save(userTovisit);
    //     System.out.println("this is visited user" + userTovisit.getVisitors());
    //     return userTovisit;
    //
    @GetMapping("/visit-profile/{userId}")
    public User showProfile(@PathVariable Integer userId, Principal principal) {
        User visitorUser = this.userRepository.getUserByUserName(principal.getName());
        User userTovisit = this.userRepository.findById(userId)
            .orElseThrow(() -> new NoSuchElementException("User not found"));
    
        System.out.println(userTovisit.getFirstName());
    
        // Create visitor instance with correct references
        Visitors visitor = new Visitors();
        visitor.setVisitedUser(userTovisit);
        visitor.setVisitor(visitorUser);
        visitor.setVisitDate(new Date());
    
        
    
        // Ensure the visitor is added to userTovisit's visitors list only if unique
        if (!userTovisit.getVisitors().contains(visitor)) {
            userTovisit.getVisitors().add(visitor);
        }

        System.out.println(userTovisit.getVisitors());
        this.userRepository.save(userTovisit);
        return userTovisit;
    }
    
    

    
    //http://localhost:7070/user/delete-post/{postId}
    @DeleteMapping("/delete-post/{postId}")
    public String deletePost(@PathVariable Integer postId, Principal principal){
        User user=this.userRepository.getUserByUserName(principal.getName());
        Post post=this.postRepository.findPostBypostId(postId);

        if(post == null) return "Post doesn't exists!";
        if(user.getUserId() == post.getOwnerId()){
            this.fileService.deleteFile(path, post.getPostImageUrl());
            this.postRepository.delete(post);
            this.userRepository.save(user);
        }
        else return "You are not authorize to delete this post!";
        return "Your post is deleted";
    }
    
    //http://localhost:7070/user/send-request/{receiverId}
    @PostMapping("/send-request/{receiverId}")
    public ResponseEntity<?> sendRequest(@PathVariable Integer receiverId, Principal principal) {
        try {
            // Retrieve sender user
            User senderUser = this.userRepository.getUserByUserName(principal.getName()); 
            // Retrieve receiver user
            User receiverUser = this.userRepository.findById(receiverId).orElse(null);
            if (receiverUser == null) {
                return ResponseEntity.notFound().build();
            }

            for (Friend friend : senderUser.getFriends()) {
                if(friend.getFriendId() == receiverId )
                return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body("User is already your friend!");
            }
            for (SendedRequest sreq : senderUser.getSentRequests()) {
                if(sreq.getReceiverId() == receiverId )
                return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body("You  have already sended the friend request to this user!");
            }
            for (ReceivedRequest Rreq : senderUser.getReceivedRequests()) {
                if(Rreq.getSenderId() == receiverId )
                return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body("You  have already received the friend request from this user!");
            }

            

            //Sender Side
            SendedRequest Sreq = new SendedRequest();
            Sreq.setReceiverId(receiverUser.getUserId());
            Sreq.setUser(senderUser);
            this.sendedRequestRepository.save(Sreq);
            senderUser.getSentRequests().add(Sreq);
            this.userRepository.save(senderUser);

            //Receiver Side
            ReceivedRequest Rreq = new ReceivedRequest();
            Rreq.setSenderId(senderUser.getUserId());
            Rreq.setUser(receiverUser);
            this.receivedRequestRepository.save(Rreq);
            receiverUser.getReceivedRequests().add(Rreq);
            this.userRepository.save(receiverUser);

            return ResponseEntity.ok(Sreq); // Return the created friend request

        } 
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Server error
        }
    }



    //http://localhost:7070/user/all-sended-requests
    @GetMapping("/all-sended-requests")
    List<SendedRequest> allSendedRequests(Principal principal){
        User currUser = this.userRepository.getUserByUserName(principal.getName());
        System.out.println(currUser.getSentRequests());
        return currUser.getSentRequests(); 
    }

    //http://localhost:7070/user/all-received-requests
    @GetMapping("/all-received-requests")
    List<ReceivedRequest> allReceivedRequests(Principal principal){
        User currUser = this.userRepository.getUserByUserName(principal.getName());
        System.out.println(currUser.getReceivedRequests());
        return currUser.getReceivedRequests(); 
    }

    //http://localhost:7070/user/add-friend/{requestId}
    @PostMapping("/add-friend/{ReceiveRequestId}")
    public String AddFriend(@PathVariable Integer ReceiveRequestId) {
        //senderId
        ReceivedRequest Rrequest=this.receivedRequestRepository.findById(ReceiveRequestId).get();
        //receierId
        SendedRequest Srequest=this.sendedRequestRepository.findByReceiverId(Rrequest.getUser().getUserId()).get();
        
        User receiverUser = Rrequest.getUser();
        User senderUser = Srequest.getUser();

        System.out.println("This is sender id " + senderUser.getUserId());
        System.out.println("This is receier id " + receiverUser.getUserId());

        Friend f1=new Friend();
        f1.setFriendId(senderUser.getUserId());
        f1.setUser(receiverUser);

        Friend f2=new Friend(receiverUser.getUserId());
        f2.setFriendId(receiverUser.getUserId());
        f2.setUser(senderUser);


        Room room= new Room();
        room.setParticepentA(senderUser.getUserId());
        room.setParticepentB(receiverUser.getUserId());
        room.setRoomKey("thisistheroomkeyforusers"+senderUser.getUserId()+"and"+receiverUser.getUserId());

        this.roomRepository.save(room);
        this.friendRepository.save(f1);
        this.friendRepository.save(f2);

        receiverUser.getFriends().add(f1);
        senderUser.getFriends().add(f2);

        System.out.println("before deleteing ==============================>");
        senderUser.getSentRequests().remove(Srequest);
        receiverUser.getReceivedRequests().remove(Rrequest);
        System.out.println("after deleteing ==============================>");

        this.userRepository.save(receiverUser);
        this.userRepository.save(senderUser);
        System.out.println("after saving ==============================>");
        return "Friend Added";
    }

    //  //http://localhost:7070/user/reject/{ReceiveRequestId}
    @PostMapping("/reject/{ReceiveRequestId}")
    public String RejectRequest(@PathVariable Integer ReceiveRequestId) {
        //senderId
        ReceivedRequest Rrequest=this.receivedRequestRepository.findById(ReceiveRequestId).get();
        //receierId
        SendedRequest Srequest=this.sendedRequestRepository.findByReceiverId(Rrequest.getUser().getUserId()).get();
        
        User receiverUser = Rrequest.getUser();
        User senderUser = Srequest.getUser();

       
        senderUser.getSentRequests().remove(Srequest);
        receiverUser.getReceivedRequests().remove(Rrequest);



        this.userRepository.save(receiverUser);
        this.userRepository.save(senderUser);

        return "Requested Rejected!";
    }

    //http://localhost:7070/user/AccountStatus/{acStatus}
    @PostMapping("/AccountStatus/{acStatus}")
    public String changeACstatus(@PathVariable Boolean acStatus, Principal principal){
        System.out.println("This is ac method");
        User user = this.userRepository.getUserByUserName(principal.getName());
        if(acStatus)
        user.setAccountStatus(AccountStatus.PUBLIC);
        else user.setAccountStatus(AccountStatus.PRIVATE);
        this.userRepository.save(user);
        return "Your ac Status is " + user.getAccountStatus();
    }
    
    //http://localhost:7070/user/allFriends
    @GetMapping("/allFriends")
    public List<User> getMethodName(Principal principal){
        List<User> frindList= new ArrayList();
        User user = this.userRepository.getUserByUserName(principal.getName());
    
            
        for(Friend friend : user.getFriends()) {
            User f= this.userRepository.findById(friend.getFriendId()).get();
            frindList.add(f);
        }
        
        return frindList;
    }
    
    //localhost:7070/user/allusers
    @GetMapping("/allusers")
    public List<User> getUsers(Principal principal) {
        User user = this.userRepository.getUserByUserName(principal.getName());
        List<User> userList = new ArrayList<>();
            userList=(List<User>) this.userRepository.findAll();
            Iterator<User> iterator = userList.iterator();
            while (iterator.hasNext()) {
                User u = iterator.next();
                if (u.getUserId() == user.getUserId()) {
                    iterator.remove();
                    continue;
                }
                for (Friend friend : user.getFriends()) {
                    if (friend.getFriendId() == u.getUserId()) {
                        iterator.remove();
                        break;
                    }
                }
                for (SendedRequest sreq : user.getSentRequests()) {
                    if (sreq.getReceiverId() == u.getUserId()) {
                        iterator.remove();
                        break;
                    }
                }
                for (ReceivedRequest Rreq : user.getReceivedRequests()) {
                    if (Rreq.getSenderId() == u.getUserId()) {
                        iterator.remove();
                        break;
                    }
                }
            }
        return userList;

}

    //localhost:7070/user/logout
      @GetMapping("/logout")
      public String loggout(Principal principal) {
         User loggedUser=this.userRepository.getUserByUserName(principal.getName());
         loggedUser.setStatus(Status.OFFLINE);
         this.userRepository.save(loggedUser);
        return loggedUser.getFirstName() + " logged out !";
      }
      
    

}

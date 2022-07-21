import {firestoreDataBase, realtimeDataBase} from "./database";
import * as cors from "cors";
import * as express from "express";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const usersCollection = firestoreDataBase.collection("users");
const roomsCollection = firestoreDataBase.collection("rooms");
const rtdbRoomRef = realtimeDataBase.ref("rooms");

app.get("/rooms/:roomid/:username", function (req, res){
    const roomid = req.params.roomid;  
    const userName = req.params.username;  
    const roomidNumber = Number(roomid);
    
    roomsCollection.where("id", "==", roomidNumber).get().then((e)=> {
      if(e.empty){
        res.status(404).json({
          message:"room not found"
        })
      }else{ 
        res.send(e.docs[0].data())
        const roomRef = realtimeDataBase.ref("rooms/" + roomid);
        roomRef.update({
          invited: userName,
          invitedonline: true
        })
      }
    })
  })

app.post("/rooms/:roomid/:username/:play", function (req, res){
    const roomid = req.params.roomid;  
    const userName = req.params.username;  
    const userPlay = req.params.play;  
    const roomRef = realtimeDataBase.ref("rooms/" + roomid);

    roomRef.get().then((snap)=> {
        const data = snap.val()
        if(userName == data.owner){
            roomRef.update({ownerplay: userPlay,}).then(()=> {
                 roomRef.get().then((snap)=>{
                    const newData = snap.val();
                    res.send(newData);
                  })
            })
        }else if(userName == data.invited){
            roomRef.update({invitedplay: userPlay}).then(()=> {
                roomRef.get().then((snap)=> {
                    const newData = snap.val();
                    res.send(newData)
                })
            })
        }
    })
})

app.post("/users", function (req, res){
    const newUserDoc = usersCollection.doc();
    newUserDoc.create(req.body).then(()=> {
        res.send(newUserDoc.id)
    });
});
  
app.post("/rooms", function (req, res){
    const newRoomDoc = roomsCollection.doc();
    newRoomDoc.create(req.body).then(()=>{
        res.send(newRoomDoc.id)
    });
});

app.post("/rooms/:roomid/:users", function (req, res){
    const roomid = req.params.roomid;
    const user = req.params.users;
    
    rtdbRoomRef.update({
        [roomid]:{
            owner: user,
            owneronline: true,
            invitedonline: false
        }
    }).then(()=> {res.send("Room created")});
});

app.post("/invitednotfound/:roomid", function (req, res){
    const roomid = req.params.roomid;
    const roomRef = realtimeDataBase.ref("rooms/" + roomid);
    
    roomRef.update({
        invitedonline: false}).then(()=> {
            res.send("Invited not found")
        });
});
  
app.post("/readyoff/:roomid", function (req, res){
    const roomid = req.params.roomid;
    const roomRef = realtimeDataBase.ref("rooms/" + roomid);
    
    roomRef.update({  
        invitedready: false,
        ownerready: false
    }).then(()=> {
        res.send("Invited Off")
    });
});
  
app.post("/playerready/:roomid/:user", function (req, res){
    const roomid = req.params.roomid;
    const user = req.params.user;
    const roomRef = realtimeDataBase.ref("rooms/" + roomid);

    roomRef.update({
        [user]: true}).then(()=> {
            res.send("Player ready")
        });
});

app.delete("/rooms/:roomid", function (req , res){
    const roomid = req.params.roomid;
    const roomRefInvited = realtimeDataBase.ref("rooms/" + roomid + "/invitedplay");
    const roomRefOwner = realtimeDataBase.ref("rooms/" + roomid + "/ownerplay");
    
    roomRefOwner.remove();
    roomRefInvited.remove();
    res.send("Las jugadas han sido eliminadas");
});
 
app.get("*", function (req , res){
    res.send(__dirname + "/dist/index.html")
});
  
app.listen(port, ()=> {
    console.log(`app listening at http://localhost:${port}`);
});
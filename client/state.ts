import {rtdb} from "./pages/database"
import { getDatabase, ref, onValue, set} from "firebase/database";

type User = {
nombre:string,
id:string,
};

type Room = {
id: number,
owner: string,
};

type Play = "piedra" | "papel" | "tijera";

type Game = { 
myPlay: Play; opponentPlay: Play
};
   
type Result = "win" | "lose";

const realTimedb = getDatabase(rtdb)

const state = {
    data: {
        users: {} as User,
        rooms: {} as Room,
        currentGame: {
            myPlay: "",
            opponentPlay: "",
        },
      history: {
        previousGames: { won: [], lost: [] },
      },
    },
    listeners: [],

    getState() {
        return this.data
    },

    setState(newState: any) {
        this.data = newState;
    },

    setUser(name:string) {
        return fetch("/users", {
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({nombre: name})})
            .then(response => response.text())
            .then((data) => {
                this.data.users = {
                    nombre: name,
                    id: data
                }});       
    },

    createNewRoom(roomid, user){
        return fetch("/rooms", {
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                id: roomid,
                owner: user})
          }).then(()=> {
                fetch("/rooms/" + roomid + "/" + user,{
                    method: "post",
                    headers: {"content-type": "application/json"},
                })
            this.data.rooms = {
                id: roomid,
                owner: user
            }
        })
    },

    invitedNotFound(roomid){
        return fetch("/invitedoff/" + roomid, {
            method: "post",
            headers: {"content-type": "application/json"},
        })
      },

      //ver
      listeningRoom(roomid){
        const refRooms = ref(realTimedb,"rooms/" + roomid );
         onValue(refRooms, (snapshot) => {
            const data = snapshot.val()
            this.data.onlineRoom = data
             for (const cb of this.listeners) {
              cb();
             }
          });
      },

    subscribe(callback: (any: any) => any) {
        state.listeners.push(callback);
    },
};

export { state };
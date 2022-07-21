import { Router } from "@vaadin/router";
import { state } from "../../state";

class ShareCode extends HTMLElement{
    shadow: ShadowRoot
    nombreInvitado: string

    constructor() {
      super(); 
      this.listenroom()
      this.shadow = this.attachShadow({mode: 'open'});
      this.render()
    }

    connectedCallback(){
        state.subscribe(()=> {
            if(state.getState().onlineRoom.invitedonline == false){
            } else if(state.getState().onlineRoom.invitedonline == true){
                this.render()
            }
        })
    }

    render(){
        const div = document.createElement("div")
        div.innerHTML=`
    <div class="container">
        <header-comp owner-name= "${state.getState().users.nombre}">Contrincante</header-comp>
        <p>Compartí el código: ${state.getState().rooms.id} con tu contrincante</p>
        <div class="container-hands">
          <hands-comp class="hand" hand="rock"></hands-comp>
          <hands-comp class="hand" hand="paper"></hands-comp>
          <hands-comp class="hand" hand="scissor"></hands-comp>
        </div>>
    </div>
        `

        const style = document.createElement("style")
        style.textContent=`
            `

        this.shadow.appendChild(div)
        this.shadow.appendChild(style)

        if(state.getState().onlineRoom.invitedonline == true){
            const roomid = state.getState().rooms.id
            state.invitedNotFound(roomid).then(()=> 
                {Router.go("instructions")})
        }
    }
    
        listenroom(){
            const roomid = state.getState().rooms.id
            state.listeningRoom(roomid)
        }
}    

customElements.define("sharecode-comp", ShareCode); 
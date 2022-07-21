import { state } from "../../state";

class Header extends HTMLElement {
        
    constructor() {
          super();
          this.render()
        }
       
        render(){
            const shadow = this.attachShadow({ mode: "open"});
            const div = document.createElement("div")
            const style = document.createElement("style")
            const currentState = state.getState()
            const userName = this.getAttribute("owner-name")
            const roomId = currentState.rooms.id
           
            div.innerHTML = `
            <div class="container">
                <div class="container-names">
                    <p class="owner">${userName}</p>
                    <p class="opponent"></p>
                </div>
                <div class="container-room">
                    <p class="room">Sala</p>
                    <p class="room-code">${roomId}</p>
                </div>
            </div>
            `
            const opponentEl = div.querySelector(".opponent")
            opponentEl.textContent = this.textContent
            
            style.innerHTML = `
            `

         shadow.appendChild(div)  
         shadow.appendChild(style)  
        }
        
    }
    customElements.define("header-comp", Header);  
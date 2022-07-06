import { Router } from "@vaadin/router";

class Home extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.render()
    }
  
    render(){
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML=`
    <div class="container">
        
        <h1 class="title">Piedra Papel ó Tijera</h1>
         <button-new class="new">Nuevo Juego</button-new>
         <button-room class="room">Ingresar a una sala</button-room>
        <div class="container-hands">
            <hands-comp hand="rock"></hands-comp>
            <hands-comp hand="paper"></hands-comp>
            <hands-comp hand="scissors"></hands-comp>
        </div>
    </div>
    `;

        const style = document.createElement("style")
        style.innerHTML=
        `
        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
        } 
        .title{
            font-family: 'Indie Flower', cursive;
            font-size: 80px;
            color: #009048;
            line-height: 100px;
            text-align: center;
            margin-top: 40px;
        }
        .new{
            margin-bottom: 10px;
        }
        `
    shadow.appendChild(style)

   // const buttonNewEl = shadow.querySelector("new")
   // buttonNewEl.addEventListener("click", ()=>{
   // Router.go("new-game")
   // })

   // const buttonRoomEl = shadow.querySelector("room")
   // buttonRoomEl.addEventListener("click", ()=>{
   // Router.go("code-room")
   // })
 }


  }
  
  customElements.define("home-comp", Home);
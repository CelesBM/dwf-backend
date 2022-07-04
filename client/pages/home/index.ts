import { Router } from "@vaadin/router";

class Home extends HTMLElement {

    constructor() {
      super();
      this.render()
    }
  
    render(){
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML=`
    <div class="container">
        <h1 class="title">Piedra Papel ó Tijera</h1>
         <button-new>Nuevo Juego</button-new>
         <button-room>Ingresar a una sala</button-room>
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
        } 
        `
    shadow.appendChild(style)

    const buttonNewEl = shadow.getElementById("button-new")
    buttonNewEl.addEventListener("click", ()=>{
    Router.go("new-game")
    })

    const buttonRoomEl = shadow.getElementById("button-room")
    buttonRoomEl.addEventListener("click", ()=>{
    Router.go("code-room")
    })
    }


  }
  
  customElements.define("home-comp", Home);
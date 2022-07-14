import { Router } from "@vaadin/router";

class NewGame extends HTMLElement {
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
        <form>
          <label for="name" class="name">Tu Nombre</label>
          <input type="text" id="name" name="user_name" class="input">
          <button-new class="new">Empezar</button-new>
        </form>    
        <div class="container-hands">
          <hands-comp class="hand" hand="rock"></hands-comp>
          <hands-comp class="hand" hand="paper"></hands-comp>
          <hands-comp class="hand" hand="scissor"></hands-comp>
        </div>
    </div>
    `;

        const style = document.createElement("style")
        style.innerHTML=`
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
            margin-bottom: 30px;
            }
                @media (min-width: 769px){
                .title{
                margin-top: 5%;
                margin-bottom: 92px;
                }}
        form{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .name{
            font-family: 'Odibee Sans', cursive;
            font-size: 35px;
        }
        .input{
            height: 40px;
            width: 265px;
            font-family: 'Luckiest Guy', cursive;
            font-size: 27px;
            border: 7px solid #001997;
            border-radius: 10px;
            margin-bottom: 10px;
            text-align: center;
        }
        .container-hands{
            display: flex;
            top: 86px;
            position: relative;
            margin: -15px 60px
            }
                @media (min-width: 769px) {
                .container-hands{        
                top: 157px;
                margin: 0px 600px
                }}
        .hand{
            margin: 0px 20px;
            }
                @media (min-width: 769px) {
                .hand{        
                margin: 0px 100px;
                }};
        `;

    shadow.appendChild(style)

         }
    }

customElements.define("newgame-comp", NewGame);
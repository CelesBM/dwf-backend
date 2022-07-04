class ButtonNew extends HTMLElement {
   
    constructor() {
        super();
        this.render();
        }
    
    render(){
        const shadow = this.attachShadow( {mode: "open"} );
        const style = document.createElement("style");
        const button = document.createElement("button");
        button.className = "root";
           
        style.innerHTML = `
        .root{
        }
        `
        button.textContent = this.textContent;
        shadow.appendChild(button);
        shadow.appendChild(style);
        }
    }

    customElements.define("button-new", ButtonNew);
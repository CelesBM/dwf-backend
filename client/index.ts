import "./components/button-new";
import "./components/button-room";
import "./components/hands";
import "./pages/home";
import "./router";
import { Router } from "@vaadin/router";

function main(){
Router.go("/home");
}
main()
import "./components/button-new";
import "./components/button-room";
import "./components/hands";
import "./components/header";
import "./pages/home";
import "./pages/new-game";
import "./pages/code-room";
import "./pages/share-code";
import "./router";
import { Router } from "@vaadin/router";

function main(){
Router.go("/home");
}
main()
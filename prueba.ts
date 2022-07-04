//probando que funcione

import * as express from "express";

const port = 3000;
const app = express();

app.get("/users", function(req, res) {
    res.json(["todos los usuarios"])
});

app.listen(port, ()=> {
    console.log("listening at")
});
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let nickName = "";

app.use(bodyParser.urlencoded({ extended: true }));

function nickNameGenerator(req, res, next) {
  console.log(req.body);
  nickName = req.body["street"] + " " + req.body["pet"];
  next();
}

app.use(nickNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(_dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your nick name is:</h1> <h2>${nickName}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

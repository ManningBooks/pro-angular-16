const express = require("express");
const https = require("https");
const fs = require("fs");
const history = require("connect-history-api-fallback");
const jsonServer = require("json-server");
const bodyParser = require('body-parser');
const auth = require("./authMiddleware");
const router = jsonServer.router("serverdata.json");

const useHttps = false;

const ssloptions = {}

if (useHttps) {
    ssloptions.cert =  fs.readFileSync("./ssl/sportsstore.crt");
    ssloptions.key = fs.readFileSync("./ssl/sportsstore.pem");
}

const app = express();

app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static("./dist/SportsStore/browser"));

app.listen(80, 
    () => console.log("HTTP Server running on port 80"));

if (useHttps) {
    https.createServer(ssloptions, app).listen(443,
        () => console.log("HTTPS Server running on port 443"));
} else {
    console.log("HTTPS disabled")
}

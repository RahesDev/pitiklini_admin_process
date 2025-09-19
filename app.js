require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin");

var ip = require("ip");
var fs = require("fs");
var https = require("https");
var http = require("http");

const app = express();

connectDB();
app.use(express.json());

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5001;

var server = "";
var myip = ip.address();
// if (myip == "62.72.31.215") {
//   const options = {
//     key: fs.readFileSync("/var/www/html/backend/sslfiles/privkey.pem"),
//     cert: fs.readFileSync("/var/www/html/backend/sslfiles/fullchain.pem"),
//     requestCert: false,
//   };
//   server = https.createServer(options, app);
// } else {
//   server = http.createServer(app);
// }

const httpServer = http.createServer(app);
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log("Wallet Server connected on port", PORT);
});

// server.listen(PORT, () => {
//   console.log("Wallet Server connected on", PORT);
// });

// setTimeout(() => {
//   test();
// }, 5000);

const express = require("express"); 
const cors = require("cors");

const kPort = 8080;
const app = express();
// var corsOptions = {
// 	origin: ["http://localhost", "http://localhost:80", "http://localhost:3000", "http://127.0.0.1:3000", "http://127.0.0.1:80"]
// }

app.listen(kPort);
// app.use(cors())
// app.options('*', cors(corsOptions));
// app.use(express.json());

console.log(`app is listening on port ${kPort}`)

app.use("/uploads", express.static('uploads'))

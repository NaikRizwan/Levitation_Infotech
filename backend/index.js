const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000; // You can change this port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const path = require("path"); // Add this line to import the 'path' module

const whitelist = ["https://levitation-infotech-1.onrender.com/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
//app.use(cors());

dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(require("./routes/auth"));
// app.use(express.static(path.join(__dirname, "../reactfirst", "build")));

// // Handle any other routes and serve the React index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../reactfirst", "build", "index.html"));
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

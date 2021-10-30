const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = require("http").Server(app);
const socketIO = require("socket.io");
const { v4: uuidV4 } = require("uuid");
const cookieParser = require("cookie-parser");
const User = require("./models/user.model");
const { validateUserInput } = require("./utils/validators");

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));


  

app.use(cookieParser());
mongoose
     .connect("mongodb://localhost:27017/hackDB", { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/home",(req,res)=>{
  const doctors=
  [
    {
      "name":"Dr. Sumita Reddy", 
      "yearsOfExperience":"20",
      "available":"yes"
    },
    {
      "name":"Dr. Ashok Gupta", 
      "yearsOfExperience":"15",
      "available":"yes"
    },
    {
      "name":"Dr. RK Srinivasan", 
      "yearsOfExperience":"05",
      "available":"yes"
    },
    {
      "name":"Dr. Alka Dubey", 
      "yearsOfExperience":"10",
      "available":"no"
    }
  ]
  var listOfDoctors=[]
  for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].available==="yes") {
          listOfDoctors.push(doctors[i]);
      }
  }

  console.log(listOfDoctors)
  res.render("home",{listOfDoctors:listOfDoctors})
})

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/", (req, res) => {
  User.find(
      {
        username: req.body.username,
      },
      function (err, user) {
        try {
          if (user.password == req.body.password) {
            logU = true;
            message = "";
            res.cookie("username", req.body.username);
            res.cookie("password", req.body.password);
            console.log(req.cookies);
            res.redirect("/home");
          } else {
            res.redirect("/");
            message = "Invalid Password";
            console.log(message);
          }
        } catch (err) {
          res.redirect("/");
          message = "Invalid Email";
          console.log(message);
        }
      }
    );
  });

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  User.create(req.body.user, function (err, user) {
    console.log(user);
    try {
      console.log(user);
      logU = true;
      res.redirect("/home");
    } catch (err) {
      console.log(err);
    }
  });
});

app.get("/chat", function (req, res) {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:roomId/chat", function (req, res) {
  res.render("chat", { roomId: req.params.roomId });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

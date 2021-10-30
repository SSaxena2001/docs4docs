const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = require("http").Server(app);
const socketIO = require("socket.io");
const { v4: uuidV4 } = require("uuid");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to MONGO");
});

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/", (req, res) => {
  let { errors, valid } = validateUserInput(
    req.body.username,
    req.body.password
  );
  if (valid) {
    User.findOne(
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
            res.redirect("/test");
          } else {
            res.redirect("/");
            message = "Invalid Password";
            console.log(message);
          }
        } catch (err) {
          res.redirect("/");
          message = "Invalid Username";
          console.log(message);
        }
      }
    );
  } else {
    console.log(errors);
    res.redirect("/");
  }
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
      res.redirect("/");
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

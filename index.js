const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = require("http").Server(app);
const socketIO = require("socket.io");
const { v4: uuidV4 } = require("uuid");
const cookieParser = require("cookie-parser");
const Patient = require("./models/patient.model");
const Doctor = require("./models/doctor.model");
// const { validateUserInput } = require("./utils/validators");

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(cookieParser());
mongoose
  .connect(
    "mongodb+srv://admin-suvigya:suv1402@cluster0.xva3j.mongodb.net/docs4docsDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/home", (req, res) => {
  Doctor.find(
    {
      available:"yes",
    },
    function (err, doctors) {
      try {
        res.render("home",{doctors:doctors})
      } catch (err) {
        message = "No Doctors found!";
        console.log(message);
      }
    }
  );
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/", (req, res) => {
  Patient.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      try {
        if (user.password == req.body.password) {
          logU = true;
          message = "";
          res.cookie("user_email", req.body.email);
          res.cookie("user_password", req.body.password);
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
  Patient.create(req.body.user, function (err, patient) {
    console.log(patient);
    try {
      console.log(patient);
      logU = true;
      res.redirect("/home");
    } catch (err) {
      console.log(err);
    }
  });
});


app.get("/:roomId/chat", function (req, res) {
  res.render("chat", { roomId: req.params.roomId });
});

//SOCKET BROADCAST
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId)
    })
  })
})
<<<<<<< HEAD

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.on('joining msg', (username) => {
  	name = username;
  	io.emit('chat message', `---${name} joined the chat---`);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', `---${name} left the chat---`);
    
  });
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
  });
});
=======
>>>>>>> 366336346057881779ac31448851c721308280a9






//^ Doctors Section Below ->
app.get("/docWait",(req,res)=>{
  res.render("docWait")
})
app.get("/doc", (req, res) => {
  res.render("docLogin");
});

app.post("/doc", (req, res) => {
  Doctor.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      try {
        if (user.password == req.body.password) {
          logU = true;
          message = "";
          res.cookie("email", req.body.email);
          res.cookie("password", req.body.password);
          res.cookie("docId", user._id);
          console.log(req.cookies);
          res.redirect("/docWait");
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

app.get("/docsignup", (req, res) => {
  res.render("docSign");
});

app.post("/docsignup", (req, res) => {
  Doctor.create(req.body.doctor, function (err, doctor) {
    console.log(doctor);
    try {
      console.log(doctor);
      logU = true;
      res.redirect("/docWait");
    } catch (err) {
      console.log(err);
    }
  });
});
app.get('/video', (req, res) => {
  res.redirect(`/${req.cookies.docId}/video`)
})
app.get('/:room/video', (req, res) => {
  res.render('room', { roomId: req.params.room })
  res.clearCookie("docId");
})

//^ <------- END ------->

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

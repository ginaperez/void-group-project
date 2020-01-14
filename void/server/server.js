require("dotenv").config();

const gc = require("./controllers/groupCtrl");
const uc = require("./controllers/userCtrl");
const cc = require("./controllers/columnsCtrl");
const tc = require("./controllers/tasksCtrl");
const sbc = require("./controllers/sidebarCtrl");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const express = require("express");

const massive = require("massive");
const session = require("express-session");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.use(express.json());

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./controllers/chatCtrl");

// for static server
// app.use(express.static(__dirname + `../build`));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  })
);

// used below to enter already-created group board
// user1Id = "";

// connects server to postgreSQL
massive(CONNECTION_STRING)
  .then(db => {
    console.log("Database connected!");
    app.set("db", db);
  })
  .catch(err => console.log(err));

// endpoints for login/logout/registering
app.post("/auth/register", uc.register);
app.post("/auth/login", uc.login);
app.get("/auth/session", uc.userSession);
app.delete("/auth/logout", uc.logout);

app.put("/api/update_pic", uc.updatePicture);
app.put("/api/upload_pic", uc.uploadPicture);
app.put("/api/update_username", uc.updateUsername);
app.put("/api/update_email", uc.updateEmail);
app.put("/api/update_password", uc.updatePassword);

app.delete("/api/delete_account", uc.deleteAccount);

// endpoints for groups
app.post("/api/create_group", gc.createGroup);
app.get("/api/group_members/:group_id", gc.groupMembers);
app.get("/api/group_member/:user_id", gc.getGroupMember);
app.post("/api/update_user/:user", gc.updateUser);
app.get("/api/get_groups", gc.getGroups);
app.get("/api/get_group/:group_id", gc.getGroup);
app.get("/api/get_all_users", gc.getAllUsers);
app.put("/api/update_group_name", gc.updateName);
app.delete("/api/delete_group/:group_id", gc.deleteGroup);

// endpoints for sidebar users
app.post("/api/add_user1", sbc.addUser1);
app.post("/api/add_user2", sbc.addUser2);
app.post("/api/add_user3", sbc.addUser3);
app.post("/api/add_user4", sbc.addUser4);
app.post("/api/add_user5", sbc.addUser5);
app.post("/api/add_user6", sbc.addUser6);
app.post("/api/add_user7", sbc.addUser7);
app.post("/api/add_user8", sbc.addUser8);
app.post("/api/add_user9", sbc.addUser9);
app.post("/api/add_user10", sbc.addUser10);

// endpoints for columns
app.get("/api/display_columns/:group_id", cc.displayColumns);
app.post("/api/add_column", cc.addColumn);
app.put("/api/update_column/:column_id", cc.updateColumn);
app.delete("/api/delete_column/:column_id", cc.deleteColumn);

// endpoints for tasks
app.get("/api/display_tasks/:group_id", tc.displayTasks);
app.post("/api/add_task", tc.addTask);
app.put("/api/update_task/:task_id", tc.updateTask);
app.delete("/api/delete_task/:task_id/:group_id", tc.deleteTask);

// endpoints for switching tasks around
app.put("/api/switch_columns/:task_id", tc.switchColumn);

// only allows users with profile to use app
// app.use((req, res, next) => {
//   if (req.session.user) return next();
//   else res.sendStatus(401);
// });

//sockets
io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to ${user.room}'s chatroom.`
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

let port = SERVER_PORT || 4002;
server.listen(port, () => console.log(`Listening on port ${port}.`));

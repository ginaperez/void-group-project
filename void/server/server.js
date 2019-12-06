require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const socket = require("socket.io");

const uc = require("./controllers/userCtrl");
const gc = require("./controllers/groupCtrl");
const cc = require("./controllers/columnsCtrl");
const tc = require("./controllers/tasksCtrl");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

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
user1Id = "";

// connects server to postgreSQL
massive(CONNECTION_STRING).then(db => {
  console.log("database connected");
  app.set("db", db);

  // allows sockets to listen to server, I think...
  const io = socket(
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    })
  );
  // connects front end to sockets/server, I think...
  io.on("connection", client => {
    client.leave(client.id);
    // console.log(client.id);

    // used for chat/messaging
    // client.on("SEND_MESSAGE", function(data) {
    //   console.log("message sent");
    //   io.emit("RECEIVE_MESSAGE", data);
    // });

    // creating group boards
    client.on("createGroupBoard", data => {
      let { groupBoard } = data;
      client.join(groupBoard);
      console.log("created board");
      io.emit("gotGroupBoard", io.sockets.adapter.groupBoards);
    });

    // sends group boards to others
    client.on("sendBoardToOthers", data => {
      let { groupBoard, board1 } = data;
      client.in(groupBoard).emit("boardSentToOthers", board1);
    });

    // joining group boards YOU created
    client.on("joinMyGroupBoard", data => {
      let { groupBoard } = data;
      client.join(groupBoard);
      console.log("joined MY board");
    });

    // joining group boards other user created - may have to add more boards (e.g. board3, board4, etc.) depending on how many user there are? (up to 10?)
    client.on("joinCreatedGroupBoard", data => {
      let { board2, groupBoard } = data;
      io.in(groupBoard).emit("groupBoardJoined", { board2 });
      (user1 = ""), io.emit("gotGroupBoard", io.sockets.adapter.groupBoards);
    });

    // moving cards around into other columns
    client.on("moveCard", payload => {
      client.emit("cardMoved", payload);
    });

    // exiting boards
    client.on("leaveGroupBoard", groupBoard => {
      client.leave(groupBoard);
      console.log("left board");
      io.emit("gotGroupBoard", io.sockets.adapter.groupBoards);
    });
  });
});

// endpoints for login/logout/registering
app.post("/auth/register", uc.register);
app.post("/auth/login", uc.login);
app.get("/auth/userSession", uc.userSession);
app.delete("/auth/logout", uc.logout);

// endpoints for groups
app.post("/api/create_group", gc.createGroup);
// app.post("/api/add_user", gc.addUser);
// app.delete("/api/remove_user/", gc.removeUser);
app.get("/api/display_board", gc.displayBoard);

// endpoints for columns
app.get("/api/display_columns", cc.displayColumns);
app.post("/api/add_column", cc.addColumn);
app.put("/api/update_column/:column_id", cc.updateColumn);
app.delete("/api/delete_column/:column_id/", cc.deleteColumn);

// endpoints for tasks
app.get("/api/display_tasks", tc.displayTasks);
app.post("/api/add_task", tc.addTask);
app.put("/api/update_task/:task_id", tc.updateTask);
app.delete("/api/delete_task/:task_id/", tc.deleteTask);

// only allows users with profile to use app
// app.use((req, res, next) => {
//   if (req.session.user) return next();
//   else res.sendStatus(401);
// });

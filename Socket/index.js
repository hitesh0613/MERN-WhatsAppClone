import { Server } from "socket.io";

const PORT = 9000;

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let user = [];


const addUser = (userId, socketId) => {
  !user.some((users) => users.usersId === userId) &&
    user.push({ userId, socketId });
};

const getUser = (userId) => {
  return user.find((users) => users.usersId === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("addUser", (userId) => {
    // for connection
    addUser(userId, socket.id);
    // console.log(userId);
    // console.log(user);
    io.emit("getUser", user);
    console.log(user);

    // for send

    socket.on('sendmsg', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      console.log(receiverId);
      io.to(user.socketId).emit("getmess", {
        senderId,
        text
      });
    });
  });
});

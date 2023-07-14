import { Server } from "socket.io";
import {
  getRooms,
  getUsers,
  createRoom,
  joinRoom,
  addMessage,
  addFriend,
} from "./service/RoomsService";
import { getUserBySession } from "./service/UsersService";
import { v4 as uuidv4 } from "uuid";

const users = new Map<number, string>(); // user id => socket id
const invations = new Map<Map<number, number>, number>(); // (to user id => from user id) => room id

export const StartSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:8080", "http://192.168.1.14:8080"],
      credentials: true,
    },
    cookie: true,
  });

  io.on("connection", async (socket) => {
    let token: any;
    if (
      socket.handshake.headers.cookie?.indexOf("session=") === undefined ||
      socket.handshake.headers.cookie?.indexOf("session=") === -1
    ) {
      return;
    }
    token = (socket.handshake.headers.cookie as string)
      .split(";")[0]
      .split("=")[1];

    const user = await getUserBySession(token);
    users.set(user.id, socket.id);

    const rooms = await getRooms({ user_id: user.id });

    for (let i = 0; i < rooms.length; i++) {
      socket.join(rooms[i].id.toString());
    }

    for (let entry of invations) {
      const from = entry[0].get(user.id);

      if (from !== undefined) {
        io.to(socket.id).emit(
          "notification",
          `Приглашение в друзья от ${from}`,
          "invitation"
        );
      }
    }

    socket.on("message", async (user, room, message) => {
      const msg = {
        id: uuidv4(),
        user_id: user.id,
        room_id: room.id,
        message: message,
      };
      await addMessage(msg);

      const usersInRoom = await getUsers({ room_id: room.id });

      io.to(room.id.toString()).emit("message", msg);

      for (let i = 0; i < usersInRoom.length; i++) {
        if (usersInRoom[i].id !== user.id) {
          io.to(users.get(usersInRoom[i].id) as string).emit(
            "notification",
            `Сообщение от ${user.username}`,
            "message"
          );
        }
      }
    });

    socket.on("add-friend", async (from, to) => {
      const userId = users.get(to.id);

      const room = await createRoom(from.id, uuidv4());
      if (userId) {
        io.to(userId).emit(
          "notification",
          `Приглашение в друзья от ${from.username}`,
          "invitation",
          to,
          from,
          room
        );
      } else {
        const u = new Map<number, number>();

        u.set(to.id, from.id);
        invations.set(u, room.id);
      }
    });

    socket.on("accept", async (to, from, room) => {
      io.to(users.get(from.id) as string).emit(
        "notification",
        `${to.username} принял ваш запрос дружбы`,
        "message"
      );

      const userId = users.get(to.id);
      await joinRoom(to.id, room.id);
      await addFriend(from.id, to.id);
      io.to(userId as string).emit("room-created", from, room);
    });

    socket.on("refuse", (to, from) => {
      io.to(users.get(from.id) as string).emit(
        "notification",
        `${to.username} отклонил ваш запрос дружбы`,
        "message"
      );
    });

    socket.on("disconnect", () => {
      users.delete(user.id);
    });
  });
};

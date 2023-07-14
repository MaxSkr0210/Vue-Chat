import express from "express";
import { getUserBySession } from "../service/UsersService";
import { getRooms, getRoomsWithName } from "../service/RoomsService";

const router = express.Router();

router.get("/", async (req, res) => {
  const { session } = req.cookies;
  const name = req.query;
  const user = await getUserBySession(session);
  let rooms: any;

  if (Object.keys(name).length > 0) {
    rooms = await getRoomsWithName({ user_id: user.id }, name);
  } else {
    rooms = await getRooms({ user_id: user.id });
  }

  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].messages.trim() === "") {
      rooms[i].messages = [];
    } else {
      rooms[i].messages = JSON.parse(rooms[i].messages);
    }
  }

  res.json(rooms);
});

router.get("/session", async (req, res) => {
  const { session } = req.cookies;
  const user = await getUserBySession(session);
  res.json(user);
});

export default router;

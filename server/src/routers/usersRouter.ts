import express from "express";
import { getUserBySession, getAllUsers } from "../service/UsersService";

const router = express.Router();

router.get("/", async (req, res) => {
  const { session } = req.cookies;
  const user = await getUserBySession(session);
  const users = await getAllUsers({ id: user.id });
  res.json(users);
});

router.get("/session", async (req, res) => {
  const { session } = req.cookies;

  const user = await getUserBySession(session);

  res.json(user);
});

export default router;

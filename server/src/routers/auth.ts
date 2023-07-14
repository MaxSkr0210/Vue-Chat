import express from "express";
import { UserType } from "../types/UserType";
import { createUser, loginUser, logoutUser } from "../service/UsersService";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const newUser: UserType = req.body;

  const token = await createUser(newUser);
  if (token === "user already exists") {
    res
      .status(400)
      .json({ error: "Пользователь с такой почтой уже существет" });
    return;
  }

  res.cookie("session", token.token).setHeader("Auth", "true").json(token.user);
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  if (token) {
    res
      .cookie("session", token.token)
      .setHeader("Auth", "true")
      .json(token.user);
  } else {
    res.status(400).json({ error: "Неверные почта и/или пароль" });
  }
});

router.delete("/signout", auth(), async (req, res) => {
  const { session } = req.cookies;

  await logoutUser(session);
  res.clearCookie("session").removeHeader("Auth");
});

export default router;

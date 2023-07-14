import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import { appConfig, corsConfig } from "./config";
import usersRouter from "./routers/usersRouter";
import roomsRouter from "./routers/roomsRouter";
import auth from "./routers/auth";
import { StartSocket } from "./socket";

const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Переход от исходного * к источнику текущего запроса
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,token"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", "true"); // Разрешить отправку файлов cookie
  next();
});

app.use(express.json());
app.use(cookieParser("SecretKey"));
app.use(cors(corsConfig));
app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);
app.use("/", auth);

const server = http.createServer(app);
StartSocket(server);

server.listen(appConfig.PORT, () => {
  console.log(`Server running on port ${appConfig.PORT}`);
});

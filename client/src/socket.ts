import { reactive } from "vue";
import { io } from "socket.io-client";
import { UserType } from "./types/UserType";

export const state = reactive({});

const URL = "http://localhost:3001/";

export const socket = io(URL, {
  withCredentials: true,
});

socket.on("connect", (...args) => {});

socket.on("room-created", (...args) => {
  const from: UserType = args[0];
  const room = args[1];
});

socket.on("disconnect", () => {});

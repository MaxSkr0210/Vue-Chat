import { MessageType } from "./MessageType";

export type RoomType = {
  id?: number;
  name?: string;
  messages?: MessageType[];
};

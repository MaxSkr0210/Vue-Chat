import knex from "../db/knex";

export const getUsers = async (filter) => {
  const users = await knex("relation").where(filter).select();

  const usersId = [] as any[];

  for (const user of users) {
    usersId.push(user.user_id);
  }

  return await knex("users").whereIn("id", usersId);
};

export let getRooms = async (filter: { user_id: number }) => {
  const rooms = await knex("relation").where(filter).select();

  const roomsId = [] as any[];

  for (const room of rooms) {
    roomsId.push(room.room_id);
  }

  return await knex("rooms").whereIn("id", roomsId);
};

export let getRoomsWithName = async (filter1: { user_id: number }, filter2) => {
  const rooms = await knex("relation").where(filter1).select();

  const roomsId = [] as any[];

  for (const room of rooms) {
    roomsId.push(room.room_id);
  }

  return await knex("rooms")
    .whereIn("id", roomsId)
    .andWhereLike("name", `%${filter2.name}%`);
};

export const createRoom = async (userId: number, name: string) => {
  await knex("rooms").insert({
    name,
  });

  const room = (await knex("rooms").where({ name }).select())[0];

  await knex("relation").insert({
    user_id: userId,
    room_id: room.id,
  });
  return room;
};

export const joinRoom = async (userId: number, roomId: number) => {
  await knex("relation").insert({
    user_id: userId,
    room_id: roomId,
  });
};

export const addMessage = async (message) => {
  const room = await knex("rooms").where({ id: message.room_id }).select();
  let msgs: any[] = [];

  if (room[0].messages.trim() === "") {
    msgs = [];
  } else {
    msgs = JSON.parse(room[0].messages);
  }

  msgs.push(message);

  return await knex("rooms")
    .update({ messages: JSON.stringify(msgs) })
    .where({ id: message.room_id });
};

export const getFriends = async (userId: number) => {
  const friends = await knex("friends")
    .where({ user_id: userId })
    .orWhere({ friend_id: userId })
    .select();

  const friendsId = [] as any[];

  for (const friend of friends) {
    if (friend.user_id === userId) {
      friendsId.push(friend.user_id);
    } else if (friend.friend_id === userId) {
      friendsId.push(friend.friend_id);
    }
  }

  return await knex("users").whereIn("id", friendsId);
};

export const addFriend = async (userId: number, friendId: number) => {
  await knex("friends").insert({
    user_id: userId,
    friend_id: friendId,
  });
};

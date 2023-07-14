import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import knex from "../db/knex";
import { UserType } from "../types/UserType";

const createToken = (user: UserType) => {
  return jwt.sign({ id: user.id, email: user.email }, "shhhhh");
};

const createSession = async (userId: number, token: string) => {
  await knex("cookies").insert({
    user_id: userId,
    cookie: token,
  });
};

const getSession = async (userId: number) => {
  const session = await knex("cookies").where({ user_id: userId }).select();
  return session[0];
};

export const getUserBySession = async (cookie: string) => {
  try {
    const user = await knex("cookies").where({ cookie }).select();
    return (await knex("users").where({ id: user[0].user_id }).select())[0];
  } catch (error) {
    return "User in not auth";
  }
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getAllUsers = async (filter?) => {
  let users;
  if (filter) {
    users = await knex("users").whereNot(filter).select();
  } else {
    users = await knex("users").select();
  }
  return users;
};

export const findUser = async (filter: UserType) => {
  const user = await knex("users").where(filter).select();
  return user[0];
};

export const createUser = async (user: UserType) => {
  const u = await findUser({ email: user.email });

  if (u) return "user already exists";
  else {
    const hashedPassword = await hashPassword(user.password as string);
    await knex("users").insert({
      ...user,
      email: user.email,
      password: hashedPassword,
    });

    const createdUser = await findUser({ email: user.email });
    const token = createToken(createdUser);

    await createSession(createdUser.id, token);
    return { user: createdUser, token };
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUser({ email });

  if (user && (await comparePassword(password, user.password))) {
    const token = createToken(user);
    const session = await getSession(user.id);

    if (session && token === session.cookie) return { user, token };
    else {
      await createSession(user.id, token);
      return { user, token };
    }
  }

  return null;
};

export const logoutUser = async (token: string) => {
  return await knex("cookies").where({ cookie: token }).delete();
};

import { getUserBySession } from "../service/UsersService";

export const auth = () => async (req, res, next) => {
  const cookie = req.cookies.session;
  if (!cookie) {
    return next();
  }
  try {
    const user = await getUserBySession(cookie);
    if (!user) {
      return next();
    }
    req.user = user;
    req.session = cookie;
    next();
  } catch (err) {
    console.log(err);
  }
};

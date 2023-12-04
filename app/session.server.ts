import { createSessionStorage } from "@remix-run/node";
import bcrypt from "bcrypt";
import { db } from "./db.server";

export async function login({ username, password }) {
  const user = await db.user.findUnique({
    where: { username: username },
  });

  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) return null;

  return user;
}

const sessionSecrateKey = process.env.SESSION_SECRATE;
if (!sessionSecrateKey) {
  throw new Error("no section error");
}
//sesstion store
const storage = createSessionStorage({
  cookie: {
    name: "remix_blog",
  },
});

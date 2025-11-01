import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET_KEY } = process.env;
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};

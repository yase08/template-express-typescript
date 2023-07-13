import jwt from "jsonwebtoken";
import { ExpressError } from "../helpers/error.helper";

const secretKey: string = process.env.SECRET_KEY || "";

export const verifyToken = async (
  accessToken: string
): Promise<jwt.JwtPayload | string> => {
  try {
    const decodedToken: string | jwt.JwtPayload = jwt.verify(
      accessToken,
      secretKey
    );
    return decodedToken
  } catch (error) {
    return Promise.reject(new ExpressError("Verified token expired or invalid"))
  }
};
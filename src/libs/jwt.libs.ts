import jwt from "jsonwebtoken";

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
    return Promise.reject(new Error("Verified accesstoken expired or invalid"))
  }
};

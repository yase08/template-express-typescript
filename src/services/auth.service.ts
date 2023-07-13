import {
  StatusCodes as status,
} from "http-status-codes";
import { apiResponse } from "@helpers/apiResponse.helper";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "@libs/bcrypt.lib";
import jwt from "jsonwebtoken";

// Berfungsi untuk menghandle logic dari controler

const jwtSecret = process.env.JWT_SECRET as string;
const db = require("@db/models");

export class AuthService {
  async registerService(req: Request): Promise<any> {
    try {
      const existUser = await db.user.findOne({
        where: { email: req.body.email },
      });
      if (existUser) {
        throw apiResponse(status.BAD_REQUEST, "Email already taken");
      }

      const hashedPassword = await hashPassword(req.body.password);

      const createUser = await db.user.create({
        email: req.body.email,
        password: hashedPassword,
      });

      if (!createUser)
        throw apiResponse(status.FORBIDDEN, "Create new account failed");

      return Promise.resolve(
        apiResponse(status.OK, "Create new account success")
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async loginService(req: Request, res: Response): Promise<any> {
    try {
      const user = await db.user.findOne({ where: { email: req.body.email } });

      if (!user)
        throw apiResponse(status.BAD_REQUEST, "Email is not registered");

      const hashedPassword = await comparePassword(
        user.password,
        req.body.password
      );

      if (!hashedPassword)
        throw apiResponse(status.BAD_REQUEST, "Incorect email or password");

      const token = jwt.sign(
        { id: user.id, email: req.body.email, username: user.username },
        jwtSecret,
        { expiresIn: "1d" }
      );

      return Promise.resolve(
        apiResponse(status.OK, "Login success", token, undefined)
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }
}

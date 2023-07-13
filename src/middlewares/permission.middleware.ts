import { NextFunction, Response } from "express";
import { apiResponse } from "@helpers/apiResponse.helper";
import { StatusCodes as status } from "http-status-codes";
import { Session } from "express-session";

interface ISession extends Session {
  session: {
    user: any;
  };
}

export const permission = (...roles: any) => {
  return async function (req: ISession, res: Response, next: NextFunction) {
    try {
      if (!roles.includes(req.session.user)) {
        throw apiResponse(status.UNAUTHORIZED, "Your role is not allowed");
      } else {
        next();
      }
    } catch (error: any) {
      return res.status(error.statusCode | status.UNAUTHORIZED).json(error);
    }
  };
};

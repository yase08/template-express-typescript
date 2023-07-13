import { NextFunction, Response } from "express";
import { apiResponse } from "@helpers/apiResponse.helper";
import { StatusCodes as status } from "http-status-codes";
interface IRequest extends Request {
  session: {
    user: any;
  };
}

// Middleware yang berfungsi untuk handle permission role
export const permission = (...roles: any) => {
  return async function (req: IRequest, res: Response, next: NextFunction) {
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

import { validate, ValidationError } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";
import { StatusCodes as status } from "http-status-codes";
import { Request, Response, NextFunction, Handler } from "express";
import { OutgoingMessage } from "http";
import { apiResponse } from "@helpers/apiResponse.helper";

// middleware yang berfungsi untuk validasi req.body, req.params, dan req.query
export function validator(MetaType: ClassConstructor<any>): Handler {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<OutgoingMessage> {
    let property: Record<string, any> = {};

    Object.assign(property, req.body, req.params, req.query);

    const object: Record<string, any> = plainToClass(MetaType, property);
    console.log(object);
    const errorsResponse: ValidationError[] = await validate(object);
    console.log(errorsResponse);

    const errorMessage = errorsResponse.map((val: ValidationError) =>
      apiResponse(400, Object.values(val.constraints!)[0])
    );

    if (errorMessage.length) {
      return res.status(status.BAD_REQUEST).json({ errors: errorMessage });
    }
    next();
  };
}

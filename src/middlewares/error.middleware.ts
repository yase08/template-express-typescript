import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Route Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const handleError = (error: Error, res: Response): void => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  console.log(error.stack);
  res.json({
    status: false,
    message: error.message,
    stack: error.stack,
  });
};

export { notFound, handleError };

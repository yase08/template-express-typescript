import { RequestHandler } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import { ExpressError } from "../helpers/error.helper";

export const swaggerServe: RequestHandler[] = swaggerUi.serve;
export const swaggerClient = (): RequestHandler => {
  let fsResponse: string = '';
  let swaggerConfig: swaggerUi.JsonObject = {};
  let env: string = process.env.NODE_ENV!;

  const stagingPath: string = path.resolve(process.cwd(), "dist/openapi.json");
  const developmentPath: string = path.resolve(process.cwd(), "openapi.json");

  if (env === "development" || env === "staging") {
    if (env == "development" && fs.existsSync(developmentPath))
      fsResponse = fs.readFileSync(developmentPath, { encoding: "utf8" });
    if (env == "staging" && fs.existsSync(stagingPath))
      fsResponse = fs.readFileSync(stagingPath, { encoding: "utf8" });
    swaggerConfig = JSON.parse(fsResponse);

    return swaggerUi.setup(swaggerConfig);
  }

  if (env === "production") {
    throw new ExpressError("Cannot load swagger file documentation in production");
  }

  throw new ExpressError("Invalid environment specified");
};

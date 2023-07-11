import express, { Express, Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import http, { Server } from "http";
import consola from "consola";
import nocache from "nocache";
import SlowDown from "express-slow-down";
import hpp from "hpp";
import { swaggerClient, swaggerServe } from "./libs/swagger.libs";
import AuthRoutes from "./routes/auth.route";

export class App {
  public app: Express;
  protected version: string;
  protected env: string;
  protected port: number;
  protected server: Server;

  constructor() {
    this.app = express();
    this.version = "/api/v1";
    this.env = process.env.NODE_ENV!;
    this.server = http.createServer(this.app);
    this.port = +process.env.PORT!;
    this.plugins()
    this.route()
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(morgan("dev"));
    this.app.use(nocache());
    this.app.use(hpp({ checkBody: true, checkQuery: true }));
    this.app.use(helmet({ contentSecurityPolicy: false }));
    if (!["production", "test"].includes(this.env)) {
      this.app.use(`${this.version}/docs`, swaggerServe, swaggerClient());
    }
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
      })
    );
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3,
        max: 1000,
        message: "Too many request, send back request after 3 minute",
      })
    );
    this.app.use(
      SlowDown({
        windowMs: 24 * 60 * 1,
        delayMs: 24 * 60 * 2000,
        delayAfter: 1000,
      })
    );
  }
  protected route(): void {
    this.app.use(`${this.version}/auth`, AuthRoutes);
  }

  protected async run(): Promise<void> {
    if (this.env != "production") {
      this.server.listen(this.port, () =>
        consola.success(
          `[server]: Server is running at http://localhost:${this.port}`
        )
      );
    }
  }

  public async main(): Promise<void> {
    await this.run();
  }
}

(async function () {
  if (process.env.NODE_ENV != "test") await new App().main();
})();

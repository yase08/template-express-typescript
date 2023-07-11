import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";
import AuthRoutes from "./routes/auth.route";
import swaggerDocs from "./libs/swagger.libs";

const port = parseInt(process.env.PORT || "3000");

class App {
  public app: Express;
  protected version: string;

  constructor() {
    this.app = express();
    this.version = "/api/v1";
    this.plugins();
    this.route();
  }

  protected plugins(): void {
    swaggerDocs(this.app, port);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
      })
    );
    this.app.use(compression());
    this.app.use(morgan("dev"));
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3,
        max: 1000,
        message: "Too many request, send back request after 3 minute",
      })
    );
  }

  protected route(): void {
    this.app.use(`${this.version}/auth`, AuthRoutes);
  }
}

const app = new App().app;
app.listen(port, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
);

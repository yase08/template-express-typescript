"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
require("dotenv/config");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const swagger_libs_1 = __importDefault(require("./libs/swagger.libs"));
const port = parseInt(process.env.PORT || "3000");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.version = "/api/v1";
        this.plugins();
        this.route();
    }
    plugins() {
        (0, swagger_libs_1.default)(this.app, port);
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "Accept"],
            credentials: true,
        }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
        this.app.use((0, express_rate_limit_1.rateLimit)({
            windowMs: 24 * 60 * 3,
            max: 1000,
            message: "Too many request, send back request after 3 minute",
        }));
    }
    route() {
        this.app.use(`${this.version}/auth`, auth_route_1.default);
    }
}
const app = new App().app;
app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));

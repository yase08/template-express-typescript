"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
class RouteUsers extends auth_controller_1.AuthController {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        return this.router;
    }
}
exports.default = new RouteUsers().routes();

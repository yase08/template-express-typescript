import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

class RouteUsers extends AuthController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);

    return this.router;
  }
}

export default new RouteUsers().routes();

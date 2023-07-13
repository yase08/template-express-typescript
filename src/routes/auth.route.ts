import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { DTOLogin, DTORegister } from "@/dto/auth.dto";
import { validator } from "@middlewares/validator.middleware";

// class RouteUsers mengextends dari AuthController agar bisa memakai semua property dan method dari auth controller
class RouteUsers extends AuthController {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  routes(): Router {
    this.router.post("/register", [validator(DTORegister)], this.register);
    this.router.post("/login", [validator(DTOLogin)], this.login);

    return this.router;
  }
}

export default new RouteUsers().routes();

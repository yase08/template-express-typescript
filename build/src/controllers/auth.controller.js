"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController extends auth_service_1.AuthService {
    constructor() {
        super(...arguments);
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceResponse = yield this.registerService(req);
                return res.status(serviceResponse.statusCode).json(serviceResponse);
            }
            catch (error) {
                return res.status(error.statusCode).json(error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceResponse = yield this.loginService(req, res);
                return res.status(serviceResponse.statusCode).json(serviceResponse);
            }
            catch (error) {
                return res.status(error.statusCode).json(error);
            }
        });
    }
}
exports.AuthController = AuthController;

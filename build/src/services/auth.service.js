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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const apiResponse_helper_1 = require("../helpers/apiResponse.helper");
const bcrypt_libs_1 = require("../libs/bcrypt.libs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const db = require("../db/models");
class AuthService {
    registerService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existUser = yield db.user.findOne({
                    where: { email: req.body.email },
                });
                if (existUser) {
                    throw (0, apiResponse_helper_1.apiResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email already taken");
                }
                const hashedPassword = yield (0, bcrypt_libs_1.hashPassword)(req.body.password);
                const createUser = yield db.user.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                });
                if (!createUser)
                    throw (0, apiResponse_helper_1.apiResponse)(http_status_codes_1.StatusCodes.FORBIDDEN, "Create new account failed");
                return Promise.resolve((0, apiResponse_helper_1.apiResponse)(http_status_codes_1.StatusCodes.OK, "Create new account success"));
            }
            catch (error) {
                return Promise.reject((0, apiResponse_helper_1.apiResponse)(error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.statusMessage, error.message));
            }
        });
    }
    loginService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db.user.findOne({ where: { email: req.body.email } });
                if (!user)
                    throw (0, apiResponse_helper_1.apiResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Email is not registered");
                const hashedPassword = yield (0, bcrypt_libs_1.comparePassword)(user.password, req.body.password);
                if (!hashedPassword)
                    throw (0, apiResponse_helper_1.apiResponse)(http_status_codes_1.StatusCodes.BAD_REQUEST, "Incorect email or password");
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: req.body.email, username: user.username }, jwtSecret, { expiresIn: "1d" });
                return Promise.resolve((0, apiResponse_helper_1.apiResponse)(http_status_codes_1.StatusCodes.OK, "Login Success", token, undefined));
            }
            catch (error) {
                return Promise.reject((0, apiResponse_helper_1.apiResponse)(error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.statusMessage, error.message));
            }
        });
    }
}
exports.AuthService = AuthService;

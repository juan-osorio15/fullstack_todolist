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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authModels_1 = require("../models/authModels");
const dbUtils_1 = require("../utils/dbUtils");
const AppError_1 = __importDefault(require("../utils/AppError"));
dotenv_1.default.config();
function registerUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const isUser = yield (0, dbUtils_1.userExists)(email);
            const isUsernameTaken = yield (0, dbUtils_1.usernameExists)(username);
            if (isUser) {
                return next(new AppError_1.default("user already exists with this email", 400));
            }
            if (isUsernameTaken) {
                return next(new AppError_1.default("username is already taken", 400));
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPwd = yield bcryptjs_1.default.hash(password, salt);
            const newUserRows = yield (0, authModels_1.insertUserToDb)(username, email, hashedPwd);
            res.status(201).json({ message: "user registered", user: newUserRows[0] });
        }
        catch (error) {
            next(error);
        }
    });
}
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userResultRows = yield (0, authModels_1.fetchUserByEmail)(email);
            if (userResultRows.length === 0) {
                return next(new AppError_1.default("no user found with this email", 404));
            }
            const user = userResultRows[0];
            const isPwdValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPwdValid) {
                return next(new AppError_1.default("invalid credentials", 401));
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "6h",
            });
            res.json({
                token,
                user: { id: user.id, username: user.username, email: user.email },
            });
        }
        catch (error) {
            next(error);
        }
    });
}

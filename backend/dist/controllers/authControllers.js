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
const database_1 = __importDefault(require("../config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbUtils_1 = require("../utils/dbUtils");
dotenv_1.default.config();
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const isUser = yield (0, dbUtils_1.userExists)(email);
            const isUsernameUnique = yield (0, dbUtils_1.usernameExists)(username);
            if (isUser) {
                res.status(400).json({ message: "user already exists with this email" });
                return;
            }
            if (isUsernameUnique) {
                res.status(400).json({ message: "username is already taken" });
                return;
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPwd = yield bcryptjs_1.default.hash(password, salt);
            const newUser = yield database_1.default.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email", [username, email, hashedPwd]);
            res.status(201).json({ message: "user registered", user: newUser.rows[0] });
        }
        catch (error) {
            res.status(500).json({ message: "server error", error });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userResult = yield database_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
            if (userResult.rows.length === 0) {
                res.status(400).json({ message: "no user found with this email" });
                return;
            }
            const user = userResult.rows[0];
            const isPwdValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPwdValid) {
                res.status(400).json({ message: "invalid credentials" });
                return;
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
            res.status(500).json({ message: "server error", error });
        }
    });
}

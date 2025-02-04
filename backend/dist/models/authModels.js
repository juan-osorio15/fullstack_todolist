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
exports.insertUserToDb = insertUserToDb;
exports.fetchUserByEmail = fetchUserByEmail;
const database_1 = __importDefault(require("../config/database"));
function insertUserToDb(username, email, hashedPwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email", [username, email, hashedPwd]);
        return response.rows;
    });
}
function fetchUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        return response.rows;
    });
}

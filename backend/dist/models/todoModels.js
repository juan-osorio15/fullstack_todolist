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
exports.getTodosByUserId = getTodosByUserId;
exports.insertTodoByUserId = insertTodoByUserId;
exports.updateTodoById = updateTodoById;
exports.deleteTodoById = deleteTodoById;
const database_1 = __importDefault(require("../config/database"));
function getTodosByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.query("SELECT * FROM todos WHERE user_id = $1", [
            userId,
        ]);
        return response.rows;
    });
}
function insertTodoByUserId(todoBody, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.query("INSERT INTO todos (todo, user_id) VALUES ($1, $2) RETURNING *", [todoBody, userId]);
        return response.rows;
    });
}
function updateTodoById(todo, todoId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.query("UPDATE todos SET todo = $1 WHERE id = $2 and user_id = $3 RETURNING *", [todo, todoId, userId]);
        return response.rows;
    });
}
function deleteTodoById(todoId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.query("DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *", [todoId, userId]);
        return response.rows;
    });
}

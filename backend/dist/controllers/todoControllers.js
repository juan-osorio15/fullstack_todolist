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
exports.getUserTodos = getUserTodos;
exports.postUserTodo = postUserTodo;
exports.updateUserTodo = updateUserTodo;
exports.deleteUserTodo = deleteUserTodo;
const database_1 = __importDefault(require("../config/database"));
function getUserTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const todos = yield database_1.default.query("SELECT * FROM todos WHERE user_id = $1", [
                userId,
            ]);
            res.json(todos.rows);
        }
        catch (error) {
            res.status(500).json({ message: "server error", error });
        }
    });
}
function postUserTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const { todo } = req.body;
            const result = yield database_1.default.query("INSERT INTO todos (todo, user_id) VALUES ($1, $2) RETURNING *", [todo, userId]);
            res
                .status(201)
                .json({ message: "todo created successfully!", todo: result.rows[0] });
        }
        catch (error) {
            res.status(500).json({ message: "server error", error });
        }
    });
}
function updateUserTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { todoId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { updatedTodo } = req.body;
            const result = yield database_1.default.query("UPDATE todos SET todo = $1 WHERE id = $2 RETURNING *", [updatedTodo, todoId]);
            if (result.rows.length === 0) {
                res.status(404).json({ message: "todo not found" });
                return;
            }
            if (userId !== result.rows[0].id) {
                res
                    .status(401)
                    .json({ message: "you are not allowed to edit this todo" });
                return;
            }
            res.status(201).json({ message: "todo updated", todo: result.rows[0] });
        }
        catch (error) {
            res.status(500).json({ message: "server error", error });
        }
    });
}
function deleteUserTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { todoId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield database_1.default.query("DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *", [todoId, userId]);
            if (result.rows.length === 0) {
                res.status(404).json({ message: "todo not found for this user" });
                return;
            }
            // if (userId !== result.rows[0].id) {
            //   res
            //     .status(401)
            //     .json({ message: "you are not allowed to delte this todo" });
            //   return;
            // }
            res.status(201).json({ message: "todo deleted", todo: result.rows[0] });
        }
        catch (error) {
            res.status(500).json({ message: "server error", error });
        }
    });
}

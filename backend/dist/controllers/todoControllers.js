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
exports.getUserTodos = getUserTodos;
exports.postUserTodo = postUserTodo;
exports.updateUserTodo = updateUserTodo;
exports.deleteUserTodo = deleteUserTodo;
const todoModels_1 = require("../models/todoModels");
function getUserTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const userTodoRows = yield (0, todoModels_1.getTodosByUserId)(userId);
            res.json(userTodoRows);
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
            const insertResponseRows = yield (0, todoModels_1.insertTodoByUserId)(todo, userId);
            res.status(201).json({
                message: "todo created successfully!",
                todo: insertResponseRows[0],
            });
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
            const { todo } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            const updateResponseRows = yield (0, todoModels_1.updateTodoById)(todo, todoId, userId);
            if (updateResponseRows.length === 0) {
                res.status(404).json({ message: "todo not found for this user" });
                return;
            }
            res
                .status(201)
                .json({ message: "todo updated", todo: updateResponseRows[0] });
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
            if (!userId) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            const deleteResponseRows = yield (0, todoModels_1.deleteTodoById)(todoId, userId);
            if (deleteResponseRows.length === 0) {
                res.status(404).json({ message: "todo not found for this user" });
                return;
            }
            res
                .status(201)
                .json({ message: "todo deleted", todo: deleteResponseRows[0] });
        }
        catch (error) {
            res.status(500).json({ message: "server error", error });
        }
    });
}

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
const todoModels_1 = require("../models/todoModels");
const AppError_1 = __importDefault(require("../utils/AppError"));
function getUserTodos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const userTodoRows = yield (0, todoModels_1.getTodosByUserId)(userId);
            res.json(userTodoRows);
        }
        catch (error) {
            next(error);
        }
    });
}
function postUserTodo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { userId } = req.params;
            const { todo } = req.body;
            const tokenUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (Number(tokenUserId) !== Number(userId)) {
                return next(new AppError_1.default("unauthorized to post on behalf of this user", 401));
            }
            const insertResponseRows = yield (0, todoModels_1.insertTodoByUserId)(todo, userId);
            res.status(201).json({
                message: "todo created successfully!",
                todo: insertResponseRows[0],
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateUserTodo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { todoId } = req.params;
            const { todo } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return next(new AppError_1.default("user not found", 404));
            }
            const updateResponseRows = yield (0, todoModels_1.updateTodoById)(todo, todoId, userId);
            if (updateResponseRows.length === 0) {
                return next(new AppError_1.default("todo not found for this user", 401));
            }
            res
                .status(201)
                .json({ message: "todo updated", todo: updateResponseRows[0] });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteUserTodo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { todoId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return next(new AppError_1.default("user not found", 404));
            }
            const deleteResponseRows = yield (0, todoModels_1.deleteTodoById)(todoId, userId);
            if (deleteResponseRows.length === 0) {
                return next(new AppError_1.default("todo not found for this user", 401));
            }
            res
                .status(201)
                .json({ message: "todo deleted", todo: deleteResponseRows[0] });
        }
        catch (error) {
            next(error);
        }
    });
}

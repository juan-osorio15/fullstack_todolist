"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoControllers_1 = require("../controllers/todoControllers");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.get("/:userId", authMiddleware_1.default, todoControllers_1.getUserTodos);
router.post("/:userId", authMiddleware_1.default, todoControllers_1.postUserTodo);
router.put("/edit/:todoId", authMiddleware_1.default, todoControllers_1.updateUserTodo);
// router.delete("/delete/:todoId", authMiddleware, deleteUserTodo);
exports.default = router;

import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task.controllers.js";
import { createdTaskSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validator.middlewere.js";
const router = Router();

router.get("/tasks",authRequired,getTasks);// el authRequired es si esta autenticado
router.get("/tasks/:id",authRequired, getTask);
router.post("/tasks",authRequired,validateSchema(createdTaskSchema), createTask);
router.delete("/tasks/:id",authRequired, deleteTask);
router.put("/tasks/:id",authRequired,  updateTask);

export default router;

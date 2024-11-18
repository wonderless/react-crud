import express from 'express';
import { getTareas, addTarea ,deleteTarea,updateTarea} from '../controllers/taskController.js';


const router = express.Router();
router.get('/tareas', getTareas);
router.post('/tareas', addTarea);
router.put("/tareas/:id", updateTarea);
router.delete("/tareas/:id", deleteTarea);

export default router;

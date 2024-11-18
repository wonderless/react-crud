import { pool } from '../models/db.js';

export const getTareas = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tareas');
  res.json(rows);
};  
export const addTarea = async (req, res) => {
  const { nombre, descripcion } = req.body;
  await pool.query('INSERT INTO tareas (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
  res.sendStatus(201);
};
export const deleteTarea = async (req, res) => {
    let id  = parseInt(req.params.id);
    await pool.query("DELETE FROM tareas WHERE id = ?", [id]);
    res.sendStatus(204);
  };
  export const updateTarea = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const id = parseInt(req.params.id);

    try {
        await pool.query("UPDATE tareas SET nombre = ?, descripcion = ? WHERE id = ?", [nombre, descripcion, id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        res.status(500).send("Error en el servidor");
    }
};

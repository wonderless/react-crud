
import axios from 'axios';

const API_URL = '/api/tareas';

export const getTareas = async () => axios.get(API_URL);
export const addTarea = async (tarea) => axios.post(API_URL, tarea);
export const deleteTarea = async (id) => axios.delete(`${API_URL}/${id}`);
export const updateTarea = async (id, tarea) => axios.put(`${API_URL}/${id}`, tarea);


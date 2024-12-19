import React, { useState, useEffect } from 'react';
import { getTareas, addTarea, deleteTarea, updateTarea } from './api';
import './App.css'
function App() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editId, setEditId] = useState(null);

  // Función para obtener las tareas desde el backend

  const fetchTareas = async () => {
    const response = await fetch("/api/tareas"); 
    const data = await response.json();
    setTareas(data); // Actualiza el estado con las tareas más recientes
  };

  // Llamada inicial para obtener las tareas
  useEffect(() => {
    fetchTareas();
  }, []);

  // Manejar la creación y actualización de tareas
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTarea(editId, { nombre, descripcion });
      } else {
        await addTarea({ nombre, descripcion });
      }
      setNombre('');
      setDescripcion('');
      setEditId(null);
      fetchTareas(); // Actualizar la lista de tareas
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  // Manejar la eliminación de una tarea
  const handleDelete = async (id) => {
    try {
      await deleteTarea(id); // Elimina la tarea
      fetchTareas(); // Refresca la lista de tareas
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };
  


  // Manejar la edición de una tarea
  const handleEdit = (tarea) => {
    setEditId(tarea.id);
    setNombre(tarea.nombre);
    setDescripcion(tarea.descripcion);
  };

  return (
    <div className='divi'>
      <h1>CRUD de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
        />
        <button className='buttonAdd' type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span>{tarea.nombre} - {tarea.descripcion}</span>
            <button className='buttonEdit' onClick={() => handleEdit(tarea)}>Editar</button>
            <button className='buttonDelete' onClick={() => handleDelete(tarea.id)}>Eliminar</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
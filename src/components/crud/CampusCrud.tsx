import React from 'react';
import { useEffect, useState } from 'react';
import API from '../../api';

interface Campus {
  id?: number;
  nombre: string;
  estado: string;
}

export function CampusCrud() {
  const [data, setData] = useState<Campus[]>([]);
  const [formData, setFormData] = useState<Campus>({ nombre: '', estado: 'activo' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    API.get('/campus').then(res => setData(res.data));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Actualizar campus
      await API.put(`/campus/${editingId}`, formData);
    } else {
      // Crear nuevo campus
      await API.post('/campus', formData);
    }
    setFormData({ nombre: '', estado: 'activo' });
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (campus: Campus) => {
    setFormData({ nombre: campus.nombre, estado: campus.estado });
    setEditingId(campus.id || null);
  };

  const handleDelete = async (id?: number) => {
    if (id && confirm('¿Estás seguro de eliminar este campus?')) {
      await API.delete(`/campus/${id}`);
      fetchData();
    }
  };

  return (
    <div className="mb-8 p-6 border rounded shadow bg-white max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Campus</h2>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-1">
            Nombre del campus
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Nombre del campus"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="estado" className="block text-gray-700 font-semibold mb-1">
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            {editingId ? 'Actualizar' : 'Crear'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ nombre: '', estado: 'activo' });
              }}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        {data.length === 0 ? (
          <p className="text-gray-500">No hay campus registrados.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Nombre</th>
                <th className="border px-4 py-2 text-left">Estado</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((campus) => (
                <tr key={campus.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{campus.nombre}</td>
                  <td className="border px-4 py-2 capitalize">{campus.estado}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(campus)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(campus.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

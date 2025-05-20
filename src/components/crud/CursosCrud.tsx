import React from 'react';
import { useEffect, useState } from 'react';
import API from '../../api';

export function CursosCrud() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    API.get('/cursos').then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Cursos</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

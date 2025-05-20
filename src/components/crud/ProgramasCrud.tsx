import React from 'react';
import { useEffect, useState } from 'react';
import API from '../../api';

export function ProgramasCrud() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    API.get('/programaestudios').then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Programas</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

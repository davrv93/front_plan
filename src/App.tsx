import React from 'react';
import { CampusCrud } from './components/crud/CampusCrud';
import { CompetenciasCrud } from './components/crud/CompetenciasCrud';
import { CursosCrud } from './components/crud/CursosCrud';
import { ModulosCrud } from './components/crud/ModulosCrud';
import { PlanesCrud } from './components/crud/PlanesCrud';
import { MicrocredencialesCrud } from './components/crud/MicrocredencialesCrud';
import { ProgramasCrud } from './components/crud/ProgramasCrud';

function App() {
  return (
    <div className="p-6 font-sans space-y-12">
      <h1 className="text-2xl font-semibold mb-6">Gestión Académica</h1>
      <CampusCrud />
      <CompetenciasCrud />
      <CursosCrud />
      <ModulosCrud />
      <PlanesCrud />
      <MicrocredencialesCrud />
      <ProgramasCrud />
    </div>
  );
}

export default App;

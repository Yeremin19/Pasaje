import React, { useState } from 'react';

const Sidebar = () => {
  // Estado para manejar la visibilidad del submenú de configuración
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    //<div className="flex flex-col bg-gradient-to-b from-red-700 to-black w-72 p-4 shadow-lg text-white">
    <aside className="flex flex-col bg-gradient-to-b from-red-500 to-black w-52 p-4 shadow-lg text-white">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 overflow-hidden">
          <img
            src="loguito.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold">EL RÁPIDO</h2>
      </div>
      <nav className="space-y-4">
        <a href="/" className="flex items-center space-x-2  hover:bg-red-900 p-2 border-2 rounded">
          <span>🏠</span>
          <span>Dashboard</span>
        </a>
        <a href="/auth/admin/bus" className="flex items-center space-x-2 hover:bg-red-800 p-2 border-2  rounded">
          <span>🚌</span>
          <span>Buses</span>
        </a>
        <a href="/auth/admin/usuario" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>🎫</span>
          <span>Pasajes</span>
        </a>
        <a href="/auth/admin/ventas" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>💼</span>
          <span>Ventas</span>
        </a>
        <a href="/auth/admin/reporte" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>📝</span>
          <span>Reportes</span>
        </a>

        {/* Menú de Configuración */}
        <div>
          <div 
            className="flex items-center space-x-2  hover:bg-red-800 p-2  border-2 rounded cursor-pointer"
            onClick={() => setIsConfigOpen(!isConfigOpen)}  // Cambia el estado para abrir/cerrar el submenú
          >
            <span>⚙️</span>
            <span>Configuración ✛</span>
          </div>
          {isConfigOpen && (  // Si el submenú está abierto, lo mostramos
            <div className="ml-6 mt-2 space-y-2">
              <a href="/auth/admin/informacion" className="block text-teal-300 hover:underline">
                Información de la Empresa
              </a>
            </div>
          )}
        </div>
      </nav>
      <button className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded text-center">
      <a href="/login" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 p-2 rounded">
          <span>ㅤㅤCerrar Sesión</span>
        </a>
      </button>
    </aside>
  );
};

export default Sidebar;

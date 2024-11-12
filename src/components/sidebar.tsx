import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-green-600 text-white flex flex-col p-5">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 overflow-hidden">
          <img
            src="Imagen1.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold">EL RAPIDO</h2>
      </div>
      <nav className="space-y-4">
                    <a href="#" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🏠</span>
                        <span>Dashboard</span>
                    </a>
                    <a href="/auth/admin/bus" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🚌</span>
                        <span>Buses</span>
                    </a>
                    <a href="/auth/admin/pasajes" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🎫</span>
                        <span>Pasajes</span>
                    </a>
                    <a href="/auth/admin/ventas" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>💼</span>
                        <span>Ventas</span>
                    </a>
                    <a href="/auth/admin/reporte" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>📝</span>
                        <span>Reportes</span>
                    </a>
                    <a href="/auth/admin/configuracion" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>⚙️</span>
                        <span>Configuración</span>
                    </a>
                </nav>
      <button className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded text-center">
        Cerrar sesión
      </button>
    </aside>
  );
};

export default Sidebar;

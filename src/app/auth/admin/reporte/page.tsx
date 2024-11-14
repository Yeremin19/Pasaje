"use client";

import React, { useState } from 'react';

const App = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-green-600 text-white flex flex-col p-5 h-screen">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 overflow-hidden">
                        <img
                            src="/Imagen1.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-lg font-bold">EL RAPIDO</h2>
                </div>
                <nav className="space-y-4">
                    <a href="/" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🏠</span>
                        <span>Dashboard</span>
                    </a>
                    <a href="/auth/admin/bus" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🚌</span>
                        <span>Buses</span>
                    </a>
                    <a href="/auth/admin/usuario" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
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
                    <div>
                        <div className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded cursor-pointer" onClick={() => setIsConfigOpen(!isConfigOpen)}>
                            <span>⚙️</span>
                            <span>Configuraciónㅤㅤㅤ✛</span>
                        </div>
                        {isConfigOpen && (
                            <div className="ml-6 mt-2 space-y-2">
                                <a href="/auth/admin/informacion" className="block text-teal-300 hover:underline">Información de la Empresa</a>
                            </div>
                        )}
                    </div>
                </nav>
                <button className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded justify-center">
                    Cerrar sesión
                </button>
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6">
                {/* Header */}
                <div className="bg-cyan-800 text-white p-4 shadow-md fixed top-0 z-50 w-full" style={{ margin: 0, left: '256px' }}>
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>
                <div className="mt-20">
                    <div className="bg-white p-6 rounded shadow mb-6">
                        <h2 className="text-xl font-bold mb-4">Generar Reporte</h2>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <select className="border border-gray-300 p-2 rounded w-full">
                    
                                <option>Choose Report Type *</option>
                            </select>
                            <input type="date" className="border border-gray-300 p-2 rounded w-full" placeholder="Date To *" />
                            <input type="date" className="border border-gray-300 p-2 rounded w-full" placeholder="Date From *" />
                            <select className="border border-gray-300 p-2 rounded w-full">
                                <option>Choose Category (optional)</option>
                            </select>
                            <select className="border border-gray-300 p-2 rounded w-full">
                                <option>Choose Product (optional)</option>
                            </select>
                            <select className="border border-gray-300 p-2 rounded w-full">
                                <option>Choose Comprobante (optional)</option>
                            </select>
                            <select className="border border-gray-300 p-2 rounded w-full">
                                <option>Choose Vendor (optional)</option>
                            </select>
                            <select className="border border-gray-300 p-2 rounded w-full">
                                <option>Customer (optional)</option>
                            </select>
                            <select className="border border-gray-300 p-2 rounded w-full">
                                <option>Choose Stock Entire / Seller (optional)</option>
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded">
                            Obtener Reporte                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

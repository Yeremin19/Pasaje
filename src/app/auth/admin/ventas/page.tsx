"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Receipt from '../boleta/page'; // Importación del componente de la boleta

const App = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const generateExcel = () => {
        const data = [
            { Operacion: '001', Fecha: '2024-11-08', Hora: '10:00', Nombre: 'John Doe', Documento: '12345678', N_Pasaje: 'A001', Precio: '50.00' },
            // Agrega más datos si es necesario
        ];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial de Compras');

        XLSX.writeFile(workbook, 'Historial_de_Compras.xlsx');
    };

    const printReceipt = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        //@ts-ignore
        printWindow.document.write(`
            <html>
                <head>
                    <title>Imprimir Boleta</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                </head>
                <body class="p-4">
                    <div class="max-w-sm mx-auto">
                        
                        ${ //@ts-ignore 
                            document.getElementById('receipt').innerHTML}
                    </div>
                    <script>
                        window.print();
                        window.onafterprint = function() { window.close(); };
                    </script>
                </body>
            </html>
        `);
        //@ts-ignore
        printWindow.document.close();
    };

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
                {/* Componente de boleta oculto */}
                <div id="receipt" className="hidden">
                    <Receipt />
                </div>
                {/* Header */}
                <div className="bg-cyan-800 text-white p-4 shadow-md fixed top-0 z-50 w-full" style={{ margin: 0, left: '256px' }}>
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>
                <div className="mt-20">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Confirmación de Compra</h1>
                        <button 
                            onClick={() => window.location.href = '/auth/admin/pasajes'}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded">
                            Nueva Compra
                        </button>
                    </div>
                    <h1 className="text-2xl font-bold">ㅤ </h1>
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 p-2">Operación</th>
                                <th className="border border-gray-300 p-2">Fecha</th>
                                <th className="border border-gray-300 p-2">Hora</th>
                                <th className="border border-gray-300 p-2">Nombre</th>
                                <th className="border border-gray-300 p-2">Documento</th>
                                <th className="border border-gray-300 p-2">N° Pasaje</th>
                                <th className="border border-gray-300 p-2">Precio del pasaje</th>
                                <th className="border border-gray-300 p-2">Imprimir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={7} className="border border-gray-300 p-2 text-center">No hay datos disponibles</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button onClick={printReceipt} className="bg-gray-300 p-2 rounded hover:bg-gray-400">
                                        🖨️
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 className="text-2xl font-bold">ㅤ </h1>
                    <h1 className="text-2xl font-bold">ㅤ </h1>
                    <div className="flex justify-between items-center my-4">
                        <h1 className="text-2xl font-bold">Historial de Compras</h1>
                        <button 
                            onClick={generateExcel}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-16 rounded">
                            Excel
                        </button>
                    </div>
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 p-2">Operación</th>
                                <th className="border border-gray-300 p-2">Fecha</th>
                                <th className="border border-gray-300 p-2">Hora</th>
                                <th className="
border border-gray-300 p-2">Nombre</th>
                                <th className="border border-gray-300 p-2">Documento</th>
                                <th className="border border-gray-300 p-2">N° Pasaje</th>
                                <th className="border border-gray-300 p-2">Precio del pasaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={7} className="border border-gray-300 p-2 text-center">No hay datos disponibles</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default App;

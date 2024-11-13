"use client";

import React, { useState, useEffect, useContext } from 'react';
import * as XLSX from 'xlsx';
import { PasajesContext } from '@/context/PasajesContext';
import Receipt from '../boleta/page';

const App = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const { reservas, totalReservas, uniqueReserve, firstReserva } = useContext(PasajesContext);

    // Estado para la paginación en Historial de Compras
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Cargar las reservas cuando el componente se monta
    useEffect(() => {
        totalReservas();
        firstReserva();
    }, []);

    const generateExcel = () => {
        const data = reservas.map((reserva: any) => ({
            Operacion: reserva.reserva_id,
            Fecha: new Date(reserva.fecha_reserva).toLocaleDateString(),
            Hora: new Date(reserva.horario?.hora_salida).toLocaleTimeString(),
            Nombre: `${reserva.usuario?.nombre} ${reserva.usuario?.apellido}`,
            Documento: reserva.usuario?.dni,
            N_Pasaje: reserva.asiento?.numero_asiento,
            Precio: reserva.precio,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial de Compras');
        XLSX.writeFile(workbook, 'Historial_de_Compras.xlsx');
    };

    const printReceipt = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow?.document.write(`
            <html>
                <head>
                    <title>Imprimir Boleta</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                </head>
                <body class="p-4">
                    <div class="max-w-sm mx-auto">
                        ${document.getElementById('receipt')?.innerHTML}
                    </div>
                    <script>
                        window.print();
                        window.onafterprint = function() { window.close(); };
                    </script>
                </body>
            </html>
        `);
        printWindow?.document.close();
    };

    // Paginación para Historial de Compras
    const totalPages = Math.ceil(reservas.length / itemsPerPage);
    const currentReservations = reservas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
                    {/* Confirmación de Compra */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Confirmación de Compra</h1>
                        <button 
                            onClick={() => window.location.href = '/auth/admin/pasajes'}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded">
                            Nueva Compra
                        </button>
                    </div>
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
                            {Array.isArray(uniqueReserve) && uniqueReserve.length > 0 ? (
                                uniqueReserve.map((reserva: any) => (
                                    <tr key={reserva.reserva_id}>
                                        <td className="border border-gray-300 p-2">{reserva.reserva_id}</td>
                                        <td className="border border-gray-300 p-2">{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 p-2">{new Date(reserva.horario?.hora_salida).toLocaleTimeString()}</td>
                                        <td className="border border-gray-300 p-2">{reserva.usuario?.nombre} {reserva.usuario?.apellido}</td>
                                        <td className="border border-gray-300 p-2">{reserva.usuario?.dni}</td>
                                        <td className="border border-gray-300 p-2">{reserva.asiento?.numero_asiento}</td>
                                        <td className="border border-gray-300 p-2">{reserva.precio}</td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            <button onClick={printReceipt} className="bg-gray-300 p-2 rounded hover:bg-gray-400">
                                                🖨️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="border border-gray-300 p-2 text-center">No hay datos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Botón para exportar a Excel */}
                    <div className="flex justify-end my-4">
                        ㅤ
                    </div>
                    {/* Historial de Compra con paginación */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Historial de Compra</h1>
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
                                <th className="border border-gray-300 p-2">Nombre</th>
                                <th className="border border-gray-300 p-2">Documento</th>
                                <th className="border border-gray-300 p-2">N° Pasaje</th>
                                <th className="border border-gray-300 p-2">Precio del pasaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReservations.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="border border-gray-300 p-2 text-center">No hay datos disponibles</td>
                                </tr>
                            ) : (
                                currentReservations.map((reserva: any) => (
                                    <tr key={reserva.reserva_id}>
                                        <td className="border border-gray-300 p-2">{reserva.reserva_id}</td>
                                        <td className="border border-gray-300 p-2">{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 p-2">{new Date(reserva.horario?.hora_salida).toLocaleTimeString()}</td>
                                        <td className="border border-gray-300 p-2">{reserva.usuario?.nombre} {reserva.usuario?.apellido}</td>
                                        <td className="border border-gray-300 p-2">{reserva.usuario?.dni}</td>
                                        <td className="border border-gray-300 p-2">{reserva.asiento?.numero_asiento}</td>
                                        <td className="border border-gray-300 p-2">{reserva.precio}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="flex justify-between items-center mt-4">
                        <button 
                            onClick={handlePreviousPage} 
                            disabled={currentPage === 1} 
                            className="bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages} 
                            className="bg-gray-300 hover:bg-gray-400 p-2 rounded disabled:opacity-50">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

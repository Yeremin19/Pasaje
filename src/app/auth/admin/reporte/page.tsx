"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const App = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [tipoInforme, setTipoInforme] = useState(""); // Estado para manejar la selección del tipo de informe

    const handleTipoInformeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoInforme(event.target.value); // Actualizar el estado según la selección
    };

    const handleGenerateReport = () => {
        if (tipoInforme === "excel") {
            generateExcel();
        } else if (tipoInforme === "pdf") {
            generatePDF();
        } else {
            alert("Por favor, seleccione un tipo de informe.");
        }
    };

    const generateExcel = () => {
        // Datos de la tabla
        const tableData = [
            ["Operación", "Fecha", "Hora", "Nombre", "Documento", "N_Pasaje", "Precio"],
            ["1", "18/11/2024", "8:00:00 p. m.", "Yeremin Eliseo", "76369316", "01", "15"],
            ["2", "15/11/2019", "6:00:05 a. m.", "María García", "87654321", "08", "16"],
            ["3", "18/11/2019", "8:00:05 a. m.", "Sofía Andrade", "89234567", "16", "22"],
            ["4", "12/11/2019", "13:00:05 a. m.", "Diego Pérez", "45678912", "26", "15"],
            ["5", "13/11/2019", "18:00:05 a. m.", "Camila Vargas", "78123456", "13", "13"],
            ["6", "14/11/2019", "20:00:05 a. m.", "Mateo Fernández", "32567890", "05", "16"],
            ["7", "19/11/2019", "12:00:05 a. m.", "Valeria Castillo", "65478932", "09", "15"],
            ["8", "23/11/2019", "10:00:05 a. m.", "Isabella Rojas", "10928374", "11", "13"],
            ["9", "73/11/2019", "8:00:05 a. m.", "Lucas Morales", "98765432", "17", "15"],
        ];

        // Crear una hoja de trabajo de Excel
        const worksheet = XLSX.utils.aoa_to_sheet(tableData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

        // Descargar archivo Excel
        XLSX.writeFile(workbook, "reporte.xlsx");
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Título
        doc.setFontSize(16);
        doc.text("Reporte de Ventas", 14, 20);

        // Datos de la tabla
        const tableColumn = ["Operación", "Fecha", "Hora", "Nombre", "Documento", "N_Pasaje", "Precio"];
        const tableRows = [
            ["1", "18/11/2024", "8:00:00 p. m.", "Yeremin Eliseo", "76369316", "01", "15"],
            ["2", "15/11/2019", "6:00:05 a. m.", "María García", "87654321", "08", "16"],
            ["3", "18/11/2019", "8:00:05 a. m.", "Sofía Andrade", "89234567", "16", "22"],
            ["4", "12/11/2019", "13:00:05 a. m.", "Diego Pérez", "45678912", "26", "15"],
            ["5", "13/11/2019", "18:00:05 a. m.", "Camila Vargas", "78123456", "13", "13"],
            ["6", "14/11/2019", "20:00:05 a. m.", "Mateo Fernández", "32567890", "05", "16"],
            ["7", "19/11/2019", "12:00:05 a. m.", "Valeria Castillo", "65478932", "09", "15"],
            ["8", "23/11/2019", "10:00:05 a. m.", "Isabella Rojas", "10928374", "11", "13"],
            ["9", "73/11/2019", "8:00:05 a. m.", "Lucas Morales", "98765432", "17", "15"],
        ];

        // Generar tabla con autoTable
   
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        // Descargar PDF
        doc.save("reporte.pdf");
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="flex flex-col bg-gradient-to-b from-red-500 to-black w-52 p-4 shadow-lg text-white">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 overflow-hidden">
                        <img
                            src="/loguito.jpeg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-lg font-bold">EL RAPIDO</h2>
                </div>
                <nav className="space-y-4">
                    <a href="/" className="flex items-center space-x-2 hover:bg-red-900 p-2 border-2 rounded">
                        <span>🏠</span>
                        <span>Dashboard</span>
                    </a>
                    <a href="/auth/admin/bus" className="flex items-center space-x-2 hover:bg-red-800 p-2 border-2 rounded">
                        <span>🚌</span>
                        <span>Buses</span>
                    </a>
                    <a href="/auth/admin/usuario" className="flex items-center space-x-2 hover:bg-red-800 p-2 border-2 rounded">
                        <span>🎫</span>
                        <span>Pasajes</span>
                    </a>
                    <a href="/auth/admin/ventas" className="flex items-center space-x-2 hover:bg-red-800 p-2 border-2 rounded">
                        <span>💼</span>
                        <span>Ventas</span>
                    </a>
                    <a href="/auth/admin/reporte" className="flex items-center space-x-2 hover:bg-red-800 p-2 border-2 rounded">
                        <span>📝</span>
                        <span>Reportes</span>
                    </a>
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
                <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-center mt-10">
                    <a href="/login" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 p-2 rounded">
                        <span>ㅤ Cerrar Sesión</span>
                    </a>
                </button>
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-6">
                <div className="bg-white p-6 rounded shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Generar Reporte</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <select
                            className="border border-gray-300 p-2 rounded w-full"
                            value={tipoInforme}
                            onChange={handleTipoInformeChange}
                        >
                            <option value="">Elija Tipo de informe *</option>
                            <option value="excel">Excel</option>
                            <option value="pdf">PDF</option>
                        </select>
                        <input
                            type="date"
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Date To *"
                        />
                        <input
                            type="date"
                            className="border border-gray-300 p-2 rounded w-full"
                            placeholder="Date From *"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
                            onClick={handleGenerateReport}
                        >
                            Obtener Reporte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

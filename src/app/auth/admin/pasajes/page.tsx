"use client";
import React, { useState } from 'react';

const App = () => {
    const seats = [
        
    ];

    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [seatNumber, setSeatNumber] = useState('');

    const handleSeatClick = (seat: any) => {
        setSelectedSeat(seat);
        setSeatNumber(seat.number);
        console.log(`Has seleccionado el asiento número ${seat.number}`);
    };

    const handleDniChange = (e: any) => {
        setDni(e.target.value);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-green-600 text-white flex flex-col p-5">
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
            <div className="flex-1 bg-gray-100 p-4">
                {/* Header */}
                <div className="bg-cyan-800 text-white p-4 shadow-md fixed top-0 z-50 w-full" style={{ margin: 0, left: '256px' }}>
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>
                <div className="mt-16">
                    <h1 className="text-2xl font-bold mb-4">Huaraz - La Union (Huanuco)</h1>
                    <div className="flex mt-4">
                        <div className="w-1/3">
                            <img className='flex items-center' src="/rapido.png " alt="Bus and city illustration" />
                        </div>
                    </div>
            </div>
        </div>
    </div>
);
};

export default App;

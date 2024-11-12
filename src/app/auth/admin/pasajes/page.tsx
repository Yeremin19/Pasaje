"use client";
import React, { useState } from 'react';

const App = () => {
    const seats = [
        { number: 4, color: 'red' }, { number: 8, color: 'yellow' }, { number: 12, color: 'red' }, { number: 16, color: 'red' }, { number: 20, color: 'yellow' }, { number: 24, color: 'red' }, { number: 28, color: 'white' },
        { number: 3, color: 'green' }, { number: 7, color: 'red' }, { number: 11, color: 'red' }, { number: 15, color: 'red' }, { number: 19, color: 'yellow' }, { number: 23, color: 'white' }, { number: 27, color: 'white' },
        { number: 2, color: 'green' }, { number: 6, color: 'green' }, { number: 10, color: 'green' }, { number: 14, color: 'green' }, { number: 18, color: 'yellow' }, { number: 22, color: 'white' }, { number: 26, color: 'white' },
        { number: 1, color: 'red' }, { number: 5, color: 'red' }, { number: 9, color: 'red' }, { number: 13, color: 'green' }, { number: 17, color: 'green' }, { number: 21, color: 'red' }, { number: 25, color: 'white' },
    ];

    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [seatNumber, setSeatNumber] = useState('');

    const handleSeatClick = (seat) => {
        setSelectedSeat(seat);
        setSeatNumber(seat.number);
        console.log(`Has seleccionado el asiento número ${seat.number}`);
    };

    const handleDniChange = (e) => {
        setDni(e.target.value);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-green-600 text-white flex flex-col p-5">
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
            <div className="flex-1 bg-gray-100 p-4">
                {/* Header */}
                <div className="bg-cyan-800 text-white p-4 shadow-md fixed top-0 z-50 w-full" style={{ margin: 0, left: '256px' }}>
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>
                <div className="mt-16">
                    <h1 className="text-2xl font-bold mb-4">Huaraz - La Union (Huanuco)</h1>
                    <div className="flex mt-4">
                        <div className="w-1/3">
                            <img src="/rapido.png " alt="Bus and city illustration" className="w-full" />
                        </div>
                        <div className="w-2/3 pl-4">
                            <div className="text-red-600">PARADAS A <span className="font-bold">ESCALA</span></div>
                            <div>FECHA: <span className="text-red-600">05/11/2024</span></div>
                            <div>SERVICIO: <span className="text-red-600">REGULAR</span></div>
                            <div>ORIGEN: <span className="text-red-600">HUARAZ PRINCIPAL</span></div>
                            <div>DESTINO: <span className="text-red-600">HUALLANCA</span></div>
                            <div>BUS: <span className="text-red-600">C1T-953</span></div>
                            <div>HORA: <span className="text-red-600">05:45 AM</span></div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="grid grid-cols-7 gap-1 mt-2">
                            {seats.map(seat => (
                                <div 
                                    key={seat.number} 
                                    onClick={() => handleSeatClick(seat)} 
                                    className={`seat ${seat.color} flex items-center justify-center border border-gray-300 m-1 cursor-pointer`}>
                                    <span className="text-sm font-semibold">{seat.number}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border p-4 mt-4">
                        <h2 className="text-lg font-semibold mb-2">Formulario de compra de asientos.</h2>
                        <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/auth/admin/ventas'; }}>
                            <div className="mb-2">
                                <label className="block font-semibold">Documento de identidad (DNI):</label>
                                <div className="flex items-center gap-2">
                                    <input type="text" className="w-full border rounded p-2" value={dni} onChange={handleDniChange} />
                                    <button type="button" className="bg-blue-500 text-white p-2 rounded">Buscar</button>
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="block font-semibold">Nombres:</label>
                                <input type="text" className="w-full border rounded p-2"/>
                            </div>
                            <div className="mb-2">
                            <label className="block font-semibold">Apellidos:</label>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold">N° Pasaje:</label>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold">Precio del Pasaje:</label>
                            <input type="text" className="w-full border rounded p-2" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Comprar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
};

export default App;

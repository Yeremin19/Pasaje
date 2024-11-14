"use client";
import React, { useState, useContext, useEffect } from 'react';
import { PasajesContext } from '@/context/PasajesContext';
import { AsientoT } from '@/interface/typesfront';

enum TipoAsiento {
    VENTANA = 'ventana',
    PASILLO = 'pasillo',
}

const App = () => {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    
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
            <div className="flex-1 bg-gray-100 p-4">
                {/* Header */}
                <div className="bg-cyan-800 text-white p-4 shadow-md fixed top-0 z-50 w-full" style={{ margin: 0, left: '256px' }}>
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>

                <div className="mt-16">
                    {/* Main Text Content */}
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold mb-4">Huaraz - La Union (Huanuco)</h1>
                    </div>
                    
                    {/* Botones Usuario, Asiento y Reserva en el lado izquierdo */}
                    <div className="flex space-x-2 mb-8">
                        <a href="/auth/admin/usuario" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                            Clientes
                        </a>
                        <a href="/auth/admin/asiento" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                            Asiento
                        </a>
                        <a href="/auth/admin/reserva" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                            Pasaje
                        </a>
                    </div>

                    {/* FormularioAsiento component */}
                    <FormularioAsiento />
                </div>
            </div>
        </div>
    );
};

const FormularioAsiento = () => {
    const [numeroAsiento, setNumeroAsiento] = useState('');
    const [tipo, setTipo] = useState('');
    const [busId, setBusId] = useState('');
    const { createAsiento, totalAsientos, asientos, buses, totalBuses, deleteAsiento } = useContext(PasajesContext);

    useEffect(() => {
        totalAsientos();
        totalBuses();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await createAsiento({
                numero_asiento: numeroAsiento,
                tipo: tipo as TipoAsiento,
                bus_id: Number(busId),
            });
            alert('Asiento creado exitosamente');
        } catch (error) {
            console.error('Error en la función createAsiento:', error);
            alert('Error al crear el asiento. Intente de nuevo.');
        }
    };

    async function handleDelete(asiento_id: number) {
        try {
            await deleteAsiento(asiento_id);
            console.log(asiento_id);
            alert('Asiento eliminado exitosamente');
        } catch (error) {
            console.error('Error en la función deleteAsiento:', error);
            alert('Error al eliminar el asiento. Intente de nuevo.');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto">
                <h2 className="text-lg font-semibold mb-4">Crear Asiento</h2>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Número de Asiento:</label>
                    <input
                        type="text"
                        value={numeroAsiento}
                        onChange={(e) => setNumeroAsiento(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Tipo: {tipo}</label>
                    <button onClick={() => setTipo(TipoAsiento.VENTANA)} type="button" className="bg-blue-500 text-white p-2 rounded mr-2">Ventana</button>
                    <button onClick={() => setTipo(TipoAsiento.PASILLO)} type="button" className="bg-blue-500 text-white p-2 rounded">Pasillo</button>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Buses:</label>
                    <select value={busId} onChange={(e) => setBusId(e.target.value)} className="w-full border p-2 rounded" required>
                        <option value="">--Seleccione un Bus--</option>
                        {buses.map(bus => (
                            <option key={bus.bus_id} value={bus.bus_id}>
                                {bus.modelo} - {bus.placa}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Crear Asiento
                </button>
            </form>

        </>
    );
};

export default App;

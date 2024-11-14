"use client";
import React, { useContext, useEffect, useState } from 'react';
import { PasajesContext } from '@/context/PasajesContext';

function BusPage() {
    const { buses, totalBuses, crearBuses, deleteBus } = useContext(PasajesContext);

    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Número de elementos por página

    useEffect(() => {
        totalBuses();
    }, []);

    const handleCreateBus = async () => {
        try {
            const bus = await crearBuses({
                placa,
                modelo,
                capacidad: Number(capacidad),
            });
            console.log(bus);

            setPlaca('');
            setModelo('');
            setCapacidad('');
        } catch (error) {
            console.error('Error en handleCreateBus', error);
        }
    };

    const handleDeleteBus = async (id: string) => {
        try {
            await deleteBus(id);
        } catch (error) {
            console.error('Error en handleDeleteBus', error);
        }
    };

    // Función para manejar el cambio de página
    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    // Calcular los buses que se mostrarán en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBuses = buses.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(buses.length / itemsPerPage);

    return (
        <div className='flex min-h-screen'>
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

            <div className='flex-1'>
                {/* Encabezado flexible */}
                <div className="bg-cyan-800 text-white p-4 shadow-md sticky top-0 z-10 w-full">
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>
                <div className="p-4 container mx-auto">
                    <h2 className='text-2xl font-bold mb-4'>
                        Administración de Buses
                    </h2>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2'>
                        <a href={`/auth/admin/bus/`}>Registro de Buses</a>
                    </button>                                             
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2'>
                        <a href={`/auth/admin/ruta/`}>Ruta de Buses</a>
                    </button>                                             
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2'>
                        <a href={`/auth/admin/horario/`}>Horario de Buses</a>
                    </button>
                    <h2 className='text-2xl font-bold mb-4'>

                    </h2>
                    <h2 className='text-2xl font-bold mb-4'>
                        Registro de Buses
                    </h2>
                    <div className='flex flex-col gap-2 text-black'>
                        <input
                            type='text'
                            placeholder='ingrese modelo'
                            value={modelo}
                            onChange={e => setModelo(e.target.value)}
                            className='border rounded p-2'
                        />
                        <input
                            type='text'
                            placeholder='ingrese placa'
                            value={placa}
                            onChange={e => setPlaca(e.target.value)}
                            className='border rounded p-2'
                        />
                        <input
                            type='text'
                            placeholder='ingrese capacidad'
                            value={capacidad}
                            onChange={e => setCapacidad(e.target.value)}
                            className='border rounded p-2'
                        />
                        <button
                            onClick={handleCreateBus}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                            🆕 Registrar Bus
                        </button>
                    </div>
                    <div className='flex justify-end overflow-x-auto mt-4'>
                        <table className='min-w-full text-black border'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='w-[100px] border px-4 py-2'>ID</th>
                                    <th className='border px-4 py-2'>Placa</th>
                                    <th className='border px-4 py-2'>Modelo</th>
                                    <th className='border px-4 py-2'>Capacidad</th>
                                    <th className='border px-4 py-2'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBuses.map(bus => (
                                    <tr key={bus.bus_id} className='even:bg-gray-100'>
                                        <td className='border px-4 py-2 font-medium'>{bus.bus_id}</td>
                                        <td className='border px-4 py-2'>{bus.placa}</td>
                                        <td className='border px-4 py-2'>{bus.modelo}</td>
                                        <td className='text-right border px-4 py-2'>{bus.capacidad}</td>
                                        <td className='border px-4 py-2 text-right'>
                                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2'>
                                                <a href={`/auth/admin/bus/${bus.bus_id}`}>Editar</a>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDeleteBus(bus.placa);
                                                }}
                                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusPage;

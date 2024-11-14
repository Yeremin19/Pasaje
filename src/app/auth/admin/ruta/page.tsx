"use client";
import { PasajesContext } from '@/context/PasajesContext';
import React, { useContext, useEffect, useState } from 'react';

function RutaPage() {
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [distancia, setDistancia] = useState('');
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const { totalRutas, rutas, crearRutas, deleteRuta } = useContext(PasajesContext);

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Elementos por página

    useEffect(() => {
        totalRutas();
    }, []);

    const handleCreateBus = async (e: any) => {
        e.preventDefault();
        await crearRutas({ origen, destino, distancia_km: Number(distancia) });
        setOrigen('');
        setDestino('');
        setDistancia('');
    };

    const handleDeleteRuta = async (id: any) => {
        try {
            await deleteRuta(id);
        } catch (error) {
            console.error('Error en handleDeleteRuta', error);
        }
    };

    // Cálculo de elementos de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRutas = rutas.slice(indexOfFirstItem, indexOfLastItem);

    // Número total de páginas
    const totalPages = Math.ceil(rutas.length / itemsPerPage);

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
                <div className='p-4 container mx-auto'>
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
                        Crear Ruta
                    </h2>
                    <form
                        onSubmit={handleCreateBus}
                        className='flex flex-col gap-4 text-black'
                    >
                        <input
                            value={origen}
                            onChange={e => setOrigen(e.target.value)}
                            type='text'
                            placeholder='Ingrese origen'
                            className='border rounded p-2'
                        />
                        <input
                            value={destino}
                            onChange={e => setDestino(e.target.value)}
                            type='text'
                            placeholder='Ingrese destino'
                            className='border rounded p-2'
                        />
                        <input
                            value={distancia}
                            onChange={e => setDistancia(e.target.value)}
                            type='text'
                            placeholder='Ingrese distancia'
                            className='border rounded p-2'
                        />
                        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            🆕 Crear
                        </button>
                    </form>

                    <div className='mt-6'>
                        <table className='min-w-full border-collapse border border-gray-300'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='border border-gray-300 px-4 py-2'>Origen</th>
                                    <th className='border border-gray-300 px-4 py-2'>Destino</th>
                                    <th className='border border-gray-300 px-4 py-2'>Distancia</th>
                                    <th className='border border-gray-300 px-4 py-2'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRutas?.map(ruta => (
                                    <tr key={ruta.ruta_id} className='even:bg-gray-100'>
                                        <td className='border border-gray-300 px-4 py-2'>{ruta.origen}</td>
                                        <td className='border border-gray-300 px-4 py-2'>{ruta.destino}</td>
                                        <td className='border border-gray-300 px-4 py-2 text-right'>{ruta.distancia_km} km</td>
                                        <td className='border border-gray-300 px-4 py-2 flex gap-2 justify-end'>
                                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>
                                                <a href={`/auth/admin/ruta/${ruta.ruta_id}`}>Editar</a>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRuta(ruta.ruta_id)}
                                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Paginación */}
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RutaPage;

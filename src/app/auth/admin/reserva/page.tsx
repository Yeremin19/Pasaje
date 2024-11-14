"use client";
import Time from '@/components/tiempo';
import { PasajesContext } from '@/context/PasajesContext';
import { totalReservas } from '@/interface/typesfront';
import React, { useContext, useEffect, useState } from 'react';

export enum EstadoReserva {
    PENDIENTE = 'pendiente',
    PAGADO = 'pagado',
    CANCELADO = 'cancelado',
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

                    {/* ReservaForm component */}
                    <ReservaForm />
                </div>
            </div>
        </div>
    );
};

const ReservaForm = () => {
    const [estado, setEstado] = useState('');
    const [fecha_reserva, setFechaReserva] = useState('');
    const [usuario_id, setUsuarioId] = useState<number>(0);
    const [horario_id, setHorarioId] = useState<number>(0);
    const [asiento_id, setAsientoId] = useState<number>(0);
    const [precio, setPrecio] = useState<number>(0);
    const { createReserva, totalHorarios, horarios, reservas, usuarios, totalUsuarios, asientos, totalAsientos, totalReservas } = useContext(PasajesContext);

    useEffect(() => {
        totalHorarios();
        totalUsuarios();
        totalAsientos();
        totalReservas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const reserva = await createReserva({
                estado: estado as EstadoReserva,
                fecha_reserva: new Date(fecha_reserva),
                precio: Number(precio),
                usuario_id: Number(usuario_id),
                horario_id: Number(horario_id),
                asiento_id: Number(asiento_id),
            });

            console.log(reserva);
            alert('Reserva creada exitosamente');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('Error al crear la reserva. Intente de nuevo.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
                <h2 className="text-2xl font-bold mb-4">Nuevo Pasaje</h2>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Estado:</label>
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setEstado(EstadoReserva.PAGADO)}
                            className={`w-full p-2 rounded-lg text-white font-semibold ${
                                estado === EstadoReserva.PAGADO ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                        >
                            Pagado
                        </button>
                        <button
                            type="button"
                            onClick={() => setEstado(EstadoReserva.PENDIENTE)}
                            className={`w-full p-2 rounded-lg text-white font-semibold ${
                                estado === EstadoReserva.PENDIENTE ? 'bg-yellow-500' : 'bg-gray-300'
                            }`}
                        >
                            Pendiente
                        </button>
                        <button
                            type="button"
                            onClick={() => setEstado(EstadoReserva.CANCELADO)}
                            className={`w-full p-2 rounded-lg text-white font-semibold ${
                                estado === EstadoReserva.CANCELADO ? 'bg-red-500' : 'bg-gray-300'
                            }`}
                        >
                            Cancelado
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block font-semibold">Precio:</label>
                    <input
                        type="text"
                        value={precio}
                        onChange={(e) => setPrecio(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Fecha de Reserva:</label>
                    <input
                        type="date"
                        value={fecha_reserva}
                        onChange={(e) => setFechaReserva(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Horario</label>
                    <select value={horario_id} onChange={(e) => setHorarioId(Number(e.target.value))} className="w-full border rounded p-2">
                        <option>Seleccionar Fecha</option>
                        {horarios.map((horario) => (
                            <option key={horario.horario_id} value={horario.horario_id}>
                                {`${new Date(horario.fecha).toLocaleDateString()} - ${new Date(horario.hora_salida).toLocaleTimeString()}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Usuario</label>
                    <select value={usuario_id} onChange={(e) => setUsuarioId(Number(e.target.value))} className="w-full border rounded p-2">
                        <option>Seleccionar Usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.usuario_id} value={usuario.usuario_id}>
                                {usuario.nombre} {usuario.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Asiento</label>
                    <select value={asiento_id} onChange={(e) => setAsientoId(Number(e.target.value))} className="w-full border rounded p-2">
                        <option>Seleccionar Asiento</option>
                        {asientos.map((asiento) => (
                            <option key={asiento.asiento_id} value={asiento.asiento_id}>
                                {asiento.numero_asiento} - {asiento.tipo}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Crear Pasaje
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Lista de Pasajes</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Estado</th>
                            <th className="py-2 px-4 border-b">Fecha de Compra</th>
                            <th className="py-2 px-4 border-b">Usuario</th>
                            <th className="py-2 px-4 border-b">Horario</th>
                            <th className="py-2 px-4 border-b">Asiento</th>
                            <th className="py-2 px-4 border-b">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva: any) => (
                            <tr key={reserva.reserva_id}>
                                <td className="py-2 px-4 border-b">{reserva.estado}</td>
                                <td className="py-2 px-4 border-b">{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{reserva.usuario?.nombre} {reserva.usuario?.apellido}</td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(reserva.horario?.fecha).toLocaleDateString()} - {new Date(reserva.horario?.hora_salida).toLocaleTimeString()}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {reserva.asiento?.numero_asiento} - {reserva.asiento?.tipo}
                                </td>
                                <td className="py-2 px-4 border-b">{reserva.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default App;

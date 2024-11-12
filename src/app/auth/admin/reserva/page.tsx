"use client";
import { PasajesContext } from '@/context/PasajesContext';
import React, { useContext, useState } from 'react';

export enum EstadoReserva {
    PENDIENTE = 'pendiente',
    PAGADO = 'pagado',
    CANCELADO = 'cancelado',
}

const ReservaForm = () => {
    const [estado, setEstado] = useState('');
    const [fecha_reserva, setFechaReserva] = useState('');
    const [usuario_id, setUsuarioId] = useState('');
    const [horario_id, setHorarioId] = useState('');
    const [asiento_id, setAsientoId] = useState('');
    const { createReserva } = useContext(PasajesContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createReserva({
                estado: estado as EstadoReserva,
                fecha_reserva: new Date(fecha_reserva),
                usuario_id: Number(usuario_id),
                horario_id: Number(horario_id),
                asiento_id: Number(asiento_id),
            });
            alert('Reserva creada exitosamente');
            // Limpiar campos del formulario
            setEstado('');
            setFechaReserva('');
            setUsuarioId('');
            setHorarioId('');
            setAsientoId('');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('Error al crear la reserva. Intente de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Crear Reserva</h2>
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
            <div className="mb-4">
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
                <label className="block font-semibold">Usuario ID:</label>
                <input
                    type="text"
                    value={usuario_id}
                    onChange={(e) => setUsuarioId(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Horario ID:</label>
                <input
                    type="text"
                    value={horario_id}
                    onChange={(e) => setHorarioId(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Asiento ID:</label>
                <input
                    type="text"
                    value={asiento_id}
                    onChange={(e) => setAsientoId(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Crear Reserva
            </button>
        </form>
    );
};

export default ReservaForm;

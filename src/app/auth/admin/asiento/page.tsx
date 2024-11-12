"use client";
import { PasajesContext } from '@/context/PasajesContext';
import { AsientoT } from '@/interface/typesfront';
import React, { useContext, useEffect, useState } from 'react';

enum TipoAsiento {
    VENTANA = 'ventana',
    PASILLO = 'pasillo',
}

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
                <label className="block font-semibold mb-1">ID de Bus:</label>
                <select value={busId}
                onChange={(e) => setBusId(e.target.value)}
                className="w-full border p-2 rounded" required>
                    <option value="">--Seleccione un Bus--</option>
                    {buses.map(bus => (
                        <option key={bus.bus_id} value={bus.bus_id
                        }>
                            {bus.modelo} - {bus.placa}
                        </option>
                    ))}
                </select>
            </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Crear Asiento
                </button>
            </form>

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-4 text-left font-semibold text-gray-700">Id Asiento</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700">Numero de Asiento</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700">Tipo</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700">ID de Bus</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700">Modelo</th>
                            <th className="px-6 py-4 text-center font-semibold text-gray-700">Editar</th>
                            <th className="px-6 py-4 text-center font-semibold text-gray-700">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asientos.length > 0 ? (
                            asientos.map((asiento: any) => (
                                <tr key={asiento.asiento_id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-800">{asiento.asiento_id}</td>
                                    <td className="px-6 py-4 text-gray-800">{asiento.numero_asiento}</td>
                                    <td className="px-6 py-4 text-gray-800">{asiento.tipo}</td>
                                    <td className="px-6 py-4 text-gray-800">{asiento.bus_id}</td>
                                    <td className="px-6 py-4 text-gray-800">{asiento.bus?.modelo}</td>
                                    <td className="px-6 py-4 text-center">
                                        <a href={`/auth/admin/asiento/${asiento.asiento_id}`} className="text-blue-500">Editar</a>
                                    </td>
                                    <td className="px-6 py-4 text-center text-red-500 cursor-pointer"
                                    onClick={
                                        ()=> handleDelete( Number(asiento.asiento_id))
                                    }
                                    >
                                        Eliminar
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No hay asientos</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default FormularioAsiento;

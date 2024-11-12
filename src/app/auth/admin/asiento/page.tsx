"use client";
import { PasajesContext } from '@/context/PasajesContext';
import React, { useContext, useState } from 'react';

enum TipoAsiento  {
    VENTANA = 'ventana',
    PASILLO = 'pasillo',
}

const FormularioAsiento = () => {
    const [numeroAsiento, setNumeroAsiento] = useState('');
    const [tipo, setTipo] = useState('');
    const [busId, setBusId] = useState('');
    const {createAsiento} = useContext(PasajesContext);

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

    return (
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
                <label className="block font-semibold mb-1">Tipo:</label>
                <p>{tipo}</p>
                <button onClick={() => setTipo(TipoAsiento.VENTANA)} className="bg-blue-500 text-white p-2 rounded mr-2">Ventana</button>
                <button onClick={() => setTipo(TipoAsiento.PASILLO)} className="bg-blue-500 text-white p-2 rounded">Pasillo</button>
            </div>
            <div className="mb-4">
                <label className="block font-semibold mb-1">ID de Bus:</label>
                <input
                    type="text"
                    value={busId}
                    onChange={(e) => setBusId(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Crear Asiento
            </button>
        </form>
    );
};

export default FormularioAsiento;

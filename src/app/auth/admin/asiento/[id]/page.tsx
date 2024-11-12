"use client";
import { PasajesContext } from '@/context/PasajesContext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
enum TipoAsiento  {
  VENTANA = 'ventana',
  PASILLO = 'pasillo',
}
function EditAsiento() {

  const { id } = useParams<{ id: string }>()
  const [numeroAsiento, setNumeroAsiento] = useState('');
  const [tipo, setTipo] = useState('');
  const [busId, setBusId] = useState('');
  const {updateAsiento, totalAsientos, buses, totalBuses} = useContext(PasajesContext);


  useEffect(()=> {
    totalBuses()
    if(id) {
      fetch(`http://localhost:3000/api/seating/${id}`)
      .then(res => res.json())
      .then(data => {
        setNumeroAsiento(data.numero_asiento)
        setTipo(data.tipo)
        setBusId(data.bus_id)
        console.log(data)
      })
      .catch(error => console.error('Error fetching asiento data:', error))
    }
    }, [id])

  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      await updateAsiento ({
        numero_asiento: numeroAsiento,
        tipo: tipo as TipoAsiento,
        bus_id: Number(busId),
      }, (Number(id)));
      if(id) {
        alert('Asiento editado exitosamente');
      }
    } catch (error) {
      console.error('Error en la función createAsiento:', error);
      alert('Error al edtitar el asiento. Intente de nuevo.');
    }
  };

  return (
    <div>
      <form onSubmit={handleEdit} className="p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Editar Asiento</h2>
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
                Editar Asiento
            </button>
        </form>
    </div>
  )
}

export default EditAsiento
'use client'
import { PasajesContext } from '@/context/PasajesContext'
import { redirect, useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function BusEditPage() {
    const { id } = useParams<{ id: string }>()

    const [placa, setPlaca] = useState<string>('')
    const [modelo, setModelo] = useState<string>('')
    const [capacidad, setCapacidad] = useState<string>('')
    const [redirectTo, setRedirectTo] = useState(false)

    const { updateBus } = useContext(PasajesContext)

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/api/bus/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPlaca(data.placa)
                    setModelo(data.modelo)
                    setCapacidad(data.capacidad)
                })
                .catch(error => console.error('Error fetching bus data:', error))
        }
    }, [id])

    const handleUpdateBus = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!id) {
                throw new Error('Bus ID is missing')
            }
            await updateBus(
                {
                    placa,
                    modelo,
                    capacidad: Number(capacidad),
                },
                id
            )
            setRedirectTo(true)
            // Opcionalmente, limpiar los campos de entrada después de editar un bus
            setPlaca('')
            setModelo('')
            setCapacidad('')
        } catch (error) {
            console.error('Error en handleUpdateBus', error)
        }
    }
    if (redirectTo) {
        return redirect('/auth/admin/bus')
    }

    return (
        <div className='flex flex-col items-center min-h-screen'>
            {/* Header section */}
            <div className="bg-cyan-800 text-white w-full p-4 shadow-md sticky top-0 z-10">
                <h1 className="text-3xl font-bold ">Sistema de Venta de Pasajes</h1>
            </div>
            
            <div className='w-full max-w-lg mt-10'>
                <h1 className='text-2xl font-bold mb-6 text-center'>Editar Bus</h1>
                <form
                    onSubmit={handleUpdateBus}
                    className='flex flex-col gap-4'
                >
                    <input
                        type='text'
                        placeholder='Ingrese modelo'
                        value={modelo}
                        onChange={e => setModelo(e.target.value)}
                        className='border rounded p-2'
                    />
                    <input
                        type='text'
                        placeholder='Ingrese placa'
                        value={placa}
                        onChange={e => setPlaca(e.target.value)}
                        className='border rounded p-2'
                    />
                    <input
                        type='text'
                        placeholder='Ingrese capacidad'
                        value={capacidad}
                        onChange={e => setCapacidad(e.target.value)}
                        className='border rounded p-2'
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                    >
                        Editar Bus
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BusEditPage;

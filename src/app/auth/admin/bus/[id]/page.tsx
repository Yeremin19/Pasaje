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
		<div>
			<h1>Editar Bus</h1>
			<form
				onSubmit={handleUpdateBus}
				className='flex flex-col gap-2 text-black'
			>
				<input
					type='text'
					placeholder='Ingrese modelo'
					value={modelo}
					onChange={e => setModelo(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Ingrese placa'
					value={placa}
					onChange={e => setPlaca(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Ingrese capacidad'
					value={capacidad}
					onChange={e => setCapacidad(e.target.value)}
				/>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Editar Bus
				</button>
			</form>
		</div>
	)
}

export default BusEditPage

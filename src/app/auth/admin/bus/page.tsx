'use client'
import { PasajesContext } from '@/context/PasajesContext'
import React, { useContext, useEffect, useState } from 'react'

function BusPage() {
	const { buses, totalBuses, crearBuses, deleteBus } =
		useContext(PasajesContext)

	const [placa, setPlaca] = useState<string>('')
	const [modelo, setModelo] = useState<string>('')
	const [capacidad, setCapacidad] = useState<string>('')

	useEffect(() => {
		totalBuses()
	}, [])

	const handleCreateBus = async () => {
		try {
			const bus = await crearBuses({
				placa,
				modelo,
				capacidad: Number(capacidad),
			})
			console.log(bus)

			setPlaca('')
			setModelo('')
			setCapacidad('')
		} catch (error) {
			console.error('Error en handleCreateBus', error)
		}
	}

	const handleDeleteBus = async (id: string) => {
		try {
			await deleteBus(id)
		} catch (error) {
			console.error('Error en handleDeleteBus', error)
		}
	}

	return (
		<div className='container mx-auto py-10 text-blue-50'>
			<h2 className='text-2xl font-bold mb-4'>
				Sistema de Venta de Pasajes de Bus
			</h2>
			<div className='flex flex-col gap-2 text-black'>
				<input
					type='text'
					placeholder='ingrese modelo'
					value={modelo}
					onChange={e => setModelo(e.target.value)}
				/>
				<input
					type='text'
					placeholder='ingrese placa'
					value={placa}
					onChange={e => setPlaca(e.target.value)}
				/>
				<input
					type='text'
					placeholder='ingrese capacidad'
					value={capacidad}
					onChange={e => setCapacidad(e.target.value)}
				/>
				<button
					onClick={handleCreateBus}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Registrar Bus
				</button>
			</div>
			<div className='overflow-x-auto'>
				<table className='min-w-full text-white'>
					<thead>
						<tr>
							<th className='w-[100px]'>ID</th>
							<th>Placa</th>
							<th>Modelo</th>
							<th className='text-right'>Capacidad</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{buses.map(bus => (
							<tr key={bus.bus_id}>
								<td className='font-medium'>{bus.bus_id}</td>
								<td>{bus.placa}</td>
								<td>{bus.modelo}</td>
								<td className='text-right'>{bus.capacidad}</td>
								<td>
									<button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
										<a href={`/auth/admin/bus/${bus.bus_id}`}>Editar</a>
									</button>
									<button
										onClick={() => {
											handleDeleteBus(bus.placa)
										}}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default BusPage

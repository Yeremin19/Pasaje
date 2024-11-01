'use client'
import { PasajesContext } from '@/context/PasajesContext'
import React, { useContext, useEffect } from 'react'

function RutaPage() {
	const [origen, setOrigen] = React.useState<string>('')
	const [destino, setDestino] = React.useState<string>('')
	const [distancia, setDistancia] = React.useState<string>('')

	const { totalRutas, rutas, crearRutas, deleteRuta } =
		useContext(PasajesContext)

	useEffect(() => {
		totalRutas()
	}, [])

	const handleCreateBus = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await crearRutas({ origen, destino, distancia_km: Number(distancia) })
		setOrigen('')
		setDestino('')
		setDistancia('')
	}

	const handleDeleteRuta = async (id: number) => {
		try {
			await deleteRuta(id)
		} catch (error) {
			console.error('Error en handleDeleteRuta', error)
		}
	}

	return (
		<div>
			<h1>Crear ruta</h1>
			<form
				onSubmit={handleCreateBus}
				className='flex flex-col gap-4 text-black'
			>
				<input
					value={origen}
					onChange={e => setOrigen(e.target.value)}
					type='text'
					placeholder='Ingrese origen'
				/>
				<input
					value={destino}
					onChange={e => setDestino(e.target.value)}
					type='text'
					placeholder='Ingrese destino'
				/>
				<input
					value={distancia}
					onChange={e => setDistancia(e.target.value)}
					type='text'
					placeholder='Ingrese distancia'
				/>
				<button type='submit' className='bg-blue-500'>
					Crear
				</button>
			</form>

			<table className=' flex justify-center  flex-col'>
				<thead>
					<tr>
						<th>Origen</th>
						<th>Destino</th>
						<th>Distancia</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{rutas?.map(ruta => {
						return (
							<tr key={ruta.ruta_id}>
								<td>{ruta.origen}</td>
								<td>{ruta.destino}</td>
								<td>{ruta.distancia_km} km</td>
								<td className='flex gap-3'>
									<button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
										<a href={`/auth/admin/ruta/${ruta.ruta_id}`}>Editar</a>
									</button>
									<button
										onClick={() => {
											handleDeleteRuta(ruta.ruta_id)
										}}
										className='bg-red-500'
									>
										Eliminar
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default RutaPage

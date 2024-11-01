'use client'
import { PasajesContext } from '@/context/PasajesContext'
import { redirect, useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function HorarioPageEdit() {
	const { id } = useParams<{ id: string }>()
	const { buses, rutas, totalBuses, totalRutas, updateHorario } =
		useContext(PasajesContext)

	const [horarioId, setHorarioId] = useState<number | null>(null)
	const [fecha, setFecha] = useState<string>('')
	const [horaSalida, setHoraSalida] = useState<string>('')
	const [horaLlegada, setHoraLlegada] = useState<string>('')
	const [precio, setPrecio] = useState<string>('')
	const [busId, setBusId] = useState<number>(0)
	const [rutaId, setRutaId] = useState<number>(0)
	const [redirectTo, setRedirectTo] = useState(false)

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3000/api/schedule/${id}`)
				.then(res => res.json())
				.then(data => {
					console.log(data)
					setHorarioId(data.horario_id)
					setFecha(data.fecha.split('T')[0]) // Extraer solo la fecha
					setHoraSalida(data.hora_salida.split('T')[1].substring(0, 5)) // Extraer solo la hora
					setHoraLlegada(data.hora_llegada.split('T')[1].substring(0, 5)) // Extraer solo la hora
					setPrecio(data.precio.toString())
					setBusId(data.bus.bus_id)
					setRutaId(data.ruta.ruta_id)
				})
				.catch(error => console.error('Error fetching schedule data:', error))
		}
	}, [id])

	useEffect(() => {
		totalBuses()
		totalRutas()
	}, [])

	const handleupdateHorario = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (!horarioId) {
				throw new Error('No hay horarioId')
			}

			await updateHorario(
				{
					fecha: new Date(fecha),
					hora_salida: new Date(`${fecha}T${horaSalida}`),
					hora_llegada: new Date(`${fecha}T${horaLlegada}`),
					precio: Number(precio),
					bus_id: busId,
					ruta_id: rutaId,
				},
				Number(horarioId)
			)
			setRedirectTo(true)

			console.log('Horario editado')
		} catch (error) {
			console.log('Error al crear un horario: ', error)
		}
	}

	if (redirectTo) {
		redirect('/auth/admin/horario')
	}

	return (
		<div>
			HorarioPageEdit
			<div className='flex flex-col'>
				<h1 className='text-xl font-bold mb-4'>Crear Horario de Salida</h1>
				<form
					onSubmit={handleupdateHorario}
					className='flex flex-col gap-4 text-black'
				>
					<div className='flex gap-4'>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-white'>Fecha</label>
							<input
								value={fecha}
								onChange={e => setFecha(e.target.value)}
								type='date'
								className='border border-gray-300 p-2 rounded'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-white'>Hora Salida</label>
							<input
								value={horaSalida}
								onChange={e => setHoraSalida(e.target.value)}
								type='time'
								className='border border-gray-300 p-2 rounded'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-white'>
								Hora Llegada
							</label>
							<input
								value={horaLlegada}
								onChange={e => setHoraLlegada(e.target.value)}
								type='time'
								className='border border-gray-300 p-2 rounded'
							/>
						</div>
						<div>
							<label className='mb-2 font-medium text-white'>Precio</label>
							<input
								value={precio}
								onChange={e => setPrecio(e.target.value)}
								type='text'
								className='border border-gray-300 p-2 rounded'
							/>
						</div>
					</div>
					<div className='flex gap-4'>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-white'>Bus</label>
							<select
								value={busId}
								onChange={e => setBusId(Number(e.target.value))}
								className='border border-gray-300 p-2 rounded'
							>
								<option value='0'>Selecion Bus</option>
								{buses?.map(bus => (
									<option key={bus.bus_id} value={bus.bus_id}>
										{bus.modelo} - {bus.placa}
									</option>
								))}
								{/* <option value='1'>Bus 1</option>
								<option value='2'>Bus 2</option>
								<option value='3'>Bus 3</option> */}
							</select>
						</div>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-white'>Ruta</label>
							<select
								value={rutaId}
								onChange={e => setRutaId(Number(e.target.value))}
								className='border border-gray-300 p-2 rounded'
							>
								<option value='0'>Selecione un ruta</option>
								{rutas.map(ruta => (
									<option key={ruta.ruta_id} value={ruta.ruta_id}>
										{ruta.origen} - {ruta.destino}
									</option>
								))}
								{/* <option value='1'>Ruta 1</option>
								<option value='2'>Ruta 2</option>
								<option value='3'>Ruta 3</option> */}
							</select>
						</div>
					</div>
					<div className='flex mb-5'>
						<button
							type='submit'
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						>
							✍️editar
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default HorarioPageEdit

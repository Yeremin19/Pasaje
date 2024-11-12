"use client";
import { PasajesContext } from '@/context/PasajesContext';
import { redirect, useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

function HorarioPageEdit() {
	const { id } = useParams<{ id: string }>();
	const { buses, rutas, totalBuses, totalRutas, updateHorario } =
		useContext(PasajesContext);

	const [horarioId, setHorarioId] = useState<number | null>(null);
	const [fecha, setFecha] = useState<string>('');
	const [horaSalida, setHoraSalida] = useState<string>('');
	const [horaLlegada, setHoraLlegada] = useState<string>('');
	const [precio, setPrecio] = useState<string>('');
	const [busId, setBusId] = useState<number>(0);
	const [rutaId, setRutaId] = useState<number>(0);
	const [redirectTo, setRedirectTo] = useState(false);

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3000/api/schedule/${id}`)
				.then(res => res.json())
				.then(data => {
					console.log(data);
					setHorarioId(data.horario_id);
					setFecha(data.fecha.split('T')[0]);
					setHoraSalida(data.hora_salida.split('T')[1].substring(0, 5));
					setHoraLlegada(data.hora_llegada.split('T')[1].substring(0, 5));
					setPrecio(data.precio.toString());
					setBusId(data.bus.bus_id);
					setRutaId(data.ruta.ruta_id);
				})
				.catch(error => console.error('Error fetching schedule data:', error));
		}
	}, [id]);

	useEffect(() => {
		totalBuses();
		totalRutas();
	}, []);

	const handleupdateHorario = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (!horarioId) {
				throw new Error('No hay horarioId');
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
			);
			setRedirectTo(true);

			console.log('Horario editado');
		} catch (error) {
			console.log('Error al crear un horario: ', error);
		}
	};

	if (redirectTo) {
		return redirect('/auth/admin/horario');
	}

	return (
		<div className='p-0'>
			<div className="bg-cyan-800 text-white w-full p-4 shadow-md fixed top-0 left-0 z-10">
				<h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
			</div>
			<div className='flex justify-center mt-24'>
				<div className='w-full max-w-md'>
					<h1 className='text-2xl font-bold mb-4 text-center'>Editar Horario de Salida</h1>
					<form
						onSubmit={handleupdateHorario}
						className='flex flex-col gap-4 bg-white p-6 rounded shadow-md'
					>
						<div>
							<label className='block font-medium mb-2'>Fecha</label>
							<input
								value={fecha}
								onChange={e => setFecha(e.target.value)}
								type='date'
								className='border border-gray-300 p-2 rounded w-full'
							/>
						</div>
						<div>
							<label className='block font-medium mb-2'>Hora Salida</label>
							<input
								value={horaSalida}
								onChange={e => setHoraSalida(e.target.value)}
								type='time'
								className='border border-gray-300 p-2 rounded w-full'
							/>
						</div>
						<div>
							<label className='block font-medium mb-2'>Hora Llegada</label>
							<input
								value={horaLlegada}
								onChange={e => setHoraLlegada(e.target.value)}
								type='time'
								className='border border-gray-300 p-2 rounded w-full'
							/>
						</div>
						<div>
							<label className='block font-medium mb-2'>Precio</label>
							<input
								value={precio}
								onChange={e => setPrecio(e.target.value)}
								type='text'
								className='border border-gray-300 p-2 rounded w-full'
							/>
						</div>
						<div className='flex gap-4'>
							<div className='flex flex-col'>
								<label className='mb-2 font-medium text-black'>Bus</label>
								<select
									value={busId}
									onChange={e => setBusId(Number(e.target.value))}
									className='border border-gray-300 p-2 rounded'
								>
									<option value='0'>Seleccionar Bus</option>
									{buses?.map(bus => (
										<option key={bus.bus_id} value={bus.bus_id}>
											{bus.modelo} - {bus.placa}
										</option>
									))}
								</select>
							</div>
							<div className='flex flex-col'>
								<label className='mb-2 font-medium text-black'>Ruta</label>
								<select
									value={rutaId}
									onChange={e => setRutaId(Number(e.target.value))}
									className='border border-gray-300 p-2 rounded'
								>
									<option value='0'>Seleccionar Ruta</option>
									{rutas.map(ruta => (
										<option key={ruta.ruta_id} value={ruta.ruta_id}>
											{ruta.origen} - {ruta.destino}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='flex mb-5'>
							<button
								type='submit'
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								✍️ Editar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default HorarioPageEdit;

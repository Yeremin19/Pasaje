"use client";
import React, { useContext, useEffect, useState } from 'react';
import { PasajesContext } from '@/context/PasajesContext';
import Time from '@/components/tiempo';

function HorarioPage() {
	const {
		totalHorarios,
		horarios,
		buses,
		totalBuses,
		rutas,
		totalRutas,
		createHorario,
		deleteHorario,
	} = useContext(PasajesContext);

	const [fecha, setFecha] = useState('');
	const [horaSalida, setHoraSalida] = useState('');
	const [horaLlegada, setHoraLlegada] = useState('');
	const [precio, setPrecio] = useState('');
	const [busId, setBusId] = useState(0);
	const [rutaId, setRutaId] = useState(0);
	const [isConfigOpen, setIsConfigOpen] = useState(false);

	useEffect(() => {
		totalHorarios();
		totalBuses();
		totalRutas();
	}, []);

	const handlecreateHorario = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const horario = await createHorario({
				fecha: new Date(fecha),
				hora_salida: new Date(`${fecha}T${horaSalida}`),
				hora_llegada: new Date(`${fecha}T${horaLlegada}`),
				// precio: Number(precio),
				bus_id: busId,
				ruta_id: rutaId,
			});
			setFecha('');
			setHoraSalida('');
			setHoraLlegada('');
			// setPrecio('');
			setBusId(0);
			setRutaId(0);
			totalHorarios();
			console.log('Horario creado: ', horario);
		} catch (error) {
			console.log('Error al crear un horario: ', error);
		}
	};

	const handledeleteHorario = async (id:number) => {
		try {
			await deleteHorario(id);
		} catch (error) {
			console.error('Error en handleDeleteBus', error);
		}
	};

	return (
		<div className='flex min-h-screen'>
            {/* Sidebar */}
			<aside className="w-64 bg-green-600 text-white flex flex-col p-5 h-screen">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 overflow-hidden">
                        <img
                            src="/Imagen1.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-lg font-bold">EL RAPIDO</h2>
                </div>
                <nav className="space-y-4">
                    <a href="/" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🏠</span>
                        <span>Dashboard</span>
                    </a>
                    <a href="/auth/admin/bus" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🚌</span>
                        <span>Buses</span>
                    </a>
                    <a href="/auth/admin/pasajes" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>🎫</span>
                        <span>Pasajes</span>
                    </a>
                    <a href="/auth/admin/ventas" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>💼</span>
                        <span>Ventas</span>
                    </a>
                    <a href="/auth/admin/reporte" className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded">
                        <span>📝</span>
                        <span>Reportes</span>
                    </a>
                    <div>
                        <div className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 p-2 rounded cursor-pointer" onClick={() => setIsConfigOpen(!isConfigOpen)}>
                            <span>⚙️</span>
                            <span>Configuraciónㅤㅤㅤ✛</span>
                        </div>
                        {isConfigOpen && (
                            <div className="ml-6 mt-2 space-y-2">
                                <a href="/auth/admin/informacion" className="block text-teal-300 hover:underline">Información de la Empresa</a>
                            </div>
                        )}
                    </div>
                </nav>
                <button className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded justify-center">
                    Cerrar sesión
                </button>
            </aside>

            <div className='flex-1'>
                {/* Encabezado flexible */}
                <div className="bg-cyan-800 text-white p-4 shadow-md sticky top-0 z-10 w-full">
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>
                <div className='p-4 container mx-auto'>
                    <h2 className='text-2xl font-bold mb-4'>Administración de Buses</h2>
                    <div className='flex space-x-4 mb-4'>
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>
                            <a href={`/auth/admin/bus/`}>Registro de Buses</a>
                        </button>                                             
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>
                            <a href={`/auth/admin/ruta/`}>Ruta de Buses</a>
                        </button>                                             
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>
                            <a href={`/auth/admin/horario/`}>Horario de Buses</a>
                        </button>
                    </div>
                    <h1 className='text-2xl font-bold mb-4'>Horario de Salida</h1>
				<form
					onSubmit={handlecreateHorario}
					className='flex flex-col gap-4 text-black'
				>
					<div className='flex gap-4'>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-black'>Fecha</label>
							<input
								value={fecha}
								onChange={e => setFecha(e.target.value)}
								type='date'
								className='border border-gray-300 p-2 rounded'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-black'>Hora Salida</label>
							<input
								value={horaSalida}
								onChange={e => setHoraSalida(e.target.value)}
								type='time'
								className='border border-gray-300 p-2 rounded'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-black'>
								Hora Llegada
							</label>
							<input
								value={horaLlegada}
								onChange={e => setHoraLlegada(e.target.value)}
								type='time'
								className='border border-gray-300 p-2 rounded'
							/>
						</div>

					</div>
					<div className='flex gap-4'>
						<div className='flex flex-col'>
							<label className='mb-2 font-medium text-black'>Bus</label>
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
							<label className='mb-2 font-medium text-black'>Ruta</label>
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
							🆕 Crear
						</button>
					</div>
				</form>
			</div>

			<div className='overflow-x-auto'>
				<h1 className='text-2xl font-bold mb-4'>Lista horario</h1>
				<table className='w-full bg-white border border-gray-200 text-black text-sm'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='py-2 px-4 border-b'>ID</th>
							<th className='py-2 px-4 border-b'>Fecha</th>
							<th className='py-2 px-4 border-b'>Hora Salida</th>
							<th className='py-2 px-4 border-b'>Hora Llegada</th>
							<th className='py-2 px-4 border-b'>ID Bus</th>
							<th className='py-2 px-4 border-b'>Modelo</th>
							<th className='py-2 px-4 border-b'>Placa</th>
							<th className='py-2 px-4 border-b'>Capacidad</th>
							<th className='py-2 px-4 border-b'>ID Ruta</th>
							<th className='py-2 px-4 border-b'>Origen</th>
							<th className='py-2 px-4 border-b'>Destino</th>
							<th className='py-2 px-4 border-b'>Distancia - KM</th>
							<th className='py-2 px-4 border-b'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{horarios.map(horario => (
							<tr key={horario.horario_id} className='hover:bg-gray-100'>
								<td className='py-2 px-4 border-b'>{horario.horario_id}</td>
								<td className='py-2 px-4 border-b'>
									{new Date(horario.fecha).toLocaleDateString()}
								</td>
								<td className='py-2 px-4 border-b'>
									<Time time={horario.hora_salida} />
								</td>
								<td className='py-2 px-4 border-b'>
									<Time time={horario.hora_llegada} />
								</td>
								<td className='py-2 px-4 border-b'>{horario.precio}</td>
								<td className='py-2 px-4 border-b'>{horario.bus_id}</td>
								<td className='py-2 px-4 border-b'>{horario.bus?.modelo}</td>
								<td className='py-2 px-4 border-b'>{horario.bus?.placa}</td>
								<td className='py-2 px-4 border-b'>{horario.bus?.capacidad}</td>
								<td className='py-2 px-4 border-b'>{horario.ruta?.ruta_id}</td>
								<td className='py-2 px-4 border-b'>{horario.ruta?.origen}</td>
								<td className='py-2 px-4 border-b'>{horario.ruta?.destino}</td>
								<td className='py-2 px-4 border-b'>
									{horario.ruta?.distancia_km}
								</td>
								<td className='py-0 px-4 border-b justify-between'>
									<button className='bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2'>
										<a href={`/auth/admin/horario/${horario.fecha}`}>✍️</a>
									</button>
									<button
										onClick={() => {
											handledeleteHorario(horario.horario_id)
										}}
										className='bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded'
									>
										X
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	)
}

export default HorarioPage

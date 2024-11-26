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
	const [busId, setBusId] = useState(0);
	const [rutaId, setRutaId] = useState(0);
	const [isConfigOpen, setIsConfigOpen] = useState(false);

	// Paginación
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const totalPages = Math.ceil(horarios.length / itemsPerPage);

	useEffect(() => {
		totalHorarios();
		totalBuses();
		totalRutas();
	}, []);

	const handlecreateHorario = async (e: any) => {
		e.preventDefault();
		try {
			const horario = await createHorario({
				fecha: new Date(fecha),
				hora_salida: new Date(`${fecha}T${horaSalida}`),
				hora_llegada: new Date(`${fecha}T${horaLlegada}`),
				bus_id: busId,
				ruta_id: rutaId,
			});
			setFecha('');
			setHoraSalida('');
			setHoraLlegada('');
			setBusId(0);
			setRutaId(0);
			totalHorarios();
			console.log('Horario creado: ', horario);
		} catch (error) {
			console.log('Error al crear un horario: ', error);
		}
	};

	const handledeleteHorario = async (id: any) => {
		try {
			await deleteHorario(id);
		} catch (error) {
			console.error('Error en handleDeleteBus', error);
		}
	};

	// Calcular los datos a mostrar en la página actual
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = horarios.slice(indexOfFirstItem, indexOfLastItem);

	// Funciones para manejar la paginación
	const nextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div className='flex min-h-screen'>
            {/* Sidebar */}
			<aside className="flex flex-col bg-gradient-to-b from-red-500 to-black w-52 p-4 shadow-lg text-white">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 overflow-hidden">
                        <img
                            src="/loguito.jpeg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-lg font-bold">EL RAPIDO</h2>
                </div>
                <nav className="space-y-4">
        <a href="/" className="flex items-center space-x-2  hover:bg-red-900 p-2 border-2 rounded">
          <span>🏠</span>
          <span>Dashboard</span>
        </a>
        <a href="/auth/admin/bus" className="flex items-center space-x-2 hover:bg-red-800 p-2 border-2  rounded">
          <span>🚌</span>
          <span>Buses</span>
        </a>
        <a href="/auth/admin/usuario" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>🎫</span>
          <span>Pasajes</span>
        </a>
        <a href="/auth/admin/ventas" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>💼</span>
          <span>Ventas</span>
        </a>
        <a href="/auth/admin/reporte" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>📝</span>
          <span>Reportes</span>
        </a>

        {/* Menú de Configuración */}
        <div>
          <div 
            className="flex items-center space-x-2  hover:bg-red-800 p-2  border-2 rounded cursor-pointer"
            onClick={() => setIsConfigOpen(!isConfigOpen)}  // Cambia el estado para abrir/cerrar el submenú
          >
            <span>⚙️</span>
            <span>Configuración✛</span>
          </div>
          {isConfigOpen && (  // Si el submenú está abierto, lo mostramos
            <div className="ml-6 mt-2 space-y-2">
              <a href="/auth/admin/informacion" className="block text-teal-300 hover:underline">
                Información de la Empresa
              </a>
            </div>
          )}
        </div>
      </nav>
				<button className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded text-center">
      <a href="/login" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 p-2 rounded">
          <span>ㅤCerrar Sesión</span>
        </a>
      </button>
            </aside>

            <div className='flex-1'>
                {/* Encabezado flexible */}
                <div className="bg-red-500 text-white p-4 shadow-md sticky top-0 z-10 w-full">
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
							<label className='mb-2 font-medium text-black'>Hora Llegada</label>
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
							<th className='py-2 px-4 border border-gray-300 text-left'>ID</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Fecha</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Hora Salida</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Hora Llegada</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>ID Bus</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Modelo</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Placa</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Capacidad</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>ID Ruta</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Origen</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Destino</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Distancia - KM</th>
							<th className='py-2 px-4 border border-gray-300 text-left'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.map(horario => (
							<tr key={horario.horario_id} className='hover:bg-gray-100'>
								<td className='py-2 px-4 border border-gray-300'>{horario.horario_id}</td>
								<td className='py-2 px-4 border border-gray-300'>
									{new Date(horario.fecha).toLocaleDateString()}
								</td>
								<td className='py-2 px-4 border border-gray-300'>
									<Time time={horario.hora_salida} />
								</td>
								<td className='py-2 px-4 border border-gray-300'>
									<Time time={horario.hora_llegada} />
								</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.bus_id}</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.bus?.modelo}</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.bus?.placa}</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.bus?.capacidad}</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.ruta?.ruta_id}</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.ruta?.origen}</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.ruta?.destino}</td>
								<td className='py-2 px-4 border border-gray-300'>{horario.ruta?.distancia_km}</td>
								<td className='py-2 px-4 border border-gray-300 flex space-x-2'>
									<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
										<a href={`/auth/admin/horario/${horario.fecha}`}>✍️</a>
									</button>
									<button
										onClick={() => handledeleteHorario(horario.horario_id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
									>
										X
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Paginación */}
				<div className='flex justify-between items-center mt-4'>
					<button
						onClick={prevPage}
						disabled={currentPage === 1}
						className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded disabled:opacity-50'
					>
						Anterior
					</button>
					<span>Página {currentPage} de {totalPages}</span>
					<button
						onClick={nextPage}
						disabled={currentPage === totalPages}
						className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded disabled:opacity-50'
					>
						Siguiente
					</button>
				</div>
			</div>
		</div>
	</div>

	)
}

export default HorarioPage;

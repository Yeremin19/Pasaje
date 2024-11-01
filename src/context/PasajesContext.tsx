'use client'

import {
	Bus,
	BusCreate,
	BusUpdate,
	Horario,
	HorarioCreate,
	HorarioUpdate,
	Ruta,
	RutaCreate,
	RutaUpdate,
	Usuario,
	UsuarioCreate,
	UsuarioUpdate,
} from '@/interface/typesfront'

import { createContext, useState } from 'react'

export const PasajesContext = createContext<{
	buses: Bus[]
	rutas: Ruta[]
	usuarios: Usuario[]
	horarios: Horario[]

	totalBuses: () => Promise<void>
	crearBuses: (bus: BusCreate) => Promise<void>
	updateBus: (bus: BusUpdate, id: string) => Promise<void>
	deleteBus: (id: string) => Promise<void>

	totalRutas: () => Promise<void>
	crearRutas: (ruta: RutaCreate) => Promise<void>
	updateRuta: (ruta: RutaUpdate, id: string) => Promise<void>
	deleteRuta: (id: number) => Promise<void>

	totalUsuarios: () => Promise<void>
	createUsuario: (usuario: UsuarioCreate) => Promise<void>
	updateUsuario: (usuario: UsuarioUpdate, id: string) => Promise<void>
	deleteUsuario: (id: number) => Promise<void>

	totalHorarios: () => Promise<void>
	createHorario: (horario: HorarioCreate) => Promise<void>
	updateHorario: (horario: HorarioUpdate, id: number) => Promise<void>
	deleteHorario: (id: number) => Promise<void>
}>({
	buses: [],
	rutas: [],
	usuarios: [],
	horarios: [],

	totalBuses: async () => {},
	crearBuses: async () => {},
	updateBus: async () => {},
	deleteBus: async () => {},

	totalRutas: async () => {},
	crearRutas: async () => {},
	updateRuta: async () => {},
	deleteRuta: async () => {},

	totalUsuarios: async () => {},
	createUsuario: async () => {},
	updateUsuario: async () => {},
	deleteUsuario: async () => {},
	totalHorarios: async () => {},
	createHorario: async () => {},
	updateHorario: async () => {},
	deleteHorario: async () => {},
})

export const PasajesProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [buses, setBuses] = useState<Bus[]>([])

	const [rutas, setRutas] = useState<Ruta[]>([])

	const [usuarios, setUsuarios] = useState<Usuario[]>([])

	const [horarios, setHorarios] = useState<Horario[]>([])

	async function totalBuses() {
		try {
			const response = await fetch('http://localhost:3000/api/bus')
			const data = await response.json()
			console.log(data)
			setBuses(data)
		} catch (error) {
			throw new Error('Error en la función totalBuses' + error)
		}
	}

	async function crearBuses(bus: BusCreate) {
		try {
			const response = await fetch('http://localhost:3000/api/bus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					placa: bus.placa,
					modelo: bus.modelo,
					capacidad: bus.capacidad,
				}),
			})

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')
			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setBuses([...buses, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error in crearBuses function:', error)
			throw new Error('Error en la función crearBuses: ' + error)
		}
	}

	async function updateBus(bus: BusUpdate, id: string) {
		try {
			const response = await fetch(`http://localhost:3000/api/bus/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					placa: bus.placa,
					modelo: bus.modelo,
					capacidad: bus.capacidad,
				}),
			})
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')

			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setBuses([...buses, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error en la función updateBus' + error)
			throw new Error('Error en la función updateBus' + error)
		}
	}
	async function deleteBus(id: string) {
		try {
			const response = await fetch(`http://localhost:3000/api/bus/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			return totalBuses()
		} catch (error) {
			console.error('Error en la función deleteBus' + error)
			throw new Error('Error en la función deleteBus' + error)
		}
	}

	async function totalRutas() {
		try {
			const response = await fetch('http://localhost:3000/api/ruta')
			const data = await response.json()
			console.log(data)
			setRutas(data)
		} catch (error) {
			throw new Error('Error en la función totalBuses' + error)
		}
	}

	async function crearRutas(ruta: RutaCreate) {
		try {
			const response = await fetch('http://localhost:3000/api/ruta', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					origen: ruta.origen,
					destino: ruta.destino,
					distancia_km: ruta.distancia_km,
				}),
			})

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')
			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setRutas([...rutas, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error in crearBuses function:', error)
			throw new Error('Error en la función crearBuses: ' + error)
		}
	}

	async function updateRuta(ruta: RutaUpdate, id: string) {
		try {
			const response = await fetch(`http://localhost:3000/api/ruta/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					origen: ruta.origen,
					destino: ruta.destino,
					distancia_km: ruta.distancia_km,
				}),
			})
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')

			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setRutas([...rutas, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error en la función updateRuta' + error)
			throw new Error('Error en la función updateRuta' + error)
		}
	}

	async function deleteRuta(id: number) {
		try {
			const response = await fetch(`http://localhost:3000/api/ruta/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			return totalRutas()
		} catch (error) {
			console.error('Error en la función deleteRuta' + error)
			throw new Error('Error en la función deleteRuta' + error)
		}
	}

	async function totalUsuarios() {
		try {
			const response = await fetch('http://localhost:3000/api/user')
			const data = await response.json()
			console.log(data)
			setUsuarios(data)
		} catch (error) {
			throw new Error('Error en la función totalUsuarios' + error)
		}
	}

	async function createUsuario(usuario: UsuarioCreate) {
		try {
			const response = await fetch('http://localhost:3000/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					dni: usuario.dni,
					name: usuario.name,
					apellido: usuario.apellido,
					correo: usuario.correo,
					password: usuario.password,
					telefono: usuario.telefono,
				}),
			})

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')
			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setUsuarios([...usuarios, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error in createUsuario function:', error)
			throw new Error('Error en la función createUsuario: ' + error)
		}
	}

	async function updateUsuario(usuario: UsuarioUpdate, id: string) {
		try {
			const response = await fetch(`http://localhost:3000/api/user/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: usuario.name,
					apellido: usuario.apellido,
					correo: usuario.correo,
					password: usuario.password,
					dni: usuario.dni,
					telefono: usuario.telefono,
					rol: usuario.rol,
				}),
			})
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')

			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setUsuarios([...usuarios, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error en la función updateUsuario' + error)
			throw new Error('Error en la función updateUsuario' + error)
		}
	}

	async function deleteUsuario(id: number) {
		try {
			const response = await fetch(`http://localhost:3000/api/user/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			return totalUsuarios()
		} catch (error) {
			console.error('Error en la función deleteUsuario' + error)
			throw new Error('Error en la función deleteUsuario' + error)
		}
	}

	async function totalHorarios() {
		try {
			const response = await fetch('http://localhost:3000/api/schedule')
			const data = await response.json()
			console.log(data)
			setHorarios(data)
		} catch (error) {
			throw new Error('Error en la función totalHorarios' + error)
		}
	}

	async function createHorario(horario: HorarioCreate) {
		try {
			const response = await fetch('http://localhost:3000/api/schedule', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fecha: horario.fecha,
					hora_salida: horario.hora_salida,
					hora_llegada: horario.hora_llegada,
					precio: horario.precio,
					ruta_id: horario.ruta_id,
					bus_id: horario.bus_id,
				}),
			})

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')
			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setHorarios([...horarios, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error in createHorario function:', error)
			throw new Error('Error en la función createHorario: ' + error)
		}
	}

	async function updateHorario(horario: HorarioUpdate, id: number) {
		try {
			const response = await fetch(`http://localhost:3000/api/schedule/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fecha: horario.fecha,
					hora_salida: horario.hora_salida,
					hora_llegada: horario.hora_llegada,
					precio: horario.precio,
					ruta_id: horario.ruta_id,
					bus_id: horario.bus_id,
				}),
			})
			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}

			const contentType = response.headers.get('content-type')

			if (contentType && contentType.includes('application/json')) {
				const data = await response.json()
				console.log('Data received:', data)
				setHorarios([...horarios, data])
			} else {
				const text = await response.text()
				console.error('Unexpected response format:', text)
				throw new Error('Response is not JSON: ' + text)
			}
		} catch (error) {
			console.error('Error en la función updateHorario' + error)
			throw new Error('Error en la función updateHorario' + error)
		}
	}

	async function deleteHorario(id: number) {
		try {
			const response = await fetch(`http://localhost:3000/api/schedule/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error(`Server responded with status: ${response.status}`)
			}
			return totalHorarios()
		} catch (error) {
			console.error('Error en la funcion deleteHorario ' + error)
			throw new Error('Error en la funcion delete Horario' + error)
		}
	}

	return (
		<PasajesContext.Provider
			value={{
				buses,
				rutas,
				usuarios,
				horarios,
				totalBuses,
				crearBuses,
				updateBus,
				deleteBus,
				totalRutas,
				crearRutas,
				updateRuta,
				deleteRuta,
				totalUsuarios,
				createUsuario,
				updateUsuario,
				deleteUsuario,
				totalHorarios,
				createHorario,
				updateHorario,
				deleteHorario,
			}}
		>
			{children}
		</PasajesContext.Provider>
	)
}
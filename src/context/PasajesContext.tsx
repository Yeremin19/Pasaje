'use client'

import {
	Bus,
	BusCreate,
	BusUpdate,
	Ruta,
	RutaCreate,
	RutaUpdate,
} from '@/interface/typesfront'
import { createContext, useState } from 'react'

export const PasajesContext = createContext<{
	buses: Bus[]
	rutas: Ruta[]

	totalBuses: () => Promise<void>
	crearBuses: (bus: BusCreate) => Promise<void>
	updateBus: (bus: BusUpdate, id: string) => Promise<void>
	deleteBus: (id: string) => Promise<void>

	totalRutas: () => Promise<void>
	crearRutas: (ruta: RutaCreate) => Promise<void>
	updateRuta: (ruta: RutaUpdate, id: string) => Promise<void>
	deleteRuta: (id: number) => Promise<void>
}>({
	buses: [],
	rutas: [],

	totalBuses: async () => {},
	crearBuses: async () => {},
	updateBus: async () => {},
	deleteBus: async () => {},

	totalRutas: async () => {},
	crearRutas: async () => {},
	updateRuta: async () => {},
	deleteRuta: async () => {},
})

export const PasajesProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [buses, setBuses] = useState<Bus[]>([])

	const [rutas, setRutas] = useState<Ruta[]>([])

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

	return (
		<PasajesContext.Provider
			value={{
				buses,
				rutas,
				totalBuses,
				crearBuses,
				updateBus,
				deleteBus,
				totalRutas,
				crearRutas,
				updateRuta,
				deleteRuta,
			}}
		>
			{children}
		</PasajesContext.Provider>
	)
}

export interface Bus {
	bus_id: number
	placa: string
	modelo?: string
	capacidad: number
}

export interface BusCreate {
	placa: string
	modelo?: string
	capacidad: number
}

export interface BusUpdate {
	placa: string
	modelo?: string
	capacidad: number
}

export interface Ruta {
	ruta_id: number
	origen: string
	destino: string
	distancia_km: number
}

export interface RutaCreate {
	origen: string
	destino: string
	distancia_km: number
}

export interface RutaUpdate {
	origen: string
	destino: string
	distancia_km: number
}

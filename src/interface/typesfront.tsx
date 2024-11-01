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

export interface Usuario {
	usuario_id: number
	dni: string
	nombre: string
	apellido: string
	correo: string
	password: string
	rol: Rol
	telefono: string
}

export interface UsuarioCreate {
	dni: string
	name: string
	apellido: string
	correo: string
	password: string
	telefono: string
}

export interface UsuarioUpdate {
	name: string
	apellido: string
	correo: string
	password: string
	dni: string
	telefono: string
	rol: Rol
}

export interface Horario {
	horario_id: number
	fecha: Date
	hora_salida: Date
	hora_llegada: Date
	precio: number
	ruta_id: number // ID de la Ruta relacionada
	bus_id: number // ID del Bus relacionado
	bus: Bus
	ruta: Ruta
}

export interface HorarioCreate {
	fecha: Date
	hora_salida: Date
	hora_llegada: Date
	precio: number
	ruta_id: number
	bus_id: number
}

export interface HorarioUpdate {
	fecha: Date
	hora_salida: Date
	hora_llegada: Date
	precio: number
	ruta_id: number
	bus_id: number
}

export enum Rol {
	ADMIN = 'admin',
	CLIENTE = 'cliente',
}

export interface Usuario {
	name: string
	apellido: string
	correo: string
	password: string
	dni: string
	telefono: string
}

export interface UsuarioUpdate {
	id: number
	name: string
	apellido: string
	correo: string
	password: string
	dni: string
	telefono: string
	rol: Rol
}

export interface Reserva {
	estado: EstadoReserva
	fecha_reserva: Date
	
	usuario_id: number
	horario_id: number
	asiento_id: number
}

export interface Bus {
	placa: string
	modelo?: string
	capacidad: number
}

export interface Ruta {
	origen: string
	destino: string
	distancia_km?: number
}

export interface Horario {
	fecha: Date
	hora_salida: Date
	hora_llegada: Date
	precio: number
	ruta_id: number // ID de la Ruta relacionada
	bus_id: number // ID del Bus relacionado
}

export interface Asiento {
	numero_asiento: string
	tipo: TipoAsiento
	bus_id: number // ID del Bus relacionado
}

export enum Rol {
	ADMIN = 'admin',
	USER = 'cliente',
}

export enum EstadoReserva {
	PENDIENTE = 'pendiente',
	PAGADO = 'pagado',
	CANCELADO = 'cancelado',
}

export enum TipoAsiento {
	VENTANA = 'ventana',
	PASILLO = 'pasillo',
}

import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { Horario } from '@/interface/types'

export async function GET() {
	try {
		const horarios = await prisma.horario.findMany({
			include: {
				bus: true,
				ruta: true,
			},
		})
		if (!horarios) {
			throw new Error('No hay horarios')
		}
		return NextResponse.json(horarios)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

export async function POST(req: Request) {
	try {
		const {
			fecha,
			hora_salida,
			hora_llegada,
			precio,
			ruta_id,
			bus_id,
		}: Horario = await req.json()

		if (
			!fecha ||
			!hora_salida ||
			!hora_llegada ||
			!precio ||
			!ruta_id ||
			!bus_id
		) {
			throw new Error('Missing required fields')
		}

		const horario = await prisma.horario.create({
			data: {
				fecha: fecha,
				hora_salida: hora_salida,
				hora_llegada: hora_llegada,
				precio: precio,
				ruta_id: ruta_id,
				bus_id: bus_id,
			},
		})

		return NextResponse.json(horario)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

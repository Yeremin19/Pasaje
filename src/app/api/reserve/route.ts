import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { Reserva } from '@/interface/types'
export async function GET() {
	try {
		const reservas = await prisma.reserva.findMany({
			include: {
				usuario: true,
				horario: true,
				asiento: true,
			},
		})
		if (!reservas) {
			throw new Error('No hay reservas')
		}
		console.log(reservas)
		return NextResponse.json(reservas)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

export async function POST(req: Request) {
	try {
		const {
			estado,
			fecha_reserva,
			
			usuario_id,
			horario_id,
			asiento_id,
		}: Reserva = await req.json()
		if (
			!estado ||
			!fecha_reserva ||
			
			!usuario_id ||
			!horario_id ||
			!asiento_id
		) {
			throw new Error('Missing required fields')
		}
		const reserva = await prisma.reserva.create({
			data: {
				estado: estado,
				fecha_reserva: fecha_reserva,
				usuario_id: usuario_id,
				horario_id: horario_id,
				asiento_id: asiento_id,
			},
		})
		console.log(reserva)

		return NextResponse.json(reserva)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

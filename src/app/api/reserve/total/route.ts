import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const reservas = await prisma.reserva.findMany({
			include: {
				usuario: true,
				horario: true,
				asiento: true,
			},
			orderBy: {
				reserva_id: 'desc',
			},
			take: 1,
		})

		if (reservas.length === 0) {
			throw new Error('No hay reservas')
		}

		return NextResponse.json(reservas)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}
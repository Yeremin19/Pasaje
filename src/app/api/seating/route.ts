import { Asiento } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const asientos = await prisma.asiento.findMany(
			{
				include: {
					bus: true,
				},
			},
		)
		if (!asientos) {
			throw new Error('No hay asientos')
		}
		return NextResponse.json(asientos)
	} catch (error) {
		console.error(error)
		NextResponse.error()
	}
}

export async function POST(req: Request) {
	try {
		const { numero_asiento, tipo, bus_id }: Asiento = await req.json()

		if (!numero_asiento || !tipo || !bus_id) {
			throw new Error('Missing required fields')
		}

		const asiento = await prisma.asiento.create({
			data: {
				numero_asiento: numero_asiento,
				tipo: tipo,
				bus_id: bus_id,
			},
		})

		return NextResponse.json(asiento)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

import { Ruta } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const buses = await prisma.ruta.findMany()
		if (!buses) {
			throw new Error('No hay buses')
		}
		return NextResponse.json(buses)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

export async function POST(req: Request) {
	try {
		const { destino, origen, distancia_km }: Ruta = await req.json()

		if (!destino || !origen || !distancia_km) {
			throw new Error('Missing required fields')
		}

		const bus = await prisma.ruta.create({
			data: {
				destino: destino,
				origen: origen,
				distancia_km: distancia_km,
			},
		})

		return NextResponse.json(bus)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

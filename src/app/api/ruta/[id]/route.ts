import { Ruta } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string[] }>

//http://localhost:3000/api/ruta/1 -> id = 1  ruta_id
export async function GET(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const findBuses = await prisma.ruta.findFirst({
			where: {
				ruta_id: Number(id),
			},
		})
		if (!findBuses) {
			throw new Error('No existe la ruta')
		}
		return NextResponse.json(findBuses)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

// http://localhost:3000/api/ruta/1 -> id = 1  ruta_id
export async function PUT(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const { destino, origen, distancia_km }: Ruta = await req.json()

		if (!destino || !origen || !distancia_km) {
			throw new Error('Faltan campos requeridos')
		}

		const updateRuta = await prisma.ruta.update({
			where: { ruta_id: Number(id) },
			data: {
				destino: destino,
				origen: origen,
				distancia_km: distancia_km,
			},
		})

		return NextResponse.json(updateRuta)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

// http://localhost:3000/api/ruta/1 -> id = 1  ruta_id
export async function DELETE(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const deleteRuta = await prisma.ruta.delete({
			where: { ruta_id: Number(id) },
		})
		return NextResponse.json(deleteRuta)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

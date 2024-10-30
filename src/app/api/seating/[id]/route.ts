import { Asiento } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string[] }>

export async function GET(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const asiento = await prisma.asiento.findFirst({
			where: {
				numero_asiento: id.toString(),
			},
		})

		if (!asiento) {
			return NextResponse.json({ error: 'Asiento no encontrado' })
		}

		return NextResponse.json(asiento)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

export async function PUT(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const { numero_asiento, tipo }: Asiento = await req.json()

		if (!numero_asiento || !tipo) {
			return NextResponse.json({ error: 'Faltan campos requeridos' })
		}

		const updateAsiento = await prisma.asiento.update({
			where: { asiento_id: Number(id) },
			data: {
				numero_asiento: numero_asiento,
				tipo: tipo,
			},
		})

		return NextResponse.json(updateAsiento)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

export async function DELETE(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const deleteAsiento = await prisma.asiento.delete({
			where: { asiento_id: Number(id) },
		})

		return NextResponse.json(deleteAsiento)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

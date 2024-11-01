import { Bus } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string[] }>

export async function GET(request: Request, { params }: { params: Params }) {
	try {
		// Obtiene el valor de `id` de la promesa
		const { id } = await params

		// Realiza la consulta utilizando el campo `placa` con el valor de `id`
		const findBus = await prisma.bus.findFirst({
			where: { bus_id: Number(id) },
		})

		if (!findBus) {
			return NextResponse.json({ error: 'Bus no encontrado' }, { status: 404 })
		}

		return NextResponse.json(findBus)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

export async function PUT(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const { placa, capacidad, modelo }: Bus = await request.json()

		if (!placa || !capacidad || !modelo) {
			return NextResponse.json(
				{ error: 'Faltan campos requeridos' },
				{ status: 400 }
			)
		}

		const updateBus = await prisma.bus.update({
			where: { bus_id: Number(id) },
			data: {
				placa,
				capacidad,
				modelo,
			},
		})
		console.log(updateBus)

		return NextResponse.json(updateBus)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

export async function DELETE(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params

		const deleteBus = await prisma.bus.delete({
			where: { placa: id.toString() },
		})

		return NextResponse.json(deleteBus)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		)
	}
}

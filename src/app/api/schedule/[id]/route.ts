import { Horario } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string[] }>
// http://localhost:3000/api/schedule/2023-10-01T00:00:00.000Z -> id = 2023-10-01T00:00:00.000Z fecha
export async function GET(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params

		const finHorarios = await prisma.horario.findFirst({
			where: {
				fecha: new Date(id.toString()),
			},
		})
		if (!finHorarios) {
			throw new Error('No hay horarios')
		}
		return NextResponse.json(finHorarios)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}
//http://localhost:3000/api/schedule/1 -> id = 1  horario_id
export async function PUT(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const { fecha, hora_salida, hora_llegada, precio }: Horario =
			await req.json()

		if (!fecha || !hora_salida || !hora_llegada || !precio) {
			throw new Error('Missing required fields')
		}

		const updatedHorario = await prisma.horario.update({
			where: { horario_id: Number(id) },
			data: {
				fecha: fecha,
				hora_salida: hora_salida,
				hora_llegada: hora_llegada,
				precio: precio,
			},
		})

		return NextResponse.json(updatedHorario)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

//http://localhost:3000/api/schedule/1 -> id = 1  horario_id

export async function DELETE(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const deletedHorario = await prisma.horario.delete({
			where: { horario_id: Number(id) },
		})

		return NextResponse.json(deletedHorario)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

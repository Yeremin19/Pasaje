import { Reserva } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string[] }>

// http://localhost:3000/api/reserve/1 -> id = 1  reserva_id
export async function GET(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const findReserve = await prisma.reserva.findFirst({
			where: {
				reserva_id: Number(id),
			},
			include: {
				usuario: true,
				horario: true,
				asiento: true,
			},
		})

		if (!findReserve) {
			return NextResponse.json({ error: 'Reserva no encontrada' })
		}
		return NextResponse.json(findReserve)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

// http://localhost:3000/api/reserve/1 -> id = 1  reserva_id
export async function PUT(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const {
			estado,
			fecha_reserva,
			monto_total,
			usuario_id,
			horario_id,
			asiento_id,
		}: Reserva = await req.json()

		if (
			!estado ||
			!fecha_reserva ||
			!monto_total ||
			!usuario_id ||
			!horario_id ||
			!asiento_id
		) {
			throw new Error('Faltan campos requeridos')
		}

		const updateReserve = await prisma.reserva.update({
			where: { reserva_id: Number(id) },
			data: {
				estado: estado,
				fecha_reserva: fecha_reserva,
				monto_total: monto_total,
				usuario_id: usuario_id,
				horario_id: horario_id,
				asiento_id: asiento_id,
			},
			include: {
				usuario: true,
				horario: true,
				asiento: true,
			},
		})

		return NextResponse.json(updateReserve)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

// http://localhost:3000/api/reserve/1 -> id = 1  reserva_id

export async function DELETE(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params
		const deleteReserve = await prisma.reserva.delete({
			where: { reserva_id: Number(id) },
		})

		return NextResponse.json(deleteReserve)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

import { Bus } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const buses = await prisma.bus.findMany()
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
		const { placa, modelo, capacidad }: Bus = await req.json()

		if (!placa || !capacidad || !modelo) {
			throw new Error('Missing required fields')
		}

		const bus = await prisma.bus.create({
			data: {
				placa: placa,
				modelo: modelo,
				capacidad: capacidad,
			},
		})

		return NextResponse.json(bus)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

import { Usuario } from '@/interface/types'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const usuarios = await prisma.usuario.findMany({
			include: {
				reservas: true,
			},
		})
		return NextResponse.json(usuarios)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

export async function POST(req: Request) {
	try {
		const { name, apellido, correo, password, dni, telefono }: Usuario =
			await req.json()

		if (!name || !apellido || !correo || !password || !dni || !telefono) {
			throw new Error('Missing required fields')
		}

		const newUsuario = await prisma.usuario.create({
			data: {
				nombre: name,
				apellido: apellido,
				correo: correo,
				password: password,
				dni: dni,
				telefono: telefono,
			},
		})

		return NextResponse.json(newUsuario)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

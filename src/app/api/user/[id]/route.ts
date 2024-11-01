import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { UsuarioUpdate } from '@/interface/types'

type Params = Promise<{ id: string[] }>

export async function GET(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params

		if (!id) {
			throw new Error('Missing parameters')
		}

		const findUsuario = await prisma.usuario.findFirst({
			where: { dni: id.toString() },
			include: {
				reservas: true,
			},
		})

		if (!findUsuario) {
			throw new Error('Usuario no encontrado')
		}

		return NextResponse.json(findUsuario)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

export async function PUT(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params

		const {
			name,
			apellido,
			correo,
			password,
			dni,
			telefono,
			rol,
		}: UsuarioUpdate = await req.json()

		if (
			!name ||
			!apellido ||
			!correo ||
			!password ||
			!dni ||
			!telefono ||
			!rol
		) {
			throw new Error('Missing required fields')
		}

		const updatedUsuario = await prisma.usuario.update({
			where: { dni: id.toString() },
			data: {
				nombre: name,
				apellido: apellido,
				correo: correo,
				password: password,
				dni: dni,
				telefono: telefono,
				rol: rol,
			},
		})

		if (!updatedUsuario) {
			throw new Error('Usuario encontrado o no se pudo actualizar')
		}

		return NextResponse.json(updatedUsuario)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

export async function DELETE(req: Request, { params }: { params: Params }) {
	try {
		const { id } = await params

		const deletedUsuario = await prisma.usuario.delete({
			where: { usuario_id: Number(id) },
		})

		if (!deletedUsuario) {
			throw new Error('Usuario no encontrado o no se pudo eliminar')
		}

		return NextResponse.json(deletedUsuario)
	} catch (error) {
		console.error(error)
		return NextResponse.error()
	}
}

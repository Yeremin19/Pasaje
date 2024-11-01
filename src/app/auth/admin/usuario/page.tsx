'use client'
import { PasajesContext } from '@/context/PasajesContext'
import React, { useContext, useEffect, useState } from 'react'

function UsuarioPage() {
	const { totalUsuarios, usuarios, createUsuario, deleteUsuario } =
		useContext(PasajesContext)

	const [dni, setDni] = useState<string>('')
	const [nombre, setNombre] = useState<string>('')
	const [apellido, setApellido] = useState<string>('')
	const [correo, setCorreo] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [telefono, setTelefono] = useState<string>('')

	useEffect(() => {
		totalUsuarios()
	}, [])

	const handleCreateUsuario = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const usuario = await createUsuario({
				dni,
				name: nombre,
				apellido,
				correo,
				password,
				telefono,
			})
			console.log(usuario)

			setNombre('')
			setApellido('')
			setCorreo('')
			setPassword('')
			setDni('')
			setTelefono('')
		} catch (error) {
			console.error('Error en handleCreateBus', error)
		}
	}

	const handleDeleteUsuario = async (id: number) => {
		try {
			await deleteUsuario(id)
		} catch (error) {
			console.error('Error en handleDeleteBus', error)
		}
	}

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-4'>Usuarios</h1>

			<div>
				<form onSubmit={handleCreateUsuario}>
					<div className='flex flex-col gap-2 text-black'>
						<input
							value={dni}
							onChange={e => setDni(e.target.value)}
							type='text'
							placeholder='ingrese dni'
						/>
						<input
							value={nombre}
							onChange={e => setNombre(e.target.value)}
							type='text'
							placeholder='ingrese nombre'
						/>
						<input
							value={apellido}
							onChange={e => setApellido(e.target.value)}
							type='text'
							placeholder='ingrese apellido'
						/>
						<input
							value={correo}
							onChange={e => setCorreo(e.target.value)}
							type='text'
							placeholder='ingrese correo'
						/>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							type='text'
							placeholder='ingrese password'
						/>
						<input
							value={telefono}
							onChange={e => setTelefono(e.target.value)}
							type='text'
							placeholder='ingrese telefono'
						/>
						<button className='bg-blue-500 text-white px-2 py-1 rounded mb-8'>
							Crear
						</button>
					</div>
				</form>
			</div>
			<div className='flex flex-col'>
				<table className=' bg-white border border-gray-200 text-black'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='py-2 px-4 border-b'>DNI</th>
							<th className='py-2 px-4 border-b'>Nombre</th>
							<th className='py-2 px-4 border-b'>Apellidos</th>
							<th className='py-2 px-4 border-b'>Correo</th>
							<th className='py-2 px-4 border-b'>Password</th>
							<th className='py-2 px-4 border-b'>Rol</th>
							<th className='py-2 px-4 border-b'>Telefono</th>
							<th className='py-2 px-4 border-b'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{usuarios.map(usuario => (
							<tr key={usuario.usuario_id} className='hover:bg-gray-100'>
								<td className='py-2 px-4 border-b'>{usuario.dni}</td>
								<td className='py-2 px-4 border-b'>{usuario.nombre}</td>
								<td className='py-2 px-4 border-b'>{usuario.apellido}</td>
								<td className='py-2 px-4 border-b'>{usuario.correo}</td>
								<td className='py-2 px-4 border-b'>{usuario.password}</td>
								<td className='py-2 px-4 border-b'>{usuario.rol}</td>
								<td className='py-2 px-4 border-b'>{usuario.telefono}</td>
								<td className='py-2 px-4 border-b'>
									<button className='bg-blue-500 text-white px-2 py-1 rounded mr-2'>
										<a href={`/auth/admin/usuario/${usuario.dni}`}>Editar</a>
									</button>
									<button
										onClick={() => {
											handleDeleteUsuario(usuario.usuario_id)
										}}
										className='bg-red-500 text-white px-2 py-1 rounded'
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UsuarioPage

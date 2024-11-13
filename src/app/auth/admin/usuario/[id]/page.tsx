'use client'
import { PasajesContext } from '@/context/PasajesContext'
import { Rol } from '@/interface/typesfront'
import { useParams, redirect } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

function UsuarioEditPage() {
	const { id } = useParams<{ id: string }>()
	const [dni, setDni] = React.useState<string>('')
	const [name, setName] = React.useState<string>('')
	const [apellido, setApellido] = React.useState<string>('')
	const [correo, setCorreo] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [telefono, setTelefono] = React.useState<string>('')
	const [rol, setRol] = React.useState<Rol>(Rol.CLIENTE) 
	const [redirectTo, setRedirectTo] = React.useState(false)

	const { updateUsuario } = useContext(PasajesContext)

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3000/api/user/${id}`)
				.then(res => res.json())
				.then(data => {
					setDni(data.dni)
					setName(data.nombre)
					setApellido(data.apellido)
					setCorreo(data.correo)
					setPassword(data.password)
					setTelefono(data.telefono)
					setRol(data.rol)
					console.log(data)
				})
				.catch(error => console.error('Error fetching user data:', error))
		}
	}, [id])

	const handleEditUsuario = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await updateUsuario(
				{
					dni,
					name,
					apellido,
					correo,
					password,
					telefono,
					rol,
				},
				id
			)

			setRedirectTo(true)
		} catch (error) {
			console.error('Error en handleEditUsuario', error)
		}
	}

	if (redirectTo) {
		redirect('/auth/admin/usuario')
	}
	return (
		<div>
			<h1>Editar usario</h1>
			<div>
				<form onSubmit={handleEditUsuario}>
					<div className='flex flex-col gap-2 text-black w-1/2 '>
						<input
							value={dni}
							onChange={e => setDni(e.target.value)}
							type='text'
							placeholder='ingrese dni'
						/>
						<input
							value={name}
							onChange={e => setName(e.target.value)}
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
						<select
							name='Seleciona rol'
							value={rol}
							onChange={e => setRol(e.target.value as Rol)}
						>
							<option value={Rol.CLIENTE}>Cliente</option>
							<option value={Rol.ADMIN}>Adminstrador</option>
						</select>
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
		</div>
	)
}

export default UsuarioEditPage

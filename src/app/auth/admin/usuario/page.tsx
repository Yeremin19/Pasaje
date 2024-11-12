"use client";
import { PasajesContext } from '@/context/PasajesContext';
import React, { useContext, useEffect, useState } from 'react';

function UsuarioPage() {
	const { totalUsuarios, usuarios, createUsuario, deleteUsuario } = useContext(PasajesContext);

	const [dni, setDni] = useState<string>('');
	const [nombre, setNombre] = useState<string>('');
	const [apellido, setApellido] = useState<string>('');
	const [correo, setCorreo] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [telefono, setTelefono] = useState<string>('');

	useEffect(() => {
		totalUsuarios();
	}, []);

	const handleCreateUsuario = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createUsuario({ dni, name: nombre, apellido, correo, password, telefono });
			setNombre('');
			setApellido('');
			setCorreo('');
			setPassword('');
			setDni('');
			setTelefono('');
		} catch (error) {
			console.error('Error en handleCreateUsuario', error);
		}
	};

	const handleDeleteUsuario = async (id: number) => {
		try {
			await deleteUsuario(id);
		} catch (error) {
			console.error('Error en handleDeleteUsuario', error);
		}
	};

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6 text-center">Gestión de Usuarios</h1>

			{/* Formulario en un cuadro */}
			<div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-lg mx-auto border border-gray-300">
				<h2 className="text-2xl font-semibold mb-4 text-center">Crear Usuario</h2>
				<form onSubmit={handleCreateUsuario}>
					<div className="flex flex-col gap-4">
						<input
							value={dni}
							onChange={(e) => setDni(e.target.value)}
							type="text"
							placeholder="Ingrese DNI"
							className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							type="text"
							placeholder="Ingrese Nombre"
							className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							value={apellido}
							onChange={(e) => setApellido(e.target.value)}
							type="text"
							placeholder="Ingrese Apellido"
							className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							value={correo}
							onChange={(e) => setCorreo(e.target.value)}
							type="text"
							placeholder="Ingrese Correo"
							className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Ingrese Password"
							className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							value={telefono}
							onChange={(e) => setTelefono(e.target.value)}
							type="text"
							placeholder="Ingrese Teléfono"
							className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
							Crear Usuario
						</button>
					</div>
				</form>
			</div>

			{/* Contenedor de la tabla de usuarios */}
			<div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-5xl border border-gray-300">
				<h2 className="text-2xl font-semibold mb-6 text-center">Lista de Usuarios</h2>
				{/* Contenedor con scroll */}
				<div className="overflow-y-auto max-h-80">
					<table className="w-full bg-white text-left border border-gray-200 rounded-lg text-gray-700 text-lg">
						<thead>
							<tr className="bg-gray-100 border-b border-gray-300">
								<th className="py-4 px-6">DNI</th>
								<th className="py-4 px-6">Nombre</th>
								<th className="py-4 px-6">Apellidos</th>
								<th className="py-4 px-6">Correo</th>
								<th className="py-4 px-6">Password</th>
								<th className="py-4 px-6">Rol</th>
								<th className="py-4 px-6">Teléfono</th>
								<th className="py-4 px-6">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{usuarios.map((usuario) => (
								<tr key={usuario.usuario_id} className="border-b border-gray-300 hover:bg-gray-50">
									<td className="py-4 px-6">{usuario.dni}</td>
									<td className="py-4 px-6">{usuario.nombre}</td>
									<td className="py-4 px-6">{usuario.apellido}</td>
									<td className="py-4 px-6">{usuario.correo}</td>
									<td className="py-4 px-6">{usuario.password}</td>
									<td className="py-4 px-6">{usuario.rol}</td>
									<td className="py-4 px-6">{usuario.telefono}</td>
									<td className="py-4 px-6 flex gap-2">
										<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
											<a href={`/auth/admin/usuario/${usuario.dni}`}>Editar</a>
										</button>
										<button
											onClick={() => handleDeleteUsuario(usuario.usuario_id)}
											className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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
		</div>
	);
}

export default UsuarioPage;

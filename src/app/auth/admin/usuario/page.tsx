"use client";
import { PasajesContext } from '@/context/PasajesContext';
import React, { useContext, useEffect, useState } from 'react';

function App() {
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="flex flex-col bg-gradient-to-b from-red-500 to-black w-52 p-4 shadow-lg text-white">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 overflow-hidden">
                        <img
                            src="/loguito.jpeg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-lg font-bold">EL RAPIDO</h2>
                </div>
                <nav className="space-y-4">
        <a href="/" className="flex items-center space-x-2  hover:bg-red-900 p-2 border-2 rounded">
          <span>🏠</span>
          <span>Dashboard</span>
        </a>
        <a href="/auth/admin/bus" className="flex items-center space-x-2 hover:bg-red-800 p-2 border-2  rounded">
          <span>🚌</span>
          <span>Buses</span>
        </a>
        <a href="/auth/admin/usuario" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>🎫</span>
          <span>Pasajes</span>
        </a>
        <a href="/auth/admin/ventas" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>💼</span>
          <span>Ventas</span>
        </a>
        <a href="/auth/admin/reporte" className="flex items-center space-x-2  hover:bg-red-800 p-2 border-2  rounded">
          <span>📝</span>
          <span>Reportes</span>
        </a>

        {/* Menú de Configuración */}
        <div>
          <div 
            className="flex items-center space-x-2  hover:bg-red-800 p-2  border-2 rounded cursor-pointer"
            onClick={() => setIsConfigOpen(!isConfigOpen)}  // Cambia el estado para abrir/cerrar el submenú
          >
            <span>⚙️</span>
            <span>Configuración ✛</span>
          </div>
          {isConfigOpen && (  // Si el submenú está abierto, lo mostramos
            <div className="ml-6 mt-2 space-y-2">
              <a href="/auth/admin/informacion" className="block text-teal-300 hover:underline">
                Información de la Empresa
              </a>
            </div>
          )}
        </div>
      </nav>
				<button className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded text-center">
      <a href="/login" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 p-2 rounded">
          <span>ㅤ Cerrar Sesión</span>
        </a>
      </button>
            </aside>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-4">
                {/* Header */}
                <div className="bg-red-500 text-white p-4 shadow-md fixed top-0 z-50 w-full" style={{ margin: 0, right: '-208px' }}>
                    <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
                </div>

                <div className="mt-16">
                    {/* Main Text Content */}
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold mb-4">Huaraz - La Union (Huanuco)</h1>
                    </div>
                    
                    {/* Botones Usuario, Asiento y Reserva en el lado izquierdo */}
                    <div className="flex space-x-2 mb-8">
                        <a href="/auth/admin/usuario" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                            Clientes
                        </a>
                        <a href="/auth/admin/asiento" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                            Asiento
                        </a>
                        <a href="/auth/admin/reserva" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                            Pasaje
                        </a>
                    </div>

                    {/* UsuarioPage component */}
                    <UsuarioPage />
                </div>
            </div>
        </div>
    );
}

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
			await createUsuario({ dni, name: nombre, apellido, correo:"exmple.com"
				, password:"12345678", telefono });
				
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

			{/* Formulario en un cuadro */}
			<div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-lg mx-auto border border-gray-300">
				<h2 className="text-2xl font-semibold mb-4 text-center">Nuevo Cliente</h2>
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
						{/* <input
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
						/> */}
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

		</div>
	);
}

export default App;

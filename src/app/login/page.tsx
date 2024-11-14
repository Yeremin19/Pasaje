"use client"
import React, {useState} from 'react';
import Link from "next/link";


function Login() {



    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50"
            style={{
                backgroundImage: "url('/fondo.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white/80 p-8 rounded-lg shadow-lg w-96"> {/* Aquí se aplica la opacidad */}
                <div className="flex justify-center mb-4">
                    <img src="/loguito.jpeg" alt="Company Logo" className="w-20 h-20 rounded-full" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
                <form className="w-full" method={"GET"} action={"/"}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Correo</label>
                        <input
                            required={true}
                            onChange={(e) => setCorreo(e.target.value)}
                            value={correo}
                            type="email"
                            placeholder="Email ID"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Contraseña</label>
                        <input
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <input type={"submit"} placeholder={"Login"} className="mx-auto w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"/>
                </form>
            </div>
        </div>
    );
}

export default Login;

"use client";

import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'next/navigation';

function RutaEditPage() {
	const { id } = useParams<{ id: string }>();
	const [origen, setOrigen] = useState<string>('');
	const [destino, setDestino] = useState<string>('');
	const [distancia, setDistancia] = useState<string>('');

	const [redirectTo, setRedirectTo] = useState(false);

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3000/api/ruta/${id}`)
				.then(res => res.json())
				.then(data => {
					setOrigen(data.origen);
					setDestino(data.destino);
					setDistancia(data.distancia_km);
				})
				.catch(error => console.error('Error fetching ruta data:', error));
		}
	}, [id]);

	const handleUpdateRuta = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (!id) {
				throw new Error('Ruta ID is missing');
			}
			await fetch(`http://localhost:3000/api/ruta/${id}`, {
				method: 'PUT',
				body: JSON.stringify({
					origen,
					destino,
					distancia_km: Number(distancia),
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setRedirectTo(true);
			setOrigen('');
			setDestino('');
			setDistancia('');
		} catch (error) {
			console.error('Error en handleUpdateRuta', error);
		}
	};

	if (redirectTo) {
		return redirect('/auth/admin/ruta');
	}

	return (
		<div className='p-0'>
			<div className="bg-cyan-800 text-white w-full p-4 shadow-md fixed top-0 left-0 z-10">
                <h1 className="text-3xl font-bold">Sistema de Venta de Pasajes</h1>
            </div>
			<div className='flex justify-center mt-24'>
				<div className='w-full max-w-md'>
					<h1 className='text-2xl font-bold mb-4 text-center'>Editar Ruta</h1>
					<form
						onSubmit={handleUpdateRuta}
						className='flex flex-col gap-5 bg-white p-6 rounded shadow-md'
					>
						<div>
							<label className='block font-medium mb-2'>Origen</label>
							<input
								value={origen}
								onChange={e => setOrigen(e.target.value)}
								type='text'
								placeholder='Ingrese origen'
								className='border border-gray-300 p-2 rounded w-full'
							/>
						</div>
						<div>
							<label className='block font-medium mb-2'>Destino</label>
							<input
								value={destino}
								onChange={e => setDestino(e.target.value)}
								type='text'
								placeholder='Ingrese destino'
								className='border border-gray-300 p-2 rounded w-full'
							/>
						</div>
						<div>
							<label className='block font-medium mb-2'>Distancia (km)</label>
							<input
								value={distancia}
								onChange={e => setDistancia(e.target.value)}
								type='text'
								placeholder='Ingrese distancia'
								className='border border-gray-300 p-2 rounded w-full'
							/>
						</div>
						<button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
							Actualizar
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default RutaEditPage;

'use client'
import React, { useEffect, useState } from 'react'
import { redirect, useParams } from 'next/navigation'

function RutaEditPage() {
	const { id } = useParams<{ id: string }>()
	const [origen, setOrigen] = useState<string>('')
	const [destino, setDestino] = useState<string>('')
	const [distancia, setDistancia] = useState<string>('')

	const [redirectTo, setRedirectTo] = useState(false)

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3000/api/ruta/${id}`)
				.then(res => res.json())
				.then(data => {
					setOrigen(data.origen)
					setDestino(data.destino)
					setDistancia(data.distancia_km)
				})
				.catch(error => console.error('Error fetching ruta data:', error))
		}
	}, [id])

	const handleUpdateRuta = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (!id) {
				throw new Error('Ruta ID is missing')
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
			})
			setRedirectTo(true)
			setOrigen('')
			setDestino('')
			setDistancia('')
		} catch (error) {
			console.error('Error en handleUpdateRuta', error)
		}
	}

	if (redirectTo) {
		return redirect('/auth/admin/ruta')
	}
	return (
		<div>
			<h1>Editar ruta ruta</h1>
			<form
				onSubmit={handleUpdateRuta}
				className='flex flex-col gap-5 w-1/2 justify-center items-center text-black bg-slate-500'
			>
				<input
					value={origen}
					onChange={e => setOrigen(e.target.value)}
					type='text'
					placeholder='Ingrese origen'
				/>
				<input
					value={destino}
					onChange={e => setDestino(e.target.value)}
					type='text'
					placeholder='Ingrese destino'
				/>
				<input
					value={distancia}
					onChange={e => setDistancia(e.target.value)}
					type='text'
					placeholder='Ingrese distancia'
				/>
				<button type='submit' className='bg-blue-500'>
					Editar
				</button>
			</form>
		</div>
	)
}

export default RutaEditPage

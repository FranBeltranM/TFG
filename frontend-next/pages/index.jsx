import Head from 'next/head'
import { Header } from '../components/Header'

import moment from 'moment'
import { useState } from 'react'

export const getServerSideProps = async () => {
	const res = await fetch('https://api-tfg.franbeltran.es/fechaUltimaInsercion')
	const data = await res.json()

	return {
		props: { date: data.date },
	}
}

export default function Home({ date }) {
	const [datos, setDatos] = useState(null)
	const [transferencias, setTransferencias] = useState([])

	const submitBastidor = async event => {
		event.preventDefault()
		const bastidor = event.target.input_bastidor.value
		const URL = `/api/buscar?bastidor=${bastidor}`

		const data = await fetch(URL, {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'https://api-tfg.franbeltran.es/',
			}),
		})
		const result = await data.json()

		console.log(result)
		setDatos(result.vehicle)
		setTransferencias(result.transfers)
	}

	return (
		<>
			<Head>
				<title>🚗 CheckV.dev - Comprueba tu vehículo!</title>
			</Head>
			<Header date={moment(date).format('DD/MM/YYYY')} />

			<div
				id='container'
				className='mt-16 h-screen w-full'
			>
				<main className='flex h-full flex-col'>
					{!datos && (
						<div className='w-100 flex flex-col items-center justify-center rounded-lg py-4 px-8 text-black'>
							<h1 className='text-3xl font-bold'>
								¿Estás buscando cambiar de vehículo?
							</h1>
							<h1 className='text-3xl font-bold'>
								¿Quieres saber cuántas transferencias tiene tu vehículo?
							</h1>
						</div>
					)}
					{!datos && (
						<form
							className='flex w-full flex-col items-center justify-center'
							onSubmit={submitBastidor}
						>
							<input
								id='input_bastidor'
								className='my-8 h-16 w-96 rounded-lg border-4 text-center font-light shadow-lg shadow-gray-300'
								type='text'
								placeholder='Indique el bastidor del vehículo'
								required
							/>
							<button
								className='w-36 rounded-lg bg-violet-300 p-3 text-white'
								type='submit'
							>
								Consultar
							</button>
						</form>
					)}

					{datos && (
						<div className='flex flex-col items-center justify-center p-4'>
							{datos.brand}
							{datos.model}
						</div>
					)}

					{datos && (
						<section className='flex flex-col items-center justify-center p-4'>
							{transferencias.map((item, key) => (
								<p key={key}>
									{moment(item.startTransferDate).format('YYYY-MM-DD ')}
									{moment(item.writeTransferDate).format('YYYY-MM-DD ')}
									{moment(item.endTransferDate).format('YYYY-MM-DD')}
								</p>
							))}
						</section>
					)}
				</main>
			</div>
		</>
	)
}

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import Image from 'next/image'
import meme from '../public/homer-meme.gif'
import spinner from '../public/preloader.gif'

import moment from 'moment'

const getDataFromBastidor = async bastidor => {
  const regex = /[0-9]{4}[a-zA-Z]{3}/
  const isPlate = regex.test(bastidor)

  const URL = isPlate
    ? `/api/buscar?plate=${bastidor}`
    : `/api/buscar?bastidor=${bastidor}`

  const data = await fetch(URL, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  })
  const result = await data.json()

  return result
}

export default function Buscar({ query }) {
  const router = useRouter()
  const [datos, setDatos] = useState(null)
  const [estado, setEstado] = useState('loading')
  const [transferencias, setTransferencias] = useState([])

  useEffect(() => {
    const getAsset = async _ => {
      if (router.query.bastidor !== undefined) {
        try {
          const result = await getDataFromBastidor(router.query.bastidor)
          if (result.transfers.length > 0) {
            setDatos(result.vehicle)
            setTransferencias(result.transfers)
            setEstado('ok')
          } else {
            setEstado('no_results')
          }
        } catch (err) {
          setEstado('error')
        }
      }
    }

    getAsset()
  }, [router.query.bastidor])

  return (
    <>
      {estado === 'loading' && (
        <section className='flex flex-col items-center justify-center p-4'>
          <Image
            src={spinner}
            alt='Loading'
            width={spinner.width / 2}
            height={spinner.height / 2}
          />
          <h1 className='mt-8 mb-8 text-xl font-bold'>
            Obteniendo datos, espere...
          </h1>
        </section>
      )}
      {estado === 'error' && (
        <section className='flex flex-col items-center justify-center p-4'>
          <h1 className='mt-8 mb-8 text-xl font-bold'>
            Se ha producido un error, inténtelo de nuevo más tarde.
          </h1>
        </section>
      )}

      {estado === 'ok' && (
        <div className='flex flex-col items-center justify-center p-4'>
          <div>
            <h1 className='mb-8 text-3xl font-bold'>
              Datos Básicos del Vehículo
            </h1>
            <h1>
              {datos.brand} {datos.model}
            </h1>
            <h2>Combustible: {datos.fuel}</h2>
            <h2>Homologación: {datos.emissions}</h2>
            <h2>Bastidor: {datos.vin}</h2>
          </div>
        </div>
      )}

      {estado === 'ok' && (
        <section className='flex flex-col items-center justify-center p-4'>
          <div>
            <h1 className='mb-8 text-3xl font-bold'>
              Registro de Propietarios del Vehículo
            </h1>
            {transferencias.map((item, key) => (
              <ul
                className='my-8 rounded-lg bg-blue-50 p-4'
                key={key}
              >
                <li>
                  Fecha: {moment(item.writeTransferDate).format('YYYY/MM/DD')}
                </li>
                <li>Persona: {item.person}</li>
                <li>Tipo Servicio: {item.typeServiceVehicle}</li>
              </ul>
            ))}
          </div>
        </section>
      )}

      {estado === 'ok' && (
        <section className='flex flex-col items-center justify-center p-4'>
          <div>
            <h1 className='mb-8 text-3xl font-bold'>
              Registro de Movimientos del Vehículo
            </h1>
            <table className='m-auto rounded-lg bg-violet-100'>
              <thead className='table-auto border-collapse'>
                <tr>
                  <th className='p-4 font-bold'>Fecha</th>
                  <th className='p-4 font-bold'>Trámite</th>
                  <th className='p-4 font-bold'>Localidad</th>
                  <th className='p-4 font-bold'>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {transferencias.map((item, key) =>
                  key % 2 === 0 ? (
                    <tr
                      className='bg-violet-200'
                      key={key}
                    >
                      <td className='p-4'>
                        {moment(item.writeTransferDate).format('YYYY/MM/DD')}
                      </td>
                      <td className='p-4'>{item.typeTransfer}</td>
                      <td className='p-4'>{item.city}</td>
                      <td className='p-4 text-center'>n/d</td>
                    </tr>
                  ) : (
                    <tr
                      className='bg-violet-150'
                      key={key}
                    >
                      <td className='p-4'>
                        {moment(item.writeTransferDate).format('YYYY/MM/DD')}
                      </td>
                      <td className='p-4'>{item.typeTransfer}</td>
                      <td className='p-4'>{item.city}</td>
                      <td className='p-4 text-center'>n/d</td>
                    </tr>
                  )
                )}

                {/* {transferencias.map((item, key) => (
                      <tr key={key}>
                        <td className='p-4'>
                          {moment(item.writeTransferDate).format('YYYY/MM/DD')}
                        </td>
                        <td className='p-4'>{item.typeTransfer}</td>
                        <td className='p-4'>{item.city}</td>
                        <td className='p-4 text-center'>n/d</td>
                      </tr>
                    ))} */}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {estado === 'no_results' && (
        <section className='flex flex-col items-center justify-center p-4'>
          <h1 className='mt-8 mb-8 text-2xl font-bold'>
            No disponemos de datos del vehículo.
          </h1>
          <Image
            src={meme}
            alt='Homer Simpson'
            width={meme.width / 2}
            height={meme.height / 2}
          />
        </section>
      )}
    </>
  )
}

Buscar.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

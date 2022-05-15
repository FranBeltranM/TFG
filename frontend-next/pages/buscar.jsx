import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

import moment from 'moment'

const getDataFromBastidor = async bastidor => {
  const URL = `/api/buscar?bastidor=${bastidor}`

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
  const [transferencias, setTransferencias] = useState([])

  useEffect(() => {
    const getAsset = async _ => {
      if (router.query.bastidor !== undefined) {
        const result = await getDataFromBastidor(router.query.bastidor)

        setDatos(result.vehicle)
        setTransferencias(result.transfers)
      }
    }

    getAsset()
  }, [router.query.bastidor])

  return (
    <>
      {datos && (
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

      {datos && (
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

      {datos && (
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
                      <td className='p-4'>{item.City}</td>
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
                      <td className='p-4'>{item.City}</td>
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
                        <td className='p-4'>{item.City}</td>
                        <td className='p-4 text-center'>n/d</td>
                      </tr>
                    ))} */}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  )
}

Buscar.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

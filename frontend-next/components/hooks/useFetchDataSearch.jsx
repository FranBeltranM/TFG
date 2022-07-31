import { useState, useEffect } from 'react'

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

export default function useFecthDataSearch(vin) {
  const [datos, setDatos] = useState(null)
  const [estado, setEstado] = useState('loading')
  const [transferencias, setTransferencias] = useState([])

  useEffect(() => {
    const fetchData = async _ => {
      if (vin !== undefined) {
        try {
          const result = await getDataFromBastidor(vin)
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

    fetchData()
  }, [vin])

  return {
    datos,
    estado,
    transferencias,
  }
}

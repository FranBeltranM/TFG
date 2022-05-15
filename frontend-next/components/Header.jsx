import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import moment from 'moment'

const getLastInserctionDate = async () => {
  const res = await fetch('api/fechaUltimaInsercion')
  const data = await res.json()

  return data.date
}

export function Header() {
  const [fecha, setDate] = useState(null)

  useEffect(() => {
    const getAsset = async _ => {
      const result = await getLastInserctionDate()

      setDate(moment(result).format('DD/MM/YYYY'))
    }

    getAsset()
  }, [])

  return (
    <header className='grid grid-cols-2 items-center justify-items-center gap-2 p-8'>
      <Logo />
      <small>Proyecto de Fin de Grado - Francisco Jesús Beltrán Moreno ©</small>
      <small>Fecha de la BBDD: {fecha}</small>
    </header>
  )
}

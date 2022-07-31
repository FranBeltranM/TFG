import { useEffect, useState } from 'react'
import moment from 'moment'

const getLastInserctionDate = async () => {
  const res = await fetch('api/fechaUltimaInsercion')
  const data = await res.json()

  return data.date
}

export default function useDateLastInsert() {
  const [fecha, setDate] = useState(null)

  useEffect(() => {
    const fetchData = async _ => {
      const result = await getLastInserctionDate()

      setDate(moment(result).format('DD/MM/YYYY'))
    }

    fetchData()
  }, [])

  return fecha
}

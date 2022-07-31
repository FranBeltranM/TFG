import moment from 'moment'

export const ShowResults = ({ data, transfers }) => {
  console.log({
    data,
    transfers,
  })

  return (
    <>
      <div className='flex flex-col items-center justify-center p-4'>
        <div>
          <h1 className='mb-8 text-3xl font-bold'>
            Datos Básicos del Vehículo
          </h1>
          <h1 className='font-bold capitalize'>
            {data.brand.toLowerCase()}{' '}
            {data.model.toLowerCase().replace(',', '.')}
          </h1>
          <h2>Combustible: {data.fuel}</h2>
          <h2>Homologación: {data.emissions}</h2>
          <h3>Bastidor: {data.vin}</h3>
        </div>
      </div>

      <section className='flex flex-col items-center justify-center p-4'>
        <div>
          <h1 className='mb-8 text-3xl font-bold'>
            Registro de Propietarios del Vehículo
          </h1>
          {transfers.map((item, key) => (
            <ul
              className='my-8 rounded-lg bg-purple-100 p-4'
              key={key}
            >
              <li>
                Fecha: {moment(item.writeTransferDate).format('YYYY/MM/DD')}
              </li>
              <li>Persona: {item.person}</li>
              <li>Servicio: {item.typeServiceVehicle}</li>
            </ul>
          ))}
        </div>
      </section>

      <section className='flex flex-col items-center justify-center p-4'>
        <div>
          <h1 className='mb-8 text-3xl font-bold'>
            Registro de Movimientos del Vehículo
          </h1>
          <table className='m-auto rounded-lg bg-purple-100'>
            <thead className='table-auto border-collapse'>
              <tr>
                <th className='p-4 font-bold'>Fecha</th>
                <th className='p-4 font-bold'>Trámite</th>
                <th className='p-4 font-bold'>Localidad</th>
                <th className='p-4 font-bold'>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((item, key) =>
                key % 2 === 0 ? (
                  <tr
                    className='bg-purple-200'
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
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

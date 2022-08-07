import moment from 'moment'

export const CarOwnersRegister = ({ vehicleTransfers }) => {
  return (
    <>
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
              {vehicleTransfers.map((item, key) =>
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

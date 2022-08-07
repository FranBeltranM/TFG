import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons'
import { faHandHolding } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

export const CarOwners = ({ vehicleTransfers }) => {
  return (
    <>
      <section className='flex flex-col items-center justify-center p-4'>
        <div>
          <h1 className='mb-8 text-3xl font-bold'>
            Registro de Propietarios del Vehículo
          </h1>
          {vehicleTransfers &&
            vehicleTransfers.map((item, key) => (
              <ul
                className='my-8 rounded-lg bg-purple-100 p-4'
                key={key}
              >
                <li>
                  <FontAwesomeIcon icon={faCalendar} /> {''}
                  Fecha: {moment(item.writeTransferDate).format('YYYY/MM/DD')}
                </li>
                <li>
                  {' '}
                  <FontAwesomeIcon icon={faUser} /> {''}
                  Persona: {item.person}
                </li>
                <li>
                  <FontAwesomeIcon icon={faHandHolding} /> {''}
                  Servicio: {item.typeServiceVehicle}
                </li>
              </ul>
            ))}
        </div>
      </section>
    </>
  )
}

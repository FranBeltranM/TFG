import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-regular-svg-icons'
import {
  faCarSide,
  faEarthEurope,
  faGasPump,
} from '@fortawesome/free-solid-svg-icons'

export const CarDescription = ({ vehicleData }) => {
  const { brand, model, fuel, emissions, vin } = vehicleData
  return (
    <>
      <div className='flex flex-col items-center justify-center p-4'>
        <div>
          <h1 className='mb-8 text-3xl font-bold'>
            Datos Básicos del Vehículo
          </h1>
          <h1 className='font-bold capitalize'>
            <FontAwesomeIcon icon={faCarSide} /> {brand.toLowerCase()}{' '}
            {model.toLowerCase().replace(',', '.')}
          </h1>
          <h2>
            <FontAwesomeIcon icon={faGasPump} /> Combustible: {fuel}
          </h2>
          <h2>
            <FontAwesomeIcon icon={faEarthEurope} /> Homologación: {emissions}
          </h2>
          <h3>
            <FontAwesomeIcon icon={faRectangleList} /> Bastidor: {vin}
          </h3>
        </div>
      </div>
    </>
  )
}

import { CarDescription } from './CarDescription'
import { CarOwners } from './CarOwners'
import { CarOwnersRegister } from './CarOwnersRegister'

export const ShowResults = ({ data, transfers }) => {
  return (
    <>
      <CarDescription vehicleData={data} />
      <CarOwners vehicleTransfers={transfers} />
      <CarOwnersRegister vehicleTransfers={transfers} />
    </>
  )
}

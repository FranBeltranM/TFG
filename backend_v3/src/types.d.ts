// declaración de tipos
// export type plateType = 'Ordinario, ..., ...'

export interface Vehicle {
  id: string
  vin: string
  brand: string
  model: string
  plateType: string
  fuel: string
  engineSize: number
  fiscalHP: float
  emissions: string
}

export interface Transfer {
  startTransferDate: null | Date
  writeTransferDate: null | Date
  endTransferDate: null | Date
  typeTransfer: string
  zipCode: number
  person: string
  typeServiceVehicle: string
  city: string
}

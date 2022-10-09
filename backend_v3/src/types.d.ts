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

export interface TransferResult {
  id: string
  fecha_tramite: null | Date
  fecha_tramitacion: null | Date
  fecha_proceso: null | Date
  ind_precinto: null | number
  ind_embargo: null | number
  localidad_vehiculo: string
  provincia_mat: string
  provincia_veh: string
  tipo_tramite: string
  codigo_postal: number
  persona_fisica_juridica: string
  tipo_servicio: string
  municipio: string
  renting: string
  baja_definitiva: string
  ind_baja_temp: number
  ind_sustraccion: number
}

export interface Resource {
  key: string | number
  value: string | number
}

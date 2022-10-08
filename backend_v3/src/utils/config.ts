export const paramsEntryPoints: { [key: string]: any } = {
  '/search': () => {
    return {
      mandatory: ['vin', 'plate'],
      optional: [],
    }
  },
  '/transfers/id': () => {
    return {
      mandatory: ['id'],
      optional: [],
    }
  },
  '/resources/type': () => {
    return {
      mandatory: ['type'],
      optional: [],
    }
  },
}

export const resourceTypes: { [key: string]: any } = {
  keyService: () => 'CLAVE_TRAMITE',
  typePlate: () => 'COD_CLASE_MAT',
  origin: () => 'COD_PROCEDENCIA',
  engine: () => 'COD_PROPULSION',
  states: () => 'COD_PROVINCIA',
  typeService: () => 'COD_SERVICIO',
  type: () => 'COD_TIPO',
  deregistered: () => 'IND_BAJA_DEF',
  personType: () => 'PERSONA_FISICA_JURIDICA',
  service: () => 'SERVICIO',
}

export const availableResources = Object.keys(resourceTypes)

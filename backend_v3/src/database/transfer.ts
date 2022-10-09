import { Transfer, TransferResult } from '../types'
import { log } from '../utils/functions'
import { query } from './db'

const queryDictGet: { [key: string]: any } = {
  findByVehicleId: () => {
    return `select BIN_TO_UUID(t.id, 1) as id,
                    t.fecha_tramite,
                    t.fecha_tramitacion,
                    t.fecha_proceso,
                    td.ind_precinto,
                    td.ind_embargo,
                    td.localidad_vehiculo,
                    cod_prov_mat.descripcion as provincia_mat,
                    cod_prov_veh.descripcion as provincia_veh,
                    clave.descripcion as tipo_tramite,
                    td.codigo_postal,
                    persona.descripcion as persona_fisica_juridica,
                    servicio.descripcion as tipo_servicio,
                    td.municipio,
                    td.renting,
                    baja_def.descripcion as baja_definitiva,
                    td.ind_baja_temp,
                    td.ind_sustraccion
            from Transferencia t
            inner join TransferenciaDetalle td on t.id_detalle = td.id
            left join TablasEstaticas.CLAVE_TRAMITE clave on clave.clave_tramite = td.clave_tramite
            left join TablasEstaticas.COD_PROVINCIA cod_prov_mat on cod_prov_mat.cod_provincia_mat = td.cod_provincia_mat
            left join TablasEstaticas.COD_PROVINCIA cod_prov_veh on cod_prov_veh.cod_provincia_mat = td.cod_provincia_veh
            left join TablasEstaticas.SERVICIO servicio on servicio.servicio = td.servicio_itv
            left join TablasEstaticas.IND_BAJA_DEF baja_def on baja_def.ind_baja_def = td.ind_baja_def
            left join TablasEstaticas.PERSONA_FISICA_JURIDICA persona on persona.persona_fisica_juridica = td.persona_fisica_juridica
            where t.id_vehiculo = UUID_TO_BIN(?, 1)`
  },
}

const createTransferObject = (transferResult: TransferResult): Transfer => {
  return {
    startTransferDate: transferResult.fecha_tramite,
    writeTransferDate: transferResult.fecha_proceso,
    endTransferDate: transferResult.fecha_tramitacion,
    typeTransfer: transferResult.tipo_tramite,
    zipCode: transferResult.codigo_postal,
    person: transferResult.persona_fisica_juridica,
    typeServiceVehicle: transferResult.tipo_servicio,
    city: transferResult.municipio,
  }
}

export const findByVehicleId = async (idVehicle: string, debug = false): Promise<Transfer[]> => {
  try {
    const queryString = queryDictGet[`${findByVehicleId.name}`]()
    debug && log('DEBUG', { queryString })
    const transfersResults = (await query(queryString, [idVehicle])) as Array<any>

    if (transfersResults.length > 0) {
      const transfers: Transfer[] = transfersResults.map((transferResult: TransferResult) => {
        return createTransferObject(transferResult)
      })

      return transfers
    }

    return []
  } catch (err: any) {
    debug && log('ERROR', err.message)
    throw new Error(`transfer.controller.${findByVehicleId.name} -> ${err.message}`)
  }
}

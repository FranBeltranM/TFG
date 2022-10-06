import { Transfer } from '../types'
import { log } from '../utils/functions'
import { query } from './db.controller'

export const queryDictGet: { [key: string]: any } = {
  findByIdVehicle: () => {
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

export const findByIdVehicle = async (idVehicle: string, debug = false): Promise<Transfer[] | null> => {
  const queryString = queryDictGet[`${findByIdVehicle.name}`]()

  debug && log('DEBUG', { queryString })

  const transfersResults = (await query(queryString, [idVehicle])) as Array<any>

  if (transfersResults) {
    const transfers: Transfer[] = transfersResults.map((transferResult) => {
      const transfer: Transfer = {
        startTransferDate: transferResult.fecha_tramite,
        writeTransferDate: transferResult.fecha_proceso,
        endTransferDate: transferResult.fecha_tramitacion,
        typeTransfer: transferResult.tipo_tramite,
        zipCode: transferResult.codigo_postal,
        person: transferResult.persona_fisica_juridica,
        typeServiceVehicle: transferResult.tipo_servicio,
        city: transferResult.municipio,
      }

      return transfer
    })

    return transfers
  }

  return null
}

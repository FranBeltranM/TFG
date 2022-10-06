import { Vehicle } from '../types'
import { log } from '../utils/functions'
import { query } from './db.controller'

export const queryDictGet: { [key: string]: any } = {
  findByVin: () => {
    return `select BIN_TO_UUID(V.id, 1) as id,
                  bastidor_itv,
                  marca_itv,
                  modelo_itv,
                  (SELECT MIN(fecha_prim_matriculacion) FROM Vehiculo WHERE bastidor_itv = ?) AS fecha_prim_matriculacion,
                  fecha_matricula,
                  cod_mat.descripcion as clase_matricula,
                  cod_tipo.descripcion as tipo_vehiculo,
                  cod_prop.descripcion as fuel,
                  DT.cilindrada_itv,
                  DT.nivel_emisiones_euro_itv,
                  DT.potencia_itv
    from Vehiculo V
    inner join MarcaModelo MM on V.id_marca_modelo = MM.id
    inner join DatosTecnicos DT on V.id_datos_tecnicos = DT.id
    left join TablasEstaticas.COD_TIPO cod_tipo on cod_tipo.cod_tipo = DT.cod_tipo
    left join TablasEstaticas.COD_PROPULSION cod_prop on cod_prop.cod_propulsion = DT.cod_propulsion_itv
    left join TablasEstaticas.COD_CLASE_MAT cod_mat on cod_mat.codigo_clase_mat = V.cod_clase_mat
    where V.bastidor_itv = ?
    order by fecha_matricula desc
    limit 1`
  },
}

export const findByVin = async (vin: string, debug = false): Promise<Vehicle | null> => {
  const queryString = queryDictGet[`${findByVin.name}`]()
  debug && log('DEBUG', { queryString })

  const data = (await query(queryString, [vin, vin])) as any

  if (data) {
    const vehicle: Vehicle = {
      id: data[0].id,
      vin: data[0].bastidor_itv,
      brand: data[0].marca_itv,
      model: data[0].modelo_itv,
      plateType: data[0].clase_matricula,
      fuel: data[0].fuel,
      engineSize: data[0].cilindrada_itv,
      fiscalHP: data[0].potencia_itv,
      emissions: data[0].nivel_emisiones_euro_itv,
    }

    return vehicle
  }

  return null
}

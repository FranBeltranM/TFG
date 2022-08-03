export const formatDataVehicleFromVin = (data, debug) => {
  const { firstPlateDate, plateDate } = data.plateDates
  const obj = {
    vehicle: {},
    transfers: [],
  }

  data.forEach((value, key) => {
    if (debug) console.log({ value })

    if (key === 0) {
      obj.vehicle = {
        brand: value.marca_itv,
        model: value.modelo_itv,
        plateType: value.clase_matricula,
        vin: value.bastidor_itv,
        fuel: value.tipo_combustible,
        engineSize: value.cilindrada_itv,
        fiscalHP: value.potencia_itv,
        emissions: value.nivel_emisiones_euro_itv,
        firstProvince: value.provincia_mat,
        firstPlateDate,
        plateDate,
      }
    }

    obj.transfers.push({
      plateType: value.cod_clase_mat,
      startTransferDate: value.fecha_tramite,
      writeTransferDate: value.fecha_proceso,
      endTransferDate: value.fecha_tramitacion,
      transferDetails: value.detalles_uuid,
      province: value.cod_provincia_veh,
      typeTransfer: value.tipo_tramite,
      zipCode: value.codigo_postal,
      person: value.persona_fisica_juridica,
      typeServiceVehicle: value.tipo_servicio,
      city: value.municipio,
    })
  })

  return obj
}

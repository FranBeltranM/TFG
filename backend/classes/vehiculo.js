export default class vehiculo {
    constructor(data) {
        // DOCUMENTACIÓN:
        // https://sedeapl.dgt.gob.es/IEST_INTER/pdfs/disenoRegistro/vehiculos/transferencias/TRANSFERENCIAS_MATRABA.pdf

        // RAW DATA
        this.data = data

        // 1) Fecha de matriculación del vehículo CHAR(8) DDMMYYYY
        this.fec_matricula = data.slice(0, 8)

        // 2) Código de clase de matrícula CHAR(1) ANEXO I
        this.cod_clase_mat = Number(data.slice(8, 9))

        // 3) Fecha de tramitación, que se corresponde con la fecha de transferencia
        // del vehículo contenida en los datos de transferencias CHAR(8) DDMMYYYY
        this.fec_tramitacion = data.slice(9, 17)

        // 4) Descripción de la marca del vehículo CHAR(30)
        this.marca_itv = data.slice(17, 47).trim()

        // 5) Modelo del vehículo char(22)
        this.modelo_itv = data.slice(47, 69).trim()

        // 6) Código de procedencia del vehículo CHAR(1) ANEXO I
        this.cod_procedencia_itv = Number(data.slice(69, 70))

        // 7) Número de bastidor CHAR(21)
        this.bastidor_itv = data.slice(70, 91).trim()

        // 8) Código del tipo de vehículo CHAR(2) ANEXO I
        this.cod_tipo = data.slice(91, 93)

        // 9) Código del tipo de propulsión CHAR(1) ANEXO I
        this.cod_propulsion_itv = data.slice(93, 94)

        // 10) Cilindrada del vehícuo CHAR(5) DECIMAL(5,0)
        this.cilindrada_itv = Number(data.slice(94, 99))

        // 11) Potencia fiscal del vehículo. En CVF.
        // Redondeado a la segunda cifra decimal. 3 enteros y 2 decimales EEEDD
        // CHAR(6) DECIMAL(5,2)
        this.potencia_itv = Number(data.slice(99, 105))

        // 12) Tara del vehículo (peso del vehículo).
        // La carga útil será el peso_max - tara CHAR(6) DECIMAL(7,0)
        this.tara = Number(data.slice(105, 111))

        // 13) Peso máximo del vehículo CHAR(6) DECIMAL(7,0)
        this.peso_max = Number(data.slice(111, 117))

        // 14) Número de plazas de un vehículo.
        // Para un vehículo de carga, este campo indicará el número de plazas
        // máximo permitido cuando el vehículo está descargado. CHAR(3) INTEGER
        this.num_plazas = Number(data.slice(117, 120))

        this.ind_precinto = data.slice(120, 122).trim()
        this.ind_embargo = data.slice(122, 124).trim()
        this.num_transmisiones = Number(data.slice(124, 126))
        this.num_titulares = Number(data.slice(126, 128))
        this.localidad_vehiclo = data.slice(128, 152).trim()
        this.cod_provincia_veh = data.slice(152, 154).trim()
        this.cod_provincia_mat = data.slice(154, 156).trim()
        this.clave_tramite = data.slice(156, 157)
        this.fec_tramite = data.slice(157, 165)
        this.codigo_postal = Number(data.slice(165, 170))
        this.fec_prim_matriculacion = data.slice(170, 178).trim() === '' ? null : data.slice(170, 178)
        this.ind_nuevo_usado = data.slice(178, 179)
        this.persona_fisica_juridica = data.slice(179, 180)
        this.codigo_itv = data.slice(180, 189).trim()
        this.servicio = data.slice(189, 192)
        this.cod_municipio_ine_veh = Number(data.slice(192, 197))
        this.municipio = data.slice(197, 227).trim()
        this.kw_itv = data.slice(227, 234) !== '*******' ? Number(data.slice(227, 234)) : null
        this.num_plazas_max = Number(data.slice(234, 237))
        this.co2_itv = Number(data.slice(237, 242))
        this.renting = data.slice(242, 243) === 'S' ? true : false
        this.cod_tutela = data.slice(243, 244) === ' ' ? '' : data.slice(243, 244)
        this.cod_posesion = data.slice(244, 245) === ' ' ? '' : data.slice(244, 245)
        this.ind_baja_def = data.slice(245, 246) === ' ' ? '' : data.slice(245, 246)
        this.ind_baja_temp = data.slice(246, 247) === ' ' ? '' : data.slice(246, 247)
        this.ind_sustraccion = data.slice(247, 248) === ' ' ? '' : data.slice(247, 248)
        this.baja_telematica = data.slice(248, 259).trim()
        this.tipo_itv = data.slice(259, 284).trim()
        this.variante_itv = data.slice(284, 309).trim()
        this.version_itv = data.slice(309, 344).trim()
        this.fabricante_itv = data.slice(344, 414).trim()
        this.masa_orden_marcha_itv = data.slice(414, 420).trim()
        this.masa_maxima_tecnica_admisible_itv = data.slice(420, 426).trim()
        this.categoria_homologacion_europea_itv = data.slice(426, 430).trim()
        this.carroceria = data.slice(430, 434).trim()
        this.plazas_pie = data.slice(434, 437).trim()
        this.nivel_emisiones_euro_itv = data.slice(437, 445).trim()
        this.consumo_wh_km_itv = data.slice(445,449).trim()
        this.clasificacion_reglamento_vehiculos_itv = data.slice(449, 453).trim()
        this.categoria_vehiculo_electrico = data.slice(453, 457).trim()
        this.autonomia_vehiculo_electrico = data.slice(457, 463).trim()
        this.marca_vehiculo_base = data.slice(463,493).trim()
        this.fabricante_vehiculo_base = data.slice(493, 543).trim()
        this.tipo_vehiculo_base = data.slice(543, 578).trim()
        this.variante_vehiculo_base = data.slice(578, 603).trim()
        this.version_vehiculo_base = data.slice(603, 638).trim()
        this.distancia_ejes_12 = Number(data.slice(638, 642))
        this.via_anterior_itv = Number(data.slice(642, 646))
        this.via_posterior_itv = Number(data.slice(646, 650))
        this.tipo_alimentacion_itv = data.slice(650, 651)
        this.contrasena_homologacion_itv = data.slice(651, 676).trim()
        this.eco_innovacion_itv = data.slice(676,677).trim()
        this.reduccion_eco_itv = data.slice(677,681).trim()
        this.codigo_eco_itv = data.slice(681, 706).trim()
        this.fec_proceso = data.slice(706, 714)
    }
}
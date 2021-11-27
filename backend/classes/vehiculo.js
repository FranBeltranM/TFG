export default class vehiculo {
    constructor(data) {
        this.fec_matricula = data.slice(0,8)
        this.cod_clase_mat = data.slice(8,9)
        this.fec_tramitacion = data.slice(9,17)
        this.marca_itv = data.slice(17,47).trim()
        this.modelo_itv = data.slice(47,69).trim()
        this.cod_procedencia_itv = data.slice(69,70)
        this.bastidor_itv = data.slice(70,91).trim()
        this.cod_tipo = data.slice(91,93)
    }
}
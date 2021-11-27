import express from 'express'
import dotenv from 'dotenv'
import vehiculo from './classes/vehiculo.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.listen(PORT || 3000, () => console.log(`[SERVER-LOG] Server listen on PORT => ${PORT || 3000}`))

app.get('/', (req, res) => {
    // res.json({ 'Prueba': 'Hola' })
    loadData().then(data => {
        // console.log(data.split('\n')[20])
        // res.send(data.split('\n').slice(0,100))
        let a = new vehiculo(data.split('\n')[0])
        
        res.json(a)
    })

})

import { promises as fs } from 'fs'

// let arr = []
// let a

async function loadData() {
    const data = await fs.readFile('../DGT-files/export_mensual_trf_202110.txt', 'latin1')
    return data;
}




// fs.readFileSync('../DGT-files/export_mensual_trf_202110.txt', 'utf8', (err, data) => {
//     if( err ) {
//         console.error(err)
//         return
//     }

//     arr.push(data)

//     a = data
// })

// console.log(a)


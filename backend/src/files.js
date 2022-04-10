import fs from 'fs'

fs.readFile('../../DGT-files', 'cp1252', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(data)
})

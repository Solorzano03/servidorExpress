const express = require('express')
const DataSource = require('./utils/datasource')
const app = express()
const port = 3000

app.get('/', (req, res )=>{
   res.send('hola mundo')
})

app.listen(port, ()=>{
    console.log(`Server on Port http:localhost:${port}`)
})
DataSource.AppDataSource.initialize().then(()=>console.log("base de datos conectada"))
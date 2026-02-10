import express from 'express'
import cors from 'cors'
import { PORT } from './config/envconfig.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

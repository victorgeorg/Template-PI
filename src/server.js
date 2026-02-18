import express from 'express'
import cors from 'cors'
import { PORT } from './config/envconfig.js'
import usuarioRoutes from "./routes/usuario-routes.js"
import { errorMiddleware } from './middlewares/errormiddleware.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(usuarioRoutes)
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

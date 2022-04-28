import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { customers, discounts, invoices } from './routes'
import { connection } from './config/connection'

const app = express()

// Middlewares
app.use(morgan('common'))   // log http
app.use(express.json())     // use POST body

// Rutas activas bajo prefijos
app.use('/customers', customers)
app.use('/discounts', discounts)
app.use('/invoices',  invoices)

// Ruta no encontrada
app.all('*', (req, res) => {
	res.status(404).json({
		message: 'Lo que andas buscando actualmente no esta disponible o fue eliminado'
	})
})


app.listen(process.env.APP_PORT, () => {
	console.log('> Servidor de express iniciado en el puerto:', process.env.APP_PORT)
})
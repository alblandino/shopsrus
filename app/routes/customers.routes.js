import { Router as router } from 'express'
import {
	getCustomersController,
	getCustomerByIDController,
	getCustomerByNameController,
	createCustomerController
} from '../controllers/customers.controller'

// Se crea un enrutador
const Router = router()

// Obtener todos los clientes registrados
Router.get('/', getCustomersController)

// Ruta para obtener los clientes por ID o nombre
Router.get('/:value', (req, res, next) => {
	// Obtenemos el parametro para validar el enrutamiento
	const { value } = req.params
	// Se valida el tipo de dato ingresado y se envia el Request correspondiente
	!isNaN(value) ? getCustomerByIDController(req, res, next) : getCustomerByNameController(req, res, next)
})

// Ruta para crear un cliente nuevo
Router.post('/', createCustomerController)

// Exportamos el enrutador
export default Router
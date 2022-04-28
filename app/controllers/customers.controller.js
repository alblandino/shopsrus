import {
	getAllCustomersModel,
	getCustomerByIDModel,
	getCustomerByNameModel,
	createCustomerModel
} from "../models/customers.model"

// Tipos de clientes
const CustomersTypes = ['empleado', 'afiliado', 'cliente']

// Controlador para obtener todos los clientes
export async function getCustomersController(req, res){
	let customers = await getAllCustomersModel()
	res.send(customers)
}

// Controlador para obtener los clientes por ID
export async function getCustomerByIDController(req, res){
	let status_code = 200
	let customer = await getCustomerByIDModel(req.params.value || 1)
	if(customer.length === 0){
		status_code = 404
		customer = {
			error: 'No se encontro el usuario indicado, intente con otro ID'
		}
	}
	res.status(status_code).send(customer)
}

// Controlador para obtener los clientes por nombre
export async function getCustomerByNameController(req, res){
	let status_code = 200
	let customer = await getCustomerByNameModel(req.params.value || '')
	if(customer.length === 0){
		status_code = 404
		customer = {
			error: 'No se encontro el usuario indicado, intente con otro nombre'
		}
	}
	res.send(customer)
}

// Controlador para crear un cliente
export function createCustomerController(req, res){
	const { fname, lname, address, email, phone, type } = req.body
	// Errores en memoria
	let errors = {}, _type = type || ''

	// Se hacen unas validaciones rapidas
	errors = (!fname)   ? {...errors, fname: 'Este campo es requerido'}     : {...errors}
	errors = (!lname)   ? {...errors, lname: 'Este campo es requerido'}     : {...errors}
	errors = (!address) ? {...errors, address: 'Este campo es requerido'}   : {...errors}
	errors = (!phone)   ? {...errors, phone: 'Este campo es requerido'}     : {...errors}
	errors = (!email)   ? {...errors, email: 'Este campo es requerido'}     : {...errors}
	errors = (!type)    ? {...errors, type: 'Este campo es requerido'}      : {...errors}

	// Se validan algunos datos
	if( !CustomersTypes.includes(_type.toLowerCase()) ){
		errors = {...errors, type: 'El tipo de cliente no es valido (Ej: Empleado, Afiliado, Cliente)'}
	}

	// Validamos que existan errores
	const have_errors = (Object.entries(errors).length > 0)

	if(!have_errors){
		createCustomerModel({ fname, lname, address, email, phone, type })
		.then(response => {
			res.send(response)
		})
		.catch(error => {
			res.status(500).send({ email: 'Este correo electronico ya se encuentra registrado' })
		})
	}else{
		// Se envian los errores
		res.status(400).send(errors)
	}
}

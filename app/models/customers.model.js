import { Customers } from "../entities"
import { Op } from "sequelize"

// Modelo para obtener todos los clientes
export function getAllCustomersModel(){
	const customers =  Customers.findAll({
		order: [['id', 'DESC']]
	})
	return customers.then((rows) => {
		return rows.map(r => r.dataValues)
	})
}

// Modelo para obtener el cliente por ID
export function getCustomerByIDModel(id){
	const customer = Customers.findOne({
		where: { id }
	})
	return customer
}

// Modelo para obtener clientes por nombre
// Nota: buscar un unico cliente por nombre no es una busqueda precisa debido a que
// en la base de datos se podrian registra 10 Juan Perez y siempre buscaria la primera
// coincidencia, por tal razon esta busqueda podria retornar varios registros
export function getCustomerByNameModel(name){
	const customers = Customers.findAll({
		where: {
			[Op.or]: [
				{
					fname: {
						[Op.like]: `%${name}%`
					}
				}, {
					lname: {
						[Op.like]: `%${name}%`
					}
				}
			]
		}
	})

	// Ejemplo: SELECT fields FROM customers WHERE fname LIKE '%Juan% OR lname LIKE '%Juan%'
	return customers.then((rows) => {
		return rows.map(r => r.dataValues)
	})
}

// Modelo para crear un cliente
export function createCustomerModel({fname, lname, address, email, phone, type}){
	let options = {fname, lname, address, email, phone, type}
	return Customers.create(options)
}
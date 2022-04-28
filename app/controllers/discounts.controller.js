import { createDiscountModel, getAllDiscountsModel, getDiscountModel } from "../models/discounts.model"

// Controlador para obtener todos los descuentos
export async function getAllDiscountsController(req, res, next){
	let discounts = await getAllDiscountsModel()
	res.send(discounts)
}

// Controlador para obtener los descuentos por tipo
export async function getDiscountByTypeController(req, res, next){
	let discount = await getDiscountModel({ type: req.params.value || '' })
	let status_code = 200
	if(discount.length === 0){
		status_code = 404
		discount = { error: 'No se encontro el descuento especificado, intentalo nuevamente. ' }
	}
	res.status(status_code).send(discount)
}

// Controlador para crear un descuento
export function createDiscountController(req, res, next){
	const { name, type, rate, is_percentage } = req.body

	// Errores en memoria
	let errors = {}, _type = type || ''

	// Se hacen unas validaciones rapidas
	errors = (!name)            ? {...errors, name: 'Este campo es requerido'}          : {...errors}
	errors = (!type)            ? {...errors, type: 'Este campo es requerido'}          : {...errors}
	errors = (!rate)            ? {...errors, rate: 'Este campo es requerido'}          : {...errors}
	errors = (!is_percentage)   ? {...errors, is_percentage: 'Este campo es requerido'} : {...errors}

	const have_errors = (Object.entries(errors).length > 0)

	// Si no hay errores, se crea el descuento
	if(!have_errors){
		createDiscountModel({ name, type, rate, is_percentage })
		.then(response => res.send(response))
		.catch(() => {
			res.status(500).send({ error: 'Ocurrio un error inesperado, intentelo nuevamente' })
		})
	}else{
		// Se envian los errores como response
		res.status(400).send(errors)
	}
}
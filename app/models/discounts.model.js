import { Discounts } from "../entities"

// Modelo para obtener todos los descuentos
export function getAllDiscountsModel(){
	const discounts =  Discounts.findAll({
		order: [['id', 'DESC']]
	})
	return discounts.then((rows) => {
		return rows.map(r => r.dataValues)
	})
}

// Modelo para obtener el descuento por tipo
export function getDiscountModel({ type }){
	const discount =  Discounts.findOne({
		where: { type }
	})
	return discount
}

// Modelo para crear un nuevo descuento
export function createDiscountModel({name, type, rate, is_percentage}){
	let options = {name, type, rate, is_percentage}
	return Discounts.create(options)
}
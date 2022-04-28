import { Router as router } from 'express'
import {
	createDiscountController,
	getAllDiscountsController,
	getDiscountByTypeController
} from '../controllers/discounts.controller'

const Router = router()

// Obtener todos los descuentos existentes
Router.get('/', getAllDiscountsController)

// Obtener un porcentaje por tipo
Router.get('/:value', getDiscountByTypeController)

// Crear un nuevo tipo de descuento
Router.post('/', createDiscountController)

// Exportamos el enrutador
export default Router
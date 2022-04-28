import { Router as router } from 'express'
import { getInvoiceController } from '../controllers/invoices.controller'
const Router = router()

// Obtenemos el importe total de una factura con sus respectivos descuentos
Router.get('/:value', getInvoiceController)

// Exportamos el enrutador
export default Router
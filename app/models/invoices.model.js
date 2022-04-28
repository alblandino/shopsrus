import { Invoices, Details } from "../entities"

// MetodoModelo para obtener el total de una factura
export function getInvoiceModel(number){
	let invoice = Invoices.findOne({
		where: { number }
	})
	return invoice
}

// Modelo para obtener todos los items de una factura
export async function getInvoiceDetailsModel(invoice_id){
	let details = await Details.findAll({
		where: { invoice_id }
	})
	return details
}
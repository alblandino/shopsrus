import { getCustomerByIDModel } from '../models/customers.model'
import { getAllDiscountsModel, getDiscountModel } from '../models/discounts.model'
import { getInvoiceModel, getInvoiceDetailsModel } from '../models/invoices.model'
/* 
@description: Metodo para obtener los datos de los clientes registrados en la BD
@param id:   Busqueda de cliente por ID
@param name: Busqueda de cliente por nombre
*/
export async function getInvoiceController(req, res, next){

	let total = 0;
	let number = req.params.value || 0;

	let invoice     = await getInvoiceModel(number); // Obtenemos los datos de la factura por su numero
	let customer    = await getCustomerByIDModel(invoice.customer_id) // Obtenemos el cliente por ID
	let discounts   = await getAllDiscountsModel(); // Listado de descuentos
	let details     = await getInvoiceDetailsModel(invoice.id); // Todos los items de la factura

	// Iteramos por cada descuento registrado
	for(let _discount of discounts){

		// Validamos el tipo de cliente y que sea tipo porcentaje
		if( _discount.type === customer.type && _discount.is_percentage ){
			let discountValue = (invoice.total * _discount.rate / 100);
			total = (invoice.total - discountValue) // Restamos el descuento
		}

		// Iteramos por cada item de factura
		for(let _detail of details){
			// Validamos que el precio sea mayor de 100 y hacemos el descuento
			if(_detail.derived_cost >= 100 && !_discount.is_percentage){
				total -= _discount.rate;
			}
		}
	}

	// Obtenemos la fecha de creacion
	const created = new Date(customer.created_at);
	// Tomamos la fecha actual
	const current = new Date();
	// Obtenemos el valor absoluto de la resta de fechas
	const diffence = Math.abs(current - created);
	// Redondeamos hacia arriba con la diferencia
	const days = Math.ceil(diffence / (1000 * 60 * 60 * 24));

	// Validamos que el cliente tenga mas de 2 años para darle un 5%
	if(days > 730) total -= (total * 0.05)

	// Enviamos con los descuentos aplicados
	res.send({ total });
}
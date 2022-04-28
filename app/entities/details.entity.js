const { Sequelize, DataTypes } = require('sequelize')
import connection from '../config/connection'

// Nombre de la tabla a usar
const TABLE_NAME = 'details'

// Definicion del modelo
const Details = connection.define('Details', {
	product_id: {
		type: DataTypes.INTEGER(10),
		allowNull: false
	},
	invoice_id: {
		type: DataTypes.INTEGER(10)
	},
	product_name: {
		type: DataTypes.STRING(30),
		allowNull: false
	},
	product_price: {
		type: DataTypes.DECIMAL(19, 2),
		allowNull: false
	},
	quantity: {
		type: DataTypes.INTEGER(10),
		allowNull: false,
	},
	derived_cost: {
		type: DataTypes.DECIMAL(19, 2),
		allowNull: false,
	},
	discount_price: {
		type: DataTypes.DECIMAL(19, 2)
	},
	total_derived_cost: {
		type: DataTypes.DECIMAL(19, 2),
		allowNull: false,
	},
	created_at: {
		allowNull: false,
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	timestamps: false,
	tableName: TABLE_NAME
})


// Creacion de la tabla y seed
;(async () => {
	await connection.sync({ force: true })
	console.log(`++ Tabla (re)creada correctamente: '${TABLE_NAME}'`)

	await Details.create({
		invoice_id: 1,
		product_id: 2,
		product_name: 'Producto 2',
		product_price: 20,
		quantity: 2,
		derived_cost: 40,
		discount_price: 2,
		total_derived_cost: 38,
	})
	await Details.create({
		invoice_id: 1,
		product_id: 4,
		product_name: 'Producto 4',
		product_price: 482,
		quantity: 1,
		derived_cost: 482,
		discount_price: 20,
		total_derived_cost: 462,
	})
	await Details.create({
		invoice_id: 2,
		product_id: 40,
		product_name: 'Producto 40',
		product_price: 50,
		quantity: 5,
		derived_cost: 250,
		discount_price: 0,
		total_derived_cost: 255,
	})
	await Details.create({
		invoice_id: 3,
		product_id: 3,
		product_name: 'Producto 3',
		product_price: 50,
		quantity: 5,
		derived_cost: 250,
		discount_price: 25,
		total_derived_cost: 225,
	})
	await Details.create({
		invoice_id: 3,
		product_id: 5,
		product_name: 'Producto 5',
		product_price: 400,
		quantity: 1,
		derived_cost: 400,
		discount_price: 20,
		total_derived_cost: 380,
	})
	await Details.create({
		invoice_id: 3,
		product_id: 15,
		product_name: 'Producto 15',
		product_price: 77,
		quantity: 5,
		derived_cost: 385,
		discount_price: 0,
		total_derived_cost: 385,
	})
	await Details.create({
		invoice_id: 4,
		product_id: 105,
		product_name: 'Producto 105',
		product_price: 200,
		quantity: 5,
		derived_cost: 1000,
		discount_price: 80,
		total_derived_cost: 920,
	})
	console.log(`++ Detalles de facturas creados correctamente:`)
})()

export default Details
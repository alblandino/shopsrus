const { Sequelize, DataTypes } = require('sequelize')
import connection from '../config/connection'

// Nombre de la tabla a usar
const TABLE_NAME = 'invoices'

// Definicion del modelo
const Invoices = connection.define('Invoices', {
	customer_id: {
		type: DataTypes.INTEGER(10),
		allowNull: false
	},
	order_id: {
		type: DataTypes.INTEGER(10),
		allowNull: false
	},
	number: {
		type: DataTypes.STRING(8),
		allowNull: false
	},
	total: {
		type: DataTypes.DECIMAL(19, 2),
		allowNull: false
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	allowNull: false,
	timestamps: false,
	tableName: TABLE_NAME
})


// Creacion de la tabla y seed
;(async () => {
	await connection.sync({ force: true })
	console.log(`++ Tabla (re)creada correctamente: '${TABLE_NAME}'`)

	if( process.env.DUMMY_DATA ){
		await Invoices.create({
			order_id: 1,
			number: 'BPD00001',
			customer_id: 1,
			total: 500,
		})
		await Invoices.create({
			order_id: 2,
			number: 'BPD00002',
			customer_id: 2,
			total: 2000,
		})
		await Invoices.create({
			order_id: 3,
			number: 'BPD00003',
			customer_id: 3,
			total: 800,
		})
		await Invoices.create({
			order_id: 4,
			number: 'BPD00004',
			customer_id: 4,
			total: 2500,
		})
		console.log(`++ Facturas creadas correctamente`)
	}
})();

export default Invoices
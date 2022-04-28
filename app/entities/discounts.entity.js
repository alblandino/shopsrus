const { Sequelize, DataTypes } = require('sequelize')
import connection from '../config/connection'

// Nombre de la tabla a usar
const TABLE_NAME = 'discounts'

// Definicion del modelo
const Discounts = connection.define('Discounts', {
	name: {
		type: DataTypes.STRING(25),
		allowNull: false
	},
	type: {
		type: DataTypes.STRING(25),
		allowNull: false
	},
	rate: {
		type: DataTypes.DECIMAL(19, 2),
		allowNull: false
	},
	is_percentage: {
		type: DataTypes.BOOLEAN(),
		allowNull: false,
	},
	created_at: {
		allowNull: false,
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

	// Datos de ejemplo
	if( process.env.DUMMY_DATA ){
		await Discounts.create({
			name:           'Descuento Empleados',
			type:           'empleado',
			rate:           30,
			is_percentage:  true
		})
		await Discounts.create({
			name:           `Descuento Afiliados`,
			type:           'afiliado',
			rate:           10,
			is_percentage:  true
		})
		await Discounts.create({
			name:           'Descuento Clientes',
			type:           'cliente',
			rate:           5,
			is_percentage:  true
		})
		await Discounts.create({
			name:           'Descuento por Precio',
			type:           'precio',
			rate:           5,
			is_percentage:  false
		})
		console.log('++ Descuentos creados correctamente');
	}
})()

export default Discounts
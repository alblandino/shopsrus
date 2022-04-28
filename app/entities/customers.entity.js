const { Sequelize, DataTypes } = require('sequelize')
import connection from '../config/connection'
import { faker } from '@faker-js/faker'

// Nombre de la tabla a usar
const TABLE_NAME = 'customers'

// Definicion del modelo
const Customers = connection.define('Customers', {
	fname: {
		type: DataTypes.STRING(25),
		allowNull: false
	},
	lname: {
		type: DataTypes.STRING(25),
		allowNull: false
	},
	address: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true
	},
	phone: {
		type: DataTypes.STRING(25),
		allowNull: false
	},
	type: {
		type: DataTypes.STRING(30),
		allowNull: false
	},
	created_at: {
		allowNull: false,
		type: DataTypes.DATEONLY,
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

	// Datos de ejemplo
	if( process.env.DUMMY_DATA ){
		await Customers.create({
			fname:      faker.name.firstName(),
			lname:      faker.name.lastName(),
			address:    faker.address.streetAddress(),
			email:      faker.internet.email().toLocaleLowerCase(),
			phone:      faker.phone.phoneNumber(),
			type:       'cliente',
			created_at: Sequelize.literal("NOW() - INTERVAL 3 YEAR ")
		})
		await Customers.create({
			fname:      faker.name.firstName(),
			lname:      faker.name.lastName(),
			address:    faker.address.streetAddress(),
			email:      faker.internet.email().toLocaleLowerCase(),
			phone:      faker.phone.phoneNumber(),
			type:       'cliente',
			created_at: Sequelize.literal("NOW() - INTERVAL 3 YEAR ")
		})
		await Customers.create({
			fname:      faker.name.firstName(),
			lname:      faker.name.lastName(),
			address:    faker.address.streetAddress(),
			email:      faker.internet.email().toLocaleLowerCase(),
			phone:      faker.phone.phoneNumber(),
			type:       'afiliado',
			created_at: Sequelize.literal("NOW() - INTERVAL 1 YEAR ")
		})
		await Customers.create({
			fname:      faker.name.firstName(),
			lname:      faker.name.lastName(),
			address:    faker.address.streetAddress(),
			email:      faker.internet.email().toLocaleLowerCase(),
			phone:      faker.phone.phoneNumber(),
			type:       'empleado',
			created_at: Sequelize.literal("NOW() - INTERVAL 5 YEAR ")
		})
		await Customers.create({
			fname:      faker.name.firstName(),
			lname:      faker.name.lastName(),
			address:    faker.address.streetAddress(),
			email:      faker.internet.email().toLocaleLowerCase(),
			phone:      faker.phone.phoneNumber(),
			type:       'empleado',
			created_at: Sequelize.literal("NOW() - INTERVAL 3 YEAR ")
		})
		console.log(`++ Clientes creados correctamente`)
}
})()

export default Customers
import { Sequelize } from 'sequelize'

const connection = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS, {
		host: process.env.DB_HOST,
		dialect: 'mysql',
		logging: false
	}
)

// Ejecutamos la conexion con una IIFE
;(async () => {
	try {
    	await connection.authenticate()
        console.log('> Conexión con la base de datos establecida exitosamente')
	}catch(error){
		console.error('----Error conectando a la base de datos, revisar archivo .env----')
	}
})()

export default connection
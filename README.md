# ShopsRUs

#### Directorio del proyecto
```
PROYECTO
└───app
│   └───config
│       └───connection.js                 // Archivo de conexion a la base de datos
│   └───controllers                       // Controladores registrados en las rutas
│       └───customers.controller.js
│       └───discounts.controller.js
│       └───invoices.controller.js
│   └───entities                          // Estructuras de las bases de datos (y seeds)
│       └───customer.entity.js
│       └───details.entity.js
│       └───discounts.entity.js
│       └───invoices.entity.js
│       └───index.js
│   └───models                            // Modelos de la base de datos
│       └───customers.model.js
│       └───discounts.model.js
│       └───invoices.model.js
│   └───routes                            // Rutas habilitadas del sistema
│       └───customers.route.js
│       └───discounts.route.js
│       └───invoices.route.js
│   └───index.js                          // Archivo inicial de la aplicacion
└───node_modules
└───.gitignore
└───.babelrc
└───.env
└───package.json
```

### Comandos para correr la aplicacion
> Primero debemos clonar este repositorio en nuestra maquina, en cualquier directorio y para esto utilizaremos git-scm
````console
git clone https://github.com/alblandino/shopsrus.git
````

> Ahora, ingresamos al directorio
````console
cd shopsrus
````

> Instalamos las dependencias del proyecto (indicadas en el apartado de dependencias)
````console
npm install
````

> Una vez completado, se procede a correr el siguiente comando para inicializar el proyecto, el mismo empezara a crear las tablas y agregar la data de prueba
````console
npm start
````

Nota: *en el archivo .env hay algunas credenciales a una base de datos in cloud, es una base de datos exclusiva para esto y realmente no importa que las credenciales esten publicas debido a que cada vez que se corre la aplicacion se re-crean las tablas y los datos de las mismas.*

### Coleccion de Postman
> *En esta [coleccion de Postman](https://www.getpostman.com/collections/af214e45f76388ee5a59), se encuentran todos los endpoints registrados para poder hacer uso del API Rest de la misma*

### Dependencias
- dotenv: Para hacer uso de las variables de entorno dentro del objeto process.
- express: Para hacer uso de su enrutador y que se me haga mas sencilla la tarea de crear las rutas
- morgan: Log de http para visualizar los errores y peticiones realizadas
- mysql2: driver de mysql para utilizar el proyecto (en caso de usar otra como postgress, favor de instalar su respectivo driver)
- sequelize: Como no me especificaron que herramientas usar, opte por Sequelize ya que hice el proyecto sin TS para uder TypeORM
- @babel: para todo lo que es el transpile del codigo y poder usar experimental features que no estan en mi version de node
- faker: para crear los datos de los clientes de forma random

-# Parking Lot Manual ORM

This folder contains a complete manual Object-Relational Mapping (ORM) implementation for the Parking Lot Management System database. Each table in the database has a corresponding model class with full CRUD operations.

## Models Overview

### 1. PerfilUsuario.js
- **Table**: `PERFIL_USUARIO`
- **Purpose**: Manages user profiles/roles (administrator, operator, user)
- **Key Methods**:
  - `create()` - Insert new profile
  - `findById(id)` - Find profile by ID
  - `findAll()` - Get all profiles
  - `update()` - Update profile
  - `delete()` - Delete profile

### 2. Usuario.js
- **Table**: `USUARIO`
- **Purpose**: Manages user information
- **Key Methods**:
  - `create()` - Insert new user
  - `findById(id)` - Find user by ID
  - `findByDocument(numero_documento)` - Find user by document number
  - `findAll()` - Get all users
  - `update()` - Update user
  - `delete()` - Delete user

### 3. Vehiculo.js
- **Table**: `VEHICULO`
- **Purpose**: Manages vehicle information
- **Key Methods**:
  - `create()` - Insert new vehicle
  - `findById(id)` - Find vehicle by ID
  - `findByPlaca(placa)` - Find vehicle by license plate
  - `findByUserId(userId)` - Find vehicles by user ID
  - `findAll()` - Get all vehicles
  - `update()` - Update vehicle
  - `delete()` - Delete vehicle

### 4. Celda.js
- **Table**: `CELDA`
- **Purpose**: Manages parking cells/spaces
- **Key Methods**:
  - `create()` - Insert new cell
  - `findById(id)` - Find cell by ID
  - `findByTipo(tipo)` - Find cells by type (Carro/Moto)
  - `findByEstado(estado)` - Find cells by status
  - `findAvailableByType(tipo)` - Find available cells by type
  - `countByTypeAndStatus(tipo, estado)` - Count cells
  - `changeStatus(newStatus)` - Change cell status
  - `update()` - Update cell
  - `delete()` - Delete cell

### 5. AccesoSalida.js
- **Table**: `ACCESO_SALIDAS`
- **Purpose**: Manages vehicle entry/exit records
- **Key Methods**:
  - `create()` - Insert new access record
  - `findById(id)` - Find record by ID
  - `findByVehicleId(vehiculoId)` - Find records by vehicle
  - `findByMovimiento(movimiento)` - Find by movement type (Entrada/Salida)
  - `findByDateRange(fechaInicio, fechaFin)` - Find by date range
  - `findAll()` - Get all records
  - `update()` - Update record
  - `delete()` - Delete record

### 6. PicoPlaca.js
- **Table**: `PICO_PLACA`
- **Purpose**: Manages traffic restriction rules
- **Key Methods**:
  - `create()` - Insert new rule
  - `findById(id)` - Find rule by ID
  - `findByVehicleTypeAndDay(tipo, dia)` - Find rules by vehicle type and day
  - `findByNumberAndDay(numero, dia)` - Find rules by number and day
  - `findAll()` - Get all rules
  - `update()` - Update rule
  - `delete()` - Delete rule

### 7. Incidencia.js
- **Table**: `INCIDENCIA`
- **Purpose**: Manages incident types
- **Key Methods**:
  - `create()` - Insert new incident type
  - `findById(id)` - Find incident by ID
  - `findByNombre(nombre)` - Find incidents by name
  - `findAll()` - Get all incidents
  - `update()` - Update incident
  - `delete()` - Delete incident

### 8. ReporteIncidencia.js
- **Table**: `REPORTE_INCIDENCIA` (Junction table)
- **Purpose**: Manages incident reports linking vehicles and incidents
- **Key Methods**:
  - `create()` - Insert new report
  - `findByIds(vehiculoId, incidenciaId)` - Find by both IDs
  - `findByVehicleId(vehiculoId)` - Find reports by vehicle
  - `findByIncidentId(incidenciaId)` - Find reports by incident
  - `findByDateRange(fechaInicio, fechaFin)` - Find by date range
  - `findAll()` - Get all reports
  - `update()` - Update report
  - `delete()` - Delete report

### 9. HistorialParqueo.js
- **Table**: `HISTORIAL_PARQUEO` (Junction table)
- **Purpose**: Manages parking history linking cells and vehicles
- **Key Methods**:
  - `create()` - Insert new history record
  - `findByIds(celdaId, vehiculoId)` - Find by both IDs
  - `findByVehicleId(vehiculoId)` - Find history by vehicle
  - `findByCellId(celdaId)` - Find history by cell
  - `findByDateRange(fechaInicio, fechaFin)` - Find by date range
  - `getCurrentVehicleInCell(celdaId)` - Get current vehicle in cell
  - `getParkingStatistics()` - Get parking statistics
  - `findAll()` - Get all history
  - `update()` - Update history
  - `delete()` - Delete history

## Usage Examples

### Basic Usage
```javascript
const { Usuario, Vehiculo, Celda } = require('./model');

// Find a user by document
const usuario = new Usuario();
await usuario.findByDocument('651684841');
console.log(usuario.toJSON());

// Get all available car cells
const celdasDisponibles = await Celda.findAvailableByType('Carro');
console.log('Available cells:', celdasDisponibles.length);

// Find vehicles for a user
const vehiculos = await Vehiculo.findByUserId(1);
console.log('User vehicles:', vehiculos.map(v => v.toJSON()));
```

### Creating New Records
```javascript
// Create new user
const newUser = new Usuario(
  null, 'CC', '123456789', 'Juan', 'Carlos', 'Perez', 'Lopez',
  'juan.perez@email.com', '3001234567', 'img/juan.jpg',
  'activo', 'password123', 3 // profile ID
);
await newUser.create();

// Create new vehicle for the user
const newVehicle = new Vehiculo(
  null, 'XYZ999', 'Azul', '2023', 'Honda', 'Carro', newUser.id_usuario
);
await newVehicle.create();
```

### Updating Records
```javascript
// Update user phone number
const usuario = new Usuario();
await usuario.findById(1);
usuario.numero_celular = '3009876543';
await usuario.update();

// Change cell status
const celda = new Celda();
await celda.findById(1);
await celda.changeStatus('Ocupada');
```

## Features

- **Complete CRUD Operations**: All models support Create, Read, Update, Delete
- **Async/Await Support**: All operations are promise-based
- **Error Handling**: Comprehensive error handling with descriptive messages
- **Connection Management**: Automatic database connection handling
- **Data Validation**: Built-in parameter validation
- **Flexible Queries**: Support for various query patterns
- **JSON Serialization**: Easy conversion to JSON format
- **Static Methods**: Class-level operations for bulk queries

## Database Connection

All models use the `DatabaseConnection.js` class for database connectivity. Make sure to configure your database connection parameters in `DatabaseConnection.js` before using the ORM.

## Files Structure

```
model/
├── index.js                 # Exports all models
├── PerfilUsuario.js         # User profiles model
├── Usuario.js               # Users model
├── Vehiculo.js              # Vehicles model
├── Celda.js                 # Parking cells model
├── AccesoSalida.js          # Access/exit records model
├── PicoPlaca.js             # Traffic restrictions model
├── Incidencia.js            # Incident types model
├── ReporteIncidencia.js     # Incident reports model
├── HistorialParqueo.js      # Parking history model
└── README.md                # This documentation
```

## Unit Testing

The project includes comprehensive unit tests for all model classes. The test file `PruebasUsuario.js` contains exhaustive tests for the `Usuario` class.

### Running Tests

#### Quick Commands

**Main test command:**
```bash
npm test
```

**Direct execution:**
```bash
node test/PruebasUsuario.js
```

#### NPM Scripts Available

```bash
# Run all unit tests
npm test

# Run Usuario class tests specifically
npm run test:usuario

# Run with detailed debug information
npm run test:verbose

# Save test results to file
npm run test:save

# Run the main application
npm start
```

#### Advanced Testing Commands

**Execute with warnings and debug info:**
```bash
node --trace-warnings test/PruebasUsuario.js
```

**Save results to file:**
```bash
node test/PruebasUsuario.js > resultados-pruebas.txt 2>&1
```

**Execute with timeout:**
```bash
timeout 30s node test/PruebasUsuario.js
```

**Show only errors:**
```bash
node test/PruebasUsuario.js 2>&1 | grep -E "(❌|Error|FALLIDA)"
```

### Test Coverage

The unit tests cover the following areas:

#### 🧪 Constructor Tests
- Empty constructor validation
- Constructor with all parameters
- Parameter assignment verification

#### 🔧 Property Tests
- All getter methods
- All setter methods
- Property value validation

#### 📊 Method Tests
- `toJSON()` - Object serialization
- `_mapRowToObject()` - Database row mapping
- `findAll()` - Static method for retrieving all users
- `findById()` - Find user by ID
- `findByDocument()` - Find user by document number

#### ✅ Validation Tests
- Data type validation
- Edge cases and boundary conditions
- Error handling scenarios

#### 🔍 Integration Tests
- Database connection handling
- SQL query execution (with mock data)
- Error handling for connection failures

### Test Framework Features

- **Custom Assertions**: `assertEquals`, `assertNotNull`, `assertTrue`
- **Error Handling**: Comprehensive try-catch with detailed reporting
- **Statistics**: Success/failure counters and percentages
- **Performance**: Execution time measurement
- **Detailed Reports**: Complete test results with error descriptions

### Expected Test Output

```
🚀 INICIANDO PRUEBAS UNITARIAS DE LA CLASE USUARIO
============================================================

🧪 Ejecutando: Constructor Vacío
✅ EXITOSA: Constructor Vacío

🧪 Ejecutando: Constructor Con Parámetros
✅ EXITOSA: Constructor Con Parámetros

🧪 Ejecutando: Getters y Setters
✅ EXITOSA: Getters y Setters

🧪 Ejecutando: Método toJSON
✅ EXITOSA: Método toJSON

🧪 Ejecutando: Método _mapRowToObject
✅ EXITOSA: Método _mapRowToObject

🧪 Ejecutando: Método findAll (BD)
   ℹ️  Prueba de BD - Se esperaba error de conexión
✅ EXITOSA: Método findAll (BD)

🧪 Ejecutando: Método findById (BD)
   ℹ️  Prueba de BD - Se esperaba error de conexión
✅ EXITOSA: Método findById (BD)

🧪 Ejecutando: Método findByDocument (BD)
   ℹ️  Prueba de BD - Se esperaba error de conexión
✅ EXITOSA: Método findByDocument (BD)

🧪 Ejecutando: Validación de Datos
✅ EXITOSA: Validación de Datos

🧪 Ejecutando: Casos Extremos
✅ EXITOSA: Casos Extremos

============================================================
📊 RESUMEN DE PRUEBAS UNITARIAS
============================================================
📈 Total de pruebas ejecutadas: 10
✅ Pruebas exitosas: 10
❌ Pruebas fallidas: 0
⏱️  Tiempo total: 45ms
📊 Porcentaje de éxito: 100%

✨ PRUEBAS COMPLETADAS
```

### Prerequisites for Testing

- **Node.js**: Ensure Node.js is installed (`node --version`)
- **Dependencies**: Run `npm install` to install required packages
- **Database**: Tests work with or without database connection

### Diagnostic Commands

```bash
# Check Node.js version
node --version
npm --version

# Verify test file exists
ls -la test/PruebasUsuario.js

# View test file structure
head -10 test/PruebasUsuario.js
```

## Additional Testing

See `example-orm-usage.js` in the root directory for comprehensive usage examples and testing scenarios.

## API Endpoints - Usuarios

### Obtener todos los usuarios
- **GET** `/api/usuarios`
- **Respuesta:**
```json
[
  {
    "id_usuario": 1,
    "tipo_documento": "CC",
    "numero_documento": "123456789",
    "primer_nombre": "Juan",
    "segundo_nombre": "Carlos",
    "primer_apellido": "Pérez",
    "segundo_apellido": "López",
    "direccion_correo": "juan@email.com",
    "numero_celular": "3001234567",
    "foto_perfil": "foto.jpg",
    "estado": "activo",
    "clave": "password123",
    "perfil_usuario_id": 2
  }
]
```

### Obtener usuario por ID
- **GET** `/api/usuarios/:id`
- **Respuesta exitosa:**
```json
{
  "id_usuario": 1,
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "López",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "foto.jpg",
  "estado": "activo",
  "clave": "password123",
  "perfil_usuario_id": 2
}
```
- **Respuesta si no existe:**
```json
{ "error": "Usuario no encontrado" }
```

### Obtener usuario por número de documento
- **GET** `/api/usuarios/documento/:numero_documento`
- **Respuesta exitosa:** igual al formato anterior
- **Respuesta si no existe:**
```json
{ "error": "Usuario no encontrado" }
```

### Crear usuario
- **POST** `/api/usuarios`
- **Body JSON:**
```json
{
  "id_usuario": null,
  "tipo_documento": "CC",
  "numero_documento": "123456789",
  "primer_nombre": "Juan",
  "segundo_nombre": "Carlos",
  "primer_apellido": "Pérez",
  "segundo_apellido": "López",
  "direccion_correo": "juan@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "foto.jpg",
  "estado": "activo",
  "clave": "password123",
  "perfil_usuario_id": 2
}
```
- **Respuesta exitosa (201):** usuario creado (igual al formato anterior, con el nuevo `id_usuario` asignado)
- **Respuesta de error:**
```json
{ "error": "Mensaje de error" }
```

### Actualizar usuario
- **PUT** `/api/usuarios/:id`
- **Body JSON:** solo los campos a actualizar, por ejemplo:
```json
{
  "primer_nombre": "NuevoNombre",
  "estado": "inactivo"
}
```
- **Respuesta exitosa:** usuario actualizado (igual al formato anterior)
- **Respuesta si no existe:**
```json
{ "error": "Usuario no encontrado" }
```

### Eliminar usuario
- **DELETE** `/api/usuarios/:id`
- **Respuesta exitosa:**
```json
{ "message": "Usuario eliminado correctamente" }
```
- **Respuesta si no existe:**
```json
{ "error": "Usuario no encontrado" }
```
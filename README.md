# Parking Management System API

Sistema de gestión de parqueaderos con arquitectura de microservicios desarrollado en Node.js, Express y MySQL con ORM manual.

## 🏗️ Arquitectura

Este proyecto está estructurado siguiendo las mejores prácticas de desarrollo de APIs REST con Express.js:

```
src/
├── app.js                 # Configuración principal de Express
├── server.js              # Punto de entrada del servidor
├── config/                # Configuraciones
│   ├── DatabaseConnection.js
│   ├── checkDbConnection.js
│   └── environment.js
├── controllers/           # Lógica de negocio
│   ├── usuario.controller.js
│   ├── vehiculo.controller.js
│   ├── celda.controller.js
│   └── ...
├── middlewares/          # Middleware personalizado
│   ├── errorHandler.js
│   ├── notFound.js
│   └── asyncHandler.js
├── models/               # Modelos ORM manuales
│   ├── Usuario.js
│   ├── Vehiculo.js
│   ├── Celda.js
│   └── ...
├── routes/               # Definición de rutas
│   ├── usuario.routes.js
│   ├── vehiculo.routes.js
│   └── ...
├── services/             # Servicios de negocio (futuro)
├── utils/                # Utilidades (futuro)
└── validators/           # Validadores (futuro)
```

## 🚀 Características

- **API REST completa** con todos los métodos HTTP
- **Arquitectura de microservicios** lista para escalabilidad
- **ORM manual** con operaciones CRUD completas
- **Middleware de seguridad** (Helmet, CORS, Rate Limiting)
- **Manejo centralizado de errores**
- **Logging** con Morgan
- **Validación de datos**
- **Paginación** en endpoints de listado
- **Health checks** para monitoreo
- **Configuración para despliegue** en Vercel y Render

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0
- MySQL >= 5.7

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/mauriciorivero/ParkingSENABend.git
cd ParkingSENABend
```

2. **Instalar dependencias**
```bash
npm install
npm install morgan helmet express-rate-limit nodemon --save-dev
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp env.example .env

# Editar las variables de entorno
nano .env
```

4. **Configurar la base de datos**
```bash
# Importar el script SQL
mysql -u root -p < Script-SQL-ParkingLot.sql
```

5. **Verificar conexión a la base de datos**
```bash
node src/config/checkDbConnection.js
```

6. **Iniciar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📋 Documentación Completa de API

### 🔗 **URL Base**: `http://localhost:3001`

---

## 👥 **USUARIOS** - `/api/usuarios`

### **GET** `/api/usuarios` - Obtener todos los usuarios
**Query Parameters (opcionales):**
- `page` (number): Página (default: 1)
- `limit` (number): Límite por página (default: 10)
- `estado` (string): Filtrar por estado
- `perfil_usuario_id` (number): Filtrar por perfil

**Ejemplo Postman:**
```
GET http://localhost:3001/api/usuarios?page=1&limit=5&estado=activo
```

**Respuesta:**
```json
{
  "success": true,
  "count": 2,
  "total": 10,
  "pagination": {
    "current": 1,
    "pages": 2
  },
  "data": [
    {
      "id_usuario": 1,
      "tipo_documento": "CC",
      "numero_documento": "12345678",
      "primer_nombre": "Juan",
      "segundo_nombre": "Carlos",
      "primer_apellido": "Pérez",
      "segundo_apellido": "López",
      "direccion_correo": "juan@email.com",
      "numero_celular": "3001234567",
      "foto_perfil": "perfil.jpg",
      "estado": "activo",
      "clave": "password123",
      "perfil_usuario_id": 3
    }
  ]
}
```

### **GET** `/api/usuarios/:id` - Obtener usuario por ID
**Ejemplo Postman:**
```
GET http://localhost:3001/api/usuarios/1
```

### **GET** `/api/usuarios/documento/:numero_documento` - Obtener usuario por documento
**Ejemplo Postman:**
```
GET http://localhost:3001/api/usuarios/documento/12345678
```

### **POST** `/api/usuarios` - Crear nuevo usuario
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "tipo_documento": "CC",
  "numero_documento": "87654321",
  "primer_nombre": "Ana",
  "segundo_nombre": "María",
  "primer_apellido": "García",
  "segundo_apellido": "Rodríguez",
  "direccion_correo": "ana.garcia@email.com",
  "numero_celular": "3009876543",
  "foto_perfil": "ana.jpg",
  "estado": "activo",
  "clave": "mipassword123",
  "perfil_usuario_id": 2
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "data": {
    "id_usuario": 5,
    "tipo_documento": "CC",
    "numero_documento": "87654321",
    "primer_nombre": "Ana",
    "segundo_nombre": "María",
    "primer_apellido": "García",
    "segundo_apellido": "Rodríguez",
    "direccion_correo": "ana.garcia@email.com",
    "numero_celular": "3009876543",
    "foto_perfil": "ana.jpg",
    "estado": "activo",
    "clave": "mipassword123",
    "perfil_usuario_id": 2
  }
}
```

### **PUT** `/api/usuarios/:id` - Actualizar usuario
**Ejemplo Postman:**
```
PUT http://localhost:3001/api/usuarios/5
```

**Body (JSON) - Solo campos a actualizar:**
```json
{
  "numero_celular": "3001111111",
  "estado": "inactivo",
  "direccion_correo": "ana.nuevo@email.com"
}
```

### **DELETE** `/api/usuarios/:id` - Eliminar usuario
**Ejemplo Postman:**
```
DELETE http://localhost:3001/api/usuarios/5
```

---

## 🚗 **VEHÍCULOS** - `/api/vehiculos`

### **GET** `/api/vehiculos` - Obtener todos los vehículos
**Query Parameters:** `page`, `limit`, `tipo`, `usuario_id`

### **GET** `/api/vehiculos/:id` - Obtener vehículo por ID

### **GET** `/api/vehiculos/placa/:placa` - Obtener vehículo por placa
**Ejemplo Postman:**
```
GET http://localhost:3001/api/vehiculos/placa/ABC123
```

### **GET** `/api/vehiculos/usuario/:usuario_id` - Obtener vehículos por usuario
**Ejemplo Postman:**
```
GET http://localhost:3001/api/vehiculos/usuario/1
```

### **POST** `/api/vehiculos` - Crear nuevo vehículo
**Body (JSON):**
```json
{
  "placa": "XYZ789",
  "color": "Rojo",
  "año": "2022",
  "marca": "Toyota",
  "tipo": "Carro",
  "usuario_id": 1
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "data": {
    "id_vehiculo": 3,
    "placa": "XYZ789",
    "color": "Rojo",
    "año": "2022",
    "marca": "Toyota",
    "tipo": "Carro",
    "usuario_id": 1
  }
}
```

### **PUT** `/api/vehiculos/:id` - Actualizar vehículo
**Body (JSON):**
```json
{
  "color": "Azul",
  "año": "2023"
}
```

### **DELETE** `/api/vehiculos/:id` - Eliminar vehículo

---

## 🅿️ **CELDAS** - `/api/celdas`

### **GET** `/api/celdas` - Obtener todas las celdas
**Query Parameters:** `page`, `limit`, `tipo`, `estado`

### **GET** `/api/celdas/:id` - Obtener celda por ID

### **GET** `/api/celdas/tipo/:tipo` - Obtener celdas por tipo
**Ejemplos Postman:**
```
GET http://localhost:3001/api/celdas/tipo/Carro
GET http://localhost:3001/api/celdas/tipo/Moto
```

### **GET** `/api/celdas/estado/:estado` - Obtener celdas por estado
**Ejemplos Postman:**
```
GET http://localhost:3001/api/celdas/estado/Libre
GET http://localhost:3001/api/celdas/estado/Ocupada
GET http://localhost:3001/api/celdas/estado/Mantenimiento
```

### **GET** `/api/celdas/disponibles/:tipo` - Obtener celdas disponibles
**Ejemplo Postman:**
```
GET http://localhost:3001/api/celdas/disponibles/Carro
```

### **GET** `/api/celdas/estadisticas/:tipo` - Obtener estadísticas
**Ejemplo Postman:**
```
GET http://localhost:3001/api/celdas/estadisticas/Carro
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "tipo": "Carro",
    "total": 50,
    "libre": 20,
    "ocupada": 25,
    "mantenimiento": 5,
    "porcentaje_ocupacion": "50.00"
  }
}
```

### **POST** `/api/celdas` - Crear nueva celda
**Body (JSON):**
```json
{
  "numero": "A-101",
  "tipo": "Carro",
  "estado": "Libre"
}
```

### **PUT** `/api/celdas/:id` - Actualizar celda

### **PATCH** `/api/celdas/:id/estado` - Cambiar estado de celda
**Ejemplo Postman:**
```
PATCH http://localhost:3001/api/celdas/1/estado
```

**Body (JSON):**
```json
{
  "estado": "Ocupada"
}
```

### **DELETE** `/api/celdas/:id` - Eliminar celda

---

## 🚪 **ACCESOS/SALIDAS** - `/api/accesos-salidas`

### **GET** `/api/accesos-salidas` - Obtener todos los registros
**Query Parameters:** `page`, `limit`, `movimiento`, `vehiculo_id`

**Ejemplo Postman:**
```
GET http://localhost:3001/api/accesos-salidas?movimiento=Entrada&vehiculo_id=1
```

### **GET** `/api/accesos-salidas/:id` - Obtener registro por ID

### **POST** `/api/accesos-salidas` - Crear nuevo registro
**Body (JSON):**
```json
{
  "movimiento": "Entrada",
  "fecha_hora": "2024-01-15T10:30:00",
  "vehiculo_id": 1
}
```

---

## 📊 **HISTORIAL PARQUEO** - `/api/historial-parqueo`

### **GET** `/api/historial-parqueo` - Obtener todo el historial

### **GET** `/api/historial-parqueo/vehiculo/:vehiculo_id` - Por vehículo
**Ejemplo Postman:**
```
GET http://localhost:3001/api/historial-parqueo/vehiculo/1
```

### **GET** `/api/historial-parqueo/celda/:celda_id` - Por celda
**Ejemplo Postman:**
```
GET http://localhost:3001/api/historial-parqueo/celda/1
```

### **GET** `/api/historial-parqueo/estadisticas` - Estadísticas generales

### **POST** `/api/historial-parqueo` - Crear registro
**Body (JSON):**
```json
{
  "celda_id": 1,
  "vehiculo_id": 1,
  "fecha_hora": "2024-01-15T10:30:00"
}
```

---

## 🚨 **INCIDENCIAS** - `/api/incidencias`

### **GET** `/api/incidencias` - Obtener todas las incidencias

### **GET** `/api/incidencias/:id` - Obtener incidencia por ID

### **POST** `/api/incidencias` - Crear nueva incidencia
**Body (JSON):**
```json
{
  "nombre": "Daño en vehículo",
  "descripcion": "Rayón en la puerta del lado izquierdo"
}
```

---

## 📋 **REPORTES DE INCIDENCIA** - `/api/reportes-incidencia`

### **GET** `/api/reportes-incidencia` - Obtener todos los reportes

### **GET** `/api/reportes-incidencia/vehiculo/:vehiculo_id` - Por vehículo

### **GET** `/api/reportes-incidencia/incidencia/:incidencia_id` - Por incidencia

### **POST** `/api/reportes-incidencia` - Crear reporte
**Body (JSON):**
```json
{
  "vehiculo_id": 1,
  "incidencia_id": 1,
  "fecha_hora": "2024-01-15T15:45:00",
  "descripcion": "Se observó el daño al momento de la salida"
}
```

---

## 🚦 **PICO Y PLACA** - `/api/pico-placa`

### **GET** `/api/pico-placa` - Obtener todas las reglas

### **GET** `/api/pico-placa/:id` - Obtener regla por ID

### **GET** `/api/pico-placa/tipo/:tipo/dia/:dia` - Por tipo y día
**Ejemplo Postman:**
```
GET http://localhost:3001/api/pico-placa/tipo/Carro/dia/Lunes
```

### **POST** `/api/pico-placa` - Crear nueva regla
**Body (JSON):**
```json
{
  "numero_placa": "1-2",
  "dia_semana": "Lunes",
  "hora_inicio": "07:00:00",
  "hora_fin": "09:00:00",
  "tipo_vehiculo": "Carro"
}
```

---

## 👤 **PERFILES DE USUARIO** - `/api/perfiles-usuario`

### **GET** `/api/perfiles-usuario` - Obtener todos los perfiles

### **GET** `/api/perfiles-usuario/:id` - Obtener perfil por ID

### **POST** `/api/perfiles-usuario` - Crear nuevo perfil
**Body (JSON):**
```json
{
  "descripcion": "Administrador del Sistema"
}
```

### **PUT** `/api/perfiles-usuario/:id` - Actualizar perfil
**Body (JSON):**
```json
{
  "descripcion": "Operador de Parqueadero"
}
```

### **DELETE** `/api/perfiles-usuario/:id` - Eliminar perfil

---

## 🏥 **HEALTH CHECK** - `/health`

### **GET** `/health` - Verificar estado del servidor
**Ejemplo Postman:**
```
GET http://localhost:3001/health
```

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "parking-management-api"
}
```

---

## 📝 **Códigos de Respuesta HTTP**

- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos de entrada inválidos
- **404**: Not Found - Recurso no encontrado
- **409**: Conflict - Conflicto (ej: documento duplicado)
- **500**: Internal Server Error - Error del servidor

## 📊 **Estructura de Respuestas de Error**

```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

## 🧪 Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas específicas
npm run test:usuario

# Ejecutar con información detallada
npm run test:verbose

# Guardar resultados en archivo
npm run test:save
```

## 🚀 Despliegue

### Vercel

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Configurar variables de entorno en Vercel**
```bash
vercel env add DB_HOST
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add DB_NAME
```

3. **Desplegar**
```bash
vercel --prod
```

### Render

1. **Conectar repositorio** en [render.com](https://render.com)
2. **Configurar variables de entorno** en el dashboard
3. **El archivo `render.yaml`** ya está configurado

### Railway / Heroku

1. **Crear aplicación**
2. **Configurar variables de entorno**
3. **Hacer push al repositorio**

## 🔧 Configuración Avanzada

### Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3001` |
| `DB_HOST` | Host de la base de datos | `localhost` |
| `DB_PORT` | Puerto de la base de datos | `3306` |
| `DB_USER` | Usuario de la base de datos | `root` |
| `DB_PASSWORD` | Contraseña de la base de datos | |
| `DB_NAME` | Nombre de la base de datos | `ParkingLot` |

### Middleware Incluido

- **Helmet**: Seguridad HTTP headers
- **CORS**: Control de acceso entre dominios
- **Morgan**: Logging de requests
- **Rate Limiting**: Limitación de peticiones por IP
- **Error Handler**: Manejo centralizado de errores

## 🤝 Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **SENA - Grupo Huber Andres** - Desarrollo inicial

## 🆘 Soporte

Para reportar bugs o solicitar funcionalidades, crear un [issue](https://github.com/mauriciorivero/ParkingSENABend/issues) en GitHub.
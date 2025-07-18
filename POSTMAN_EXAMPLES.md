# Parking Management API - Ejemplos para Postman

Este archivo contiene ejemplos organizados para crear una colección completa en Postman.

## 🔗 **URL Base**: `http://localhost:3001`

---

## 📋 **Colección Postman: Parking Management API**

### **Environment Variables**
Crear las siguientes variables de entorno en Postman:
- `base_url`: `http://localhost:3001`
- `user_id`: `1` (para reutilizar en pruebas)
- `vehicle_id`: `1` (para reutilizar en pruebas)
- `cell_id`: `1` (para reutilizar en pruebas)

---

## 👥 **Carpeta: Usuarios**

### 1. **GET** Obtener Todos los Usuarios
- **URL**: `{{base_url}}/api/usuarios`
- **Method**: GET
- **Query Params**:
  - `page`: `1`
  - `limit`: `10`
  - `estado`: `activo`

### 2. **GET** Obtener Usuario por ID
- **URL**: `{{base_url}}/api/usuarios/{{user_id}}`
- **Method**: GET

### 3. **GET** Obtener Usuario por Documento
- **URL**: `{{base_url}}/api/usuarios/documento/12345678`
- **Method**: GET

### 4. **POST** Crear Usuario
- **URL**: `{{base_url}}/api/usuarios`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "tipo_documento": "CC",
  "numero_documento": "99999999",
  "primer_nombre": "Maria",
  "segundo_nombre": "Elena",
  "primer_apellido": "Rodriguez",
  "segundo_apellido": "Lopez",
  "direccion_correo": "maria.rodriguez@email.com",
  "numero_celular": "3001234567",
  "foto_perfil": "maria.jpg",
  "estado": "activo",
  "clave": "password123",
  "perfil_usuario_id": 3
}
```

### 5. **PUT** Actualizar Usuario
- **URL**: `{{base_url}}/api/usuarios/{{user_id}}`
- **Method**: PUT
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "numero_celular": "3009999999",
  "direccion_correo": "maria.nueva@email.com"
}
```

### 6. **DELETE** Eliminar Usuario
- **URL**: `{{base_url}}/api/usuarios/5`
- **Method**: DELETE

---

## 🚗 **Carpeta: Vehículos**

### 1. **GET** Obtener Todos los Vehículos
- **URL**: `{{base_url}}/api/vehiculos`
- **Method**: GET
- **Query Params**:
  - `page`: `1`
  - `limit`: `10`
  - `tipo`: `Carro`

### 2. **GET** Obtener Vehículo por ID
- **URL**: `{{base_url}}/api/vehiculos/{{vehicle_id}}`
- **Method**: GET

### 3. **GET** Obtener Vehículo por Placa
- **URL**: `{{base_url}}/api/vehiculos/placa/ABC123`
- **Method**: GET

### 4. **GET** Obtener Vehículos por Usuario
- **URL**: `{{base_url}}/api/vehiculos/usuario/{{user_id}}`
- **Method**: GET

### 5. **POST** Crear Vehículo
- **URL**: `{{base_url}}/api/vehiculos`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "placa": "DEF456",
  "color": "Azul",
  "año": "2023",
  "marca": "Honda",
  "tipo": "Carro",
  "usuario_id": 1
}
```

### 6. **PUT** Actualizar Vehículo
- **URL**: `{{base_url}}/api/vehiculos/{{vehicle_id}}`
- **Method**: PUT
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "color": "Rojo",
  "año": "2024"
}
```

### 7. **DELETE** Eliminar Vehículo
- **URL**: `{{base_url}}/api/vehiculos/2`
- **Method**: DELETE

---

## 🅿️ **Carpeta: Celdas**

### 1. **GET** Obtener Todas las Celdas
- **URL**: `{{base_url}}/api/celdas`
- **Method**: GET
- **Query Params**:
  - `page`: `1`
  - `limit`: `10`

### 2. **GET** Obtener Celda por ID
- **URL**: `{{base_url}}/api/celdas/{{cell_id}}`
- **Method**: GET

### 3. **GET** Obtener Celdas por Tipo
- **URL**: `{{base_url}}/api/celdas/tipo/Carro`
- **Method**: GET

### 4. **GET** Obtener Celdas por Estado
- **URL**: `{{base_url}}/api/celdas/estado/Libre`
- **Method**: GET

### 5. **GET** Obtener Celdas Disponibles
- **URL**: `{{base_url}}/api/celdas/disponibles/Carro`
- **Method**: GET

### 6. **GET** Obtener Estadísticas de Celdas
- **URL**: `{{base_url}}/api/celdas/estadisticas/Carro`
- **Method**: GET

### 7. **POST** Crear Celda
- **URL**: `{{base_url}}/api/celdas`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "numero": "B-205",
  "tipo": "Carro",
  "estado": "Libre"
}
```

### 8. **PUT** Actualizar Celda
- **URL**: `{{base_url}}/api/celdas/{{cell_id}}`
- **Method**: PUT
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "numero": "A-101-UPDATED",
  "estado": "Mantenimiento"
}
```

### 9. **PATCH** Cambiar Estado de Celda
- **URL**: `{{base_url}}/api/celdas/{{cell_id}}/estado`
- **Method**: PATCH
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "estado": "Ocupada"
}
```

### 10. **DELETE** Eliminar Celda
- **URL**: `{{base_url}}/api/celdas/50`
- **Method**: DELETE

---

## 🚪 **Carpeta: Accesos y Salidas**

### 1. **GET** Obtener Todos los Accesos
- **URL**: `{{base_url}}/api/accesos-salidas`
- **Method**: GET
- **Query Params**:
  - `movimiento`: `Entrada`
  - `vehiculo_id`: `{{vehicle_id}}`

### 2. **GET** Obtener Acceso por ID
- **URL**: `{{base_url}}/api/accesos-salidas/1`
- **Method**: GET

### 3. **POST** Registrar Entrada
- **URL**: `{{base_url}}/api/accesos-salidas`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "movimiento": "Entrada",
  "fecha_hora": "2024-01-15T08:30:00",
  "vehiculo_id": 1
}
```

### 4. **POST** Registrar Salida
- **URL**: `{{base_url}}/api/accesos-salidas`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "movimiento": "Salida",
  "fecha_hora": "2024-01-15T17:45:00",
  "vehiculo_id": 1
}
```

---

## 📊 **Carpeta: Historial de Parqueo**

### 1. **GET** Obtener Todo el Historial
- **URL**: `{{base_url}}/api/historial-parqueo`
- **Method**: GET

### 2. **GET** Historial por Vehículo
- **URL**: `{{base_url}}/api/historial-parqueo/vehiculo/{{vehicle_id}}`
- **Method**: GET

### 3. **GET** Historial por Celda
- **URL**: `{{base_url}}/api/historial-parqueo/celda/{{cell_id}}`
- **Method**: GET

### 4. **GET** Estadísticas de Parqueo
- **URL**: `{{base_url}}/api/historial-parqueo/estadisticas`
- **Method**: GET

### 5. **POST** Crear Registro de Historial
- **URL**: `{{base_url}}/api/historial-parqueo`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "celda_id": 1,
  "vehiculo_id": 1,
  "fecha_hora": "2024-01-15T08:35:00"
}
```

---

## 🚨 **Carpeta: Incidencias**

### 1. **GET** Obtener Todas las Incidencias
- **URL**: `{{base_url}}/api/incidencias`
- **Method**: GET

### 2. **GET** Obtener Incidencia por ID
- **URL**: `{{base_url}}/api/incidencias/1`
- **Method**: GET

### 3. **POST** Crear Incidencia
- **URL**: `{{base_url}}/api/incidencias`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "nombre": "Vehículo mal estacionado",
  "descripcion": "Vehículo ocupando dos espacios de parqueo"
}
```

---

## 📋 **Carpeta: Reportes de Incidencia**

### 1. **GET** Obtener Todos los Reportes
- **URL**: `{{base_url}}/api/reportes-incidencia`
- **Method**: GET

### 2. **GET** Reportes por Vehículo
- **URL**: `{{base_url}}/api/reportes-incidencia/vehiculo/{{vehicle_id}}`
- **Method**: GET

### 3. **GET** Reportes por Incidencia
- **URL**: `{{base_url}}/api/reportes-incidencia/incidencia/1`
- **Method**: GET

### 4. **POST** Crear Reporte de Incidencia
- **URL**: `{{base_url}}/api/reportes-incidencia`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "vehiculo_id": 1,
  "incidencia_id": 1,
  "fecha_hora": "2024-01-15T14:20:00",
  "descripcion": "Se encontró el vehículo ocupando dos espacios al momento de la inspección"
}
```

---

## 🚦 **Carpeta: Pico y Placa**

### 1. **GET** Obtener Todas las Reglas
- **URL**: `{{base_url}}/api/pico-placa`
- **Method**: GET

### 2. **GET** Obtener Regla por ID
- **URL**: `{{base_url}}/api/pico-placa/1`
- **Method**: GET

### 3. **GET** Reglas por Tipo y Día
- **URL**: `{{base_url}}/api/pico-placa/tipo/Carro/dia/Lunes`
- **Method**: GET

### 4. **POST** Crear Regla de Pico y Placa
- **URL**: `{{base_url}}/api/pico-placa`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "numero_placa": "3-4",
  "dia_semana": "Miércoles",
  "hora_inicio": "07:00:00",
  "hora_fin": "09:00:00",
  "tipo_vehiculo": "Carro"
}
```

---

## 👤 **Carpeta: Perfiles de Usuario**

### 1. **GET** Obtener Todos los Perfiles
- **URL**: `{{base_url}}/api/perfiles-usuario`
- **Method**: GET

### 2. **GET** Obtener Perfil por ID
- **URL**: `{{base_url}}/api/perfiles-usuario/1`
- **Method**: GET

### 3. **POST** Crear Perfil
- **URL**: `{{base_url}}/api/perfiles-usuario`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "descripcion": "Supervisor de Turno"
}
```

### 4. **PUT** Actualizar Perfil
- **URL**: `{{base_url}}/api/perfiles-usuario/1`
- **Method**: PUT
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "descripcion": "Administrador General"
}
```

### 5. **DELETE** Eliminar Perfil
- **URL**: `{{base_url}}/api/perfiles-usuario/4`
- **Method**: DELETE

---

## 🏥 **Carpeta: Health Check**

### 1. **GET** Verificar Estado del Servidor
- **URL**: `{{base_url}}/health`
- **Method**: GET

---

## 🚀 **Tests Automáticos en Postman**

### Test Script para todas las peticiones exitosas:
```javascript
pm.test("Status code is successful", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
});

pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

### Test Script para peticiones GET con datos:
```javascript
pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.exist;
});
```

### Test Script para peticiones POST:
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Created resource has ID", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('id_usuario').or.to.have.property('id_vehiculo').or.to.have.property('id_celda');
});
```

---

## 📥 **Importar Colección**

Para importar todos estos endpoints a Postman:

1. **Crear nueva colección** llamada "Parking Management API"
2. **Configurar variables de entorno** como se indica arriba
3. **Crear carpetas** para cada entidad (Usuarios, Vehículos, etc.)
4. **Agregar requests** copiando la información de cada endpoint
5. **Configurar tests** usando los scripts proporcionados
6. **Ejecutar collection runner** para probar toda la API

---

## 🔄 **Flujo de Pruebas Recomendado**

1. **Health Check** - Verificar que el servidor esté funcionando
2. **Obtener Perfiles** - Ver perfiles disponibles
3. **Crear Usuario** - Crear un usuario de prueba
4. **Crear Vehículo** - Asociar vehículo al usuario
5. **Obtener Celdas Disponibles** - Ver espacios libres
6. **Registrar Entrada** - Simular entrada del vehículo
7. **Cambiar Estado de Celda** - Marcar celda como ocupada
8. **Crear Historial** - Registrar el uso de la celda
9. **Registrar Salida** - Simular salida del vehículo
10. **Liberar Celda** - Cambiar estado a libre 
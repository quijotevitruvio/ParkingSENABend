const express = require('express');
const {
  getVehicles,
  getVehicle,
  getVehicleByPlate,
  getVehiclesByUser,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehiculo.controller');

const router = express.Router();

// GET /api/vehiculos - Obtener todos los vehículos
router.get('/', getVehicles);

// GET /api/vehiculos/placa/:placa - Obtener vehículo por placa
router.get('/placa/:placa', getVehicleByPlate);

// GET /api/vehiculos/usuario/:usuario_id - Obtener vehículos por usuario
router.get('/usuario/:usuario_id', getVehiclesByUser);

// GET /api/vehiculos/:id - Obtener vehículo por ID
router.get('/:id', getVehicle);

// POST /api/vehiculos - Crear vehículo
router.post('/', createVehicle);

// PUT /api/vehiculos/:id - Actualizar vehículo
router.put('/:id', updateVehicle);

// DELETE /api/vehiculos/:id - Eliminar vehículo
router.delete('/:id', deleteVehicle);

module.exports = router; 
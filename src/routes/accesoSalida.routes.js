const express = require('express');
const { AccesoSalida } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

// GET /api/accesos-salidas - Obtener todos los accesos/salidas
router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, movimiento, vehiculo_id } = req.query;
  
  let accesos = await AccesoSalida.findAll();
  
  if (movimiento) {
    accesos = accesos.filter(acceso => acceso.movimiento === movimiento);
  }
  
  if (vehiculo_id) {
    accesos = accesos.filter(acceso => acceso.vehiculo_id == vehiculo_id);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedAccesos = accesos.slice(startIndex, endIndex);
  
  res.status(200).json({
    success: true,
    count: paginatedAccesos.length,
    total: accesos.length,
    data: paginatedAccesos.map(acceso => acceso.toJSON())
  });
}));

// GET /api/accesos-salidas/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const acceso = new AccesoSalida();
  await acceso.findById(req.params.id);
  
  if (!acceso.id) {
    return res.status(404).json({
      success: false,
      error: 'Registro no encontrado'
    });
  }
  
  res.status(200).json({
    success: true,
    data: acceso.toJSON()
  });
}));

// POST /api/accesos-salidas
router.post('/', asyncHandler(async (req, res) => {
  const { movimiento, fecha_hora, vehiculo_id } = req.body;

  if (!movimiento || !vehiculo_id) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione movimiento y ID del vehículo'
    });
  }

  const acceso = new AccesoSalida(null, movimiento, fecha_hora, vehiculo_id);
  await acceso.create();

  res.status(201).json({
    success: true,
    data: acceso.toJSON()
  });
}));

module.exports = router; 
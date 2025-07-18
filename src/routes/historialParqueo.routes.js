const express = require('express');
const { HistorialParqueo } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const historial = await HistorialParqueo.findAll();
  res.status(200).json({
    success: true,
    count: historial.length,
    data: historial.map(h => h.toJSON())
  });
}));

router.get('/vehiculo/:vehiculo_id', asyncHandler(async (req, res) => {
  const historial = await HistorialParqueo.findByVehicleId(req.params.vehiculo_id);
  res.status(200).json({
    success: true,
    count: historial.length,
    data: historial.map(h => h.toJSON())
  });
}));

router.get('/celda/:celda_id', asyncHandler(async (req, res) => {
  const historial = await HistorialParqueo.findByCellId(req.params.celda_id);
  res.status(200).json({
    success: true,
    count: historial.length,
    data: historial.map(h => h.toJSON())
  });
}));

router.get('/estadisticas', asyncHandler(async (req, res) => {
  const estadisticas = await HistorialParqueo.getParkingStatistics();
  res.status(200).json({
    success: true,
    data: estadisticas
  });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { celda_id, vehiculo_id, fecha_hora } = req.body;
  
  if (!celda_id || !vehiculo_id) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione celda_id y vehiculo_id'
    });
  }

  const historial = new HistorialParqueo(celda_id, vehiculo_id, fecha_hora);
  await historial.create();

  res.status(201).json({
    success: true,
    data: historial.toJSON()
  });
}));

module.exports = router; 
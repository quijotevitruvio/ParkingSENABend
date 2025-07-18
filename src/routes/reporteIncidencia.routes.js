const express = require('express');
const { ReporteIncidencia } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const reportes = await ReporteIncidencia.findAll();
  res.status(200).json({
    success: true,
    count: reportes.length,
    data: reportes.map(r => r.toJSON())
  });
}));

router.get('/vehiculo/:vehiculo_id', asyncHandler(async (req, res) => {
  const reportes = await ReporteIncidencia.findByVehicleId(req.params.vehiculo_id);
  res.status(200).json({
    success: true,
    count: reportes.length,
    data: reportes.map(r => r.toJSON())
  });
}));

router.get('/incidencia/:incidencia_id', asyncHandler(async (req, res) => {
  const reportes = await ReporteIncidencia.findByIncidentId(req.params.incidencia_id);
  res.status(200).json({
    success: true,
    count: reportes.length,
    data: reportes.map(r => r.toJSON())
  });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { vehiculo_id, incidencia_id, fecha_hora, descripcion } = req.body;
  
  if (!vehiculo_id || !incidencia_id) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione vehiculo_id e incidencia_id'
    });
  }

  const reporte = new ReporteIncidencia(vehiculo_id, incidencia_id, fecha_hora, descripcion);
  await reporte.create();

  res.status(201).json({
    success: true,
    data: reporte.toJSON()
  });
}));

module.exports = router; 
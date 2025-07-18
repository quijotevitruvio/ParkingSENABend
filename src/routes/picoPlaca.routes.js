const express = require('express');
const { PicoPlaca } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const reglas = await PicoPlaca.findAll();
  res.status(200).json({
    success: true,
    count: reglas.length,
    data: reglas.map(r => r.toJSON())
  });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const regla = new PicoPlaca();
  await regla.findById(req.params.id);
  
  if (!regla.id_pico_placa) {
    return res.status(404).json({
      success: false,
      error: 'Regla no encontrada'
    });
  }
  
  res.status(200).json({
    success: true,
    data: regla.toJSON()
  });
}));

router.get('/tipo/:tipo/dia/:dia', asyncHandler(async (req, res) => {
  const reglas = await PicoPlaca.findByVehicleTypeAndDay(req.params.tipo, req.params.dia);
  res.status(200).json({
    success: true,
    count: reglas.length,
    data: reglas.map(r => r.toJSON())
  });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { numero_placa, dia_semana, hora_inicio, hora_fin, tipo_vehiculo } = req.body;
  
  if (!numero_placa || !dia_semana || !hora_inicio || !hora_fin || !tipo_vehiculo) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione todos los campos requeridos'
    });
  }

  const regla = new PicoPlaca(null, numero_placa, dia_semana, hora_inicio, hora_fin, tipo_vehiculo);
  await regla.create();

  res.status(201).json({
    success: true,
    data: regla.toJSON()
  });
}));

module.exports = router; 
const express = require('express');
const { Incidencia } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const incidencias = await Incidencia.findAll();
  res.status(200).json({
    success: true,
    count: incidencias.length,
    data: incidencias.map(i => i.toJSON())
  });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const incidencia = new Incidencia();
  await incidencia.findById(req.params.id);
  
  if (!incidencia.id_incidencia) {
    return res.status(404).json({
      success: false,
      error: 'Incidencia no encontrada'
    });
  }
  
  res.status(200).json({
    success: true,
    data: incidencia.toJSON()
  });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { nombre, descripcion } = req.body;
  
  if (!nombre) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione el nombre de la incidencia'
    });
  }

  const incidencia = new Incidencia(null, nombre, descripcion);
  await incidencia.create();

  res.status(201).json({
    success: true,
    data: incidencia.toJSON()
  });
}));

module.exports = router; 
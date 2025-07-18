const express = require('express');
const {
  getCells,
  getCell,
  getCellsByType,
  getCellsByStatus,
  getAvailableCellsByType,
  getCellStatistics,
  createCell,
  updateCell,
  changeCellStatus,
  deleteCell
} = require('../controllers/celda.controller');

const router = express.Router();

// GET /api/celdas - Obtener todas las celdas
router.get('/', getCells);

// GET /api/celdas/tipo/:tipo - Obtener celdas por tipo
router.get('/tipo/:tipo', getCellsByType);

// GET /api/celdas/estado/:estado - Obtener celdas por estado
router.get('/estado/:estado', getCellsByStatus);

// GET /api/celdas/disponibles/:tipo - Obtener celdas disponibles por tipo
router.get('/disponibles/:tipo', getAvailableCellsByType);

// GET /api/celdas/estadisticas/:tipo - Obtener estadísticas de celdas
router.get('/estadisticas/:tipo', getCellStatistics);

// GET /api/celdas/:id - Obtener celda por ID
router.get('/:id', getCell);

// POST /api/celdas - Crear celda
router.post('/', createCell);

// PUT /api/celdas/:id - Actualizar celda
router.put('/:id', updateCell);

// PATCH /api/celdas/:id/estado - Cambiar estado de celda
router.patch('/:id/estado', changeCellStatus);

// DELETE /api/celdas/:id - Eliminar celda
router.delete('/:id', deleteCell);

module.exports = router; 
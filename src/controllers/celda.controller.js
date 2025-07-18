const { Celda } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get all cells
// @route   GET /api/celdas
// @access  Public
const getCells = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, tipo, estado } = req.query;
  
  let cells = await Celda.findAll();
  
  // Filter by type if provided
  if (tipo) {
    cells = cells.filter(cell => cell.tipo === tipo);
  }
  
  // Filter by status if provided
  if (estado) {
    cells = cells.filter(cell => cell.estado === estado);
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedCells = cells.slice(startIndex, endIndex);
  
  res.status(200).json({
    success: true,
    count: paginatedCells.length,
    total: cells.length,
    pagination: {
      current: page,
      pages: Math.ceil(cells.length / limit)
    },
    data: paginatedCells.map(cell => cell.toJSON())
  });
});

// @desc    Get single cell
// @route   GET /api/celdas/:id
// @access  Public
const getCell = asyncHandler(async (req, res) => {
  const celda = new Celda();
  await celda.findById(req.params.id);
  
  if (!celda.id_celda) {
    return res.status(404).json({
      success: false,
      error: 'Celda no encontrada'
    });
  }
  
  res.status(200).json({
    success: true,
    data: celda.toJSON()
  });
});

// @desc    Get cells by type
// @route   GET /api/celdas/tipo/:tipo
// @access  Public
const getCellsByType = asyncHandler(async (req, res) => {
  const cells = await Celda.findByTipo(req.params.tipo);
  
  res.status(200).json({
    success: true,
    count: cells.length,
    data: cells.map(cell => cell.toJSON())
  });
});

// @desc    Get cells by status
// @route   GET /api/celdas/estado/:estado
// @access  Public
const getCellsByStatus = asyncHandler(async (req, res) => {
  const cells = await Celda.findByEstado(req.params.estado);
  
  res.status(200).json({
    success: true,
    count: cells.length,
    data: cells.map(cell => cell.toJSON())
  });
});

// @desc    Get available cells by type
// @route   GET /api/celdas/disponibles/:tipo
// @access  Public
const getAvailableCellsByType = asyncHandler(async (req, res) => {
  const cells = await Celda.findAvailableByType(req.params.tipo);
  
  res.status(200).json({
    success: true,
    count: cells.length,
    data: cells.map(cell => cell.toJSON())
  });
});

// @desc    Get cell statistics
// @route   GET /api/celdas/estadisticas/:tipo
// @access  Public
const getCellStatistics = asyncHandler(async (req, res) => {
  const tipo = req.params.tipo;
  const total = await Celda.countByTypeAndStatus(tipo, null);
  const libre = await Celda.countByTypeAndStatus(tipo, 'Libre');
  const ocupada = await Celda.countByTypeAndStatus(tipo, 'Ocupada');
  const mantenimiento = await Celda.countByTypeAndStatus(tipo, 'Mantenimiento');
  
  res.status(200).json({
    success: true,
    data: {
      tipo,
      total,
      libre,
      ocupada,
      mantenimiento,
      porcentaje_ocupacion: total > 0 ? ((ocupada / total) * 100).toFixed(2) : 0
    }
  });
});

// @desc    Create new cell
// @route   POST /api/celdas
// @access  Public
const createCell = asyncHandler(async (req, res) => {
  const { numero, tipo, estado } = req.body;

  // Validate required fields
  if (!numero || !tipo) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione número y tipo de celda'
    });
  }

  const celda = new Celda(
    null,
    numero,
    tipo,
    estado || 'Libre'
  );

  await celda.create();

  res.status(201).json({
    success: true,
    data: celda.toJSON()
  });
});

// @desc    Update cell
// @route   PUT /api/celdas/:id
// @access  Public
const updateCell = asyncHandler(async (req, res) => {
  const celda = new Celda();
  await celda.findById(req.params.id);
  
  if (!celda.id_celda) {
    return res.status(404).json({
      success: false,
      error: 'Celda no encontrada'
    });
  }

  // Update fields if provided
  const fieldsToUpdate = ['numero', 'tipo', 'estado'];

  fieldsToUpdate.forEach(field => {
    if (req.body[field] !== undefined) {
      celda[field] = req.body[field];
    }
  });

  await celda.update();

  res.status(200).json({
    success: true,
    data: celda.toJSON()
  });
});

// @desc    Change cell status
// @route   PATCH /api/celdas/:id/estado
// @access  Public
const changeCellStatus = asyncHandler(async (req, res) => {
  const { estado } = req.body;
  
  if (!estado) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione el nuevo estado'
    });
  }

  const celda = new Celda();
  await celda.findById(req.params.id);
  
  if (!celda.id_celda) {
    return res.status(404).json({
      success: false,
      error: 'Celda no encontrada'
    });
  }

  await celda.changeStatus(estado);

  res.status(200).json({
    success: true,
    data: celda.toJSON()
  });
});

// @desc    Delete cell
// @route   DELETE /api/celdas/:id
// @access  Public
const deleteCell = asyncHandler(async (req, res) => {
  const celda = new Celda();
  await celda.findById(req.params.id);
  
  if (!celda.id_celda) {
    return res.status(404).json({
      success: false,
      error: 'Celda no encontrada'
    });
  }

  await celda.delete();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
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
}; 
const { Vehiculo } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get all vehicles
// @route   GET /api/vehiculos
// @access  Public
const getVehicles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, tipo, usuario_id } = req.query;
  
  let vehicles = await Vehiculo.findAll();
  
  // Filter by type if provided
  if (tipo) {
    vehicles = vehicles.filter(vehicle => vehicle.tipo === tipo);
  }
  
  // Filter by user if provided
  if (usuario_id) {
    vehicles = vehicles.filter(vehicle => vehicle.usuario_id == usuario_id);
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedVehicles = vehicles.slice(startIndex, endIndex);
  
  res.status(200).json({
    success: true,
    count: paginatedVehicles.length,
    total: vehicles.length,
    pagination: {
      current: page,
      pages: Math.ceil(vehicles.length / limit)
    },
    data: paginatedVehicles.map(vehicle => vehicle.toJSON())
  });
});

// @desc    Get single vehicle
// @route   GET /api/vehiculos/:id
// @access  Public
const getVehicle = asyncHandler(async (req, res) => {
  const vehiculo = new Vehiculo();
  await vehiculo.findById(req.params.id);
  
  if (!vehiculo.id_vehiculo) {
    return res.status(404).json({
      success: false,
      error: 'Vehículo no encontrado'
    });
  }
  
  res.status(200).json({
    success: true,
    data: vehiculo.toJSON()
  });
});

// @desc    Get vehicle by plate
// @route   GET /api/vehiculos/placa/:placa
// @access  Public
const getVehicleByPlate = asyncHandler(async (req, res) => {
  const vehiculo = new Vehiculo();
  await vehiculo.findByPlaca(req.params.placa);
  
  if (!vehiculo.id_vehiculo) {
    return res.status(404).json({
      success: false,
      error: 'Vehículo no encontrado con esa placa'
    });
  }
  
  res.status(200).json({
    success: true,
    data: vehiculo.toJSON()
  });
});

// @desc    Get vehicles by user ID
// @route   GET /api/vehiculos/usuario/:usuario_id
// @access  Public
const getVehiclesByUser = asyncHandler(async (req, res) => {
  const vehicles = await Vehiculo.findByUserId(req.params.usuario_id);
  
  res.status(200).json({
    success: true,
    count: vehicles.length,
    data: vehicles.map(vehicle => vehicle.toJSON())
  });
});

// @desc    Create new vehicle
// @route   POST /api/vehiculos
// @access  Public
const createVehicle = asyncHandler(async (req, res) => {
  const {
    placa,
    color,
    año,
    marca,
    tipo,
    usuario_id
  } = req.body;

  // Validate required fields
  if (!placa || !color || !año || !marca || !tipo || !usuario_id) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione todos los campos requeridos'
    });
  }

  // Check if vehicle with plate already exists
  const existingVehicle = new Vehiculo();
  await existingVehicle.findByPlaca(placa);
  
  if (existingVehicle.id_vehiculo) {
    return res.status(409).json({
      success: false,
      error: 'Ya existe un vehículo con esa placa'
    });
  }

  const vehiculo = new Vehiculo(
    null,
    placa,
    color,
    año,
    marca,
    tipo,
    usuario_id
  );

  await vehiculo.create();

  res.status(201).json({
    success: true,
    data: vehiculo.toJSON()
  });
});

// @desc    Update vehicle
// @route   PUT /api/vehiculos/:id
// @access  Public
const updateVehicle = asyncHandler(async (req, res) => {
  const vehiculo = new Vehiculo();
  await vehiculo.findById(req.params.id);
  
  if (!vehiculo.id_vehiculo) {
    return res.status(404).json({
      success: false,
      error: 'Vehículo no encontrado'
    });
  }

  // Update fields if provided
  const fieldsToUpdate = ['placa', 'color', 'año', 'marca', 'tipo', 'usuario_id'];

  fieldsToUpdate.forEach(field => {
    if (req.body[field] !== undefined) {
      vehiculo[field] = req.body[field];
    }
  });

  await vehiculo.update();

  res.status(200).json({
    success: true,
    data: vehiculo.toJSON()
  });
});

// @desc    Delete vehicle
// @route   DELETE /api/vehiculos/:id
// @access  Public
const deleteVehicle = asyncHandler(async (req, res) => {
  const vehiculo = new Vehiculo();
  await vehiculo.findById(req.params.id);
  
  if (!vehiculo.id_vehiculo) {
    return res.status(404).json({
      success: false,
      error: 'Vehículo no encontrado'
    });
  }

  await vehiculo.delete();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
  getVehicles,
  getVehicle,
  getVehicleByPlate,
  getVehiclesByUser,
  createVehicle,
  updateVehicle,
  deleteVehicle
}; 
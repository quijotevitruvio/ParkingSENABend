const { Usuario } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get all users
// @route   GET /api/usuarios
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, estado, perfil_usuario_id } = req.query;
  
  let users = await Usuario.findAll();
  
  // Filter by status if provided
  if (estado) {
    users = users.filter(user => user.estado === estado);
  }
  
  // Filter by profile if provided
  if (perfil_usuario_id) {
    users = users.filter(user => user.perfil_usuario_id == perfil_usuario_id);
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  res.status(200).json({
    success: true,
    count: paginatedUsers.length,
    total: users.length,
    pagination: {
      current: page,
      pages: Math.ceil(users.length / limit)
    },
    data: paginatedUsers.map(user => user.toJSON())
  });
});

// @desc    Get single user
// @route   GET /api/usuarios/:id
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  const usuario = new Usuario();
  await usuario.findById(req.params.id);
  
  if (!usuario.id_usuario) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado'
    });
  }
  
  res.status(200).json({
    success: true,
    data: usuario.toJSON()
  });
});

// @desc    Get user by document
// @route   GET /api/usuarios/documento/:numero_documento
// @access  Public
const getUserByDocument = asyncHandler(async (req, res) => {
  const usuario = new Usuario();
  await usuario.findByDocument(req.params.numero_documento);
  
  if (!usuario.id_usuario) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado con ese número de documento'
    });
  }
  
  res.status(200).json({
    success: true,
    data: usuario.toJSON()
  });
});

// @desc    Create new user
// @route   POST /api/usuarios
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const {
    tipo_documento,
    numero_documento,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    direccion_correo,
    numero_celular,
    foto_perfil,
    estado,
    clave,
    perfil_usuario_id
  } = req.body;

  // Validate required fields
  if (!tipo_documento || !numero_documento || !primer_nombre || !primer_apellido || !direccion_correo || !clave || !perfil_usuario_id) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione todos los campos requeridos'
    });
  }

  // Check if user with document already exists
  const existingUser = new Usuario();
  await existingUser.findByDocument(numero_documento);
  
  if (existingUser.id_usuario) {
    return res.status(409).json({
      success: false,
      error: 'Ya existe un usuario con ese número de documento'
    });
  }

  const usuario = new Usuario(
    null,
    tipo_documento,
    numero_documento,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    direccion_correo,
    numero_celular,
    foto_perfil,
    estado || 'activo',
    clave,
    perfil_usuario_id
  );

  await usuario.create();

  res.status(201).json({
    success: true,
    data: usuario.toJSON()
  });
});

// @desc    Update user
// @route   PUT /api/usuarios/:id
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
  const usuario = new Usuario();
  await usuario.findById(req.params.id);
  
  if (!usuario.id_usuario) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado'
    });
  }

  // Update fields if provided
  const fieldsToUpdate = [
    'tipo_documento', 'numero_documento', 'primer_nombre', 'segundo_nombre',
    'primer_apellido', 'segundo_apellido', 'direccion_correo', 'numero_celular',
    'foto_perfil', 'estado', 'clave', 'perfil_usuario_id'
  ];

  fieldsToUpdate.forEach(field => {
    if (req.body[field] !== undefined) {
      usuario[field] = req.body[field];
    }
  });

  await usuario.update();

  res.status(200).json({
    success: true,
    data: usuario.toJSON()
  });
});

// @desc    Delete user
// @route   DELETE /api/usuarios/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
  const usuario = new Usuario();
  await usuario.findById(req.params.id);
  
  if (!usuario.id_usuario) {
    return res.status(404).json({
      success: false,
      error: 'Usuario no encontrado'
    });
  }

  await usuario.delete();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
  getUsers,
  getUser,
  getUserByDocument,
  createUser,
  updateUser,
  deleteUser
}; 
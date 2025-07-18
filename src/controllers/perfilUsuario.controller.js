const { PerfilUsuario } = require('../models');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc    Get all user profiles
// @route   GET /api/perfiles-usuario
// @access  Public
const getProfiles = asyncHandler(async (req, res) => {
  const profiles = await PerfilUsuario.findAll();
  
  res.status(200).json({
    success: true,
    count: profiles.length,
    data: profiles.map(profile => profile.toJSON())
  });
});

// @desc    Get single user profile
// @route   GET /api/perfiles-usuario/:id
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  const perfil = new PerfilUsuario();
  await perfil.findById(req.params.id);
  
  if (!perfil.id_perfil_usuario) {
    return res.status(404).json({
      success: false,
      error: 'Perfil no encontrado'
    });
  }
  
  res.status(200).json({
    success: true,
    data: perfil.toJSON()
  });
});

// @desc    Create new user profile
// @route   POST /api/perfiles-usuario
// @access  Public
const createProfile = asyncHandler(async (req, res) => {
  const { descripcion } = req.body;

  if (!descripcion) {
    return res.status(400).json({
      success: false,
      error: 'Por favor proporcione la descripción del perfil'
    });
  }

  const perfil = new PerfilUsuario(null, descripcion);
  await perfil.create();

  res.status(201).json({
    success: true,
    data: perfil.toJSON()
  });
});

// @desc    Update user profile
// @route   PUT /api/perfiles-usuario/:id
// @access  Public
const updateProfile = asyncHandler(async (req, res) => {
  const perfil = new PerfilUsuario();
  await perfil.findById(req.params.id);
  
  if (!perfil.id_perfil_usuario) {
    return res.status(404).json({
      success: false,
      error: 'Perfil no encontrado'
    });
  }

  if (req.body.descripcion !== undefined) {
    perfil.descripcion = req.body.descripcion;
  }

  await perfil.update();

  res.status(200).json({
    success: true,
    data: perfil.toJSON()
  });
});

// @desc    Delete user profile
// @route   DELETE /api/perfiles-usuario/:id
// @access  Public
const deleteProfile = asyncHandler(async (req, res) => {
  const perfil = new PerfilUsuario();
  await perfil.findById(req.params.id);
  
  if (!perfil.id_perfil_usuario) {
    return res.status(404).json({
      success: false,
      error: 'Perfil no encontrado'
    });
  }

  await perfil.delete();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
}; 
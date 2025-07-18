const express = require('express');
const {
  getUsers,
  getUser,
  getUserByDocument,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usuario.controller');

const router = express.Router();

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', getUsers);

// GET /api/usuarios/documento/:numero_documento - Obtener usuario por número de documento
router.get('/documento/:numero_documento', getUserByDocument);

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', getUser);

// POST /api/usuarios - Crear usuario
router.post('/', createUser);

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', updateUser);

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete('/:id', deleteUser);

module.exports = router;

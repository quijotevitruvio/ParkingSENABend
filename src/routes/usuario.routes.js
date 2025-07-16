const express = require('express');
const Usuario = require('../../model/Usuario');
const router = express.Router();

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios.map(u => u.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = new Usuario();
    const result = await usuario.findById(req.params.id);
    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/usuarios/documento/:numero_documento - Obtener usuario por número de documento
router.get('/documento/:numero_documento', async (req, res) => {
  try {
    const usuario = new Usuario();
    const result = await usuario.findByDocument(req.params.numero_documento);
    if (!result) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/usuarios - Crear usuario
router.post('/', async (req, res) => {
  try {
    const usuario = new Usuario(...Object.values(req.body));
    await usuario.create();
    res.status(201).json(usuario.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = new Usuario();
    const found = await usuario.findById(req.params.id);
    if (!found) return res.status(404).json({ error: 'Usuario no encontrado' });
    Object.assign(usuario, req.body);
    await usuario.update();
    res.json(usuario.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = new Usuario();
    const found = await usuario.findById(req.params.id);
    if (!found) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.delete();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

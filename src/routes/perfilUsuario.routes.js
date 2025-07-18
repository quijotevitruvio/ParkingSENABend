const express = require('express');
const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/perfilUsuario.controller');

const router = express.Router();

router.get('/', getProfiles);
router.get('/:id', getProfile);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router; 
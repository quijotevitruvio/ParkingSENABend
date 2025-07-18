// ORM Models Index File
// This file exports all the model classes for easy importing

const PerfilUsuario = require('./PerfilUsuario');
const Usuario = require('./Usuario');
const Vehiculo = require('./Vehiculo');
const PicoPlaca = require('./PicoPlaca');
const AccesoSalida = require('./AccesoSalida');
const Incidencia = require('./Incidencia');
const ReporteIncidencia = require('./ReporteIncidencia');
const Celda = require('./Celda');
const HistorialParqueo = require('./HistorialParqueo');

module.exports = {
  PerfilUsuario,
  Usuario,
  Vehiculo,
  PicoPlaca,
  AccesoSalida,
  Incidencia,
  ReporteIncidencia,
  Celda,
  HistorialParqueo
}; 
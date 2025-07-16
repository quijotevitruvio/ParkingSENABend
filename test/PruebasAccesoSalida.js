const AccesoSalida = require('../model/AccesoSalida');

async function runTests() {
  console.log('Iniciando pruebas para AccesoSalida...');

  // Test: Crear un registro de acceso/salida
  let acceso = new AccesoSalida(null, 'Entrada', new Date().toISOString().slice(0, 19).replace('T', ' '), 'Norte', 0, 1);
  await acceso.create();
  console.assert(acceso.id !== null, 'Error: No se creó el registro de acceso/salida correctamente');
  console.log('✔️ Crear registro de acceso/salida');

  // Test: Buscar por ID
  let encontrado = new AccesoSalida();
  await encontrado.findById(acceso.id);
  console.assert(encontrado.id === acceso.id && encontrado.movimiento === 'Entrada', 'Error: No se encontró el registro por ID');
  console.log('✔️ Buscar registro por ID');

  // Test: Actualizar registro
  acceso.movimiento = 'Salida';
  acceso.puerta = 'Sur';
  acceso.tiempo_estadia = 120;
  await acceso.update();
  let actualizado = new AccesoSalida();
  await actualizado.findById(acceso.id);
  console.assert(actualizado.movimiento === 'Salida' && actualizado.puerta === 'Sur' && actualizado.tiempo_estadia === 120, 'Error: No se actualizó el registro');
  console.log('✔️ Actualizar registro');

  // Test: Buscar todos los registros
  const todos = await AccesoSalida.findAll();
  console.assert(Array.isArray(todos) && todos.length > 0, 'Error: No se listaron los registros');
  console.log('✔️ Listar todos los registros');

  // Test: Buscar por ID de vehículo
  const porVehiculo = await AccesoSalida.findByVehicleId(1);
  console.assert(Array.isArray(porVehiculo), 'Error: No se listaron los registros por vehículo');
  console.log('✔️ Buscar registros por vehículo');

  // Test: Buscar por tipo de movimiento
  const porMovimiento = await AccesoSalida.findByMovimiento('Salida');
  console.assert(Array.isArray(porMovimiento), 'Error: No se listaron los registros por movimiento');
  console.log('✔️ Buscar registros por movimiento');

  // Test: Buscar por rango de fechas
  const fechaInicio = new Date(Date.now() - 24*60*60*1000).toISOString().slice(0, 19).replace('T', ' ');
  const fechaFin = new Date(Date.now() + 24*60*60*1000).toISOString().slice(0, 19).replace('T', ' ');
  const porRango = await AccesoSalida.findByDateRange(fechaInicio, fechaFin);
  console.assert(Array.isArray(porRango), 'Error: No se listaron los registros por rango de fechas');
  console.log('✔️ Buscar registros por rango de fechas');

  // Test: Eliminar registro
  const eliminado = await acceso.delete();
  console.assert(eliminado === true, 'Error: No se eliminó el registro');
  const buscarEliminado = new AccesoSalida();
  const resultado = await buscarEliminado.findById(acceso.id);
  console.assert(resultado === null, 'Error: El registro no fue eliminado');
  console.log('✔️ Eliminar registro');

  console.log('Todas las pruebas de AccesoSalida pasaron correctamente.');
}

runTests().catch(e => {
  console.error('Error en pruebas de AccesoSalida:', e);
});

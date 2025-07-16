const Celda = require('../model/Celda');

async function runTests() {
  console.log('Iniciando pruebas para Celda...');

  // Test: Crear una celda
  let celda = new Celda(null, 'Carro', 'Libre');
  await celda.create();
  console.assert(celda.id !== null, 'Error: No se creó la celda correctamente');
  console.log('✔️ Crear celda');

  // Test: Buscar por ID
  let encontrada = new Celda();
  await encontrada.findById(celda.id);
  console.assert(encontrada.id === celda.id && encontrada.tipo === 'Carro' && encontrada.estado === 'Libre', 'Error: No se encontró la celda por ID');
  console.log('✔️ Buscar celda por ID');

  // Test: Actualizar celda
  celda.tipo = 'Moto';
  celda.estado = 'Ocupada';
  await celda.update();
  let actualizada = new Celda();
  await actualizada.findById(celda.id);
  console.assert(actualizada.tipo === 'Moto' && actualizada.estado === 'Ocupada', 'Error: No se actualizó la celda');
  console.log('✔️ Actualizar celda');

  // Test: Cambiar estado de la celda
  await celda.changeStatus('Libre');
  let estadoCambiado = new Celda();
  await estadoCambiado.findById(celda.id);
  console.assert(estadoCambiado.estado === 'Libre', 'Error: No se cambió el estado de la celda');
  console.log('✔️ Cambiar estado de la celda');

  // Test: Buscar todas las celdas
  const todas = await Celda.findAll();
  console.assert(Array.isArray(todas) && todas.length > 0, 'Error: No se listaron las celdas');
  console.log('✔️ Listar todas las celdas');

  // Test: Buscar celdas por tipo
  const porTipo = await Celda.findByTipo('Moto');
  console.assert(Array.isArray(porTipo), 'Error: No se listaron las celdas por tipo');
  console.log('✔️ Buscar celdas por tipo');

  // Test: Buscar celdas por estado
  const porEstado = await Celda.findByEstado('Libre');
  console.assert(Array.isArray(porEstado), 'Error: No se listaron las celdas por estado');
  console.log('✔️ Buscar celdas por estado');

  // Test: Buscar celdas disponibles por tipo
  const disponibles = await Celda.findAvailableByType('Moto');
  console.assert(Array.isArray(disponibles), 'Error: No se listaron las celdas disponibles por tipo');
  console.log('✔️ Buscar celdas disponibles por tipo');

  // Test: Contar celdas por tipo y estado
  const total = await Celda.countByTypeAndStatus('Moto', 'Libre');
  console.assert(typeof total === 'number', 'Error: No se contó correctamente las celdas');
  console.log('✔️ Contar celdas por tipo y estado');

  // Test: Eliminar celda
  const eliminado = await celda.delete();
  console.assert(eliminado === true, 'Error: No se eliminó la celda');
  const buscarEliminada = new Celda();
  const resultado = await buscarEliminada.findById(celda.id);
  console.assert(resultado === null, 'Error: La celda no fue eliminada');
  console.log('✔️ Eliminar celda');

  console.log('Todas las pruebas de Celda pasaron correctamente.');
}

runTests().catch(e => {
  console.error('Error en pruebas de Celda:', e);
});

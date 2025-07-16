const PerfilUsuario = require('../model/PerfilUsuario');

async function runTests() {
  console.log('Iniciando pruebas para PerfilUsuario...');

  // Test: Crear un perfil
  let perfil = new PerfilUsuario(null, 'Administrador');
  await perfil.create();
  console.assert(perfil.id !== null, 'Error: No se creó el perfil correctamente');
  console.log('✔️ Crear perfil');

  // Test: Buscar por ID
  let encontrado = new PerfilUsuario();
  await encontrado.findById(perfil.id);
  console.assert(encontrado.id === perfil.id && encontrado.perfil === 'Administrador', 'Error: No se encontró el perfil por ID');
  console.log('✔️ Buscar perfil por ID');

  // Test: Actualizar perfil
  perfil.perfil = 'Operador';
  await perfil.update();
  let actualizado = new PerfilUsuario();
  await actualizado.findById(perfil.id);
  console.assert(actualizado.perfil === 'Operador', 'Error: No se actualizó el perfil');
  console.log('✔️ Actualizar perfil');

  // Test: Buscar todos los perfiles
  const todos = await PerfilUsuario.findAll();
  console.assert(Array.isArray(todos) && todos.length > 0, 'Error: No se listaron los perfiles');
  console.log('✔️ Listar todos los perfiles');

  // Test: Eliminar perfil
  const eliminado = await perfil.delete();
  console.assert(eliminado === true, 'Error: No se eliminó el perfil');
  const buscarEliminado = new PerfilUsuario();
  const resultado = await buscarEliminado.findById(perfil.id);
  console.assert(resultado === null, 'Error: El perfil no fue eliminado');
  console.log('✔️ Eliminar perfil');

  console.log('Todas las pruebas de PerfilUsuario pasaron correctamente.');
}

runTests().catch(e => {
  console.error('Error en pruebas de PerfilUsuario:', e);
});

const mysql = require('mysql2');
const { Usuario } = require('./model');
const checkDbConnection = require('./checkDbConnection');

async function main() {
  try {
    // Primero, verificar la conexión a la base de datos
    await checkDbConnection();

    console.log('=== INICIANDO APLICACIÓN DE GESTIÓN DE USUARIOS ===\n');

    // 1. Crear un objeto de la clase Usuario
    console.log('1. Creando objeto Usuario...');
    const usuario = new Usuario();
    console.log('✓ Objeto Usuario creado exitosamente\n');

    // 2. Llamar al método findAll para traer todos los usuarios
    console.log('2. Obteniendo todos los usuarios...');
    const todosLosUsuarios = await Usuario.findAll();
    console.log(`✓ Se encontraron ${todosLosUsuarios.length} usuarios en la base de datos`);
    
    if (todosLosUsuarios.length > 0) {
      console.log('\n--- LISTA DE TODOS LOS USUARIOS ---');
      todosLosUsuarios.forEach((user, index) => {
        console.log(`${index + 1}. ${user.primer_nombre} ${user.primer_apellido} - Documento: ${user.numero_documento} - Email: ${user.direccion_correo}`);
      });
    } else {
      console.log('No se encontraron usuarios en la base de datos');
    }

    // 3. Llamar al método findByDocument con un número de documento específico
    console.log('\n3. Buscando usuario por número de documento...');
    const numeroDocumentoBuscar = '651684841'; // Cambia este número por uno que exista en tu BD
    
    const usuarioEncontrado = await usuario.findByDocument(numeroDocumentoBuscar);
    
    if (usuarioEncontrado) {
      console.log(`✓ Usuario encontrado con documento ${numeroDocumentoBuscar}:`);
      console.log('--- DETALLES DEL USUARIO ---');
      console.log(`ID: ${usuarioEncontrado.id_usuario}`);
      console.log(`Tipo Documento: ${usuarioEncontrado.tipo_documento}`);
      console.log(`Número Documento: ${usuarioEncontrado.numero_documento}`);
      console.log(`Nombre Completo: ${usuarioEncontrado.primer_nombre} ${usuarioEncontrado.segundo_nombre || ''} ${usuarioEncontrado.primer_apellido} ${usuarioEncontrado.segundo_apellido || ''}`);
      console.log(`Email: ${usuarioEncontrado.direccion_correo}`);
      console.log(`Celular: ${usuarioEncontrado.numero_celular}`);
      console.log(`Estado: ${usuarioEncontrado.estado}`);
      console.log(`Perfil ID: ${usuarioEncontrado.perfil_usuario_id}`);
    } else {
      console.log(`✗ No se encontró usuario con documento ${numeroDocumentoBuscar}`);
      
      // Mostrar algunos números de documento disponibles para referencia
      if (todosLosUsuarios.length > 0) {
        console.log('\n📝 Números de documento disponibles en la BD:');
        todosLosUsuarios.slice(0, 5).forEach(user => {
          console.log(`   - ${user.numero_documento} (${user.primer_nombre} ${user.primer_apellido})`);
        });
        console.log('💡 Cambia la variable "numeroDocumentoBuscar" por uno de estos números');
      }
    }

    console.log('\n=== APLICACIÓN FINALIZADA EXITOSAMENTE ===');

  } catch (error) {
    console.error('❌ Error en la aplicación:', error.message);
    console.error('Detalles del error:', error);
  }
}

// Ejecutar la función principal
main();

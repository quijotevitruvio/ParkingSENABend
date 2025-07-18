const DatabaseConnection = require('./DatabaseConnection');

/**
 * Verifica la conexión con la base de datos.
 * Si la conexión es exitosa, muestra un mensaje y continúa.
 * Si falla, muestra un error y termina el proceso.
 */
async function checkDbConnection() {
  console.log('Verificando la conexión a la base de datos...');
  const db = new DatabaseConnection();
  try {
    // Intenta conectar
    await db.connect();
    // Si tiene éxito, muestra el mensaje y cierra la conexión de prueba
    console.log('✅ Conexión a la base de datos establecida exitosamente.');
    await db.close();
  } catch (error) {
    // Si falla, muestra el error y detiene la ejecución del script
    console.error('❌ No se pudo conectar a la base de datos.');
    console.error(`   Razón: ${error.message}`);
    console.error('   Por favor, verifique las credenciales en el archivo .env y que el servicio de la base de datos esté en ejecución.');
    process.exit(1); // Termina el proceso con un código de error
  }
}

module.exports = checkDbConnection;
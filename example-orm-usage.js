// Example demonstrating how to use the ORM models
// This file shows practical examples of CRUD operations using the manual ORM

const { 
  PerfilUsuario, 
  Usuario, 
  Vehiculo, 
  PicoPlaca, 
  AccesoSalida, 
  Incidencia, 
  ReporteIncidencia, 
  Celda, 
  HistorialParqueo 
} = require('./model');

async function exampleUsage() {
  try {
    console.log('=== PARKING LOT ORM EXAMPLE USAGE ===\n');

    // 1. PERFIL_USUARIO Examples
    console.log('1. PERFIL_USUARIO Examples:');
    
    // Get all profiles
    const perfiles = await PerfilUsuario.findAll();
    console.log('All profiles:', perfiles.map(p => p.toJSON()));

    // Find specific profile
    const perfil = new PerfilUsuario();
    await perfil.findById(1);
    console.log('Profile ID 1:', perfil.toJSON());

    // 2. USUARIO Examples
    console.log('\n2. USUARIO Examples:');
    
    // Get all users
    const usuarios = await Usuario.findAll();
    console.log('Total users found:', usuarios.length);
    console.log('First user:', usuarios[0]?.toJSON());

    // Find user by document
    const usuario = new Usuario();
    await usuario.findByDocument('651684841');
    console.log('User with document 651684841:', usuario.toJSON());

    // 3. VEHICULO Examples
    console.log('\n3. VEHICULO Examples:');
    
    // Get all vehicles
    const vehiculos = await Vehiculo.findAll();
    console.log('Total vehicles found:', vehiculos.length);

    // Find vehicles by user ID
    const vehiculosUsuario = await Vehiculo.findByUserId(1);
    console.log('Vehicles for user ID 1:', vehiculosUsuario.map(v => v.toJSON()));

    // Find vehicle by plate
    const vehiculo = new Vehiculo();
    await vehiculo.findByPlaca('ABC123');
    console.log('Vehicle with plate ABC123:', vehiculo.toJSON());

    // 4. CELDA Examples
    console.log('\n4. CELDA Examples:');
    
    // Get available cells for cars
    const celdasDisponibles = await Celda.findAvailableByType('Carro');
    console.log('Available car cells:', celdasDisponibles.length);

    // Count cells by type and status
    const totalCarCells = await Celda.countByTypeAndStatus('Carro', 'Libre');
    console.log('Total available car cells:', totalCarCells);

    // 5. ACCESO_SALIDAS Examples
    console.log('\n5. ACCESO_SALIDAS Examples:');
    
    // Get all entries
    const entradas = await AccesoSalida.findByMovimiento('Entrada');
    console.log('Total entries found:', entradas.length);

    // Get all exits
    const salidas = await AccesoSalida.findByMovimiento('Salida');
    console.log('Total exits found:', salidas.length);

    // 6. PICO_PLACA Examples
    console.log('\n6. PICO_PLACA Examples:');
    
    // Get pico y placa rules for Monday
    const lunes = await PicoPlaca.findByVehicleTypeAndDay('Carro', 'Lunes');
    console.log('Car restrictions on Monday:', lunes.map(p => p.toJSON()));

    // 7. INCIDENCIA Examples
    console.log('\n7. INCIDENCIA Examples:');
    
    // Get all incident types
    const incidencias = await Incidencia.findAll();
    console.log('Available incident types:', incidencias.map(i => i.toJSON()));

    // 8. REPORTE_INCIDENCIA Examples
    console.log('\n8. REPORTE_INCIDENCIA Examples:');
    
    // Get incident reports for a specific vehicle
    const reportes = await ReporteIncidencia.findByVehicleId(1);
    console.log('Incident reports for vehicle ID 1:', reportes.map(r => r.toJSON()));

    // 9. HISTORIAL_PARQUEO Examples
    console.log('\n9. HISTORIAL_PARQUEO Examples:');
    
    // Get parking statistics
    const stats = await HistorialParqueo.getParkingStatistics();
    console.log('Parking statistics:', stats);

    // Get parking history for a vehicle
    const historial = await HistorialParqueo.findByVehicleId(1);
    console.log('Parking history for vehicle ID 1:', historial.map(h => h.toJSON()));

    console.log('\n=== ORM EXAMPLE COMPLETED ===');

  } catch (error) {
    console.error('Error in example usage:', error.message);
  }
}

// Example of creating new records
async function exampleCreateOperations() {
  try {
    console.log('\n=== CREATE OPERATIONS EXAMPLES ===\n');

    // Create new profile
    const newProfile = new PerfilUsuario(null, 'guest');
    await newProfile.create();
    console.log('Created new profile:', newProfile.toJSON());

    // Create new user
    const newUser = new Usuario(
      null, 'CC', '123456789', 'Juan', 'Carlos', 'Perez', 'Lopez',
      'juan.perez@email.com', '3001234567', 'img/juan.jpg',
      'activo', 'password123', newProfile.id
    );
    await newUser.create();
    console.log('Created new user:', newUser.toJSON());

    // Create new vehicle
    const newVehicle = new Vehiculo(
      null, 'XYZ999', 'Azul', '2023', 'Honda', 'Carro', newUser.id_usuario
    );
    await newVehicle.create();
    console.log('Created new vehicle:', newVehicle.toJSON());

    // Create new cell
    const newCell = new Celda(null, 'Carro', 'Libre');
    await newCell.create();
    console.log('Created new cell:', newCell.toJSON());

    // Create access record
    const newAccess = new AccesoSalida(
      null, 'Entrada', new Date(), 'Puerta 1', 0, newVehicle.id
    );
    await newAccess.create();
    console.log('Created new access record:', newAccess.toJSON());

    // Create parking history
    const newHistory = new HistorialParqueo(
      newCell.id, newVehicle.id, new Date()
    );
    await newHistory.create();
    console.log('Created new parking history:', newHistory.toJSON());

    console.log('\n=== CREATE OPERATIONS COMPLETED ===');

  } catch (error) {
    console.error('Error in create operations:', error.message);
  }
}

// Example of update operations
async function exampleUpdateOperations() {
  try {
    console.log('\n=== UPDATE OPERATIONS EXAMPLES ===\n');

    // Update user information
    const usuario = new Usuario();
    await usuario.findByDocument('651684841');
    if (usuario.id_usuario) {
      usuario.numero_celular = '3009876543';
      await usuario.update();
      console.log('Updated user phone number:', usuario.toJSON());
    }

    // Change cell status
    const celda = new Celda();
    await celda.findById(1);
    if (celda.id) {
      await celda.changeStatus('Ocupada');
      console.log('Changed cell status to Ocupada:', celda.toJSON());
    }

    console.log('\n=== UPDATE OPERATIONS COMPLETED ===');

  } catch (error) {
    console.error('Error in update operations:', error.message);
  }
}

// Run examples (uncomment to execute)
if (require.main === module) {
  // exampleUsage();
  // exampleCreateOperations();
  // exampleUpdateOperations();
  console.log('ORM Usage examples are ready to run!');
  console.log('Uncomment the function calls at the bottom of this file to execute examples.');
} 